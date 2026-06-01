# Creating XPC Services — Official Apple Guide

Source: `developer.apple.com/tutorials/data/documentation/xpc/creating-xpc-services.json`

---

## Overview

XPC services consist of two components:
- **Listener/Server**: Receives incoming connections and performs operations
- **Client**: Initiates the connection and sends requests

---

## 1. Adding an XPC Service Target (Xcode)

1. Select **File > New > Target**
2. Choose **XPC Service** from the Framework & Library section
3. Specify the service name
4. API Level: Select **Low Level - libXPC**
5. Note the bundle identifier — clients connect using this ID

---

## 2. Listener (Server) Setup

```swift
let serviceName = "com.example.XPC-Calc-Engine"

let listener = try XPCListener(service: serviceName) { request in
    request.accept { message in
        performCalculation(with: message)
    }
}

dispatchMain()  // Start processing requests
```

**Rejecting a request:**
```swift
request.reject(reason: "Service unavailable.")
```

---

## 3. Message Types (Codable)

```swift
struct CalculationRequest: Codable {
    let firstNumber: Int
    let secondNumber: Int
}

struct CalcuationResponse: Codable {
    let result: Int
}

func performCalculation(with message: XPCReceivedMessage) -> Encodable? {
    guard let request = try? message.decode(as: CalculationRequest.self) else { return nil }
    return CalcuationResponse(result: request.firstNumber + request.secondNumber)
}
```

---

## 4. Client — Connection and Message Sending

```swift
// Create session:
let session = try XPCSession(xpcService: serviceName)

// Send synchronous request:
let request = CalculationRequest(firstNumber: 23, secondNumber: 19)
let reply = try session.sendSync(request)

// Decode response:
if let response = try? reply.decode(as: CalcuationResponse.self) {
    let result = response.result
}
```

---

## Core Components

| Component | Role |
|---------|-----|
| `XPCListener` | Server: receives and handles client requests |
| `XPCSession` | Client: connects to the service and sends messages |
| `XPCReceivedMessage` | Container for encoded messages in transit |
| `dispatchMain()` | Starts processing requests after listener setup |

---

## Foundation High-Level API (NSXPCConnection)

Higher-level API for projects using Foundation:

```swift
// NSXPCConnection — transparent remote method dispatch
// Protocol-based, type-safe RPC mechanism
```

> In Pheron Agent, XPC communication is handled through `UNODistributedActorSystem`.
> Binary PropertyList is used; JSON is strictly forbidden.
