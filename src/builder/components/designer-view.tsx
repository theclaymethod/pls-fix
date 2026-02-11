import { useCallback, useEffect, useRef } from "react";
import { useGeneration } from "../hooks/use-generation";
import { useEditSession } from "../hooks/use-edit-session";
import { useResizable } from "../hooks/use-resizable";
import { EditSidebar } from "./edit-sidebar";
import { DesignerPreview } from "./designer-preview";

const FILE_KEY = "design-system";

export function DesignerView() {
  const sidebar = useResizable({
    defaultWidth: 320,
    minWidth: 280,
    maxWidthPercent: 0.5,
    storageKey: "builder-designer-sidebar-width",
  });

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
      addUserMessage(text);

      const assistantMsg = addAssistantMessage(sessionIdRef.current ?? "");
      activeAssistantMsgId.current = assistantMsg.id;

      editDesignSystem(text, sessionIdRef.current, (sid) => {
        setSessionId(sid);
      });
    },
    [addUserMessage, addAssistantMessage, setSessionId, editDesignSystem]
  );

  return (
    <div className="h-screen flex bg-neutral-50">
      <DesignerPreview />

      <EditSidebar
        selectedFileKey={FILE_KEY}
        messages={messages}
        status={generation.status}
        onSendMessage={handleSendMessage}
        onClearHistory={clearHistory}
        width={sidebar.width}
        isResizing={sidebar.isResizing}
        onResizeMouseDown={sidebar.handleMouseDown}
      />
    </div>
  );
}
