# Pheron Agent Documentation

Pheron Agent is a fully autonomous AI agent for macOS, built entirely on Apple Silicon. It runs local LLM inference via MLX, orchestrates multi-step tasks through the UNO (Unified Native Orchestration) architecture, and operates without sending your data to the cloud.

**Current version:** v10.5.7 · **Requires:** macOS 15.0+, Apple Silicon (M1 or later)

---

## Getting Started

- [macOS Permissions & Setup](wiki/macos_onboarding_permissions_guide.md) — Grant required permissions and download your first local model
- [Models & Hardware Tiers](wiki/models_and_hardware.md) — Find the right model for your chip
- [Updating Pheron Agent](wiki/updating_pheron_agent.md) — Keep your application up to date

## Architecture

- [Architecture Overview](wiki/architecture_overview.md) — UNO pipeline, Swift 6 actors, Titan Engine
- [Local API (Titan Hub)](api.md) — REST endpoints for local inference and agent orchestration

## Core Features

- [SkillVault](wiki/skill_vault.md) — Self-improving procedural memory
- [Native Tool Calling](wiki/native_tool_calling.md) — How the agent selects and executes tools
- [AudioIntelligence DSP](wiki/audio_intelligence.md) — Music DNA and audio analysis
- [System Stability & Self-Healing](wiki/system_stability.md) — AutoRecoveryEngine and context management

## Advanced & Reference

- [Security & Privacy](security.md) — On-device isolation, Privacy Guard, XPC sandboxing
- [Product Roadmap](future.md) — Upcoming features
- [v3 Migration Guide](wiki/v3_migration_guide.md) — Upgrading from mlx-swift-lm v2
- [Performance Optimization Report](wiki/performance_optimization_report.md) — KV cache, speculative decoding, wired memory

---

For questions or support, see the [Help & Support](/resources/help) page.
