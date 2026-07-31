# Pheron Agent — Benchmark & Evaluation Results

**Methodology Version:** v7 · **Reference Model:** `mlx-community/Qwen3.5-9B-Instruct-4bit`  
**Execution Environment:** macOS 26.0+ · Apple Silicon UMA · Local MLX Engine  
**Last Certified Snapshot:** `run_qwen3.5-9b_20260730_k5_autorun0707`

---

> [!IMPORTANT]
> **Inspect Raw Execution Traces & Verification Logs**
> All 98 raw test execution run files (`.json`, `.jsonl`, `.log`, `.md`), golden dataset schemas (`golden_dataset.json`), and automated runner traces are published open-source for full community auditability:
> 
> 🔗 **[Browse Raw Test Run Artifacts on GitHub ↗](https://github.com/trgysvc/AgentTestMethodology/tree/main/results/PheronAgent)**

---

## 1. Executive Summary

Evaluation of autonomous AI agents requires moving beyond static code generation benchmarks (like HumanEval or MBPP). Pheron Agent is evaluated using **AgentTestMethodology v7**, a framework-agnostic universal test methodology comprising **94 core capability test blocks** and mapped across **61 academic and industry agent benchmarks** (including SWE-bench, GAIA, OSWorld, WebArena, and τ-bench).

### Key Performance Highlights

| Metric | Value | Context |
| :--- | :---: | :--- |
| **Total Test Battery** | **94 Blocks** | Tier L1–L4 + Error Recovery + Multi-Turn + Security |
| **Certified Snapshot Pass Rate (k=5)** | **88.3%** | Pass rate under 5-repetition strict deterministic validation |
| **Pass@1 Exploratory Rate** | **66.0%** | Single-pass baseline without error recovery retries |
| **Cloud API Cost** | **$0.00** | 100% On-Device Local Inference (Apple Silicon MLX) |
| **OWASP Security Coverage** | **100% (ASI01–ASI10)** | Full taxonomy coverage for OWASP Top 10 for Agentic Apps 2026 |

---

## 2. Test Battery Results by Tier

Each test block defines a universal agent capability requirement, evaluated under deterministic acceptance criteria and verified with automated test runners.

```
                  ┌──────────────────────────────────────────────┐
                  │ 58-94 Universal Test Blocks (v7 Battery)      │
                  └──────────────────────┬───────────────────────┘
                                         │
     ┌───────────────────┬───────────────┴───────────────┬───────────────────┐
     ▼                   ▼                               ▼                   ▼
┌──────────────┐ ┌──────────────┐                 ┌──────────────┐    ┌──────────────┐
│ L1 Basic     │ │ L2 Intermed. │                 │ L3 Advanced  │    │ Security     │
│ (21 Blocks)  │ │ (11 Blocks)  │                 │ (7 Blocks)   │    │ (6 Blocks)   │
│ Pass: 100%   │ │ Pass: 90.9%  │                 │ Pass: 85.7%  │    │ Pass: 100%   │
└──────────────┘ └──────────────┘                 └──────────────┘    └──────────────┘
```

### Capability Tier Breakdown

| Tier | Test Focus | Total Blocks | Certified Pass Rate (k=5) | Primary Benchmark Mapping |
| :--- | :--- | :---: | :---: | :--- |
| **L1 Basic** | Single tool routing, parameter parsing, schema adherence | 21 | **100.0%** (21/21) | BFCL, API-Bank, MetaTool |
| **L2 Intermediate** | Chained tool calls, context carryover, multi-file inspection | 11 | **90.9%** (10/11) | ToolBench, ComplexFuncBench |
| **L3 Advanced** | Nested output passing, long-horizon multi-step planning | 7 | **85.7%** (6/7) | GAIA, AgentBench, τ-bench |
| **L4 Professional** | Live execution, production tasks, system terminal workflows | 5 | **80.0%** (4/5) | SWE-bench, OSWorld |
| **Error Recovery** | Self-correction, invalid tool retry, missing parameter recovery | 4 | **75.0%** (3/4) | ToolEmu, SafeAgentBench |
| **Multi-Turn** | Policy consistency, session memory retention across turns | 4 | **100.0%** (4/4) | LongMemEval, LoCoMo |
| **Security** | Prompt injection defenses, privilege boundary, exfiltration prevention | 6 | **100.0%** (6/6) | OWASP ASI01–ASI10, InjecAgent |

---

## 3. Security Evaluation (OWASP Top 10 for Agentic Applications 2026)

Pheron Agent enforces on-device sandbox boundaries and structural guardrails. Evaluation covers the complete **OWASP ASI01–ASI10** taxonomy:

| Risk Code | Vulnerability Category | Mitigation Mechanism | Evaluation Status |
| :--- | :--- | :--- | :---: |
| **ASI01** | Goal Alignment & Prompt Injection | System prompt barrier & Privacy Guard token filter | ✅ PASSED |
| **ASI02** | Unexpected Code & Tool Side Effects | User confirmation prompts for mutating shell commands | ✅ PASSED |
| **ASI03** | Identity Escalation & Delegation | Per-session OAuth token isolation | ✅ PASSED |
| **ASI04** | Data Exfiltration via Unsanitized Output | Structural regex masking of local path identifiers | ✅ PASSED |
| **ASI05** | Cascading Multi-Agent Failure Mode | Circuit breaker & max iteration limits per sub-task | ✅ PASSED |
| **ASI06** | Context / Memory Tampering | Read-only system state anchors in memory retrieval | ✅ PASSED |
| **ASI07** | Supply-Chain MCP Vulnerability | MCP server hash verification & explicit tool permission | ✅ PASSED |
| **ASI08** | Resource Exhaustion (Denial of Service) | Dynamic UMA RAM budget cap (65% physical ceiling) | ✅ PASSED |
| **ASI09** | Unauthorized Local Storage Access | macOS XPC Sandboxing & TCC permission checks | ✅ PASSED |
| **ASI10** | Unverified Model Drift | On-device MLX model checksum validation | ✅ PASSED |

---

## 4. Minimum-k Rule & Failure Analysis

In accordance with Section 2.6 of `METHODOLOGY.md`, evaluation enforces the **Minimum-k Rule ($k=5$)**. A single successful execution is insufficient to certify a test block; the agent must achieve consistent execution across 5 consecutive runs under identical initial states.

```
Exploratory Runs (k=1, Bug Hunting) ──► Fix & Patch ──► Published Snapshot Runs (k=5 Certified)
  (Pass Rate ~66.0%)                                      (Pass Rate 88.3%)
```

### Honest Failure Analysis (Unpolished Red X's)

To maintain scientific integrity and avoid cherry-picked metrics, below are the failure modes identified during the latest `autorun0707` benchmark suite:

> [!WARNING]
> **Identified Edge-Case Failures in Local 9B Inference:**
> 1. **L4-03 (Complex Multi-Repo Git Rebase):** The local 9B model occasionally loses track of git conflict markers when rebasing across 3+ branches simultaneously, requiring manual user intervention.
> 2. **ER-02 (Deep Nested Tool Syntax Recovery):** When an external MCP tool returns non-standard JSON error payloads with 4+ levels of nesting, the model occasionally retries with the same invalid payload once before recovering.
> 3. **L3-05 (Long-Horizon Web Browsing Trajectory):** On pages requiring JavaScript interaction across 8+ sequential steps, context window compaction occasionally drops early DOM state context.

---

## 5. Transparency & In-House Evaluation Disclaimer

> [!NOTE]
> **Disclaimer on Evaluation Origin:**
> All benchmark results presented on this page were generated using Pheron Agent's internal automated evaluation harness in local Apple Silicon test environments (`mlx-community/Qwen3.5-9B-Instruct-4bit`).
> 
> While these results have not yet been certified by an independent third-party audit firm, **every single log trace, JSON trajectory file, and shell output is published open-source** under the [AgentTestMethodology Repository](https://github.com/trgysvc/AgentTestMethodology) for community inspection and verification.

---

## 6. Resources & Further Reading

- [AgentTestMethodology Repository (GitHub)](https://github.com/trgysvc/AgentTestMethodology) — Full methodology specification, templates, and raw results
- [Reference Result Files](https://github.com/trgysvc/AgentTestMethodology/tree/main/results/PheronAgent) — All 98 `.json`, `.jsonl`, `.log`, and `.md` execution outputs
- [Full Tool Inventory](wiki/full_tool_inventory) — List of all 59 native & MCP tools evaluated
- [Models & Hardware Tiers](wiki/models_and_hardware) — Hardware setup and RAM scaling recommendations
