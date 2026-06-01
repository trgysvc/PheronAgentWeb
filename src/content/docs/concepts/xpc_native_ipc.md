# XPC and Native IPC Standards

**Source:** [developer.apple.com - XPC Services](https://developer.apple.com/documentation/xpc)

Pheron Agent's UNO (Unified Native Orchestration) architecture uses **XPC Services**, macOS's native and most secure solution, for inter-process communication (IPC). This system is the key to enforcing the "No Middleware" and "Binary Only" rules.

## 1. Core Principles of XPC
- **Security:** XPC services run in a sandboxed environment. This prevents main app crashes, providing crash-resistance. The tools where the agent runs dangerous or ambiguous tasks can be isolated into a separate XPC process.
- **Speed and Native Integration:** XPC connects directly to the macOS kernel (Mach ports). It offers near-zero IPC latency compared to setting up a REST API, gRPC, or WebSockets locally.

## 2. UNO Conforming Communication (Binary Only)
- **No JSON:** JSON or stringified data must not be used in XPC messages. All data is transferred directly as `Data` objects or XPC objects (`xpc_object_t`).
- **Memory Mapping:** For large data transfers (e.g., context windows or model outputs), memory mapping over XPC is used. Data is transmitted via shared memory blocks instead of being serialized. This achieves zero-copy data transfers.

## 3. Best Practices (for Pheron Agent)
- When defining XPC services, always use strongly-typed protocols (`@objc protocol`) with `NSXPCConnection` or bind them via Swift's native `distributed actor` structure.
- In data transfer protocols (e.g., Tool Signature payloads), a binary format should be enforced by using classes supporting `NSSecureCoding` or using `PropertyListEncoder(outputFormat: .binary)`.
- Leave XPC service lifecycle management to the OS; services are started by macOS when needed and shut down when idle. Do not interfere with the system's resource management principles.
