# Lark Suite Setup — Connecting Lark to Pheron Agent

**Last updated:** 2026-08-07
**Covers:** Messaging, Chats, Calendar, Contacts, Base (Bitable), Docs, Tasks, Wiki

Pheron Agent bridges Lark's official OpenAPI MCP server (`@larksuiteoapi/lark-mcp`, github.com/larksuite/lark-openapi-mcp). Like GitHub and Stripe, this is a **bring-your-own-app** integration — there is no shared Pheron Agent Lark app. Every user creates their own small app on the Lark Open Platform and pastes its credentials into Pheron Agent. This takes about 5 minutes.

---

## Step 1 — Create a custom app

1. Go to [open.larksuite.com](https://open.larksuite.com) and log in (a personal email works, no company account required).
2. Open the **Console** (top navigation).
3. Click **Create custom app**.
4. Fill in an app name (e.g. "Pheron Agent") and a short description, then click **Create**.

## Step 2 — Copy the App ID and App Secret

On the app's **Credentials & Basic Info** page you'll find:

- **App ID** — starts with `cli_`
- **App Secret** — click the eye icon or "Copy" to reveal it

Keep this tab open — you'll paste both into Pheron Agent in Step 5.

## Step 3 — Add the Bot feature

1. Go to **Add Features**.
2. Find **Bot** and click **Add**.

This is required for messaging (`im_v1_message_create`, `im_v1_chat_create`, etc.) to work.

## Step 4 — Enable permissions & scopes

Go to **Permissions & Scopes** and add the ones you need. A practical starting set:

| Scope | Enables |
|---|---|
| `im:message` | Read messages |
| `im:message:send_as_bot` | Send messages as the bot |
| `im:chat` | Chat/group info |
| `contact:user.base:readonly` | Resolve emails/phone numbers to user IDs |
| `calendar:calendar` | Read/write calendar events |

You can add more later (e.g. `bitable:app` for Base, `docx:document` for Docs) — changes take effect immediately for a personal/test app, no re-publish needed.

## Step 5 — Connect in Pheron Agent

1. Open Pheron Agent → **Settings → Connections**.
2. Find the **Lark** card and click **Configure**.
3. Paste your **App ID** and **App Secret**, then click **Save**.
4. Click **Test Connection** to confirm it connects and lists the available tools.

That's it — Pheron Agent can now call Lark's messaging, chat, calendar, contacts, Base, docs, task, and wiki APIs on your behalf, scoped to whatever permissions you enabled in Step 4.

---

## Notes

- **Region:** this guide is for **Lark** (international, open.larksuite.com). If your organization uses **Feishu** (China, open.feishu.cn) instead, the setup is the same but on the Feishu Open Platform — Pheron Agent's Lark connection is configured for the international domain and will not work with Feishu credentials as-is.
- **Scope:** the bot can only see/act within the Lark workspace (tenant) your app was created under — it is not a general internet-wide Lark connection.
- **Security:** your App Secret is stored in macOS Keychain, never sent anywhere except directly to Lark's own API.
