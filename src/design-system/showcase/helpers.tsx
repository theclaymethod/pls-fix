// Shared helper components used across showcase sections:
// BriefSection — numbered section wrapper with title + divider
// ColorSwatch — color palette display block with hex, name, CSS var
// TypeSpecimen — labeled type sample with spec string
// ReplayWrapper — remount trigger for replaying animations

import { useState } from "react";
import { Divider } from "../layout";
import { TechCode, SectionHeader } from "../typography";

export function BriefSection({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-20">
      <div className="flex items-baseline gap-6 mb-6">
        <TechCode size="lg">{String(number).padStart(2, "0")}</TechCode>
        <SectionHeader className="text-[56px]">{title}</SectionHeader>
      </div>
      <Divider thickness="thick" className="mb-10" />
      {children}
    </div>
  );
}

export function ColorSwatch({
  name,
  value,
  cssVar,
  textDark = true,
}: {
  name: string;
  value: string;
  cssVar: string;
  textDark?: boolean;
}) {
  return (
    <div className="flex flex-col">
      <div
        className="w-full h-28 border-2 flex items-end p-3"
        style={{
          backgroundColor: value,
          borderColor: "var(--color-border)",
        }}
      >
        <span
          className="text-[14px] font-mono font-medium"
          style={{ color: textDark ? "#0A0A0A" : "#FFFFFF" }}
        >
          {value}
        </span>
      </div>
      <div className="mt-2">
        <div
          className="text-[16px] font-semibold"
          style={{ fontFamily: "var(--font-body)", color: "var(--color-text-primary)" }}
        >
          {name}
        </div>
        <div
          className="text-[13px] font-mono"
          style={{ color: "var(--color-text-muted)" }}
        >
          {cssVar}
        </div>
      </div>
    </div>
  );
}

export function TypeSpecimen({
  label,
  component,
  spec,
}: {
  label: string;
  component: React.ReactNode;
  spec: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline justify-between mb-3">
        <TechCode size="sm">{label}</TechCode>
        <span
          className="text-[13px] font-mono"
          style={{ color: "var(--color-text-muted)" }}
        >
          {spec}
        </span>
      </div>
      <Divider thickness="thin" className="mb-4" />
      {component}
    </div>
  );
}

export function ReplayWrapper({ children }: { children: React.ReactNode }) {
  const [key, setKey] = useState(0);

  return (
    <div>
      <div key={key}>{children}</div>
      <button
        type="button"
        onClick={() => setKey((k) => k + 1)}
        className="mt-4 px-4 py-2 text-[16px] tracking-[0.1em] uppercase cursor-pointer"
        style={{
          fontFamily: "var(--font-mono)",
          color: "var(--color-text-muted)",
          backgroundColor: "transparent",
          border: "1px solid var(--color-border-light)",
        }}
      >
        ↻ Replay
      </button>
    </div>
  );
}
