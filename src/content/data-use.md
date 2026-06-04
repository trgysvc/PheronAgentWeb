# Data Use Policy

*Effective date: June 1, 2026*

Pheron Agent is built with a **Sovereign On-Device Architecture**. This policy outlines how data is used, stored, and processed when using the application.

---

## 1. On-Device Computation and Zero-Transmission Principle

Pheron Agent runs local model inference using the Apple Neural Engine and GPU via Apple's MLX Framework. 

- **Inference Data**: All prompts, file contents, terminal execution histories, and system logs are processed 100% on-device. Nothing is transmitted to external servers.
- **Context Preservation**: The three memory layers (L1 Hot Cache, L2 Daily Notes, L3 DreamBank summaries) are stored purely on local SQLite databases and plist files under `~/Library/Application Support/PheronAgent/`.

---

## 2. API Keys and Sensitive Data Storage

To ensure maximum security on macOS, all sensitive configuration keys and credentials are isolated from application storage:

- **Keychain Storage**: API keys (such as OpenRouter keys or other providers) are stored in the secure macOS Keychain.
- **Config Plist**: Non-sensitive settings and API endpoints are saved in a standard plist file (`vault.plist`), referencing the Keychain items by unique identifiers.
- **Security Sentinel**: The application does not read or parse plain-text secret keys directly from configuration text files.

---

## 3. Remote Services & Optional Integrations

The only instances where network connections are established include:

1. **Authentication**: App sign-in uses Apple Sign In, which securely stores only your email and a unique user ID on our backend (Supabase) to verify your account state.
2. **License Validation**: Lemon Squeezy processes key validation every 14 days, verifying only the license key string and your device's hostname. Your purchase and billing records are stored by Lemon Squeezy under their own privacy policy; to remove that data, contact Lemon Squeezy directly in addition to any deletion request sent to us.
3. **Update Checks**: The Sparkle framework polls for new releases. You may disable automatic updates inside the settings menu.
4. **Cloud Inference (Opt-In)**: If you explicitly add and configure external API providers, prompt payloads will be sent to the respective third-party models. This is disabled by default and clearly visualised.

---

## 4. User Control & Data Portability

Because all data lives on your local disk, you maintain absolute control:

- **Manual Deletion**: You can purge all chat history, learned skill scripts (`.skill.md`), and memory databases instantly via **Settings → Privacy**.
- **Data Deletion**: Uninstalling the app and removing the `~/Library/Application Support/PheronAgent/` directory completely erases all data from your computer.

For any questions regarding data usage, contact us at **support@pheronagent.com**.
