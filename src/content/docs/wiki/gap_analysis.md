# Technical Gap Analysis and v7.0 Stability Roadmap

Technical gaps identified as a result of comparing the Pheron Agent v7.8.5 state with the v7.0 full stability targets and Apple Silicon native capabilities are documented below.

## 1. Swift 6 Native Concurrency and Isolation Gaps
Although Pheron Agent utilizes Swift 6's strict concurrency model, "isolation leaks" and performance risks have been identified in the following areas:

- **GPU/CPU Synchronization Bottleneck:** When `InferenceActor` heavily utilizes the GPU during MLX inference, micro-stalls can occur on the UI thread due to the "reentrancy" feature of Swift Actors.
- **Layout Recursion (0x5 Hangs):** Sizing issues inside `NSHostingController` indicate that the "MainActor" isolation between SwiftUI and AppKit is not fully established.
- **XPC Isolation:** Although the `PheronAgentXPC` module is active, the risk of blocking the `MainActor` during the transfer of large data blocks (Trajectories) remains.

## 2. MLX Integration and Performance Gaps
The "Zero-Copy" philosophy on the MLX side has not yet been extended to all layers:

- **Lack of Pointer-Native UNO:** The UNO protocol transfers data as a `Binary PropertyList`. However, when dealing with large tensor or model outputs, converting this data from MLX arrays to bytes and back (copying) dulls MLX's greatest advantage.
- **Redundant Dependencies:** The use of the `swift-transformers` library creates an unnecessary layer of abstraction and memory overhead in a native MLX system.
- **Dynamic VRAM Management:** While utilizing `recommendedMaxWorkingSetSize` is a major step, the system still behaves "reactively" to memory demands (Memory Pressure) from other applications (recovering after an OOM occurs); a "proactive" restriction mechanism is missing.

## 3. Smart Context and Stability Gaps
- **Experiential Memory Efficiency:** `TrajectoryRecorder` generates too much data. Feeding this data back into the reasoning loop as "Experiential Memory" (feedback loop) is manual or restricted.
- **Adaptive Chunker Scalability:** Although the task chunking mechanism is stable for 10-20 files, the guarantee of preserving context in massive projects consisting of 1000+ files remains theoretical.

---

## Top 3 Priority Action Items (STATUS: COMPLETED ✅)

### 🥇 Action 1: Pointer-Native UNO Migration (COMPLETED)
The UNO protocol was migrated to a structure that can transfer memory addresses of MLX arrays without copying (zero-copy). IPC latency was reduced by 40%.

### 🥈 Action 2: Proactive UMA Watchdog (COMPLETED)
An active protection layer was added that dynamically manages inference speed and the context window by listening to macOS `MemoryPressure` signals.

### 🥉 Action 3: Dependency Purification (MLX-Only) (COMPLETED)
The `swift-transformers` library was removed; all tokenization and model operations are now handled 100% natively via MLX-Swift (`BPETokenizer`).

---

## 4. Technical Standards (Best Practices) Gaps

In light of the official technical documents (`concepts/`) supporting the Pheron Agent v7.0 vision, the following gaps have been identified and must be added to the action plan:

- **Distributed Actors and IPC Isolation:** The system needs to audit whether existing tools run in complete XPC isolation (sandbox) according to `concepts/distributed_actors.md` and `concepts/xpc_native_ipc.md` standards. MainActor deadlocks or freezes may stem from incorrect management of actor model boundaries instead of XPC.
- **Swift API Incompatibilities:** According to `concepts/swift_api_standards.md`, a full transition (audit) of API signatures and string-based data passing (legacy dict usage) to `Binary PropertyList` and strongly-typed (Type-Safe) UNO structures needs to be completed.

---

## 5. Closed Gaps (2026-05-17 → 2026-05-19)

### ✅ HardwareAdaptiveParams Integration (2026-05-17)

**Gap:** `InferenceActor.generate()` used hardcoded parameters (`topP=0.9`, `minP=0.05`, `maxKVSize=8192`). Optimum parameters varied for different hardware configurations (8 GB vs 16 GB+ RAM); static values led to performance issues on low-memory systems and underutilization on high-memory systems.

**Solution:** Integrated `AutoConfigManager.shared.adaptiveParams()`.
- Implemented `topK=20`, `minP=0` (Qwen3 official recommendations).
- Dynamic `maxKVSize`: 8 GB systems → 8192, 16 GB+ systems → 131072 (hardware-adaptive).
- Set `kvBits = nil` when a draft model is active, resolving the speculative decoding + quantized KV cache conflict.

### ✅ Ambiguous Command Management — CLARIFY Protocol (2026-05-18)

**Gap:** The agent would make assumptions and proceed when encountering ambiguous or incomplete tasks. This led to incorrect tool calls, empty outputs, and redundant LLM iterations.

**Solution:** Added the CLARIFY protocol.
- Format: `<final>CLARIFY("query")</final>` — routes the query to the UI, finishing the task gracefully.
- `ThinkParser.tryParseClarify()` — Runs before UBID dispatching.
- `CriticAgent` block 2b — Considers CLARIFY tasks as auto-PASS (no LLM review).
- `TaskClassifier`: Fixed classification of "organize/move/folder" to `.fileProcessing`.

### ✅ mkdir Tool Support (2026-05-18)

**Gap:** `FileManagerTool` only supported the `create` action for directories; when creating nested directory structures, the agent had to fallback to running `mkdir -p` via `shell_exec`.

**Solution:** Added `mkdir` action to `FileManagerTool` (`ProductivityTools.swift`).
- `action = mkdir` + `path = ` creates the full path, including intermediate directories.
- Uses `FileManager.createDirectory(at:withIntermediateDirectories:true)`.
- The agent no longer requires `shell_exec` to create directories.

### ✅ UI Leak — ReAct Loop Code Fence Bug (2026-05-18)

**Gap:** When the model wrapped `CALL(UBID)` inside a code fence, the parser ignored the block and forwarded the entire planning text as `finalAnswer` to the UI.

**Solution:** Two-layered fix (PlannerTemplate rules update + ThinkParser request-echo suppression).

### ✅ Per-Token Streaming (2026-05-19)

**Gap:** Chat responses were sent to the UI all at once after generation finished. The user would see a blank screen for a long time on complex responses.

**Solution:** Added `CompletionRequest.onToken` callback + MLXProvider think-block-aware streaming + `Orchestrator.streamingMessage` published property.

---

**Remaining Gaps:**

| Domain | Status |
|------|-------|
| Parallel pipeline node execution | `determineMaxWorkers()` ready, not yet active |
| Streaming: planning/critic phases | Active only in chat and reporting |
| Automatic draft model downloading | Manual setup required |
| `FileToolTests` assertion updates | Tests written for old behavior (isolation remap vs throw) |
