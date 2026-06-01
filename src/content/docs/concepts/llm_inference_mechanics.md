# LLM Inference Standards (Inference Mechanics)

Pheron Agent utilizes MLX's optimized data structures and algorithms when running Large Language Models (LLMs) locally. This document outlines the technical implementation details of models like Mistral, Llama, and Qwen on MLX.

## 1. KV Cache (Key-Value Cache) Management

During autoregressive (token-by-token) generation, saving the computed key and value vectors of previous tokens dramatically improves performance.

- **`MLXLMCommon.KVCache`:** Within MLX Swift, models manage history context using the `KVCache` protocol.
- **Dynamic Updates:** Only the KV vectors of the new token are computed and appended to the existing cache for each step (via the `update` method).
- **Quantized KV Cache:** On memory-constrained devices, the KV Cache itself can be quantized (e.g., 4-bit or 8-bit) and stored. This increases context window capacity while reducing VRAM usage by up to 50%.
- **Grouped-Query Attention (GQA):** Models like Llama 3 and Mistral use GQA to bypass memory bandwidth bottlenecks. MLX optimizes this structure on Metal, reducing the KV cache memory footprint and speeding up retrieval.

## 2. RoPE (Rotary Positional Embeddings)

Modern models (Llama 3, Mistral 7B, Qwen 2) use RoPE to understand the relative positions of tokens to one another.

- **`MLXFast.RoPE`:** MLX utilizes the optimized `MLXFast` library to execute this mathematical operation as quickly as possible on the GPU.
- **Dynamic Context Scaling:** For long context windows, RoPE coefficients can be scaled dynamically:
    - **Linear scaling:** Expands the context window by a constant multiplier.
    - **NTK-aware scaling:** Provides smart interpolation without distorting frequencies.
- **Precision:** RoPE calculations are typically maintained in `float32` precision to avoid positional information loss, and then cast to `float16` or `bfloat16`.

## 3. Model-Specific Optimizations

The Pheron Agent core runs different model architectures on MLX using a "Native-First" approach:

- **SwiGLU & SILU Activation:** MLX's kernel fusion capabilities merge activation functions with matrix multiplication (Gemm) kernels to optimize GPU register usage.
- **Weight Fusion:** During model load, bit-packed quantized weights are loaded directly into GPU VRAM, and dequantization is performed on-the-fly during computation.
- **Tokenizer Consistency:** BPE and SentencePiece tokenizers are processed natively in Swift using the `Tokenizers` package, reducing Python dependency to zero.

## 4. Memory Anchoring

When designing an AI agent, the layout of model weights and the KV Cache in memory must be considered as constraints.

- **Pinned Memory:** To prevent swapping memory to disk during inference, data is kept "wired" (anchored) in unified memory.
- **Unified Memory Sharing:** Pheron Agent sets dynamic but safe bounds using the `mx.metal.set_cache_limit` and `mx.metal.set_memory_limit` APIs, keeping the system's remaining memory requirements in view.

---
**References:**
- [mlx-swift-lm - Model Implementations](https://github.com/ml-explore/mlx-swift-lm)
- [Grouped-Query Attention: Efficiently Scaling Transformer Query Heads](https://arxiv.org/abs/2305.13245)
- [RoPE: Rotary Positional Embeddings - Su et al.](https://arxiv.org/abs/2104.09864)
- [Apple MLX Documentation - Memory Management](https://ml-explore.github.io/mlx/build/html/usage/memory.html)
