import { useRef, useCallback } from "react";
import { MIN_BOX_WIDTH, MIN_BOX_HEIGHT } from "../types";

interface UseResizeOptions {
  onResize: (width: number, height: number) => void;
  onResizeEnd?: () => void;
  getScale: () => number;
  initialWidth: number;
  initialHeight: number;
}

export function useResize({
  onResize,
  onResizeEnd,
  getScale,
  initialWidth,
  initialHeight,
}: UseResizeOptions) {
  const resizing = useRef(false);
  const startPointer = useRef({ x: 0, y: 0 });
  const startSize = useRef({ w: initialWidth, h: initialHeight });

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button !== 0) return;
      e.stopPropagation();
      e.preventDefault();
      resizing.current = true;
      startPointer.current = { x: e.clientX, y: e.clientY };
      startSize.current = { w: initialWidth, h: initialHeight };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [initialWidth, initialHeight]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!resizing.current) return;
      const scale = getScale();
      const dx = (e.clientX - startPointer.current.x) / scale;
      const dy = (e.clientY - startPointer.current.y) / scale;
      const newW = Math.max(MIN_BOX_WIDTH, startSize.current.w + dx);
      const newH = Math.max(MIN_BOX_HEIGHT, startSize.current.h + dy);
      onResize(Math.round(newW), Math.round(newH));
    },
    [onResize, getScale]
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (!resizing.current) return;
      resizing.current = false;
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      onResizeEnd?.();
    },
    [onResizeEnd]
  );

  return { onPointerDown, onPointerMove, onPointerUp };
}
