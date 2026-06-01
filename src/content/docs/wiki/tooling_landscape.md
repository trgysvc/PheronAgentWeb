# Tooling Landscape Map

Pheron Agent manages over 35 native tools using a **UBID (Unique Binary ID)** system. This structure ensures zero latency and high type safety in line with the UNO (Unified Native Orchestration) philosophy.

## 1. Communication and Social (Native Bridge)
These tools are directly tied to Apple's Sandbox rules and the Apple Events system.
- **WhatsApp & Messenger:** Managed via URLs and key events via `CommunicationTools.swift`.
- **Mail & Email:** Biometric (Touch ID) approved, integrated with the system's native Mail application.
- **Contacts & Calendar:** Direct access to the local database via `ProductivityTools.swift`.

## 2. Developer and System Operations
Pheron Agent is "Developer-Native," capable of writing and compiling its own code.
- **Git & Shell:** Command execution capabilities via `GitTool.swift` and `ShellTool.swift`.
- **Xcode Build:** Local project compilation and testing capabilities via `XcodeTool.swift`.
- **Patch & Write:** Applying atomic changes to the codebase via `PatchTool.swift`.

## 3. Web and Research Suite
A layer providing secure data exchange with the external world.
- **Safari Automation:** Native bridge controlling Safari using `AppleEvents`.
- **Native Browser:** In-app browser eliminating the need for external browser processes.
- **Web Search/Fetch:** Asynchronous tools optimized for research tasks.

## 4. Specialized Media and System Control
Low-level tools providing hardware-level control.
- **MusicDNA:** Audio analysis and music processing capabilities. For more details, refer to the [[MusicTools]] document.
- **Ecosystem Tools:** `set_volume` and `set_brightness` tools to manage hardware parameters like volume, brightness, and sleep mode.
- **Blender Bridge:** 3D modeling and render automation. Technical details: [[KNOWLEDGE_BlenderAPI]].

## 5. Advanced AI and Memory
Meta-tools managing the agent's internal processes.
- **Context Memory:** Long-term context management via `MemoryTool.swift`.
- **Subagent (Task Delegation):** Orchestration tool allocating complex tasks to sub-agents.

---
### Related Resources
- **Full Tool List:** [[PheronAgentTools]]
- **Evolution Decisions:** Inspect the [[DevelopmentConversations]] records for the transition of tools to the UBID system and architectural evolution.

---
**Philosophical Note:** All tools run asynchronously (async/await) on the UNO backbone using **UBID** and **Typed Swift Parameters** instead of text-based protocols like JSON.
