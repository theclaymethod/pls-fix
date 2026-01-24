import {
  SlideContainer,
  CornerBrackets,
  Eyebrow,
  SectionHeader,
  MonoText,
} from "@/design-system";

interface Stat {
  value: string;
  label: string;
  sublabel?: string;
}

interface StatCardsTemplateProps {
  eyebrow?: string;
  title: string;
  stats: Stat[];
  accentIndex?: number;
  variant?: "light" | "dark" | "cream";
}

export function StatCardsTemplate({
  eyebrow,
  title,
  stats,
  accentIndex = 1,
  variant = "light",
}: StatCardsTemplateProps) {
  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col p-8">
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

        <div className="flex-1 flex items-center justify-around">
          {stats.map((stat, i) => (
            <CornerBrackets key={i}>
              <div className="text-center p-8 min-w-[200px]">
                <div
                  className="font-light"
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "clamp(4rem, 8vw, 6rem)",
                    color:
                      i === accentIndex
                        ? "var(--color-primary)"
                        : "var(--color-text-primary)",
                  }}
                >
                  {stat.value}
                </div>
                <MonoText
                  className="text-base uppercase tracking-widest mt-4 block"
                  style={{ color: "var(--color-text-muted)" }}
                >
                  {stat.label}
                </MonoText>
                {stat.sublabel && (
                  <MonoText
                    className="text-sm mt-1 block"
                    style={{ color: "#999" }}
                  >
                    {stat.sublabel}
                  </MonoText>
                )}
              </div>
            </CornerBrackets>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
}
