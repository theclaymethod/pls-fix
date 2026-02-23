import { createFileRoute } from "@tanstack/react-router";
import { Suspense, lazy, useCallback, useLayoutEffect, useRef, useState } from "react";
import { deckConfig } from "../../deck.config";

const DesignSystemShowcase = lazy(() =>
  import("@/design-system/showcase").then((m) => ({ default: m.DesignSystemShowcase }))
);

const DESIGN_WIDTH = deckConfig.design.width;

export const Route = createFileRoute("/design-system")({
  component: DesignSystemPage,
});

function DesignSystemPage() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState<number | null>(null);
  const [scaledHeight, setScaledHeight] = useState<number | undefined>(undefined);

  const updateScale = useCallback(() => {
    if (!wrapperRef.current) return;
    const padding = 64;
    const availableWidth = wrapperRef.current.clientWidth - padding;
    setScale(availableWidth / DESIGN_WIDTH);
  }, []);

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;
    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    resizeObserver.observe(wrapperRef.current);
    return () => resizeObserver.disconnect();
  }, [updateScale]);

  useLayoutEffect(() => {
    if (!contentRef.current || !scale) return;
    const el = contentRef.current;
    el.style.transform = "";
    void el.offsetHeight;
    el.style.transform = `scale(${scale})`;
  });

  useLayoutEffect(() => {
    if (!contentRef.current || !scale) return;

    const updateHeight = () => {
      const contentHeight = contentRef.current?.scrollHeight ?? 0;
      setScaledHeight(contentHeight * scale);
    };

    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(contentRef.current);
    return () => observer.disconnect();
  }, [scale]);

  return (
    <div className="min-h-screen bg-neutral-950 overflow-y-auto" ref={wrapperRef}>
      {scale && (
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-screen">
              <div className="w-8 h-8 border-2 border-neutral-700 border-t-neutral-400 rounded-full animate-spin" />
            </div>
          }
        >
          <div style={{ height: scaledHeight, position: "relative", margin: "0 auto" }}>
            <div
              ref={contentRef}
              style={{
                width: DESIGN_WIDTH,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <DesignSystemShowcase />
            </div>
          </div>
        </Suspense>
      )}
    </div>
  );
}
