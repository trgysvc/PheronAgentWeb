# Local Models & Hardware Scaling

Pheron Agent is designed exclusively for on-device inference using Apple Silicon. It dynamically adapts its LLM execution parameters, KV cache sizes, and speculative decoding settings to fit the specific hardware capabilities of your Mac.

---

## 1. Supported Local Models (mlx-community Catalog)

Pheron Agent relies on a local model catalog registered in `ModelRegistry` (specifically under the `mlx-community` Hugging Face organization). Below are the verified models categorized by family:

### Qwen3 Dense
| Model | HF Repo | Disk Size | Min. RAM | Tool Calling | Thinking Mode |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Qwen3-0.6B-4bit** | `mlx-community/Qwen3-0.6B-4bit` | 0.35 GB | 1 GB | ✓ | ✓ |
| **Qwen3-1.7B-4bit** | `mlx-community/Qwen3-1.7B-4bit` | 0.97 GB | 2 GB | ✓ | ✓ |
| **Qwen3-4B-4bit** | `mlx-community/Qwen3-4B-Instruct-2507-4bit` | 2.28 GB | 4 GB | ✓ | ✓ |
| **Qwen3-8B-4bit** | `mlx-community/Qwen3-8B-4bit` | 4.62 GB | 6 GB | ✓ | ✓ |
| **Qwen3-14B-4bit** | `mlx-community/Qwen3-14B-4bit` | 8.32 GB | 10 GB | ✓ | ✓ |
| **Qwen3-32B-4bit** | `mlx-community/Qwen3-32B-4bit` | 18.4 GB | 22 GB | ✓ | ✓ |

### Qwen3 MoE
| Model | HF Repo | Disk Size | Min. RAM | Tool Calling | Thinking Mode |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Qwen3-30B-A3B-4bit** | `mlx-community/Qwen3-30B-A3B-Instruct-2507-4bit` | 17.2 GB | 21 GB | ✓ | ✓ |
| **Qwen3-Coder-30B-A3B-4bit** | `mlx-community/Qwen3-Coder-30B-A3B-Instruct-4bit` | 17.2 GB | 21 GB | ✓ | — |
| **Qwen3-235B-A22B-4bit** | `mlx-community/Qwen3-235B-A22B-4bit` | 132 GB | 158 GB | ✓ | ✓ |
| **Qwen3-Coder-480B-A35B-4bit** | `mlx-community/Qwen3-Coder-480B-A35B-Instruct-4bit` | 270 GB | 324 GB | ✓ | — |

### Llama
| Model | HF Repo | Disk Size | Min. RAM | Tool Calling | Thinking Mode |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Llama-3.2-1B-4bit** | `mlx-community/Llama-3.2-1B-Instruct-4bit` | 0.71 GB | 1 GB | ✓ | — |
| **Llama-3.2-3B-4bit** | `mlx-community/Llama-3.2-3B-Instruct-4bit` | 1.82 GB | 3 GB | ✓ | — |
| **Llama-3.1-8B-4bit** | `mlx-community/Meta-Llama-3.1-8B-Instruct-4bit` | 4.53 GB | 6 GB | ✓ | — |
| **Llama-3.3-70B-4bit** | `mlx-community/Llama-3.3-70B-Instruct-4bit` | 39.7 GB | 48 GB | ✓ | — |
| **Llama-4-Scout-4bit** | `mlx-community/Llama-4-Scout-17B-16E-Instruct-4bit` | 61.1 GB | 73 GB | ✓ | — |
| **Llama-4-Maverick-4bit** | `mlx-community/Llama-4-Maverick-17B-128E-Instruct-4bit` | 226 GB | 271 GB | ✓ | — |

### Gemma
| Model | HF Repo | Disk Size | Min. RAM | Tool Calling | Thinking Mode |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Gemma-3-1B-4bit** | `mlx-community/gemma-3-1b-it-4bit` | 0.77 GB | 1 GB | Partial | — |
| **Gemma-3-4B-4bit** | `mlx-community/gemma-3-4b-it-4bit` | 3.44 GB | 5 GB | Partial | — |
| **Gemma-3-12B-4bit** | `mlx-community/gemma-3-12b-it-4bit` | 8.07 GB | 10 GB | Partial | — |
| **Gemma-3-27B-4bit** | `mlx-community/gemma-3-27b-it-4bit` | 16.9 GB | 20 GB | Partial | — |
| **Gemma-4-E4B-4bit** | `mlx-community/gemma-4-e4b-it-4bit` | 5.25 GB | 7 GB | ✓ | ✓ |
| **Gemma-4-26B-MoE-4bit** | `mlx-community/gemma-4-26b-a4b-it-4bit` | 15.6 GB | 19 GB | ✓ | ✓ |

### Mistral
| Model | HF Repo | Disk Size | Min. RAM | Tool Calling | Thinking Mode |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Mistral-7B-v0.3-4bit** | `mlx-community/Mistral-7B-Instruct-v0.3-4bit` | 4.08 GB | 5 GB | ✓ | — |
| **Mistral-Nemo-12B-4bit** | `mlx-community/Mistral-Nemo-Instruct-2407-4bit` | 6.91 GB | 9 GB | Partial | — |
| **Mistral-Small-24B-4bit** | `mlx-community/Mistral-Small-24B-Instruct-2501-4bit` | 13.3 GB | 16 GB | ✓ | — |
| **Mistral-Small-3.2-24B-4bit** | `mlx-community/Mistral-Small-3.2-24B-Instruct-2506-4bit` | 13.3 GB | 16 GB | ✓ | — |
| **Mistral-Large-123B-4bit** | `mlx-community/Mistral-Large-Instruct-2407-4bit` | 69 GB | 83 GB | ✓ | — |

### Phi & DeepSeek
| Model | HF Repo | Disk Size | Min. RAM | Tool Calling | Thinking Mode |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Phi-4-mini-4bit** | `mlx-community/Phi-4-mini-instruct-4bit` | 2.18 GB | 3 GB | ✓ | — |
| **Phi-4-14B-4bit** | `mlx-community/phi-4-4bit` | 8.25 GB | 10 GB | Partial | — |
| **DeepSeek-Coder-V2-Lite-4bit** | `mlx-community/DeepSeek-Coder-V2-Lite-Instruct-4bit-mlx` | 8.84 GB | 11 GB | Partial | — |

### Model Selection & Recommendation Logic

Pheron Agent evaluates and auto-selects the best model using the `ModelSelector` helper when first setting up:
1. **Memory Budget constraint:** The model's minimum RAM requirement must fit within the model memory budget (`modelBudgetGB`), which is set to **65% of physical UMA RAM** (leaving 35% headroom for the OS, apps, and the KV cache).
2. **Feature requirements:** The model must support native tool calling (since the agent relies heavily on tool executions).
3. **Reasoning priority:** Thinking mode support is highly preferred for better planning and system orchestration.
4. **Architecture Preference:** Priority is ranked as **Qwen 3.5 / Qwen 3** (Priority 3) > **Llama 3.x** (Priority 2) > **Gemma 3/4** (Priority 1) > others (0).
5. **Fallback:** If no eligible model fits the 65% memory budget, the system falls back to the lightest local model (e.g. `Llama-3.2-3B-Instruct-4bit` or `Qwen3-0.6B-4bit`).

---

## 2. macOS Hardware Tiers

Pheron Agent classifies Apple Silicon M-series hardware profiles into four tiers based on memory bandwidth:

| Hardware Tier | Memory Bandwidth | Estimated Chips | Performance Capability |
|---|---|---|---|
| **Starter (Base)** | 68 – 120 GB/s | M1, M2, M3, M4 base (16 GB) | Suitable for Qwen3-4B, Llama-3.2-3B. Specs limit visual model context. |
| **Mid (Pro)** | 150 – 273 GB/s | M1 Pro, M2 Pro, M3 Pro, M4 Pro | Standard tier. Supports Qwen3-8B / 14B and Speculative Decoding. |
| **High (Max)** | 300 – 546 GB/s | M1 Max, M2 Max, M3 Max, M4 Max | Premium tier. Supports large KV cache and high speculative acceptance rates. |
| **Ultra (Ultra)** | 800 – 819 GB/s | M1 Ultra, M2 Ultra, M3 Ultra | Ultimate tier. Zero-quantization FP16 KV cache and large context capacities. |

---

## 3. Dynamic KV Cache Scaling

To prevent out-of-memory (OOM) crashes under heavy orchestration loops, Pheron Agent scales the context limits and quantization level of the Key-Value (KV) cache dynamically based on **RAM headroom** (available memory after model weight loading):

| Free RAM Headroom | Max KV Cache Size | KV Quantization | FP16 Start Guard | Context Limit |
|---|---|---|---|---|
| **< 2 GB** | 4,096 tokens | 4-bit | 0 tokens (No FP16 start) | 4,096 |
| **2 – 4 GB** | 8,192 tokens | 4-bit | First 256 tokens in FP16 | 8,192 |
| **4 – 8 GB** | 16,384 tokens | 4-bit | First 256 tokens in FP16 | 16,384 |
| **8 – 16 GB** | 32,768 tokens | 4-bit | First 256 tokens in FP16 | 32,768 |
| **16 – 32 GB** | 65,536 tokens | 8-bit (if BW ≥ 200 GB/s) / 4-bit | First 256 tokens in FP16 | 65,536 |
| **≥ 32 GB** | 131,072 tokens | None (FP16 KV) | FP16 throughout | 131,072 |

> [NOTE]
> **FP16 Start Guard:** To prevent quality degradation on critical prefix tokens (like system instructions and tool definitions), the first 256 tokens are generated in full FP16 precision. Subsequent tokens are quantized on-the-fly.

---

## 4. Speculative Decoding Optimization

Speculative Decoding speeds up local text generation by utilizing a smaller, fast **draft model** alongside the heavy **main model**. The draft model predicts a sequence of tokens, which are verified in parallel by the main model in a single GPU pass.

### Requirements & Trigger Conditions
1. **Compatible tokenizer family:** The draft and main model must share the exact same vocabulary/tokenizer (e.g. Qwen3-0.6B draft paired with Qwen3-8B main).
2. **Headroom requirement:** Requires at least **4 GB of RAM headroom** free.
3. **Memory bandwidth:** Requires a chip with at least **130 GB/s bandwidth** (Mid Pro tier or higher).
4. **Draft Token Sizing:**
   - **BW ≥ 260 GB/s** (High Max tier): Speculates **6 tokens** ahead per step.
   - **BW 130 – 260 GB/s** (Mid Pro tier): Speculates **4 tokens** ahead per step.

> [WARNING]
> **KV Cache Compatibility:** Speculative decoding requires a trimmable KV Cache (`KVCacheSimple`) to backtrack rejected tokens. Since Quantized KV Cache in MLX does not support token trimming, **KV Cache Quantization is automatically disabled (`kvBits = nil`)** whenever speculative decoding is active.

---

## 5. Apple Silicon RAM Profile Matrix & VLM Support

Below is the verified profile matrix mapping Apple Silicon RAM capacities to local runnable models and VLM capabilities:

| UMA RAM Tier | Compatible local models |
| :---: | :--- |
| **8 GB** | Qwen3-0.6B, Qwen3-1.7B, Qwen3-4B, Qwen3-8B · Llama-3.2-1B, Llama-3.2-3B, Llama-3.1-8B · Gemma-3-1B, Gemma-3-4B, Gemma-4-E4B · Mistral-7B · Phi-4-mini |
| **16 GB** | *All 8 GB models plus:*<br>Qwen3-14B · Gemma-3-12B · Mistral-Nemo-12B, Mistral-Small-24B · Phi-4-14B · DeepSeek-Coder-V2-Lite |
| **24 GB** | *All 16 GB models plus:*<br>Qwen3-32B, Qwen3-30B-A3B · Gemma-3-27B, Gemma-4-26B · Mistral-Small-3.2-24B |
| **32 GB** | *All 24 GB models plus:*<br>Qwen3-Coder-30B |
| **48 GB** | *All 32 GB models plus:*<br>Llama-3.3-70B |
| **64 GB** | *All 48 GB models* (Note: Qwen3-72B was not released as a dense model, hence not present in this catalog). |
| **128 GB** | *All 64 GB models plus:*<br>Mistral-Large-123B · Llama-4-Scout |
| **192 GB** | *All 128 GB models plus:*<br>Qwen3-235B-A22B |
| **512 GB** | *All 192 GB models plus:*<br>Qwen3-Coder-480B · Llama-4-Maverick |

### 👁️ VLM (Vision Language Model) Support & Implementation Status

Pheron Agent features a fully implemented `VLMInferenceActor.swift` running natively on top of the Apple `MLXVLM` framework. Visual model integration handles screen reading and semantic understanding (specifically mapped to the `semantic_vision` tool / UBID 84):

* **RAM < 24 GB:** VLM is disabled. The `semantic_vision` tool yields a fallback mechanism that switches to local Optical Character Recognition (OCR), producing clear system degradation warnings without crashing.
* **RAM 24–31 GB:** Auto-activates **`mlx-community/Qwen2.5-VL-3B-Instruct-4bit`** (~2.0 GB disk space, ~2.0 GB VRAM allocation).
* **RAM 32 GB+:** Auto-activates **`mlx-community/Qwen3-VL-4B-Instruct-MLX-4bit`** (~2.5 GB disk space, ~2.5 GB VRAM allocation).

> [!NOTE]
> **User Override Option:** Users can bypass the automatic memory gating by setting the `vlmEnabled` override in `UserDefaults` (`UserDefaults.standard.set(true, forKey: "vlmEnabled")`). However, manual activation on low-RAM profiles may degrade KV Cache sizes and compromise overall stability.

#### ⚠️ Catalog & Recommendation Gaps
While the architecture scales dynamically with memory, the current codebase's `recommendedModelID()` function is hardcoded to only recommend the two models above. Higher-end visual tiers are currently not natively selected:
* **Qwen2.5-VL-7B-Instruct-4bit** (Disk: ~4.5 GB, Min RAM: 48 GB) - *Unsupported by default selection logic.*
* **Qwen2.5-VL-72B-Instruct-4bit** (Disk: ~41 GB, Min RAM: 64 GB) - *Unsupported by default selection logic.*
* **Llama-4-Scout (multimodal)** (Disk: 61 GB, Min RAM: 128 GB) - *Unsupported by default selection logic.*

To enable these, a future update to the `recommendedModelID()` catalog selection helper is required.

---

## 6. Model Execution Local File Requirements

For Pheron Agent to successfully initialize and execute a model locally, specific configuration and weights files must be present under the local directory structure.

### Local Directory Structure
All models are stored under:
```bash
~/Library/Application Support/PheronAgent/Models/[model-id]/
```
Where `[model-id]` corresponds to the specific model name in `ModelRegistry` (e.g. `qwen3.5-9b-4bit`).

### Mandatory File Checklist
Each folder must contain the following verified files resolved from Hugging Face:

1. **`config.json` (Required)**
   * Defines the neural architecture (e.g. `Qwen2ForCausalLM`, `LlamaForCausalLM`). Contains network dimension sizes, hidden layers, head counts, and model types. If missing or corrupt (e.g., HF 401/404 HTML pages), model loading throws immediate errors.
2. **`tokenizer.json` (Required)**
   * Stores the complete vocabulary lists, special token encodings, and BPE merges.
3. **`tokenizer_config.json` (Required)**
   * Tokenizer parameters, templates, and instruction formats. Pheron Agent has self-healing bridge mechanisms (`UNOExternalBridge.patchTokenizerConfig`) to inject missing chat templates if not present in the downloaded repo.
4. **`generation_config.json` (Highly Recommended)**
   * Outlines output parameters, bounds, and most importantly, stop tokens (necessary for Qwen3.5/MLX v3 architectures to prevent runaway token generation).
5. **`special_tokens_map.json` (Recommended)**
   * Configures map indexes for special tags like `<|im_start|>`, `<|im_end|>`, `<|endoftext|>`.
6. **`preprocessor_config.json` (Vision Models Only)**
   * Configures the visual preprocessor grid parameters, normalisation, and patching size. **Absolutely required** for VLM execution (`Qwen2.5-VL-3B` and `Qwen3-VL-4B`).
7. **Weights Files (`.safetensors`) (Required)**
   * **Single-file models:** Smaller models (<4B parameters) load a single `model.safetensors` weight file.
   * **Sharded models:** Large parameters are split into shards. They must be named precisely `model-00001-of-XXXXX.safetensors` up to `model-XXXXX-of-XXXXX.safetensors` (where `XXXXX` is the total shard count).
   * *Example (Qwen3-14B):* Must have `model-00001-of-00002.safetensors` and `model-00002-of-00002.safetensors`.
   * *Example (Llama-3.3-70B):* Must have shards `model-00001-of-00008.safetensors` through `model-00008-of-00008.safetensors`.
   * **Important:** If even one shard is missing or partially downloaded, the model load sequence will abort and roll back.


