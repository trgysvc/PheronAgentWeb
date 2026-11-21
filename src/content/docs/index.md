# Pheron Agent Documentation

Pheron Agent is a fully autonomous AI agent for macOS, built entirely on Apple Silicon. It runs local LLM inference via MLX, orchestrates multi-step tasks through the UNO (Unified Native Orchestration) architecture, and operates without sending your data to the cloud.

**Current version:** v1.0.6 · **Requires:** macOS 26.0+ (Tahoe or later), Apple Silicon (M1 or later)

---

## Getting Started

- [macOS Permissions & Setup](wiki/macos_onboarding_permissions_guide.md) — Grant required permissions and download your first local model
- [Models & Hardware Tiers](wiki/models_and_hardware.md) — Find the right model for your chip
- [Updating Pheron Agent](wiki/updating_pheron_agent.md) — Keep your application up to date

## Architecture

- [Architecture Overview](wiki/architecture_overview.md) — UNO pipeline, Swift 6 actors, Titan Engine
- [Local API (Titan Hub)](api.md) — REST endpoints for local inference and agent orchestration

## Core Features

- [Full Tool Inventory](wiki/full_tool_inventory.md) — Comprehensive inventory of all 74 native & MCP tools with UBIDs
- [External Tool Integrations Reference](wiki/external_tool_integrations_reference.md) — Detailed setup, auth, and action reference for MCP, REST, and Blender bridges
- [Lark Suite Setup](wiki/lark_suite_setup.md) — Step-by-step guide to connecting your Lark Suite app to Pheron Agent
- [LemonSqueezy & Kit Setup](wiki/lemonsqueezy_kit_setup.md) — Connect your LemonSqueezy store and Kit (ConvertKit) email list to Pheron Agent
- [LinkedIn & X Setup](wiki/linkedin_x_setup.md) — Connect your own LinkedIn and X (Twitter) accounts to Pheron Agent for posting
- [SkillVault](wiki/skill_vault.md) — Self-improving procedural memory
- [Native Tool Calling](wiki/native_tool_calling.md) — How the agent selects and executes tools
- [AudioIntelligence DSP](wiki/audio_intelligence.md) — Music DNA and audio analysis
- [System Stability & Self-Healing](wiki/system_stability.md) — AutoRecoveryEngine and context management

## Concepts & Engineering Standards

- [MLX for Swift - Core Concepts](concepts/MLX_Swift_Core.md) — MLX arrays, lazy evaluation and the Swift API surface
- [MLX Swift and Unified Memory Management](concepts/mlx_swift_unified_memory.md) — How unified memory shapes model loading and caching
- [MLX Metal Architecture & Internals](concepts/mlx_metal_internals.md) — Kernels, command buffers and GPU scheduling
- [LLM Inference Standards](concepts/llm_inference_mechanics.md) — Prefill, decode and KV-cache mechanics
- [Distributed Actors and UNO Isolation](concepts/distributed_actors.md) — Actor isolation inside the UNO architecture
- [XPC and Native IPC Standards](concepts/xpc_native_ipc.md) — Process boundaries and native inter-process communication
- [Swift API Design Standards](concepts/swift_api_standards.md) — Conventions used across the codebase

## Deep Dives

- [Triple-Threat Architecture Deep Dive](wiki/architecture_deep_dive.md) — How the three engines fit together
- [Apple Ecosystem & UNO Reference](wiki/apple_ecosystem_uno_reference.md) — Native Apple frameworks used by UNO
- [Memory Architecture](wiki/memory_architecture.md) — Short-term, long-term and procedural memory
- [Tooling Landscape Map](wiki/tooling_landscape.md) — Where each tool family lives
- [Performance & Optimization Roadmap](wiki/performance_roadmap.md) — Measured bottlenecks and planned work
- [Energy Profiling via Powermetrics](wiki/powermetrics_energy_tracking.md) — Measuring power draw on Apple Silicon
- [Blender Bridge Evolution](wiki/blender_bridge_evolution.md) — Stabilizing the Blender integration
- [Project Evolution History](wiki/evolution.md) — How the project got to its current design

## Advanced & Reference

- [Benchmark & Test Results](wiki/benchmark_results.md) — Universal AgentTestMethodology v7 evaluation metrics & OWASP security matrix
- [Security & Privacy](security.md) — On-device isolation, Privacy Guard, XPC sandboxing
- [Product Roadmap](future.md) — Upcoming features
- [v3 Migration Guide](wiki/v3_migration_guide.md) — Upgrading from mlx-swift-lm v2

---

For questions or support, see the [Help & Support](/resources/help) page.
