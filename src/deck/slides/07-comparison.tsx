import { ComparisonTableTemplate } from "@/templates";

export function Slide07Comparison() {
  return (
    <ComparisonTableTemplate
      eyebrow="Comparison"
      title="Feature Matrix"
      beforeLabel="Standard"
      afterLabel="Premium"
      rows={[
        { feature: "Core Analytics", before: true, after: true },
        { feature: "Real-time Updates", before: false, after: true },
        { feature: "Custom Dashboards", before: false, after: true },
        { feature: "API Access", before: true, after: true },
        { feature: "Priority Support", before: false, after: true },
        { feature: "White-label Option", before: false, after: true },
      ]}
      variant="light"
    />
  );
}
