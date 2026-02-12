import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  Divider,
  GridSection,
  ProcessCard,
  Label,
  TechCode,
  AnimatedEntry,
  StaggerContainer,
} from "@/design-system";

const milestones = [
  {
    phase: "Phase 1",
    date: "Q1 2024",
    title: "Discovery",
    description:
      "User research, requirements gathering, and initial prototyping",
    status: "complete" as const,
  },
  {
    phase: "Phase 2",
    date: "Q2 2024",
    title: "Development",
    description:
      "Core feature implementation and technical infrastructure",
    status: "complete" as const,
  },
  {
    phase: "Phase 3",
    date: "Q3 2024",
    title: "Testing",
    description:
      "QA, user acceptance testing, and performance optimization",
    status: "current" as const,
  },
  {
    phase: "Phase 4",
    date: "Q4 2024",
    title: "Launch",
    description:
      "Production deployment, monitoring, and iteration",
    status: "future" as const,
  },
];

const statusLabel = {
  complete: { text: "Complete", variant: "dark" as const },
  current: { text: "In Progress", variant: "primary" as const },
  future: { text: "Upcoming", variant: "default" as const },
};

export function Slide06Timeline() {
  return (
    <SlideContainer mode="white" className="flex flex-col">
      <StaggerContainer stagger={0.12} delay={0} className="mb-12">
        <AnimatedEntry variant="slideUp" className="mb-4">
          <Eyebrow>Roadmap</Eyebrow>
        </AnimatedEntry>
        <AnimatedEntry variant="slideUp" className="mb-8">
          <SectionHeader>Project Timeline</SectionHeader>
        </AnimatedEntry>
        <AnimatedEntry variant="slideUp">
          <Divider />
        </AnimatedEntry>
      </StaggerContainer>

      <StaggerContainer
        stagger={0.15}
        delay={0.3}
        className="flex-1 flex items-center"
      >
        <GridSection columns={4} gap="md" className="w-full">
          {milestones.map((m) => (
            <AnimatedEntry key={m.phase} variant="slideUp">
              <div className="flex flex-col h-full">
                <div className="mb-3 flex items-center justify-between">
                  <TechCode size="sm">{m.date}</TechCode>
                  <Label variant={statusLabel[m.status].variant}>
                    {statusLabel[m.status].text}
                  </Label>
                </div>
                <Divider className="mb-4" />
                <ProcessCard
                  number={Number(m.phase.replace("Phase ", ""))}
                  title={m.title}
                  description={m.description}
                  className="px-0"
                />
              </div>
            </AnimatedEntry>
          ))}
        </GridSection>
      </StaggerContainer>
    </SlideContainer>
  );
}
