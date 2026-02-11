import { useState, useCallback } from "react";
import type { SlideConfig } from "@/deck/config";

interface PendingOperation {
  type: "reorder" | "delete";
  fromIndex: number;
  toIndex?: number;
  fileKey: string;
}

interface DeckOperationsReturn {
  isLocked: boolean;
  pendingOperation: PendingOperation | null;
  handleReorder: (activeFileKey: string, overFileKey: string, slides: SlideConfig[]) => void;
  handleDelete: (fileKey: string, slides: SlideConfig[]) => void;
  unlock: () => void;
}

export function useDeckOperations(
  onReorder: (fromPos: number, toPos: number, slide: SlideConfig) => void,
  onDelete: (fileKey: string, title: string) => void
): DeckOperationsReturn {
  const [isLocked, setIsLocked] = useState(false);
  const [pendingOperation, setPendingOperation] = useState<PendingOperation | null>(null);

  const handleReorder = useCallback(
    (activeFileKey: string, overFileKey: string, slides: SlideConfig[]) => {
      if (isLocked) return;

      const fromIndex = slides.findIndex((s) => s.fileKey === activeFileKey);
      const toIndex = slides.findIndex((s) => s.fileKey === overFileKey);
      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) return;

      setIsLocked(true);
      setPendingOperation({
        type: "reorder",
        fromIndex,
        toIndex,
        fileKey: activeFileKey,
      });

      const fromPos = fromIndex + 1;
      const toPos = toIndex + 1;
      onReorder(fromPos, toPos, slides[fromIndex]);
    },
    [isLocked, onReorder]
  );

  const handleDelete = useCallback(
    (fileKey: string, slides: SlideConfig[]) => {
      if (isLocked) return;

      const index = slides.findIndex((s) => s.fileKey === fileKey);
      if (index === -1) return;

      setIsLocked(true);
      setPendingOperation({
        type: "delete",
        fromIndex: index,
        fileKey,
      });

      onDelete(fileKey, slides[index].title);
    },
    [isLocked, onDelete]
  );

  const unlock = useCallback(() => {
    setIsLocked(false);
    setPendingOperation(null);
  }, []);

  return { isLocked, pendingOperation, handleReorder, handleDelete, unlock };
}
