# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.7] - 2026-09-17

### Added
- **TikTok Integration** — Bring-your-own-app connection (Settings > Connections > TikTok): publish a video or photo carousel directly, or send it to your own inbox as a draft. Also reads your own profile/creator info, video list, and post-processing status.
- **X (Twitter) — Bookmarks, Follows, Mutes, Blocks, Lists & Direct Messages** — Expanded beyond posting/deleting/liking/retweeting to cover bookmarking, following/unfollowing, muting/blocking, hiding replies, quote posts, polls, managing your own Lists, and sending/reading Direct Messages.
- **LinkedIn — Reshare, Articles, Multi-Image, Polls & Documents** — Reshare another post, share a link with a title/description, post up to 20 images, create a poll, attach a document (PDF/PPT/DOC), add a call-to-action button, and edit a post's text after publishing.
- **Facebook — Page Management & Photo Albums** — Update your Page's profile fields, create and upload to photo albums, plus per-post insights and a full reaction breakdown.
- **Instagram — Comment Moderation** — Hide/unhide a comment on your own post without deleting it, plus reading your own profile and recent media.
- **Conversation Archive** (Settings > Data & Privacy) — Opt-in, on-device search across your past iMessage/SMS, WhatsApp, and Mail conversations to answer "what did I decide with X"-style questions. Nothing is sent to the cloud; raw message text is never stored, only derived per-topic summaries and per-contact profiles, encrypted at rest.
- **Jira, Slack, Notion & Zapier — now fully live-tested and working**, each with a simpler or more reliable connection flow than before.
- **Hooks** — Automatically run a follow-up task whenever a specific tool call succeeds (e.g. "after every file save, run prettier on it"), alongside the existing time/file-change automations.

### Fixed
- **Reminder Due Dates** — A reminder created with a due date/time could silently save with no due date at all; fixed.
- **Instagram & Facebook Token Expiry** — Both connections could silently stop working about an hour after connecting because the short-lived token from the first login step was never exchanged for the real ~60-day one; fixed — reconnect once to pick it up.
- **TikTok OAuth Reliability** — Three separate causes for a generic "scope"/"malformed request" error during Connect via OAuth, all fixed (stray invisible characters from copy-paste, a token-exchange formatting mismatch, and a PKCE encoding mismatch).
- **Social-Media Insight Misrouting** — Asking for a Facebook or Instagram Page's "performance" stats could get answered with your Mac's own CPU/RAM telemetry instead of the real insights tool; fixed.
- **X Tool Disambiguation** — The five X tools (post, delete, engagement, lists, direct messages) could get confused with each other on a single request; each now resolves to the one that actually matches.
- **Conversation & Skill Recall** — "What did I discuss with X" or "list my saved skills" could get answered from the model's own imagination instead of your real data; corrected to route through a real lookup.
- **Connection Availability Flicker** — A connected integration could briefly disappear from available tools mid-conversation under heavy system load, even after being confirmed working earlier in the same session; a confirmed-working result is now trusted for much longer.
- **Web Search & Citation Reliability** — A further batch of research/citation fixes on top of 1.0.6's, including dropped search results and fabricated-source false positives.
- **Integration Routing Consistency** — Requests mentioning Jira, Sentry, Linear, Slack, or Postgres could be classified inconsistently between runs of the same request; now routed consistently every time.
- **Swift 6.4 / Xcode 27 Compatibility** — Adopted the new toolchain's async `defer` support to close three real resource-leak paths (energy tracking and local-model cache not always releasing on an error path), plus a build-breaking Metal shader packaging conflict introduced by the toolchain update.

## [1.0.6] - 2026-08-01

### Added
- **Lark Suite Integration** — Bridges Lark/Feishu's official MCP server for messaging, chats, calendar, Base, docs, and tasks via a bring-your-own-app connection.
- **LemonSqueezy Integration** — Direct REST bridge for managing orders, customers, subscriptions, discounts, and license keys.
- **Kit (ConvertKit) Integration** — Direct REST bridge for managing subscribers, broadcasts, sequences, and tags.
- **MCP Hub Disconnect Support** — Every connected service now has a one-click way to clear its credential and disconnect.
- **Audacity Integration** — Control a running Audacity instance directly via its own scripting protocol for audio editing and effects.
- **Apple Notes, Reminders & Office Export** — Native Notes/Reminders support, real Excel/PowerPoint/Word export from Numbers/Keynote/Pages, and on-device background removal.

### Fixed
- **Web Search & Citation Reliability** — Fixed a batch of research-answer issues, including dropped search results, false "incomplete answer" rejections, and wrongly-flagged citations.
- **New Tool Discoverability** — Notes, Reminders, background removal, and the Office-document tools are now correctly reachable for simple requests.
- **Multi-Step Task Completion** — Fixed cases where the agent could describe a next step without executing it, or mark a report as done without writing it.
- **Memory & Recall Reliability** — "Remember this" requests now reliably save instead of silently doing nothing.
- **Safer Tool Retry Logic** — A tool disabled after repeated failures now recovers automatically, and permanent restrictions are reported immediately instead of retried.
- **Calendar Date Accuracy** — Fixed a bug where events could silently save with an incorrect date.
- **Stripe & Git Integration Fixes** — Corrected Stripe's action set after an upstream change and stabilized the Git MCP integration.
- **File & Folder Operation Safety** — Fixed edge cases in path-permission checks and folder move/copy behavior.
- **General Reliability** — Smaller fixes to telemetry delivery, browser automation, timeout budgets, and system-load detection.

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

