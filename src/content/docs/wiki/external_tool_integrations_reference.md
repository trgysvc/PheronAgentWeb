# PheronAgent External Tool Integrations — Complete Capability Reference
**Last updated:** 2026-06-21  
**Purpose:** Single reference document for ALL external tool integrations in PheronAgent.

## Architecture Overview
1. **Model Context Protocol (MCP) Servers** — Official JSON-RPC 2.0 servers (`Git`, `Memory`, `Playwright`, `Perplexity`, `Stripe`, `GitHub`, `Zapier`, `Notion`, `Unreal Engine`).
2. **Direct REST API** — Authentication via Keychain HTTP headers (`Higgsfield`).
3. **Custom Process Bridge** — Headless Python script execution (`Blender 3D`).

---

# SECTION A — Model Context Protocol (MCP) Servers

## A.1 — `git_tool` (UBID 96) — Official Git MCP Server
- **Command:** `uvx mcp-server-git`
- **Status:** ✅ Live-Verified
- **Actions:** `git_status`, `git_diff_unstaged`, `git_diff_staged`, `git_diff`, `git_add`, `git_commit`, `git_reset`, `git_log`, `git_show`, `git_create_branch`, `git_checkout`, `git_branch`.

## A.2 — `memory_tool` (UBID 97) — Official Memory Knowledge Graph MCP Server
- **Command:** `npx -y @modelcontextprotocol/server-memory`
- **Status:** ✅ Live-Verified
- **Actions:** `create_entities`, `create_relations`, `add_observations`, `delete_entities`, `delete_observations`, `delete_relations`, `read_graph`, `search_nodes`, `open_nodes`.

## A.3 — `browser_tool` (UBID 98) — Official Playwright MCP Server
- **Command:** `npx @playwright/mcp@latest`
- **Status:** ✅ Live-Verified
- **Actions:** `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_type`, `browser_fill_form`, `browser_take_screenshot`, `browser_wait_for`, `browser_close` (22 actions total).

## A.4 — `perplexity_tool` (UBID 99) — Official Perplexity MCP Server
- **Command:** `npx -y @perplexity-ai/mcp-server`
- **Status:** ✅ Live-Verified
- **Actions:** `perplexity_search`, `perplexity_ask`, `perplexity_research`, `perplexity_reason`.

## A.5 — `stripe_tool` (UBID 100) — Official Stripe MCP Server
- **Command:** `npx -y @stripe/mcp@latest`
- **Status:** ✅ Live-Verified
- **Actions:** `get_stripe_account_info`, `stripe_api_search`, `stripe_api_details`, `stripe_api_read`, `stripe_api_write`, `create_refund`, `search_stripe_resources`, `fetch_stripe_resources`.

## A.6 — `github_tool` (UBID 101) — Official GitHub MCP Server
- **Status:** ✅ Live-Verified
- **Actions:** ~70 tools across Repositories, Issues, Pull Requests, Actions, Discussions, Gists, Projects, Security Advisories, and Notifications.

## A.7 — `zapier_tool` (UBID 102) — Official Zapier MCP Server
- **Transport:** Streamable HTTP
- **Status:** ⚠️ Pending User Setup (Requires custom Zapier MCP endpoint URL).

## A.8 — `notion_tool` (UBID 103) — Official Notion MCP Server
- **Transport:** Streamable HTTP with OAuth 2.0
- **Status:** ⚠️ Pending OAuth Authentication.

## A.9 — `unreal_engine_tool` (UBID 104) — Official Unreal Engine 5.8+ Editor MCP Server
- **Transport:** Streamable HTTP (Localhost `http://127.0.0.1:8000/mcp`)
- **Status:** ⚠️ Experimental (Requires Unreal Engine 5.8+ editor plugin enabled).

---

# SECTION B — Direct REST API Integrations

## B.1 — `higgsfield_generate` (UBID 87) — Higgsfield REST API
- **Endpoint:** `https://platform.higgsfield.ai`
- **Supported Models:** Soul, Seedream, DoP, Kling, Seedance (text-to-image and image-to-video).

---

# SECTION C — Custom Process Bridges

## C.1 — `blender_3d` (UBID 60) — Blender 3D Python Process Bridge
- **Execution:** Headless `blender --background --python script.py` in sandbox.
- **Capabilities:** 29+ actions covering mesh creation, materials, keyframe animations, camera rigs, modifiers, GLTF export, and custom Python `bpy` script execution.
