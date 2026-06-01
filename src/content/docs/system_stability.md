# System Stability & Self-Healing

Pheron Agent is equipped with advanced engines to manage resource utilization under hardware constraints and recover autonomously in the event of task failures.

## 1. Self-Healing Mechanisms
Instead of halting when errors occur, the system actively resolves exceptions:
- **ToolLoopDetector v2:** Monitors execution patterns via SHA-256 hashes to detect infinite loops or repetitive failures. If a loop is caught (threshold: 30 steps), it forces the orchestrator to pivot to a different tool path.
- **AutoRecoveryEngine:** Watches for out-of-memory (OOM) triggers, flushes the VRAM caches, and restarts the core session autonomously with a `reload: true` parameter.
- **SelfHealingEngine (Shell):** Analyzes failures in shell command outputs (such as a missing package) and generates remediation commands (such as running `brew install`) before retrying.

## 2. Dynamic Context Management
Strategies to prevent context window bloat and memory exhaustion:
- **ContextWindowGuard:**
  - **70% Capacity**: Warns the orchestrator and triggers plan optimization.
  - **85% Capacity**: Starts the `ContextCompactionEngine` pipeline.
- **ContextCompactionEngine:** Compresses context sizes by summarizing logs while preserving critical data (such as absolute file paths, UUIDs, and active TODOs).
  - **Preservation Bounds:** Maintains a base context buffer of 2,000 characters and runs vector search to preserve context lines.
  - **Smart Truncation (Head & Tail):** Retains the start and end segments of historical logs to prevent context tearing.
  - **Habit Discovery:** Tracks recurring patterns in tasks and seals them into long-term memory.
- **AdaptiveTaskChunker:** Decomposes large batches (e.g., analyzing 100+ files) into smaller chunks based on current hardware metrics and context budgets. Each chunk carries a summary of preceding runs.

## 3. Hardware-Aware Watchdogs (Thermal & UMA Guard)
- **UMA Watchdog:** Monitors Apple Silicon Unified Memory Architecture constraints in real-time.
- **Proactive Memory Pressure Monitor:** Listens to macOS memory pressure notifications (Normal, Warning, Critical). When VRAM consumption exceeds 85%, the KV cache is quantized, and `DreamActor` is scheduled for emergency consolidation.
- **Thermal Guard:** Integrates with the macOS `ProcessInfo.thermalState` API. If serious thermal throttling is active, it injects autonomous delays (`Task.sleep`) into the inference loop to lower GPU workloads.

---

## 4. v9.0 Stability Sprint Fixes (2026-05-07)

Six confirmed production failures were resolved:

| ID | Module | Issue | Resolution |
|---|---|---|---|
| P0 | Safety | `LogicGate` blocked files containing "top" word (e.g. "Desktop") | Replaced with word boundary `\b...\b` Regex match |
| P0 | Inference | `ModelManager.load()` hit by 3 concurrent startup calls | Implemented `activeLoadModelID` deduplication guard |
| P1 | Memory | `MemoryContextBuilder` expanded without bounds (343 to 1991 chars) | Enforced per-layer hard caps (400/400/700 chars) |
| P2 | Routing | Hardware keywords ("processor", "memory") routed to `.chat` | Added PRIORITY 0 tier for ANE intent classifier |
| P3 | Web | `web_fetch` network failure triggered endless loop | Soft-fail `[WEB_UNAVAILABLE]` string + added `read` action fallback |
| P4 | Evaluation | Terminal observations triggered unnecessary LLM Critic checks | Implemented `trivialPassSignals` early-return |
| P5 | Concurrency | Task depth was unmonitored; `PluginCraftEngine` force-unwrap | Implemented depth logging and async continuation migration |

---

## 5. v9.2 — Semantic Vision & Architectures (2026-05-07)

### MLXVLM On-Device Vision Language Model

| Device RAM | VLM Model | Status |
|---|---|---|
| < 24 GB | — | Automatically disabled (returns `[SEMANTIC_VISION_UNAVAILABLE]`) |
| 24–31 GB | Qwen2.5-VL-3B-Instruct-4bit | Active |
| ≥ 32 GB | Qwen3-VL-4B-Instruct-MLX-4bit | Active |

`VLMInferenceActor` handles hardware state detection, and `SemanticVisionTool` (UBID 84) processes screenshot analyses via `analyzeImage(ciImage:prompt:)`.

### CriticAgent Refactor
Verdict logic inside `OrchestratorRuntime.handleReview()` has been isolated into `CriticAgent.review()`. Rules are cached on first call to prevent LLM latency overhead.

---

## 6. v10.x — ReAct Loop Fixes & CLARIFY Protocol (2026-05-18)

### ReAct Loop UI Leak (P0)
- **Symptom:** Model internal thoughts leaked to the UI instead of final answers.
- **Root Cause:** LLM wrapped tool-calling blocks in code fences (```), causing parsing failure.
- **Fix:** Enforced XML template rules (Prompt) and added user-echo suppression (Parser).

### CLARIFY Protocol
If a prompt is ambiguous, the agent yields a clarification question to the UI and ends the task successfully.
- Format: `<final>CLARIFY("Which directory did you mean?")</final>`
- Critic automatically grants a PASS to CLARIFY results without running model validations.

### EOS Token Config Patches
Fixed Qwen 3.5 early termination issues by copying EOS tokens `[248044, 248046]` directly to the top-level config at load time.
