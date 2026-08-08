# LemonSqueezy & Kit Setup — Connecting Your Store and Email List to Pheron Agent

**Last updated:** 2026-08-08

Pheron Agent bridges two more services as bring-your-own-key connections: **LemonSqueezy** (payments/orders/subscriptions) and **Kit**, formerly ConvertKit (email marketing). Neither uses a shared Pheron Agent account — each connects with your own API key, stored only in your local macOS Keychain.

---

## LemonSqueezy

LemonSqueezy has no official MCP server, so Pheron Agent talks to its documented REST API (`api.lemonsqueezy.com/v1`) directly.

### Step 1 — Get your API key

1. Log in at [app.lemonsqueezy.com](https://app.lemonsqueezy.com).
2. Go to **Settings > API**.
3. Click **"Create API Key"**, give it a name (e.g. "Pheron Agent"), and create it.
4. Copy the key — it may not be shown again in full.

### Step 2 — Connect in Pheron Agent

1. Open **Settings → Connections**, find the **LemonSqueezy** card, click **Configure**.
2. Paste the API key, click **Save**.
3. Click **Test Connection** to confirm — it calls `GET /v1/users/me` and shows your account name if the key is valid.

### What it can do

Orders, customers, subscriptions, products, variants, stores, discounts, license keys, webhooks — any documented LemonSqueezy endpoint, not just a fixed list. Example requests: "list my last 10 orders", "create a 20% discount code called SAVE20", "look up subscription status for customer X".

Note: this is separate from Pheron Agent's own license activation (which also happens to use LemonSqueezy) — that validates *your Pheron Agent license*; this tool manages *your own* LemonSqueezy store.

---

## Kit (formerly ConvertKit)

Kit ships an official hosted MCP server, but it requires a full browser OAuth flow with dynamic app registration that isn't supported yet. Pheron Agent instead uses Kit's documented **V4 API key** authentication — simpler, and sufficient for a single personal account.

### Step 1 — Get your V4 API key

1. Log in at [app.kit.com](https://app.kit.com).
2. Go to **Settings > Developer**.
3. Under **API**, find your **V4 API Key** (starts with `kit_`), or click **"Add a new key"** to create one.

**Important:** make sure you copy the **V4** key specifically. Kit's settings pages can also show older/legacy credentials (a separate "API Key" + "API Secret" pair) — those are not V4 keys and will fail with "The API key is invalid."

### Step 2 — Connect in Pheron Agent

1. Open **Settings → Connections**, find the **Kit** card, click **Configure**.
2. Paste the V4 API key, click **Save**.
3. Click **Test Connection** to confirm — it calls `GET /v4/account` and shows your account name if the key is valid.

### What it can do

Subscribers, tags, sequences, broadcasts (newsletters), forms, custom fields, purchases, webhooks — any documented Kit V4 endpoint. Example requests: "list my subscribers", "create a broadcast announcing the new release", "tag everyone who bought product X".

---

## Notes

- Both keys are stored in macOS Keychain, never sent anywhere except directly to LemonSqueezy's/Kit's own API.
- Both integrations are a **generic bridge** — Pheron Agent doesn't hardcode every endpoint; any endpoint documented in [LemonSqueezy's API docs](https://docs.lemonsqueezy.com/api) or [Kit's API docs](https://developers.kit.com/api-reference/overview) works.
