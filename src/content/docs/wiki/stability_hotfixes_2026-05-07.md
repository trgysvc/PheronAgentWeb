# Stability Sprint — Hotfix Report (v9.0, 2026-05-07)

**Status:** Production, clean build  
**Affected Layers:** Safety, Memory, Classification, Web Tools, Orchestration, Plugin Engine

---

## Summary

Six critical production defects identified through OpenClaw comparative analysis and real log inspections have been resolved. All fixes were applied on the same day and validated via `swift build`.

---

## P0 — LogicGate Word Boundary Incorrect Matching

**File:** `Sources/PheronAgentCore/Utilities/LogicGate.swift`

**Issue:**  
The `cmd.contains("top")` check rejected legitimate file copying commands such as `cp ~/Desktop/test.txt ~/Downloads/` with a `"Accessing top is unsafe"` error. Root cause: The word `"Desktop"` contains the substring `"top"`.

**Symptom:**  
Log: `[SAFETY BLOCK] Command rejected: cp ... Reason: Sandbox Restriction: Accessing top is unsafe`

**Fix:**  
Added word boundary matching using `NSRegularExpression` with `\b...\b` for all `suggestions` keys. A private `matchesWholeWord(_:pattern:)` helper compiles each key as a regex; if it fails, it falls back to `string.contains()`.

```swift
private func matchesWholeWord(_ string: String, pattern: String) -> Bool {
    let escaped = NSRegularExpression.escapedPattern(for: pattern)
    guard let regex = try? NSRegularExpression(pattern: "\\b\(escaped)\\b", options: []) else {
        return string.contains(pattern)
    }
    return regex.firstMatch(in: string, range: NSRange(string.startIndex..., in: string)) != nil
}
```

---

## P0 — ModelManager Concurrent Load Race Condition

**File:** `Sources/PheronAgentCore/LLM/ModelManager.swift`

**Issue:**  
At startup, `ModelStateManager`, `VaultManager`, and `ModelPicker` independently call `ModelManager.load()`. While `InferenceActor`'s internal guard correctly rejected the second and third calls, each rejection wrote a `"Load requested but already in progress. Skipping."` log — causing noise rather than indicating a real error.

**Fix:**  
Added an `activeLoadModelID: String?` tracker. Utilizing `@MainActor` isolation, it is set synchronously before the first `await`; the second call exits early without waiting for `await`. If the same model is already in VRAM, the `vramModelID == modelID` early guard bypasses all validation steps.

---

## P1 — Unbounded Memory Injection

**Files:** `Sources/PheronAgentCore/Memory/MemoryContextBuilder.swift`, `SessionSummaryStore.swift`

**Issue:**  
The comment in `MemoryContextBuilder.build()` stated "≤ 1800 chars" but the code did not enforce any truncation. As the session progressed, memory injection grew: 343 → 611 → 755 → ... → 1991 characters. Every increase stole tokens from the context window budget, yet compaction was not triggered.

**Fix:**  
Layer budgets were strictly enforced using `String.prefix()`:

| Layer | Source | Budget |
|---|---|---|
| Layer 1 | DailyMemoryStore (today + yesterday) | 400 chars |
| Layer 2 | KNOWLEDGE_BASE_public.md | 400 chars |
| Layer 3 | SessionSummaryStore ring buffer | 700 chars |

Inside `SessionSummaryStore.loadAsContext()`, the outcome snippet was reduced from `prefix(250)` to `prefix(120)`; 5 entries now fit comfortably inside the Layer 3 budget.

---

## P2 — ANE Classifier Hardware Priority

**File:** `Sources/PheronAgentCore/LLM/ANEInferenceActor.swift`

**Issue:**  
The hardware-related Turkish words "işlemci", "bellek", and "hafıza" (meaning processor, memory, RAM) were present in the `simpleQuestionMarkers` list. Since this list ran before the hardware guard, queries like "give me processor and ram info for my Mac" were incorrectly categorized as `.chat` instead of `.hardware`, bypassing the telemetry tool.

**Log evidence:** `[ANE CLASSIFIED] Category: chat` — incorrect classification.

**Fix:**  
Divided `classifyIntent()` into 4 priority layers:

```
PRIORITY 0: Hardware (cpu, gpu, ram, processor, memory, ...) → .hardware
PRIORITY 1: Weather (weather, temperature, forecast) → .weather  
PRIORITY 2: ChatPriorityGuard (hi, hello, thanks, ...) → .chat
PRIORITY 3: Simple question guard (date, time, calculate, ...) → .chat / .systemManagement
```

Hardware terms were **removed** from `simpleQuestionMarkers` and moved to the PRIORITY 0 list.

---

## P3 — Web Tool 14-Turn Cascade Failure

**Files:** `Sources/PheronAgentCore/ToolEngine/Tools/WebTools.swift`, `SafariAutomationTool.swift`

**Root Cause Chain:**
1. The model used an invalid `action='read'` parameter with `safari_automation` → `AgentToolError.invalidParameter` was thrown.
2. The model tried `web_fetch` → `URLError` was thrown → became `AgentToolError.executionError`.
3. The model tried `shell_exec curl ollama.com` → blocked by `LogicGate` (non-whitelisted domain).
4. `CriticAgent` evaluated each turn as UNOB:FAIL.
5. 14 turns passed → failed to produce a new action, locking the loop.

**Fix 1 — `WebFetchToolWrapper.execute()`:**  
Terminal network errors no longer throw; they return a user-readable soft-failure string:

```swift
case .notConnectedToInternet, .networkConnectionLost, .timedOut,
     .cannotConnectToHost, .cannotFindHost, .dnsLookupFailed:
    return "[WEB_UNAVAILABLE] No internet connection or request timed out..."
```

**Fix 2 — `SafariAutomationTool` `read` action:**  
Added `case "read":` — accepts a `url` parameter, attempts loading via URLSession first (8s timeout), and falls back to opening Safari for scraping if it fails. The `description` was updated, and the `default:` error message now lists all valid actions.

---

## P4 — Critic Trivial Signal Auto-Pass

**File:** `Sources/PheronAgentCore/AgentEngine/OrchestratorRuntime.swift`

**Issue:**  
`handleReview()` called the LLM Critic in every single state. Even a web tool returning a `[WEB_UNAVAILABLE]` observation went through a full LLM review cycle, consuming the 2048 token budget.

**Fix:**  
Added a `trivialPassSignals` guard alongside the widget auto-pass check:

```swift
let trivialPassSignals = ["[WEB_UNAVAILABLE]", "EMAIL_SENT", "FILE_SAVED_SUCCESSFULLY"]
if trivialPassSignals.contains(where: { lastObservation.contains($0) }) {
    // PASS directly without an LLM call
    return true
}
```

**Note:** `maxTokens: 2048` was not modified — it was intentionally increased in v29.1 because Qwen 3.5 sometimes ignores the `enable_thinking: false` instruction, causing the `<think>` block to deplete the token budget before the UNOB verdict is written.

---

## P5 — SubagentRegistry Depth Tracking + PluginCraftEngine

**Files:** `SubagentRegistry.swift`, `SubagentTool.swift`, `PluginCraftEngine.swift`

### SubagentRegistry
`register(id:runtime:depth:)` now tracks spawn depth:
- `maxDepthReached: Int` — maximum depth observed during the session.
- `totalSpawnCount: Int` — non-decreasing total spawn counter.
- `getMaxDepth()` / `getTotalSpawns()` — diagnostic accessors.

`SubagentTool.execute()` now passes `depth: childSession.recursionDepth` to `register`.

### PluginCraftEngine
- Changed `init()` `FileManager.urls(...).first!` force-unwrap to `PathConfiguration.shared.applicationSupportURL` (UNO rule compliance).
- Replaced `runShell()` `process.waitUntilExit()` (which blocks the Swift concurrency thread) with an async continuation pattern using `terminationHandler`.

---

## New Development Sprint (Same Day — v9.1)

| # | Change | File |
|---|-----------|-------|
| 1 | `WebSearchToolWrapper` soft-fail + `[SEARCH_UNAVAILABLE]` Critic auto-pass | `WebTools.swift`, `OrchestratorRuntime.swift` |
| 2 | Removed "kaç" (how many) marker in `ANEInferenceActor` to prevent sub-word matching | `ANEInferenceActor.swift` |
| 3 | Changed `PluginCraftEngine` `interfaceURL` to `Bundle.main.url(forResource:withExtension:)` | `PluginCraftEngine.swift` |
| 4 | `CriticAgent.review()` static method — separated verdict logic from `OrchestratorRuntime` | `CriticAgent.swift`, `OrchestratorRuntime.swift` |
| 5 | Integrated `PromptCacheManager` call site — enabled cache hits in `CriticAgent.review()` | `PromptRegistry.swift`, `CriticAgent.swift` |
| 6 | `SubagentRegistry.register(maxDepth:)` — outputs warning log when approaching depth limits | `SubagentRegistry.swift`, `SubagentTool.swift` |

---

## v9.2 — MLXVLM Semantic Vision Integration (Same Day)

### Decision: Swift-native MLXVLM instead of Python mlx-vlm

`mlx-vlm` v0.5.0 (Blaizzy) is a Python library — requiring Swift FFI or process boundaries. The required `MLXVLM` is already present in the dependency tree inside the `mlx-swift-lm` package. It can be accessed directly using `@preconcurrency import MLXVLM`, introducing zero additional dependencies.

### Hardware Gating

| RAM | Model | Status |
|-----|-------|-------|
| < 24 GB | — | Disabled (graceful fallback) |
| 24–31 GB | Qwen2.5-VL-3B-Instruct-4bit | Active |
| ≥ 32 GB | Qwen3-VL-4B-Instruct-MLX-4bit | Active |

Users can override this using `UserDefaults.standard.bool(forKey: "vlmEnabled")`.

### New Components

| Component | Description |
|---------|----------|
| `VLMInferenceActor.swift` | Memory-gated actor; loads model container, prepares input, runs inference, and parses using ThinkParser. |
| `SemanticVisionTool.swift` | UBID 84, `semantic_vision` tool; loads `CIImage`, runs VLM inference, 16 GB fallback. |
| `ToolIDs.swift` | Added `case semanticVision = 84` |
| `Orchestrator.swift` | Registered `SemanticVisionTool()` |

### Import Nuance

`loadModelContainer(from: URL)` (the parameterless convenience overload) resides in the `swift-tokenizers-mlx / MLXLMTokenizers` package instead of `MLXLMCommon`. Added `import MLXLMTokenizers` to `VLMInferenceActor.swift`.

---

## Remaining Risks

| Risk | File | Priority | Status |
|------|-------|---------|-------|
| `WebSearchToolWrapper` network error still throws | `WebTools.swift` | Medium | ✅ Resolved (v9.1) |
| `PluginCraftEngine` `interfaceURL` is fragile | `PluginCraftEngine.swift` | Medium | ✅ Resolved (v9.1) |
| `ANEInferenceActor` "kaç" sub-word matching | `ANEInferenceActor.swift` | Medium | ✅ Resolved (v9.1) |
| `PromptCacheManager.resolve()` is never called | `PromptCacheManager.swift` | Low | ✅ Resolved (v9.1) |
| `SubagentRegistry` lacks max depth warning | `SubagentRegistry.swift` | Low | ✅ Resolved (v9.1) |
| `CriticAgent.swift` is an empty shell | `CriticAgent.swift` | Architectural | ✅ Resolved (v9.1) |
| Lacks VLM startup bootstrap (model not auto-loaded) | `VLMInferenceActor.swift` | Medium | Open |
| `vlmEnabled` toggle missing from SettingsView | `SettingsView.swift` | Low | Open |
| `ExperienceVault.swift:25` false-positive `try?` warning | `ExperienceVault.swift` | Low | Open |
| `PromptCacheManager` lacks hit-rate logging | `PromptCacheManager.swift` | Low | Open |
