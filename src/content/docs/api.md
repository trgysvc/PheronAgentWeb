# Local API (Titan Hub)

Pheron Agent has a built-in local server called **Titan Hub**. When you turn it on, the app itself starts listening for web requests on your Mac — no cloud, no external server. Any script, tool, or app on your Mac (or your local network) can then talk to your local AI models and to the full autonomous agent, the same way it would talk to a cloud API.

---

## 1. Turning on Titan Hub

1. Open Pheron Agent.
2. Go to **Settings → AI** tab.
3. Find the **Titan Hub (Local API Server)** section.
4. Switch **Enable Local API Server (Titan Hub)** to **ON**.
5. **Port**: `11500` by default. You can change it to any free port (for example `11434`, the default Ollama port, if you want existing Ollama-based tools to connect without changes).
6. A green **Server Ready** indicator appears once the server is actually listening. If it still says **Stopped**, the toggle didn't take effect — try switching it off and on again.

---

## 2. API Endpoints Reference

All requests and responses use JSON.

### GET `/api/health` — Health Check
Checks whether the server is running and whether a model is currently loaded in memory.

* **Request**:
  ```bash
  curl -i http://localhost:11500/api/health
  ```
* **Response (200 OK)**:
  ```json
  {
    "status": "ok",
    "model_loaded": true,
    "port": 11500,
    "is_busy": false,
    "orphaned_generations": 0
  }
  ```
  - `is_busy`: `true` while the server is already handling an `/api/agent` request (see the note about concurrency below).
  - `orphaned_generations`: a counter for requests that timed out internally and could not be fully cancelled. Normally `0`; a rising number across a long session can indicate the model got stuck and the app may benefit from a restart.

---

### GET `/api/tags` — List Available Models
Returns the models currently registered on your Mac.

* **Request**:
  ```bash
  curl -i http://localhost:11500/api/tags
  ```
* **Response (200 OK)**:
  ```json
  {
    "models": [
      { "name": "Qwen3.5 9B", "id": "qwen3.5-9b-4bit" },
      { "name": "Llama 3.2 1B Draft", "id": "llama3.2-1b-4bit-draft" }
    ]
  }
  ```
  The exact list depends on which models you've downloaded — see [Models & Hardware Tiers](wiki/models_and_hardware.md).

---

### POST `/api/generate` — Raw Text Generation (Ollama-style request)
Sends a single prompt straight to the local model and streams the answer back token by token. This does **not** run tools or the autonomous agent — for that, use `/api/agent` below.

* **Request**:
  ```bash
  curl -X POST http://localhost:11500/api/generate \
    -H "Content-Type: application/json" \
    -d '{
      "prompt": "Write a short poem about Apple Silicon.",
      "max_tokens": 200
    }'
  ```
* **Streamed response** (one small JSON object per chunk, `Transfer-Encoding: chunked`):
  ```json
  {"response": "In", "done": false}
  {"response": " the", "done": false}
  {"response": " silicon", "done": false}
  {"response": " heart...", "done": false}
  {"response": null, "done": true}
  ```

---

### POST `/v1/chat/completions` — Chat-Style Text Generation
Accepts the same request shape OpenAI's SDKs send (`messages`, `max_tokens`), so you can point an existing chat-style client at this URL without rewriting your request code.

**Important:** the *response* is Pheron's own simple streaming format shown above (`{"response": "...", "done": false}` chunks), not OpenAI's official response format (`choices[].delta.content`). If you're using an official OpenAI SDK, it will send the request correctly but will not know how to parse the response — you'll need to read the raw stream yourself, the same way as `/api/generate`.

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

### POST `/api/agent` — Full Autonomous Agent
This is the "real" Pheron Agent: it reads your prompt, decides which tools it needs (files, web, apps, etc.), runs them, and gives you back a finished answer — the same pipeline that runs inside the app itself.

**One request at a time.** Because the agent can write files and run shell commands on your Mac, the server only processes one `/api/agent` request at a time. If you send a second request while one is still running, you get an immediate response instead of a queued one:

```json
{ "response": "Sunucu şu an başka bir isteği işliyor. Lütfen birkaç saniye bekleyin.", "toolsUsed": [], "category": "", "done": false, "error": "BUSY" }
```

That message is in Turkish ("The server is busy with another request — please wait a moment") and is returned with a normal **`200 OK`** status — check the `"error": "BUSY"` field in the JSON body, not the HTTP status code, to detect this case. Poll `GET /api/health` and wait for `"is_busy": false` before retrying.

* **Parameters**:
  - `prompt` (string, required): what you want the agent to do.
  - `workspace` (string, optional): absolute path to the folder the agent should work in. Defaults to the app's own workspace folder if omitted.
  - `complexity` (number, optional): `1` limits the agent to 7 turns (quick lookups). `2` or higher allows up to 30 turns (multi-step tasks). Defaults to `2`.
  - `history` (array, optional): previous turns of the conversation, so the agent remembers earlier messages when you call the API multiple times in a row. Each entry looks like `{"role": "user", "content": "..."}` or `{"role": "assistant", "content": "..."}`.

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
    "toolsUsed": ["File Manager", "Read File"],
    "category": "",
    "done": true,
    "error": null
  }
  ```
  Note: `category` is currently always an empty string — it's reserved for future use, not something you can rely on today.

  Long-running tasks (large renders, big builds) can legitimately take several minutes; the server allows up to about 18 minutes before giving up and returning a timeout error.

---

## 3. Telemetry and Usage Tracking

Requests made through the API also show up locally in the app's own dashboard, so you can see what your scripts have been doing:
- **Tokens**: total tokens processed.
- **Cost**: always **$0.000** — everything here runs on your Mac, nothing is billed.
- **Speed**: measured in tokens per second (`t/s`).
- **Joule Metrics**: the actual energy your Mac's chip used for that request.
