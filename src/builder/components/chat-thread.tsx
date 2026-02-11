import { useRef, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "../types";

interface ChatThreadProps {
  messages: ChatMessage[];
  isGenerating: boolean;
  onSend: (text: string) => void;
  onClear: () => void;
}

type Segment =
  | { kind: "text"; text: string }
  | { kind: "tool"; tool: string; target: string }
  | { kind: "result"; text: string }
  | { kind: "question"; text: string }
  | { kind: "option"; label: string; description: string }
  | { kind: "plan"; text: string };

const TOOL_RE = /^\[(Read|Edit|Write|Bash|Glob|Grep|Task|Skill)\]\s*(.*)$/;
const QUESTION_RE = /^\[Question\]\s*(.*)$/;
const OPTION_RE = /^\[Option\]\s*(.*)$/;
const PLAN_RE = /^\[Plan\]\s*(.*)$/;

function parseSegments(raw: string): Segment[] {
  const lines = raw.split("\n");
  const segments: Segment[] = [];
  let textBuf = "";
  let lastTool: Segment | null = null;

  const flushText = () => {
    const trimmed = textBuf.trim();
    if (trimmed) segments.push({ kind: "text", text: trimmed });
    textBuf = "";
  };

  for (const line of lines) {
    const toolMatch = line.match(TOOL_RE);
    const questionMatch = line.match(QUESTION_RE);
    const optionMatch = line.match(OPTION_RE);
    const planMatch = line.match(PLAN_RE);

    if (questionMatch) {
      flushText();
      if (lastTool) { segments.push(lastTool); lastTool = null; }
      segments.push({ kind: "question", text: questionMatch[1] });
    } else if (optionMatch) {
      flushText();
      if (lastTool) { segments.push(lastTool); lastTool = null; }
      const raw = optionMatch[1];
      const dashIdx = raw.indexOf(" - ");
      const label = dashIdx >= 0 ? raw.slice(0, dashIdx) : raw;
      const description = dashIdx >= 0 ? raw.slice(dashIdx + 3) : "";
      segments.push({ kind: "option", label, description });
    } else if (planMatch) {
      flushText();
      if (lastTool) { segments.push(lastTool); lastTool = null; }
      segments.push({ kind: "plan", text: planMatch[1] });
    } else if (toolMatch) {
      flushText();
      if (lastTool) segments.push(lastTool);
      lastTool = { kind: "tool", tool: toolMatch[1], target: toolMatch[2] };
    } else if (lastTool && line.trim() && !line.match(TOOL_RE)) {
      segments.push(lastTool);
      lastTool = null;

      if (
        line.trim().startsWith("The file") ||
        line.trim().startsWith("Successfully") ||
        line.trim().match(/^\d+ files? /)
      ) {
        segments.push({ kind: "result", text: line.trim() });
      } else {
        textBuf += line + "\n";
      }
    } else {
      textBuf += line + "\n";
    }
  }

  if (lastTool) segments.push(lastTool);
  flushText();
  return segments;
}

const TOOL_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  Read: { label: "READ", color: "text-blue-600", bg: "bg-blue-50 border-blue-200" },
  Edit: { label: "EDIT", color: "text-amber-600", bg: "bg-amber-50 border-amber-200" },
  Write: { label: "WRITE", color: "text-green-600", bg: "bg-green-50 border-green-200" },
  Bash: { label: "RUN", color: "text-violet-600", bg: "bg-violet-50 border-violet-200" },
  Glob: { label: "FIND", color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200" },
  Grep: { label: "SEARCH", color: "text-cyan-600", bg: "bg-cyan-50 border-cyan-200" },
  Task: { label: "TASK", color: "text-orange-600", bg: "bg-orange-50 border-orange-200" },
  Skill: { label: "SKILL", color: "text-pink-600", bg: "bg-pink-50 border-pink-200" },
};

function ToolBlock({ tool, target }: { tool: string; target: string }) {
  const style = TOOL_STYLES[tool] ?? {
    label: tool.toUpperCase(),
    color: "text-neutral-600",
    bg: "bg-neutral-50 border-neutral-200",
  };

  return (
    <div className={cn("flex items-center gap-1.5 rounded border px-2 py-1 my-1", style.bg)}>
      <span
        className={cn(
          "text-[9px] font-bold uppercase tracking-wider shrink-0",
          style.color
        )}
      >
        {style.label}
      </span>
      <span className="text-[10px] font-mono text-neutral-600 truncate">
        {target}
      </span>
    </div>
  );
}

function ResultLine({ text }: { text: string }) {
  return (
    <div className="text-[10px] text-green-600 font-mono pl-2 border-l-2 border-green-200 my-1">
      {text}
    </div>
  );
}

function QuestionBlock({ text }: { text: string }) {
  return (
    <div className="my-2 px-3 py-2 rounded-lg bg-indigo-50 border border-indigo-200">
      <span className="text-[9px] font-bold uppercase tracking-wider text-indigo-500 block mb-1">
        Question
      </span>
      <p className="text-xs text-indigo-900 leading-relaxed">{text}</p>
    </div>
  );
}

function OptionButton({
  label,
  description,
  onSelect,
}: {
  label: string;
  description: string;
  onSelect: (label: string) => void;
}) {
  return (
    <button
      onClick={() => onSelect(label)}
      className="w-full text-left my-0.5 px-3 py-1.5 rounded border border-indigo-200 bg-white hover:bg-indigo-50 hover:border-indigo-300 transition-colors group"
    >
      <span className="text-xs font-medium text-indigo-700 group-hover:text-indigo-900">
        {label}
      </span>
      {description && (
        <span className="text-[10px] text-neutral-500 block mt-0.5">{description}</span>
      )}
    </button>
  );
}

function PlanIndicator({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-1.5 my-2 px-3 py-2 rounded-lg bg-violet-50 border border-violet-200">
      <span className="text-[9px] font-bold uppercase tracking-wider text-violet-500 shrink-0">
        Plan Mode
      </span>
      <span className="text-[10px] text-violet-700">{text}</span>
    </div>
  );
}

function renderInlineMarkdown(text: string): ReactNode[] {
  const parts: ReactNode[] = [];
  const re = /(\*\*(.+?)\*\*)|(`(.+?)`)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = re.exec(text)) !== null) {
    if (match.index > last) {
      parts.push(text.slice(last, match.index));
    }
    if (match[2]) {
      parts.push(
        <strong key={key++} className="font-semibold text-neutral-900">
          {match[2]}
        </strong>
      );
    } else if (match[4]) {
      parts.push(
        <code
          key={key++}
          className="px-1 py-0.5 rounded bg-neutral-200/60 text-neutral-800 font-mono text-[10px]"
        >
          {match[4]}
        </code>
      );
    }
    last = match.index + match[0].length;
  }

  if (last < text.length) {
    parts.push(text.slice(last));
  }
  return parts;
}

function AssistantContent({
  text,
  isStreaming,
  onSelectOption,
}: {
  text: string;
  isStreaming: boolean;
  onSelectOption: (label: string) => void;
}) {
  const segments = parseSegments(text);

  const nodes: ReactNode[] = segments.map((seg, i) => {
    switch (seg.kind) {
      case "tool":
        return <ToolBlock key={i} tool={seg.tool} target={seg.target} />;
      case "result":
        return <ResultLine key={i} text={seg.text} />;
      case "question":
        return <QuestionBlock key={i} text={seg.text} />;
      case "option":
        return (
          <OptionButton
            key={i}
            label={seg.label}
            description={seg.description}
            onSelect={onSelectOption}
          />
        );
      case "plan":
        return <PlanIndicator key={i} text={seg.text} />;
      case "text":
        return (
          <span key={i} className="whitespace-pre-wrap">
            {renderInlineMarkdown(seg.text)}
          </span>
        );
    }
  });

  return (
    <>
      {nodes}
      {isStreaming && (
        <span className="inline-block w-1 h-3 ml-0.5 bg-neutral-400 animate-pulse align-text-bottom" />
      )}
    </>
  );
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
        {messages.map((msg) =>
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
                onSelectOption={(label) => {
                  if (!isGenerating) onSend(label);
                }}
              />
            </div>
          )
        )}
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
