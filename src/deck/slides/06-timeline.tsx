import { TimelineTemplate } from "@/templates";

export function Slide06Timeline() {
  return (
    <TimelineTemplate
      eyebrow="Roadmap"
      title="Project Timeline"
      milestones={[
        {
          phase: "Phase 1",
          date: "Q1 2024",
          title: "Discovery",
          description: "User research, requirements gathering, and initial prototyping",
          status: "complete",
        },
        {
          phase: "Phase 2",
          date: "Q2 2024",
          title: "Development",
          description: "Core feature implementation and technical infrastructure",
          status: "complete",
        },
        {
          phase: "Phase 3",
          date: "Q3 2024",
          title: "Testing",
          description: "QA, user acceptance testing, and performance optimization",
          status: "current",
        },
        {
          phase: "Phase 4",
          date: "Q4 2024",
          title: "Launch",
          description: "Production deployment, monitoring, and iteration",
          status: "future",
        },
      ]}
      variant="light"
    />
  );
}
