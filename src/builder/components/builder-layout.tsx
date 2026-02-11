import { useState, useCallback, useEffect, useRef } from "react";
import { TOTAL_SLIDES } from "@/deck/config";
import { useCanvasBoxes } from "../hooks/use-canvas-boxes";
import { usePromptGenerator } from "../hooks/use-prompt-generator";
import { useGeneration } from "../hooks/use-generation";
import { useEditSession } from "../hooks/use-edit-session";
import { captureCanvasAsDataUrl } from "../canvas-capture";
import { Canvas } from "./canvas";
import { BoxProperties } from "./box-properties";
import { PromptPanel } from "./prompt-panel";
import { GenerationPanel } from "./generation-panel";
import { SlidePreview } from "./slide-preview";
import { SlidePicker } from "./slide-picker";
import { EditSidebar } from "./edit-sidebar";
import type { BuilderMode, SlideEditInfo } from "../types";

export function BuilderLayout() {
  const [mode, setMode] = useState<BuilderMode>("create");
  const [editSlide, setEditSlide] = useState<SlideEditInfo | null>(null);

  const {
    boxes,
    selectedBoxId,
    selectedBox,
    addBox,
    selectBox,
    moveBox,
    resizeBox,
    updateBox,
    deleteBox,
  } = useCanvasBoxes();

  const [layoutPrompt, setLayoutPrompt] = useState("");
  const [contentPrompt, setContentPrompt] = useState("");
  const [templateHint, setTemplateHint] = useState("");
  const [slideName, setSlideName] = useState("");
  const [slidePosition, setSlidePosition] = useState(TOTAL_SLIDES + 1);
  const [slideMode, setSlideMode] = useState<"light" | "dark" | "cream">("light");

  const generatedPrompt = usePromptGenerator({
    boxes,
    layoutPrompt,
    contentPrompt,
    templateHint,
    slideName,
    slidePosition,
    mode: slideMode,
  });

  const generation = useGeneration();
  const { edit: editSlideViaChat } = generation;

  const editSession = useEditSession(editSlide?.fileKey ?? null);
  const {
    messages: editMessages,
    sessionId: editSessionId,
    addUserMessage,
    addAssistantMessage,
    updateMessage,
    setSessionId,
    clearHistory,
  } = editSession;

  const captureImage = useCallback(() => {
    if (boxes.length === 0) return undefined;
    return captureCanvasAsDataUrl(boxes);
  }, [boxes]);

  useEffect(() => {
    if (mode !== "create" || generation.status !== "complete") return;

    const output = generation.output;
    const fileKeyMatch = output.match(/(\d{2}-[\w-]+)\.tsx/);
    if (fileKeyMatch) {
      const fileKey = fileKeyMatch[1];
      const slideNumber = parseInt(fileKey.slice(0, 2), 10);
      setEditSlide({
        slideNumber,
        fileKey,
        filePath: `src/deck/slides/${fileKey}.tsx`,
        title: slideName || fileKey,
      });
      setMode("edit");
    }
  }, [mode, generation.status, generation.output, slideName]);

  const handleSelectSlide = useCallback((info: SlideEditInfo) => {
    setEditSlide(info);
    setMode("edit");
  }, []);

  const handleNewSlide = useCallback(() => {
    setMode("create");
    setEditSlide(null);
  }, []);

  const activeAssistantMsgId = useRef<string | null>(null);
  const sessionIdRef = useRef(editSessionId);
  sessionIdRef.current = editSessionId;

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
      if (!editSlide) return;

      addUserMessage(text);

      const assistantMsg = addAssistantMessage(sessionIdRef.current ?? "");
      activeAssistantMsgId.current = assistantMsg.id;

      editSlideViaChat(
        text,
        editSlide.filePath,
        sessionIdRef.current,
        (sid) => {
          setSessionId(sid);
        }
      );
    },
    [editSlide, addUserMessage, addAssistantMessage, setSessionId, editSlideViaChat]
  );

  if (mode === "edit" && editSlide) {
    return (
      <div className="h-screen flex bg-neutral-50">
        <SlidePreview
          fileKey={editSlide.fileKey}
          slideNumber={editSlide.slideNumber}
        />

        <EditSidebar
          selectedFileKey={editSlide.fileKey}
          messages={editMessages}
          status={generation.status}
          onSelectSlide={handleSelectSlide}
          onNewSlide={handleNewSlide}
          onSendMessage={handleSendMessage}
          onClearHistory={clearHistory}
        />
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-neutral-50">
      <div className="flex-1 flex items-center justify-center p-4">
        <Canvas
          boxes={boxes}
          selectedBoxId={selectedBoxId}
          onAddBox={addBox}
          onSelectBox={selectBox}
          onMoveBox={moveBox}
          onResizeBox={resizeBox}
        />
      </div>

      <div className="w-80 border-l border-neutral-200 bg-white overflow-y-auto p-4 space-y-6">
        <SlidePicker
          selectedFileKey={null}
          onSelect={handleSelectSlide}
          onNewSlide={handleNewSlide}
        />

        <hr className="border-neutral-100" />

        {selectedBox && (
          <>
            <BoxProperties
              box={selectedBox}
              onUpdate={updateBox}
              onDelete={deleteBox}
            />
            <hr className="border-neutral-100" />
          </>
        )}

        <PromptPanel
          layoutPrompt={layoutPrompt}
          contentPrompt={contentPrompt}
          templateHint={templateHint}
          slideName={slideName}
          slidePosition={slidePosition}
          mode={slideMode}
          onLayoutPromptChange={setLayoutPrompt}
          onContentPromptChange={setContentPrompt}
          onTemplateHintChange={setTemplateHint}
          onSlideNameChange={setSlideName}
          onSlidePositionChange={setSlidePosition}
          onModeChange={setSlideMode}
        />

        <hr className="border-neutral-100" />

        <GenerationPanel
          generatedPrompt={generatedPrompt}
          status={generation.status}
          output={generation.output}
          error={generation.error}
          onGenerate={generation.generate}
          onCancel={generation.cancel}
          captureImage={captureImage}
        />
      </div>
    </div>
  );
}
