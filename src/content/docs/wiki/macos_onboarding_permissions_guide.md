# macOS Permissions & Setup Guide

This page walks you through exactly what you'll see the first time you open Pheron Agent — in order, with plain explanations of every button and permission request. No technical background needed.

---

## 1. What happens when you first open the app

The first time you launch Pheron Agent, you'll see four screens, one after another:

1. **App Permissions** — a list of things Pheron Agent asks permission for
2. **Local or Cloud** — how you want the AI to run
3. **Setup** — downloading a model (Local) or entering an API key (Cloud)
4. **Ready** — a few quick tips, then you start chatting

You can skip most of this and come back to it later — nothing here is a one-time-only choice.

---

## 2. Screen 1 — App Permissions

Pheron Agent asks macOS for permission to do things on your behalf. Every permission below has its own **Grant** button, so you can say yes to only the ones you actually want — or click **Grant All** at the bottom to approve everything at once. Nothing here is required to open the app; if you skip a permission, the related feature just won't work until you turn it on.

| Permission | Why Pheron Agent wants it |
|---|---|
| **Contacts** | To look up people and send messages for you via iMessage or WhatsApp. |
| **Calendar** | To create events and manage your schedule when you ask it to. |
| **Screen Recording** | To look at what's on your screen when you ask it to read or explain something visual. |
| **Accessibility** | To click buttons and control other apps for you (this is what lets it actually "use" your Mac). |
| **Microphone** | To listen to voice commands and analyze audio files. |
| **Full Disk Access** | To read and edit files anywhere on your Mac — Desktop, Downloads, and other folders — not just its own private folder. |
| **Energy Metrics** | To read your Mac chip's real power usage, so it can show you exactly how much energy (in Watts/Joules) each AI task actually costs. |

There's also a separate switch, **Desktop & All Folders**, right below the permission list. It's **off by default**, which means Pheron Agent can only read and write inside its own private workspace folder. Turn it on if you want it to be able to touch your Desktop, Downloads, and other folders directly.

For most permissions, clicking **Grant** shows the normal macOS system popup right away. Two of them work a bit differently:
- **Accessibility** and **Full Disk Access** can't be turned on directly by any app (this is an Apple restriction, not a Pheron Agent limitation) — clicking **Grant** opens System Settings for you, where you flip the switch yourself.
- **Screen Recording** needs an app restart to fully take effect after you grant it — if you see a **Restart App** button, click it.

If you accidentally deny something, click **Open Settings** next to that item any time — it'll take you straight to the right macOS settings pane.

---

## 3. Screen 2 — Local or Cloud

Choose how Pheron Agent should think:

- **🏠 Local** — Runs entirely on your Mac. Nothing you type ever leaves your device. Free, private, and works offline once the model is downloaded.
- **☁️ Cloud** — Uses a more powerful model over the internet (via OpenRouter). Requires your own OpenRouter API key and an internet connection. Since your prompts are sent to OpenRouter's servers in this mode, you'll be shown a short data notice and asked to confirm you understand before you can continue.

You can click **Set Up Later** to skip this entirely and decide another time.

---

## 4. Screen 3 — Getting your model ready

**If you picked Local:** Pheron Agent downloads the recommended AI model for your Mac's hardware in the background. You'll see a progress bar — it's safe to close the app while this downloads; it keeps going and picks up where it left off. Once it reaches 100%, click **Continue**. Want to know which specific model your Mac will get and why? See [Models & Hardware Tiers](wiki/models_and_hardware.md).

**If you picked Cloud:** paste in an OpenRouter API key (there's a button that opens openrouter.ai to grab one), check the box confirming you understand your prompts are sent to OpenRouter, then click **Save & Continue**.

---

## 5. Screen 4 — Ready to go

You'll see a few quick tips:
- Switch models any time from the top menu
- **⌘N** starts a new chat
- **⌘,** opens Settings

Click **Start Chatting** and you're in.

---

## 6. Changing your mind later

Nothing above is permanent:

- **Permissions**: open **Settings → Permissions** inside Pheron Agent any time to see the exact same list from Screen 1 and grant or revoke anything.
- **Local vs. Cloud, model choice, API keys**: open **Settings → AI**.
- **What Pheron Agent is allowed to touch on disk**: the **Desktop & All Folders** toggle also lives in **Settings → Permissions**, right under the permission list.

If a permission still shows as denied after you've enabled it in System Settings, quitting and reopening Pheron Agent usually clears it up.

---

## 7. Related pages

- [Models & Hardware Tiers](wiki/models_and_hardware.md) — which model fits your Mac
- [Local API (Titan Hub)](api.md) — using Pheron Agent from scripts and other tools
- [Help & Support](/resources/help) — if something isn't working
