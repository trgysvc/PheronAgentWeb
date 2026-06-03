# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [7.9.2] - 2026-06-03

### Added
- **Background task processing** — start a new conversation while a task is still running; the old conversation stays in the sidebar with a ⟳ indicator and continues in the background
- **Task interruption** — Stop button (and Escape key) cancels a running task mid-execution
- **Model Hub** — full model catalogue: 30+ local MLX models (Qwen3, Llama 4, Gemma 3/4, Mistral, Devstral, Phi-4, DeepSeek) in a 3-column grid; hardware-adaptive display
- **VLM (Vision) support** expanded: Qwen2.5-VL 7B added for 48 GB+ systems
- **Help → Model Catalog** documentation section with full file lists and RAM requirements
- **License deep link** — `pheron://activate?key=...` URL scheme for one-click activation
- Qwen3 Dense: 0.6B · 1.7B · 4B · 8B · 14B · 32B
- Qwen3 MoE: 30B-A3B · Coder-30B-A3B · Next-80B-A3B · 235B-A22B · Coder-480B-A35B
- Llama 4 Maverick (512 GB)
- Mistral Small 3.2 24B · Devstral Small 24B · Mistral Large 123B · Devstral 2 123B
- DeepSeek V4 Flash (192 GB)
- VLM: Qwen2.5-VL 7B (48 GB+)

### Changed
- Session titles now use the first message instead of the model name
- Model Hub VLM section shown separately
- Settings → AI tab now contains the Configuration section
- WebSearchTool reliability improvements

### Fixed
- License activation window recreates correctly when opened with a pre-filled key

## [7.9.1] - 2026-06-01

### Changed
- Minimum RAM updated to 16 GB across all docs and Info.plist

### Fixed
- Profile pane private relay Apple ID display (shows "Apple Account" + Apple logo)
- Settings window resize for Profile and Analytics tabs
- Help menu missing Refund Policy item
- In-app Help bundle path (documents were not loading)
- Documentation UI navigation paths corrected throughout

## [7.9.0] - 2026-06-01
Public Release

### Added
- Apple Sign In with Supabase authentication
- License activation via Lemon Squeezy

### Fixed
- Settings window auto-resizes per tab content
- Analytics tab window sizing fix (async data load)
- Profile pane window sizing fix

## [9.0.0] - 2026-05-07
"Stability Sprint" Release

Six confirmed production failure modes resolved across the orchestration, memory, safety, and web tool layers.

### Added
- **SubagentRegistry depth tracking (P5):** `register(id:runtime:depth:)` tracks `maxDepthReached` and `totalSpawnCount`. Accessors: `getMaxDepth()`, `getTotalSpawns()`.
- **`safari_automation` `read` action:** Single-step URL text extraction — URLSession (8s timeout) first, AppleScript Safari fallback.

### Changed
- `SessionSummaryStore.loadAsContext()` outcome snippet: `prefix(250)` → `prefix(120)`.
- `PluginCraftEngine.init()` force-unwrap removed; uses `PathConfiguration.shared.applicationSupportURL`.
- `PluginCraftEngine.runShell()` blocking `waitUntilExit()` replaced with async `terminationHandler` continuation.

### Fixed
- **LogicGate false positive (P0):** `cmd.contains("top")` blocked `cp ~/Desktop/...` with a spurious "Accessing top is unsafe" rejection. All `suggestions` keys now matched with `NSRegularExpression` `\b...\b` word boundaries via `matchesWholeWord(_:pattern:)`.
- **Model load race (P0):** Three concurrent callers on startup (`ModelStateManager`, `VaultManager`, `ModelPicker`) hit `ModelManager.load()` simultaneously, producing noise logs. `activeLoadModelID` guard deduplicates before the first `await`.
- **Unbounded memory injection (P1):** `MemoryContextBuilder` claimed ≤1800 chars but had no enforcement — context grew 343→1991 chars. Per-layer hard caps (400/400/700) now enforced. `SessionSummaryStore` outcome snippets truncated 250→120 chars.
- **Hardware query misclassification (P2):** Turkish hardware terms ("işlemci", "bellek", "hafıza") inside `simpleQuestionMarkers` fired before hardware priority, routing "mac'imin işlemci bilgilerini ver" to `.chat`. Restructured `ANEInferenceActor.classifyIntent()` with PRIORITY 0–3 tiers.
- **Web tool 14-turn cascade (P3):** `web_fetch` threw `AgentToolError` on network failure → Critic scored UNOB:FAIL → model retried indefinitely. Network errors now return `[WEB_UNAVAILABLE]` soft-failure string. `safari_automation` gains `read` action (URLSession → Safari fallback) to eliminate hallucinated `action='read'` errors.
- **Critic retry loop (P4):** `handleReview()` called LLM Critic even for terminal observations. Added `trivialPassSignals` early-return for `[WEB_UNAVAILABLE]`, `EMAIL_SENT`, `FILE_SAVED_SUCCESSFULLY`.

## [7.0.0] - 2026-05-01
"Native Sovereign" Release

This major release marks the transition of EliteAgent into a production-ready, hardware-native autonomous system. The architecture has been completely overhauled to prioritize performance, privacy, and Apple Silicon optimization.

### Added
- **UNO (Unified Native Orchestration)**: A binary-native communication highway using `Distributed Actors` and `SharedMemoryPool`.
- **Proactive Memory Pressure Monitor**: Hardware-aware watchdog that manages UMA pressure (M1-M4 support).
- **Native Safari Automation**: High-fidelity control via `AXUIElement` and `SafariJSBridge`.
- **Blender Headless Automation**: Full `bpy` Python API orchestration for 3D workflows.
- **Elite Marathon E2E Suite**: 10 comprehensive end-to-end workflow tests for orchestration validation.
- **Xcode Autonomous Builder**: New `XcodeTool` for building and debugging Swift projects without user intervention.

### Changed
- **Binary-Only Protocol**: Removed all internal JSON usage in favor of PropertyLists and memory mapping.
- **MLX-Native Tokenization**: Replaced `swift-transformers` with a custom `BPETokenizer` running on GPU/Neural Engine.
- **Security Hardening**: Standardized workspace root at `~/Workspaces/EliteAgent` with optional biometric isolation.
- **Registry Overhaul**: All tools now use Unique Binary IDs (UBIDs) for deterministic triggering.

### Removed
- **JSON-RPC Internals**: Eliminated string-based IPC overhead.
- **Chrome-MCP Dependency**: Native Safari automation replaces the need for external browser servers.
- **Legacy Path Resolvers**: Transitioned all storage to `Application Support` and standardized workspace paths.

---

## 🛠 Migration Guide: v6.x to v7.0

### 1. Configuration Move
EliteAgent v7.0 uses a centralized `vault.plist` for all secrets and MCP configurations.
- **Old Path**: `~/.eliteagent/config.json`
- **New Path**: `~/Library/Application Support/EliteAgent/vault.plist`
- *Action*: Use the `scripts/setup.sh` to generate a new template and migrate your API keys.

### 2. Workspace Standardization
The agent now enforces a strict workspace boundary for security.
- **Standard Path**: `~/Workspaces/EliteAgent`
- *Action*: Move your active project folders into the new standardized workspace root.

### 3. Tool Calling Format
If you have custom subagents or prompts, update them to use **Numeric UBIDs** inside `<final>CALL(ID) WITH {params}</final>` blocks instead of string tool names.

### 4. Dependency Cleanup
Run `swift package update` and `swift package purge-cache`. The `swift-transformers` dependency is no longer required and should be removed from your local environment if present.
