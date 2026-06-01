# SwiftUI Settings Scene — Official Apple Documentation

Source: `developer.apple.com/tutorials/data/documentation/swiftui/settings.json`

---

## Settings Scene

`Settings` is a SwiftUI scene struct that presents the app's settings interface on macOS. **macOS 11.0+**

### Basic Usage

```swift
@main
struct MyApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        #if os(macOS)
        Settings {
            SettingsView()
        }
        #endif
    }
}
```

Declaring a `Settings` scene:
- Automatically adds "Settings…" (⌘,) to the App menu
- SwiftUI manages the window (when the user opens it from the menu or uses the shortcut)

### Tab Organization with TabView

```swift
struct SettingsView: View {
    var body: some View {
        TabView {
            Tab("General", systemImage: "gear") {
                GeneralSettingsView()
            }
            Tab("Advanced", systemImage: "star") {
                AdvancedSettingsView()
            }
        }
        .scenePadding()
        .frame(maxWidth: 350, minHeight: 100)
    }
}
```

Window size is controlled with the `.frame()` modifier.

### Setting Values with @AppStorage

```swift
struct GeneralSettingsView: View {
    @AppStorage("showPreview") private var showPreview = true
    @AppStorage("fontSize") private var fontSize = 12.0

    var body: some View {
        Form {
            Toggle("Show Previews", isOn: $showPreview)
            Slider(value: $fontSize, in: 9...96) {
                Text("Font Size (\(fontSize, specifier: "%.0f") pts)")
            }
        }
    }
}
```

---

## OpenSettingsAction

`OpenSettingsAction` is a SwiftUI struct that opens the Settings scene programmatically. **macOS 14.0+**

### Usage

```swift
@Environment(\.openSettings) private var openSettings

// Call:
openSettings()
```

### Full Example (Navigating to a Specific Tab)

```swift
enum SettingsTab: Int {
    case general
    case advanced
}

struct AdvancedSettingsButton: View {
    @AppStorage("selectedSettingsTab")
    private var selectedSettingsTab = SettingsTab.general

    @Environment(\.openSettings) private var openSettings

    var body: some View {
        Button("Open Advanced Settings…") {
            selectedSettingsTab = .advanced
            openSettings()
        }
    }
}
```

---

## SettingsLink

`SettingsLink` is a SwiftUI view that opens the Settings scene when tapped. **macOS 14.0+**

```swift
// With default label:
SettingsLink()

// With custom label:
SettingsLink {
    Label("Preferences", systemImage: "gear")
}
```

---

## Tab Struct (macOS 15.0+)

`Tab` represents the content and tab item inside a TabView.

```swift
// With system image:
Tab("General", systemImage: "gear") {
    GeneralSettingsView()
}

// With custom image:
Tab("General", image: "custom_icon") {
    GeneralSettingsView()
}

// With selection value:
Tab("General", systemImage: "gear", value: SettingsTab.general) {
    GeneralSettingsView()
}
```

**Platform Availability:** macOS 15.0+, iOS 18.0+

---

## TabViewStyle — Available Options on macOS

| Style | Description |
|-------|-------------|
| `.automatic` | Platform default |
| `.sidebarAdaptable` | Sidebar adaptive style |
| `.tabBarOnly` | Tab bar only |
| `.grouped` | Grouped tab bar |
| `.page` | Page-based scroll |
| `.verticalPage` | Vertical page-based |

> **IMPORTANT:** NONE of these styles produce the **toolbar-style** tab appearance seen in Pages/Mail/Xcode preferences windows. That style requires `NSTabViewController.tabStyle = .toolbar` (AppKit).

---

## WindowGroup — Programmatic Window Management

```swift
// Open a window:
@Environment(\.openWindow) private var openWindow
openWindow(id: "my-window")

// Close a window:
@Environment(\.dismiss) private var dismiss
dismiss()
```

---

## Related Types

- `Settings` — Settings scene
- `SettingsLink` — View that opens Settings
- `OpenSettingsAction` — Programmatic open action
- `EnvironmentValues.openSettings` — Access from environment
