import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useGeneration } from "../hooks/use-generation";
import { useEditSession } from "../hooks/use-edit-session";
import { useAssets } from "../hooks/use-assets";
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
  const [fontsOpen, setFontsOpen] = useState(false);
  const fonts = useAssets("fonts");
  const fontsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/design-brief")
      .then((r) => r.json())
      .then((data: { content: string | null }) => setBriefContent(data.content))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!fontsOpen) return;
    function handleClick(e: MouseEvent) {
      if (fontsRef.current && !fontsRef.current.contains(e.target as Node)) {
        setFontsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [fontsOpen]);

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
          <div className="relative" ref={fontsRef}>
            <button
              onClick={() => setFontsOpen((v) => !v)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 rounded-md transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 12.5L7.5 3h1L13 12.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M4.5 10h7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              Fonts
              {fonts.assets.length > 0 && (
                <span className="ml-0.5 w-4 h-4 rounded-full bg-neutral-200 text-[10px] flex items-center justify-center text-neutral-600">{fonts.assets.length}</span>
              )}
            </button>
            {fontsOpen && <FontsPopover fonts={fonts} />}
          </div>
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

const FONT_ACCEPT = ".woff2,.woff,.ttf,.otf";
const FONT_EXTS = [".woff2", ".woff", ".ttf", ".otf"];

function FontsPopover({ fonts }: { fonts: ReturnType<typeof useAssets> }) {
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    for (const file of files) fonts.upload(file);
  }, [fonts]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      FONT_EXTS.some((ext) => f.name.toLowerCase().endsWith(ext))
    );
    for (const file of files) fonts.upload(file);
  }, [fonts]);

  return (
    <div className="absolute right-0 top-full mt-1 w-80 bg-white border border-neutral-200 rounded-lg shadow-lg z-50">
      <div className="p-3 border-b border-neutral-100">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-neutral-300 rounded-lg p-4 text-center hover:border-neutral-400 transition-colors"
        >
          <p className="text-xs text-neutral-500 mb-2">
            Drop font files or click to browse
          </p>
          <input
            type="file"
            accept={FONT_ACCEPT}
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="designer-font-upload"
          />
          <label
            htmlFor="designer-font-upload"
            className="inline-block px-3 py-1.5 bg-white border border-neutral-300 rounded text-xs text-neutral-700 cursor-pointer hover:bg-neutral-50"
          >
            Browse
          </label>
        </div>
      </div>
      {fonts.assets.length > 0 ? (
        <div className="max-h-48 overflow-y-auto p-2 space-y-1">
          {fonts.assets.map((asset) => (
            <div key={asset.filename} className="flex items-center justify-between px-2.5 py-1.5 rounded hover:bg-neutral-50">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-xs text-neutral-700 truncate">{asset.filename}</span>
                <span className="text-[10px] text-neutral-400 shrink-0">{(asset.size / 1024).toFixed(0)} KB</span>
              </div>
              <button
                onClick={() => fonts.remove(asset.filename)}
                className="text-neutral-400 hover:text-red-500 transition-colors ml-2 shrink-0"
              >
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                  <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="px-3 py-4 text-center text-xs text-neutral-400">
          No custom fonts uploaded
        </div>
      )}
    </div>
  );
}
