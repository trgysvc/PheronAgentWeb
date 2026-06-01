# System Stability and Self-Healing

Pheron Agent is equipped with advanced engines to manage local models' constrained resources and recover autonomously from error conditions.

## 1. Self-Healing Engines
Instead of stopping when an error occurs, the system focuses on producing solutions:
- **ToolLoopDetector v2:** Detects when the LLM gets stuck in the same error cycle (ping-pong, polling) by tracking SHA-256 hashes. It cuts the loop at a critical threshold (30 steps), forcing the orchestrator to try a different strategy.
- **AutoRecoveryEngine:** Especially during OOM (Out Of Memory) states, it frees VRAM and automatically restarts the system with the `reload: true` flag.
- **SelfHealingEngine (Shell):** Analyzes errors in shell execution (such as a missing package) and retries by planning a resolution proposal (e.g., `brew install`).

## 2. Dynamic Context Management
Strategies to manage memory pressure and the context window:
- **ContextWindowGuard:**
  - **70% Capacity:** Warns the user and optimizes planning.
  - **85% Capacity:** Triggers the `ContextCompactionEngine`.
- **ContextCompactionEngine:** Compresses context while preserving critical data (such as file paths, UUIDs, TODOs) marked in the "Must-Preserve" list.
  - **[Memory Architecture v30.5](file:///Users/trgysvc/Developer/PheronAgent/Project_Wiki/wiki/memory_architecture.md):** Built on a **2,000 character base preservation limit** and a **Metal-accelerated Vector Search** infrastructure to prevent loss of technical context.
  - **Smart Truncation (Head+Tail):** Retains the beginning and end of the text when bounds are exceeded to prevent Context Tearing.
  - **Habit Discovery:** Automatically identifies recurring user preferences and seals them into long-term memory.
- **AdaptiveTaskChunker:** Breaks down massive workloads (e.g., analyzing 100+ files) into small, manageable chunks based on the hardware state (`HardwareMonitor`) and `ContextBudget`. Each chunk carries a summary of the previous one to ensure context continuity.

## 3. Hardware-Aware Protection (Thermal & UMA Guard)
- **UMA Watchdog Integration:** Monitored via `LocalModelHealthMonitor`, this system tracks Apple Silicon's Unified Memory Architecture (UMA) in real-time.
- **Proactive Memory Pressure:** Listens to OS `MemoryPressure` signals (Normal, Warning, Critical). When memory pressure exceeds 85%, the KV-cache is automatically compacted and emergency consolidation is triggered via the `DreamActor`.
- **Thermal Guard:** Integrates with macOS's `ProcessInfo.thermalState` API. When the device heats up (Serious/Critical), it introduces autonomous `Task.sleep` delays into the inference loop to lower GPU load and reduce temperature.

---

## 4. v9.0 Stability Sprint Fixes (2026-05-07)

Six production defects were identified and resolved. For full technical details, see [Stability Hotfixes 2026-05-07](stability_hotfixes_2026-05-07.md).

| # | Domain | Issue | Resolution |
|---|------|-------|-------|
| P0 | Safety | The `LogicGate` word "top" was blocking the "Desktop" path | Word boundary matching with `NSRegularExpression` `\b...\b` |
| P0 | LLM | `ModelManager.load()` received 3 concurrent calls on startup | `activeLoadModelID` dedup guard |
| P1 | Memory | `MemoryContextBuilder` grew without budget limits (343→1991 chars) | Per-layer hard cap: 400/400/700 chars |
| P2 | ANE | Hardware terms "processor", "memory" routed incorrectly to `.chat` | Hardware PRIORITY 0 — runs before all guards |
| P3 | Web | `web_fetch` network error caused 14-turn UNOB:FAIL loop | Soft-fail `[WEB_UNAVAILABLE]` + fallback to `read` action |
| P4 | Critic | Terminal observations triggered unnecessary LLM review | `trivialPassSignals` auto-pass guard |
| P5 | Subagent | Spawn depth not tracked, leading to force-unwrap in `PluginCraftEngine` | Added depth tracking + async fix |

---

## 5. v9.2 — Semantic Vision & Architectural Improvements (2026-05-07)

### MLXVLM On-Device Vision Language Model

| RAM | Model | Status |
|-----|-------|-------|
| < 24 GB | — | Disabled — returns `[SEMANTIC_VISION_UNAVAILABLE]` |
| 24–31 GB | Qwen2.5-VL-3B-Instruct-4bit | Active |
| ≥ 32 GB | Qwen3-VL-4B-Instruct-MLX-4bit | Active |

`VLMInferenceActor` handles hardware gating; `SemanticVisionTool` loads a `CIImage` and calls `analyzeImage(ciImage:prompt:)`.

**Decision:** Used Swift-native `MLXVLM` inside `mlx-swift-lm` instead of python `mlx-vlm` library. Zero external dependencies — already present in the dependency tree.

### CriticAgent Refactor

All verdict logic in `OrchestratorRuntime.handleReview()` has been moved to the static `CriticAgent.review()` method. `PromptCacheManager.shared.resolve()` is called for the first time in this method, hitting the static rules cache and optimizing subsequent Critic calls.

### Advanced Auto-Pass Signals

`trivialPassSignals` has been expanded to include: `[WEB_UNAVAILABLE]`, `[SEARCH_UNAVAILABLE]`, `EMAIL_SENT`, and `FILE_SAVED_SUCCESSFULLY`. Observations containing these signals automatically receive a PASS without triggering an LLM review.

---

### Stability Verification & Testing
- **Stress Tests:** System limits and the UNO protocol's threshold limits are tested in the [[UNO_BATTLE_TEST]] document.
- **Error Logs & Analysis:** For past stability issues and their resolutions, see the [[devlog]] records.
- **v9.0/v9.1/v9.2 Hotfix Details:** [stability_hotfixes_2026-05-07.md](stability_hotfixes_2026-05-07.md)

---

## 6. v10.x — ReAct Loop UI Leak & CLARIFY Protocol (2026-05-18)

### ReAct Loop UI Leak Bug (P0)

**Symptom:** The model was transmitting internal planning text ("I found one image...", "The user asked me to...") to the UI as a `finalAnswer`, making internal monologue visible to users.

**Root cause:** The model occasionally wrapped the `CALL(UBID) WITH {...}` block inside triple backticks (code fence). In this case, `ThinkParser` failed to parse the block and returned the entire planning response as `finalAnswer`.

**Two-layered fix:**

| Layer | File | Change |
|--------|-------|-----------|
| Prompt | `PlannerTemplate.swift` | Added Rule 6a: "NEVER wrap CALL in code fences" |
| Parser | `ThinkParser.swift` | Request-echo suppression regex — deletes sentences starting with `"The user asked/wanted/requested..."` inside `cleanForUI()` |

### CLARIFY Protocol (v10.x)

In tasks with ambiguous or missing info, the agent prompts the user instead of guessing. This prevents unnecessary tool calls and wrong interpretations.

**Format:** `<final>CLARIFY("Which folder did you mean?")</final>`

**Flow:**
```
Task received → ThinkParser.tryParseClarify() → CLARIFY detected
  → OrchestratorRuntime: .clarification handler
  → onChatMessage: query sent to UI
  → Task finishes gracefully (success, not error)
  → CriticAgent block 2b: CLARIFY auto-pass (no LLM review)
```

**Affected Files:**
- `Types.swift`: `EliteOutputType.clarification` new enum case
- `ThinkParser.swift`: `tryParseClarify()` — runs before UBID dispatch
- `OrchestratorRuntime.swift`: `.clarification` state handler
- `CriticAgent.swift`: Block 2b auto-pass logic
- `TaskClassifier.swift`: "organize/move/folder" → `.fileProcessing` (before vision)
- `PlannerTemplate.swift`: Added `~/Pictures/Screenshots` default target path rule

### EOS Token Hoisting (2026-05-16)

In `mlx-community` Qwen3.5-9B-4bit, EOS token IDs resided only inside `text_config`. `ModelManager.patchQwen35Config()` copies these tokens (`[248044, 248046]`) to the top-level configuration and generates `generation_config.json` automatically. The model now stops at the designated tokens.

---

## 7. Streaming Infrastructure Stability (2026-05-19)

Think-block-aware streaming: `MLXProvider` buffers tokens until `</think>` is closed, then streams them to the UI via `onToken` callback. This prevents internal reasoning tokens from leaking to the chat bubble. During streaming, the model's thinking output (`<think>...</think>`) is completely hidden; only actual response tokens are appended to `Orchestrator.streamingMessage`.
