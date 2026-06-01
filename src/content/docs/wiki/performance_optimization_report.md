# Performance Optimizations — Implementation Report (v8.1)

**Implementation Date:** 2026-05-04  
**Status:** Production-ready, clean build

---

## Summary

In phase v8.1, three primary performance optimizations were implemented in `InferenceActor.swift`. These optimizations address issues with chat latency, memory management, and inference speed.

---

## Item 5 — Rotating KV Cache (maxKVSize)

**Implementation:** Added to the `GenerateParameters` block inside `InferenceActor.generate()`.

```swift
parameters.maxKVSize = 8192
```

**Impact:**
- MLX uses `RotatingKVCache` instead of `KVCacheSimple`.
- After 8192 tokens, older entries (preserving the first 4 tokens) are discarded.
- Prevents unbounded KV cache growth during long agent execution loops.
- No changes required in code path — just a single line change.

**Trade-off:** Contexts longer than 8192 tokens will "forget" older parts. This is negligible for most chats and single tasks. For long research tasks, `maxKVSize = 16384` can be evaluated.

---

## Item 4 — Wired Memory (WiredBudgetPolicy)

**Implementation:** A background task runs after `loadModel()`, plus a ticket is generated on each `generate()` call.

### Measurement (Background Task)

```swift
Task { [container] in
    let measureParams = GenerateParameters(maxTokens: 32, temperature: 0.6)
    let m = try await container.perform { ctx in
        try await WiredMemoryUtils.tune(context: ctx, tokenCount: 64, parameters: measureParams)
    }
    self.wiredMeasurement = m
    // m.weightBytes, m.kvBytes, m.workspaceBytes → log
}
```

`WiredMemoryUtils.tune()` performs an actual prefill pass with 64 tokens and measures exact memory values, rather than using estimates.

### Ticket Generation (On each generate() call)

```swift
private func makeWiredTicket() -> WiredMemoryTicket? {
    guard !isCPUOnly, let m = wiredMeasurement else { return nil }
    let policy = WiredBudgetPolicy(baseBytes: m.weightBytes + m.workspaceBytes, id: wiredPolicyID)
    return policy.ticket(size: m.kvBytes, kind: .active)
}
```

`wiredPolicyID: UUID` is constant, meaning tickets are grouped under the same policy instances.

### Usage

```swift
let wiredTicket = self.makeWiredTicket()
let resultStream = try await container.generate(
    input: input, 
    parameters: parameters, 
    wiredMemoryTicket: wiredTicket
)
```

When `ModelContainer.generate()` receives a ticket, it enforces the memory limit during inference using `WiredMemoryTicket.withWiredLimit { }`.

**Impact:**
- Model weights are pinned in RAM, lowering first-token latency.
- Calls `mlx_set_wired_limit()` on M-series chips (if Metal acceleration is supported).
- Automatically deactivates in CPU-only mode via the `isCPUOnly` guard.
- If tuning is not complete (`wiredMeasurement == nil`), it proceeds without a ticket, ensuring graceful degradation.

---

## Item 6 — Speculative Decoding (Draft Model)

**Implementation:** Added draft model support to `InferenceActor`. The infrastructure is fully implemented, with opt-in activation.

### New Properties and APIs

```swift
private var draftModelContainer: ModelContainer? = nil

// Automatic loading: if {mainModelURL}-draft directory exists
private func tryLoadDraftModel(for mainModelURL: URL) async

// Manual loading
public func loadDraftModel(at url: URL) async throws
```

### Automatic Loading Logic

```swift
// After the main model is loaded:
Task {
    await self.tryLoadDraftModel(for: url)
}
// Checks for the existence of the url.lastPathComponent + "-draft" directory
// If found, loads it via loadModelContainer(from:)
```

Example: If the main model is `Models/qwen-3.5-9b-4bit`, the helper checks for `Models/qwen-3.5-9b-4bit-draft`.

### Speculative Decode Path

```swift
if let draftContainer = self.draftModelContainer {
    let draftBox = await draftContainer.perform { ctx in
        UnsafeTransferBox<any LanguageModel>(ctx.model)
    }
    let inputBox = UnsafeTransferBox(input)
    resultStream = try await container.perform { mainCtx -> AsyncStream<Generation> in
        try MLXLMCommon.generate(
            input: inputBox.take(),
            parameters: parameters,
            context: mainCtx,
            draftModel: draftBox.take(),
            numDraftTokens: 4,
            wiredMemoryTicket: wiredTicket
        )
    }
}
```

### UnsafeTransferBox Pattern

```swift
private final class UnsafeTransferBox<T>: @unchecked Sendable {
    var value: T?
    init(_ value: T) { self.value = value }
    func take() -> T { defer { value = nil }; return value! }
}
```

This uses the same approach as `SendableBox` (package-internal) in `MLXLMCommon`. `LMInput` and `LanguageModel` pass Swift 6 strict concurrency boundaries using the `@unchecked Sendable` wrapper. This is safe because:
1. `LMInput` is consumed exactly once (move semantics).
2. `LanguageModel` weights are read-only after `eval()`, making concurrent reads safe.
3. KV caches are separate for each inference session, avoiding state sharing.

### Expected Impact

| Scenario | Expected Speedup |
|---|---|
| Qwen3-0.5B draft + Qwen3.5-9B main | 2-4x TPS |
| Greedy decoding (temperature=0) | Highest acceptance rate |
| High entropy (temperature=0.7+) | Lower acceptance rate |

**Note:** Speculative decoding requires **tokenizer compatibility**. The draft model and main model must belong to the same tokenizer family. Mixing model families will corrupt output tokens.

---

## Complete GenerateParameters Configuration (v8.1)

```swift
var parameters = GenerateParameters(maxTokens: maxTokens, temperature: 0.6)
parameters.repetitionPenalty = 1.15      // repetition penalty
parameters.repetitionContextSize = 64   // 64 token window
parameters.kvBits = 4                   // 4-bit KV quantization
parameters.kvGroupSize = 64             // quantization group size
parameters.quantizedKVStart = 256       // quantization starts after 256 tokens
parameters.topP = 0.9                   // nucleus sampling
parameters.minP = 0.05                  // minimum probability threshold
parameters.maxKVSize = 8192             // Rotating KV Cache window (Item 5)
```

---

## Past Performance Issues and Resolutions

| Issue | Root Cause | Resolution |
|---|---|---|
| "hello" response takes 90 seconds | `<think>` block generates 800+ tokens | `enable_thinking: false` → `additionalContext` |
| `**` and `*` characters visible in UI | Model formats raw markdown | `stripRawMarkdown()` only applied for local chat |
| "Thinking Process:" leaks into UI | `[RULE: ...]` styled prompt triggered structured output | `stripThinkingOutput()` + minimal English system prompt |
| Repetitive `!!!!` characters | Repetition occurred before `<think>` block finished | `repetitionPenalty=1.15, repetitionContextSize=64` |
| System prompt silently ignored | `InferenceActor.generate()` never added it | `mlxMessages.insert(systemMessage, at: 0)` |
| Unbounded KV Cache growth | `KVCacheSimple` grew infinitely | `maxKVSize=8192` → `RotatingKVCache` |

---

## Next Steps

1. **Download Draft Model:** Download a compatible 0.5B or 1.5B model from the Qwen3 family via `mlx-community` and place it in the `-draft` directory.
2. **Validate Wired Memory:** Verify the `📊 [v3-Wired] Budget measured` line in logs.
3. **Kernel Fusion:** Implement Attention and LayerNorm optimizations via MLX `mx.compile` (Phase A).
4. **Prefix Sharing:** Use a shared KV Cache pointer for common system prompts (Phase B).

---

## Item 7 — HardwareAdaptiveParams (2026-05-17)

**Implementation:** `InferenceActor.generate()` now consumes the result of `AutoConfigManager.shared.adaptiveParams()`. Hardcoded configuration values have been removed.

**Core Changes:**

| Parameter | Legacy (Hardcoded) | New (Adaptive) |
|-----------|-----------------|-----------------|
| `topK` | — (default) | 20 (Qwen3 official spec) |
| `minP` | 0.05 | 0 (Qwen3 official spec) |
| `maxKVSize` | 8192 | 8192 (≤8GB systems), 131072 (≥16GB systems) |
| `kvBits` | 4 | 4, or `nil` (if draft model is active) |

**Speculative Decoding + KV Quantization Conflict:** When a draft model is active, `kvBits` is set to `nil`. Both features cannot be active at the same time; `adaptiveParams()` manages this conflict dynamically.

**Impact:**
- On 16 GB+ systems, the KV window expanded 16x (8192 → 131072 tokens), mitigating context loss in long research runs.
- Improved generation quality using Qwen3 recommended parameters.
- Speculative decoding no longer conflicts with KV cache quantization.

---

## Item 8 — Per-Token Streaming (2026-05-19)

**Implementation:** Each generated token is immediately emitted to the UI during chat and report phases.

**Architecture:**
```
InferenceActor.generate() → token stream
  → MLXProvider: think-block buffer (swallowed until </think> is encountered)
  → CompletionRequest.onToken callback
  → OrchestratorRuntime.onStreamingToken handler
  → Orchestrator.streamingMessage (MainActor @Published)
  → ChatWindowView: live bubble updates
```

**Think-block-aware streaming details:** `MLXProvider` maintains a `thinkMode: Bool` flag. When `<think>` is parsed, `thinkMode = true` — tokens are buffered internally instead of being forwarded to `onToken`. When `</think>` is detected, `thinkMode = false` — subsequent tokens flow directly to the UI.

**Impact:**
- Users see the first token within ~1-2 seconds (previously, UI waited for full generation to complete, taking ~30–90 seconds).
- Think block tokens (internal reasoning) never leak to the UI.
- Planning, critic, and classification phases do not use streaming (`onToken = nil`).

**New APIs:**
```swift
// LLMTypes.swift — CompletionRequest
public var onToken: (@Sendable (String) -> Void)?

// Orchestrator.swift
@Published var streamingMessage: String = ""

// OrchestratorRuntime.swift
private var onStreamingToken: (@Sendable (String) -> Void)?
```
