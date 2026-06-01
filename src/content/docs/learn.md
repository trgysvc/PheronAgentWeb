# Learn Pheron Agent

Pheron Agent is built from the ground up for on-device execution. To understand its capabilities, it is essential to learn about the underlying core technologies that power its fast, secure, and sovereign execution on Apple Silicon.

## Core Technologies

### 1. Swift 6 and strict Concurrency
The entire orchestration engine is written in Swift 6. It strictly enforces compile-time concurrency checking (`Strict Concurrency`) to prevent data race conditions:
- **Actors & Distributed Actors**: Orchestrator sub-components like the `InferenceActor` and `InternalMonologueActor` operate in isolated memory lanes, communicating asynchronously.
- **Structured Concurrency**: Using async/await and `TaskGroup` to execute tools in parallel without blocking main thread interactions.

### 2. Apple Silicon MLX Framework
Instead of using heavy Python runtimes or cloud APIs, Pheron Agent runs local model inference using **MLX**, Apple's machine learning framework tailored for Apple Silicon:
- **Metal Acceleration**: MLX compiles computations directly into Metal shaders to optimize GPU utilization.
- **Wired Memory Pinning**: Models are pinned directly to the Unified Memory (UMA) to avoid page swaps and latency.
- **4-bit Quantization**: Enables running large models (7B, 9B+) on consumer Macs with minimal memory footprint (e.g. `Qwen2.5-7B-Instruct-4bit`).

### 3. Unified Memory Architecture (UMA)
Apple Silicon chips share RAM between the CPU, GPU, and Neural Engine. Pheron Agent utilizes this layout:
- **Zero-Copy Memory**: Image frames from the screen and prompt tokens are read by the GPU and Neural Engine directly without copying buffers across PCI buses.
- **Proactive Memory Pressure Watchdog**: A background manager monitors memory pressure and automatically unloads KV caches or switches to light speculative draft models to avoid OS memory reclaims.

### 4. UNO (Unified Native Orchestration)
The agent uses a custom communication system called UNO:
- **Binary Plist Only**: In accordance with the project rules, JSON is completely banned in runtime communications. It uses PropertyLists (`plist`) for binary-native data encoding.
- **XPC Inter-Process Communication**: Communication between the UI application and the privileged XPC service helper runs securely over standard macOS XPC channels.

## Exploring the Source Code

If you are a developer looking to extend Pheron Agent, start by inspecting these targets in the workspace:

| Module | Role |
|---|---|
| `PheronAgentCore` | The main library handling LLM providers, tool registration, and agent logic. |
| `PheronAgentUI` | Shared SwiftUI components for streaming inputs and performance cards. |
| `PheronAgentXPC` | privilegded actions helper that interfaces with Powermetrics and Accessibility APIs. |
