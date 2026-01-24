import { LogoCloudTemplate } from "@/templates";

export function Slide15Partners() {
  return (
    <LogoCloudTemplate
      eyebrow="Technology Stack"
      title="Built With"
      logos={[
        { name: "React", label: "Frontend" },
        { name: "TypeScript", label: "Language" },
        { name: "Tailwind", label: "Styling" },
        { name: "Cloudflare", label: "Infrastructure" },
        { name: "PostgreSQL", label: "Database" },
        { name: "Redis", label: "Caching" },
      ]}
      columns={3}
      variant="light"
      centered
    />
  );
}
