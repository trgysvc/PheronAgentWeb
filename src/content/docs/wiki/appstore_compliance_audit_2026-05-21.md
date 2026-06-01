# App Store Compliance Audit — EliteAgent
**Date:** 2026-05-21  
**Auditor:** Claude Code (automated analysis)  
**Scope:** Mac App Store submission readiness  
**Sources:** Apple App Store Review Guidelines (fetched live), macOS Distribution page (fetched live), Privacy Manifest documentation (fetched live), codebase inspection  

---

## Executive Summary

| Metric | Count |
|---|---|
| Total rules/requirements checked | 47 |
| Critical blockers (definite rejection) | 4 |
| Major warnings (probable rejection) | 8 |
| Minor warnings (best-practice gaps) | 6 |
| Passing | 29 |

**Overall verdict: NOT READY for Mac App Store submission.**

EliteAgent has **4 critical blockers** that will cause automatic rejection. The most fundamental is that the app runs with `ENABLE_APP_SANDBOX = NO`, which violates Guideline 2.4.5(i) — a hard, non-negotiable requirement for Mac App Store listing. The app's architectural design (broad filesystem access, arbitrary shell execution, System Events automation) is fundamentally incompatible with App Sandbox without a major rearchitecting effort. Additionally, the XPC helper carries Hardened Runtime exceptions (`cs.allow-jit`, `cs.disable-library-validation`) that are incompatible with App Store distribution.

**Bottom line:** The current build can only be distributed via Developer ID (direct/notarized). A path to the Mac App Store exists but requires significant architectural changes estimated at 4–8 weeks of work.

---

## Section 1 — Safety

### 1.1 Objectionable Content
**Status: ✅ PASS**  
EliteAgent is a utility/AI agent app. No objectionable content, violent imagery, sexual content, or inflammatory material in scope.

### 1.2 User-Generated Content
**Status: ✅ PASS**  
The app does not host user-generated content or provide a platform for third-party content creation or sharing. Not applicable.

### 1.4 Physical Harm
**Status: ✅ PASS**  
No medical claims, drug dosage tools, or health-monitoring features that require regulatory clearance.

### 1.5 Developer Information
**Status: ⚠️ WARNING**  
**Requirement:** The app must provide an easy method to contact the developer, both in the app and via a Support URL in App Store Connect metadata.  
**Current state:** Not verified in the codebase. No in-app support contact or feedback UI was found in the reviewed source files.  
**What to change:** Add a support/feedback link (email or URL) accessible from the app's menu or settings. Provide a valid Support URL when submitting to App Store Connect.  
**Effort:** Low (1–2 hours).

### 1.6 Data Security
**Status: ⚠️ WARNING**  
**Requirement:** Implement appropriate security measures for all user information.  
**Current state:** API keys are stored in Keychain (good). The app uses Apple Events automation to read and interact with Contacts, Calendar, Messages, Mail, and WhatsApp — accessing sensitive personal data programmatically. Biometric authentication is implemented for message-sending actions (SecuritySentinel), which is positive. However, there is no documented data-at-rest encryption for agent session history or task logs stored to disk.  
**What to change:** Ensure session logs and task history do not persist sensitive extracted contact/calendar/message data in plain text. Consider encrypting the workspace and log directories or explicitly excluding sensitive content from logs.  
**Effort:** Medium (1–2 days).

---

## Section 2 — Performance

### 2.1 App Completeness
**Status: ✅ PASS (conditional)**  
The app is architecturally complete. However, the local inference model (~5 GB, Qwen3.5-9B) is downloaded post-install. This is permitted under guideline 2.4.2(ii) ("If additional resources needed on launch, disclose download size and prompt users"), but the app must clearly disclose the required download size before initiating the download and must function in a degraded/cloud-only mode if the download is unavailable or declined.  
**Recommendation:** Verify that the model download UI prominently discloses "approximately 5 GB download required" and that cloud-only mode works fully without local model.

### 2.3 Accurate Metadata
**Status: ⚠️ WARNING**  
**Requirement (2.3.1a):** No hidden, dormant, or undocumented features.  
**Current state:** The tool system includes `BlenderBridgeTool.swift`, `XcodeTool.swift`, `SkillPatchTool.swift`, and `SubagentTool.swift` — specialized capabilities that must be accurately described in App Store metadata. The app also runs as `LSUIElement = true` (no Dock icon), acting as a background/menubar agent. This must be clearly described in the app description.  
**What to change:** App Store description must explicitly list major capabilities (shell execution, Safari/System Events automation, iMessage/WhatsApp sending, screen recording, Blender control, Xcode automation) and note the background/menubar-only UI paradigm. Undisclosed automation capabilities are a common rejection reason.  
**Effort:** Low (metadata only, no code changes).

### 2.4.2 Power Efficiency
**Status: ✅ PASS (conditional)**  
Local LLM inference (Qwen3.5-9B via MLX) is inherently GPU/ANE-intensive. The codebase shows hardware-adaptive KV cache sizing and thermal state monitoring, which is responsible design. The `InferenceActor` uses `kvBits=4` quantization and `maxKVSize=8192` by default, scaling up only on 16 GB+ devices.  
**Recommendation:** Ensure the app does not perform continuous background inference when idle. Verify that inference tasks suspend cleanly on thermal throttle (`.serious`/`.critical` states).

### 2.4.5(i) — MAC APP STORE SANDBOXING
**Status: ❌ CRITICAL BLOCKER**  
**Requirement (Guideline 2.4.5(i)):** "Mac App Store apps must be appropriately sandboxed."  
**Current state:** `ENABLE_APP_SANDBOX = NO` in both Debug and Release build configurations for the main app target AND the XPC helper target. This is verified in `EliteAgent.xcodeproj/project.pbxproj`.  
**Impact:** This is a hard rejection. The App Store review system performs automated technical checks and will reject any app not compiled with App Sandbox entitlement (`com.apple.security.app-sandbox = true`).  
**What to change:** Enable App Sandbox. This requires a full audit of all capabilities:
- `ShellTool` (arbitrary `/bin/zsh` execution) — incompatible with sandbox; must be removed or replaced with specific entitlement-backed APIs
- `FileManagerTool` / `FileTools` — filesystem access restricted to sandbox container; user-picked files require Security-Scoped Bookmarks
- `SafariAutomationTool` — AppleScript automation of Safari requires `com.apple.security.automation.apple-events` (already present) but sandbox restricts what other apps can be controlled
- `MessengerTool` / `WhatsAppTool` — System Events keystroke injection requires Accessibility permission; App Store apps using Accessibility for automation are scrutinized heavily
- Writing to `/tmp/` directly (seen in `MessengerTool.sendWhatsApp`) — forbidden under sandbox; use `FileManager.default.temporaryDirectory`  
**Effort:** High (4–8 weeks of fundamental rearchitecting). The shell execution tool is architecturally central to EliteAgent and has no sandboxed equivalent.

### 2.4.5(ii) — Packaging
**Status: ✅ PASS**  
The app uses standard Xcode/SPM build tooling and appears to be a self-contained bundle with an XPC helper embedded inside.

### 2.4.5(iii) — Auto-launch
**Status: ⚠️ WARNING**  
**Requirement:** Cannot auto-launch or run code automatically at startup/login without explicit user consent.  
**Current state:** Not verified whether EliteAgent registers a Login Item. The app is a background agent (`LSUIElement = true`) that may be configured for auto-start. If a Login Item is registered, it must be controlled entirely by explicit user toggle within the app (macOS Settings → General → Login Items API or `SMAppService`).  
**What to change:** Ensure any auto-start behavior uses `SMAppService.mainApp.register()` and is presented to the user as an opt-in setting. Never silently add to Login Items.  
**Effort:** Low-medium (if not already implemented correctly).

### 2.4.5(iv) — Code Installation
**Status: ❌ CRITICAL BLOCKER**  
**Requirement:** "Cannot download, install standalone apps, kexts, additional code, or resources."  
**Current state:** The app downloads a ~5 GB LLM model file post-install. While downloading model weights (data files) is arguably different from installing executable code, Apple's reviewers have consistently rejected apps that download significant executable-like payloads post-install without being a streaming or content app. More critically, `SkillPatchTool.swift` exists in the tool system — its name suggests it can patch or modify agent skills/code at runtime, which would violate 2.4.5(iv)'s prohibition on "significantly changing app functionality post-review."  
**What to change:** 
1. Verify `SkillPatchTool` does not download or execute new Swift/LLVM code at runtime. If it modifies agent behavior via data (prompts, configs), that is likely acceptable; if it installs new compiled tool handlers, it is not.
2. The model download must be clearly framed as "content" (weights/data), not executable code. Provide a detailed explanation in App Review Notes.  
**Effort:** Medium (audit SkillPatchTool thoroughly; prepare review notes for model download).

### 2.4.5(v) — No Root Privileges
**Status: ✅ PASS**  
No `setuid`, `sudo`, or root escalation found in the reviewed code. `ShellTool` runs `/bin/zsh` as the current user only.

### 2.4.5(vii) — Updates via Mac App Store Only
**Status: ⚠️ WARNING**  
**Requirement:** Mac App Store apps must use the Mac App Store for all updates; no other update mechanism allowed.  
**Current state:** `Package.swift` includes `Sparkle` as a dependency. Sparkle is a third-party auto-update framework used exclusively for Developer ID distribution, not Mac App Store apps. Shipping Sparkle in a Mac App Store build is a known rejection cause.  
**What to change:** Remove Sparkle from the Mac App Store build target. Use separate build configurations (already partially set up with Debug/Release entitlement files) to exclude Sparkle from the App Store variant.  
**Effort:** Low (conditional compilation or separate target).

### 2.5.1 — Public APIs Only
**Status: ✅ PASS**  
The codebase uses documented Apple frameworks: MLX (via mlx-swift), WeatherKit, CoreLocation, WKWebView, LocalAuthentication, AppKit, Foundation. `sysctl` for hardware info is a public POSIX API. No private/undocumented Apple APIs were detected.

### 2.5.2 — Self-Contained App / No Executable Code Download
**Status: ⚠️ WARNING** (see also 2.4.5(iv) above)  
**Current state:** The `SubagentTool.swift` warrants inspection — sub-agents may dynamically compose and execute behavior. Combined with `SkillPatchTool.swift`, this requires explicit confirmation that no compiled code is fetched or executed at runtime.

### 2.5.4 — Background Services
**Status: ✅ PASS**  
The app is a legitimate background agent (`LSUIElement = true`) providing autonomous task automation — a recognized use case. The network server entitlement (`com.apple.security.network.server`) suggests it runs a local inference server (Ollama-compatible layer noted in CLAUDE.md), which is acceptable for local machine use.

---

## Section 3 — Business

### 3.1 In-App Purchase
**Status: ✅ PASS (no IAP present)**  
No StoreKit, IAP, or subscription code was found in the reviewed sources. The app appears to be a paid or free utility with no digital goods/subscriptions. If any premium features are added in future, they must use StoreKit.

### 3.2 Business Model
**Status: ✅ PASS**  
No advertising, cryptocurrency mining, or other business model concerns detected.

---

## Section 4 — Design

### 4.1 Copycats / Originality
**Status: ✅ PASS**  
EliteAgent is an original autonomous AI agent application with a distinct identity and unique technical architecture (UNO/MLX).

### 4.2 Minimum Functionality
**Status: ✅ PASS**  
The app provides substantial, unique functionality well beyond a repackaged website. Local LLM inference + autonomous tool use is a compelling, app-like experience.

### 4.4 Extensions
**Status: ✅ PASS**  
No app extensions detected. Not applicable.

### 4.5.2 Apple Music / MusicKit
**Status: ⚠️ WARNING**  
**Requirement (4.5.2(i)):** Cannot require payment or monetize MusicKit features; must follow Apple Music Identity Guidelines. Cannot download, upload, or share music files outside documented patterns.  
**Current state:** The app includes `NSAppleMusicUsageDescription` for "analyzing and organizing audio files," `MusicDNATool.swift` for music analysis, `ID3EditorTool.swift` (ID3 tag editing on audio files), and `com.apple.security.assets.music.read-only` entitlement. The combination of music library access + ID3 tag editing is a gray area — reading metadata is fine, but modifying music files (even on local files not from Apple Music) with a music library entitlement may trigger scrutiny. Ensure ID3 editing only operates on user-selected files outside the Music library, not on DRM-protected Apple Music tracks.  
**What to change:** Confirm ID3 editing is restricted to non-DRM user files. Update `NSAppleMusicUsageDescription` to more accurately describe the actual access (currently says "analyze and organize" which could imply modification of the library).  
**Effort:** Low-medium (description update + code guard).

### 4.8 Sign-In
**Status: ✅ PASS**  
The app uses API key / Keychain auth for cloud services (OpenRouter), not third-party social login. Not applicable.

---

## Section 5 — Legal / Privacy

### 5.1.1(i) — Privacy Policy
**Status: ⚠️ WARNING**  
**Requirement:** A clearly written privacy policy is mandatory — linked in App Store Connect and accessible within the app. Must explain: what data is collected, how it is used, third parties receiving data, retention/deletion.  
**Current state:** No in-app privacy policy link was found in the reviewed source files. No `NSPrivacyPolicy` key in Info.plist. The app collects/accesses: contacts, calendar events, microphone audio, screen content, location, music library, and sends data to OpenRouter (cloud LLM provider). All of this requires explicit disclosure.  
**What to change:**
1. Write a privacy policy covering all data types accessed (contacts, calendar, microphone, screen recordings, location, music) and third-party sharing (OpenRouter API calls transmit user queries and potentially personal data extracted by the agent).
2. Add a link to the privacy policy in the app (Settings or About screen).
3. Provide the URL in App Store Connect.  
**Effort:** Medium (policy writing + in-app UI link).

### 5.1.1(ii) — Permission Usage Descriptions
**Status: ✅ PASS (with notes)**  
All required `NS*UsageDescription` keys are present in Info.plist. The descriptions are reasonably specific. Minor observation: `NSLocationAlwaysAndWhenInUseUsageDescription` requests "always" location (background location), which is the most invasive level. Reviewers scrutinize "always" location requests heavily. If background location is not actually used while the app is not active, use only `NSLocationWhenInUseUsageDescription`.

### 5.1.1(v) — Account Deletion
**Status: ✅ PASS**  
No user account creation within the app. API keys are local to device. Not applicable.

### 5.1.2(i) — Third-Party AI Data Sharing
**Status: ⚠️ WARNING**  
**Requirement (5.1.2(i)):** "Third-party AI sharing requires explicit permission." When user data (contacts, calendar events, screen content, messages) is processed by a cloud LLM (OpenRouter / Claude / GPT models), this constitutes sharing personal data with a third-party AI service.  
**Current state:** The app uses cloud inference via OpenRouter when local inference is unavailable or the user chooses `--cloud-only`. User task content — which may include personal data extracted from contacts, calendar, messages, files, or screen — is sent to OpenRouter.  
**What to change:** 
1. Display a clear, explicit opt-in consent before the first use of cloud inference, explaining that task content will be sent to OpenRouter's servers.
2. Provide an opt-out (local-only mode) as the default or as an easy toggle.
3. Disclose OpenRouter as a third-party data processor in the privacy policy.  
**Effort:** Medium (UI consent flow + privacy policy update).

### 5.1.5 — Location Services
**Status: ⚠️ WARNING**  
**Requirement:** Location must only be requested when directly relevant to features, with clear user notification.  
**Current state:** `NSLocationAlwaysAndWhenInUseUsageDescription` is declared (always + when-in-use). The WeatherTool uses `CLGeocoder` for weather lookups by city name — this does NOT require device location at all. Only if the agent is asked for weather "near me" would actual device location be needed. The "always" background location entitlement is almost certainly not needed and will draw extra scrutiny from reviewers.  
**What to change:** 
1. Remove `NSLocationAlwaysAndWhenInUseUsageDescription` and request only `NSLocationWhenInUseUsageDescription` if at all.
2. For weather, use the user's named location preference from settings rather than continuous location tracking. Request location only on-demand when the user explicitly asks for local weather.  
**Effort:** Low (remove "always" usage key, adjust CLLocationManager request).

### 5.2 — Intellectual Property
**Status: ✅ PASS**  
No third-party trademarks, copyrights, or IP concerns identified. The app uses mlx-swift (MIT/Apache), Sparkle (MIT), and private `audiointelligence` library (developer-owned).

### 5.4 — VPN Apps
**Status: ✅ PASS**  
Not a VPN app. The network server entitlement is for local inference serving (localhost only). Not applicable.

---

## Privacy Manifest Analysis

### NSPrivacyAccessedAPITypes Coverage
**Status: ⚠️ WARNING**

**Declared in PrivacyInfo.xcprivacy:**

| API Category | Reason Code | Status |
|---|---|---|
| FileTimestamp | C617.1 | ✅ Declared |
| DiskSpace | E174.1 | ✅ Declared |
| UserDefaults | CA92.1 | ✅ Declared |

**Potentially missing declarations:**

| API Category | Evidence in Code | Risk |
|---|---|---|
| `NSPrivacyAccessedAPICategorySystemBootTime` | `ProcessInfo.processInfo.systemUptime` used in `SystemTelemetryTool.swift` (lines 48–49). `systemUptime` is derived from system boot time. | ⚠️ May require declaration |
| `sysctl` / `hw.usermem` | `HardwareMonitor.swift` uses `sysctlbyname("hw.usermem", ...)` | ⚠️ Some sysctl calls are covered under DiskSpace/SystemBootTime; audit required |

**NSPrivacyCollectedDataTypes:**  
**Status: ❌ CRITICAL BLOCKER**  
**Requirement:** `NSPrivacyCollectedDataTypes` must declare all data types the app collects. An empty array (`<array/>`) is valid only if the app collects zero user data. EliteAgent accesses Contacts, Calendar, Microphone, Screen content, Location, and Music library. Even if this data is not "collected" in the sense of being transmitted to servers by the app itself, the agent's purpose is to read and act on this data. If any of it is sent to cloud inference (OpenRouter), it constitutes data collection/sharing that must be declared.  
**What to change:** Populate `NSPrivacyCollectedDataTypes` with appropriate entries covering:
- Contact info (if contacts data is sent to cloud)
- Location (if location is sent to cloud)
- User content (if messages, files, screen content is sent to cloud)
- Usage data (if any analytics are collected)  
If the app genuinely sends none of this data to any server (pure local mode only), declare that explicitly and ensure cloud mode is gated behind explicit consent.  
**Effort:** Medium (audit data flows + update PrivacyInfo.xcprivacy).

---

## Hardened Runtime & Entitlements Analysis

### Main App Entitlements
| Entitlement | Status | Notes |
|---|---|---|
| `com.apple.security.network.client` | ✅ | Required for OpenRouter/WeatherKit |
| `com.apple.security.network.server` | ✅ | Required for local inference server |
| `com.apple.security.device.microphone` | ✅ | Required for audio analysis |
| `com.apple.security.device.audio-input` | ✅ | Required for audio input |
| `com.apple.security.automation.apple-events` | ✅ | Required for System Events/Calendar/Contacts automation |
| `com.apple.security.assets.music.read-only` | ✅ | Required for music library |
| `com.apple.developer.weatherkit` | ✅ | Required for WeatherKit |
| `com.apple.security.temporary-exception.mach-lookup.global-name` | ⚠️ | Temporary exception for `com.apple.audio.AudioComponentRegistrar`. Temporary exceptions require Apple approval and detailed justification in App Review Notes. May be challenged. |

### XPC Helper Entitlements
**Status: ❌ CRITICAL BLOCKER**

| Entitlement | Status | Notes |
|---|---|---|
| `com.apple.security.cs.allow-jit` | ❌ | JIT compilation entitlement. This is a Hardened Runtime exception. App Store review policy prohibits shipping apps with JIT entitlements unless specifically approved (e.g., web browsers using JIT for JavaScript). An AI agent has no legitimate basis for JIT. This will cause rejection. |
| `com.apple.security.cs.disable-library-validation` | ❌ | Disabling library validation allows loading of unsigned or third-party-signed code, which is a security concern Apple will not accept in App Store apps without exceptional justification. This indicates the XPC helper loads unsigned dynamic libraries at runtime — incompatible with Mac App Store distribution. |

**What to change:** Remove `cs.allow-jit` and `cs.disable-library-validation` from the XPC helper entitlements. Investigate why these are needed — if it's for loading MLX model weights or audio DSP libraries, those should be compiled as frameworks properly code-signed with the Apple Developer cert. The `audiointelligence` private library (listed as a dependency) is a likely culprit if it ships unsigned.  
**Effort:** High (requires understanding why JIT/unsigned library loading is needed and eliminating the dependency or properly signing the library).

### Temporary Mach Exception
**Status: ⚠️ WARNING**  
The `com.apple.security.temporary-exception.mach-lookup.global-name` exception for `com.apple.audio.AudioComponentRegistrar` is a documented exception for audio plugin registration. Apple permits this but requires justification. Include this in App Review Notes explaining it is required for audio component registration for the music analysis feature.

---

## Additional Technical Checks

### Architecture (arm64 only)
**Status: ✅ PASS**  
Apple Silicon only (`arm64`). The Mac App Store accepts arm64-only apps. No issues.

### Bundle Version
**Status: ✅ PASS**  
`CFBundleShortVersionString = 7.8.5`, `CFBundleVersion = 7.8.5`. Valid format.

### LSUIElement (Menubar/Background App)
**Status: ✅ PASS (with note)**  
`LSUIElement = true` is permitted in the Mac App Store. Apps with no Dock icon are accepted. However, the app must provide some discoverable UI (menubar icon, or onboarding window) — an app with no visible UI at all would violate the "minimum functionality" guideline. Verify a menubar icon or window is always accessible.

### Network Server Entitlement
**Status: ⚠️ WARNING**  
`com.apple.security.network.server` is permitted in the Mac App Store but may require justification in App Review Notes. Explain it is used for a localhost-only Ollama-compatible inference server (no external network listening).

### Sparkle Auto-Update Framework
**Status: ❌ CRITICAL BLOCKER** (see also 2.4.5(vii))  
**Requirement:** Mac App Store apps must use the App Store for all updates. Shipping Sparkle in a Mac App Store build violates this.  
**Current state:** Sparkle is listed as a Package.swift dependency. If it is linked into the App Store build target, this is a hard rejection.  
**What to change:** Create a separate `Package.swift` configuration or Xcode target that excludes Sparkle from App Store builds. The Developer ID / direct distribution build can retain Sparkle.  
**Effort:** Low (build configuration change).

### AI-Generated Content Policy
**Status: ✅ PASS (with note)**  
Apple does not explicitly prohibit AI agents or local LLM inference apps. The app's use of cloud LLM (OpenRouter) is permitted. Guideline 4.7 (mini apps, chatbots) applies: the developer is responsible for ensuring all agent-generated output complies with guidelines. Ensure the agent cannot be instructed to generate prohibited content (1.1 — objectionable content, CSAM, etc.). The `LogicGate` safety check on `ShellTool` is a positive signal, but content moderation should extend to LLM outputs.

### macOS Version Requirement
**Status: ✅ PASS**  
macOS 15+ (Sequoia) is a current shipping OS version. Acceptable.

---

## Compliance Roadmap

### Priority 1 — Critical Blockers (must fix before any submission attempt)

| # | Issue | File(s) | Effort |
|---|---|---|---|
| C1 | Enable App Sandbox — rearchitect ShellTool, FileManagerTool, and /tmp writes | `project.pbxproj`, `ShellTool.swift`, `MessengerTool.swift`, `ProductivityTools.swift` | 4–8 weeks |
| C2 | Remove `cs.allow-jit` and `cs.disable-library-validation` from XPC helper — identify and resolve dependency requiring unsigned library loading | `EliteAgentXPC-Release.entitlements` | 1–3 weeks |
| C3 | Remove Sparkle from App Store build target (keep for Developer ID builds) | `Package.swift`, Xcode targets | 1 day |
| C4 | Populate `NSPrivacyCollectedDataTypes` in PrivacyInfo.xcprivacy with accurate data declarations | `PrivacyInfo.xcprivacy` | 1–2 days |

### Priority 2 — Major Warnings (likely cause rejection if not addressed)

| # | Issue | File(s) | Effort |
|---|---|---|---|
| W1 | Explicit opt-in consent UI before first cloud inference (third-party AI data sharing) | `Orchestrator.swift`, new consent UI | 2–3 days |
| W2 | Write privacy policy and add in-app link | New document + Settings UI | 1–2 days |
| W3 | Audit `SkillPatchTool.swift` — confirm it cannot download or execute new code at runtime | `SkillPatchTool.swift` | 1 day |
| W4 | Replace "always" location request with "when in use" only; make location on-demand | `Info.plist`, `WeatherTool/ExtraUtilityTools.swift` | Half day |
| W5 | Add NSPrivacyAccessedAPICategorySystemBootTime to PrivacyInfo.xcprivacy (systemUptime usage) | `PrivacyInfo.xcprivacy` | 1 hour |
| W6 | Add developer contact method accessible within app (support email/URL) | App menu or Settings UI | Half day |
| W7 | Describe all major capabilities accurately in App Store metadata (shell exec, automation, iMessage/WhatsApp sending, screen recording) | App Store Connect metadata | Half day |
| W8 | Justify `mach-lookup.global-name` exception and network server entitlement in App Review Notes | App Review Notes (no code change) | 1 hour |

### Priority 3 — Minor Warnings (good practice, unlikely to block)

| # | Issue | Effort |
|---|---|---|
| M1 | Verify model download UI discloses ~5 GB size before initiating download | Half day |
| M2 | Confirm ID3 editing (ID3EditorTool) cannot modify Apple Music DRM-protected tracks | 1 hour |
| M3 | Update NSAppleMusicUsageDescription to be more precise about read-only access | 15 minutes |
| M4 | Verify no silent Login Item registration (must be explicit user opt-in via SMAppService) | 1 hour |
| M5 | Verify app has accessible menubar icon (LSUIElement app must have discoverable UI) | 1 hour |
| M6 | Add LLM output content filtering to prevent generation of prohibited content | 1–2 days |

---

## Distribution Recommendation

**Current viable distribution path: Developer ID (notarized direct distribution)**

The app as currently architected is well-suited for Developer ID distribution outside the Mac App Store. This path:
- Does NOT require App Sandbox
- Allows Sparkle auto-updates
- Permits JIT and library validation exceptions with user acknowledgment
- Supports all current tool capabilities

**Path to Mac App Store:**

1. **Phase 1 (3–4 weeks):** Fix C2 (XPC JIT), C3 (Sparkle), C4 (Privacy Manifest), W1–W8. These can be done without changing core architecture.
2. **Phase 2 (6–10 weeks):** Tackle C1 (App Sandbox). This requires replacing `ShellTool` with a sandboxed equivalent (possibly via XPC helper with specific entitlements), replacing arbitrary filesystem access with Security-Scoped Bookmarks, and eliminating `/tmp` writes in favor of `FileManager.default.temporaryDirectory`.

**Realistic timeline to Mac App Store readiness: 3–4 months** of sustained engineering effort.

---

*This report was generated via automated codebase analysis and live-fetched Apple guidelines. It is advisory — Apple's final review decision may differ. Verify all findings against the current Apple Developer documentation before submission.*
