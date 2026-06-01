# AppKit Settings Window — NSTabViewController & NSWindow

Source: `developer.apple.com/tutorials/data/documentation/appkit/nstabviewcontroller.json`

---

## NSTabViewController

`NSTabViewController` is a container view controller that manages a tab view interface. Each page is managed by a separate child view controller, and only one page is shown at a time. **macOS 10.10+**

---

## tabStyle — Critical Property

```swift
var tabStyle: NSTabViewController.TabStyle
```

Determines the appearance of the tab control.

### TabStyle Options

| Style | Description |
|-------|------------|
| `.segmentedControlOnTop` | Segmented control above the tab view |
| `.segmentedControlOnBottom` | Segmented control below the tab view |
| `.toolbar` ⭐ | Tabs in the window's toolbar — **Pages/Mail/Xcode style** |
| `.unspecified` | No tab UI, app provides its own control |

> **`.toolbar` style:** The tab view controller automatically manages the window's toolbar and assigns itself as the toolbar delegate. This is **the style used in macOS system preferences** (Pages, Mail, Xcode etc.)

---

## Basic Setup

```swift
final class SettingsTabViewController: NSTabViewController {
    override func viewDidLoad() {
        super.viewDidLoad()
        tabStyle = .toolbar  // Pages/Mail style
    }
}

// Usage:
let tabVC = SettingsTabViewController()

let pane = NSHostingController(rootView: GeneralSettingsView())
let item = NSTabViewItem(viewController: pane)
item.label = "General"
item.image = NSImage(systemSymbolName: "gear", accessibilityDescription: "General")
tabVC.addTabViewItem(item)
```

---

## Tab View Item Management

```swift
// Adding:
func addTabViewItem(_ tabViewItem: NSTabViewItem)
func insertTabViewItem(_ tabViewItem: NSTabViewItem, at index: Int)

// Removing:
func removeTabViewItem(_ tabViewItem: NSTabViewItem)

// Finding:
func tabViewItem(for viewController: NSViewController) -> NSTabViewItem?
```

---

## Tab Transition Events

```swift
// Before selection (for caching size):
func tabView(_ tabView: NSTabView, willSelect tabViewItem: NSTabViewItem?)

// After selection (for window resize):
func tabView(_ tabView: NSTabView, didSelect tabViewItem: NSTabViewItem?)
```

---

## Lazy Loading

- Views are created only when the relevant tab **is selected**
- Only the initial tab's view is loaded on first display
- Improves performance for tabs with heavy content

---

## Toolbar Integration

NSTabViewController implements `NSToolbarDelegate` methods:

```swift
func toolbar(_ toolbar: NSToolbar,
             itemForItemIdentifier: NSToolbarItem.Identifier,
             willBeInsertedIntoToolbar: Bool) -> NSToolbarItem?

func toolbarAllowedItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier]
func toolbarDefaultItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier]
func toolbarSelectableItemIdentifiers(_ toolbar: NSToolbar) -> [NSToolbarItem.Identifier]
```

---

## NSWindow.setFrame(_:display:animate:)

Source: `developer.apple.com/tutorials/data/documentation/appkit/nswindow/setframe(_:display:animate:).json`

Used to resize the window with animation during tab transitions.

```swift
func setFrame(_ frameRect: NSRect, display displayFlag: Bool, animate animateFlag: Bool)
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `frameRect` | `NSRect` | New window frame (including title bar) |
| `displayFlag` | `Bool` | If `true`, redraws the view hierarchy |
| `animateFlag` | `Bool` | If `true`, plays a smooth resize animation |

### Animation Duration

Animation duration is determined by the `animationResizeTime(_:)` method.

### Example Usage in Tab Transitions

```swift
private func resizeWindow(for item: NSTabViewItem, animate: Bool = true) {
    guard let window = view.window else { return }
    let size = item.viewController?.view.fittingSize ?? .zero
    guard size != .zero else { return }
    
    let contentRect = NSRect(origin: .zero, size: size)
    let newFrame = window.frameRect(forContentRect: contentRect)
    
    var targetFrame = window.frame
    targetFrame.origin.y += targetFrame.height - newFrame.height  // Keep bottom-left corner fixed
    targetFrame.size = newFrame.size
    
    window.setFrame(targetFrame, display: false, animate: animate)
}
```

---

## Important Architectural Note

**Definitive conclusion for Pages/Mail/Xcode style Settings window:**

- SwiftUI `TabViewStyle` → none of them produce the toolbar style
- `NSTabViewController.tabStyle = .toolbar` → **the only real way**
- This requires AppKit; this appearance cannot be achieved with pure SwiftUI

In the Pheron Agent project, the `NSTabViewController` + `NSHostingController` (SwiftUI panes) approach is the correct and necessary choice for HIG compliance and a genuine macOS experience.
