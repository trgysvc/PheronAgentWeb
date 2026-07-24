# PheronAgent — Full Tool Inventory & Capability Reference (52 Tools)
**Last updated:** 2026-07-06  
**Verification method:** Verified against `Sources/PheronAgentCore/AgentEngine/Orchestrator.swift` (`group.register(...)` calls + `subagent_spawn` conditional registration).

This document details the capabilities of ALL 52 PheronAgent tools (Native, MCP, REST, and custom Process bridges across 3 distinct architectures):
1. **Native System Tools** (41 tools) — Built directly in Swift using Apple APIs (Core Audio, WeatherKit, Vision, Accessibility, etc.).
2. **Model Context Protocol (MCP)** (9 tools) — Official JSON-RPC 2.0 servers (`initialize`, `tools/list`, `tools/call`).
3. **Direct REST API & Process Bridges** (2 tools) — Higgsfield (REST) and Blender 3D (headless process spawn).

---

## 1. Communication (4 tools)

### `whatsapp_send` (UBID 17) — Legacy WhatsApp Sender
Automates WhatsApp via AppleScript/System Events. **Parameters:** `recipient`, `message`. Requests Touch ID/password approval when biometric security is enabled.

### `send_message_via_whatsapp_or_imessage` (UBID 37) — Unified Messaging
Dispatches messages over iMessage or WhatsApp. **Parameters:** `platform` ("whatsapp" or "imessage"), `recipient`, `message`.

### `send_email` (UBID 22) — Legacy Mail Sender
Dispatches emails via Apple Mail. **Parameters:** `recipient`, `subject`, `body`.

### `apple_mail` (UBID 55) — Apple Mail Management
3 actions: `list_unread`, `create_draft` (**parameters:** `subject`, `recipient`, `body`), `send_email`.

---

## 2. Media & Audio (3 tools)

### `media_control` (UBID 43) — System Audio & Music Control
5 actions: `play`, `pause`, `next`, `volume` (**parameter:** `level` 0-100), `play_content` (**parameters:** `searchTerm`, optional `contentType`: "track" or "playlist").

### `music_dna` (UBID 18) — Professional Acoustic Analysis
Certified forensic audio analysis: EBU R128 loudness, THD+N, SNR, stereo entropy, key/tempo estimation, and bit-depth analysis. Writes binary `.plist` (AudioReport). **Parameters:** `path`, `depth`.

### `id3_processor` (UBID 85) — Recursive ID3 Tagger
Embeds metadata from JSON/TXT into MP3/audio files with custom tag overrides. **Parameters:** `directory`, optional `custom_tags`.

---

## 3. Web & Search (5 tools)

### `web_search` (UBID 45) — Real-Time Search
Searches live web results using Brave & Google APIs. **Parameter:** `query`.

### `web_fetch` (UBID 46) — Web Content Extractor
Retrieves full-text HTTP document content and converts to clean Markdown. **Parameter:** `url`.

### `safari_automation` (UBID 40) — Native Safari Automation
5 actions: `search`, `scrape`, `read`, `open`, `close`. **Parameters:** `action`, `query`, `url`.

### `browser_native` (UBID 170) — Interactive Safari Controller
6 actions: `navigate`, `read`, `fill`, `list_tabs`, `switch_tab`, `inspect_ax`. High-fidelity form filling and navigation.

### `research_report` (UBID 20) — Strategic Research Finalizer
Finalizes strategic research tasks into publication-grade Markdown. **Parameter:** `report_markdown`.

---

## 4. System & Device Control (9 tools)

### `set_volume` (UBID 56) — Output Volume
Native Core Audio volume controller (0-100). **Parameter:** `level`.

### `set_brightness` (UBID 57) — Display Brightness
Display brightness controller (0.0–1.0 fraction). **Parameter:** `level`.

### `system_sleep` (UBID 15) — Sleep Control
Triggers system sleep or lock status via native AppleScript.

### `get_system_info` (UBID 58) — Hardware Telemetry
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

## 5. Productivity & File Management (5 tools)

### `contacts_find` (UBID 38) — Apple Contacts Search
Queries local Contacts database by name. **Parameter:** `query`.

### `apple_calendar` (UBID 54) — EventKit Calendar Management
2 actions: `list_events`, `add_event` (**parameters:** `summary`, `start`, optional `end`).

### `file_manager_action` (UBID 39) — File Operations
7 actions: `scan_large`, `list`, `create`, `mkdir`, `delete`, `move`, `copy`.

### `read_file` (UBID 33) — File Reader
Reads PDF, DOCX, TXT, MD, Swift, JSON, and Plist files safely. **Parameter:** `path`.

### `write_file` (UBID 34) — Atomic File Writer
Atomically writes or overwrites local files with directory creation. **Parameters:** `path`, `content`, optional `force`.

---

## 6. Utilities (4 tools)

### `calculator_op` (UBID 80) — Safe High-Precision Math
Evaluates mathematical expressions (`+ - * / ^ sqrt abs floor ceil`). **Parameter:** `expression`.

### `get_weather` (UBID 81) — Live WeatherKit Diagnostics
Fetches weather conditions, UV index, humidity, wind, and forecast using WeatherKit / wttr.in. **Parameters:** `location`, optional `day`.

### `system_date` (UBID 82) — System Date Resolver
Returns current system time to resolve relative date expressions ("tomorrow", "next Friday").

### `set_timer` (UBID 83) — Native Asynchronous Timers
Sets async timers with custom notification messages. **Parameters:** `seconds`, `message`.

---

## 7. Development & Coding (4 tools)

### `shell_exec` (UBID 32) — Zsh Terminal Execution
Executes local shell/zsh terminal commands safely. **Parameter:** `command`.

### `patch_file` (UBID 41) — Code Patching
Line-by-line diff matching and semantic file patching. **Parameters:** `path`, `old_content`, `new_content`.

### `git_action` (UBID 42) — Basic Local Git Operations
5 actions: `log`, `status`, `diff`, `commit`, `revert`.

### `xcode_engine` (UBID 47) — Autonomous Xcode & SPM Management
3 actions: `project_map`, `build_and_fix`, `simulator_control`.

---

## 8. Vision & Memory (5 tools)

### `analyze_image` (UBID 48) — Native OCR & Vision
Analyzes image files for OCR text and UI element detection.

### `semantic_vision` (UBID 84) — Deep Visual Understanding (24 GB+ Macs)
On-device VLM for semantic scene analysis, diagram parsing, and complex visual UI audits.

### `memory` (UBID 44) — Long-Term Experiential Memory
2 actions: `search` (**parameter:** `query`), `save` (**parameters:** `task`, `solution`).

### `visual_audit` (UBID 30) — ScreenCaptureKit Vision
Performs frame-by-frame UI element visual audits.

### `apple_accessibility` (UBID 24) — Accessibility AX Tree Automation
Interacts directly with application UI controls via macOS Accessibility APIs.

---

## 9. Self-Improvement (2 tools)

### `subagent_spawn` (UBID 19) — Recursive Sub-Agent Task Delegation
Spawns a child orchestrator runtime to execute sub-tasks autonomously. **Parameter:** `prompt`.

### `skill_patch` (UBID 86) — Procedural Memory & Skill Management
Manages, patches, and archives custom `.skill.md` procedures. 4 actions: `create`, `patch`, `search`, `list`.

---

## 10. 3D & Media Generation (2 Non-MCP Tools)

### `blender_3d` (UBID 60) — Custom Python Process Bridge
Automates Blender 3D rendering and mesh generation via headless Python scripts (`blender --background --python`). 29+ actions including modeling, materials, modifiers, keyframes, constraints, and rendering.

### `higgsfield_generate` (UBID 87) — Higgsfield REST API
Generates AI video and motion dynamics via direct HTTP REST API polling. Supports image-to-video and text-to-image models (Soul, Seedream, DoP, Kling, Seedance).

---

## 11. Model Context Protocol (MCP) Server Bridges (9 Tools)

| Tool Name | UBID | Verification Status | Capability Overview |
|---|---|---|---|
| `git_tool` | 96 | ✅ Live-Verified | Official Anthropic Git MCP server — 12 actions (status/diff/commit/branch/log/show) |
| `memory_tool` | 97 | ✅ Live-Verified | Official Knowledge-Graph MCP server — 9 actions (entity/relation/observation CRUD) |
| `browser_tool` | 98 | ✅ Live-Verified | Official Microsoft Playwright MCP server — 22 headless browser actions |
| `perplexity_tool` | 99 | ✅ Live-Verified | Official Perplexity MCP server — 4 actions (search/ask/research/reason) |
| `stripe_tool` | 100 | ✅ Live-Verified | Official Stripe MCP server — 11 actions (account/customer/payment/refund) |
| `github_tool` | 101 | ✅ Live-Verified | Official GitHub MCP server — ~70 actions (Issues/PRs/Actions/Security) |
| `zapier_tool` | 102 | ⚠️ Pending Setup | Official Zapier MCP server — 9,000+ app integration actions |
| `notion_tool` | 103 | ⚠️ OAuth Integration | Official Notion MCP server — 17 actions (pages/databases/comments) |
| `unreal_engine_tool` | 104 | ⚠️ Experimental | Official Epic Games Unreal Engine 5.8+ editor-embedded MCP server |
