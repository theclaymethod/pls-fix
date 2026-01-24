import { StackedCardsTemplate } from "@/templates";

export function Slide16Process() {
  return (
    <StackedCardsTemplate
      eyebrow="Process"
      title="How We Work"
      subtitle="A systematic approach to building great products."
      cards={[
        {
          label: "Step 1",
          title: "Discovery & Research",
          description: "Understanding user needs and market context",
          color: "var(--color-primary)",
        },
        {
          label: "Step 2",
          title: "Design & Prototype",
          description: "Rapid iteration on solutions",
          color: "#85d7ff",
        },
        {
          label: "Step 3",
          title: "Build & Launch",
          description: "Quality engineering and deployment",
          color: "#10b981",
        },
      ]}
      variant="cream"
    />
  );
}
