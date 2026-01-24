import { BeforeAfterTemplate } from "@/templates";

export function Slide03Problem() {
  return (
    <BeforeAfterTemplate
      beforeEyebrow="THE CHALLENGE"
      beforeTitle="Current State"
      beforeItems={[
        "Manual processes consuming valuable time",
        "Inconsistent data across teams",
        "Limited visibility into key metrics",
        "Slow decision-making cycles",
      ]}
      afterEyebrow="THE SOLUTION"
      afterTitle="Future State"
      afterItems={[
        "Automated workflows saving 40+ hours/week",
        "Single source of truth for all data",
        "Real-time dashboards and insights",
        "Data-driven decisions in minutes",
      ]}
    />
  );
}
