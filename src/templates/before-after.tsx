import { SlideContainer } from "@/design-system";

interface BeforeAfterTemplateProps {
  beforeEyebrow?: string;
  beforeTitle: string;
  beforeItems: string[];
  afterEyebrow?: string;
  afterTitle: string;
  afterItems: string[];
}

export function BeforeAfterTemplate({
  beforeEyebrow = "BEFORE",
  beforeTitle,
  beforeItems,
  afterEyebrow = "AFTER",
  afterTitle,
  afterItems,
}: BeforeAfterTemplateProps) {
  return (
    <SlideContainer variant="light" className="!p-0">
      <div className="h-full grid grid-cols-2 relative">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-[80%] z-10"
          style={{ backgroundColor: "rgba(128, 128, 128, 0.3)" }}
        />

        <div className="h-full bg-[var(--color-bg-dark)] p-12 flex flex-col justify-center">
          <span
            className="inline-block text-[14px] tracking-[0.2em] uppercase font-medium"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-primary)",
            }}
          >
            {beforeEyebrow}
          </span>

          <h2
            className="mt-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              lineHeight: 1.1,
              color: "var(--color-text-inverse)",
            }}
          >
            {beforeTitle}
          </h2>

          <ul className="mt-8 space-y-5">
            {beforeItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="shrink-0 mt-1"
                  style={{ color: "var(--color-primary)" }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="3" fill="currentColor" />
                  </svg>
                </span>
                <span
                  className="text-[16px] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "rgba(255, 255, 255, 0.8)",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="h-full bg-[var(--color-bg-cream)] p-12 flex flex-col justify-center">
          <span
            className="inline-block text-[14px] tracking-[0.2em] uppercase font-medium"
            style={{ fontFamily: "var(--font-body)", color: "#10b981" }}
          >
            {afterEyebrow}
          </span>

          <h2
            className="mt-4"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
            }}
          >
            {afterTitle}
          </h2>

          <ul className="mt-8 space-y-5">
            {afterItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 mt-1" style={{ color: "#10b981" }}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M4 8L7 11L12 5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <span
                  className="text-[16px] leading-relaxed"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SlideContainer>
  );
}
