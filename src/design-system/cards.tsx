import { cn } from "@/lib/utils";
import { CornerBrackets } from "./layout";
import { MonoText } from "./typography";

export function FeatureCard({
  icon,
  title,
  description,
  className,
}: {
  icon?: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <CornerBrackets className={className}>
      <div
        className="border p-6 bg-white"
        style={{ borderColor: "var(--color-border)" }}
      >
        {icon && <div className="text-3xl mb-4">{icon}</div>}
        <h3
          className="text-xl mb-2"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-primary)",
          }}
        >
          {title}
        </h3>
        <MonoText
          className="text-[14px]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {description}
        </MonoText>
      </div>
    </CornerBrackets>
  );
}

export function StatCard({
  value,
  label,
  sublabel,
  accent = false,
  className,
}: {
  value: string;
  label: string;
  sublabel?: string;
  accent?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn("p-6 text-center", accent ? "text-white" : "", className)}
      style={{
        backgroundColor: accent ? "var(--color-primary)" : "white",
        border: accent ? "none" : "1px solid var(--color-border)",
      }}
    >
      <div
        className="text-[3rem] leading-none font-light mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {value}
      </div>
      <div
        className="text-[13px] tracking-[0.15em] uppercase font-medium"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {label}
      </div>
      {sublabel && (
        <div
          className="text-[12px] mt-1 opacity-70"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {sublabel}
        </div>
      )}
    </div>
  );
}

export function QuoteCard({
  quote,
  attribution,
  role,
  className,
}: {
  quote: string;
  attribution: string;
  role?: string;
  className?: string;
}) {
  return (
    <div className={cn("p-8 bg-black text-white", className)}>
      <p
        className="text-[clamp(1.3rem,3vw,1.8rem)] leading-[1.4] mb-6"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        "{quote}"
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
          <span className="text-white text-sm">{attribution.charAt(0)}</span>
        </div>
        <div>
          <div
            className="text-[13px] font-medium"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {attribution}
          </div>
          {role && (
            <div
              className="text-[12px] opacity-50"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {role}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
