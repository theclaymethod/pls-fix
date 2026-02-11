import { useState, useCallback, useEffect, useRef } from "react";
import type { ChatMessage, EditSession } from "../types";

const STORAGE_PREFIX = "builder-chat-";

interface StoredSession {
  sessionId: string | null;
  messages: ChatMessage[];
}

function loadSession(fileKey: string): StoredSession {
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${fileKey}`);
    if (!raw) return { sessionId: null, messages: [] };
    return JSON.parse(raw) as StoredSession;
  } catch {
    return { sessionId: null, messages: [] };
  }
}

function saveSession(fileKey: string, session: StoredSession): void {
  localStorage.setItem(`${STORAGE_PREFIX}${fileKey}`, JSON.stringify(session));
}

export function useEditSession(fileKey: string | null): EditSession & {
  addUserMessage: (text: string) => ChatMessage;
  addAssistantMessage: (sessionId: string) => ChatMessage;
  updateMessage: (id: string, updates: Partial<ChatMessage>) => void;
  setSessionId: (id: string) => void;
  clearHistory: () => void;
} {
  const [session, setSession] = useState<EditSession>({
    slideFileKey: fileKey ?? "",
    sessionId: null,
    messages: [],
  });

  useEffect(() => {
    if (!fileKey) return;
    const stored = loadSession(fileKey);
    setSession({
      slideFileKey: fileKey,
      sessionId: stored.sessionId,
      messages: stored.messages,
    });
  }, [fileKey]);

  const saveTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!fileKey) return;
    clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      saveSession(fileKey, {
        sessionId: session.sessionId,
        messages: session.messages,
      });
    }, 500);
    return () => clearTimeout(saveTimerRef.current);
  }, [fileKey, session.sessionId, session.messages]);

  const addUserMessage = useCallback(
    (text: string): ChatMessage => {
      const msg: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role: "user",
        text,
        timestamp: Date.now(),
        sessionId: session.sessionId ?? "",
        status: "complete",
      };
      setSession((s) => ({ ...s, messages: [...s.messages, msg] }));
      return msg;
    },
    [session.sessionId]
  );

  const addAssistantMessage = useCallback(
    (sessionId: string): ChatMessage => {
      const msg: ChatMessage = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        role: "assistant",
        text: "",
        timestamp: Date.now(),
        sessionId,
        status: "streaming",
      };
      setSession((s) => ({ ...s, messages: [...s.messages, msg] }));
      return msg;
    },
    []
  );

  const updateMessage = useCallback(
    (id: string, updates: Partial<ChatMessage>) => {
      setSession((s) => ({
        ...s,
        messages: s.messages.map((m) =>
          m.id === id ? { ...m, ...updates } : m
        ),
      }));
    },
    []
  );

  const setSessionId = useCallback((id: string) => {
    setSession((s) => ({ ...s, sessionId: id }));
  }, []);

  const clearHistory = useCallback(() => {
    if (!fileKey) return;
    localStorage.removeItem(`${STORAGE_PREFIX}${fileKey}`);
    setSession({
      slideFileKey: fileKey,
      sessionId: null,
      messages: [],
    });
  }, [fileKey]);

  return {
    ...session,
    addUserMessage,
    addAssistantMessage,
    updateMessage,
    setSessionId,
    clearHistory,
  };
}
