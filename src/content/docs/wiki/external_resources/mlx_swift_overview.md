# MLX Swift — Official GitHub Documentation

Source: `github.com/ml-explore/mlx-swift` and `github.com/ml-explore/mlx-swift-examples`

---

## What Is MLX Swift?

MLX Swift is the Swift API of the MLX framework, specifically optimized for Apple Silicon (M1–M4) GPU/ANE. Thanks to Unified Memory Architecture, CPU and GPU share the same physical memory — no data copying is necessary.

---

## Installation (Swift Package Manager)

```swift
// Package.swift
dependencies: [
    .package(url: "https://github.com/ml-explore/mlx-swift.git", from: "0.10.0")
],
targets: [
    .target(
        name: "MyTarget",
        dependencies: [
            .product(name: "MLX", package: "mlx-swift"),
            .product(name: "MLXNN", package: "mlx-swift"),
            .product(name: "MLXOptimizers", package: "mlx-swift"),
            .product(name: "MLXRandom", package: "mlx-swift"),
        ]
    )
]
```

---

## Core Libraries

| Library | Description |
|-----------|------------|
| `MLX` | Core array framework |
| `MLXNN` | Neural network layers |
| `MLXOptimizers` | Training utilities |
| `MLXRandom` | Random number generation |
| `MLXLLMCommon` | Unified LLM/VLM interface |
| `MLXLLM` | Language model implementations |
| `MLXVLM` | Vision model implementations |
| `MLXEmbedders` | Embedding implementations |

---

## Supported Model Types (mlx-swift-examples)

- **LLM**: Llama, Mistral, Qwen, Phi etc. — text generation and chat
- **VLM**: Vision Language Models — text + image processing
- **Embedding Models**: Semantic representation
- **Image Generation**: Stable Diffusion (SDXL Turbo)

---

## Core Architectural Concepts

### 1. Unified Memory

```
There is NO tensor.to('cuda') in MLX.
Arrays are shared by CPU and GPU from the same physical memory.
```

In Pheron Agent, `InferenceActor` evaluates context windows **without copying** using MLX memory. This is tracked via `WiredMemoryUtils`.

### 2. Lazy Evaluation

Arrays are computed only when actually needed. The computation graph is optimized.

### 3. Quantization

```swift
// 4-bit asymmetric quantization (group size 64)
// Weights are compressed; matrix multiplications are performed with ANE/GPU during computation
```

Pheron Agent configuration:
- `kvBits = 4`
- `kvGroupSize = 64`
- `maxKVSize = 8192` (up to 131072 with 16GB RAM)

### 4. Logit Processors & Grammar Constraints

```
By intervening in the token probabilities (logits) produced by the model,
only valid Swift Enum values or Tool UBIDs are produced.
Completely eliminates runtime errors like JSON Parsing Error.
```

### 5. Composable Transformations

- Automatic differentiation
- Automatic vectorization
- Computation graph optimization

---

## mlx-swift-examples Applications

| Application | Description |
|----------|------------|
| `LLMBasic` | Minimal: load model + evaluate prompt |
| `LLMEval` | Hugging Face download, tool integration, performance statistics |
| `MLXChatExample` | Full chat interface with LLM and VLM support |
| `StableDiffusionExample` | Image generation from prompt |
| `MNISTTrainer` | Neural network training on iOS/macOS |

---

## MLX Configuration in Pheron Agent

`InferenceActor.generate()` parameters:

```swift
// GenerateParameters
kvBits: 4
kvGroupSize: 64
maxKVSize: 8192          // 131072 with 16GB+ RAM
repetitionPenalty: 1.15
topP: 0.9
minP: 0.05
```

**Thinking mode:**
- `enableThinking: false` → `additionalContext["enable_thinking": false]` — simple chat (complexity == 1)
- `enableThinking: true` → default for plan/tool-use (complexity > 1)

---

## Reference Sources

- MLX Swift GitHub: `github.com/ml-explore/mlx-swift`
- MLX Swift Examples: `github.com/ml-explore/mlx-swift-examples`
- MLX C++/Python/Swift Docs: `ml-explore.github.io/mlx/`
- Apple ML Research: `ml-explore.github.io`
