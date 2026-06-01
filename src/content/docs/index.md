# Pheron Agent Wiki

Pheron Agent is a local AI assistant and orchestration engine running on Apple Silicon, built with Swift 6 and MLX. This wiki aggregates the project architecture, documentation, and development processes in a centralized place.

**Version:** v10.5.7 "SkillVault" | **Last Updated:** 2026-05-10

## Project Goal
The primary goal of Pheron Agent is to leverage the local hardware capabilities of the Apple ecosystem (Neural Engine, Unified Memory) to deliver a high-performance, secure, and sovereign autonomous agent experience without leaking data to the external world.

---

## ⛔ Rules (Must Read for Every AI Agent)
- [**Software Production Rules — MANDATORY**](rules.md) ← JSON ban, DispatchQueue ban, UNO rules

---

## Wiki Contents

### 🏗 Architecture & Audit Reports
- [**Comprehensive Technical Audit Report (2026-05-02)**](wiki/audit_report_2026-05-02.md)
- [Architecture Overview](wiki/architecture_overview.md)
- [Architecture Deep Dive (Triple-Threat)](wiki/architecture_deep_dive.md)
- [System Stability and Self-Healing](wiki/system_stability.md)
- [Project Evolution History](wiki/evolution.md)
- [Gap Analysis & Evolution](wiki/gap_analysis.md)
- [v3-Native Migration Guide (v7.1+)](wiki/v3_migration_guide.md)

### 🚀 Current Implementation Docs (v10.x)
- [**SkillVault — Self-Improving Procedural Memory**](wiki/skill_vault.md) ← NEW (2026-05-10)
- [**Native Tool Calling — Implementation Guide**](wiki/native_tool_calling.md) ← (2026-05-04)
- [**Performance Optimizations — Implementation Report**](wiki/performance_optimization_report.md) ← (2026-05-04)

### 📚 Core Concepts & Technical Standards
- [Distributed Actors and UNO Isolation Architecture](concepts/distributed_actors.md)
- [MLX Swift and Unified Memory Management](concepts/mlx_swift_unified_memory.md)
- [MLX Metal Architecture and GPU Internals](concepts/mlx_metal_internals.md)
- [LLM Inference Standards (KV Cache, RoPE)](concepts/llm_inference_mechanics.md)
- [Swift API Design Standards](concepts/swift_api_standards.md)
- [XPC and Native IPC Standards](concepts/xpc_native_ipc.md)
- [MLX Swift Core Concepts](concepts/MLX_Swift_Core.md)

### 🛠 Tools and Integrations
- [Tooling Landscape Map](wiki/tooling_landscape.md)
- [Blender Bridge Pro-Grade Stabilization](wiki/blender_bridge_evolution.md)

---

## Hot Memory (Current Status)
- [Current Context and Status](h.md)

---

## Resources (Raw Data)

### 📜 Development History
- [[DevelopmentConversations]] - Detailed records of the entire development process.
- [[devlog]] - Daily technical notes and progress reports.
- [[CHANGELOG]] - Version changes and major updates.
- [[README]] - General getting started documentation.

### 📐 Requirements and Design
- [[PheronAgent_PRD_v5.2]] - Product requirements document.
- [[all_features]] - List of all system features.
- [[Audio Intelligence Platform]] - Audio intelligence platform vision.

### 🛠️ Tools and Knowledge Base
- [[PheronAgentTools]] - Main toolset documentation.
- [[MusicTools]] - Music and audio processing tools.
- [[KNOWLEDGE_BlenderAPI]] - Blender API integration guide.

### ⚙️ System Configuration and Testing
- [[UNO_BATTLE_TEST]] - UNO protocol stress and capability tests.
- [[Package.swift]] - Swift package configuration.
- [[project_tree]] - Project tree structure.
- [[entry_point_code]] - Entry point code examples.
