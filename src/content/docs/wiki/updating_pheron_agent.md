# Updating Pheron Agent

Pheron Agent receives regular updates to improve performance, add new features, support new local MLX models, and resolve stability issues. This guide explains how to check for, download, and install updates.

---

## 1. Automatic Updates (Sparkle Framework)

For the direct distribution (DMG) version of Pheron Agent, the application features built-in automatic update delivery using the secure **Sparkle** framework.

### How it works:
* **Background Check:** By default, Pheron Agent checks for updates in the background when the application launches.
* **Update Prompts:** If a newer version is available on the update server, you will see a prompt with the release notes detailing what's new and what has been fixed.
* **One-Click Install:** You can choose to download and install the update immediately, skip that specific version, or request to be reminded later.
* **Manual Check:** You can manually trigger an update check at any time by selecting **Pheron Agent > Check for Updates...** from the macOS menu bar or via the Help menu.

---

## 2. Manual Updates (DMG)

If you prefer to update manually or if the automatic updater is blocked by network policies:

1. **Download the Latest Release:** Go to the [Download Page](/download) or fetch the DMG directly from our secure distribution server:
   ```
   https://app.pheronagent.com/PheronAgentXYZ.dmg
   ```
   *(Where `XYZ` represents the version number, e.g., `103` for version `1.0.3`)*
2. **Mount the DMG:** Double-click the downloaded `.dmg` file to mount it on your desktop.
3. **Replace the App:** Drag the **Pheron Agent** application icon into your `/Applications` directory. 
4. **Approve Replacement:** macOS will ask if you want to replace the existing version. Click **Replace** to complete the update.

> [!NOTE]
> **Gatekeeper & Security:** All official DMG releases are signed with a valid Apple Developer ID Application certificate (`Developer ID Application: Turgay Savaci (RDCY864LPJ)`) and notarized by Apple's notary service. This ensures the app is free of malware and complies with macOS Gatekeeper policies.

---

## 3. System Requirements & Compatibility

Before upgrading to a major new version of Pheron Agent, please verify that your Mac meets the system requirements:

* **Processor:** Apple Silicon M-series (M1, M2, M3, M4, or later). Intel Macs are not supported.
* **Memory:** Minimum **16 GB of unified memory (RAM)**, with **24 GB+ recommended** for optimal performance and larger local models.
* **Operating System:** 
  * **v1.0.x releases:** Require **macOS 15.0 (Sequoia)** or later.
  * **v2.0.0+ releases (Planned):** Require **macOS 26+** due to integration with modern on-device Speech APIs (such as `SpeechAnalyzer` and `SpeechTranscriber` for native voice input).

---

## 4. Release Notes and Changelog Source of Truth

The single source of truth for all changes across releases is the `CHANGELOG.md` file in the project's root repository. 

* The release notes displayed in the in-app updater (Sparkle `appcast.xml` description) and on the website's Changelog section are copied directly from the corresponding version section in `CHANGELOG.md`.
* Each release details newly added features (**Added**), changes to behavior (**Changed**), and resolved issues (**Fixed**).

If you have custom subagents or specific configurations, check the changelog prior to updating to see if there are any migration steps required (such as changes to configuration schemas or memory paths).
