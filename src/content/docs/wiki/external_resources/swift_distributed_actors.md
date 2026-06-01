# Swift Distributed Actors — Official Apple Documentation

Source: `developer.apple.com/tutorials/data/documentation/distributed/distributedactor.json`
Source: `developer.apple.com/tutorials/data/documentation/distributed/distributedactorsystem.json`

**Platform:** macOS 13.0+, iOS 16.0+

---

## DistributedActor Protocol

`DistributedActor` is the protocol that all distributed actors **implicitly conform to**. It provides the common interface for running distributed code across multiple processes and devices.

### Regular Actor vs DistributedActor

| Feature | Regular Actor | DistributedActor |
|---------|---------------|------------------|
| Initializer | `init()` | `init(actorSystem:)` required |
| Scope | Single process | Multiple processes/devices |
| Identity | Instance-based | Based on `id` property |
| Synthesized | None | `actorSystem` and `id` automatic |

### Key Feature: Location Transparency

```swift
let local: Greeter = ...
let remote: Greeter = ...  // Remote reference

local == remote  // true — same actor if ids match
```

Whether local or remote is transparent to the caller. Both cases use `try await`.

### Required Implementation

```swift
distributed actor Greeter {
    typealias ActorSystem = UNODistributedActorSystem  // used in Pheron Agent

    func greet() -> String { "Hello!" }
}

// actorSystem must be assigned in every designated initializer:
init(name: String, actorSystem: Self.ActorSystem) {
    self.name = name
    self.actorSystem = actorSystem  // Required — compile error without it
}
```

### Synthesized Properties

```swift
var actorSystem: Self.ActorSystem  // nonisolated — accessible even on remote refs
var id: Self.ID                    // nonisolated — unique identity assigned by the actor system
```

### Automatic Conformances

- `Equatable` — comparison by id
- `Hashable` — hash by id
- `Identifiable` — id property
- `Sendable` — safe across process boundaries
- `Codable` — if ActorID conforms to Codable

---

## DistributedActorSystem Protocol

The protocol that implements all functionality of an actor system. In Pheron Agent, `UNODistributedActorSystem` implements this protocol over XPC.

### Core Responsibilities

1. **Actor Identity Management** — Assigns/resigns globally unique IDs to each actor
2. **Remote Calls** — Serializes method calls and sends them over the transport
3. **Resolution** — Creates actor references from IDs (local or remote?)
4. **Lifecycle** — Receives notification when an actor is ready

### Required Associated Types

```swift
protocol DistributedActorSystem: Sendable {
    associatedtype ActorID: Hashable & Sendable
    associatedtype InvocationEncoder: DistributedTargetInvocationEncoder
    associatedtype InvocationDecoder: DistributedTargetInvocationDecoder
    associatedtype ResultHandler: DistributedTargetInvocationResultHandler
    associatedtype SerializationRequirement
}
```

### Required Methods

```swift
// ID Management:
func assignID<Act>(_ actorType: Act.Type) -> ActorID
func resignID(_ id: ActorID)

// Lifecycle:
func actorReady<Act>(_ actor: Act)

// Resolution:
func resolve<Act>(id: ActorID, as actorType: Act.Type) throws -> Act?

// Remote Calls:
func remoteCall<Act, Err, Res>(
    on actor: Act,
    target: RemoteCallTarget,
    invocation: inout InvocationEncoder,
    throwing: Err.Type,
    returning: Res.Type
) async throws -> Res

func makeInvocationEncoder() -> InvocationEncoder

func executeDistributedTarget<Act>(
    on actor: Act,
    target: RemoteCallTarget,
    invocationDecoder: inout InvocationDecoder,
    handler: ResultHandler
) async throws
```

### Remote Call Flow

```
1. Outgoing call: actor.id + target method + parameters → serialize with InvocationEncoder
2. System suspends the call (CheckedContinuation)
3. Encoded data is sent over the transport (XPC)
4. When the response arrives, continuation is resumed
5. Failed transport → DistributedActorSystemError is thrown
```

### Usage in Pheron Agent (UNODistributedActorSystem)

```swift
// Inside UNODistributedActorSystem.swift:
// SerializationRequirement = PropertyListEncoder (binary plist — JSON is forbidden!)
// Transport = XPC (NSXPCConnection / XPCSession)
// ActorID = custom type, transferable over XPC
```

> **CRITICAL RULE:** Even if `Codable` is used as `SerializationRequirement`,
> all encoding in Pheron Agent is done with `PropertyListEncoder(outputFormat: .binary)`.
> `JSONEncoder` is never used.

---

## Its Role in the UNO Architecture

```
Pheron Agent (Main Process)
    ↕ UNODistributedActorSystem (XPC transport)
PheronAgentXPC (Helper Process)

All cross-process calls → distributed actor methods → try await
No JSON, no strings → binary PropertyList + typed structs only
```

---

## Reference Sources

- [DistributedActor](https://developer.apple.com/documentation/distributed/distributedactor)
- [DistributedActorSystem](https://developer.apple.com/documentation/distributed/distributedactorsystem)
- [TicTacFish Sample](https://developer.apple.com/documentation/swift/tictacfish_implementing_a_game_using_distributed_actors)
- [WWDC22: Meet distributed actors in Swift](https://developer.apple.com/videos/play/wwdc2022/110356/)
