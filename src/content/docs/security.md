# Security and Privacy

Pheron Agent is built with a **Privacy by Design** and **Sovereignty First** approach. Because it operates with full system automation privileges, security checks are enforced at every step of execution.

## 1. On-Device Local Isolation

By default, all planning, monologue, memory lookup, and execution loops run entirely on-device using local MLX models.
- **Zero Cloud Leakage**: Your files, screenshots, clipboard contents, and execution logs never leave your physical computer.
- **No Analytics Tracking**: Pheron Agent has no tracking endpoints. Telemetry logs are stored locally at `~/Library/Application Support/PheronAgent/Telemetry/`.

## 2. Privacy Guard

For workflows that request cloud integrations or use external fallback models, Pheron Agent routes requests through a security interceptor called **Privacy Guard**:
- **PII Detection**: An on-device classifier scans prompt inputs for Personally Identifiable Information (such as names, addresses, credit cards, and system paths).
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
