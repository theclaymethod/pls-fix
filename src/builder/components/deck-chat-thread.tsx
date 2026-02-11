import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { AssistantContent } from "./assistant-content";
import type { ChatMessage } from "../types";

interface DeckChatThreadProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  onSend: (text: string) => void;
  onClear: () => void;
}

function isLastAssistant(messages: ChatMessage[], idx: number, isGenerating: boolean): boolean {
  for (let j = idx + 1; j < messages.length; j++) {
    if (messages[j].role === "user") return false;
  }
  return !isGenerating;
}

export function DeckChatThread({
  messages,
  isGenerating,
  onSend,
  onClear,
}: DeckChatThreadProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  const submitInput = useCallback(() => {
    const text = input.trim();
    if (!text || isGenerating) return;
    setInput("");
    onSend(text);
  }, [input, isGenerating, onSend]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitInput();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitInput();
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Deck Chat
        </h3>
        {messages.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-neutral-400 hover:text-neutral-600 transition-colors"
          >
            Clear
          </button>
        )}
      </div>

      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-3 mb-3 min-h-0"
      >
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4 py-8">
            <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center mb-3">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
            <p className="text-sm font-medium text-neutral-600">Manage your deck</p>
            <p className="text-xs text-neutral-400 mt-1 leading-relaxed max-w-[200px]">
              Reorder, delete, rename, or add slides. Drag cards to reorder.
            </p>
          </div>
        )}
        {messages.map((msg, idx) =>
          msg.role === "user" ? (
            <div
              key={msg.id}
              className="text-xs leading-relaxed rounded-lg px-3 py-2 max-w-[90%] ml-auto bg-neutral-900 text-white whitespace-pre-wrap"
            >
              {msg.text}
            </div>
          ) : (
            <div
              key={msg.id}
              className="text-xs leading-relaxed rounded-lg px-3 py-2 max-w-[95%] mr-auto bg-neutral-50 border border-neutral-200 text-neutral-700"
            >
              <AssistantContent
                text={msg.text}
                isStreaming={msg.status === "streaming"}
                isActionable={isLastAssistant(messages, idx, isGenerating)}
                onSelectOption={(label) => {
                  if (!isGenerating) onSend(label);
                }}
              />
            </div>
          )
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isGenerating ? "Processing..." : "e.g. Move slide 5 to position 2"}
          disabled={isGenerating}
          className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none disabled:opacity-50 resize-none"
        />
        <button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors self-end",
            input.trim() && !isGenerating
              ? "bg-neutral-900 text-white hover:bg-neutral-800"
              : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
          )}
        >
          Send
        </button>
      </form>
    </div>
  );
}
