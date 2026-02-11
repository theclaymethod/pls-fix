import type { CanvasBox, BoxType } from "../types";
import { BOX_TYPE_COLORS } from "../types";

const BOX_TYPES: BoxType[] = ["text", "image", "chart", "icon", "card", "generic"];

interface BoxPropertiesProps {
  box: CanvasBox;
  onUpdate: (id: string, updates: Partial<Pick<CanvasBox, "label" | "type" | "x" | "y" | "width" | "height">>) => void;
  onDelete: (id: string) => void;
}

export function BoxProperties({ box, onUpdate, onDelete }: BoxPropertiesProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
          Box Properties
        </h3>
        <button
          onClick={() => onDelete(box.id)}
          className="text-xs text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      </div>

      <div>
        <label className="text-xs text-neutral-500 block mb-1">Label</label>
        <input
          type="text"
          value={box.label}
          onChange={(e) => onUpdate(box.id, { label: e.target.value })}
          className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
        />
      </div>

      <div>
        <label className="text-xs text-neutral-500 block mb-1">Type</label>
        <div className="grid grid-cols-3 gap-1">
          {BOX_TYPES.map((t) => (
            <button
              key={t}
              onClick={() => onUpdate(box.id, { type: t })}
              className="text-xs px-2 py-1 rounded border transition-colors"
              style={{
                borderColor: box.type === t ? BOX_TYPE_COLORS[t] : "#e5e7eb",
                backgroundColor: box.type === t ? `${BOX_TYPE_COLORS[t]}15` : "white",
                color: box.type === t ? BOX_TYPE_COLORS[t] : "#6b7280",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-xs text-neutral-500 block mb-1">X</label>
          <input
            type="number"
            value={box.x}
            onChange={(e) => onUpdate(box.id, { x: parseInt(e.target.value) || 0 })}
            className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 block mb-1">Y</label>
          <input
            type="number"
            value={box.y}
            onChange={(e) => onUpdate(box.id, { y: parseInt(e.target.value) || 0 })}
            className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 block mb-1">Width</label>
          <input
            type="number"
            value={box.width}
            onChange={(e) => onUpdate(box.id, { width: parseInt(e.target.value) || 100 })}
            className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-neutral-500 block mb-1">Height</label>
          <input
            type="number"
            value={box.height}
            onChange={(e) => onUpdate(box.id, { height: parseInt(e.target.value) || 60 })}
            className="w-full px-2 py-1.5 border border-neutral-200 rounded text-sm bg-white focus:border-neutral-400 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
