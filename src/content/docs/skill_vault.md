# SkillVault — Self-Improving Procedural Memory

**Added:** 2026-05-10 | **Version:** v10.5.7

---

## What is SkillVault?

SkillVault is Pheron Agent's procedural knowledge repository. Unlike `ExperienceVault`, which stores "what was done" (episodic memory), SkillVault stores **"how to do it"** (procedural memory). After each successful task execution, the agent translates its experience into a modular skill. This skill is then automatically loaded during similar future tasks and refined over time.

### Difference from ExperienceVault

| | ExperienceVault | SkillVault |
|---|---|---|
| **Memory Type** | Episodic (what happened) | Procedural (how to do it) |
| **Format** | SQLite + Metal vector DB | `.skill.md` + binary plist |
| **Written by** | DreamActor (Curator) only | DreamActor + the agent itself |
| **Retrieval** | Vector similarity search | Trigger and keyword matching |
| **Feedback Loop** | None | Task success/failure signals |

---

## System Components

### 1. `SkillVault` Actor (`Memory/SkillVault.swift`)

The central Swift actor managing file I/O operations and lifecycle states.

**Storage Structure:**
```
~/Library/Application Support/PheronAgent/Skills/
  debug_swift_actor_isolation.skill.md     ← Skill content (Markdown)
  debug_swift_actor_isolation.skill.plist  ← Metadata (binary plist)
  .archive/
    old_skill.skill.md                     ← Archived skills (never deleted)
```

**`SkillMetadata` fields (binary plist):**
```swift
struct SkillMetadata: Codable, Sendable {
    var name: String
    var version: Int                 // Incremented on every patch
    var provenance: SkillProvenance  // .agent or .curator
    var state: SkillState            // .active, .stale, .archived
    var usageCount: Int              // Number of times injected into context
    var patchCount: Int              // Number of modifications
    var successCount: Int            // Successes when this skill was active
    var failureCount: Int            // Failures when this skill was active
    var createdAt: Date
    var updatedAt: Date
}
```

**Provenance Types:**
- `.agent` — Written by the agent during a task using the `skill_patch` tool.
- `.curator` — Automatically generated and merged by `DreamActor` during background consolidation.

**Lifecycle Transitions:**
```
active ──(14 days inactive OR 70%+ failures)──► stale
                                                   │
                                      (Curator decision or manual)
                                                   │
                                                   ▼
                                               archived  (Moved to .archive/ directory)
```

---

### 2. `SkillPatchTool` (UBID 86, `ToolEngine/Tools/SkillPatchTool.swift`)

The interface allowing the agent to write directly to its local knowledge base during task execution.

**Supported Actions:**

```json
skill_patch {"action": "create", "name": "debug_swift_actor_isolation",
             "trigger": "On Swift 6 actor isolation compile errors",
             "content": "## How to debug\n1. Check @Sendable conformance..."}

skill_patch {"action": "patch", "name": "debug_swift_actor_isolation",
             "content": "## Updated approach\n..."}

skill_patch {"action": "search", "query": "Swift build error fix"}

skill_patch {"action": "list"}
```

**Difference between `create` and `patch`**: `create` skips writing if the skill already exists. `patch` increments the version number and resets the state to `.active`. If `patch` is called on a non-existent skill, it falls back to `create`.

---

### 3. DreamActor Extensions (`Memory/DreamActor.swift`)

#### `extractSkills(from:cloudProvider:)` — Automated Skill Extraction
Runs after every successful session consolidation. It feeds the session log summary to the LLM and asks:
> "Is there a reusable procedural rule that can be extracted from this session? If yes, respond in the format: SKILL_NAME, TRIGGER, CONTENT. If no, return NONE."

Unless the model returns `NONE`, the new skill is saved in the SkillVault with `.curator` provenance.

#### `consolidateSkills(cloudProvider:)` — Curator Consolidation Pass
Fires every 5 consolidation cycles. It feeds all active skills, along with their **success/failure rates**, to the LLM:

```
### debug_swift_actor_isolation [✓8 ✗1, 11% failure rate]
...

### fix_swift_build_error [✓3 ✗4, 57% failure rate]
...
```

Expected LLM decision output:
```
MERGE: fix_swift_build_error,debug_swift_actor_isolation
NEW_NAME: swift_compiler_debugging
CONTENT:
...
---
NO_ACTION
```
Merged old skills are archived under `.archive/`.

---

### 4. OrchestratorRuntime Integration (`AgentEngine/OrchestratorRuntime.swift`)

**Task Bootstrap Injection:**
```swift
let skillResult = await SkillVault.shared.buildSkillContext(for: prompt)
// -> The top 3 matching skills are injected into the system prompt
// -> Injected skill names are stored in `injectedSkillNames`
```

**Task Defer Outcome Feedback:**
```swift
let succeeded = !self.taskFailed
let skillNames = self.injectedSkillNames
Task {
    if !skillNames.isEmpty {
        await SkillVault.shared.recordOutcome(names: skillNames, success: succeeded)
    }
}
```

---

## Design Decisions

- **Why trigger matching instead of vector DB search?** The skill count stays around 5-50 items. At this scale, running GPU vector searches is redundant. Simple keyword and trigger weightings are faster and highly accurate.
- **Why markdown files instead of SQLite?** Skills should be human-readable and editable. Markdown files are easily tracked in Git, manually tweakable, and trivial to debug compared to database tables.
- **Why no hard deletions?** A failing skill is not necessarily incorrect; the system context might have changed. Archiving to `.archive/` allows easy manual restoration.
- **Why binary plist instead of JSON?** Rules enforce zero JSON usage in production. Plists are parsed directly to binary format.
