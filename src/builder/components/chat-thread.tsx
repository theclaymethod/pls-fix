import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "../types";

interface ChatThreadProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  onSend: (text: string) => void;
  onClear: () => void;
}

export function ChatThread({
  messages,
  isGenerating,
  onSend,
  onClear,
}: ChatThreadProps) {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isGenerating) return;
    setInput("");
    onSend(text);
  };

  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex items-center justify-between px-1 mb-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Chat
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
          <p className="text-xs text-neutral-400 px-1">
            Describe changes to this slide...
          </p>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "text-xs leading-relaxed rounded-lg px-3 py-2 max-w-[90%] whitespace-pre-wrap",
              msg.role === "user"
                ? "ml-auto bg-neutral-900 text-white"
                : "mr-auto bg-neutral-100 text-neutral-700"
            )}
          >
            {msg.text}
            {msg.status === "streaming" && (
              <span className="inline-block w-1 h-3 ml-0.5 bg-neutral-400 animate-pulse align-text-bottom" />
            )}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={isGenerating ? "Generating..." : "Edit this slide..."}
          disabled={isGenerating}
          className="flex-1 px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!input.trim() || isGenerating}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors",
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
