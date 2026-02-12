import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { toPng } from "html-to-image";
import { SLIDE_CONFIG, loadSlideComponent } from "@/deck/config";
import { deckConfig } from "../../../deck.config";

const { width: W, height: H } = deckConfig.design;

const CONCURRENCY = 4;

const cache = new Map<string, string>();
let queue: string[] = [];
let activeWorkers = 0;
let revision = 0;

interface ThumbnailContextValue {
  getUrl: (fileKey: string) => string | undefined;
  requestCapture: (fileKey: string) => void;
  rev: number;
}

const ThumbnailContext = createContext<ThumbnailContextValue | null>(null);

async function captureSlide(
  fileKey: string,
  hostEl: HTMLDivElement,
  onCaptured: () => void,
) {
  const container = document.createElement("div");
  container.style.cssText = `width:${W}px;height:${H}px;overflow:hidden`;
  hostEl.appendChild(container);

  try {
    const Component = await loadSlideComponent(fileKey);
    const root = createRoot(container);
    flushSync(() => root.render(<Component />));
    await new Promise((r) => setTimeout(r, 500));

    const dataUrl = await toPng(container, {
      width: W,
      height: H,
      pixelRatio: 0.5,
      skipFonts: true,
    });

    cache.set(fileKey, dataUrl);
    root.unmount();
    onCaptured();
  } catch {
    // capture failed — skip
  } finally {
    container.remove();
  }
}

export function ThumbnailProvider({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [rev, setRev] = useState(0);

  const bump = useCallback(() => {
    revision++;
    setRev(revision);
  }, []);

  const drain = useCallback(() => {
    const host = hostRef.current;
    if (!host) return;

    while (activeWorkers < CONCURRENCY && queue.length > 0) {
      const fileKey = queue.shift()!;
      if (cache.has(fileKey)) continue;

      activeWorkers++;
      captureSlide(fileKey, host, () => {
        activeWorkers--;
        bump();
        drain();
      });
    }
  }, [bump]);

  const requestCapture = useCallback(
    (fileKey: string) => {
      if (cache.has(fileKey) || queue.includes(fileKey)) return;
      queue.push(fileKey);
      drain();
    },
    [drain],
  );

  const getUrl = useCallback((fileKey: string) => cache.get(fileKey), []);

  useEffect(() => {
    for (const slide of SLIDE_CONFIG) {
      requestCapture(slide.fileKey);
    }
  }, [requestCapture]);

  return (
    <ThumbnailContext value={{ getUrl, requestCapture, rev }}>
      <div
        ref={hostRef}
        style={{
          position: "fixed",
          left: -9999,
          top: 0,
          pointerEvents: "none",
        }}
      />
      {children}
    </ThumbnailContext>
  );
}

export function useThumbnails(): ThumbnailContextValue {
  const ctx = useContext(ThumbnailContext);
  if (!ctx) throw new Error("useThumbnails must be inside ThumbnailProvider");
  return ctx;
}
