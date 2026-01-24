import {
  SlideContainer,
  CornerBrackets,
  Eyebrow,
  SectionHeader,
} from "@/design-system";

interface ComparisonRow {
  feature: string;
  before: boolean;
  after: boolean;
}

interface ComparisonTableTemplateProps {
  eyebrow?: string;
  title: string;
  rows: ComparisonRow[];
  beforeLabel?: string;
  afterLabel?: string;
  variant?: "light" | "dark" | "cream";
}

export function ComparisonTableTemplate({
  eyebrow,
  title,
  rows,
  beforeLabel = "Before",
  afterLabel = "After",
  variant = "light",
}: ComparisonTableTemplateProps) {
  const isLight = variant === "light" || variant === "cream";

  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col">
        <div className="mb-8">
          {eyebrow && (
            <Eyebrow
              className="text-[14px]"
              style={{ color: "var(--color-primary)" }}
            >
              {eyebrow}
            </Eyebrow>
          )}
          <SectionHeader
            className="mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}
          >
            {title}
          </SectionHeader>
        </div>

        <div className="flex-1 flex items-center">
          <CornerBrackets
            size="lg"
            color={isLight ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.2)"}
          >
            <div
              className="border"
              style={{
                borderColor: isLight
                  ? "rgba(0,0,0,0.1)"
                  : "rgba(255,255,255,0.1)",
                backgroundColor: isLight ? "#fff" : "rgba(255,255,255,0.05)",
              }}
            >
              <div
                className="grid grid-cols-3 border-b"
                style={{
                  borderColor: isLight
                    ? "rgba(0,0,0,0.1)"
                    : "rgba(255,255,255,0.1)",
                }}
              >
                <div
                  className="p-5 text-[14px] font-medium"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: isLight
                      ? "var(--color-text-primary)"
                      : "var(--color-text-inverse)",
                  }}
                >
                  Feature
                </div>
                <div
                  className="p-5 text-center text-[14px] font-medium"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: isLight
                      ? "var(--color-text-muted)"
                      : "rgba(255,255,255,0.6)",
                  }}
                >
                  {beforeLabel}
                </div>
                <div
                  className="p-5 text-center text-[14px] font-medium"
                  style={{
                    fontFamily: "var(--font-body)",
                    color: "var(--color-primary)",
                  }}
                >
                  {afterLabel}
                </div>
              </div>

              {rows.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-3 border-b last:border-0"
                  style={{
                    borderColor: isLight
                      ? "rgba(0,0,0,0.05)"
                      : "rgba(255,255,255,0.05)",
                    backgroundColor:
                      i % 2 === 0
                        ? "transparent"
                        : isLight
                          ? "rgba(0,0,0,0.02)"
                          : "rgba(255,255,255,0.02)",
                  }}
                >
                  <div
                    className="p-5 text-[14px]"
                    style={{
                      fontFamily: "var(--font-body)",
                      color: isLight
                        ? "var(--color-text-primary)"
                        : "var(--color-text-inverse)",
                    }}
                  >
                    {row.feature}
                  </div>
                  <div
                    className="p-5 text-center text-2xl"
                    style={{ color: row.before ? "#10b981" : "#ef4444" }}
                  >
                    {row.before ? "✓" : "✗"}
                  </div>
                  <div
                    className="p-5 text-center text-2xl"
                    style={{ color: row.after ? "#10b981" : "#ef4444" }}
                  >
                    {row.after ? "✓" : "✗"}
                  </div>
                </div>
              ))}
            </div>
          </CornerBrackets>
        </div>
      </div>
    </SlideContainer>
  );
}
