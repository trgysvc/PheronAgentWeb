# Pheron Agent — Software Production Rules (For All AI Agents)

This file is read by all AI coding and automation tools.
**Rules are absolute. No exceptions. Rule violations break the architecture.**

---

## ⛔ ABSOLUTE PROHIBITIONS

### 1. JSON Ban — The UNO Rule

**The following code fragments MUST NOT be written in ANY FILE except `UNOExternalBridge.swift`:**

```swift
JSONEncoder()           // PROHIBITED
JSONDecoder()           // PROHIBITED
JSONSerialization       // PROHIBITED
.jsonObject(with:       // PROHIBITED
```

**WHY?**
Pheron Agent is built on the UNO (Unified Native Orchestration) architecture. All internal communications use the **binary PropertyList** format. JSON is only accepted at the external protocol boundary (e.g., HTTP server, Ollama compatibility).

**On 2026-05-03, this rule was violated:** Antigravity directly used `JSONDecoder()` in production code. This bypassed the code that should go through `UNOExternalBridge` and broke the architectural contract.

**What should be used instead:**
```swift
PropertyListEncoder(outputFormat: .binary)  // serialization
PropertyListDecoder()                        // deserialization
AnyCodable(value)                           // heterogeneous values
```

**The only allowed exception:**
```swift
// UNOExternalBridge.swift — external protocol bridge
UNOExternalBridge.shared.encode(...)
UNOExternalBridge.shared.decode(...)

// LocalInferenceServer — Ollama-compatible HTTP layer (external protocol)
// This layer may use JSONEncoder/Decoder since it is already an external protocol.
```

---

### 2. DispatchQueue Ban

```swift
DispatchQueue.global()   // PROHIBITED
DispatchQueue.main       // PROHIBITED (exception: FSEventStreamSetDispatchQueue — Apple API mandate)
DispatchSemaphore        // PROHIBITED
```

**What should be used instead:** `async/await`, `Task`, `TaskGroup`, `actor`, `AsyncStream`

**Documented exception:** `FSEventStreamSetDispatchQueue` in `ProjectObserver.swift` is required by Apple's FSEvents API — this single exception is documented in the DEVLOG.

---

### 3. Force Unwrap Ban

```swift
let x = foo!      // PROHIBITED
foo as! Bar       // PROHIBITED
```

**What should be used instead:** `guard let`, `if let`, `try?`, `as?`

---

### 4. No Untyped Dictionary on Actor/XPC Boundaries

`[String: Any]` and `[String: AnyObject]` cannot cross actor or XPC isolation boundaries.
Instead, use a typed struct, `AnyCodable`, or binary plist.

---

## 1. Architectural Philosophy

- **Native-First:** Always adhere to Apple's official documentation, Swift 6 standards, and native system calls.
- **No Middleware:** Never use LangChain, CrewAI, or similar abstraction layers. Implement solutions using native libraries.
- **UNO Protocol:** Communication between actors is done via binary PropertyList and memory addresses — never strings or JSON.
- **Lean Development:** Readable, high-performance code with minimal dependencies.

---

## 2. Wiki Operation Rules

- **Hierarchy:** Always read the `h.md` (Hot Memory) file; the current task and context reside there.
- **Up-to-Date:** When a feature is added or an architectural change is made, immediately update the corresponding `wiki/` file and `index.md` map.
- **Inquiry:** In case of technical ambiguity, first check the `concepts/` directory. If it is still missing, look at the `raw/` directory.
- **DEVLOG:** Append to `Resources/Config/DEVLOG.md` after each completed task (do not overwrite).

---

## 3. Coding Standards

- **Swift 6 + Strict Concurrency:** All new code must comply with `Sendable`, `actor isolation`, and `@MainActor` rules.
- **SwiftUI + Apple Silicon (MLX):** Use SwiftUI for UI, and MLX Swift for inference.
- **File Organization:**
  - `Sources/PheronAgentCore/AgentEngine/` — Orchestration
  - `Sources/PheronAgentCore/LLM/` — Model and inference
  - `Sources/PheronAgentCore/ToolEngine/` — Tool system
  - `Sources/PheronAgentCore/UNO/` — Binary transport
  - `Sources/PheronAgentCore/Config/` — Configuration
- **Path Management:** Use `PathConfiguration.shared.*URL` — never hardcode paths.

---

## 4. Technical Mandates

- **Metal Backend:** Principles of Lazy Evaluation and Kernel Fusion must be observed in MLX operations. Avoid unnecessary computations.
- **Memory Anchoring:** Model weights and KV Cache must be considered "pinned" (wired) in Unified Memory. Use `WiredBudgetPolicy` and `WiredMemoryUtils.tune()`.
- **KV Cache:** Rotating KV Cache is active with `maxKVSize = 8192`; 4-bit quantization with `kvBits = 4`. Test before changing these values.
- **Native Context Management:** KV Cache management, RoPE, and tensor manipulations must follow `MLXLMCommon` standards.
- **Speculative Decoding:** Automatically activates if a compatible draft model is present at `{mainModelURL}-draft`.

---

## 5. LLM Intent Classification

```
complexity == 1  → Chat/classification → enableThinking = false → fast response
complexity > 1   → Planning/tool use → enableThinking = true → thinking block
```

`OrchestratorRuntime.classifyIntent()` makes this decision. System prompt for the local model is kept minimal.

---

## 6. Tool System Rules

- Each tool must have a `case` in the `ToolUBID` enum (this first, then the implementation).
- Tools are registered via `ToolRegistry.shared.register()`.
- Internal dispatching is done by UBID, not string matching.
- New tool = new case in `ToolIDs.swift` + new struct in the `Tools/` folder.

---

## 7. Build and Test Requirements

```bash
swift build          # Check after every change
swift test           # Regression tests
```

- Zero Regression policy applies.
- Code that fails to build must not be committed.
- Swift 6.3.0, macOS 15+, Xcode 16+, Apple Silicon.

---

## Resources and Reference

- Architectural details: `wiki/architecture_deep_dive.md`
- v3 Migration: `wiki/v3_migration_guide.md`
- Performance optimizations: `wiki/performance_optimization_report.md`
- Native Tool Calling: `wiki/native_tool_calling.md`
- Current status: `h.md`
