# PheronAgent — Full Tool Inventory & Capability Reference (72 Tools)
**Last updated:** 2026-08-27
**Verification method:** Verified against `Tests/PheronAgentTests/RouterHealth/UBIDCoverageTests.swift` — `ToolUBID.allCases` currently has **72** cases, matched 1:1 against the tool registry by a live test suite (`testEveryRegisteredToolHasAToolUBIDCase`, `testEveryToolUBIDCaseHasARegisteredImplementation`, `testNoDuplicateUBIDsAmongKnownTools`). 1 tool added since 2026-08-19: `hook_manage` (124, tool-call-triggered hooks).

This document details the capabilities of ALL 72 PheronAgent tools across 3 distinct architectures:
1. **Native/built-in** (51 tools) — written directly in Swift, calling system APIs such as AppleScript, Core Audio, WeatherKit, and Vision. `subagent_spawn` belongs to this category but is registered separately via dependency injection.
2. **Official MCP protocol** (17 tools) — JSON-RPC 2.0, the official `initialize`/`tools/list`/`tools/call` lifecycle.
3. **Direct REST API / custom process bridge** (4 tools) — Higgsfield, LemonSqueezy, Kit (REST), and Blender (process spawn) — none of these are MCP.

---

## 1. Communication (4 tools)

### `whatsapp_send` (UBID 17) — Legacy WhatsApp Sender
Automates WhatsApp via AppleScript/System Events (types the recipient into the search box, writes and sends the message). **Parameters:** `recipient` (phone/name), `message` (text). Requests Touch ID/password approval on every send when biometric security is enabled.

### `send_message_via_whatsapp_or_imessage` (UBID 37) — Unified Messaging
Sends a message over WhatsApp or iMessage. **Parameters:** `platform` ("whatsapp" or "imessage"), `recipient` (phone with country code for WhatsApp, Apple ID/email for iMessage), `message`.

### `send_email` (UBID 22) — Legacy Apple Mail Sender
Sends email via Apple Mail. **Parameters:** `recipient`, `subject`, `body`. Requests biometric approval when enabled.

### `apple_mail` (UBID 55) — Apple Mail Management
3 actions: `list_unread` (lists unread messages in the inbox), `create_draft` (creates a draft, **parameters:** `subject`, `recipient`, `body`), `send_email` (sends directly, same parameters).

---

## 2. Media & Audio (4 tools)

### `media_control` (UBID 43) — Apple Music / System Audio Control
5 actions: `play`, `pause`, `next`, `volume` (**parameter:** `level` 0-100), `play_content` (**parameters:** `searchTerm`, optional `contentType`: "track" or "playlist" — tries playlist first, falls back to track; returns `PLAYLIST_FOUND`/`PLAYLIST_NOT_FOUND`/`NOT_FOUND`).

### `music_dna` (UBID 18) — Professional Audio Analysis (v8.2.1)
**Certified measurements:** EBU R128 loudness, THD+N, SNR, stereo analysis, forensic bit-depth detection.
**Statistical estimates:** tempo, key, time signature, instrument detection, musicology.
**Forensic audit:** effective bit-depth entropy, codec cutoff frequency, clipping events, upsampling detection.
**Musicological:** root note, chord analysis, modulations, counterpoint types.
**Output:** writes a full binary `.plist` (AudioReport) next to the source file. **Parameters:** `path` (required), `depth` (optional: "forensic"/"musicology"/"comprehensive", default "summary").

### `id3_processor` (UBID 85) — Recursive ID3 Tagger
Embeds ALL metadata from JSON/TXT, supports manual overrides for any ID3 tag. **Parameters:** `directory`, optional `custom_tags` (dictionary, e.g. `{"TPE1": "Artist", "TALB": "Album"}`).

### `audacity_control` (UBID 111) — Control a Running Audacity Instance
Controls a running Audacity instance via Audacity's official `mod-script-pipe` scripting protocol — import/export, editing, general-purpose passthrough to 250+ effects/commands. **Parameters:** `action` (an Audacity command name, or `"help"` for a categorized command reference), optional `params` (a command-specific key-value dictionary). Requires Audacity to be running and `mod-script-pipe` to have been enabled once in Preferences. **Known limitation:** an Audacity-side bug — calling `Export2` with a `.wav` extension actually writes the file in AIFF format (GitHub issue audacity/audacity#6868, open, no workaround); `.flac`/`.mp3` are unaffected.

---

## 3. Web & Browser (5 tools)

### `web_search` (UBID 45) — Google/Brave Live Search
Searches for real-time information, news, or technical data. **Parameter:** `query` (should be specific).

### `web_fetch` (UBID 46) — URL Content Extraction
Extracts the full text content of a given public URL. **Parameter:** `url`.

### `safari_automation` (UBID 40) — Native Safari Automation
5 actions: `search` (searches Google, waits for the page, scrapes results directly — no separate scrape step needed), `scrape`, `read` (extracts text from a URL — tries URLSession first, falls back to Safari), `open`, `close`. **Parameters:** `action`, `query`, `url`. Marked as required to use ahead of the shell `open` command for all web tasks.

### `browser_native` (UBID 170) — Interactive Native Safari Controller
6 actions: `navigate`, `read`, `fill`, `list_tabs`, `switch_tab`, `inspect_ax` (accessibility-tree inspection). Provides high-precision control for navigating pages, reading content, and filling forms.

### `research_report` (UBID 20) — Strategic Report Finalization
Finalizes a research task by converting it into a premium, UI-compatible Markdown section. **Parameter:** `report_markdown`. Marked as required for finishing strategic research tasks.

---

## 4. System & Device Control (9 tools)

### `set_volume` (UBID 56) — System Volume
Sets output volume (0-100) via native Core Audio. **Parameter:** `level` (int).

### `set_brightness` (UBID 57) — Screen Brightness
Sets brightness between 0.0-1.0. **Parameter:** `level` (float). If the `brightness` CLI (Homebrew, not bundled with macOS) is not installed, returns a clear `[BRIGHTNESS_UNAVAILABLE]` error — it does NOT silently claim success, and is explicitly instructed never to retry via an alternative command.

### `system_sleep` (UBID 15) — Sleep Mode
Puts the system to sleep immediately (native AppleScript, preferred over shell commands).

### `get_system_info` (UBID 58) — Hardware/OS Telemetry
Returns OS version, CPU core count, and RAM (GB) via native Swift APIs.

### `get_system_telemetry` (UBID 36) — Real-Time Hardware State
Thermal state, RAM pressure, CPU core activity, OS version. Takes no parameters — marked as required for any CPU/RAM/memory/thermal/performance query.

### `learn_application_ui` (UBID 35) — Application Discovery/Learning
2 modes: (1) no parameter → lists all running applications (NSWorkspace). (2) `application_name` given → scans that app's AXUIElement UI tree and saves its controls to ExperienceVault (the `app_uimaps` table, a learning engine).

### `discover_shortcuts` (UBID 50) — macOS Shortcuts Listing
Lists all Shortcuts installed on the system. **Parameter:** `force_refresh` (bool). Explicitly instructed not to be used unless the user has explicitly said "shortcut."

### `run_shortcut` (UBID 49) — Run a Shortcut
Runs a specific macOS Shortcut with given parameters. **Parameters:** `name` (required), `input_text` (optional).

### `app_launcher` (UBID 88) — Native Application Launch
Launches any macOS application by name or bundle ID. **Parameter:** `app_name`. Marked as required over the shell `open -a` command for sandbox security.

---

## 5. Productivity & Files (7 tools)

### `contacts_find` (UBID 38) — Apple Contacts Search
Finds contact info (including email) by name. **Parameter:** `query`.

### `apple_calendar` (UBID 54) — Calendar Management
2 actions: `list_events` (lists today's events), `add_event` (**parameters:** `summary` required, `start` ISO date string required, optional `end`/`end_date` — defaults to start+1 hour if omitted). Explicitly requires `system_date` to be called first to resolve today's date for relative dates ("tomorrow"). Events are created on a dedicated local "Pheron Events" calendar (to work around iCloud calendars returning read-only via AppleScript).

### `file_manager_action` (UBID 39) — File Operations
7 actions: `scan_large` (finds files larger than `min_size_mb` in a directory, default 10MB), `list`, `create` (with optional content), `mkdir`, `delete`, `move` (**parameter:** `destination`), `copy` (**parameter:** `destination`).

### `read_file` (UBID 33) — File Reading
Reads .txt, .pdf, .docx, .swift, .md, .json, .plist. **Parameter:** `path` (supports `~` and relative paths). Required over the shell `cat` for efficiency.

### `write_file` (UBID 34) — File Writing
Atomic, safe file writing/overwriting. **Parameters:** `path`, `content`, optional `force` (bool — for overwriting binary/zero-byte files). Required over shell redirection (`echo >`).

### `notes_action` (UBID 105) — Apple Notes Management
4 actions: `create` (**parameters:** `title`, `body`, optional `folder` — files into an existing or new folder, auto-created if it doesn't exist, live-verified 2026-07-27), `list` (lists titles of the most recent notes, optional `limit`, default 10), `search` (**parameter:** `query` — finds notes whose title matches), `read` (**parameter:** `title` — returns the full body of the matching note). **Known limit:** checklists are not supported (not exposed at all in Notes' AppleScript API).

### `reminders_action` (UBID 106) — Apple Reminders Management
3 actions: `create` (**parameter:** `title` required, optional `list` — a specific list name, defaults to the default list if omitted, optional `due_date` ISO8601, optional `priority` — "high"/"medium"/"low" or a raw 0-9 integer matching Reminders' own scale: 0=none/1-4=high/5=medium/6-9=low, live-verified 2026-07-27), `list` (lists titles of incomplete reminders, optionally scoped to one list), `complete` (**parameter:** `title` — marks the matching reminder complete). **Known limit:** location-based reminders are not supported (Reminders' AppleScript API only exposes a date trigger).

---

## 6. General Utilities (4 tools)

### `calculator_op` (UBID 80) — High-Precision Math
**Parameter:** `expression`. Supports: `+ - * / ^(power) sqrt() abs() floor() ceil()`. Security: only expressions matching an allowed character set are passed to NSExpression; arbitrary function calls are rejected.

### `get_weather` (UBID 81) — Real-Time Weather
Uses WeatherKit (macOS 13+), falls back to the `wttr.in` JSON API on failure. **Parameters:** `location`, optional `day` (including relative expressions like "tomorrow"). Returns: condition, temperature (high/low/feels-like), humidity, wind (+gust), pressure, visibility, UV index, precipitation probability, sunrise/sunset.

### `system_date` (UBID 82) — System Clock
Returns the current system date/time. Used by other tools (e.g. `apple_calendar`) as a pre-step for resolving relative date expressions.

### `set_timer` (UBID 83) — Timer/Reminder
**Parameters:** `seconds`, `message`. Runs on native async `Task.sleep` (does not use DispatchQueue/Timer).

---

## 7. Development & Code (4 tools)

### `shell_exec` (UBID 32) — Terminal Commands
Marked as the ONE AND ONLY terminal tool for all shell/zsh commands. **Parameter:** `command`.

### `patch_file` (UBID 41) — Atomic Code Patch
Patches an existing file by matching `old_content` EXACTLY and replacing it with `new_content`. Explicitly forbids using sed/awk.

### `git_action` (UBID 42) — Local Git Operations (Simple)
5 actions: `log` (**optional parameter:** `count`, default 10), `status`, `diff` (unstaged), `commit` (**parameter:** `message`), `revert` (**parameter:** `hash`). Repo directory can be set via optional `path`. *(Note: this is a DIFFERENT tool from `git_tool` (MCP, UBID 96) — `git_action` is simple/local, `git_tool` talks to Anthropic's official MCP server and exposes 12 actions.)*

### `xcode_engine` (UBID 47) — Autonomous Xcode/SPM Management
3 actions: `project_map` (lists the file/project hierarchy), `build_and_fix` (builds, provides detailed error analysis — **parameters:** `path`, `target`, `destination`), `simulator_control` (starts/lists simulators — **parameters:** `sub_action` "boot"/"list", `device_id`).

---

## 8. Visual Analysis & Memory (6 tools)

### `analyze_image` (UBID 48) — Native OS Vision
Analyzes a local image file with VisionAnalyzer — for text (OCR) and likely interactive elements.

### `semantic_vision` (UBID 84) — Deep Semantic Visual Understanding
Runs an on-device Vision Language Model (VLM). Unlike `analyze_image`, it understands visual CONTENT: scenes, diagrams, UI layouts, charts, objects, contextual text. **Parameters:** `path` (required), `question` (optional, default: "Describe this image in detail."). Only active on Macs with 24GB+ unified memory; returns a clear fallback message on 16GB devices.

### `memory` (UBID 44) — PheronAgent's Own Long-Term Memory
2 actions: `search` (**parameter:** `query` — finds specific solutions from past months/tasks), `save` (**parameters:** `task`, `solution` — saves critical information for the future). *(Note: this is DIFFERENT from `memory_tool` (MCP, UBID 97) — `memory` is PheronAgent's own ExperienceVault, `memory_tool` is Anthropic's official MCP Knowledge-Graph server, a separate on-disk graph.)*

### `visual_audit` (UBID 30) — Chicago Vision
Analyzes screenshots/images frame-by-frame for UI elements, logic, and visual data. Performs a proactive permission check since ScreenCaptureKit requires Screen Recording permission.

### `apple_accessibility` (UBID 24) — Direct AXUIElement Interaction
Interacts with applications via the macOS Accessibility API. **Parameters:** `target_app` (name/bundle ID), optional `click` (the name of the UI element to click).

### `remove_background` (UBID 107) — Background Removal
Detects the foreground subject(s) in a local image and saves a new PNG with a transparent background. **Parameters:** `path` (source image), optional `output_path` (defaults to the source filename with "_nobg.png" appended, saved into the Workspace).

---

## 9. Self-Improvement (2 tools)

### `subagent_spawn` (UBID 19) — Recursive Sub-Task Launch
Launches a sub-agent (its own OrchestratorRuntime) to manage a specific sub-task. **Parameter:** `prompt`.

### `skill_patch` (UBID 86) — Procedural Skill Management
Manages persistent, evolving skills across tasks. 4 actions: `create` (**parameters:** `name` snake_case, `content` markdown how-to, `trigger` when to use it), `patch` (updates an existing skill — `name`, `content`), `search` (**parameter:** `query`, natural language), `list` (lists all active skills).

---

## 10. 3D & Media Generation (2 tools — not MCP/REST)

### `blender_3d` (UBID 60) — Custom Process Bridge
**Architecture:** not MCP/REST — generates a Python (`bpy`) script per action and runs it headlessly via `blender --background --python script.py`. **29+ actions** (modeling, material/UV, modifiers, constraints, animation, scene/render, file I/O) + `execute_script` (free-form bpy Python, sandboxed only) + 2 info actions (`get_recipe`, `get_api_info`).

### `higgsfield_generate` (UBID 87) — Higgsfield REST API
**Architecture:** direct REST API, not MCP. A single generic tool (`model` + `arguments`), async queue+polling. 6 models fully verified (Soul, Seedream, DoP, Kling, Seedance).

---

## 11. Office Documents (3 tools)
Creates a real document in the relevant iWork app via AppleScript and exports it to the Microsoft format — Numbers/Keynote/Pages must be installed. All three clean up after themselves with a before/after file-listing diff, to prevent `make new document` from leaving behind an empty, auto-saved "Untitled" file in iCloud Drive.

### `numbers_office` (UBID 108) — Create an Excel Spreadsheet
Builds a Numbers table from row/column data and exports it to `.xlsx`. **Parameters:** `rows` (required — each inner array is a row; string or number cell values; formula strings like `"=A1+B1"` are evaluated as real formulas by Numbers, verified live via osascript), `output_path` (required, must end in `.xlsx`), optional `cell_styles` (`[{row, col, text_color:[r,g,b], background_color:[r,g,b]}]`, RGB 0-255). **Known limit:** chart CREATION is not supported (the `chart` class is read-only in Numbers' scripting dictionary; bold text also hits a live-verified `-1723 Access not allowed` API limit).

### `keynote_office` (UBID 109) — Create a PowerPoint Presentation
Builds a Keynote presentation and exports it to `.pptx`. **Parameters:** `slides` (required — an array of objects each with "title" and "body" text, optional per-slide `image_path` and `transition` {`effect`, `duration`}), `output_path` (required, must end in `.pptx`), optional top-level `theme` (a Keynote theme name). Fully verified live.

### `pages_office` (UBID 110) — Create a Word Document
Builds a Pages document and exports it to `.docx`. **Parameters:** `blocks` (required — an array of objects each with a "type" of "heading"/"paragraph"/"table"/"image"; heading uses real font/size paragraph formatting — bold is simulated via a bold font name since there's no real bold boolean in the API; table takes a `rows` sub-field; image takes a `path` sub-field), `output_path` (required, must end in `.docx`). Fully verified live.

---

## 12. MCP Server Bridges — Official Protocol (9 tools)

| Tool | UBID | Verification status | What it does |
|---|---|---|---|
| `git_tool` | 96 | ✅ Fully verified | Anthropic's official Git MCP server — 12 actions (status/diff/commit/branch/log/show) |
| `memory_tool` | 97 | ✅ Fully verified | Anthropic's official Memory/Knowledge-Graph MCP server — 9 actions (entity/relation/observation CRUD) |
| `browser_tool` | 98 | ✅ Fully verified | Microsoft's official Playwright MCP server — 22 actions (real browser automation) |
| `perplexity_tool` | 99 | ✅ Fully verified | Perplexity's official MCP server — 4 actions (search/ask/research/reason) |
| `stripe_tool` | 100 | ✅ Fully verified (real account) | Stripe's official local MCP server — 11 actions (account/customer/payment/refund) |
| `github_tool` | 101 | ⚠️ Not yet live-tested (no Docker) | GitHub's official MCP server — ~70 actions across 20 categories (Issues/PR/Actions/Security/etc.) |
| `zapier_tool` | 102 | ⚠️ Not yet live-tested | Zapier's official MCP server — 9,000+ apps, dynamic/user-defined action list |
| `notion_tool` | 103 | ✅ Fully verified (OAuth 2.0 + Dynamic Client Registration) | Notion's official hosted MCP server — 17 actions (pages/database/comments/team) |
| `unreal_engine_tool` | 104 | ⚠️ Not yet live-tested (no UE installed) | Epic Games' official, editor-embedded MCP server (EXPERIMENTAL, UE 5.8+) — Scene/Actor/MaterialInstance/Object/GAS-Attribute toolsets, no auth required (localhost-only) |

---

## 13. Business App Integrations (added 2026-08-07/08, 3 tools)

| Tool | UBID | Architecture | Verification status | What it does |
|---|---|---|---|---|
| `lark_tool` | 112 | Official MCP (Lark/Feishu official OpenAPI server) | ✅ Live-verified (2 actions removed — not present on the server) | Lark messaging, chat management, calendar events, Base records |
| `lemonsqueezy_tool` | 113 | Direct REST API, not MCP | ✅ Live-verified | LemonSqueezy store management — orders, customers, subscriptions, discounts, license keys |
| `kit_tool` | 114 | Direct REST API (Kit V4, formerly ConvertKit), not MCP | ✅ Live-verified | Kit email marketing — subscribers, broadcasts, sequences, tags, forms |

---

## 14. MCP Bridges & Native Tools Added 2026-08-16/17/19 (9 tools)

| Tool | UBID | Verification status | What it does |
|---|---|---|---|
| `linear_tool` | 115 | ✅ Live-verified (a real issue moved to "In Progress") | Linear issue/project/cycle read-write |
| `jira_tool` | 116 | ✅ Live-verified (a real issue, KAN-1, moved to "In Progress") | Jira/Confluence/Bitbucket/Compass issue and project read-write |
| `slack_tool` | 117 | ✅ Live-verified (full OAuth cycle, real channel data retrieved) | Slack message read/send, channel/history search |
| `figma_tool` | 118 | ⚠️ Not yet live-tested | Figma file/design data reading (Dev Mode MCP) |
| `sentry_tool` | 119 | ⚠️ Not yet live-tested | Sentry issue/error/project data reading (debugging) |
| `postgres_tool` | 120 | ✅ Live-verified (a real SELECT query against a test table returned the correct result) | Read-only SQL queries against PostgreSQL (restricted mode — no writes) |
| `huggingface_tool` | 121 | ✅ Live-verified (real token; `hf_whoami`/`hub_repo_search`/`hub_repo_details`/`hf_fs` all returned data) | Hugging Face Hub model/dataset/Space/paper/doc search |
| `skill_catalog` | 122 | Code + tests complete (5 tests) | Lists/inspects/reactivates learned skills from SkillVault |
| `automation_manage` | 123 | Code + tests complete (9 tests) | Create/list/enable-disable/delete time-based automations via natural language |

## 15. Added 2026-08-27 (1 tool)

| Tool | UBID | Verification status | What it does |
|---|---|---|---|
| `hook_manage` | 124 | Code + tests complete (17 tests) | Create/list/enable-disable/delete hooks that fire a new task automatically whenever a specific tool call succeeds (e.g. "after every write_file, run prettier") — same CRUD shape as `automation_manage`, but triggered by a tool call instead of a time schedule |

---

## Total: 72 tools
- **51 native/built-in tools** (written directly in Swift; includes `subagent_spawn`, which is registered separately/conditionally)
- **21 MCP/REST/bridge tools** (connecting to external services: 17 official MCP-protocol tools + 3 REST API tools [Higgsfield, LemonSqueezy, Kit] + 1 custom process bridge [Blender])
