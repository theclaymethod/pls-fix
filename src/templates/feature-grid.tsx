import {
  SlideContainer,
  GridSection,
  FeatureCard,
  Eyebrow,
  SectionHeader,
} from "@/design-system";

interface Feature {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface FeatureGridTemplateProps {
  eyebrow?: string;
  title: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: "light" | "dark" | "cream";
}

export function FeatureGridTemplate({
  eyebrow,
  title,
  features,
  columns = 3,
  variant = "light",
}: FeatureGridTemplateProps) {
  return (
    <SlideContainer variant={variant}>
      <div className="h-full flex flex-col">
        <div className="mb-10">
          {eyebrow && (
            <Eyebrow
              className="text-[14px]"
              style={{ color: "var(--color-primary)" }}
            >
              {eyebrow}
            </Eyebrow>
          )}
          <SectionHeader
            className="mt-2"
            style={{ fontSize: "clamp(2rem, 4vw, 2.5rem)" }}
          >
            {title}
          </SectionHeader>
        </div>

        <div className="flex-1 flex items-center">
          <GridSection columns={columns} className="w-full">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </GridSection>
        </div>
      </div>
    </SlideContainer>
  );
}
