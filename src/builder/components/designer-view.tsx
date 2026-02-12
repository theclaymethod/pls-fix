import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useGeneration } from "../hooks/use-generation";
import { useEditSession } from "../hooks/use-edit-session";
import { useGrab } from "../hooks/use-grab";
import { useResizable } from "../hooks/use-resizable";
import { EditSidebar } from "./edit-sidebar";
import { DesignerPreview } from "./designer-preview";
import { DesignBriefModal } from "./design-brief-modal";
import { GitStatusIndicator } from "./git-status-indicator";

const FILE_KEY = "design-system";

export function DesignerView() {
  const sidebar = useResizable({
    defaultWidth: 320,
    minWidth: 280,
    maxWidthPercent: 0.5,
    storageKey: "builder-designer-sidebar-width",
  });

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const { grabbedContext, clearContext } = useGrab({
    containerRef: previewContainerRef,
    enabled: true,
  });

  const [briefOpen, setBriefOpen] = useState(false);
  const [briefContent, setBriefContent] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/design-brief")
      .then((r) => r.json())
      .then((data: { content: string | null }) => setBriefContent(data.content))
      .catch(() => {});
  }, []);

  const generation = useGeneration();
  const { editDesignSystem } = generation;

  const editSession = useEditSession(FILE_KEY);
  const {
    messages,
    sessionId,
    addUserMessage,
    addAssistantMessage,
    updateMessage,
    setSessionId,
    clearHistory,
  } = editSession;

  const activeAssistantMsgId = useRef<string | null>(null);
  const sessionIdRef = useRef(sessionId);
  sessionIdRef.current = sessionId;

  useEffect(() => {
    const msgId = activeAssistantMsgId.current;
    if (!msgId) return;

    if (generation.output) {
      updateMessage(msgId, { text: generation.output });
    }

    if (generation.status === "complete" || generation.status === "error") {
      updateMessage(msgId, {
        text: generation.output || "(no response)",
        status: generation.status === "error" ? "error" : "complete",
      });
      activeAssistantMsgId.current = null;
    }
  }, [generation.output, generation.status, updateMessage]);

  const handleSendMessage = useCallback(
    (text: string) => {
      let prompt = text;
      if (grabbedContext) {
        const loc = grabbedContext.lineNumber
          ? `${grabbedContext.filePath}:${grabbedContext.lineNumber}`
          : grabbedContext.filePath;
        addUserMessage(`[${grabbedContext.componentName} — ${loc}]\n${text}`);
        prompt = `[Selected Element]\nComponent: ${grabbedContext.componentName}\nFile: ${loc}\nHTML:\n${grabbedContext.htmlFrame}\n\n${text}`;
        clearContext();
      } else {
        addUserMessage(text);
      }

      const assistantMsg = addAssistantMessage(sessionIdRef.current ?? "");
      activeAssistantMsgId.current = assistantMsg.id;

      editDesignSystem(prompt, sessionIdRef.current, (sid) => {
        setSessionId(sid);
      });
    },
    [addUserMessage, addAssistantMessage, setSessionId, editDesignSystem, grabbedContext, clearContext]
  );

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      <div className="flex items-center gap-2 px-3 py-2 border-b border-neutral-200 bg-white shrink-0">
        <Link
          to="/builder"
          className="flex items-center gap-1.5 px-2 py-1.5 -ml-1 text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3L2 8l4 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M2.5 8H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="text-xs font-medium">All Slides</span>
        </Link>

        <div className="w-px h-4 bg-neutral-200" />

        <div className="flex items-center gap-1.5">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-neutral-400">
            <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
            <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.3"/>
          </svg>
          <span className="text-sm font-medium text-neutral-900">Design System</span>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <GitStatusIndicator />
          {briefContent && (
            <button
              onClick={() => setBriefOpen(true)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
                <path d="M6 5h4M6 8h4M6 11h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Brief
            </button>
          )}
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        <DesignerPreview />

        <EditSidebar
          selectedFileKey={FILE_KEY}
          messages={messages}
          status={generation.status}
          onSendMessage={handleSendMessage}
          onClearHistory={clearHistory}
          grabbedContext={grabbedContext}
          onDismissContext={clearContext}
          width={sidebar.width}
          isResizing={sidebar.isResizing}
          onResizeMouseDown={sidebar.handleMouseDown}
        />
      </div>

      <DesignBriefModal
        open={briefOpen}
        content={briefContent}
        onClose={() => setBriefOpen(false)}
      />
    </div>
  );
}
