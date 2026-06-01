# macOS Onboarding & Permission Request Guide

**Research date:** 2026-05-21  
**Sources:** Apple HIG, Apple Developer Documentation, WWDC17/22/23/24 sessions, Apple Tech Notes

---

## Table of Contents

1. [Apple HIG — Onboarding](#1-apple-hig--onboarding)
2. [Apple HIG — Requesting Permissions](#2-apple-hig--requesting-permissions)
3. [macOS System Permission APIs](#3-macos-system-permission-apis)
4. [Standard macOS First-Launch Patterns](#4-standard-macos-first-launch-patterns)
5. [App Store & Notarization Requirements](#5-app-store--notarization-requirements)
6. [System Settings Deep-Link URL Schemes](#6-system-settings-deep-link-url-schemes)
7. [Implementation Reference](#7-implementation-reference)

---

## 1. Apple HIG — Onboarding

### Core Philosophy (WWDC17 "Love at First Launch")

Apple's overriding principle is: **lead with value, not with gates.** The WWDC17 session uses the metaphor of a demanding landlord asking for a passport, birth certificate, and pay stubs before letting you view an apartment — that is what an app that opens with a login wall, terms screen, and four permission requests feels like.

> "Always lead with great content. Show off what makes your app great right off the bat and let people dig in."
> — WWDC17, Session 816

> "People have access to millions of apps in the App Store. You've already passed the first hurdle when someone installs your app. Now you have to prevent them from backing out and deleting your app."
> — WWDC17, Session 816

### What Apple Says About First-Launch Experiences

From the HIG (Onboarding pattern page) and WWDC sessions:

**DO:**
- Show value and content immediately on first launch — no barriers
- Keep onboarding brief, enjoyable, and optional
- Teach through interactive experience, not static instruction slides
- Use progressive disclosure: teach one concept at a time, advance only after user demonstrates competency
- Provide a dedicated "How to Play" / "Help" reference that users can return to at any time
- Use multiple short, contextual tutorials rather than one long upfront tutorial
- Strive for interfaces so intuitive that no upfront instruction is needed at all

**DO NOT:**
- Greet users with login/registration screens before they see value
- Show splash screens, EULA agreements, or disclaimers as the first screen (put these on the App Store product page instead)
- Request reviews, ratings, or push notification opt-ins during onboarding
- Present all permissions upfront at launch
- Show non-core information (daily challenges, leaderboards, tournaments) during initial onboarding
- Re-show the tutorial after a user has dismissed or skipped it
- Assume the user knows things they haven't been taught

**On Tutorials / Multi-Step Flows:**
- Provide a **skip option** at the start of any introductory sequence
- If a user skips on first launch, **do not present it again** on subsequent launches
- Make it easy to find tutorials later (in a help menu, settings, or dedicated button)
- The Clash Royale model (five short tutorials, each adding complexity) is cited as exemplary

### How Many Steps/Pages?

Apple does not specify a maximum step count in the HIG. The guidance is qualitative:
- "Brief and enjoyable" — err on the side of fewer
- Each step should teach exactly one thing
- Stop onboarding as soon as the user can be self-directed
- For permission-heavy apps: address permissions **just-in-time** (see Section 2), which naturally spreads them across normal usage rather than stacking them in a wizard

### Progressive Disclosure Principles

1. **Begin simple.** Introduce only the core action on step 1.
2. **Require competency before advancing.** Let the user perform the action, then unlock the next concept.
3. **Earlier tutorials are more guided; later ones challenge the user to apply knowledge independently.**
4. **Contextual tips** (floating overlays, coach marks) at the moment of first use are preferred over front-loaded slides.
5. **Non-core features** (power user settings, advanced configuration) belong in Settings, not onboarding.

### What Should NOT Be in Onboarding

| Item | Reason |
|------|---------|
| License agreements / terms of service | App Store displays these before download |
| Rating/review prompts | Premature; user has no opinion yet |
| Push notification opt-in | HIG: ask only when user triggers a feature that needs it |
| Account creation | Show value first; let registration be triggered by a specific action |
| All permission requests at once | Overwhelming; grant rates drop; HIG requires just-in-time |
| Splash screens with no content | Pure delay with no value |
| Marketing copy about the app | User already downloaded it |

---

## 2. Apple HIG — Requesting Permissions

### The Foundational Rule: Just-in-Time, Not Upfront

> "The app requests permissions on a need-to-know basis. So you retain a sense of control over both the experience and your private data."
> — WWDC17, Session 816 (describing Strava's exemplary approach)

The HIG (Privacy page) states explicitly:

- **Request personal data only when your app clearly needs it.**
- **Request permission at launch only when necessary for your app to function** — i.e., only when the feature in question is the entire core purpose of the app (example: a navigation app requesting location at first launch is acceptable because without it the app is useless).
- **For all other permissions: ask when the user triggers the feature that needs the data, not before.**

The concrete Strava example from WWDC17:
- Location permission → asked when user taps "Record a Ride"
- Camera permission → asked when user taps "Add Photo to Ride"
- Contacts permission → asked when user opens "Find Friends"

Result: users feel in control, grant rates are higher, and the permission prompt has obvious context.

### When It Is Acceptable to Request at Launch

A permission may be requested at launch if:
1. The app **cannot function at all** without it (e.g., a transit app that is entirely location-driven)
2. **Immediately after granting**, the app visibly demonstrates the benefit (the transit map zooms to show nearby routes)

### How to Frame Permission Requests (Purpose Strings)

The system alert shows your `NSxxxUsageDescription` string. Apple's rules:

- **Short and specific.** Usually one or two sentences maximum.
- **Use sentence case** (capitalize only the first word).
- **Be polite** — never pressure or alarm the user.
- **Omit the app name** — the system already shows it.
- **Include concrete examples** of how the data benefits the user.
- **Do not replicate the system alert UI** with a pre-prompt screen that looks like a system dialog.

Good example:
> "EliteAgent uses your microphone to transcribe voice commands and generate audio notes."

Bad example:
> "ELITEAGENT REQUIRES MICROPHONE ACCESS. Please tap Allow or the app will not function."

### What Apple Says About Requesting Multiple Permissions at Once

The HIG does not explicitly ban multi-permission onboarding pages, but the just-in-time principle makes them incompatible with good practice. The pattern of presenting a permission list page at launch (e.g., "Grant these 5 permissions to get started") conflicts with two HIG rules:
1. Don't request permissions before the user understands why
2. Don't present all permissions upfront

**If you do need a permissions setup page** (e.g., for an agent/automation tool where several permissions are core to the app's function), the HIG guidance supports requesting them only if:
- Each permission is clearly linked to a specific feature the user is about to use
- The user can skip or defer each individual one
- Denied permissions degrade gracefully with an offer to re-request later

### What to Do When Permission Is Denied

- **Never re-present the system alert for a denied permission.** The system will not show it again; calling the request API after denial is a no-op.
- Provide a **graceful degraded experience** without the denied permission.
- Offer an obvious path to Settings to grant it later: use the System Settings deep-link URLs (Section 6).
- Use an in-app banner or contextual prompt at the relevant feature entry point.

### Required Privacy Usage Description Strings (Info.plist)

All of these must be present in `Info.plist` **before** the relevant API is called, or the app will crash/terminate:

| Permission | Info.plist Key | Notes |
|---|---|---|
| Contacts | `NSContactsUsageDescription` | Required for `CNContactStore` |
| Calendar (full access) | `NSCalendarsFullAccessUsageDescription` | macOS 14+ / iOS 17+; replaces old key |
| Calendar (write-only) | `NSCalendarsWriteOnlyAccessUsageDescription` | macOS 14+ / iOS 17+; for add-only access |
| Reminders (full) | `NSRemindersFullAccessUsageDescription` | macOS 14+ / iOS 17+ |
| Microphone | `NSMicrophoneUsageDescription` | Required for `AVCaptureDevice` audio |
| Camera | `NSCameraUsageDescription` | Required for `AVCaptureDevice` video |
| Photos Library | `NSPhotoLibraryUsageDescription` | Read access to photo library |
| Photos Add-Only | `NSPhotoLibraryAddUsageDescription` | Write-only photo access |
| Location (always) | `NSLocationAlwaysAndWhenInUseUsageDescription` | |
| Location (in use) | `NSLocationWhenInUseUsageDescription` | |
| Accessibility | `NSAccessibilityUsageDescription` | Hardened Runtime apps must declare this |
| Apple Events | `NSAppleEventsUsageDescription` | Required for scripting other apps |
| Screen Recording | No Info.plist key | Controlled entirely via TCC; no usage string |
| Full Disk Access | No Info.plist key | Controlled entirely via TCC; no usage string |
| Bluetooth | `NSBluetoothAlwaysUsageDescription` | macOS 12+ |
| Speech Recognition | `NSSpeechRecognitionUsageDescription` | |
| Focus | `NSFocusStatusUsageDescription` | |

> **Note on legacy Calendar key:** `NSCalendarsUsageDescription` is the old key (pre-macOS 14 / pre-iOS 17) and is deprecated. Apps targeting macOS 14+ must use the new granular keys. If you need to support macOS 13 and earlier as well, include both the old and new keys.

---

## 3. macOS System Permission APIs

### 3.1 Contacts — CNContactStore

**Framework:** Contacts  
**Info.plist key:** `NSContactsUsageDescription`  
**Sandbox entitlement:** `com.apple.security.personal-information.addressbook`

```swift
import Contacts

func requestContactsAccess() async {
    let store = CNContactStore()
    let status = CNContactStore.authorizationStatus(for: .contacts)
    
    switch status {
    case .notDetermined:
        do {
            let granted = try await store.requestAccess(for: .contacts)
            // handle granted/denied
        } catch {
            // handle error
        }
    case .authorized:
        // already granted
    case .denied, .restricted:
        // guide user to System Settings
    @unknown default:
        break
    }
}
```

**Authorization status enum:** `CNAuthorizationStatus` — `.notDetermined`, `.restricted`, `.denied`, `.authorized`

**Key behavior:**
- Calling `requestAccess(for:)` when status is `.denied` does nothing (system won't prompt again)
- The `async` overload (`requestAccess(for:) async throws`) is available in Swift 5.5+ / macOS 12+
- Completion-handler overload available for earlier targets

---

### 3.2 Calendar — EKEventStore (macOS 14+ API)

**Framework:** EventKit  
**Info.plist keys (macOS 14+):**
- Full access: `NSCalendarsFullAccessUsageDescription`
- Write-only: `NSCalendarsWriteOnlyAccessUsageDescription`

**Sandbox entitlement:** `com.apple.security.personal-information.calendars`

**CRITICAL:** The old `requestAccess(to: .event)` and `requestAccess(to:completion:)` are **deprecated in macOS 14 / iOS 17** and do NOT prompt the user — they throw an error instead. Use the new granular APIs:

```swift
import EventKit

// Three levels of access:
// 1. No access — user must use EventKitUI pickers or Siri suggestions
// 2. Write-only — app can CREATE events but cannot read existing ones
// 3. Full access — app can read, write, and manage calendars

let store = EKEventStore()

// Check current status
let status = EKEventStore.authorizationStatus(for: .event)
// EKAuthorizationStatus: .notDetermined, .restricted, .denied, .fullAccess, .writeOnly

// Request full access (read + write)
func requestFullCalendarAccess() async throws {
    try await store.requestFullAccessToEvents()
}

// Request write-only access (add events only)
func requestWriteOnlyCalendarAccess() async throws {
    try await store.requestWriteOnlyAccessToEvents()
}
```

**EKAuthorizationStatus cases (macOS 14+):**
- `.notDetermined` — not yet asked
- `.restricted` — system policy prevents access (e.g., parental controls)
- `.denied` — user denied
- `.fullAccess` — full read/write granted
- `.writeOnly` — add-only granted

**Principle of least privilege:** Request write-only access unless you actually need to read existing events. With write-only, the app cannot read the calendar list, read existing events (even its own), or create new calendars.

---

### 3.3 Screen Recording — CGRequestScreenCaptureAccess

**Framework:** CoreGraphics  
**Info.plist key:** None required  
**Entitlement:** None (controlled by TCC; cannot be pre-approved via entitlement)

```swift
import CoreGraphics

// Check without prompting
func hasScreenRecordingPermission() -> Bool {
    return CGPreflightScreenCaptureAccess()
}

// Request permission (opens System Settings prompt if not already granted)
// IMPORTANT: Does NOT wait for user response — returns immediately
func requestScreenRecordingPermission() {
    CGRequestScreenCaptureAccess()
}
```

**Critical behavior notes:**
- `CGPreflightScreenCaptureAccess()` — check only, never triggers the TCC prompt or adds app to list
- `CGRequestScreenCaptureAccess()` — triggers the system to add your app to the Screen Recording list and shows a prompt; returns immediately without waiting
- Call `CGRequestScreenCaptureAccess()` at app startup (before the user needs it) so the app appears in Privacy & Security > Screen Recording
- `CGPreflightScreenCaptureAccess()` was deprecated in macOS 15.1 (Sequoia) for some use cases; prefer ScreenCaptureKit for new code
- **Modern alternative:** Use `ScreenCaptureKit` — `SCShareableContent` APIs require Screen Recording permission and handle the TCC check internally

**To check status after requesting:**
```swift
// Poll or use app activation notification since there's no callback
NotificationCenter.default.addObserver(
    forName: NSApplication.didBecomeActiveNotification,
    object: nil,
    queue: .main
) { _ in
    let granted = CGPreflightScreenCaptureAccess()
    // update UI accordingly
}
```

---

### 3.4 Accessibility — AXIsProcessTrustedWithOptions

**Framework:** ApplicationServices  
**Info.plist key:** `NSAccessibilityUsageDescription` (required for Hardened Runtime apps)  
**Entitlement:** `com.apple.security.accessibility` (for sandboxed apps)

> **Note:** Accessibility permission cannot be granted to sandboxed Mac App Store apps in the traditional sense. This permission is primarily for Developer ID / direct-distribution apps.

```swift
import ApplicationServices

// Check if trusted (no prompt)
func isAccessibilityTrusted() -> Bool {
    return AXIsProcessTrusted()
}

// Check and optionally prompt / open System Settings
func requestAccessibilityPermission(prompt: Bool = true) -> Bool {
    let options: NSDictionary = [
        kAXTrustedCheckOptionPrompt.takeUnretainedValue() as String: prompt
    ]
    return AXIsProcessTrustedWithOptions(options)
}

// Open Accessibility pane in System Settings directly
func openAccessibilitySettings() {
    if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility") {
        NSWorkspace.shared.open(url)
    }
}
```

**Behavior notes:**
- `AXIsProcessTrustedWithOptions([kAXTrustedCheckOptionPrompt: true])` opens System Settings to Accessibility pane on first call when not trusted, and returns `false`
- After the user grants permission, the function returns `true`
- Signing with a Developer ID certificate ensures the system recognizes it as the same app across builds (permission persists)
- To monitor for the user granting permission, observe `NSApplication.didBecomeActiveNotification` and re-check `AXIsProcessTrusted()`

**Info.plist (required for Hardened Runtime):**
```xml
<key>NSAccessibilityUsageDescription</key>
<string>EliteAgent uses accessibility features to observe and control other applications on your behalf.</string>
```

---

### 3.5 Full Disk Access — No Programmatic API

**Info.plist key:** None  
**Entitlement:** None available for this TCC category via standard API

Full Disk Access (FDA) **cannot be requested programmatically.** Apple intentionally provides no API for this. There is no `CGRequestFullDiskAccess()` or equivalent.

**How to handle:**

1. **Detection (heuristic):** Try accessing a known TCC-protected path. If it succeeds, FDA is granted.
   ```swift
   func hasFullDiskAccess() -> Bool {
       let testPath = NSHomeDirectory() + "/Library/Application Support/com.apple.TCC/TCC.db"
       return FileManager.default.isReadableFile(atPath: testPath)
   }
   ```
   > This is an unofficial heuristic. Apple does not provide an official API. Some apps use the `FullDiskAccess` Swift package (by inket) which formalizes this check.

2. **Guiding the user:**
   ```swift
   func openFullDiskAccessSettings() {
       if let url = URL(string: "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles") {
           NSWorkspace.shared.open(url)
       }
   }
   ```

3. **In onboarding:** Instruct the user to go to System Settings > Privacy & Security > Full Disk Access, then toggle your app on. Use a visual guide (screenshot or animation) showing the exact path.

4. **Important:** On macOS 10.15+, **calling `hasFullDiskAccess()` may automatically add your app to the Full Disk Access list in an unchecked state** — which is actually desirable, as the user can then simply toggle it on.

---

### 3.6 Microphone — AVCaptureDevice

**Framework:** AVFoundation  
**Info.plist key:** `NSMicrophoneUsageDescription`  
**Sandbox entitlement:** `com.apple.security.device.microphone`

```swift
import AVFoundation

// Check current authorization status
func microphoneAuthorizationStatus() -> AVAuthorizationStatus {
    return AVCaptureDevice.authorizationStatus(for: .audio)
}

// Request access (async/await)
func requestMicrophoneAccess() async -> Bool {
    return await AVCaptureDevice.requestAccess(for: .audio)
}

// Request access (completion handler)
func requestMicrophoneAccess(completion: @escaping (Bool) -> Void) {
    AVCaptureDevice.requestAccess(for: .audio, completionHandler: completion)
}
```

**AVAuthorizationStatus cases:** `.notDetermined`, `.restricted`, `.denied`, `.authorized`

**Key behavior:**
- The completion handler / `async` return value reflects the immediate user decision
- If already `.authorized` or `.denied`, calling `requestAccess` returns the existing status immediately without re-prompting
- For camera, substitute `.audio` with `.video` and use `NSCameraUsageDescription`

---

### 3.7 Permission Status Summary Table

| Permission | API to check | API to request | Can request programmatically | Info.plist key |
|---|---|---|---|---|
| Contacts | `CNContactStore.authorizationStatus(for:)` | `store.requestAccess(for:)` | Yes | `NSContactsUsageDescription` |
| Calendar (full) | `EKEventStore.authorizationStatus(for: .event)` | `store.requestFullAccessToEvents()` | Yes (macOS 14+) | `NSCalendarsFullAccessUsageDescription` |
| Calendar (write) | `EKEventStore.authorizationStatus(for: .event)` | `store.requestWriteOnlyAccessToEvents()` | Yes (macOS 14+) | `NSCalendarsWriteOnlyAccessUsageDescription` |
| Microphone | `AVCaptureDevice.authorizationStatus(for: .audio)` | `AVCaptureDevice.requestAccess(for: .audio)` | Yes | `NSMicrophoneUsageDescription` |
| Camera | `AVCaptureDevice.authorizationStatus(for: .video)` | `AVCaptureDevice.requestAccess(for: .video)` | Yes | `NSCameraUsageDescription` |
| Screen Recording | `CGPreflightScreenCaptureAccess()` | `CGRequestScreenCaptureAccess()` | Partial (no callback) | None |
| Accessibility | `AXIsProcessTrusted()` | `AXIsProcessTrustedWithOptions([prompt: true])` | Opens System Settings | `NSAccessibilityUsageDescription` |
| Full Disk Access | Heuristic file read | No API — guide user manually | No | None |

---

## 4. Standard macOS First-Launch Patterns

### 4.1 Tracking First Launch with NSUserDefaults / @AppStorage

The standard pattern is checking for the absence of a flag key:

```swift
// Using @AppStorage (SwiftUI) — recommended
@AppStorage("hasCompletedOnboarding") private var hasCompletedOnboarding = false

// In the App body:
var body: some Scene {
    WindowGroup {
        if hasCompletedOnboarding {
            ContentView()
        } else {
            OnboardingView()
        }
    }
}
```

```swift
// Using UserDefaults (UIKit / AppKit compatible)
extension UserDefaults {
    static let hasCompletedOnboardingKey = "hasCompletedOnboarding"
    
    var hasCompletedOnboarding: Bool {
        get { bool(forKey: Self.hasCompletedOnboardingKey) }
        set { set(newValue, forKey: Self.hasCompletedOnboardingKey) }
    }
}

// On first launch, the key does not exist, bool(forKey:) returns false
// Set to true when onboarding completes:
UserDefaults.standard.hasCompletedOnboarding = true
```

**Important caveats for macOS:**
- UserDefaults does NOT persist across app deletion/reinstallation (unlike iOS Keychain)
- If persistence across reinstalls is needed (e.g., for license acceptance), use the Keychain
- On macOS, UserDefaults are stored per-app in `~/Library/Preferences/com.yourcompany.yourapp.plist`
- Avoid using UserDefaults for any values that must be synchronized across multiple processes/actors in the same app without proper synchronization

### 4.2 macOS Window Presentation Pattern for Onboarding

**Recommended approach for SwiftUI macOS apps:**

```swift
@main
struct EliteAgentApp: App {
    @AppStorage("hasCompletedOnboarding") private var hasCompletedOnboarding = false
    
    var body: some Scene {
        WindowGroup("EliteAgent") {
            Group {
                if hasCompletedOnboarding {
                    ContentView()
                } else {
                    OnboardingView(onComplete: {
                        hasCompletedOnboarding = true
                    })
                }
            }
        }
        .windowStyle(.hiddenTitleBar)
        .windowResizability(.contentSize)
    }
}
```

**Alternative: Sheet over content (for lighter onboarding like "What's New"):**
```swift
// Present onboarding as a sheet when version changes
@AppStorage("lastSeenVersion") private var lastSeenVersion = ""

ContentView()
    .sheet(isPresented: $showOnboarding) {
        WhatsNewView()
    }
    .onAppear {
        let currentVersion = Bundle.main.shortVersionString ?? ""
        if lastSeenVersion != currentVersion {
            showOnboarding = true
            lastSeenVersion = currentVersion
        }
    }
```

### 4.3 What Apple's Own Apps Do

**Shortcuts app:** Opens directly to the library; no onboarding. A "Get Started" gallery is available in the sidebar for discovery.

**Reminders:** Opens to the list view immediately; no onboarding. Creates a default "Reminders" list on first launch.

**Notes:** Opens to an empty note or creates a "Welcome to Notes" sample note on first launch.

**Common patterns in Apple's own apps:**
1. **No blocking first-launch screen.** Content appears immediately.
2. **Sample/default content** is created to demonstrate the UI in context (Reminders default list, Notes welcome note).
3. **iCloud setup** is handled by the OS at OS-level setup, not per-app.
4. **Permissions are requested inline** when the user triggers the relevant feature.

### 4.4 Third-Party App Patterns (Bear, Notion, Spark)

These apps represent the "setup wizard" model — more opinionated but Apple-compliant if done well:

**Bear (notes app):**
- No blocking onboarding wall
- First launch shows a "Welcome to Bear" note in the editor (content-first)
- iCloud sync permission requested naturally by the OS

**Notion:**
- Web-auth flow only (account required); desktop app is essentially a web wrapper
- Not a good model for native macOS onboarding

**Spark (email):**
- Account setup is mandatory (app has no value without email) — so this is a legitimate launch-time request
- Permission for notifications deferred until after account setup and first email is viewed

**The pattern behind these:** Even when setup is required, show a **preview of the finished experience** before completing setup. Let users understand what they're setting up.

---

## 5. App Store & Notarization Requirements

### 5.1 PrivacyInfo.xcprivacy — Privacy Manifest

**Added to Xcode 15; enforcement began May 1, 2024 for App Store submissions.**

Every app and SDK must include a `PrivacyInfo.xcprivacy` file (a property list) describing data collection and API usage.

**Top-level keys:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <!-- Required if you use tracking APIs -->
    <key>NSPrivacyTracking</key>
    <false/>
    
    <!-- Domains used for tracking (if NSPrivacyTracking = true) -->
    <key>NSPrivacyTrackingDomains</key>
    <array/>
    
    <!-- Required Reason APIs (iOS/tvOS/watchOS/visionOS only, NOT macOS as of 2024) -->
    <key>NSPrivacyAccessedAPITypes</key>
    <array>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryUserDefaults</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>CA92.1</string><!-- Reading/writing user preferences -->
            </array>
        </dict>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryFileTimestamp</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>C617.1</string><!-- File timestamp needed for app logic -->
            </array>
        </dict>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategoryDiskSpace</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>E174.1</string><!-- Check disk space before large file operations -->
            </array>
        </dict>
        <dict>
            <key>NSPrivacyAccessedAPIType</key>
            <string>NSPrivacyAccessedAPICategorySystemBootTime</string>
            <key>NSPrivacyAccessedAPITypeReasons</key>
            <array>
                <string>35F9.1</string><!-- Calculate time intervals for performance -->
            </array>
        </dict>
    </array>
    
    <!-- Data types collected -->
    <key>NSPrivacyCollectedDataTypes</key>
    <array>
        <!-- Add entries for each data type your app collects -->
    </array>
</dict>
</plist>
```

> **macOS-specific note:** As of 2024, `NSPrivacyAccessedAPITypes` (Required Reason APIs) enforcement applies to iOS, iPadOS, tvOS, visionOS, and watchOS, but **not macOS.** However, including it in your manifest is harmless and future-proofs your app.

### 5.2 Required Reason API Categories

These four categories always require declared reasons in `NSPrivacyAccessedAPITypes` (for applicable platforms):

| Category | String | Common APIs |
|---|---|---|
| File Timestamps | `NSPrivacyAccessedAPICategoryFileTimestamp` | `FileManager` attribute queries |
| System Boot Time | `NSPrivacyAccessedAPICategorySystemBootTime` | `ProcessInfo.processInfo.systemUptime`, `mach_absolute_time()` |
| Disk Space | `NSPrivacyAccessedAPICategoryDiskSpace` | `URLResourceKey.volumeAvailableCapacityKey` |
| User Defaults | `NSPrivacyAccessedAPICategoryUserDefaults` | `UserDefaults` read/write |

### 5.3 Sandbox Entitlements Required for Permissions

If your app is **sandboxed** (required for Mac App Store), add these entitlements to your `.entitlements` file:

```xml
<!-- Contacts -->
<key>com.apple.security.personal-information.addressbook</key>
<true/>

<!-- Calendar -->
<key>com.apple.security.personal-information.calendars</key>
<true/>

<!-- Photos Library -->
<key>com.apple.security.personal-information.photos-library</key>
<true/>

<!-- Microphone -->
<key>com.apple.security.device.microphone</key>
<true/>

<!-- Camera -->
<key>com.apple.security.device.camera</key>
<true/>

<!-- Location -->
<key>com.apple.security.personal-information.location</key>
<true/>

<!-- Bluetooth -->
<key>com.apple.security.device.bluetooth</key>
<true/>

<!-- Apple Events (for scripting other apps) -->
<key>com.apple.security.automation.apple-events</key>
<true/>
```

> **Accessibility and Screen Recording** do not have sandbox entitlements that grant them — they are always TCC-controlled regardless of sandbox status. Accessibility is generally incompatible with the Mac App Store sandbox.

> **Full Disk Access** has no entitlement either. Sandboxed apps cannot have FDA; it is only available for non-sandboxed (Developer ID) apps.

### 5.4 Notarization Requirements

For Developer ID (non-App Store) distribution, notarization requires:

1. **Hardened Runtime** must be enabled
2. **No unsigned or ad-hoc signed code** in the bundle
3. **Required entitlements** for any restricted capabilities (scripting, JIT, etc.)
4. **No private API usage**
5. **`PrivacyInfo.xcprivacy`** — required for App Store; strongly recommended for notarization

When using Hardened Runtime with restricted features, add exception entitlements:

```xml
<!-- Allow JIT compilation (e.g., for JavaScript engines) -->
<key>com.apple.security.cs.allow-jit</key>
<true/>

<!-- Allow unsigned executable memory -->
<key>com.apple.security.cs.allow-unsigned-executable-memory</key>
<true/>

<!-- Disable library validation (needed for some plugins) -->
<key>com.apple.security.cs.disable-library-validation</key>
<true/>
```

---

## 6. System Settings Deep-Link URL Schemes

Use `NSWorkspace.shared.open(url)` with these URLs to direct users to specific System Settings panes after a permission is denied.

```swift
func openSystemSettings(for permission: Permission) {
    let urlString: String
    switch permission {
    case .accessibility:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_Accessibility"
    case .screenRecording:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_ScreenCapture"
    case .fullDiskAccess:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_AllFiles"
    case .microphone:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_Microphone"
    case .camera:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_Camera"
    case .contacts:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_Contacts"
    case .calendar:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_Calendars"
    case .reminders:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_Reminders"
    case .photos:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_Photos"
    case .location:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_LocationServices"
    case .inputMonitoring:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_ListenEvent"
    case .speechRecognition:
        urlString = "x-apple.systempreferences:com.apple.preference.security?Privacy_SpeechRecognition"
    }
    
    guard let url = URL(string: urlString) else { return }
    NSWorkspace.shared.open(url)
}
```

**Complete Privacy & Security deep-link table (verified through macOS Sequoia 15.2):**

| Setting | URL Anchor |
|---|---|
| Full Privacy & Security | `com.apple.preference.security` |
| Accessibility | `?Privacy_Accessibility` |
| All Files (Full Disk Access) | `?Privacy_AllFiles` |
| App Management | `?Privacy_AppBundles` |
| Automation | `?Privacy_Automation` |
| Bluetooth | `?Privacy_Bluetooth` |
| Calendar | `?Privacy_Calendars` |
| Camera | `?Privacy_Camera` |
| Contacts | `?Privacy_Contacts` |
| Developer Tools | `?Privacy_DevTools` |
| Files and Folders | `?Privacy_ApplicationData` |
| Focus | `?Privacy_UserTracking` |
| Full Disk Access | `?Privacy_AllFiles` |
| HomeKit | `?Privacy_HomeKit` |
| Input Monitoring | `?Privacy_ListenEvent` |
| Location Services | `?Privacy_LocationServices` |
| Media & Apple Music | `?Privacy_Media` |
| Microphone | `?Privacy_Microphone` |
| Motion & Fitness | `?Privacy_Motion` |
| Photos | `?Privacy_Photos` |
| Reminders | `?Privacy_Reminders` |
| Screen Recording | `?Privacy_ScreenCapture` |
| Speech Recognition | `?Privacy_SpeechRecognition` |
| System Events | `?Privacy_SystemPolicySysAdminFiles` |

> **Version note:** These URL anchors use the `com.apple.preference.security?` prefix which has been stable through macOS Monterey, Ventura, Sonoma, and Sequoia. Apple does not officially document these and they can change between major OS versions. Test on each new macOS release. An alternative new format seen in macOS 14+ is `com.apple.settings.PrivacySecurity.extension?Privacy_*` — both currently work.

---

## 7. Implementation Reference

### 7.1 Recommended Onboarding Architecture for EliteAgent

Given that EliteAgent is an autonomous agent that needs several permissions to function, the recommended approach is a **lightweight permission setup page** at first launch — justified because multiple permissions are core to the app's function, not incidental features.

**Principles to follow:**
1. Show a brief value proposition screen first (what EliteAgent can do for you), then the permissions page
2. Each permission card explains exactly what feature it enables
3. All permissions are individually skippable (the agent degrades gracefully without each one)
4. Denied permissions show a "Grant Access" button that opens the relevant System Settings pane
5. Monitor for permission changes via `NSApplication.didBecomeActiveNotification`

### 7.2 Permission Monitoring Pattern

```swift
// Monitor for permission changes when app becomes active
// (after user may have toggled a permission in System Settings)
actor PermissionMonitor {
    private var observers: [NSObjectProtocol] = []
    
    func startMonitoring(onChange: @Sendable @escaping () async -> Void) {
        let observer = NotificationCenter.default.addObserver(
            forName: NSApplication.didBecomeActiveNotification,
            object: nil,
            queue: nil
        ) { _ in
            Task { await onChange() }
        }
        observers.append(observer)
    }
    
    func stopMonitoring() {
        observers.forEach { NotificationCenter.default.removeObserver($0) }
        observers.removeAll()
    }
}
```

### 7.3 UserDefaults Keys for Onboarding State

```swift
extension UserDefaults {
    // Onboarding completion
    var hasCompletedOnboarding: Bool {
        get { bool(forKey: "hasCompletedOnboarding") }
        set { set(newValue, forKey: "hasCompletedOnboarding") }
    }
    
    // Version tracking for "What's New" screens
    var lastSeenAppVersion: String {
        get { string(forKey: "lastSeenAppVersion") ?? "" }
        set { set(newValue, forKey: "lastSeenAppVersion") }
    }
    
    // Track which permissions were deferred (to re-prompt contextually later)
    var deferredPermissions: Set<String> {
        get { Set(stringArray(forKey: "deferredPermissions") ?? []) }
        set { set(Array(newValue), forKey: "deferredPermissions") }
    }
}
```

### 7.4 WWDC Sessions to Watch

| Session | Year | Topic |
|---|---|---|
| Love at First Launch (816) | WWDC17 | Onboarding and first-launch design — foundational |
| What's new in privacy (10096) | WWDC22 | Permission best practices |
| What's new in privacy (10053) | WWDC23 | Privacy manifest, new permission model |
| Discover Calendar and EventKit (10052) | WWDC23 | New EKEventStore permission model |
| Get started with privacy manifests (10060) | WWDC23 | PrivacyInfo.xcprivacy deep dive |
| What's new in privacy (10123) | WWDC24 | Latest privacy requirements |
| Integrate privacy into your development process (246) | WWDC25 | Current-year privacy guidance |
| Write clear purpose strings (Tech Talk 110152) | — | Purpose string authoring |

---

## Sources

- [Apple HIG — Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding)
- [Apple HIG — Privacy / Requesting Permissions](https://developer.apple.com/design/human-interface-guidelines/privacy)
- [Apple HIG — Launching](https://developer.apple.com/design/human-interface-guidelines/launching)
- [Apple HIG — Onboarding for Games](https://developer.apple.com/app-store/onboarding-for-games/)
- [WWDC17 — Love at First Launch (816)](https://developer.apple.com/videos/play/wwdc2017/816/)
- [WWDC23 — What's new in privacy](https://developer.apple.com/videos/play/wwdc2023/10053/)
- [WWDC23 — Discover Calendar and EventKit](https://developer.apple.com/videos/play/wwdc2023/10052/)
- [WWDC23 — Get started with privacy manifests](https://developer.apple.com/videos/play/wwdc2023/10060/)
- [WWDC24 — What's new in privacy](https://developer.apple.com/videos/play/wwdc2024/10123/)
- [WWDC25 — Integrate privacy into your development process](https://developer.apple.com/videos/play/wwdc2025/246/)
- [Tech Talk — Write clear purpose strings](https://developer.apple.com/videos/play/tech-talks/110152/)
- [TN3153 — Adopting API changes for EventKit in iOS 17, macOS 14](https://developer.apple.com/documentation/technotes/tn3153-adopting-api-changes-for-eventkit-in-ios-macos-and-watchos)
- [Privacy manifest files — Apple Developer Documentation](https://developer.apple.com/documentation/bundleresources/privacy-manifest-files)
- [NSPrivacyAccessedAPITypes — Apple Developer Documentation](https://developer.apple.com/documentation/bundleresources/app-privacy-configuration/nsprivacyaccessedapitypes)
- [Describing use of required reason API](https://developer.apple.com/documentation/bundleresources/describing-use-of-required-reason-api)
- [Protected resources — Apple Developer Documentation](https://developer.apple.com/documentation/bundleresources/protected-resources)
- [CGPreflightScreenCaptureAccess](https://developer.apple.com/documentation/coregraphics/3656523-cgpreflightscreencaptureaccess)
- [CGRequestScreenCaptureAccess](https://developer.apple.com/documentation/coregraphics/3656524-cgrequestscreencaptureaccess)
- [AXIsProcessTrustedWithOptions](https://developer.apple.com/documentation/applicationservices/1459186-axisprocesstrustedwithoptions)
- [EKEventStore.requestFullAccessToEvents](https://developer.apple.com/documentation/eventkit/ekeventstore/requestfullaccesstoevents(completion:))
- [EKEventStore.requestWriteOnlyAccessToEvents](https://developer.apple.com/documentation/eventkit/ekeventstore/requestwriteonlyaccesstoevents(completion:))
- [CNContactStore.requestAccess](https://developer.apple.com/documentation/contacts/cncontactstore/requestaccess(for:completionhandler:))
- [Requesting Authorization for Media Capture on macOS](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos)
- [NSCalendarsWriteOnlyAccessUsageDescription](https://developer.apple.com/documentation/bundleresources/information-property-list/nscalendarswriteonlyaccessusagedescription)
- [App Sandbox Entitlements](https://developer.apple.com/documentation/security/app_sandbox_entitlements)
- [Notarizing macOS Software](https://developer.apple.com/documentation/security/notarizing-macos-software-before-distribution)
- [Apple System Preferences URL Schemes (community gist)](https://gist.github.com/rmcdongit/f66ff91e0dad78d4d6346a75ded4b751)
- [Accessibility Permission in macOS (jano.dev, Jan 2025)](https://jano.dev/apple/macos/swift/2025/01/08/Accessibility-Permission.html)
- [PermissionFlow library (jaywcjlove)](https://github.com/jaywcjlove/PermissionFlow)
- [User Privacy and Data Use — App Store](https://developer.apple.com/app-store/user-privacy-and-data-use/)
