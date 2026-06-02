# Architecture Overview

Pheron Agent is a high-performance, modular AI orchestration system built on **Swift 6** and **Native Systems** for the macOS ecosystem.

## 1. Modular Structure (Swift Package Manager)

The project leverages a multi-target structure with clear separation of concerns:

- **PheronAgent (App):** SwiftUI-based main application layer. Manages the user interface and application lifecycle.
- **PheronAgentCore:** The heart of the system. Manages LLM inference, the Agent Engine (Orchestrator, Planner, Executor), memory architecture, and security protocols.
- **PheronAgentUI:** Library containing shared UI components used across the app (such as `NeuralSightCards`, `TulparView`).
- **PheronAgentXPC:** Secure and sandboxed inter-process communication (IPC) executable helper for privileged tasks.
- **Titan Hub (Local API Server):** Native HTTP/REST service with Ollama and OpenAI endpoint compatibility.
- **uma-bench:** Benchmark tool measuring Apple Silicon Unified Memory Architecture (UMA) performance.

## 2. Swift 6 and Concurrency

The system is designed in compliance with Swift 6 **Strict Concurrency** rules:
- **Actors & Distributed Actors:** Components such as `InferenceActor` and `InternalMonologueActor` utilize the Actor model to prevent data races.
- **Async/Await:** All asynchronous tasks are handled via structured Swift concurrency instead of legacy GCD/`DispatchQueue`.

## 3. On-Device Execution: Apple Silicon & MLX

Pheron Agent minimizes external cloud API dependencies:
- **MLX Swift:** Directly utilizes Apple Silicon (M-series) Neural Engine and GPU cores for on-device inference via the MLX framework.
- **Unified Memory Architecture (UMA):** Optimizes memory buffer pinning to get maximum throughput from Apple Silicon's shared memory layout.

## 4. UNO (Unified Native Orchestration)

The application's native IPC highway, UNO, replaces traditional JSON serialization with a **Binary-Native** protocol:
- **XPC Services:** Communication between modules is isolated via Apple's native XPC framework.
- **Binary Only:** Data is transported within the system in binary format (PropertyList) to eliminate parsing latency.
- **SecuritySentinel:** Enforces biometric verification and checks PII leakage rules.
- **GuardAgent:** Audits AI command proposals in real-time to protect local files and settings.

---

### Technical Details & Reference
- **Package Configuration:** Modularity and targets are defined in [[Package.swift]].
- **Workspace Bounds:** Standardized workspace directories are configured under `~/Workspaces/PheronAgent/`.
- **Project Structure:** The project directory hierarchy can be inspected in [[project_tree]].
- **Code Entry Point:** Code examples for app initialization are available in [[entry_point_code]].

---

## 5. User Interaction Layer (v10.x Updates)

### Per-Token Streaming

Chat and report generation phases support per-token streaming:

- `LLMTypes.CompletionRequest.onToken: (@Sendable (String) -> Void)?` — Token callback field.
- `MLXProvider`: Think-block-aware streaming. Reasonings inside `<think>` tags are buffered and hidden from the UI.
- `Orchestrator.streamingMessage: @Published String` — Accumulates streaming tokens on the `@MainActor`.
- `ChatWindowView`: Live streaming bubble — updates dynamically and transitions atomically on final completion.
- `ChatBubble`: Supports Markdown rendering (bold, italic, code block). `CodeBlockView` provides monospace font, language label, and a copy button.

### CLARIFY Protocol

If a task is ambiguous, the agent stops and prompts the user instead of guessing:

```
<final>CLARIFY("Which directory did you mean?")</final>
```

- `ThinkParser.tryParseClarify()` runs prior to tool execution dispatch.
- `OrchestratorRuntime` delivers the query to the UI, ending the run cleanly.
- `CriticAgent` skips LLM evaluations for CLARIFY results, returning an auto-PASS.

### HardwareAdaptiveParams

`InferenceActor.generate()` uses dynamic configs tailored to hardware specs (`AutoConfigManager.shared.adaptiveParams()`), adjusting `maxKVSize`, `topK`, `minP`, and speculative decoding on the fly. See [DECISIONS.md — ADR-018](../DECISIONS.md).
