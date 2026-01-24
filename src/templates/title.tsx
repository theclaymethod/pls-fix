import { SlideContainer } from "@/design-system";

interface TitleTemplateProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  tag?: string;
  author?: string;
  date?: string;
  variant?: "light" | "dark";
}

export function TitleTemplate({
  eyebrow,
  title,
  subtitle,
  tag,
  author,
  date,
  variant = "dark",
}: TitleTemplateProps) {
  const isLight = variant === "light";

  return (
    <SlideContainer variant={variant} className="relative">
      {/* Corner bracket accents */}
      <div
        className="pointer-events-none absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2"
        style={{ borderColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)" }}
      />
      <div
        className="pointer-events-none absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2"
        style={{ borderColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)" }}
      />
      <div
        className="pointer-events-none absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2"
        style={{ borderColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)" }}
      />
      <div
        className="pointer-events-none absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2"
        style={{ borderColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)" }}
      />

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-16">
        <div className="text-center max-w-4xl">
          {/* Eyebrow with divider lines */}
          {eyebrow && (
            <div className="flex items-center justify-center gap-6 mb-8">
              <div
                className="h-px w-16"
                style={{ backgroundColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)" }}
              />
              <p
                className="text-[12px] tracking-[0.3em] uppercase"
                style={{
                  fontFamily: "var(--font-body)",
                  color: "var(--color-primary)",
                }}
              >
                {eyebrow}
              </p>
              <div
                className="h-px w-16"
                style={{ backgroundColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)" }}
              />
            </div>
          )}

          <h1
            className="text-[clamp(4rem,10vw,6.5rem)] font-medium uppercase tracking-[-0.02em] leading-[0.9]"
            style={{
              fontFamily: "var(--font-heading)",
              color: isLight ? "var(--color-text-primary)" : "#fff",
            }}
          >
            {title}
          </h1>

          {subtitle && (
            <p
              className="mx-auto mt-8 max-w-2xl text-[18px] leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: isLight ? "var(--color-text-secondary)" : "rgba(255,255,255,0.6)",
              }}
            >
              {subtitle}
            </p>
          )}

          {/* Tag pill */}
          {tag && (
            <div className="mt-10 flex items-center justify-center">
              <div
                className="px-5 py-2 text-[11px] tracking-[0.2em] uppercase border"
                style={{
                  fontFamily: "var(--font-body)",
                  color: isLight ? "var(--color-text-secondary)" : "rgba(255,255,255,0.8)",
                  borderColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.3)",
                }}
              >
                {tag}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom info */}
      {(author || date) && (
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 text-[10px] tracking-[0.15em] uppercase"
          style={{
            fontFamily: "var(--font-body)",
            color: isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)",
          }}
        >
          {author && <span>{author}</span>}
          {author && date && (
            <span
              className="h-3 w-px"
              style={{ backgroundColor: isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)" }}
            />
          )}
          {date && <span>{date}</span>}
        </div>
      )}
    </SlideContainer>
  );
}
