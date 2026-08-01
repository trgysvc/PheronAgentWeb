# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.6] - 2026-08-01

### Added
- **Audacity integration (`audacity_control`)** — the agent can now control a running Audacity instance (import/export audio, edit, apply 40+ effects) via Audacity's own official scripting protocol (`mod-script-pipe`). Requires enabling that module once in Audacity's own Preferences. Rather than hand-coding a subset of Audacity's 250+ scriptable commands, the tool is a general-purpose passthrough to Audacity's own text command protocol — giving access to the full command set through one mechanism, with a categorized on-demand command reference (`action: "help"`) instead of bloating every request with the full list. Known limitation, confirmed to be an Audacity-side bug (open upstream issue, not fixable here): exporting to `.wav` currently produces an AIFF-format file on macOS regardless of the requested extension; `.flac`/`.mp3` are unaffected.
- **Apple Notes and Apple Reminders support** (`notes_action`, `reminders_action`), plus real Office document creation — Numbers/Keynote/Pages documents exported to genuine Excel/PowerPoint/Word (`.xlsx`/`.pptx`/`.docx`) — and image background removal (`remove_background`, on-device Vision framework, no cloud upload).

### Fixed
- **Web search reliability, end to end — a batch of research/citation fixes found through a deliberately demanding test pass.** Several distinct, previously-invisible failures were combining to make research-style questions ("compare X and Y version, cite your sources", open-ended "latest news" questions, questions about obscure/nonexistent subjects) unreliable — each is now fixed and independently re-verified:
  - Search results with even one unexpectedly-shaped entry could silently discard the entire result set instead of just skipping that one entry.
  - An open-ended research question could get its own already-correct, already-cited final answer mistaken for a 9-step to-do list (its own summarized findings, misread as a plan) — then get rejected over and over as "incomplete," forcing repeated redundant re-searching for facts already in hand until the request timed out.
  - A citation to a page the agent had genuinely just read in full could still get flagged as a fabricated source and rejected, if the page's own text didn't happen to repeat its own URL.
  - When no paid search API key is configured, the free fallback search can be blocked by some sites; this previously ended in a generic "too many steps" failure with no explanation. The agent now finishes with an honest, synthesized answer using what it did find, and the user is now told explicitly when a missing search API key was the reason results were limited.
  - A genuinely honest "I looked and couldn't find reliable information on this" answer — exactly what the agent is supposed to say for an obscure or nonexistent subject — was being rejected by the same safeguard meant to require a citation, forcing the agent to keep grasping for an unrelated source just to satisfy the rule, sometimes for many extra minutes with no better outcome.
  - Fetching a large structured data source (e.g. a full version-history API) could return so much raw, unfiltered data that the agent's next response generation failed outright, leaving nothing but a raw data dump instead of an actual answer. Large structured responses are now trimmed to their most relevant (newest) portion before being handed to the model.
  - A tool call written in a slightly different but still recognizable format could be silently dropped with no result and no error at all ("(no response)"). This alternate format is now recognized and executed normally instead of discarded.
  - The safeguard requiring a cited source for research answers only recognized the request as "research" in Turkish — an equivalent English research/citation request wasn't covered at all, so an uncited answer could pass through silently. Now recognized in both languages.
- **Six newly-added tools (Notes, Reminders, background removal, and the three Office-document tools) were completely unreachable for any simple, single-step request** — the overwhelming majority of real usage. They were correctly registered but never added to the internal category→tool-visibility mapping the model actually reads from for simple requests, so asking to "create a note" would silently fall back to writing a plain text file instead. Found via a full live GUI test pass; fixed by adding all six to their correct categories and adding deterministic routing keywords so the request classifier recognizes them reliably instead of guessing.
- **A tool-use chain could silently stop one step short of completion.** After successfully reading a file, the model could describe its next intended step ("...then I'll use patch_file to update it...") without ever actually calling it, and the task would end there with no error. The safety check that catches this ("you described a plan instead of acting") only ever looked at the very first step of a task — extended to catch a stated-but-never-executed next step at any point in the chain.
- **A research question could still return a specific version number or a source URL that was never actually confirmed by any search/fetch result**, despite dedicated safety checks existing for exactly this. Root cause was two separate gaps: the version-number check's own pattern didn't match Turkish grammatical suffixes ("sürümü", "sürümünün" — it only matched the bare, unsuffixed word), so it silently never fired for Turkish questions; and the URL-citation check only activated when the answer explicitly used the word "source:"/"kaynak:", missing a fabricated link embedded directly in a sentence. Both fixed, and the URL check now also checks across the whole conversation, not just the single most recent step.
- **A "write me a report" request could be marked done after the agent merely listed some files, without ever writing an actual report.** Added a check that blocks finishing a report-creation request until a real report has actually been produced.
- **"Remember this" / "bunu hatırla" requests could silently do nothing while still telling you it was saved.** A recent internal reorganization routed memory-save requests through the plain-conversation code path, which structurally never calls any tool — the agent would just reply "saved it!" without ever actually writing anything to memory. Moved to a dedicated path that genuinely executes the save.
- **The agent could occasionally refuse a safe, explicitly-requested file/shell operation on its own — reasoning about restrictions itself — instead of attempting it and reporting what actually happened.** This showed up as unnecessary "does this file exist? should I create it?" clarifying questions even right after the agent had already learned the answer, and as declining a delete/move request without ever checking whether it was actually allowed. The agent now always attempts the operation and relays the tool's real, authoritative outcome rather than second-guessing.
- **A permanent, non-recoverable restriction (e.g. a sandbox-denied path) could get treated the same as a temporary glitch**, triggering an internal "give up retrying, ask the user instead" escalation after just two attempts — which, combined with a separate bug (an internal "was this tool already tried?" record not updating on failure), could loop the agent through the same failed attempt repeatedly. Both fixed; genuinely permanent restrictions are now reported honestly on the first attempt instead of retried.
- **A generic auto-suggested fix for a failed shell command could actively make things worse for paths starting with `~`** — recommending single-quotes around a path, which disables the shell's home-directory expansion, silently redirecting the operation to an unrelated location while the agent still reported success. Added a dedicated, correct suggestion for this specific case (and for genuine sandbox denials, an instruction to report the restriction honestly instead of retrying).
- **A calculation could be silently skipped in a multi-step task** — e.g. after computing a value from a command's output, a follow-up "multiply this by 10" step could get done mentally instead of through the calculator tool. The calculator is now always used for every arithmetic step, not just the first one.
- **The browser-automation tool (Playwright-based) could be called with a wrong action name** ("navigate" instead of the correct "browser_navigate", a mix-up with the separate Safari-automation tool), and a successful multi-step browser session could get cut off one step before it could report its result back, due to a turn-budget accounting gap for chains that need several exploratory steps. Both fixed.
- **A tool that failed three times in a row was disabled for the rest of the app session with no way to recover** — even from a one-time, transient failure (e.g. a slow cold-start under heavy system load). It's now automatically given a fresh chance after a short cooldown instead of staying disabled indefinitely.
- **Stripe integration could fabricate a login/OAuth requirement that doesn't exist**, and separately stopped working correctly after Stripe changed its own server's available actions upstream. Added an explicit statement that no login step is ever needed (a saved key already authenticates every call), and updated the integration to use Stripe's current action set.
- **Sending an email could get blocked by an unnecessary clarifying question about the message body** even when only the recipient was actually required. The agent now sends with a reasonable default body instead of stopping to ask.
- **A markdown-list request could come back as plain prose despite the agent finding correct information** — now force-corrected into an actual list instead of accepted as-is.
- **AppleScript-based tools (Calendar and others) could report an unhelpful generic error ("error 0") instead of the real underlying reason** (e.g. a genuine permissions problem), because of a bridging gap that discarded the tool's own detailed diagnostic message. The real reason is now preserved and shown.
- **The Git integration (MCP-based) could fail to start after an upstream dependency update introduced an incompatibility.** Pinned to a known-compatible version.
- **The last batch of usage telemetry could be lost if the app was quit at just the wrong moment** — the quit-time flush wasn't actually waiting for that final upload to finish before the process exited. Now properly awaited.
- **Adding a Calendar event could silently save it with a completely wrong date** (e.g. a "tomorrow" request landing thousands of years in the future), while still reporting the requested date back as if it had worked. The date was being handed to Calendar as a raw text string in a format its own date parser doesn't reliably understand; it's now built from explicit year/month/day/time values instead, and the confirmation message now reports the date actually saved rather than just echoing back what was asked for.
- **A file/folder operation could be wrongly rejected as "outside the allowed locations" when the target was the allowed location itself** (e.g. `/tmp` exactly, with nothing after it) — the check required something to follow it. Separately (and in the opposite direction), a similarly-shaped check could be tricked by two folders that merely share a name prefix, e.g. treating "Documents" and an unrelated "DocumentsBackup" as the same allowed place. Both fixed. While fixing this, added an explicit safeguard for a related edge case it exposed: deleting the shared system temp folder itself (as opposed to a file inside it) is now refused with a clear explanation, since that folder is used by every other running app, not just this one.
- **Moving or copying a file into an existing folder could fail with a confusing "an item with the same name already exists" error** instead of just moving it in, the way Finder or a terminal `mv` would. Fixed to match that familiar behavior: if the destination is already a folder, the file now moves/copies into it instead of trying to replace the folder itself.
- **A report-writing task could time out and get marked as failed even though the agent was still making genuine progress**, particularly for requests that need to gather several pieces of information first (file listings, git history, system status) before writing the summary — the per-step time budget was tuned for a faster response speed than this app reliably achieves under real-world system load. That budget has been doubled, comfortably covering the slower, more realistic case.
- **A "files changed in the last N minutes/hours" request could send the agent reaching for the wrong tool** (one meant for editing file contents, which cannot report a file's timestamp at all) and stall instead of completing. Clarified which tool actually provides file timestamps.
- **The same request could also waste its remaining steps double- and triple-checking an already-correct "nothing found" result** instead of trusting it and answering — occasionally running out of steps right as it was about to give the final answer. The agent now treats an empty result from a timestamp/search command as a complete, trustworthy answer on the first try.
- **A summary of file or command output could occasionally invent specific-sounding details (file names, dates) that were never actually retrieved, and cite a real-sounding source for them that was never actually used** — the same class of fabrication the research-citation safeguards already caught for made-up web sources, now extended to also catch a made-up tool/data source in any answer.
- **After the agent corrected a mistake it had just made in a file, it could get blocked from reading the file back to confirm the fix worked** — an internal safeguard treated that follow-up read as a pointless repeat of the very first read at the start of the task and refused it twice in a row, so the agent gave up with a blank final answer instead of reporting whether the correction actually succeeded. A read-only check like this is always safe to repeat and is often exactly when it's needed most.
- **A clarifying question from the agent could occasionally vanish entirely, ending the task with a silent blank reply** — caused by a small formatting slip in how the question was generated. Now detected and corrected automatically instead of failing silently.
- **When a connected service (e.g. Perplexity) wasn't set up, the agent could repeatedly try substituting other tools or even invent a plausible-sounding fake result** instead of just saying the connection was missing — including, in one case, replaying an earlier fabricated result back as if it were a genuine memory. The agent now recognizes this specific situation up front and states plainly that the connection needs to be set up, with no substitution attempts.
- **Asking the agent to open a specific webpage directly in the browser could get silently misrouted into an unrelated conversational reply**, and even when it did work, a follow-up summary of the page could get wrongly flagged as an invented citation. Both fixed.
- **A citable source URL wrapped in backtick code-formatting in the agent's own reply could be mistaken for a fabricated citation** (the surrounding backtick character wasn't being stripped before comparison), sending the agent into a repeating retry loop instead of finishing normally.
- **Analyzing a full-length song could time out and fail** — the time allowed was tuned for short clips, not real several-minute-long tracks. Extended to comfortably cover a full song.
- **A request that combined "look something up" with "also check system status" could throw away the useful lookup result entirely and return only the system-status summary**, because a shortcut meant for simple single-fact answers didn't realize a more substantial result had already been gathered first. It now only takes that shortcut when nothing else of substance happened first.
- **The app could refuse an ordinary request with a "system overloaded" message on a perfectly healthy Mac** — the check was reading macOS's normal, expected RAM usage pattern (which sits high even when nothing is wrong, since the OS deliberately fills spare memory with reclaimable cache) as if it were a real crisis. Switched to reading the same genuine pressure signal macOS itself uses, with the old check kept only as a rare backstop.

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

