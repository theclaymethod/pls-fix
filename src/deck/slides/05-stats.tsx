import { StatCardsTemplate } from "@/templates";

export function Slide05Stats() {
  return (
    <StatCardsTemplate
      eyebrow="Results"
      title="Impact at Scale"
      stats={[
        { value: "10K+", label: "Active Users", sublabel: "and growing" },
        { value: "98%", label: "Satisfaction", sublabel: "CSAT score" },
        { value: "2.5x", label: "ROI", sublabel: "average return" },
      ]}
      accentIndex={1}
      variant="light"
    />
  );
}
