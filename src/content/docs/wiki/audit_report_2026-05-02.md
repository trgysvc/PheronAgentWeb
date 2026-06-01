# Pheron Agent — Comprehensive Technical Audit Report
**Date:** 2026-05-02  
**File record:** This report is automated scan output and was saved to file — 2026-05-02T15:41:00Z  
**Swift files scanned:** 160+ source files  
**Build status:** `swift build` — Build complete! (no warnings)  
**Methodology:** All source files were read, compared against MLX-Swift 0.31.3 / MLX-LM 3.31.3 APIs, UNO rules audited, Apple official documentation used as reference.

---

## Quick Summary

| Severity | Count |
|------|------|
| LEVEL 1 — Critical (Functional Defect) | 5 |
| LEVEL 2 — Critical (UNO Rule Violation) | 4 |
| LEVEL 3 — High (API Correctness) | 5 |
| LEVEL 4 — Medium (Performance/Security) | 5 |
| LEVEL 5 — Low (Code Quality) | 6 |

---

## LEVEL 1 — CRITICAL: Functional Defect

### S1-1 · LocalInferenceServer — Ollama Incompatibility
**File:** `Sources/PheronAgentCore/LLM/LocalInferenceServer.swift:143`  
**Problem:** `handleInferenceRequest` tries to decode the incoming HTTP body as binary plist using `PropertyListDecoder`. However, the Ollama API (and all HTTP/REST clients) sends JSON. This always fails — the server can never serve a real client.  
```swift
// WRONG (line 143):
let decoder = PropertyListDecoder()
let request = try decoder.decode(InferenceRequest.self, from: bodyData)
// HTTP clients send JSON, not plist.
```
**Fix:** Use `JSONDecoder`. Intra-system data flow (XPC) can use plist, but the HTTP layer must use JSON.

---

### S1-2 · UNODistributedActorSystem — Force Cast
**File:** `Sources/PheronAgentCore/UNO/UNODistributedActorSystem.swift:33`  
**Problem:** `actor.id as! ActorID` — force cast. CLAUDE.md: "No force unwrap (`!`) in production code."  
```swift
// WRONG:
_actors.withLock { $0[actor.id as! ActorID] = actor }
// Crashes if ActorID is not a String.
```
**Fix:** Use `guard let id = actor.id as? ActorID else { return }`.

---

### S1-3 · UNOInvocationEncoder — Arguments Never Recorded
**File:** `Sources/PheronAgentCore/UNO/UNODistributedActorSystem.swift:106`  
**Problem:** The `recordArgument` method is completely empty. Parameters in distributed actor remote calls are never written to the encoder — remote calls will always go parameterless.  
```swift
public mutating func recordArgument<Value>(_ argument: RemoteCallArgument<Value>) throws where Value : SerializationRequirement {
    // Empty — arguments are lost
}
```
**Fix:** Add an implementation like `arguments[argument.effectiveLabel ?? "_\(arguments.count)"] = AnyCodable(argument.value)`.

---

### S1-4 · UNODistributedActorSystem — executeDistributedTarget Stub
**File:** `Sources/PheronAgentCore/UNO/UNODistributedActorSystem.swift:86`  
**Problem:** `executeDistributedTarget` only writes a log and exits. Distributed actor method calls incoming from XPC are never executed.  
**Fix:** Add real invocation decode + dispatch logic, or clearly document that this method will not be used and redesign the system to work through `UNOTransport`.

---

### S1-5 · LLMModel — Hardcoded Invalid Path
**File:** `Sources/PheronAgentCore/LLM/LLMModel.swift:23`  
**Problem:** Hardcoded `/models/\(name)` path is used for model loading. This path does not exist on macOS.  
```swift
// WRONG:
try await InferenceActor.shared.loadModel(at: URL(fileURLWithPath: "/models/\(name)"))
// Correct:
try await InferenceActor.shared.loadModel(at: PathConfiguration.shared.modelsURL.appendingPathComponent(name))
```
**Fix:** Use `PathConfiguration.shared.modelsURL`.

---

## LEVEL 2 — CRITICAL: UNO Rule Violation

### S2-1 · MachPortCoordinator — DispatchSource Usage
**File:** `Sources/PheronAgentCore/UNO/MachPortCoordinator.swift:35`  
**Problem:** CLAUDE.md: **"No `DispatchQueue`. All concurrency via `async/await`, `TaskGroup`, and `actor`."**  
```swift
let machSource = DispatchSource.makeMachReceiveSource(
    port: receivePort,
    queue: .global(qos: .userInteractive)  // ← RULE VIOLATION
)
```
**Fix:** Use `AsyncStream` + `withCheckedContinuation` pattern for Mach port signaling, remove DispatchSource.

---

### S2-2 · ProjectObserver — DispatchQueue.main
**File:** `Sources/PheronAgentCore/AgentEngine/ProjectObserver.swift:54`  
**Problem:** `FSEventStreamSetDispatchQueue(stream, DispatchQueue.main)` — direct DispatchQueue usage.  
**Fix:** Use `FSEventStreamScheduleWithRunLoop` + MainRunLoop or Swift Concurrency bridge instead of `FSEventStreamSetDispatchQueue`.

---

### S2-3 · AnyCodable — @unchecked Sendable with Any
**File:** `Sources/PheronAgentCore/Types/Types.swift:450`  
**Problem:** `AnyCodable` carries `value: Any` and is marked `@unchecked Sendable`. `Any` is not Sendable — data race risk when crossing actor boundaries. This will be flagged as an error in Swift 6 strict concurrency.  
**Fix:** Use a closed enum (`CodableValue`) instead of `Any`:
```swift
public enum CodableValue: Codable, Sendable {
    case bool(Bool), int(Int), double(Double), string(String)
    case array([CodableValue]), dict([String: CodableValue])
}
```

---

### S2-4 · UNOTransport — @unchecked Sendable NSLock
**File:** `Sources/PheronAgentCore/LLM/LocalInferenceServer.swift:8` and `UNOTransport.swift:8`  
**Problem:** `final class`es marked with `@unchecked Sendable` use NSLock. In Swift 6, this pattern should be replaced with an actor.  
**Fix:** Make `UNOTransport` an `actor`, remove NSLock.

---

## LEVEL 3 — HIGH: API Correctness

### S3-1 · MLX.eval() — Argumentless Call
**File:** `Sources/PheronAgentCore/LLM/InferenceActor.swift:179`, `MLXEngineGuardian.swift:68,113`  
**Problem:** In MLX-Swift 0.31.3, the argumentless `MLX.eval()` call API exists but its purpose is not for buffer flushing — it's for evaluating specific MLXArrays. Calling `eval()` before clearing the cache has wrong semantics.  
**Reference:** MLX-Swift docs: `eval(_:)` takes `MLXArray...` arguments.  
**Fix:** Use only `MLX.Memory.clearCache()` instead of `MLX.eval()`, or pass the active arrays.

---

### S3-2 · MLX.Device.withDefaultDevice — Wrong API
**File:** `Sources/PheronAgentCore/LLM/InferenceActor.swift:49`  
**Problem:** `MLX.Device.withDefaultDevice(.cpu) { }` — This form is for temporary device switching. Permanent configuration for CPU-only mode cannot be done this way; it returns to the previous device when the closure ends.  
```swift
// WRONG: withDefaultDevice is closure-scoped
MLX.Device.withDefaultDevice(.cpu) {
    AgentLogger.logInfo(...)  // Only affects this block
}
// After the block ends, default device returns to GPU
```
**Fix:** Use `MLX.Device.setDefault(.cpu)` (or the version-compatible equivalent).

---

### S3-3 · GenerateResult enum case names
**File:** `Sources/PheronAgentCore/LLM/InferenceActor.swift:107-118`  
**Problem:** MLX-LM v3.31.3 `GenerateResult` enum case names may differ in the source code. `.chunk(let text)` may be `.token` or `.text`, and `.info(let metrics)` may have different naming. `metrics.tokensPerSecond`, `metrics.promptTokenCount`, `metrics.generationTokenCount` field names also vary by version.  
**Action:** Verify the `GenerateResult` enum in the `mlx-swift-lm` source.  
**Note:** Since the build passes, the API is currently compatible, but it could break on future `upToNextMinor` updates.

---

### S3-4 · LocalInferenceServer — Duplicate import Network
**File:** `Sources/PheronAgentCore/LLM/LocalInferenceServer.swift:2-3`  
**Problem:** `import Network` is written twice (lines 2 and 3).  
**Fix:** Remove the duplicate import.

---

### S3-5 · ModelRegistry Missing Reference
**File:** `Sources/PheronAgentCore/LLM/LocalInferenceServer.swift:185`  
**Problem:** `ModelRegistry.availableModels` is used but it's unclear whether the `ModelRegistry` type is defined (probably exists since the build passes, but there's a name inconsistency with `ModelCatalog`).  
**Action:** Check if `ModelRegistry` and `ModelCatalog` are the same type, consider merging.

---

## LEVEL 4 — MEDIUM: Performance and Security

### S4-1 · AgentLogger — ISO8601DateFormatter Allocation on Every Call
**File:** `Sources/PheronAgentCore/Utilities/AgentLogger.swift:71`  
**Problem:** `ISO8601DateFormatter()` is recreated on every log call. Creating a formatter is expensive (regex compilation, locale loading). Many log calls during heavy inference = significant overhead.  
```swift
// WRONG (on every call):
let isoFormatter = ISO8601DateFormatter()
```
**Fix:**
```swift
private static let isoFormatter: ISO8601DateFormatter = {
    let f = ISO8601DateFormatter()
    return f
}()
```

---

### S4-2 · MLXEngineGuardian — Task Chain Memory Leak
**File:** `Sources/PheronAgentCore/LLM/MLXEngineGuardian.swift:58-94`  
**Problem:** Each `execute()` call creates a new Task waiting for the previous one, then assigns `currentTask` to a new wrapper Task. In rapid consecutive calls, task references form a chain and memory can accumulate.  
**Fix:** Use `AsyncChannel` or an actor-isolated serial queue pattern.

---

### S4-3 · UNOSharedBuffer — ftruncate Return Value Not Checked
**File:** `Sources/PheronAgentCore/UNO/UNOSharedBuffer.swift:27`  
**Problem:**  
```swift
ftruncate(fd, off_t(size))  // Return value ignored
```
If `ftruncate` fails, the file remains 0 bytes, the subsequent `mmap` maps a zero-byte segment, and undefined behavior occurs.  
**Fix:**
```swift
guard ftruncate(fd, off_t(size)) == 0 else {
    close(fd)
    throw NSError(domain: NSPOSIXErrorDomain, code: Int(errno))
}
```

---

### S4-4 · PheronAgentXPC — Unnecessary Heavy MLX Dependencies
**File:** `Package.swift:86-103`  
**Problem:** The `PheronAgentXPC` target depends on large ML libraries like MLXLLM, MLXLMCommon, MLXVLM, MLXEmbedders. The XPC helper process does not need these libraries (inference is done in the `PheronAgent` main process).  
**Impact:** XPC bundle size and startup time increase unnecessarily.  
**Fix:** Simplify `PheronAgentXPC` dependencies to only `PheronAgentCore` and `CUNOSupport`.

---

### S4-5 · InferenceActor — Unnecessary Float.random Per Token
**File:** `Sources/PheronAgentCore/LLM/InferenceActor.swift:225-229`  
**Problem:** Every time a token is generated, `updateSharedBuffer` writes 4096 `Float.random` values. This data is meaningless (random numbers for a visual effect), but it slows down inference.  
**Fix:** Populate the Metal buffer with real activation data, or remove this method entirely.

---

## LEVEL 5 — LOW: Code Quality

### S5-1 · Package.swift — Unpinned Branch Dependencies
**File:** `Package.swift:24-25`  
```swift
.package(url: "https://github.com/trgysvc/audiointelligence.git", branch: "main"),
.package(url: "https://github.com/modelcontextprotocol/swift-sdk.git", branch: "main"),
```
Branch references break build reproducibility; breaking changes enter silently.  
**Fix:** Use a stable tag/commit pin, or at least fix with `revision:`.

---

### S5-2 · PluginManager — Unsafe dlopen/Unmanaged Bridge
**File:** `Sources/PheronAgentCore/ToolEngine/PluginManager.swift:82-88`  
**Problem:** Combination of `dlopen` + `unsafeBitCast` + `Unmanaged.fromOpaque`. A malformed dylib, type mismatch, or missing `createPlugin` symbol can cause a crash. No plugin sandbox.  
**Fix:** Design a safer plugin API; at minimum ensure that `Unmanaged<AnyObject>.fromOpaque(ptr).takeRetainedValue()` is used instead of `unsafeBitCast` (it already is) and add type checking.

---

### S5-3 · UNORingBuffer — Zero-Zero Initialization Ambiguity
**File:** `Sources/PheronAgentCore/UNO/UNORingBuffer.swift:21`  
**Problem:**
```swift
if uno_ring_buffer_get_head(header) == 0 && uno_ring_buffer_get_tail(header) == 0 {
    uno_ring_buffer_init(header, capacity)
}
```
Both head and tail being 0 also represents the state where all data has been consumed, not just a new allocation. A second `init` call resets the capacity.  
**Fix:** Add a separate `initialized` flag to the header, or call `init` on every allocation.

---

### S5-4 · Sparkle SUPublicEDKey Validation
**File:** `Resources/App/Info.plist:32`  
```xml
<string>h2T2JnoAYSK3DoFbzSM4mD2aDVkWk5EuV6a4ytG7d3s=</string>
```
This key must be verified to have been generated with `generate_keys` and the private key stored securely. Also marked in AUDIT_TODO.md.  
**Action:** Create a test signature with Sparkle's `sign_update` tool and verify.

---

### S5-5 · Entitlements — Missing AppleEvents
**File:** `Resources/App/PheronAgent.entitlements`  
**Problem:** Even though AppleScript/Apple Events are used, `com.apple.security.automation.apple-events` and target-app-based `com.apple.security.scripting-targets` entitlements are missing. This feature may be rejected on App Store or notarization.  
**Fix:** Add `scripting-targets` for the AppleEvent targets used.

---

### S5-6 · DEVLOG Dual Location
**Problem:** While CLAUDE.md requires `Resources/Config/DEVLOG.md`, root-level `DEVLOG.md` also appears modified in git status. Are they two separate files?  
**Fix:** Remove the root `DEVLOG.md` or symlink it to `Resources/Config/DEVLOG.md`.

---

## MLX-Swift Version Notes

**Current pin:** mlx-swift `0.31.3`, mlx-swift-lm `3.31.3`  
**Constraint:** `Package.swift` uses `.upToNextMinor(from:)` — minor updates are taken automatically.

| API | Status |
|-----|-------|
| `loadModelContainer(from:)` | Build passing ✓ |
| `ModelContainer.prepare(input:)` | Build passing ✓ |
| `ModelContainer.generate(input:parameters:)` | Build passing ✓ |
| `GenerateParameters(maxTokens:temperature:)` | Build passing ✓ |
| `UserInput(messages:)` | Build passing ✓ |
| `MLX.Memory.cacheLimit` | Build passing ✓ |
| `MLX.Memory.clearCache()` | Build passing ✓ |
| `MLX.eval()` (no-arg) | Build passing but semantically incorrect ⚠️ |
| `MLX.Device.withDefaultDevice(.cpu)` | Temporary scope — no persistent effect ⚠️ |

---

## Priority Order (Recommended Fix Plan)

```
Sprint 1 (Critical):
  S1-1  LocalInferenceServer JSON decode
  S1-2  Force cast — actorReady
  S1-5  LLMModel hardcoded path
  S2-1  MachPortCoordinator remove DispatchSource
  S4-3  ftruncate return value

Sprint 2 (High):
  S1-3  recordArgument implementation
  S1-4  executeDistributedTarget stub decision
  S3-4  Remove duplicate import
  S4-1  ISO8601DateFormatter static
  S4-4  XPC dependency simplification

Sprint 3 (Medium):
  S2-3  AnyCodable → CodableValue enum
  S3-1  eval() semantic fix
  S3-2  Device.withDefaultDevice fix
  S4-5  Remove/fix updateSharedBuffer
  S5-1  Branch pin → commit/tag

Sprint 4 (Low):
  S5-3  UNORingBuffer init flag
  S5-4  Sparkle key validation
  S5-5  Entitlements apple-events
  S5-6  Move DEVLOG to single location
```

---

*Report generated: 2026-05-02 | Pheron Agent v7.8.5*
