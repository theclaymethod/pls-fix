import { useState, useCallback, useEffect, useRef } from "react";
import type { ChatMessage, GenerationStatus } from "../types";

const STORAGE_KEY = "builder-deck-chat";
const PANEL_STATE_KEY = "deck-panel-open";

interface StoredSession {
  sessionId: string | null;
  messages: ChatMessage[];
}

function loadSession(): StoredSession {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { sessionId: null, messages: [] };
    return JSON.parse(raw) as StoredSession;
  } catch {
    return { sessionId: null, messages: [] };
  }
}

function saveSession(session: StoredSession): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
}

function makeId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

interface DeckChatReturn {
  messages: ChatMessage[];
  sessionId: string | null;
  status: GenerationStatus;
  sendMessage: (text: string) => void;
  addSystemMessage: (text: string) => void;
  clearHistory: () => void;
}

export function useDeckChat(): DeckChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [status, setStatus] = useState<GenerationStatus>("idle");
  const abortRef = useRef<AbortController | null>(null);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const stored = loadSession();
    setMessages(stored.messages);
    setSessionId(stored.sessionId);
  }, []);

  useEffect(() => {
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveSession({ sessionId, messages });
    }, 500);
    return () => clearTimeout(saveTimerRef.current);
  }, [sessionId, messages]);

  const addSystemMessage = useCallback((text: string) => {
    const msg: ChatMessage = {
      id: makeId(),
      role: "assistant",
      text,
      timestamp: Date.now(),
      sessionId: "",
      status: "complete",
    };
    setMessages((prev) => [...prev, msg]);
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || status === "generating") return;

      const userMsg: ChatMessage = {
        id: makeId(),
        role: "user",
        text,
        timestamp: Date.now(),
        sessionId: sessionId ?? "",
        status: "complete",
      };

      const assistantMsg: ChatMessage = {
        id: makeId(),
        role: "assistant",
        text: "",
        timestamp: Date.now(),
        sessionId: sessionId ?? "",
        status: "streaming",
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);
      setStatus("generating");

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await fetch("/api/deck-chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: text, sessionId }),
          signal: controller.signal,
        });

        if (!res.ok) {
          const err = await res.text();
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantMsg.id
                ? { ...m, text: `Error: ${err}`, status: "error" as const }
                : m
            )
          );
          setStatus("error");
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          setStatus("error");
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";
        let fullText = "";
        let gotDeckChanged = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6);

            try {
              const parsed = JSON.parse(data);

              if (parsed.type === "session" && parsed.sessionId) {
                setSessionId(parsed.sessionId);
              }

              if (parsed.type === "assistant" && parsed.message?.content) {
                for (const block of parsed.message.content) {
                  if (block.type === "text") {
                    fullText += block.text;
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === assistantMsg.id ? { ...m, text: fullText } : m
                      )
                    );
                  } else if (block.type === "tool_use") {
                    const toolLabel = `[${block.name}] ${formatToolTarget(block.name, block.input)}`;
                    fullText += "\n" + toolLabel + "\n";
                    setMessages((prev) =>
                      prev.map((m) =>
                        m.id === assistantMsg.id ? { ...m, text: fullText } : m
                      )
                    );
                  }
                }
              }

              if (parsed.type === "content_block_delta" && parsed.delta?.text) {
                fullText += parsed.delta.text;
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id ? { ...m, text: fullText } : m
                  )
                );
              }

              if (parsed.type === "tool" && parsed.content != null) {
                const summary = formatToolResult(parsed.content);
                if (summary && summary.length <= 300) {
                  fullText += summary + "\n";
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantMsg.id ? { ...m, text: fullText } : m
                    )
                  );
                }
              }

              if (parsed.type === "done") {
                if (fullText.match(/\[(?:Edit|Write|Bash)\]/)) {
                  gotDeckChanged = true;
                }
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? { ...m, status: "complete" as const }
                      : m
                  )
                );
                setStatus("complete");
              }

              if (parsed.type === "error") {
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantMsg.id
                      ? { ...m, text: fullText + `\nError: ${parsed.message}`, status: "error" as const }
                      : m
                  )
                );
                setStatus("error");
              }
            } catch {
              // non-JSON SSE line
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id && m.status === "streaming"
              ? { ...m, status: "complete" as const }
              : m
          )
        );
        if (status === "generating") setStatus("complete");

        if (gotDeckChanged) {
          saveSession({
            sessionId,
            messages: [
              ...messages,
              userMsg,
              { ...assistantMsg, text: fullText, status: "complete" },
            ],
          });
          localStorage.setItem(PANEL_STATE_KEY, "true");
          setTimeout(() => window.location.reload(), 500);
        }
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantMsg.id
              ? { ...m, text: `Error: ${(err as Error).message}`, status: "error" as const }
              : m
          )
        );
        setStatus("error");
      }
    },
    [sessionId, status, messages]
  );

  const clearHistory = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMessages([]);
    setSessionId(null);
    setStatus("idle");
  }, []);

  return { messages, sessionId, status, sendMessage, addSystemMessage, clearHistory };
}

function formatToolTarget(name: string, input: Record<string, unknown>): string {
  const shortPath = (p: unknown): string => {
    const s = String(p);
    const i = s.indexOf("src/");
    return i >= 0 ? s.slice(i) : s;
  };

  switch (name) {
    case "Read": return shortPath(input.file_path);
    case "Edit": return shortPath(input.file_path);
    case "Write": return shortPath(input.file_path);
    case "Bash": return String(input.command).slice(0, 120);
    case "Glob": return String(input.pattern);
    case "Grep": return String(input.pattern);
    default: return "";
  }
}

function formatToolResult(content: unknown): string {
  if (typeof content === "string") {
    const trimmed = content.trim();
    return trimmed.length <= 200 ? trimmed : trimmed.slice(0, 200) + "...";
  }
  if (Array.isArray(content)) {
    const textBlocks = content.filter(
      (b: Record<string, unknown>) => b.type === "text"
    );
    if (textBlocks.length > 0) {
      const text = String(textBlocks[0].text).trim();
      return text.length <= 200 ? text : text.slice(0, 200) + "...";
    }
  }
  return "";
}
