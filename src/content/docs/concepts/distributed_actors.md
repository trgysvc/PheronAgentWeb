# Distributed Actors and UNO Isolation Architecture

**Source:** [docs.swift.org - Distributed Actors](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/#Distributed-Actors)

In Pheron Agent's **UNO (Unified Native Orchestration)** architecture, the `distributed actor` structure forms the basis for inter-component communication and state management. This structure ensures data integrity and makes execution boundaries compile-time safe.

## 1. Actor Isolation
- **Data Protection:** Each actor isolates its own state. Synchronous access to state data from outside the actor is prohibited.
- **Sharing (Sendable):** All data crossing actor boundaries must conform to the `Sendable` protocol. This prevents concurrency issues like data races at compile time.
- **Asynchronous Communication:** Calling an actor's method or accessing its properties always requires `await`. This aligns perfectly with the asynchronous nature of tools and LLM calls in Pheron Agent.

## 2. Distributed Actors and Network Topology
- **XPC and Process Boundaries:** A `distributed actor` allows calls to be made not only within the same process but also across different processes, such as XPC services.
- **Type-Safety:** All calls crossing distributed actor boundaries must be marked as `distributed`. The compiler guarantees that parameters and return types are Serializable.
- **UNO Conformance:** In compliance with the "no JSON, binary-only communication" rule of the UNO architecture, serialization processes within the actor system are configured to only use binary-formatted structures. All parameters and methods operate within this strict constraint.

## 3. Best Practices (for Pheron Agent)
- Instead of using traditional `class` structures, use `actor` or `distributed actor` directly for data flow and state management between components.
- Never pass reference types across actor boundaries without `Sendable` guarantees.
- Establish all IPC transactions using XPC through `distributed actor` nodes, eliminating the need for middleware or RPC frameworks (No Middleware rule).
