# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- **Audacity integration (`audacity_control`)** — the agent can now control a running Audacity instance (import/export audio, edit, apply 40+ effects) via Audacity's own official scripting protocol (`mod-script-pipe`). Requires enabling that module once in Audacity's own Preferences. Rather than hand-coding a subset of Audacity's 250+ scriptable commands, the tool is a general-purpose passthrough to Audacity's own text command protocol — giving access to the full command set through one mechanism, with a categorized on-demand command reference (`action: "help"`) instead of bloating every request with the full list. Known limitation, confirmed to be an Audacity-side bug (open upstream issue, not fixable here): exporting to `.wav` currently produces an AIFF-format file on macOS regardless of the requested extension; `.flac`/`.mp3` are unaffected.
- **Apple Notes and Apple Reminders support** (`notes_action`, `reminders_action`), plus real Office document creation — Numbers/Keynote/Pages documents exported to genuine Excel/PowerPoint/Word (`.xlsx`/`.pptx`/`.docx`) — and image background removal (`remove_background`, on-device Vision framework, no cloud upload).

### Fixed
- **Six newly-added tools (Notes, Reminders, background removal, and the three Office-document tools) were completely unreachable for any simple, single-step request** — the overwhelming majority of real usage. They were correctly registered but never added to the internal category→tool-visibility mapping the model actually reads from for simple requests, so asking to "create a note" would silently fall back to writing a plain text file instead. Found via a full live GUI test pass; fixed by adding all six to their correct categories and adding deterministic routing keywords so the request classifier recognizes them reliably instead of guessing.
- **A tool-use chain could silently stop one step short of completion.** After successfully reading a file, the model could describe its next intended step ("...then I'll use patch_file to update it...") without ever actually calling it, and the task would end there with no error. The safety check that catches this ("you described a plan instead of acting") only ever looked at the very first step of a task — extended to catch a stated-but-never-executed next step at any point in the chain.
- **A research question could still return a specific version number or a source URL that was never actually confirmed by any search/fetch result**, despite dedicated safety checks existing for exactly this. Root cause was two separate gaps: the version-number check's own pattern didn't match Turkish grammatical suffixes ("sürümü", "sürümünün" — it only matched the bare, unsuffixed word), so it silently never fired for Turkish questions; and the URL-citation check only activated when the answer explicitly used the word "source:"/"kaynak:", missing a fabricated link embedded directly in a sentence. Both fixed, and the URL check now also checks across the whole conversation, not just the single most recent step.
- **A "write me a report" request could be marked done after the agent merely listed some files, without ever writing an actual report.** Added a check that blocks finishing a report-creation request until a real report has actually been produced.

## [1.0.5] - 2026-07-24

### Fixed
- **Source Citation Safety** — Fixed an issue where the agent could cite non-existent source URLs, dates, or version numbers by moving citation safety checks to the active execution path.
- **Compound Request Execution** — Fixed an issue where compound multi-part requests (e.g. asking for telemetry and OS version together) could return with only half the answer by enforcing missing tool calls.
- **Shell Output Redirect Safety** — Prevented bare single-file shell redirects (`command > file`) from bypassing binary protection and write safety checks.
- **Bot Detection & CAPTCHA Filtering** — Web search now detects and filters out CAPTCHA/bot-challenge pages from search engines to prevent reasoning from challenge text.
- **Google Search JS Stabilization** — Improved Google search result fetching by waiting for client-side JavaScript rendering to complete.
- **Safari Fallback Resilience** — Genuinely opens visible Safari tabs for search fallback with clear permission guidance when required.
- **Biometric & Keychain Concurrency** — Fixed Touch ID timeout handling and unblocked background Keychain reads from blocking tool-availability checks.
- **Daemon Retry Limits** — Prevented failing background daemon connections from retrying indefinitely.

### Added
- **Authoritative Source Researching** — Agent now prioritizes official project data, structured specs, and direct documentation over third-party search snippets.
- **Expanded GitHub Toolsets** — Added access for GitHub Actions, code security, Dependabot, discussions, advisories, gists, projects, labels, and notifications.

## [1.0.4] - 2026-07-06

### Added
- **MCP Tool Bridges** — Pheron Agent now integrates with external Model Context Protocol (MCP) servers including Git, Playwright browser automation, Perplexity web search, Stripe, GitHub, Notion, Unreal Engine, and Zapier.
- **MCP Hub & Connections** — Added a dedicated card-grid wizard in Settings > Connections to easily configure, save, and test credentials for external tool connections.
- **Context-Aware Recommendations** — The agent now suggests connecting missing integrations in Settings > Connections when a task requires a credential-gated tool.
- **Unified Screen & Accessibility Reasoning** — Chained screen-capture descriptions, OCR, and AX tree analysis for more cohesive and reliable browser/screen-related actions.
- **Local User Profile** — Preferences discovered by the agent and user identity information are now saved in a readable Markdown profile (`UserProfile.md`).
- **Performance Tab Redesign** — Merged Health and Analytics tabs under Settings into a single tab featuring real-time CPU, memory, and speed usage trend charts.
- **Disk Telemetry Support** — Telemetry reports now include boot volume free space alongside CPU and memory stats.

### Fixed
- **Multi-Turn Conversation Context** — Fixed context loss between consecutive turns in the same conversation thread, ensuring the agent remembers the immediate context.
- **Model Context Limits** — Corrected local model context budget scaling issues that artificially restricted usable token windows on higher-RAM systems.
- **Memory Loop Fixes** — Resolved a tool-calling loop trigger when looking up user-recall details (e.g., "do you remember my name?").
- **Keychain & Authentication Stability** — Fixed OAuth flow callbacks for Notion/Zapier and restored deleted Keychain entries during local test executions.
- **Task Switch Performance** — Stopped background processes and command executions immediately on timeout or task cancellation to prevent CPU leakages.
- **Turkish Command Preposition Routing** — Fixed a misrouting bug where Turkish prompts containing "üzerinden" (via) were incorrectly sent to the math/calculation path.

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

