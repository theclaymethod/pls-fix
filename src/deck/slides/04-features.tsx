import { FeatureGridTemplate } from "@/templates";

const CheckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 17V9M13 17V5M8 17v-3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Slide04Features() {
  return (
    <FeatureGridTemplate
      eyebrow="Capabilities"
      title="Key Features"
      features={[
        {
          icon: <CheckIcon />,
          title: "Easy Integration",
          description: "Connect with your existing tools in minutes, not hours",
        },
        {
          icon: <ChartIcon />,
          title: "Real-time Analytics",
          description: "Track performance with live dashboards and custom reports",
        },
        {
          icon: <ShieldIcon />,
          title: "Enterprise Security",
          description: "Bank-level encryption and compliance certifications",
        },
      ]}
      columns={3}
      variant="cream"
    />
  );
}
