import { SplitContentTemplate } from "@/templates";

export function Slide03Intro() {
  return (
    <SplitContentTemplate
      eyebrow="Introduction"
      title="What We Do"
      content="We help companies transform their digital presence through innovative solutions. Our team combines deep technical expertise with user-centered design to deliver exceptional results."
      bulletPoints={[
        "Full-stack development",
        "Product design",
        "Data analytics",
      ]}
      imageUrl="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop"
      imageSide="right"
    />
  );
}
