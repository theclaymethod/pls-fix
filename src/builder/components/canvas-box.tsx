import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { CanvasBox } from "../types";
import { useDrag } from "../hooks/use-drag";
import { useResize } from "../hooks/use-resize";

interface CanvasBoxProps {
  box: CanvasBox;
  selected: boolean;
  getScale: () => number;
  onSelect: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

export function CanvasBoxComponent({
  box,
  selected,
  getScale,
  onSelect,
  onMove,
  onResize,
}: CanvasBoxProps) {
  const handleDrag = useCallback(
    (x: number, y: number) => onMove(box.id, x, y),
    [box.id, onMove]
  );

  const handleResize = useCallback(
    (w: number, h: number) => onResize(box.id, w, h),
    [box.id, onResize]
  );

  const drag = useDrag({
    onDrag: handleDrag,
    getScale,
    initialX: box.x,
    initialY: box.y,
  });

  const resize = useResize({
    onResize: handleResize,
    getScale,
    initialWidth: box.width,
    initialHeight: box.height,
  });

  return (
    <div
      className={cn(
        "absolute flex items-center justify-center cursor-move select-none",
        "border-2 rounded-md transition-shadow",
        selected ? "shadow-lg ring-2 ring-blue-500" : "shadow-sm"
      )}
      style={{
        left: box.x,
        top: box.y,
        width: box.width,
        height: box.height,
        backgroundColor: `${box.color}20`,
        borderColor: selected ? "#3b82f6" : `${box.color}80`,
      }}
      onPointerDown={(e) => {
        onSelect(box.id);
        drag.onPointerDown(e);
      }}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      <div className="text-center pointer-events-none px-2">
        <div
          className="text-xs font-medium truncate"
          style={{ color: box.color }}
        >
          {box.label}
        </div>
        <div className="text-[10px] opacity-60" style={{ color: box.color }}>
          {box.type}
        </div>
      </div>

      {/* Resize handle — bottom-right corner */}
      <div
        className="absolute -bottom-1 -right-1 w-4 h-4 cursor-se-resize"
        style={{ backgroundColor: selected ? "#3b82f6" : `${box.color}80` }}
        onPointerDown={resize.onPointerDown}
        onPointerMove={resize.onPointerMove}
        onPointerUp={resize.onPointerUp}
      />
    </div>
  );
}
