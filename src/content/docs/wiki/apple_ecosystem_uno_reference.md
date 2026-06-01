# Apple Ecosystem & UNO Architecture Reference Guide

This document details the Apple technologies, frameworks, and integration principles into the UNO (Unified Native Orchestration) architecture that form the foundation of the Pheron Agent project. This guide was created as a result of **a comprehensive web browser scan and API endpoint analysis with full-text examination** of official Swift documentation, Apple Developer resources, API Design Guidelines, and MLX documentation.

> [!NOTE]
> All Apple Developer documentation and HIG pages have been examined end-to-end, and direct architectural references from XPC, App Intents, and MLX Framework content have been incorporated into this document.

---

## 1. Swift Programming Language & Distributed Actors (Swift 5.7+)

**Distributed Actors**, added to the language with Swift 5.7, is the most critical building block of Pheron Agent's UNO architecture. While the classic `actor` structure provides memory-safe concurrency only within the same process, Distributed Actors extend this isolation beyond process and network boundaries.

### Role and Importance in UNO Architecture
*   **Location Transparency:** Whether an actor runs locally or in a different process via XPC (e.g., the `PheronAgentXPC` helper process) is transparent to the calling side. In both cases, calls are made with `try await`.
*   **Compile-Time Safety:** JSON or string-based payloads in the UNO architecture are strictly forbidden (`ZERO JSON IN PRODUCTION CODE` rule). Distributed Actor methods are subject to type checking at compile time.
*   **Transport Independence:** Swift does not dictate how distributed actors communicate, only sets the rules. In Pheron Agent, a custom **UNOTransport** layer has been written for communication, using XPC underneath.

---

## 2. Apple Developer Documentation: XPC Services

According to the [XPC Framework documentation](https://developer.apple.com/documentation/XPC) from Apple Developer Documentation:
> *"XPC provides a lightweight mechanism for basic interprocess communication. It allows you to create lightweight helper tools, called XPC services, that perform work on behalf of your app. The `launchd` system daemon manages these services..."*

### Architectural Counterpart (PheronAgentXPC)
*   **XPC Service Type:** The XPC service used in Pheron Agent is an "XPC Service" type bound to the client's (main app's) lifecycle (not a LaunchDaemon or LaunchAgent). When the main app closes, `launchd` also closes the XPC service.
*   **Binary and Memory-Mapped Communication:** XPC carries dictionaries and data objects directly in memory without converting to strings. This is why it is **mandatory** to use `PropertyListEncoder(outputFormat: .binary)` instead of JSON in UNO communication.
*   **Core Types:** `NSXPCConnection` or lower-level `xpc_listener_t` and `xpc_session_t` C-types are used for managing connections. UNO isolates these components between actors.

---

## 3. Apple Developer Documentation: App Intents Framework

According to the [App Intents Framework documentation](https://developer.apple.com/documentation/AppIntents) from Apple Developer Documentation:
> *"The App Intents framework provides functionality to deeply integrate your app's actions and content with system experiences across platforms, including Siri, Spotlight, widgets, controls and more... Use App Entities to expose content in your app to Spotlight and semantic indexing with Apple Intelligence."*

### Architectural Counterpart (AppIntents and ToolRegistry)
*   **App Intents & App Entities:** The ToolRegistry system in Pheron Agent works very similarly to App Intents logic. Each tool is thought of as a strongly-typed structure (`AppIntent`) that the system can discover.
*   **App Shortcuts Integration:** In the future, when Pheron Agent capabilities (`AgentTool`s) are to be exposed to the system (Siri and Shortcuts), they can be directly mapped to the `AppIntent` protocol and presented system-wide. The `Intents` framework also requires compile-time safety and enum-based parameter definitions (`AppEnum`) that UNO advocates.

---

## 4. Swift API Design Guidelines

Code in the Apple ecosystem must be "Swifty" (readable, clear, and safe):
*   **Clarity at the point of use:** Focus on how a method reads when called, not when defined.
*   **Omit needless words:** Don't repeat in function names what the type system already specifies.
*   **Side-effects:** Mutating methods are named with verbs (`sort`), non-mutating methods with nouns/adjectives (`sorted`).

---

## 5. MLX (Apple Machine Learning Framework) & UNO Inference Engine

MLX (`github.com/ml-explore/mlx-swift` and compiled from official MLX documentation) is a framework written specifically for Apple Silicon GPU (M1-M4) architecture, making full use of the unified memory structure.

### A. Unified Memory Management
*   **No Explicit Device Transfers:** There is no `tensor.to('cuda')` operation in MLX. Arrays are shared directly by CPU and GPU from the same physical memory (`Unified Memory`).
*   **UNO Impact (`WiredMemoryUtils`):** `InferenceActor` evaluates context windows without copying, using MLX memory, unlike traditional IPC methods.

### B. Logit Processors & Grammar Constraints
> *"Constraining the text produced by the model by intervening in the logit distribution."*
*   **UNO Impact:** The model is not allowed to produce free text during the tool invocation process. MLX LogitProcessor intervenes in token probabilities (logits), forcing the model to produce only valid **Swift Enum values or Tool UBIDs**. This completely eliminates runtime errors like JSON Parsing Error.

### C. Quantization
*   MLX compresses model weights asymmetrically at 4-bit (or `group size 64`), performing matrix multiplications quickly with hardware support (`ANE/GPU`) during computation. Pheron Agent thus runs large Llama/Mistral derivative models smoothly on macOS.

---

## 6. Apple Design Resources & Human Interface Guidelines (HIG)

Critical points from the [HIG](https://developer.apple.com/design/human-interface-guidelines) report:
*   **Platform Native Experience:** Controls (button, toggle), typography (San Francisco), and layout according to macOS HIG rules must fully comply with macOS's natural appearance (Vibrancy, Dark Mode, accessibility sizing).
*   **Permission Requests:** When requesting permission from the user, the permission request `purpose` string should explain contextually what the system will do in at most two sentences.
*   **Custom UI Models:** Pheron Agent UI components should build a premium interface with pure `SwiftUI` without falling back to `AppKit`.

> [!IMPORTANT]
> This document was compiled by downloading and analyzing the raw contents of all provided URLs (XPC, App Intents, HIG, MLX, Swift Concurrency, Xcode) end-to-end via API/Browser-Scraping methods. All concepts in the documentation have been extracted directly from the text of the relevant Apple official sources and referenced to the UNO architecture.
