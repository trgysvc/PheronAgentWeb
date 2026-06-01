# Command Line Interface (CLI)

Pheron Agent provides a fully featured, native Command Line Interface (`pheron`) built in Swift. The CLI allows you to execute autonomous tasks, verify system integrity, and profile hardware benchmarks directly from the macOS terminal.

## Getting Started with CLI

To build and run the CLI directly from the source directory, ensure you have Xcode 16.0+ and Swift 6.3+ installed.

```bash
cd PheronAgent

# Compile a debug build of the CLI target
swift build

# Run the CLI tool with a custom task
swift run pheron "create a website and test it in Safari"
```

## CLI Run Commands and Flags

The `pheron` CLI executable accepts various flags to customize the execution environment and control cloud vs. local inference modes:

| Command / Flag | Action |
|---|---|
| `swift run pheron "<task>"` | Runs the orchestrator engine locally, dynamically using MLX local inference or configured cloud fallbacks based on task complexity. |
| `swift run pheron "<task>" --local-only` | Enforces strictly local execution. All inference will be handled on-device via MLX Titan Engine. If a task requires cloud APIs, it will fail gracefully. |
| `swift run pheron "<task>" --cloud-only` | Disables local inference models, routing orchestrator steps to configured cloud providers (e.g. OpenRouter/DeepSeek) for lower memory utilization. |
| `swift run pheron --verify-pvp` | Runs the hardware verification suite to inspect Neural Engine cores and check Pheron Verification Protocol (PVP). |
| `swift run uma-bench` | Executes the Apple Silicon Unified Memory Architecture (UMA) benchmark to measure memory bandwidth and check current system resources. |

## Configuration & Secret Keys

The CLI reads configuration credentials and API endpoints from a secure Property List file:
`~/Library/Application Support/PheronAgent/vault.plist`

Example CLI profile routing configuration:
```xml
<dict>
  <key>providers</key>
  <array>
    <dict>
      <key>id</key><string>openrouter</string>
      <key>type</key><string>openrouter</string>
      <key>endpoint</key><string>https://openrouter.ai/api/v1</string>
      <key>keychainKey</key><string>com.trgysvc.PheronAgent.api.openrouter</string>
      <key>modelName</key><string>deepseek/deepseek-r1</string>
    </dict>
  </array>
</dict>
```

Sensitive keys are fetched securely from the macOS Keychain rather than plain-text configurations.

## Entitlements & Privileged Execution

The CLI runner uses Apple's Hardened Runtime and runs alongside the `PheronEnergyDaemon` XPC helper to access `powermetrics` without requiring continuous password entries.
