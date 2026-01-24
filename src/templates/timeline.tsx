import { cn } from "@/lib/utils";
import { SlideContainer, Eyebrow, SectionHeader, MonoText } from "@/design-system";

type MilestoneStatus = "complete" | "current" | "future";

interface Milestone {
  phase: string;
  date: string;
  title: string;
  description: string;
  status: MilestoneStatus;
}

interface TimelineTemplateProps {
  eyebrow?: string;
  title: string;
  milestones: Milestone[];
  variant?: "light" | "dark" | "cream";
}

export function TimelineTemplate({
  eyebrow,
  title,
  milestones,
  variant = "light",
}: TimelineTemplateProps) {
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
          <div className="relative pl-8">
            <div
              className="absolute left-[11px] top-0 bottom-0 w-0.5"
              style={{
                backgroundColor: isLight
                  ? "rgba(0,0,0,0.1)"
                  : "rgba(255,255,255,0.2)",
              }}
            />

            {milestones.map((m, i) => (
              <div key={i} className="relative flex items-start mb-10 last:mb-0">
                <div
                  className={cn(
                    "absolute left-0 w-6 h-6 rounded-full border-2",
                    m.status === "complete" &&
                      "border-[var(--color-primary)]",
                    m.status === "current" &&
                      "border-[var(--color-primary)] animate-pulse",
                    m.status === "future" &&
                      (isLight ? "bg-white border-gray-300" : "bg-transparent border-gray-500")
                  )}
                  style={{
                    backgroundColor:
                      m.status !== "future" ? "var(--color-primary)" : undefined,
                  }}
                />

                <div className="ml-12">
                  <MonoText
                    className="text-[12px] uppercase tracking-widest block"
                    style={{ color: "var(--color-primary)" }}
                  >
                    {m.phase} — {m.date}
                  </MonoText>
                  <h3
                    className="text-[24px] mt-2"
                    style={{
                      fontFamily: "var(--font-heading)",
                      color: isLight
                        ? "var(--color-text-primary)"
                        : "var(--color-text-inverse)",
                    }}
                  >
                    {m.title}
                  </h3>
                  <MonoText
                    className="text-[14px] mt-2 block max-w-md"
                    style={{
                      color: isLight
                        ? "var(--color-text-muted)"
                        : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {m.description}
                  </MonoText>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
