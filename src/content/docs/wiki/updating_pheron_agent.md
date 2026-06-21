# Updating Pheron Agent

Pheron Agent receives regular updates to improve performance, add new features, support new local MLX models, and resolve stability issues. This guide explains how to check for, download, and install updates.

---

## 1. Automatic Updates

Pheron Agent features built-in automatic update delivery to keep your application up to date seamlessly.

### How it works:
* **Background Check:** By default, Pheron Agent checks for updates in the background when the application launches.
* **Update Prompts:** If a newer version is available, you will see a prompt with the release notes detailing what's new and what has been fixed.
* **One-Click Install:** You can choose to download and install the update immediately, skip that specific version, or request to be reminded later.
* **Manual Check:** You can manually trigger an update check at any time by selecting **Pheron Agent > Check for Updates...** from the macOS menu bar or via the Help menu.

---

## 2. Manual Updates

If you prefer to update manually:

1. **Download the Latest Release:** Go to the [Download Page](/download) to download the latest version of Pheron Agent.
2. **Mount the DMG:** Double-click the downloaded `.dmg` file to mount it on your Mac.
3. **Replace the App:** Drag the **Pheron Agent** application icon into your `/Applications` directory. 
4. **Approve Replacement:** macOS will ask if you want to replace the existing version. Click **Replace** to complete the update.

> [!NOTE]
> **Gatekeeper & Security:** All official releases are signed with a valid Apple Developer certificate and notarized by Apple's notary service. This ensures the app is free of malware and complies with macOS Gatekeeper security policies.

---

## 3. System Requirements & Compatibility

Before upgrading, please verify that your Mac meets the system requirements:

* **Processor:** Apple Silicon M-series (M1, M2, M3, M4, or later). Intel Macs are not supported.
* **Memory:** Minimum **16 GB of unified memory (RAM)**, with **24 GB+ recommended** for optimal performance and larger local models.
* **Operating System:** 
  * **v1.0.x releases:** Require **macOS 15.0 (Sequoia)** or later.
  * **v2.0.0+ releases (Planned):** Require **macOS 26+** due to integration with modern on-device Speech APIs (such as `SpeechAnalyzer` and `SpeechTranscriber` for native voice input).

---

## 4. Viewing Release Notes

You can view the release notes for any version of Pheron Agent in two places:
* **In-App Updater:** The update dialog box displays a list of additions, changes, and fixes before you download.
* **Official Website:** Visit the [Changelog Page](/changelog) to view the complete history of updates.
