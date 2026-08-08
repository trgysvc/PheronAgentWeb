# PheronAgent — Full Tool Inventory & Capability Reference (62 Tools)
**Last updated:** 2026-08-08  
**Verification method:** Verified against `UBIDCoverageTests.swift` (`allKnownTools` array + `dependencyInjectedToolUBIDs` (`memory`, `subagent_spawn`) = **62 total**). 3 newly added tools since 2026-07-27: `lark_tool` (112, official Lark/Feishu MCP), `lemonsqueezy_tool` (113, direct REST — no official MCP exists), `kit_tool` (114, direct REST — official MCP exists but needs OAuth dynamic client registration not yet supported).

This document details the capabilities of ALL 62 PheronAgent tools across 3 distinct architectures:
1. **Native System Tools** (48 tools) — Built directly in Swift using Apple APIs (Core Audio, WeatherKit, Vision, Accessibility, AppleScript, Vision framework, etc.).
2. **Model Context Protocol (MCP)** (10 tools) — Official JSON-RPC 2.0 servers (`initialize`, `tools/list`, `tools/call`).
3. **Direct REST API & Process Bridges** (4 tools) — Higgsfield, LemonSqueezy, Kit (REST) and Blender 3D (headless process spawn).

---

## 1. Communication (4 tools)

### `whatsapp_send` (UBID 17) — Legacy WhatsApp Sender
Automates WhatsApp via AppleScript/System Events. **Parameters:** `recipient`, `message`. Requests Touch ID/password approval when biometric security is enabled.

### `send_message_via_whatsapp_or_imessage` (UBID 37) — Unified Messaging
Dispatches messages over iMessage or WhatsApp based on platform target. **Parameters:** `platform` ("whatsapp" or "imessage"), `recipient`, `message`.

### `send_email` (UBID 22) — Legacy Mail Sender
Dispatches emails via Apple Mail. **Parameters:** `recipient`, `subject`, `body`.

### `apple_mail` (UBID 55) — Apple Mail Management
3 actions: `list_unread`, `create_draft` (**parameters:** `subject`, `recipient`, `body`), `send_email`.

---

## 2. Media & Audio (4 tools)

### `media_control` (UBID 43) — System Audio & Music Control
5 actions: `play`, `pause`, `next`, `volume` (**parameter:** `level` 0-100), `play_content` (**parameters:** `searchTerm`, optional `contentType`: "track" or "playlist").

### `music_dna` (UBID 18) — Professional Acoustic Analysis
Certified forensic audio analysis: EBU R128 loudness, THD+N, SNR, stereo entropy, key/tempo estimation, and bit-depth analysis. Writes binary `.plist` (AudioReport) alongside source file. **Parameters:** `path`, `depth`.

### `id3_processor` (UBID 85) — Recursive ID3 Tagger
Embeds metadata from JSON/TXT into MP3/audio files with custom tag overrides. **Parameters:** `directory`, optional `custom_tags`.

### `audacity_control` (UBID 111) — Audacity Application Control
Controls a running Audacity instance via official `mod-script-pipe` scripting protocol: import/export audio, edit, apply 40+ effects. **Parameters:** `action` (Audacity command name or `"help"` for categorized reference), optional `params` dictionary. Requires Audacity running with mod-script-pipe enabled once in Preferences.

---

## 3. Web & Search (5 tools)

### `web_search` (UBID 45) — Real-Time Search
Searches live web results using Brave & Google APIs. **Parameter:** `query`.

### `web_fetch` (UBID 46) — Web Content Extractor
Retrieves full-text HTTP document content and converts to clean Markdown. **Parameter:** `url`.

### `safari_automation` (UBID 40) — Native Safari Automation
5 actions: `search` (Google search with automatic DOM scrape), `scrape`, `read`, `open`, `close`. **Parameters:** `action`, `query`, `url`.

### `browser_native` (UBID 170) — Interactive Safari Controller
6 actions: `navigate`, `read`, `fill`, `list_tabs`, `switch_tab`, `inspect_ax`. High-fidelity form filling and navigation.

### `research_report` (UBID 20) — Strategic Research Finalizer
Finalizes strategic research tasks into publication-grade Markdown sections. **Parameter:** `report_markdown`.

---

## 4. System & Device Control (9 tools)

### `set_volume` (UBID 56) — Output Volume
Native Core Audio volume controller (0-100). **Parameter:** `level`.

### `set_brightness` (UBID 57) — Display Brightness
Display brightness controller (0.0–1.0 fraction). **Parameter:** `level`. Returns clear error if `brightness` CLI is uninstalled.

### `system_sleep` (UBID 15) — Sleep Control
Triggers system sleep or lock status via native AppleScript.

### `get_system_info` (UBID 58) — Hardware Specs
Retrieves OS version, CPU core count, and system RAM specs.

### `get_system_telemetry` (UBID 36) — Real-Time Telemetry
Monitors thermal pressure, RAM pressure, CPU core activity, disk space, and OS version.

### `learn_application_ui` (UBID 35) — App UI Discovery
Maps open application AXUIElement control trees into ExperienceVault (`app_uimaps`).

### `discover_shortcuts` (UBID 50) — macOS Shortcuts Discovery
Lists all installed Siri Shortcuts on the macOS host system. **Parameter:** `force_refresh`.

### `run_shortcut` (UBID 49) — Shortcut Execution
Runs a specific macOS Shortcut with text arguments. **Parameters:** `name`, `input_text`.

### `app_launcher` (UBID 88) — Native App Launcher
Launches macOS applications safely by name or bundle ID. **Parameter:** `app_name`.

---

## 5. Productivity & File Management (7 tools)

### `contacts_find` (UBID 38) — Apple Contacts Search
Queries local Contacts database by name. **Parameter:** `query`.

### `apple_calendar` (UBID 54) — EventKit Calendar Management
2 actions: `list_events`, `add_event` (**parameters:** `summary`, `start`, optional `end`). Events are created in a dedicated "Pheron Events" local calendar.

### `file_manager_action` (UBID 39) — File Operations
7 actions: `scan_large`, `list`, `create`, `mkdir`, `delete`, `move`, `copy`.

### `read_file` (UBID 33) — File Reader
Reads .txt, .pdf, .docx, .swift, .md, .json, .plist documents with relative path support. **Parameter:** `path`.

### `write_file` (UBID 34) — File Writer
Atomic and safe file writing/overwriting with directory creation. **Parameters:** `path`, `content`, optional `force`.

### `notes_action` (UBID 105) — Apple Notes Management
4 actions: `create` (**parameters:** `title`, `body`), `list` (optional `limit`), `search` (**parameter:** `query`), `read` (**parameter:** `title`).

### `reminders_action` (UBID 106) — Apple Reminders Management
3 actions: `create` (**parameter:** `title`, optional `list`, `due_date`), `list` (optional `list` filter), `complete` (**parameter:** `title`).

---

## 6. General Utilities (4 tools)

### `calculator_op` (UBID 80) — High-Precision Calculator
Evaluates math expressions safely. **Parameter:** `expression` (`+ - * / ^ sqrt() abs() floor() ceil()`).

### `get_weather` (UBID 81) — Real-Time Weather
Fetches conditions using WeatherKit (macOS 13+) with `wttr.in` fallback. **Parameters:** `location`, optional `day`.

### `system_date` (UBID 82) — System Clock
Returns current system date and time. Used as a pre-step for relative date resolution.

### `set_timer` (UBID 83) — Timer & Alarm
Native async timers and reminders. **Parameters:** `seconds`, `message`.

---

## 7. Development & Coding (4 tools)

### `shell_exec` (UBID 32) — Terminal Execution
Executes shell and zsh commands safely with sensitive path protection. **Parameter:** `command`.

### `patch_file` (UBID 41) — Code Patching
Line-by-line exact match diff patching. **Parameters:** `path`, `old_content`, `new_content`.

### `git_action` (UBID 42) — Basic Local Git
5 actions: `log`, `status`, `diff`, `commit`, `revert`. *(Note: distinct from `git_tool` MCP bridge).*

### `xcode_engine` (UBID 47) — Autonomous Xcode & SPM
3 actions: `project_map`, `build_and_fix`, `simulator_control`.

---

## 8. Vision & Memory (6 tools)

### `analyze_image` (UBID 48) — Native OS Vision
Analyzes image files using VisionAnalyzer for OCR and interactive UI elements.

### `semantic_vision` (UBID 84) — Deep Semantic Vision (VLM)
On-device Vision Language Model (VLM) for scene understanding, diagram parsing, and UI audit (24GB+ RAM Macs only). **Parameters:** `path`, optional `question`.

### `memory` (UBID 44) — Long-Term Memory Vault
2 actions: `search` (**parameter:** `query`), `save` (**parameters:** `task`, `solution`). Accesses ExperienceVault.

### `visual_audit` (UBID 30) — Screen & UI Auditor
Frame-by-frame UI layout and visual OCR auditing via ScreenCaptureKit.

### `apple_accessibility` (UBID 24) — AXUIElement Automation
Interacts directly with application UI controls via Accessibility APIs. **Parameters:** `target_app`, optional `click`.

### `remove_background` (UBID 107) — Image Background Removal
Detects foreground subjects in a local image using Vision framework and exports a transparent PNG. **Parameters:** `path`, optional `output_path`.

---

## 9. Self-Improvement (2 tools)

### `subagent_spawn` (UBID 19) — Child Agent Execution
Spawns a recursive sub-agent orchestrator runtime for sub-task delegation. **Parameter:** `prompt`.

### `skill_patch` (UBID 86) — Procedural Skill Vault
Manages procedural `.skill.md` rules across sessions. 4 actions: `create`, `patch`, `search`, `list`.

---

## 10. 3D & Media Generation (2 non-MCP tools)

### `blender_3d` (UBID 60) — Headless Blender Process Bridge
Executes Python (`bpy`) scripts headlessly via background processes. 29+ actions covering mesh creation, keyframe animations, camera rigs, modifiers, and GLTF exports.

### `higgsfield_generate` (UBID 87) — Higgsfield REST API
Direct REST API bridge for text-to-image and image-to-video generative AI models (Soul, Seedream, DoP, Kling, Seedance).

---

## 11. Office Documents (3 tools)

### `numbers_office` (UBID 108) — Excel Spreadsheet Creation
Builds structured table data in Apple Numbers via AppleScript and exports a genuine `.xlsx` file. **Parameters:** `rows` (nested array), `output_path` (`.xlsx`).

### `keynote_office` (UBID 109) — PowerPoint Presentation Creation
Builds slide presentations in Apple Keynote via AppleScript and exports a genuine `.pptx` file. **Parameters:** `slides` (array of title/body objects), `output_path` (`.pptx`).

### `pages_office` (UBID 110) — Word Document Creation
Builds formatted documents in Apple Pages via AppleScript and exports a genuine `.docx` file. **Parameters:** `blocks` (array of typed text objects), `output_path` (`.docx`).

---

## 12. Model Context Protocol (MCP) Server Bridges (10 tools)

| Tool Name | UBID | Status | Capability Summary |
|---|---|---|---|
| `git_tool` | 96 | ✅ Live-Verified | Official Git MCP server — 12 actions (`status`, `diff`, `commit`, `branch`, `log`, `show`) |
| `memory_tool` | 97 | ✅ Live-Verified | Official Knowledge-Graph MCP server — 9 actions (entity & relation CRUD) |
| `browser_tool` | 98 | ✅ Live-Verified | Microsoft Playwright MCP server — 22 actions (headless web automation) |
| `perplexity_tool` | 99 | ✅ Live-Verified | Official Perplexity MCP server — 4 actions (`search`, `ask`, `research`, `reason`) |
| `stripe_tool` | 100 | ✅ Live-Verified | Official Stripe local MCP server — 11 actions (accounts, customers, payments, refunds) |
| `github_tool` | 101 | ✅ Live-Verified | Official GitHub MCP server — ~70 actions across Issues, PRs, Actions, advisories |
| `zapier_tool` | 102 | ⚠️ Pending Setup | Official Zapier MCP server — 9000+ app integrations via dynamic actions |
| `notion_tool` | 103 | ⚠️ Pending Auth | Official Notion hosted MCP server — 17 actions (pages, databases, comments) |
| `unreal_engine_tool` | 104 | ⚠️ Experimental | Epic Games Unreal Engine 5.8+ editor-embedded MCP server |
| `lark_tool` | 112 | ✅ Live-Verified | Official Lark/Feishu OpenAPI MCP server — 27 actions (messaging, chats, calendar, Base, docs, tasks, wiki) |

---

## 13. Direct REST API Bridges — no official MCP server (2 tools)

| Tool Name | UBID | Status | Capability Summary |
|---|---|---|---|
| `lemonsqueezy_tool` | 113 | ✅ Live-Verified | LemonSqueezy REST API — orders, customers, subscriptions, discounts, license keys (bring-your-own key) |
| `kit_tool` | 114 | ✅ Live-Verified | Kit (ConvertKit) V4 REST API — subscribers, broadcasts, sequences, tags, forms (bring-your-own key) |

---

## Summary Total: 62 Tools
- **48 Native System Tools** (Written natively in Swift connecting directly to macOS system APIs)
- **14 External MCP / REST / Bridge Tools** (10 official MCP servers + 3 REST APIs + 1 Python process bridge)
