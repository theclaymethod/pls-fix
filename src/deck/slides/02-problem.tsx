import {
  SlideContainer,
  TwoColumnLayout,
  Eyebrow,
  SectionHeader,
  ListItem,
  Divider,
  IndustrialIcon,
  AnimatedEntry,
  StaggerContainer,
} from "@/design-system";

export function Slide02Problem() {
  return (
    <SlideContainer mode="white">
      <TwoColumnLayout
        ratio="1:1"
        gap="xl"
        left={
          <StaggerContainer stagger={0.1} delay={0}>
            <AnimatedEntry variant="slideUp" className="mb-4">
              <Eyebrow>The Challenge</Eyebrow>
            </AnimatedEntry>
            <AnimatedEntry variant="slideUp" className="mb-8">
              <SectionHeader>Current State</SectionHeader>
            </AnimatedEntry>
            <AnimatedEntry variant="slideUp" className="mb-6">
              <Divider />
            </AnimatedEntry>
            <div className="space-y-5">
              <AnimatedEntry variant="slideUp">
                <ListItem number={1}>
                  Manual processes consuming valuable time
                </ListItem>
              </AnimatedEntry>
              <AnimatedEntry variant="slideUp">
                <ListItem number={2}>
                  Inconsistent data across teams
                </ListItem>
              </AnimatedEntry>
              <AnimatedEntry variant="slideUp">
                <ListItem number={3}>
                  Limited visibility into key metrics
                </ListItem>
              </AnimatedEntry>
              <AnimatedEntry variant="slideUp">
                <ListItem number={4}>
                  Slow decision-making cycles
                </ListItem>
              </AnimatedEntry>
            </div>
          </StaggerContainer>
        }
        right={
          <StaggerContainer stagger={0.1} delay={0.4}>
            <AnimatedEntry variant="slideUp" className="mb-4">
              <div className="flex items-center gap-3">
                <Eyebrow>The Solution</Eyebrow>
                <IndustrialIcon symbol="arrow" size="md" />
              </div>
            </AnimatedEntry>
            <AnimatedEntry variant="slideUp" className="mb-8">
              <SectionHeader style={{ color: "var(--color-accent, var(--color-text-primary))" }}>
                Future State
              </SectionHeader>
            </AnimatedEntry>
            <AnimatedEntry variant="slideUp" className="mb-6">
              <Divider />
            </AnimatedEntry>
            <div className="space-y-5">
              <AnimatedEntry variant="slideUp">
                <ListItem number={1}>
                  Automated workflows saving 40+ hours/week
                </ListItem>
              </AnimatedEntry>
              <AnimatedEntry variant="slideUp">
                <ListItem number={2}>
                  Single source of truth for all data
                </ListItem>
              </AnimatedEntry>
              <AnimatedEntry variant="slideUp">
                <ListItem number={3}>
                  Real-time dashboards and insights
                </ListItem>
              </AnimatedEntry>
              <AnimatedEntry variant="slideUp">
                <ListItem number={4}>
                  Data-driven decisions in minutes
                </ListItem>
              </AnimatedEntry>
            </div>
          </StaggerContainer>
        }
      />
    </SlideContainer>
  );
}
