# Local API (Titan Hub)

Pheron Agent features a built-in, native HTTP/REST server named **Titan Hub**. When enabled, it runs directly inside the macOS client application, exposing model inference and the autonomous orchestrator engine to external developer scripts, tools, and integrations.

---

## 1. Enabling Titan Hub

To start the local API server, open Pheron Agent and navigate to **Settings → AI → Titan Hub**:
- **Enable Local API Server (Titan Hub)**: Toggle this switch to **ON**.
- **Port**: Default is `11500` (can be changed to any open port, e.g. `11434` for default Ollama drop-in setups).
- **Status Indicator**: Shows **Server Ready** when the server is actively listening for incoming TCP requests.

---

## 2. API Endpoints Reference

All endpoints accept and return JSON payloads.

### GET `/api/health` — Health Check
Checks the status of the server and verifies if a local model is loaded in unified memory.

* **Request**:
  ```bash
  curl -i http://localhost:11500/api/health
  ```
* **Response (200 OK)**:
  ```json
  {
    "status": "ok",
    "model_loaded": true,
    "port": 11500
  }
  ```

---

### GET `/api/tags` — List Available Models
Returns a list of local models currently registered and available in the `ModelRegistry`.

* **Request**:
  ```bash
  curl -i http://localhost:11500/api/tags
  ```
* **Response (200 OK)**:
  ```json
  {
    "models": [
      {
        "name": "Qwen3-8B-4bit",
        "id": "qwen3-8b-4bit"
      },
      {
        "name": "Llama-3.2-3B-4bit",
        "id": "llama-3.2-3b-4bit"
      }
    ]
  }
  ```

---

### POST `/api/generate` — Ollama-Compatible Inference
A drop-in replacement for the standard Ollama generation endpoint. Initiates streaming token generation.

* **Request**:
  ```bash
  curl -X POST http://localhost:11500/api/generate \
    -H "Content-Type: application/json" \
    -d '{
      "prompt": "Write a short poem about Apple Silicon."
    }'
  ```
* **Stream Response Format**:
  ```json
  {"response": "In", "done": false}
  {"response": " the", "done": false}
  {"response": " silicon", "done": false}
  {"response": " heart...", "done": false}
  {"response": null, "done": true}
  ```

---

### POST `/v1/chat/completions` — OpenAI-Compatible Inference
Allows standard OpenAI client SDKs to query local models by simply updating the `baseURL` parameter.

* **Request**:
  ```bash
  curl -X POST http://localhost:11500/v1/chat/completions \
    -H "Content-Type: application/json" \
    -d '{
      "messages": [
        {"role": "user", "content": "Explain unified memory."}
      ],
      "max_tokens": 100
    }'
  ```

---

### POST `/api/agent` — Otonom Orchestrator Pipeline
Triggers the full, autonomous Orchestrator pipeline. The agent will parse the task, select tools, edit local files, execute shell actions, and return the final answer.

> [!CAUTION]
> **Safety Guard**: Since otonom agents can write to files and run zsh shell actions locally, requests to `/api/agent` are ran sequentially. If another task is in-flight, a `400 Bad Request` with an `error: "BUSY"` payload will be returned.

* **Parameters**:
  - `prompt` (string, required): The task prompt description.
  - `workspace` (string, optional): Absolute path to the folder the agent should work inside (defaults to application support workspace).
  - `complexity` (int, optional): Complexity scale `1` (7 turns limit) or `2` (30 turns limit).

* **Request**:
  ```bash
  curl -X POST http://localhost:11500/api/agent \
    -H "Content-Type: application/json" \
    -d '{
      "prompt": "Inspect the files under ~/Desktop/Project and summarize them",
      "complexity": 2
    }'
  ```
* **Response (200 OK)**:
  ```json
  {
    "response": "Successfully inspected the folder. Summary of project: ...",
    "toolsUsed": ["File Manager", "Read File", "Markdown Report"],
    "category": "File",
    "done": true,
    "error": null
  }
  ```

---

## 3. Telemetry and Usage Tracking

Inference and orchestrator sessions run via the API are tracked locally in the application dashboard:
- **Tokens**: Total tokens processed.
- **Cost**: Local operations are recorded at **$0.000**.
- **Speed**: Measured in tokens per second (`t/s`).
- **Joule Metrics**: Exact energy footprint of the local GPU/CPU compute during the API call.
