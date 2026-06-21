# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.3] - 2026-06-19

### Added
- **Personal memory & recall** — the agent now reliably remembers and surfaces facts you've explicitly shared (background, CV, preferences) when you ask about them; closed a deep retrieval gap where saved facts could become effectively unsearchable
- **Multi-language file/folder commands** — "organize this folder" style requests now recognized in 13 languages (added ES, FR, DE, PT, IT, RU, ZH, JA, KO, AR alongside TR/EN), not just Turkish/English
- **MusicDNA report actions** — analysis results now include "Open Report" and "Show in Finder" buttons to jump straight to the generated `.dna.md` / `.report.plist` files
- **Telemetry — Supabase integration:** all telemetry events now flow through `telemetry_events` with authenticated requests, retry logic, and a synchronous flush on quit
- **Energy tracking — IOKit-based:** real CPU+GPU+ANE joule measurements via `powermetrics`, shown live in the menu bar effort indicator
- **Analytics default-on:** analytics now defaults to enabled when no explicit preference is set

### Fixed
- **Lost context after a clarifying question** — answering the agent's follow-up question (e.g. "which date format?") could previously derail the conversation into unrelated results (a stray "ram" substring match was misrouting these replies); the agent now stays on the original task after you answer
- **Faster personal-recall responses** — eliminated a wasted reasoning turn when the agent looks up something you previously told it
- Apple Music playback and volume control: confirmation now reflects the actual player state, fixing silent failures when Music wasn't already running
- Telemetry: RAM/inference metrics and authentication no longer report stale or zero values; failed analytics batches no longer fail silently
- Debug builds now sign with the correct development team, fixing missing entitlements

## [1.0.2] - 2026-06-03

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

## [1.0.1] - 2026-06-01

### Changed
- Minimum RAM updated to 16 GB across all docs and Info.plist

### Fixed
- Profile pane private relay Apple ID display (shows "Apple Account" + Apple logo)
- Settings window resize for Profile and Analytics tabs
- Help menu missing Refund Policy item
- In-app Help bundle path (documents were not loading)
- Documentation UI navigation paths corrected throughout

## [1.0.0] - 2026-06-01
Public Release

### Added
- Apple Sign In with Supabase authentication
- License activation via Lemon Squeezy

### Fixed
- Settings window auto-resizes per tab content
- Analytics tab window sizing fix (async data load)
- Profile pane window sizing fix

