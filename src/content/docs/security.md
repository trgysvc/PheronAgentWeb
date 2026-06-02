# Security and Privacy

Pheron Agent is built with a **Privacy by Design** and **Sovereignty First** approach. Because it operates with full system automation privileges, security checks are enforced at every step of execution.

## 1. On-Device Local Isolation

Pheron Agent is designed to run all planning, memory lookup, and execution loops on-device using local MLX models. When a local model is loaded and active, no prompt data or execution context leaves your machine.
- **Local-First Default**: All inference defaults to the on-device Titan Engine. A cloud fallback (OpenRouter) is only triggered when no local model is available. To enforce strict local-only operation, enable **Local-Only Mode** in Settings.
- **Zero Telemetry**: Pheron Agent has no tracking endpoints. Telemetry logs are stored locally at `~/Library/Application Support/PheronAgent/Telemetry/`.
- **Your files stay local**: Screenshots, clipboard contents, and execution logs are never uploaded.

## 2. Privacy Guard

For workflows that request cloud integrations or use external fallback models, Pheron Agent routes requests through a security interceptor called **Privacy Guard**:
- **PII Detection**: A rule-based on-device scanner inspects prompt inputs for Personally Identifiable Information (such as names, addresses, credit cards, and system paths) before any external routing occurs.
- **Enforcement Levels**:
  - `PASS`: The prompt contains no sensitive info and continues.
  - `DESENSITIZE`: Automatically masks or replaces PII with placeholder strings (e.g. replacing actual names with `[USER_NAME]`).
  - `BLOCK`: Completely rejects the operation if high-risk data cannot be safely redacted, returning a safety warning.
- **Performance Cache**: Scans are cached securely using SHA-256 hashes with strict Time-To-Live (TTL) limits.

## 3. SecuritySentinel and GuardAgent

- **SecuritySentinel**: Enforces biometric verification (Touch ID / Apple Watch) before executing high-risk system commands or accessing the `vault.plist` secure Keychain configuration.
- **GuardAgent**: Evaluates generated code and shell outputs in real-time. If it detects unsafe patterns (such as unbounded recursive deletes or unauthorized network payloads), it immediately terminates the execution thread.

## 4. Privilege Sandboxing

To execute macOS system tasks (such as terminal scripts and system controls), Pheron Agent uses Apple's **XPC Inter-Process Communication**:
- The main user interface runs inside a restricted user environment.
- Privilege-requiring tasks are delegated to `PheronAgentXPC`, a notarized background helper service compiled with Apple's Hardened Runtime and strict entitlements.
- All actions are logged and subject to user accessibility approvals.
