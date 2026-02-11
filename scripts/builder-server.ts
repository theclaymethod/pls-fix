import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { spawn, type ChildProcess } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { mkdirSync, writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");
const PORT = 3333;
const WIREFRAME_DIR = resolve(PROJECT_ROOT, ".builder-tmp");
const WIREFRAME_PATH = resolve(WIREFRAME_DIR, "wireframe.png");

function log(tag: string, ...args: unknown[]): void {
  console.log(`[${new Date().toISOString().slice(11, 19)}] [${tag}]`, ...args);
}

function setCors(res: ServerResponse): void {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function readBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks).toString()));
    req.on("error", reject);
  });
}

function streamClaude(
  claude: ChildProcess,
  req: IncomingMessage,
  res: ServerResponse,
  tag: string,
  extractSession?: boolean
): void {
  let buffer = "";
  let sessionExtracted = false;
  let chunkCount = 0;

  log(tag, `spawned pid=${claude.pid}`);

  claude.stdout?.on("data", (chunk: Buffer) => {
    const raw = chunk.toString();
    chunkCount++;
    if (chunkCount <= 3) {
      log(tag, `stdout chunk #${chunkCount} (${raw.length} bytes): ${raw.slice(0, 200)}`);
    }

    buffer += raw;
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.trim()) continue;

      if (extractSession && !sessionExtracted) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.type === "system" && parsed.subtype === "init" && parsed.session_id) {
            sessionExtracted = true;
            log(tag, `session_id extracted: ${parsed.session_id}`);
            res.write(
              `data: ${JSON.stringify({ type: "session", sessionId: parsed.session_id })}\n\n`
            );
          }
        } catch {
          // not JSON, pass through
        }
      }

      res.write(`data: ${line}\n\n`);
    }
  });

  claude.stderr?.on("data", (chunk: Buffer) => {
    const msg = chunk.toString().trim();
    if (msg) {
      log(tag, `stderr: ${msg}`);
      res.write(`data: ${JSON.stringify({ type: "stderr", message: msg })}\n\n`);
    }
  });

  claude.on("close", (code) => {
    log(tag, `exited code=${code}, ${chunkCount} stdout chunks total`);
    res.write(`data: ${JSON.stringify({ type: "done", exitCode: code })}\n\n`);
    res.end();
  });

  claude.on("error", (err) => {
    log(tag, `error: ${err.message}`);
    res.write(`data: ${JSON.stringify({ type: "error", message: err.message })}\n\n`);
    res.end();
  });

  req.on("close", () => {
    log(tag, "client disconnected, killing process");
    claude.kill();
  });
}

const server = createServer(async (req, res) => {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/generate") {
    log("generate", "request received");
    try {
      const body = JSON.parse(await readBody(req));
      let prompt: string = body.prompt;
      const image: string | undefined = body.image;

      if (!prompt) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "prompt is required" }));
        return;
      }

      log("generate", `prompt: ${prompt.slice(0, 100)}...`);

      if (image && image.startsWith("data:image/png;base64,")) {
        mkdirSync(WIREFRAME_DIR, { recursive: true });
        const base64Data = image.slice("data:image/png;base64,".length);
        writeFileSync(WIREFRAME_PATH, Buffer.from(base64Data, "base64"));
        prompt = `I've saved a wireframe screenshot of the slide layout at .builder-tmp/wireframe.png — read it to see the visual arrangement of elements.\n\n${prompt}`;
      }

      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      const claude = spawn(
        "claude",
        ["-p", prompt, "--verbose", "--output-format", "stream-json", "--dangerously-skip-permissions"],
        { cwd: PROJECT_ROOT, stdio: ["ignore", "pipe", "pipe"] }
      );

      streamClaude(claude, req, res, "generate");
    } catch (err) {
      log("generate", `error: ${err}`);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" })
      );
    }
    return;
  }

  if (req.method === "POST" && req.url === "/api/edit") {
    log("edit", "request received");
    try {
      const body = JSON.parse(await readBody(req));
      const { prompt, filePath, sessionId } = body as {
        prompt: string;
        filePath: string;
        sessionId?: string;
      };

      if (!prompt) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "prompt is required" }));
        return;
      }

      if (!filePath) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "filePath is required" }));
        return;
      }

      log("edit", `prompt: "${prompt.slice(0, 80)}..." file=${filePath} session=${sessionId ?? "new"}`);

      const fullPrompt = sessionId
        ? prompt
        : `Edit the slide at ${filePath}.\n\n${prompt}`;

      const args = sessionId
        ? ["--resume", sessionId, "-p", fullPrompt, "--verbose", "--output-format", "stream-json", "--dangerously-skip-permissions"]
        : ["-p", fullPrompt, "--verbose", "--output-format", "stream-json", "--dangerously-skip-permissions"];

      log("edit", `claude args: ${args.join(" ")}`);

      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      });

      const claude = spawn("claude", args, { cwd: PROJECT_ROOT, stdio: ["ignore", "pipe", "pipe"] });

      streamClaude(claude, req, res, "edit", true);
    } catch (err) {
      log("edit", `error: ${err}`);
      res.writeHead(500, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" })
      );
    }
    return;
  }

  log("404", `${req.method} ${req.url}`);
  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, () => {
  log("server", `running on http://localhost:${PORT}`);
  log("server", `project root: ${PROJECT_ROOT}`);
});
