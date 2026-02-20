import { useState, useCallback, useRef, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import { flushSync } from "react-dom";
import { SLIDE_CONFIG, loadSlideComponent } from "@/deck/config";
import { deckConfig } from "../../../deck.config";

const { width: W, height: H } = deckConfig.design;
const RENDER_SETTLE_MS = 2000;

interface PdfExportProgress {
  current: number;
  total: number;
}

interface PdfExportState {
  exportPdf: () => void;
  cancel: () => void;
  isExporting: boolean;
  progress: PdfExportProgress | null;
}

export function usePdfExport(): PdfExportState {
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState<PdfExportProgress | null>(null);
  const cancelledRef = useRef(false);

  const exportPdf = useCallback(async () => {
    if (isExporting) return;

    setIsExporting(true);
    cancelledRef.current = false;

    const total = SLIDE_CONFIG.length;

    try {
      const components: ComponentType[] = [];
      for (let i = 0; i < total; i++) {
        if (cancelledRef.current) return;
        setProgress({ current: i + 1, total });
        const Component = await loadSlideComponent(SLIDE_CONFIG[i].fileKey);
        components.push(Component);
      }

      if (cancelledRef.current) return;

      const printWin = window.open("", "pdf-export");
      if (!printWin) {
        alert("Please allow popups to export PDF.");
        return;
      }

      const doc = printWin.document;
      doc.open();
      doc.write("<!DOCTYPE html><html><head></head><body></body></html>");
      doc.close();
      doc.title = deckConfig.title || "Presentation";

      document.head
        .querySelectorAll('style, link[rel="stylesheet"]')
        .forEach((el) => doc.head.appendChild(el.cloneNode(true)));

      const printCSS = doc.createElement("style");
      printCSS.textContent = `
        @page { size: ${W}px ${H}px; margin: 0; }
        html, body { margin: 0; padding: 0; }
        * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color-adjust: exact !important; }
        .slide-page { width: ${W}px; height: ${H}px; overflow: hidden; break-after: page; }
        .slide-page:last-child { break-after: auto; }
      `;
      doc.head.appendChild(printCSS);

      const roots: ReturnType<typeof createRoot>[] = [];
      for (const Component of components) {
        if (cancelledRef.current) {
          printWin.close();
          return;
        }
        const page = doc.createElement("div");
        page.className = "slide-page";
        doc.body.appendChild(page);
        const root = createRoot(page);
        flushSync(() => root.render(<Component />));
        roots.push(root);
      }

      await new Promise((r) => setTimeout(r, RENDER_SETTLE_MS));

      if (cancelledRef.current) {
        roots.forEach((r) => r.unmount());
        printWin.close();
        return;
      }

      printWin.focus();
      printWin.print();
      roots.forEach((r) => r.unmount());
    } finally {
      setIsExporting(false);
      setProgress(null);
    }
  }, [isExporting]);

  const cancel = useCallback(() => {
    cancelledRef.current = true;
  }, []);

  return { exportPdf, cancel, isExporting, progress };
}
