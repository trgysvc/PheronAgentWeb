# Architectural Decisions: EliteAgent v7.0 Stability Sprint

## [2026-04-30] ADR-001: Global Session Control for UMA Watchdog
- **Decision:** Implement `pauseAllSessions()` and `resumeAllSessions()` as `@MainActor` static methods in `OrchestratorRuntime`.
- **Rationale:** Ensures thread-safe, instantaneous freezing of all inference sessions when kernel memory pressure reaches `.critical`.
- **Impact:** Prevents OOM crashes by halting new token generation until pressure subsides.

## [2026-04-30] ADR-002: Dual-Path UNO Transport (Zero-Copy)
- **Decision:** Establish a 64KB threshold for dual-path IPC. 
    - `< 64KB`: Inline binary PropertyList (low overhead).
    - `> 64KB`: `SharedMemoryPool` (Actor) + `xpc_shmem_t` (Zero-copy).
- **Rationale:** Avoids the performance penalty of copying large data blocks (vision payloads, logs) across XPC boundaries.
- **Impact:** Significant reduction in IPC latency for data-heavy tool executions.

## [2026-04-30] ADR-003: Smart Tool Result Truncation
- **Decision:** Implement a 32,000 character (~8k token) "Hard Cap" for tool results passed to the LLM context.
- **Rationale:** Protects the KV Cache from being overwhelmed by massive tool outputs (e.g., 50k line file reads).
- **Impact:** Preserves context space for reasoning while storing full results in the `Session` actor for causality integrity.

## [2026-04-30] ADR-004: Preemptive Context Overflow Protection
- **Decision:** Adopt the formula `(Current + System + Predicted Response) * 1.2 > Budget` in `ContextWindowGuard`.
- **Rationale:** 20% safety margin accounts for tokenization variance and multi-turn expansion, triggering compaction before reaching hard limits.
- **Impact:** Eliminates "400 Context Overflow" errors during complex autonomous workflows.

## [2026-04-30] ADR-005: Native Sovereign Tokenization
- **Decision:** Replace `swift-transformers` with a native `BPETokenizer` and `UNOTokenizer` protocol.
- **Rationale:** Removes massive external dependency chain and ensures the core inference loop is isolated from library updates.
- **Impact:** Faster startup times and simplified binary distribution.

## [2026-04-30] ADR-006: Session-Scoped MCP Client Architecture
- **Decision:** Implement MCP clients as session-scoped entities managed by `MCPClientActor`.
- **Rationale:** Standardizes external tool integration (search, calendar) without polluting the core toolset. Session-scoping ensures resource isolation and security.
- **Impact:** Enables highly extensible tool discovery while maintaining 10-minute idle TTL for memory safety.

## [2026-05-01] ADR-007: JSON-to-Binary Boundary Strategy for MCP
- **Decision:** Use JSON only at the MCP protocol boundary; convert all incoming payloads to UNO Binary (PropertyList) for internal routing.
- **Rationale:** Maintains the project's "No JSON" rule for internal orchestration while complying with the external MCP standard.
- **Impact:** Ensures internal type safety and performance while allowing external extensibility.

## [2026-05-01] ADR-008: Native AX-First Browser Automation
- **Decision:** Prioritize `AXUIElement` (Accessibility API) for browser interaction, using `SafariJSBridge` (JavaScript) only as a fallback.
- **Rationale:** Native AX interaction is more robust against complex DOM structures (like SPAs) and bypasses many anti-automation detections.
- **Impact:** Higher fidelity automation for sites like Gmail, GitHub, and Google Drive.

## [2026-05-02] ADR-009: Swift 6.1 Toolchain Adoption
- **Decision:** Mandatory upgrade to Swift 6.1 toolchain for all EliteAgent components.
- **Rationale:** Required to support the new SPM **Traits** feature utilized by `swift-tokenizers-mlx` in the MLX-LM v3.31.3 ecosystem.
- **Impact:** Ensures compatibility with v3-Native architectures while enabling finer control over package feature flags.

## [2026-05-02] ADR-010: Granular Dependency Decoupling
- **Decision:** Replace monolithic `mlx-swift-lm` imports with granular products: `MLXLMTokenizers`, `MLXLMHFAPI`, and `MLXHuggingFace`.
- **Rationale:** Reduces binary size, minimizes transitive dependency bloat, and aligns with the official MLX-LM v3 modularity standards.
- **Impact:** More stable build graph and faster incremental compilation in Xcode.

## [2026-05-02] ADR-011: Standardized SPM-IDE Synchronization
- **Decision:** Perform manual surgery on `.xcodeproj` (pbxproj) to synchronize with `Package.swift` rather than using hacky `unsafeFlags` or temporary workarounds.
- **Rationale:** Apple's deprecation of `generate-xcodeproj` necessitates maintaining the project file manually for IDE support. Standardized linking (PBXBuildFile, XCRemoteSwiftPackageReference) ensures long-term IDE stability.
- **Impact:** Eliminates "No such module" and "Damaged project" errors in Xcode without sacrificing modern SPM features.

---

# Architectural Decisions: EliteAgent v8.x Sprint (2026-05-04)

## [2026-05-04] ADR-012: Native Tool Calling via xmlFunction Format (Solution A)

- **Decision:** Use mlx-swift-lm's native `xmlFunction` tool calling format (auto-selected for `model_type="qwen3_5"`) instead of the legacy UBID string-injection approach.
- **Rationale:** The legacy path (`CALL([UBID]) WITH {...}`) required the LLM to memorize a custom format; native tool calling uses the model's trained capability (`<tool_call>` blocks), producing higher accuracy and eliminating prompt engineering overhead. `ToolRegistry.getTool(named:)` already existed and supports name-based lookup — no UBID required on the native path.
- **Rejected alternatives:**
  - Solution B: constrained grammar logit processor (`UNOGrammarLogitProcessor`) — retired as it was never wired and was designed for the old CALL format. Adds inference complexity for no gain when native format works.
  - Solution C: fine-tuning the model for UBID format — prohibitively expensive for a production cadence.
- **Impact:** Local model (Titan Engine) uses native path exclusively. Cloud model (OpenRouter) retains legacy path as fallback — no breaking change.

## [2026-05-04] ADR-013: Intent Classification at Complexity=1 (enableThinking=false)

- **Decision:** All user messages are classified as `chat` or `task` with a cheap inference call (`enableThinking=false, maxTokens=64`). Chat → fast path (`handleChatting()`). Task → full planning loop (`handlePlanning()` → `handleExecution()`).
- **Rationale:** Qwen 3.5's thinking mode generates 800+ tokens before answering, turning a "merhaba" greeting into a ~90s response. Classifying first lets us use `enable_thinking: false` for simple messages — reducing latency from ~90s to <10s — while preserving full thinking for agentic tasks where reasoning quality matters.
- **Key API:** `UserInput(additionalContext: ["enable_thinking": false])` — official mlx-swift-lm suppression API; does not strip output post-hoc, prevents `<think>` generation entirely.
- **Impact:** Chat messages: <10s. Task planning: unchanged (thinking enabled). Classification itself: ~1s.

## [2026-05-04] ADR-014: Wired Memory Strategy (WiredBudgetPolicy + per-inference ticket)

- **Decision:** After model load, run `WiredMemoryUtils.tune()` in a background Task to measure real weight/KV/workspace bytes. Each `generate()` call constructs a `WiredBudgetPolicy` ticket using these measured values and passes it to `container.generate(wiredMemoryTicket:)`.
- **Rationale:** Wired memory prevents the OS from evicting model weights to disk under memory pressure, reducing first-token latency. Measuring actual bytes (not estimating) via a real 64-token prefill pass ensures the budget is accurate for the loaded model, not a static constant that becomes stale when the model changes.
- **Stable policy ID:** `wiredPolicyID: UUID` is constant for the lifetime of the actor, grouping all tickets under the same budget policy so the OS sees them as one logical allocation.
- **Graceful degradation:** If measurement hasn't completed (`wiredMeasurement == nil`) or the process is CPU-only (`isCPUOnly`), no ticket is created and inference proceeds normally.
- **Impact:** Lower first-token latency on M-series hardware. Zero impact on CPU-only runs.

## [2026-05-04] ADR-015: Rotating KV Cache via maxKVSize

- **Decision:** Set `GenerateParameters.maxKVSize = 8192` to activate `RotatingKVCache` instead of the default unbounded `KVCacheSimple`.
- **Rationale:** Without a cap, long agentic sessions (multi-tool loops, research tasks) cause unbounded KV cache growth, eventually exhausting Unified Memory and crashing. 8192 tokens covers the vast majority of tasks; for an agent making tool calls the context is regularly refreshed. One-line change, zero code-path changes — `maxKVSize` is checked by MLX internally.
- **Trade-off:** Contexts longer than 8192 tokens lose the oldest entries (first 4 tokens preserved). For research-heavy tasks requiring longer context, `maxKVSize = 16384` may be preferable at the cost of higher peak memory.
- **Impact:** Eliminates OOM crashes on long conversations. VRAM usage bounded at ~8K token KV footprint.

## [2026-05-04] ADR-016: Speculative Decoding as Opt-in Infrastructure

- **Decision:** Implement full speculative decoding infrastructure in `InferenceActor` but keep it opt-in: the feature activates only if a draft model is present at `{mainModelURL}-draft` (auto-discovery) or explicitly loaded via `loadDraftModel(at:)`. No behavior change if no draft model exists.
- **Rationale:** Speculative decoding requires tokenizer-family compatibility between draft and main model — a constraint that cannot be validated automatically at build time. Opt-in via file presence is simpler than a configuration flag and prevents silent correctness errors from incompatible models.
- **UnsafeTransferBox:** `MLXLMCommon.generate(draftModel:)` takes non-Sendable types (`LMInput`, `any LanguageModel`) across `@Sendable` closure boundaries. The package-internal `SendableBox` is not accessible externally. `UnsafeTransferBox<T>: @unchecked Sendable` replicates this pattern. Safe because: (1) `LMInput` is consumed exactly once via `take()`, (2) `LanguageModel` weights are read-only after `eval()`, (3) KV caches are per-inference.
- **Expected impact:** 2-4x TPS improvement with a compatible Qwen3 family draft model (e.g., Qwen3-0.5B or Qwen3-1.5B). Highest gain with greedy decoding (temperature=0).

## [2026-05-04] ADR-017: AI Agent Instruction Files (GEMINI.md)

- **Decision:** Maintain a dedicated instruction file `GEMINI.md` at the project root for the AI coding agent (Gemini CLI / Antigravity). The file contains absolute rules with concrete forbidden code examples.
- **Rationale:** On 2026-05-03, Antigravity (Gemini CLI) violated the project's `No JSON` rule. Root cause: Gemini reads `GEMINI.md` at session start, and the rule was originally a single bullet point without concrete examples — insufficient for AI agent compliance.
- **Rule format required:** Each absolute rule must include (1) a labeled `❌ FORBIDDEN` code block, (2) a labeled `✅ CORRECT` code block, and (3) a note if the rule has been previously violated.
- **Impact:** The AI agent sees these rules in its native instruction file. Violation incident documented as a deterrent.

---

# Architectural Decisions: EliteAgent v10.x Sprint (2026-05-17 – 2026-05-19)

## [2026-05-17] ADR-018: HardwareAdaptiveParams as Single Source of Truth

- **Decision:** Remove all hardcoded `GenerateParameters` values from `InferenceActor.generate()` and route them through `AutoConfigManager.shared.adaptiveParams()`.
- **Rationale:** Static values (`topP=0.9`, `minP=0.05`, `maxKVSize=8192`) were appropriate for a specific hardware configuration but suboptimal for others. Devices with 16 GB+ unified memory can handle `maxKVSize=131072` (16x larger KV window), significantly improving long-context task quality. Additionally, Qwen3's official recommended sampling uses `topK=20, minP=0` — the previous `minP=0.05` was incorrect and caused lower diversity.
- **KV cache + speculative decoding incompatibility fix:** When `draftModelContainer` is active, `kvBits` must be `nil`. Quantized KV cache and speculative decoding use incompatible memory layouts; enabling both produces garbled output. `adaptiveParams()` handles this conditional.
- **Impact:** Inference quality improves on high-memory devices. Speculative decoding is now correctly isolated from KV quantization.

## [2026-05-16] ADR-019: EOS Token Hoisting for mlx-community Models

- **Decision:** `ModelManager` applies a post-load patch (`patchQwen35Config()`) to Qwen3.5-9B models from mlx-community that are missing top-level EOS token definitions.
- **Rationale:** The mlx-community Qwen3.5-9B-4bit distribution defines `eos_token_id` only inside `text_config`. MLX inference reads the top-level key; without it the model never encounters a stop signal and generates indefinitely (runaway inference, OOM).
- **Patch:** Copies `[248044, 248046]` to the top level of `config.json` and writes a `generation_config.json` with `eos_token_id`. Applied once after model download, idempotent on repeat runs.
- **Impact:** Eliminates runaway generation. Model stops reliably at the correct token.

## [2026-05-18] ADR-020: CLARIFY Protocol for Ambiguous Task Handling

- **Decision:** When a task is ambiguous or missing required information, the agent emits `<final>CLARIFY("question text")</final>` instead of proceeding with assumptions.
- **Rationale:** The previous behavior — "make a reasonable assumption and proceed" — led to wasted inference turns, incorrect tool invocations, and user frustration when the agent completed a task the user did not intend. A single CLARIFY exchange costs one inference turn but saves multiple failed turns.
- **Detection order:** `ThinkParser.tryParseClarify()` runs before UBID dispatch to prevent accidental tool execution during a clarification response.
- **Critic integration:** `CriticAgent` block 2b auto-passes CLARIFY results — a task that ends in a question to the user is correct behavior, not a failure.
- **Rejected alternative:** Injecting a "ask if unclear" rule into the system prompt without structured output — this produced inconsistent behavior as models would sometimes ask inline, sometimes proceed.
- **Impact:** Reduced wasted planning turns for ambiguous commands. Improved UX: users receive a clarifying question rather than a wrong output.

## [2026-05-18] ADR-021: mkdir Action in FileManagerTool

- **Decision:** Add `action=mkdir` to `FileManagerTool` (`ProductivityTools.swift`) for creating directory trees.
- **Rationale:** Directory creation was previously only possible via `shell_exec` with `mkdir -p`. This required a full shell subprocess for a trivial filesystem operation, adding latency and bypassing the tool safety layer. A dedicated `mkdir` action uses `FileManager.createDirectory(withIntermediateDirectories: true)` — sandbox-aware, no subprocess.
- **Impact:** Agent can create nested directories without invoking a shell. Reduces shell subprocess usage for file organization tasks.

## [2026-05-19] ADR-022: Think-Block-Aware Per-Token Streaming

- **Decision:** Implement per-token streaming for chat and reporting phases. Think blocks (`<think>...</think>`) are buffered in `MLXProvider` and never emitted to the token callback.
- **Rationale:** Full-response-at-once delivery caused perceived latency of 30–90 seconds on longer answers. Streaming makes the agent feel responsive immediately. However, naively streaming every token would expose internal reasoning to the UI — so `MLXProvider` maintains a `thinkMode` flag, accumulating tokens after `<think>` until `</think>` is seen, then resuming `onToken` emissions.
- **Callback contract:** `CompletionRequest.onToken: (@Sendable (String) -> Void)?` — set only for chat and reporting calls. Planning, critic, and classification calls leave this `nil` (their output is not streamed to UI).
- **UI layer:** `Orchestrator.streamingMessage: String` (published) accumulates tokens on MainActor. `ChatWindowView` shows a live streaming bubble; when the final `CompletionResponse` arrives, the bubble is atomically replaced by the persisted message.
- **Impact:** First visible token appears within 1–2 seconds of generation start. Think blocks remain private.

## [2026-05-20] ADR-023: XPC Hardened Runtime & Entitlements

- **Decision:** Enable Hardened Runtime for the `EliteAgentXPC` target in `project.pbxproj` and explicitly grant `disable-library-validation`, `allow-jit`, and `automation.apple-events` in its entitlements file.
- **Rationale:** Apple requires Hardened Runtime for Notarization of all executables, including XPC services. However, enabling it breaks dynamic loading of third-party SPM dependencies (like `mlx-swift`) and blocks AppleEvents automation unless explicit exceptions are granted. By enabling it and providing these specific entitlements, we satisfy Notarization without breaking the orchestrator agent's capability to load models or interact with macOS.
- **Impact:** Allows successful archiving and Notarization. The XPC service remains robust without sandboxing restrictions (`ENABLE_APP_SANDBOX = NO`).
