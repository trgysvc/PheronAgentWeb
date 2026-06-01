# Apple Silicon Energy Profiling via Powermetrics

## Core Concept
Apple Silicon (M1/M2/M3/M4/M5) utilizes a System on Chip (SoC) architecture, where the CPU, GPU, Apple Neural Engine (ANE), and Unified Memory reside on the same die. This tight integration allows for highly accurate, hardware-level power consumption measurement.

Instead of relying on estimations or cloud API costs, we can precisely measure the actual hardware effort an LLM consumes during inference (generation). This allows us to assign a physical energy cost (Joules) to AI tasks.

## The Tool: `powermetrics`
Apple provides a built-in CLI tool called `powermetrics`. It reads directly from the SMC (System Management Controller) and IOKit sensors to deliver real-time power draw data.

### Example Usage
```bash
sudo powermetrics -n 1 --samplers smc
```

This samples the power usage once (`-n 1`) and returns output containing blocks like:
```
**** SMC sensors ****
CPU Power: 1542 mW
GPU Power: 3410 mW
ANE Power: 0 mW
Combined Power (CPU + GPU + ANE): 4952 mW
```

### Calculating Joules (Energy)
Energy (Joule) is the integral of power (Watt) over time (Seconds).
`Energy (Joules) = Power (Watts) × Time (Seconds)`

**How the Daemon Calculates It:**
1. **Sampling:** `powermetrics` is run with a 100ms interval (`-i 100`).
2. **Parsing:** The daemon uses Regex to capture the `Combined Power (CPU + GPU + ANE): [XXXX] mW` line from the output every 100ms.
3. **Averaging:** These milliwatt values are converted to Watts (divided by 1000) and stored in an array.
4. **Integration:** When the LLM finishes generation, the daemon calculates the total `Duration` (in seconds) from start to finish. It averages the collected Watt samples.
5. **Final Result:** `Total Joules = Average Watts × Duration`.

**Example:**
If a local LLM generation takes 12.5 seconds and the average of all 100ms samples is `15W` (15000mW):
`15W × 12.5s = 187.5 Joules`.
This means the processor exerted 187.5 Joules of physical energy to process and generate those tokens.

## Architectural Constraint: Root Privileges
The `powermetrics` binary strictly requires `root` (sudo) privileges. A standard macOS application (like EliteAgent) cannot execute this tool directly without prompting the user for an administrator password on every single request, which ruins the user experience.

### The Solution: XPC Privileged Helper Daemon
To seamlessly integrate this powerful metric into the app:
1. **SMAppService**: We register a Launch Daemon via `SMAppService.daemon(fromName: "com.elite.agent.energyd")`.
2. **One-Time Consent**: The user is prompted exactly once (during app setup in `PermissionsSetupView`) to grant access.
3. **Background Daemon**: The daemon runs continuously as `root` in the background.
4. **XPC Communication**: The main application communicates with this daemon via XPC. When a task starts, it requests the daemon to begin profiling. When the task ends, the daemon stops, parses the `powermetrics` output, and returns the consumed Joules.

## Integration in EliteAgent
This approach perfectly aligns with the UNO (Unified Native Orchestration) architecture. We leverage a native macOS capability, completely bypassing JSON or web-based logging, ensuring secure, compiled, and highly accurate telemetry for the Agent's hardware effort.
