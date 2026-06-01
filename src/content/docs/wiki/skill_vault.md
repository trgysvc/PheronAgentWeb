# SkillVault — Self-Improving Procedural Memory

**Added:** 2026-05-10 | **Version:** v10.5.7

---

## What is it?

SkillVault is Pheron Agent's procedural knowledge repository. Unlike `ExperienceVault`, it does not store "what I did", but rather **"how to do it"**. After each task, the system converts its experience into a skill. That skill automatically triggers for subsequent similar tasks and gets continuously refined.

### Difference from ExperienceVault

| Feature | ExperienceVault | SkillVault |
|---|---|---|
| **Memory Type** | Episodic (what happened) | Procedural (how to do it) |
| **Format** | SQLite + Metal vector | `.skill.md` + binary plist |
| **Who Writes** | DreamActor only | DreamActor + the agent itself |
| **Read Method** | Vector similarity search | Keyword matching |
| **Feedback** | None | Task success/failure signals |

---

## System Components

### 1. `SkillVault` Actor (`Memory/SkillVault.swift`)

The central actor managing all file operations and the lifecycle of skills.

**Storage Structure:**
```
~/Library/Application Support/PheronAgent/Skills/
  debug_swift_actor_isolation.skill.md     ← skill content (markdown)
  debug_swift_actor_isolation.skill.plist  ← metadata (binary plist)
  .archive/
    old_skill.skill.md                     ← archived, never deleted
```

**`SkillMetadata` fields (binary plist):**
```swift
struct SkillMetadata: Codable, Sendable {
    var name: String
    var version: Int           // increments on each patch
    var provenance: SkillProvenance  // .agent or .curator
    var state: SkillState            // .active, .stale, .archived
    var usageCount: Int        // how many times injected into context
    var patchCount: Int        // how many times patched
    var successCount: Int      // number of successes when injected
    var failureCount: Int      // number of failures when injected
    var createdAt: Date
    var updatedAt: Date
}
```

**Provenance Types:**
- `.agent` — Written by the agent during a task using the `skill_patch` tool
- `.curator` — Automatically generated and merged by the DreamActor

**Lifecycle:**
```
active ──(14 days inactive or 70%+ failures)──► stale
                                                 │
                                     (Curator decision or manual)
                                                 │
                                                 ▼
                                             archived  (moved to the .archive/ folder)
```

---

### 2. `SkillPatchTool` (UBID 86, `ToolEngine/Tools/SkillPatchTool.swift`)

The tool the agent uses to write to its own knowledge base during execution.

**Supported Actions:**

```
skill_patch {"action": "create", "name": "debug_swift_actor_isolation",
             "trigger": "During Swift 6 actor isolation errors",
             "content": "## How to debug\n1. Check @Sendable conformance..."}

skill_patch {"action": "patch", "name": "debug_swift_actor_isolation",
             "content": "## Updated approach\n..."}

skill_patch {"action": "search", "query": "Swift build error fix"}

skill_patch {"action": "list"}
```

**Difference between `create` and `patch`:** `create` exits silently if the skill already exists. `patch` increments the version and resets the state to `.active`. If `patch` is applied to a non-existent skill, it falls back to `create`.

---

### 3. DreamActor Extensions (`Memory/DreamActor.swift`)

#### `extractSkills(from:cloudProvider:)` — Automated Skill Extraction

Runs after every successful consolidation. It supplies the session summary to the LLM and asks:

> "Is there a procedural rule from this session that can be reused in the future? If yes, provide it in the format: SKILL_NAME, TRIGGER, CONTENT. If no, output: NONE."

If the model does not output NONE, the extracted skill is saved to the SkillVault with `.curator` provenance. Subject to token budget (≤500 tokens).

#### `consolidateSkills(cloudProvider:)` — Curator Pass

Runs every 5 consolidation cycles. It feeds all active skills **along with their success/failure statistics** to the LLM:

```
### debug_swift_actor_isolation [✓8 ✗1, 11% fail]
...

### fix_swift_build_error [✓3 ✗4, 57% fail]
...
```

Expected output from the LLM:
```
MERGE: fix_swift_build_error,debug_swift_actor_isolation
NEW_NAME: swift_compiler_debugging
CONTENT:
...
---
NO_ACTION
```

The merged old skills are moved to the `.archive/` folder.

---

### 4. OrchestratorRuntime Integration (`AgentEngine/OrchestratorRuntime.swift`)

**At task start (bootstrap injection):**
```swift
let skillResult = await SkillVault.shared.buildSkillContext(for: prompt)
// → the top 3 matching skills are added to the system prompt
// → names of injected skills are recorded in `injectedSkillNames`
```

**At task end (outcome feedback — defer block):**
```swift
let succeeded = !self.taskFailed
let skillNames = self.injectedSkillNames
Task {
    if !skillNames.isEmpty {
        await SkillVault.shared.recordOutcome(names: skillNames, success: succeeded)
    }
}
```

**`taskFailed = true` triggers:**
- Maximum execution turns exceeded
- Maximum planning turns exceeded
- User interrupted the task (`isInterrupted`)

Normal completion leaves `taskFailed` unchanged → `succeeded = true`.

---

## Feedback Loop (Full Flow)

```
1. Task Starts
   └─ SkillVault: keyword matching → corresponding skills found
   └─ "### RELEVANT SKILLS" block added to the system prompt
   └─ injectedSkillNames = ["debug_swift_actor_isolation", "handle_context_overflow"]

2. Task Executes
   └─ Agent recognizes a pattern → skill_patch {"action": "create", ...}
   └─ New skill immediately written to SkillVault

3. Task Completes
   └─ taskFailed = false (Success)
   └─ recordOutcome(["debug_swift_actor_isolation", "handle_context_overflow"], success: true)
   └─ successCount += 1 for both skills

4. In Background (DreamActor)
   └─ extractSkills() → new skill might be extracted from the session
   └─ (Every 5th cycle) consolidateSkills() → Curator analysis with success statistics
```

---

## Design Decisions

**Why keyword matching instead of vector search?**
The number of skills typically remains between 5-50 (not thousands). At this scale, Metal GPU search is unnecessary; keyword matching + usage count boosting provides highly accurate results.

**Why separate files instead of adding to ExperienceVault?**
Skills must be human-readable and editable. Markdown files are easily tracked in git, editable by hand, and simple to debug. SQLite does not offer these benefits.

**Why is there no deletion?**
A principle borrowed from the Curator design in Hermes: just because a skill fails once doesn't mean it is permanently incorrect — the context might have changed. The `.archive/` folder allows manual restoration.

**Why binary plist instead of JSON?**
UNO Rule #1: JSON is prohibited. All metadata is written in binary format using PropertyListEncoder.

---

## Related Files

| File | Role |
|---|---|
| `Sources/PheronAgentCore/Memory/SkillVault.swift` | Main actor — CRUD, search, lifecycle |
| `Sources/PheronAgentCore/ToolEngine/Tools/SkillPatchTool.swift` | Agent interface (UBID 86) |
| `Sources/PheronAgentCore/Memory/DreamActor.swift` | Automated extraction + Curator |
| `Sources/PheronAgentCore/AgentEngine/OrchestratorRuntime.swift` | Bootstrap injection + outcome tracking |
| `Sources/PheronAgentCore/ToolEngine/ToolIDs.swift` | Registration of `skillPatch = 86` |
