import { cn } from "@/lib/utils";

export function HeroTitle({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <h1
      className={cn("text-[86px] leading-[0.95] tracking-[-0.02em]", className)}
      style={{ fontFamily: "var(--font-heading)", ...style }}
    >
      {children}
    </h1>
  );
}

export function SectionHeader({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <h2
      className={cn("text-[48px] leading-[1.1] tracking-[-0.01em]", className)}
      style={{ fontFamily: "var(--font-heading)", ...style }}
    >
      {children}
    </h2>
  );
}

export function Eyebrow({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn(
        "inline-block text-[12px] tracking-[0.25em] uppercase font-medium",
        className
      )}
      style={{ fontFamily: "var(--font-body)", ...style }}
    >
      {children}
    </span>
  );
}

export function MonoText({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={cn("text-[16px] leading-[1.6]", className)}
      style={{ fontFamily: "var(--font-body)", ...style }}
    >
      {children}
    </span>
  );
}

export function Quote({
  children,
  attribution,
  className,
}: {
  children: React.ReactNode;
  attribution?: string;
  className?: string;
}) {
  return (
    <blockquote className={cn("relative", className)}>
      <p
        className="text-[34px] leading-[1.4] italic"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        "{children}"
      </p>
      {attribution && (
        <cite
          className="block mt-4 text-[11px] tracking-[0.15em] uppercase not-italic"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-muted)",
          }}
        >
          — {attribution}
        </cite>
      )}
    </blockquote>
  );
}

export function SlideNumber({
  number,
  total,
  className,
}: {
  number: number;
  total: number;
  className?: string;
}) {
  return (
    <div
      className={cn("text-[12px] tracking-[0.2em] uppercase", className)}
      style={{
        fontFamily: "var(--font-body)",
        color: "#999",
      }}
    >
      {String(number).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  );
}

export function ListItem({
  number,
  children,
  className,
}: {
  number: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <span
        className="text-[13px] shrink-0"
        style={{
          fontFamily: "var(--font-body)",
          color: "#999",
        }}
      >
        [{number}]
      </span>
      <span
        className="text-[16px] leading-[1.6]"
        style={{ fontFamily: "var(--font-body)", color: "var(--color-text-secondary)" }}
      >
        {children}
      </span>
    </div>
  );
}
