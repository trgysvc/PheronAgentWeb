# Performance Optimizations — Implementation Report (v8.1)

**Implementation Date:** 2026-05-04  
**Status:** Production-ready, build clean

---

## Summary

In phase v8.1, three core performance optimizations were implemented in `InferenceActor.swift`. These address chat latency, memory management, and local inference execution speeds.

---

## 1. Rotating KV Cache (maxKVSize)

**Implementation:** Added to the `GenerateParameters` block in `InferenceActor.generate()`.

```swift
parameters.maxKVSize = 8192
```

**Impact:**
- MLX uses `RotatingKVCache` instead of `KVCacheSimple`.
- After reaching 8192 tokens, older entries (preserving the first 4 tokens) are discarded.
- Prevents unbounded memory growth in long agent loops.
- Minimal change impact: configured in a single line.

**Trade-off:** Contexts longer than 8192 tokens will discard older memory. This is negligible for standard chat sessions. For extremely long research tasks, `maxKVSize` can be configured up to `16384` dynamically.

---

## 2. Wired Memory (WiredBudgetPolicy)

**Implementation:** Background initialization task scheduled after calling `loadModel()`, combined with execution ticketing on every `generate()` call.

### Measurement (Background Task)

```swift
Task { [container] in
    let measureParams = GenerateParameters(maxTokens: 32, temperature: 0.6)
    let m = try await container.perform { ctx in
        try await WiredMemoryUtils.tune(context: ctx, tokenCount: 64, parameters: measureParams)
    }
    self.wiredMeasurement = m
}
```

`WiredMemoryUtils.tune()` executes a prefill pass with 64 tokens to measure exact memory footprint parameters at runtime.

### Ticket Creation (On each generate() call)

```swift
private func makeWiredTicket() -> WiredMemoryTicket? {
    guard !isCPUOnly, let m = wiredMeasurement else { return nil }
    let policy = WiredBudgetPolicy(baseBytes: m.weightBytes + m.workspaceBytes, id: wiredPolicyID)
    return policy.ticket(size: m.kvBytes, kind: .active)
}
```

The `wiredPolicyID: UUID` remains constant, grouping related tickets under the same budget policy.

### Execution

```swift
let wiredTicket = self.makeWiredTicket()
let resultStream = try await container.generate(
    input: input, 
    parameters: parameters, 
    wiredMemoryTicket: wiredTicket
)
```

When `ModelContainer.generate()` receives a ticket, it maintains the limit using `WiredMemoryTicket.withWiredLimit { }` for the duration of inference.

**Impact:**
- Model weights are pinned in RAM, reducing first-token latency.
- Calls `mlx_set_wired_limit()` on Apple Silicon (when Metal support is active).
- Gracefully degrades and runs without a ticket if measurements are not yet complete or in CPU-only mode.

---

## 3. Speculative Decoding (Draft Model)

**Implementation:** Added draft model support to `InferenceActor`. The infrastructure is fully implemented and opt-in.

### New API Properties

```swift
private var draftModelContainer: ModelContainer? = nil

// Auto-loads if {mainModelURL}-draft exists
private func tryLoadDraftModel(for mainModelURL: URL) async

// Manual loading
public func loadDraftModel(at url: URL) async throws
```

### Auto-Loading Logic

```swift
Task {
    await self.tryLoadDraftModel(for: url)
}
// Checks for directory named url.lastPathComponent + "-draft"
// Loads via loadModelContainer(from:) if present
```

For example, if the main model is at `Models/qwen-3.5-9b-4bit`, the system looks for `Models/qwen-3.5-9b-4bit-draft`.

### Speculative Decoding Execution Flow

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

Passes `LMInput` and `LanguageModel` references safely across Swift 6 strict concurrency boundaries using `@unchecked Sendable`. It is safe because:
1. `LMInput` is consumed exactly once (move semantics).
2. The `LanguageModel` weights are read-only after evaluation.
3. KV caches are isolated per execution context.

### Expected Speedups

| Scenario | Expected Speedup |
|---|---|
| Qwen3-0.5B draft + Qwen3.5-9B main | 2-4x TPS |
| Greedy decoding (temperature=0) | Maximum acceptance rate |
| High entropy (temperature=0.7+) | Lower acceptance rate |

*Note:* Speculative decoding requires the draft and main models to share the same tokenizer family.

---

## 4. Full GenerateParameters Configuration (v8.1)

```swift
var parameters = GenerateParameters(maxTokens: maxTokens, temperature: 0.6)
parameters.repetitionPenalty = 1.15
parameters.repetitionContextSize = 64
parameters.kvBits = 4
parameters.kvGroupSize = 64
parameters.quantizedKVStart = 256
parameters.topP = 0.9
parameters.minP = 0.05
parameters.maxKVSize = 8192
```

---

## 5. Historical Latency Issues & Solutions

| Issue | Root Cause | Solution |
|---|---|---|
| Simple chat responses take 90+ seconds | `<think>` block generates 800+ tokens | Configured `enable_thinking: false` in `additionalContext` |
| Markdown characters show raw in chat | Model outputs raw Markdown wrappers | Implemented `stripRawMarkdown()` on local chat outputs |
| "Thinking Process:" leaks into UI | Prompts triggered structured outputs | Implemented `stripThinkingOutput()` and refined system prompts |
| Repetitive character loops (`!!!`) | Early repetition before context end | Configured `repetitionPenalty=1.15, repetitionContextSize=64` |
| System prompt ignored | Prompt inserts were missing | Fixed order of message assembly in `InferenceActor` |
| Unbounded memory growth | `KVCacheSimple` storage | Configured `maxKVSize=8192` rotating KV Cache |

---

## 6. Item 7 — HardwareAdaptiveParams (2026-05-17)

**Implementation:** `InferenceActor.generate()` delegates parameter scaling to `AutoConfigManager.shared.adaptiveParams()`.

Key changes:
- **`topK`**: 20 (Qwen3 native recommendation).
- **`minP`**: 0 (Qwen3 native recommendation).
- **`maxKVSize`**: Scales from 8192 tokens (devices with ≤8GB RAM) up to 131,072 tokens (devices with ≥16GB RAM).
- **`kvBits`**: Standardized to 4-bit, or `nil` when speculative decoding is active.

---

## 7. Item 8 — Per-Token Streaming (2026-05-19)

**Implementation:** Tokens are pushed to the UI instantly during chat and report phases.

```
InferenceActor.generate() → token stream
  → MLXProvider: think-block buffer (suppresses <think> tags)
  → CompletionRequest.onToken callback
  → OrchestratorRuntime.onStreamingToken handler
  → Orchestrator.streamingMessage (MainActor @Published)
  → ChatWindowView updates
```

Internal reasoning tokens generated within `<think>` tags are fully buffered and filtered out of the user-facing stream.
