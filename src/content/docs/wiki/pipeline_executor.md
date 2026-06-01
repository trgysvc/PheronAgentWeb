# Two-Phase Pipeline Executor

**Version:** v10.5.6 | **Date:** 2026-05-07 | **Status:** Production

---

## Problem: Limitations of Single-Loop ReAct Architecture

`OrchestratorRuntime` was trying to manage complex multi-step tasks with the same ReAct loop:

```
Classify → [Plan LLM] → [Execute 1 tool] → [Critic LLM] → [Plan LLM] → ...
```

In this structure, each planning turn consumes 3072 tokens and re-reads the growing context. Five failure points were observed:

| # | Problem | Impact |
|---|---|---|
| 1 | ANE classifier locks onto a single keyword (e.g. "weather") and returns `.weather` | Pipeline detection is never reached |
| 2 | Focused Mode hides `get_system_telemetry` and `shell_exec` for `.weather` | Model cannot access critical tools from Turn 2 onward |
| 3 | `extractSteps` regex 120-char limit cuts off plan sentences | Progress tracker sees zero steps → Critic FAIL |
| 4 | `ShellTool` stdout/stderr sequential pipe read deadlock risk (>64 KB) | Process locks on large outputs |
| 5 | `MAX_PHASE_DURATION = 600s` is insufficient for complex tasks on a local model | Process is killed by timeout |

---

## Architecture: Two-Phase Pipeline

### Trigger: Structural Detection

Runs before all classifiers inside `handleClassification()`:

```swift
// OrchestratorRuntime.handleClassification()
if TaskClassifier.isPipelinePrompt(prompt.lowercased()) {
    return .multiStepWorkflow  // ANE is never called
}
```

`isPipelinePrompt()` looks for ≥3 numbered items in the prompt (`1.`, `2.`, `3.` etc.). A single keyword cannot override this detection.

---

### Phase 1 — Structural Plan (`PheronCoordinator.decompose()`)

**1 LLM call, all tools visible (no Focused Mode)**

The model produces output in this format:

```
PIPELINE:
1. CALL(36) "Get system telemetry" PARAMS:none
2. CALL(32) "Take desktop screenshot" PARAMS:command=screencapture -x /tmp/screen.png
3. CALL(45) "Search for LLM benchmarks" PARAMS:query=local LLM apple silicon 2025 speed benchmark
4. CALL(81) "Get Istanbul weekly weather" PARAMS:location=Istanbul
5. SYNTHESIZE "Combine all findings into a professional report" PARAMS:path=/Users/x/Desktop/report.md
6. CALL(33) "Read and verify the report" PARAMS:path=/Users/x/Desktop/report.md
```

**`parsePipelineResponse()`** static parser converts this text into a `[TaskNode]` array:
- `CALL(UBID)` → `NodeKind.toolCall(ubid:, params:)`
- `SYNTHESIZE` → `NodeKind.synthesis(targetPath:)`
- `PARAMS:key=value` — no JSON; key-value parsing with `=` and `;` separators

---

### Phase 2 — Deterministic Execution (`PheronCoordinator.executeDataPhase()`)

**No LLM calls. Every node goes directly to `ToolRegistry.execute()`.**

```
[Node 1] → ToolRegistry.execute(UBID:36) → evidence[0]
[Node 2] → ToolRegistry.execute(UBID:32) → evidence[1]
[Node 3] → ToolRegistry.execute(UBID:45) → evidence[2]
[Node 4] → ToolRegistry.execute(UBID:81) → evidence[3]
[SYNTHESIZE] → synthesis node detected, proceed to next phase
[Node 6] → added to postSynthesisNodes list
```

For each successful node, `session.progressTracker.markCompleted()` is called. On error, an error note is added to the evidence list and execution continues to the next node.

---

### Phase 3 — LLM Synthesis (`OrchestratorRuntime.performSynthesis()`)

**1 LLM call** — all evidence is combined to produce a Markdown report.

```swift
// Evidence example:
"### Get system telemetry\n[🖥 System Telemetry Report]..."
"### Search for LLM benchmarks\n1. Apple M4 Max: 78 tok/s..."
"### Get Istanbul weekly weather\n[WeatherDNA_WIDGET]..."
```

Once synthesis is complete:
1. Written to target file with `write_file` (UBID 34)
2. Post-synthesis nodes execute (`read_file` etc.)
3. Delivered to UI via `session.setFinalAnswer()`

---

## Files and Responsibilities

| File | Change |
|---|---|
| `TaskClassifier.swift` | `isPipelinePrompt()` — ≥3 numbered item detection |
| `OrchestratorRuntime.swift` | Pre-gate at start of `handleClassification()`, `runPipelineMode()`, `performSynthesis()` |
| `PheronCoordinator.swift` | `NodeKind`, `decompose()`, `executeDataPhase()`, static parser |
| `PlannerTemplate.swift` | `generatePipelinePrompt()`, `extractSteps` regex 120→500 |
| `ShellTool.swift` | Concurrent `Task.detached` pipe reading (deadlock fix) |

---

## Fallback Logic

If the pipeline fails, the ReAct loop continues:

```
decompose() → 0 nodes    →  currentTaskCategory = .task, currentState = .planning
decompose() throws       →  same fallback
```

The ReAct loop for single-intent tasks is unchanged.

---

## Known Limitations

| Limitation | Status |
|---|---|
| Screenshot (`screencapture`) sandbox boundary | Generates a model capability insufficient explanation |
| Parallel node execution | Sequential; `determineMaxWorkers()` infrastructure is ready |
| Synthesis token limit | 2048 on local model, 4096 on cloud |
| Multi-parameter tools | Supported with `;` separator `key1=v1;key2=v2` |

---

## Related Files

- `Sources/PheronAgentCore/AgentEngine/PheronCoordinator.swift`
- `Sources/PheronAgentCore/AgentEngine/OrchestratorRuntime.swift`
- `Sources/PheronAgentCore/AgentEngine/TaskClassifier.swift`
- `Sources/PheronAgentCore/AgentEngine/PlannerTemplate.swift`
- `Sources/PheronAgentCore/ToolEngine/Tools/ShellTool.swift`
- `Resources/Config/DEVLOG.md`

---

## Updates (2026-05-18)

### TaskClassifier: fileProcessing Priority Fix

Expressions like "organize", "move", "create folder" are now classified as `.fileProcessing` — before the vision pipeline. In the previous behavior, these expressions could be incorrectly routed to the vision category (especially in screenshot organization commands).

### PlannerTemplate: File Organization Rules

The `~/Pictures/Screenshots` target directory rule was added to the agentic prompt. The model no longer makes typos in the target directory when organizing screenshot files.

### ReAct Loop Code Fence Bug

Pipeline mode is unaffected by this bug (uses structural `CALL(UBID)` string matching rather than UBID parsing). The bug only affected the `ThinkParser` inside the ReAct loop. Details: [system_stability.md — Section 6](system_stability.md).
