# LinkedIn & X Setup — Connecting Your Own Social Accounts to Pheron Agent

**Last updated:** 2026-09-11

Pheron Agent connects to LinkedIn and X (Twitter) as bring-your-own-app OAuth connections. Neither uses a shared Pheron Agent account — each connects through your own developer app, with tokens stored only in your local macOS Keychain.

---

## LinkedIn

LinkedIn has no official MCP server, so Pheron Agent talks to its documented REST API (`api.linkedin.com`) directly.

### Step 1 — Create a LinkedIn developer app

1. Go to [developer.linkedin.com/apps](https://www.linkedin.com/developers/apps) and click **Create app**.
2. Fill in the app name, an associated LinkedIn Page (every LinkedIn app must be linked to a Page — create one first if you don't have one), logo, and privacy policy URL.
3. On the **Products** tab, add **"Share on LinkedIn"** and **"Sign In with LinkedIn using OpenID Connect"** — both are self-serve, no approval needed.
4. On the **Auth** tab, copy your **Client ID** and **Client Secret** (the secret is shown only once).
5. In the same tab, add this exact **Authorized redirect URL**:
   ```
   http://localhost:53684/callback
   ```
6. On the **Settings** tab, click **Verify**, generate the verification URL, and — since you're both the app's developer and the Page's admin — open that link yourself to approve it. This step is final (cannot be undone), but harmless for your own app/Page.

### Step 2 — Connect in Pheron Agent

1. Open **Settings → Connections**, find the **LinkedIn** card, click **Configure**.
2. Paste the Client ID and Client Secret, click **Save**.
3. Click **Connect via OAuth** — your browser opens LinkedIn's consent screen; approve it.
4. A local loopback listener on port 53684 catches the redirect automatically and completes the connection.

### What it can do

Publish a text post to **your own personal profile** — that's the entire scope of LinkedIn's self-serve API. Example: "post to LinkedIn: excited to share our latest release!"

**What it can't do** (confirmed against LinkedIn's own developer documentation, 2026-09-11): posting on behalf of a **company Page** requires a separate, approval-gated Community Management API; reading your connections, messaging other members, or searching people isn't available in the self-serve API at all; advertising/analytics and recruiting integrations require their own partner programs. None of this is a Pheron Agent limitation — it's LinkedIn's own platform policy.

---

## X (Twitter)

X also has no official MCP server. Pheron Agent talks to its documented REST API (`api.x.com`) directly.

### Step 1 — Create an X developer app

1. Go to [developer.x.com](https://developer.x.com), create a developer account (phone verification required), and create a **Project** and **App** inside it.
2. Choose the **Native App** app type — this gives you a Client ID with no secret (a public OAuth client), which is the safer choice since a desktop app can't keep a secret hidden.
3. In the app's **User authentication settings**, enable OAuth 2.0 and add this exact **Callback URL**:
   ```
   http://localhost:53685/callback
   ```
4. Add a payment method — X has no free tier as of February 2026; every post is billed per-call.

### Step 2 — Connect in Pheron Agent

1. Open **Settings → Connections**, find the **X** card, click **Configure**.
2. Paste the Client ID (leave Client Secret empty for a Native App), click **Save**.
3. Click **Connect via OAuth** and approve the consent screen in your browser.

### What it can do — and what it costs

Publish a post to your own X account. **Every successful post is billed by X**: roughly $0.015 per post, or $0.20 if the post contains a link (about 13x more expensive) — posting a link as a separate follow-up reply instead of inline avoids the surcharge. Pheron Agent shows this cost on the confirmation prompt before every post, since this is real money regardless of what any chat response claims.

---

## Notes

- Both app credentials and tokens are stored in macOS Keychain, never sent anywhere except directly to LinkedIn's/X's own OAuth and API endpoints.
- Both tools are single-purpose (publish a post) by design, not a generic API passthrough — a fixed request shape leaves no room for a wrong element or a hallucinated call to slip through, unlike open-ended browser automation.
- Every post from either tool requires your explicit confirmation before it goes out — nothing publishes silently.
