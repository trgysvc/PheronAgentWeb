# 'Triple-Threat' Architecture Deep Dive

Pheron Agent's operational superiority comes from its **'Triple-Threat'** architecture, which is built on three core pillars: Deterministic Reasoning, Vision-Based Browser, and Experiential Memory.

## 1. Reasoning (Reasoning Engine & UNO Backbone)

Pheron Agent uses a multi-layered agent hierarchy to solve complex tasks:
- **Distributed Actor Isolation:** All agents are isolated using Swift 6's `distributed actor` structure. IPC (Inter-Process Communication) processes run over XPC with compile-time safety enforcement.
- **UNO Pointer Migration:** Introduced in v7.0, this architecture eliminates memory copy operations during inter-actor data transfers. Pointers are passed via `SharedMemoryPool` to form a Zero-Copy data highway.
- **Planner/Executor/Guard Hierarchy:** Tasks are divided into atomic steps, executed by UBID-native tools, and audited in real-time.

## 2. Vision-Based Browser (BrowserAgent)

Unlike legacy, externally dependent browser control solutions, Pheron Agent offers fully native browser automation:
- **Safari + WebKit Native:** Leverages Apple's native accessibility APIs via `BrowserAgent` to control Safari visually.
- **CUA (Computer Use Agent) Layer:** Combines Safari's accessibility trees (`AXUIElement`) and WebKit DOM trees into a dual-layered model, allowing interactions with visually identified elements.
- **Zero Middleware:** Runs directly via native system calls without third-party npm packages.

## 3. Experiential Memory

A memory layer that enables the agent to learn from past errors and preserve context:
- **TrajectoryRecorder:** Saves session actions, tool outputs, and loop detection logs in a secure **Binary .plist** format, serving as the system's "black box."
- **MemoryTool:** Semantically stores long-term experiences and user preferences.
- **Must-Preserve Rules:** Guarantees that file paths, critical error messages, and pending tasks are never deleted during context compaction.

## 4. Low-Level Optimization & Hardware Constraints

The v7.0 inference engine runs under the philosophy of "respect the hardware as a constraint":
- **Lazy Evaluation & Graph Fusion:** The reasoning layer integrates with MLX's [Metal Architecture](../concepts/mlx_metal_internals.md). Unnecessary calculations are prevented via lazy evaluation, and GPU efficiency is maximized with kernel fusion.
- **KV Cache & RoPE Precision:** [LLM Inference Standards](../concepts/llm_inference_mechanics.md) directly link the model's context window and attention mechanism with hardware limits (VRAM and MPS optimizations).
- **Memory Anchoring:** Model weights and execution memory are wired in Unified Memory, allowing the orchestrator to treat memory boundaries as deterministic constants.

---

## 5. User Interaction Channels (v10.x)

### CLARIFY Protocol

A structural mechanism that allows the agent to prompt the user instead of guessing on ambiguous tasks:

```
Task → ThinkParser.tryParseClarify() → CLARIFY detected
  → OrchestratorRuntime (.clarification handler)
  → onChatMessage → UI
  → CriticAgent: auto-PASS (block 2b)
  → Task finishes gracefully (success, not error)
```

**Format:** `<final>CLARIFY("Which folder did you mean?")</final>`  
**Key files:** `ThinkParser.swift`, `OrchestratorRuntime.swift`, `CriticAgent.swift`, `Types.swift`

### Per-Token Streaming

Token-by-token UI updates during chat and report phases. Think block tokens are filtered at the MLXProvider layer and never leak the thinking monologue.

**Components:**
- `CompletionRequest.onToken: (@Sendable (String) -> Void)?`
- `MLXProvider`: think-block buffer — swallows tokens until `</think>` is closed
- `OrchestratorRuntime.onStreamingToken`: handler
- `Orchestrator.streamingMessage: @Published String`: MainActor accumulator
- `ChatWindowView`: live bubble → atomic transition to final message on completion
- `ChatBubble`: Markdown rendering, `CodeBlockView` (monospace + copy button)

### Markdown Rendering (ChatBubble)

Assistant messages are rendered in Markdown format instead of raw text. `CodeBlockView` provides:
- Monospace font
- Language label
- Copy button

---

*This architecture makes Pheron Agent a fully autonomous native system rather than a generic LLM wrapper.*
