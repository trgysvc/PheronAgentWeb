# Pheron Agent Memory Architecture (v30.5)

Pheron Agent has a tiered memory structure designed to prevent "Context Tearing" and maximize Apple Silicon hardware (GPU/Metal) usage.

## 1. Tiered Memory Layers

| Layer | Name | Source | Limit | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **L1** | Hot Memory | RAM (MemoryAgent) | 12 Messages (6 Turns) | Holds the immediate conversation stream in raw form. |
| **L2** | Warm Memory | Markdown (Daily Notes) | 2,000 Characters | Chronological record of tasks done today and yesterday. |
| **L3** | Cold Memory | Markdown (DreamBank) | 2,000 Characters (Summarized) | Strategic and technical summaries of past sessions. |

## 2. Metal-Accelerated RAG (Experience Vault)

Instead of using CPU cycles to search through thousands of experiences and habits, Pheron Agent directly uses GPU parallelism.

- **Technology:** `VectorOps.metal` (Cosine Similarity Kernel).
- **Performance:** O(N) scan operations are reduced to millisecond levels using Metal shaders.
- **Data Type:** SQLite BLOB (Float32 Vectors) + Apple NaturalLanguage Embeddings.

## 3. Habit Discovery

The agent discovers user preferences and its own successful patterns through `DreamActor` (Consolidator).

- **Mechanism:** In the dream phase, the LLM reports recurring patterns as `## Discovered Habits`.
- **Storage:** These habits are vectorized and saved to the `ExperienceVault.habits` table, and automatically injected into context in future similar tasks.

## 4. Smart Truncation

**Head+Tail** protection logic is applied to prevent technical data (Telemetry, Log, Code) from falling into the "150-character trap":
- If data exceeds 2,000 characters; the top 40% and the bottom 40% are preserved, and the middle is compressed with a seal.
- This way, error messages (usually at the end) and context (usually at the beginning) are never lost.
