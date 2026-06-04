# Privacy Policy

*Effective date: June 1, 2026*

**Your conversations never leave your Mac.** No messages, no files, no task history — nothing you type into Pheron Agent is ever transmitted to our servers or any third party, unless you explicitly choose to use cloud inference (explained below).

---

## What Pheron Agent Does Not Do

- Does not transmit your prompts, responses, or task history anywhere — ever.
- Does not collect usage analytics by default. An opt-in anonymous reporting toggle is available in **Settings → Privacy** and is off by default.
- Does not include advertising SDKs or third-party tracking libraries.
- Does not sell your data to any third party.

## What Pheron Agent Requires

Pheron Agent uses **Supabase Auth** for account management, with **Sign in with Apple** as the authentication method. When you sign in, you authenticate directly with Apple (Face ID, Touch ID, or password) — your Apple ID credentials are never shared with us. Apple confirms your identity to Supabase, which creates your account and issues a session token to the app. Only your unique user ID and email address are stored in our Supabase backend. Your conversations and files are never sent to Supabase — only your authentication session is stored there.

If you enable anonymous usage reporting in Settings, aggregated usage events (tool names, duration, error codes — no content) are also stored in Supabase. You can disable this at any time, and the data is deleted on request.

---

## What Pheron Agent Stores Locally

Everything Pheron Agent saves stays on your Mac:

| Data | Location | Purpose |
|---|---|---|
| Conversations | `~/Library/Application Support/PheronAgent/sessions/` | Session continuity |
| Memory & summaries | `~/Library/Application Support/PheronAgent/memory/` | Multi-session context |
| Learned skills | `~/Library/Application Support/PheronAgent/skills/` | Self-improving procedures |
| Performance metrics | `~/Library/Application Support/PheronAgent/telemetry/` | On-device Analytics dashboard |
| Settings | macOS UserDefaults | App configuration |
| License credential | macOS Keychain | License validation |

You can delete chat history at any time from **Settings → Privacy → Delete All Chat History**.

---

## System APIs Pheron Agent Accesses

The app reads standard macOS system information to function. None of this is transmitted externally.

| API | Why |
|---|---|
| File timestamps | Reporting file modification times in tool output |
| Disk space | Warning before large model downloads |
| System uptime | Measuring task duration in the Analytics dashboard |
| UserDefaults | Storing your app settings |

---

## What Gets Transmitted — The Full List

### 1. Authentication (Supabase Auth + Sign in with Apple) — Always On

Pheron Agent uses Supabase Auth with Sign in with Apple as the provider. The flow when you sign in:

1. You authenticate with Apple (Face ID, Touch ID, or password).
2. Apple returns a token to the app — your Apple ID credentials never leave Apple.
3. The app forwards that token to Supabase, which verifies it and issues a session token back to the app.

Supabase stores your **user ID** and **email** to maintain your session. Your session is kept locally in the macOS Keychain and refreshed automatically. We do not sell or share this data.

### 2. Automatic Update Check (Sparkle)

Pheron Agent uses the Sparkle framework to check for updates. When it checks, it sends:

- App version number
- macOS version
- CPU architecture (Apple Silicon)
- IP address (inherent to any network request)

No personal identifiers, no usage data, no conversation content. The IP address is used only for routing the network request and is not stored or logged on our end.

### 3. Optional Anonymous Analytics (Supabase) — Off by Default

If you enable **Share Anonymous Usage Data** in Settings → Privacy, Pheron Agent sends to Supabase:

- Tool name, duration in milliseconds, and error code (if any) — never the content of your task
- Session start and end events, and the model ID in use
- App version and macOS version

No prompts, file contents, or personal information are ever included. You can turn this off at any time, and all stored events are deleted on request at support@pheronagent.com.

### 4. License Validation (Lemon Squeezy)

When you activate your license key, Pheron Agent sends to Lemon Squeezy:

- Your license key string
- A device name (e.g., "Pheron on MacBook Pro") — derived from your Mac's hostname

This happens once at activation. Every 14 days, only the license key and a device identifier are sent to verify the license is still valid. Your name, email, or any personal data is not sent from the app — Lemon Squeezy already has your email from the purchase, and we do not re-send it.

If your device is offline for more than 14 days, the license will be re-validated automatically the next time an internet connection is available. Offline use does not lock or disable the app — validation simply resumes when connectivity is restored.

Lemon Squeezy's privacy policy: [lemonsqueezy.com/privacy](https://www.lemonsqueezy.com/privacy)

> **Note:** Your name and email address are collected by Lemon Squeezy at the time of purchase and are governed by their privacy policy. If you request account deletion from us (support@pheronagent.com), we will remove your data from our systems; however, you must contact Lemon Squeezy separately to remove your purchase and billing records from their platform.

### 5. Cloud Inference (Optional — Off by Default)

By default, Pheron Agent uses a fully local model. If you choose to add an OpenRouter API key in **Settings → AI → Cloud**, your prompts are sent to OpenRouter's servers for processing. This is:

- Entirely opt-in
- Requires you to actively configure an API key
- Indicated by a visual badge in the chat window when active

When cloud inference is active, the same privacy expectations that apply to any cloud AI service apply. See [openrouter.ai/privacy](https://openrouter.ai/privacy).

---

## Data Deletion

To remove all data Pheron Agent has stored:

1. Quit Pheron Agent.
2. Delete `~/Library/Application Support/PheronAgent/` from your Mac.
3. Open **Keychain Access**, search for "supabase_session" and "license_credential", and delete any entries found.
4. Delete the app from your Applications folder.

---

## Your Rights

### EU / EEA (GDPR)

If you are located in the EU or EEA, you have rights under the General Data Protection Regulation including the right to access, rectify, erase, restrict, and object to processing of your personal data. We hold your email address and a unique user ID in our authentication system (Supabase). To request deletion of this data, contact us at the address below and we will remove it within 30 days.

### California (CCPA / CPRA)

If you are a California resident, you have the right to know what personal information is collected, to delete it, to opt out of sale (we do not sell data), and to non-discrimination for exercising these rights.

### Other Jurisdictions

We respect the privacy rights of users in all jurisdictions. Contact us with any questions.

---

## Contact

Privacy questions: **support@pheronagent.com**

Developer: Turgay Savacı — Istanbul, Turkey
