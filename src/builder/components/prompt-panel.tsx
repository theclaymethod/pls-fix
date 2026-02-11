import { TEMPLATES } from "../types";

interface PromptPanelProps {
  layoutPrompt: string;
  contentPrompt: string;
  templateHint: string;
  slideName: string;
  slidePosition: number;
  mode: "light" | "dark" | "cream";
  onLayoutPromptChange: (v: string) => void;
  onContentPromptChange: (v: string) => void;
  onTemplateHintChange: (v: string) => void;
  onSlideNameChange: (v: string) => void;
  onSlidePositionChange: (v: number) => void;
  onModeChange: (v: "light" | "dark" | "cream") => void;
}

const MODES = ["light", "dark", "cream"] as const;

export function PromptPanel({
  layoutPrompt,
  contentPrompt,
  templateHint,
  slideName,
  slidePosition,
  mode,
  onLayoutPromptChange,
  onContentPromptChange,
  onTemplateHintChange,
  onSlideNameChange,
  onSlidePositionChange,
  onModeChange,
}: PromptPanelProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
        Slide Settings
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-neutral-500 block mb-1">
            Slide Name
          </label>
          <input
            type="text"
            value={slideName}
            onChange={(e) => onSlideNameChange(e.target.value)}
            placeholder="my-slide"
            className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 block mb-1">
            Position
          </label>
          <input
            type="number"
            min={1}
            value={slidePosition}
            onChange={(e) =>
              onSlidePositionChange(parseInt(e.target.value) || 1)
            }
            className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs text-neutral-500 block mb-1">Template</label>
        <select
          value={templateHint}
          onChange={(e) => onTemplateHintChange(e.target.value)}
          className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
        >
          <option value="">Auto (best match)</option>
          {TEMPLATES.map((t) => (
            <option key={t} value={t}>
              {t.replace("Template", "")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-xs text-neutral-500 block mb-1">Mode</label>
        <div className="flex gap-1">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => onModeChange(m)}
              className="flex-1 text-xs py-1.5 rounded border transition-colors"
              style={{
                borderColor: mode === m ? "#1a1a1a" : "#e5e7eb",
                backgroundColor: mode === m ? "#1a1a1a" : "white",
                color: mode === m ? "white" : "#6b7280",
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-neutral-500 block mb-1">
          Layout Intent
        </label>
        <textarea
          value={layoutPrompt}
          onChange={(e) => onLayoutPromptChange(e.target.value)}
          placeholder="Describe the layout you want..."
          rows={3}
          className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none resize-none"
        />
      </div>

      <div>
        <label className="text-xs text-neutral-500 block mb-1">Content</label>
        <textarea
          value={contentPrompt}
          onChange={(e) => onContentPromptChange(e.target.value)}
          placeholder="Describe the content for this slide..."
          rows={4}
          className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none resize-none"
        />
      </div>
    </div>
  );
}
