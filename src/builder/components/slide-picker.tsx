import { SLIDE_CONFIG } from "@/deck/config";
import type { SlideEditInfo } from "../types";

interface SlidePickerProps {
  selectedFileKey: string | null;
  onSelect: (info: SlideEditInfo) => void;
  onNewSlide: () => void;
}

export function SlidePicker({
  selectedFileKey,
  onSelect,
  onNewSlide,
}: SlidePickerProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const fileKey = e.target.value;
    if (!fileKey) return;
    const index = SLIDE_CONFIG.findIndex((s) => s.fileKey === fileKey);
    if (index === -1) return;
    const slide = SLIDE_CONFIG[index];
    onSelect({
      slideNumber: index + 1,
      fileKey: slide.fileKey,
      filePath: `src/deck/slides/${slide.fileKey}.tsx`,
      title: slide.title,
    });
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Slide
        </h3>
        <button
          onClick={onNewSlide}
          className="text-xs text-neutral-500 hover:text-neutral-800 transition-colors"
        >
          + New
        </button>
      </div>
      <select
        value={selectedFileKey ?? ""}
        onChange={handleChange}
        className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
      >
        <option value="" disabled>
          Select a slide...
        </option>
        {SLIDE_CONFIG.map((slide, i) => (
          <option key={slide.fileKey} value={slide.fileKey}>
            {String(i + 1).padStart(2, "0")} — {slide.title}
          </option>
        ))}
      </select>
    </div>
  );
}
