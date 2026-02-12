import {
  SlideContainer,
  Eyebrow,
  SectionHeader,
  Divider,
  GridSection,
  StatCard,
  AnimatedEntry,
  StaggerContainer,
} from "@/design-system";

export function Slide05Stats() {
  return (
    <SlideContainer mode="white" className="flex flex-col">
      <StaggerContainer stagger={0.12} delay={0} className="mb-12">
        <AnimatedEntry variant="slideUp" className="mb-4">
          <Eyebrow>Results</Eyebrow>
        </AnimatedEntry>
        <AnimatedEntry variant="slideUp" className="mb-8">
          <SectionHeader>Impact at Scale</SectionHeader>
        </AnimatedEntry>
        <AnimatedEntry variant="slideUp">
          <Divider />
        </AnimatedEntry>
      </StaggerContainer>

      <StaggerContainer stagger={0.15} delay={0.3} className="flex-1 flex items-center">
        <GridSection columns={3} gap="lg" className="w-full">
          <AnimatedEntry variant="slideUp">
            <StatCard value="10K+" label="Active Users" sublabel="and growing" />
          </AnimatedEntry>
          <AnimatedEntry variant="slideUp">
            <div
              className="border-l border-r"
              style={{ borderColor: "var(--color-border)" }}
            >
              <StatCard value="98%" label="Satisfaction" sublabel="CSAT score" />
            </div>
          </AnimatedEntry>
          <AnimatedEntry variant="slideUp">
            <StatCard value="2.5x" label="ROI" sublabel="average return" />
          </AnimatedEntry>
        </GridSection>
      </StaggerContainer>
    </SlideContainer>
  );
}
