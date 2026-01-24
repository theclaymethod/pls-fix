import { useRef, useState, useLayoutEffect } from "react";
import { deckConfig } from "../../deck.config";

const { width: DESIGN_WIDTH, height: DESIGN_HEIGHT } = deckConfig.design;

export function SlideScaler({ children }: { children: React.ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    const parent = wrapperRef.current.parentElement;
    if (!parent) return;

    const calculateScale = () => {
      const padding = 32;
      const availableWidth = parent.clientWidth - padding;
      const availableHeight = parent.clientHeight - padding;

      const scaleX = availableWidth / DESIGN_WIDTH;
      const scaleY = availableHeight / DESIGN_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    calculateScale();

    const resizeObserver = new ResizeObserver(calculateScale);
    resizeObserver.observe(parent);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: scale ? DESIGN_WIDTH * scale : "100%",
        height: scale ? DESIGN_HEIGHT * scale : "100%",
        opacity: scale ? 1 : 0,
      }}
    >
      {scale && (
        <div
          className="bg-white shadow-2xl overflow-hidden relative"
          style={{
            width: DESIGN_WIDTH,
            height: DESIGN_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            borderRadius: 4,
            containerType: "size",
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
}
