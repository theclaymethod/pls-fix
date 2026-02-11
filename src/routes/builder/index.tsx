import { useState, useCallback } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SLIDE_CONFIG } from "@/deck/config";
import { useApplyDesignSystem } from "@/builder/hooks/use-apply-design-system";
import { useDeckChat } from "@/builder/hooks/use-deck-chat";
import { useDeckOperations } from "@/builder/hooks/use-deck-operations";
import { ApplyOverlay, SlideCardCheckbox } from "@/builder/components/apply-overlay";
import { DeckChatPanel } from "@/builder/components/deck-chat-panel";
import { SortableSlideGrid } from "@/builder/components/sortable-slide-grid";

const PANEL_STATE_KEY = "deck-panel-open";

function readPanelState(): boolean {
  try {
    return localStorage.getItem(PANEL_STATE_KEY) === "true";
  } catch {
    return false;
  }
}

function savePanelState(open: boolean): void {
  try {
    localStorage.setItem(PANEL_STATE_KEY, String(open));
  } catch {
    // localStorage unavailable
  }
}

export const Route = createFileRoute("/builder/")({
  component: BuilderIndex,
});

function BuilderIndex() {
  const apply = useApplyDesignSystem();
  const isSelecting = apply.phase === "selecting";
  const [panelOpen, setPanelOpen] = useState(readPanelState);
  const deckChat = useDeckChat();

  const togglePanel = useCallback(() => {
    setPanelOpen((prev) => {
      const next = !prev;
      savePanelState(next);
      return next;
    });
  }, []);

  const handleReorder = useCallback(
    (fromPos: number, toPos: number, slide: { title: string; fileKey: string }) => {
      deckChat.sendMessage(
        `Move slide ${String(fromPos).padStart(2, "0")}-${slide.fileKey.replace(/^\d+-/, "")} from position ${fromPos} to position ${toPos}. Execute immediately without asking for confirmation.`
      );
    },
    [deckChat]
  );

  const handleDelete = useCallback(
    (fileKey: string, title: string) => {
      deckChat.sendMessage(`Delete slide "${title}" (${fileKey})`);
    },
    [deckChat]
  );

  const deckOps = useDeckOperations(handleReorder, handleDelete);

  const managementMode = panelOpen && !isSelecting;

  const onGridReorder = useCallback(
    (activeFileKey: string, overFileKey: string) => {
      deckOps.handleReorder(activeFileKey, overFileKey, SLIDE_CONFIG);
    },
    [deckOps]
  );

  const onGridDelete = useCallback(
    (fileKey: string) => {
      deckOps.handleDelete(fileKey, SLIDE_CONFIG);
    },
    [deckOps]
  );

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      <div className="flex-1 min-w-0">
        <div className="max-w-6xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-semibold text-neutral-900">Slides</h1>
            <div className="flex items-center gap-3">
              <button
                onClick={togglePanel}
                className={
                  panelOpen
                    ? "px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
                    : "px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                }
              >
                {panelOpen ? "Close Deck Manager" : "Manage Deck"}
              </button>
              <Link
                to="/builder/designer"
                className="px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
              >
                Manage Design System
              </Link>
              {apply.phase === "idle" && (
                <button
                  onClick={apply.enterSelecting}
                  className="px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
                >
                  Apply Design System
                </button>
              )}
              <Link
                to="/builder/create-design-system"
                className="px-4 py-2 border border-neutral-300 text-neutral-700 text-sm font-medium rounded-lg hover:border-neutral-400 hover:bg-neutral-50 transition-colors"
              >
                Create Design System
              </Link>
              <Link
                to="/builder/$fileKey"
                params={{ fileKey: "new" }}
                className="px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg hover:bg-neutral-800 transition-colors"
              >
                + Create New Slide
              </Link>
            </div>
          </div>

          {isSelecting ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {SLIDE_CONFIG.map((slide, i) => (
                <div key={slide.fileKey} className="relative">
                  <SlideCardCheckbox
                    fileKey={slide.fileKey}
                    checked={apply.selectedSlides.has(slide.fileKey)}
                    onToggle={apply.toggleSlide}
                  />
                  <Link
                    to="/builder/$fileKey"
                    params={{ fileKey: slide.fileKey }}
                    className="group block border border-neutral-200 rounded-lg bg-white hover:border-neutral-400 hover:shadow-sm transition-all"
                    onClick={(e) => {
                      e.preventDefault();
                      apply.toggleSlide(slide.fileKey);
                    }}
                  >
                    <div className="aspect-video bg-neutral-100 rounded-t-lg flex items-center justify-center">
                      <span className="text-3xl font-semibold text-neutral-300 group-hover:text-neutral-400 transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div className="px-3 py-2.5">
                      <p className="text-sm font-medium text-neutral-800 truncate">
                        {slide.title}
                      </p>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {slide.fileKey}.tsx
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <SortableSlideGrid
              managementMode={managementMode}
              isLocked={deckOps.isLocked}
              pendingFileKey={deckOps.pendingOperation?.fileKey ?? null}
              onReorder={onGridReorder}
              onDelete={onGridDelete}
            />
          )}
        </div>

        <ApplyOverlay apply={apply} />
      </div>

      {panelOpen && (
        <DeckChatPanel
          messages={deckChat.messages}
          status={deckChat.status}
          onSendMessage={deckChat.sendMessage}
          onClearHistory={deckChat.clearHistory}
        />
      )}
    </div>
  );
}
