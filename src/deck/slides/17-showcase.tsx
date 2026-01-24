import { ThreeUpTemplate } from "@/templates";

export function Slide17Showcase() {
  return (
    <ThreeUpTemplate
      eyebrow="Case Studies"
      title="Recent Projects"
      items={[
        {
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=533&fit=crop",
          title: "Enterprise Platform",
          subtitle: "SaaS Dashboard",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=533&fit=crop",
          title: "Consumer Mobile",
          subtitle: "iOS & Android",
        },
        {
          imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=533&fit=crop",
          title: "Marketing Site",
          subtitle: "Brand Launch",
        },
      ]}
      variant="light"
      aspectRatio="portrait"
    />
  );
}
