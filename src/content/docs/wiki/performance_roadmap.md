# Performance & Optimization Roadmap (v7.1 - Revised)

This document details the plan (with v7.1 revision) to maximize system performance using Apple Silicon and MLX hardware capabilities, in line with the Pheron Agent v7.0 "Native Sovereign" vision.

## 1. Metal Level: GPU Command Traffic and Graph Sealing

We will minimize the command load on the GPU by leveraging MLX's "Lazy Evaluation" and "Graph Capture" capabilities.

### Target: 40% Less CPU Overhead
- **`mx.compile` + Fixed-Shape Padding:** The `forward` pass inside `InferenceActor` will be sealed using a "Pad-to-Power-of-2" strategy to avoid constantly triggering re-compilation at dynamic context lengths. Context length is compiled in fixed blocks (e.g. 512, 1024, 2048, 4096) to eliminate unnecessary re-compilation.
- **Lazy Eval Synchronization:** Access to tensor contents for visualization (`updateSharedBuffer`) and logging will only be done asynchronously, after `mx.eval()`. Synchronous `item()` calls inside the hot loop are forbidden.
- **Thermal-Aware Scheduling:** Instead of manual `MTLCommandQueue` priorities, dynamic prioritization that works in harmony with the macOS thermal management system will be used.

## 2. Memory Level: Hardware-Native Zero-Copy IPC

We will apply the "Zero-Copy" principle in the UNO (Unified Native Orchestration) architecture to cross Sandbox barriers.

### Target: Microsecond-Level IPC Latency
- **IOSurface-backed MTLBuffer:** Instead of pure pointers or raw `Data` packets across XPC boundaries, "IOSurface"-backed `MTLBuffer` references or shared memory regions via `mach_port` will be used. This enables cross-process GPU memory access without violating Sandbox.
- **Unmanaged Pointer Management:** `Unmanaged` pointer management will be applied to prevent Swift's ARC (Automatic Reference Counting) from freeing memory before the XPC side operation completes.
- **Binary Stream Optimization:** PropertyListEncoder will be completely disabled; data will be written directly to shared memory regions in binary format.

## 3. Inference Level: KV-Cache and Shared Prefix Strategy

Freezing the context and applying dynamic quantization for TTFT (Time to First Token) optimization.

### Target: 50% Faster 'First Token' Latency (TTFT)
- **Shared Prefix (KV-Cache Frozen State):** The KV-Cache computed for Pheron Agent's immutable "System Prompt" will be frozen using the `KVCache.offset` property. The system prompt will not be re-processed on each new inference.
- **Dynamic 8-bit Quantization:** 8-bit KV-Cache quantization will only be activated in "Low Memory" (Memory Pressure) states as determined by `SystemWatchdog`. In standard mode, 16-bit (Precision) will be maintained to preserve attention accuracy.

## 4. Revised Implementation Timeline (v7.1)

| Phase | Title | Technical Detail | Priority |
|---|---|---|---|
| Phase 1 | Graph Sealing | `mx.compile` + Fixed-Shape Padding | **CRITICAL** |
| Phase 2 | KV-Cache Frozen State | Shared Prefix (`KVCache.offset`) integration | **HIGH** |
| Phase 3 | Hardware IPC | IOSurface-based Zero-Copy XPC Transport | **MEDIUM** |
| Phase 4 | Dynamic Quant | Memory-Pressure based 8-bit KV-Cache | **LOW** |

---
**Approved by:** Pheron Agent Autonomous Architect
**Revision:** v7.1 (Hardware-Native Hardware-Aware)

---
**Approved by:** Pheron Agent Autonomous Architect
**Status:** Draft
