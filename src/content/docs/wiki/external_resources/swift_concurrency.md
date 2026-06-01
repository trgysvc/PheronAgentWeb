# Swift Concurrency — Official Apple Documentation

Source: `developer.apple.com/tutorials/data/documentation/swiftui/concurrency.json`  
Source: `docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/`

---

## Overview

Swift Concurrency manages asynchronous and parallel operations in a structured way via **async/await**, **actors**, **tasks**, and the **Sendable** protocol.

> **Pheron Agent Rule:** `DispatchQueue` is strictly prohibited. All concurrency must be performed via `async/await`, `Task`, `TaskGroup`, `actor`, and `AsyncStream`.

---

## 1. async / await

```swift
func fetchData() async throws -> Data {
    let (data, _) = try await URLSession.shared.data(from: url)
    return data
}

// Calling:
let data = try await fetchData()
```

---

## 2. Tasks

```swift
// Single task:
Task {
    let result = await fetchData()
}

// Detached task (independent of the current actor):
Task.detached {
    await performBackgroundWork()
}

// Cancellation:
let task = Task { ... }
task.cancel()
```

---

## 3. Task Groups — Parallel Operations

```swift
let results = try await withThrowingTaskGroup(of: String.self) { group in
    for id in 1...5 {
        group.addTask {
            return try await fetchItem(id: id)
        }
    }
    
    var results: [String] = []
    for try await result in group {
        results.append(result)
    }
    return results
}
```

**Async Let — Parallel Initiation:**

```swift
async let result1 = fetchData1()
async let result2 = fetchData2()
let (data1, data2) = await (result1, result2)
```

---

## 4. Actors

```swift
actor DataStore {
    private var data: [String] = []
    
    func add(_ item: String) {
        data.append(item)  // Automatically isolated
    }
    
    func getAll() -> [String] {
        return data
    }
}

let store = DataStore()
await store.add("item1")
let items = await store.getAll()
```

### nonisolated

```swift
actor MyActor {
    let id: UUID  // let — accessible as nonisolated
    
    nonisolated func describe() -> String {
        return "Actor: \(id)"  // does not require await
    }
}
```

---

## 5. @MainActor

```swift
@MainActor
class ViewModel: ObservableObject {
    @Published var text = ""
    
    func update() {
        text = "updated"  // Automatically runs on the main thread
    }
}

// Dynamically:
await MainActor.run {
    updateUIElements()
}
```

---

## 6. Sendable Protocol

Marks type-safe values that can be shared across actor boundaries.

```swift
struct SafeMessage: Sendable {
    let id: UUID
    let content: String
}

// For a Class:
final class SafeManager: @unchecked Sendable {
    private let lock = NSLock()
    private var value: Int = 0
}
```

> **Pheron Agent Rule:** `[String: Any]` and `[String: AnyObject]` cannot cross actor or XPC boundaries. Use `AnyCodable` or typed structs instead.

---

## 7. AsyncStream

```swift
let stream = AsyncStream<Int> { continuation in
    for i in 1...5 {
        continuation.yield(i)
    }
    continuation.finish()
}

for await value in stream {
    print(value)
}
```

---

## 8. Continuations — Sync↔Async Bridge

```swift
let result = try await withCheckedThrowingContinuation { continuation in
    performLegacyAsync { value, error in
        if let error = error {
            continuation.resume(throwing: error)
        } else {
            continuation.resume(returning: value)
        }
    }
}
```

---

## 9. TaskLocal Storage

```swift
@TaskLocal var requestID: UUID?

// Set:
try await TaskLocal.$requestID.withValue(UUID()) {
    await processRequest()
}
```

---

## Basic Rules (for Pheron Agent)

| Rule | Description |
|---|---|
| DispatchQueue prohibited | Use `async/await`, `Task`, and `TaskGroup` |
| Sendable mandatory | For all types crossing actor boundaries |
| Force unwrap prohibited | Use `guard let`, `if let`, `try?`, or `as?` |
| Untyped dict prohibited | `[String: Any]` cannot cross XPC boundaries |

---

## References

- [Swift Concurrency (docs.swift.org)](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/concurrency/)
- [WWDC21: Protect mutable state with Swift actors](https://developer.apple.com/videos/play/wwdc2021/10133/)
- [WWDC22: Eliminate data races using Swift Concurrency](https://developer.apple.com/videos/play/wwdc2022/110351/)
- [Updating an app to use strict concurrency](https://developer.apple.com/documentation/swift/updating-an-app-to-use-strict-concurrency)
