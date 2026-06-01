# Swift API Design Standards

**Source:** [swift.org - API Design Guidelines](https://swift.org/documentation/api-design-guidelines/)

The codebase of Pheron Agent is designed to be completely "Swiftic" (conforming to the philosophy of the Swift language). Based on Apple's official API design guidelines, this document defines the rules to be applied throughout the project.

## 1. Naming Rules
- **Clarity is Primary:** Names should clearly indicate what they mean rather than being overly short (`remove(at: index)` vs `remove(index)`).
- **CamelCase Usage:** Types, Classes, Structs, and Protocols must use `UpperCamelCase` (e.g., `InferenceActor`, `ToolExecutable`), whereas variables and functions must use `lowerCamelCase` (e.g., `executeTask`, `memoryPressureMonitor`).
- **Boolean Naming:** Variable names containing or returning a Bool should begin with prefixes like `is`, `has`, or `can` (e.g., `isWorkspaceIsolationEnabled`).
- **Protocols:** Protocols describing a capability should end with `-able`, `-ible`, or `-ing` (e.g., `Sendable`, `Executable`).

## 2. API Structure and Argument Labels
- **Fluency:** Function calls should read like an English sentence.
  - *Correct:* `x.insert(y, at: z)`
  - *Incorrect:* `x.insert(y, position: z)`
- The first argument typically defines the primary purpose of the function, and its label should be treated as part of the function name. However, use argument labels if argument types are complex or if the context demands them.

## 3. Code Structure and 'Swiftic' Practices
- **Type Safety:** Avoid using "String Typing" (e.g., keeping IDs or commands as plain text) to represent values. Instead, use an `enum` or strongly typed `struct` (e.g., Binary IDs).
- **Optionals and Error Management:** Force-unwrapping (`!`) is prohibited. Use `guard let` or `if let` for unexpected states. For asynchronous operations that can throw errors, adopt `throws` and Swift 6's structured error management practices (Typed Throws, Result, etc.).
- **Prefer Value Types:** To prevent Automatic Reference Counting (ARC) overhead and complex state management, use `struct` instead of `class` for data models that do not require actor isolation.
