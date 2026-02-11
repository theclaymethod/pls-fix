import { useRef, useState, useLayoutEffect, useCallback } from "react";
import { deckConfig } from "../../../deck.config";
import type { CanvasBox } from "../types";
import { CanvasBoxComponent } from "./canvas-box";

const { width: W, height: H } = deckConfig.design;

interface CanvasProps {
  boxes: CanvasBox[];
  selectedBoxId: string | null;
  onAddBox: (x: number, y: number) => void;
  onSelectBox: (id: string | null) => void;
  onMoveBox: (id: string, x: number, y: number) => void;
  onResizeBox: (id: string, width: number, height: number) => void;
}

export function Canvas({
  boxes,
  selectedBoxId,
  onAddBox,
  onSelectBox,
  onMoveBox,
  onResizeBox,
}: CanvasProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scaleRef = useRef(1);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    const parent = wrapperRef.current.parentElement;
    if (!parent) return;

    const calculate = () => {
      const padding = 32;
      const s = Math.min(
        (parent.clientWidth - padding) / W,
        (parent.clientHeight - padding) / H
      );
      scaleRef.current = s;
      setScale(s);
    };

    calculate();
    const ro = new ResizeObserver(calculate);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const getScale = useCallback(() => scaleRef.current, []);

  const handleDoubleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target !== e.currentTarget) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = Math.round((e.clientX - rect.left) / scaleRef.current);
      const y = Math.round((e.clientY - rect.top) / scaleRef.current);
      onAddBox(
        Math.max(0, Math.min(W - 300, x - 150)),
        Math.max(0, Math.min(H - 200, y - 100))
      );
    },
    [onAddBox]
  );

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onSelectBox(null);
    },
    [onSelectBox]
  );

  return (
    <div
      ref={wrapperRef}
      className="flex items-center justify-center h-full w-full"
    >
      {scale && (
        <div
          style={{
            width: W * scale,
            height: H * scale,
          }}
        >
          <div
            className="relative bg-white shadow-2xl overflow-hidden"
            style={{
              width: W,
              height: H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
              borderRadius: 4,
            }}
            onDoubleClick={handleDoubleClick}
            onClick={handleClick}
          >
            {/* Grid overlay */}
            <svg
              className="absolute inset-0 pointer-events-none"
              width={W}
              height={H}
            >
              {[0.25, 0.5, 0.75].map((f) => (
                <line
                  key={`v-${f}`}
                  x1={W * f}
                  y1={0}
                  x2={W * f}
                  y2={H}
                  stroke="#e5e7eb"
                  strokeDasharray="8 8"
                  strokeWidth={1}
                />
              ))}
              {[0.25, 0.5, 0.75].map((f) => (
                <line
                  key={`h-${f}`}
                  x1={0}
                  y1={H * f}
                  x2={W}
                  y2={H * f}
                  stroke="#e5e7eb"
                  strokeDasharray="8 8"
                  strokeWidth={1}
                />
              ))}
            </svg>

            {/* Canvas hint */}
            {boxes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <p className="text-neutral-300 text-lg select-none">
                  Double-click to add a box
                </p>
              </div>
            )}

            {boxes.map((box) => (
              <CanvasBoxComponent
                key={box.id}
                box={box}
                selected={box.id === selectedBoxId}
                getScale={getScale}
                onSelect={onSelectBox}
                onMove={onMoveBox}
                onResize={onResizeBox}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
