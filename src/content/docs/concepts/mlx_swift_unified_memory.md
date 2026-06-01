# MLX Swift and Unified Memory Management

**Source:** [ml-explore - MLX Swift](https://ml-explore.github.io/mlx-swift/)

Pheron Agent uses the **MLX** library in its machine learning and LLM inference processes to extract maximum performance from Apple Silicon hardware. At the center of this integration lies the "Unified Memory" architecture.

## 1. Unified Memory Architecture
Apple Silicon chips feature an architecture where the CPU and GPU share the same physical memory.
- **Zero-Copy Transfer:** There is no need to copy data between the CPU and GPU. MLX supports this architecture natively. Instead of legacy conversions like `Array` (CPU) -> `Tensor` (GPU) -> `Array` (CPU), data is processed using the same memory address.
- **Performance:** Since copying overhead is eliminated, massive speedups are achieved in model loading and inference times.

## 2. Memory Management
- **Unified VRAM:** Pheron Agent applies dynamic VRAM management (`recommendedMaxWorkingSetSize`) to avoid exceeding available memory limits.
- **Proactive Monitoring:** OS `MemoryPressure` signals are monitored. When memory pressure increases, model loading configurations or context windows are compacted dynamically to prevent "Out of Memory" (OOM) errors.
- **Swift Layer:** Thanks to `mlx-swift`, Swift's Automatic Reference Counting (ARC) system works in harmony with MLX's C++-based memory management. Tensors whose operations have finished are cleared without delay.

## 3. Best Practices (for Pheron Agent)
- Unless absolutely necessary, avoid converting arrays to `MLXArray` or tensor formats and back. Complete as many operations as possible on the MLX (GPU/NPU) side.
- Adopt a "Pointer-Native" approach (UNO standards) when processing data inside `InferenceActor`.
- When testing memory limits or adding new LLM models, consider loading model weights using 4-bit quantization as the standard unless specified otherwise.
