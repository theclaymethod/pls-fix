import { useRef, useCallback } from "react";

interface UseDragOptions {
  onDrag: (x: number, y: number) => void;
  onDragEnd?: () => void;
  getScale: () => number;
  initialX: number;
  initialY: number;
}

export function useDrag({ onDrag, onDragEnd, getScale, initialX, initialY }: UseDragOptions) {
  const dragging = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startPos = useRef({ x: initialX, y: initialY });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      dragging.current = true;
      startPointer.current = { x: e.clientX, y: e.clientY };
      startPos.current = { x: initialX, y: initialY };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [initialX, initialY]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      const scale = getScale();
      const dx = (e.clientX - startPointer.current.x) / scale;
      const dy = (e.clientY - startPointer.current.y) / scale;
      const newX = Math.max(0, Math.min(1920, startPos.current.x + dx));
      const newY = Math.max(0, Math.min(1080, startPos.current.y + dy));
      onDrag(Math.round(newX), Math.round(newY));
    },
    [onDrag, getScale]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      dragging.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      onDragEnd?.();
    },
    [onDragEnd]
  );

  return { onPointerDown, onPointerMove, onPointerUp };
}
