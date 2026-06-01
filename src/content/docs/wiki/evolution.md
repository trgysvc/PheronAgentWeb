# Project Evolution History

Pheron Agent was built on an architectural process where every single decision was documented, rejecting any "it probably works this way" assumptions. The project's evolution is centered around local execution power and Apple Silicon optimizations.

## Phase 1: Architectural Foundation and PRD (v5.2 - March 2026)
The foundations of the project were laid with the "Pheron Agent Design Document (PRD)." In this phase:
- **Hallucination Prevention Protocol:** Documentation was declared as the sole ground-truth source.
- **Native Swift 6:** Selected as the main language and architectural backbone.
- **UNO (Unified Native Orchestration):** Designed as the underlying communication infrastructure.

## Phase 2: Titan v2 and MLX Integration (April 2026)
A critical period where the local inference engine was updated and performance was prioritized:
- **Titan v2 (Qwen 3.5 MLX):** Inference speed and generation quality were improved.
- **GGUF Integrity Shield:** Added an automated header validation system for model security.
- **UMA Diagnosis:** Deployed mechanisms to prevent Out Of Memory (OOM) errors on the Unified Memory Architecture.

## Phase 3: Security and Stability (Current)
A phase focused on tightening the agent's interfaces (tools) with the external world:
- **Biometric Approval:** Mandatory Touch ID verification was introduced for sensitive tools like Email and WhatsApp.
- **Sandbox Hardening:** System security was maximized by restricting Apple Events permissions.
- **Advanced Analytics:** A dashboard was added to track latency and TPS (Tokens Per Second).

## Critical Turning Points
- **WhatsApp Stability:** Autonomous messaging became stable by resolving timing errors.
- **Mandatory Local Mode:** Banned silent cloud fallback attempts, ensuring complete local control.

---

### Detailed Records and Logs
- **Version History:** Specific technical changes in each release are listed in the [[CHANGELOG]] document.
- **Technical Evolution:** Micro-decisions during development and daily progress are tracked in the [[devlog]] file.
- **Brainstorming Archives:** Design-phase dialogues and strategic shifts are preserved in the [[DevelopmentConversations]] archive.

---

## Phase 4: Flow, Clarity, and Correctness (May 2026)

### [2026-05-16] EOS Token Hoisting (Qwen3 Stop Error Fix)

In `mlx-community` Qwen3.5-9B-4bit, the EOS token (`eos_token_id: [248044, 248046]`) was defined only inside `text_config` and was missing from the top-level `config.json`. This omission prevented the model from stopping, leading to infinite generations.

**Solution via `ModelManager.patchQwen35Config()`:**
- Copied EOS token IDs `[248044, 248046]` to the top-level configuration.
- Automatically generated `generation_config.json` with explicit `eos_token_id` values.
- The patch executes automatically post-model loading, requiring no manual actions.

### [2026-05-17] HardwareAdaptiveParams Full Integration

`InferenceActor.generate()` now consumes the output of `AutoConfigManager.shared.adaptiveParams()`. Previous hardcoded `topP=0.9, minP=0.05` configs were removed.

- **Qwen3 Official Specs:** `topK=20`, `minP=0` (the previous `minP=0.05` was incorrect).
- **KV Cache Conflict Resolved:** `kvBits` is set to `nil` when a draft model is active. Speculative decoding and quantized KV cache cannot run concurrently; this conflict was resolved parametrically.
- **Dynamic maxKVSize:** Set dynamically based on hardware metrics (RAM capacity, thermal state): 8 GB → 8192, 16 GB → 131072.

### [2026-05-18] ReAct Loop UI Leak Fix

When the model wrapped its `CALL` block inside triple backticks (code fence), `ThinkParser` failed to parse the block. As a result, internal planning text (the agent's inner monologue, such as "I found one image...") leaked to the UI as a `finalAnswer`.

**Two-layered fix:**
1. **PlannerTemplate Rule 6a:** Added `"NEVER wrap CALL in code fences"` explicitly to the model's instructions.
2. **ThinkParser Request-Echo Suppression:** Added regex to prevent the model from prefixing its output by echoing the user request. It strips sentences starting with `"The user asked/wanted/requested/said..."` during `cleanForUI()`.

### [2026-05-18] CLARIFY Protocol

For tasks with ambiguous or missing information, the agent now prompts the user instead of guessing. The protocol uses the format: `<final>CLARIFY("query")</final>`.

**Implementation:**
- `EliteOutputType.clarification` — Added a new output type case (`Types.swift`).
- `ThinkParser.tryParseClarify()` — Runs before UBID parsing, recognizing the CLARIFY format.
- `OrchestratorRuntime`: `.clarification` handler → routes the query to the UI via `onChatMessage`, finishing the task gracefully (not as an error).
- `CriticAgent` block 2b: CLARIFY auto-pass → automatically awards a PASS to CLARIFY tasks that end without running tools.
- `TaskClassifier`: Routes "organize/move/folder" commands to `.fileProcessing` (classified before the vision pipeline).
- `PlannerTemplate`: Explicitly specified the `~/Pictures/Screenshots` target directory path rule to prevent writing typos.

### [2026-05-19] Streaming Infrastructure (Per-Token UI Updates)

Generated tokens are now streamed to the UI in real-time during chat and report phases.

**Added Components:**
- `LLMTypes.swift`: `CompletionRequest.onToken: (@Sendable (String) -> Void)?` — per-token callback.
- `MLXProvider.swift`: Think-block-aware streaming — buffers tokens until `</think>` is closed, then emits them via `onToken`.
- `OrchestratorRuntime.swift`: `onStreamingToken` handler connected to `handleChatting` and `handleReporting` phases.
- `Orchestrator.swift`: `@Published var streamingMessage: String = ""` — MainActor token accumulator.
- `ChatWindowView.swift`: Live streaming bubble — atomically transitions to the final message on completion.
- `ChatBubble.swift`: Assistant messages render in Markdown format. `CodeBlockView` provides monospace font, language labels, and copy buttons for code blocks.
