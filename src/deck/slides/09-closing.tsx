import {
  SlideContainer,
  CenterContent,
  Eyebrow,
  BodyText,
  AnimatedEntry,
} from "@/design-system";

export function Slide09Closing() {
  return (
    <SlideContainer mode="yellow">
      <CenterContent>
        <AnimatedEntry variant="slideUp" delay={0}>
          <Eyebrow className="mb-8">Growth</Eyebrow>
        </AnimatedEntry>

        <AnimatedEntry variant="slideUp" delay={0.15}>
          <div
            className="leading-none"
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(12rem, 30vw, 20rem)",
              color: "var(--color-text-primary)",
            }}
          >
            <span style={{ color: "var(--color-text-muted)" }}>[</span>
            200%
            <span style={{ color: "var(--color-text-muted)" }}>]</span>
          </div>
        </AnimatedEntry>

        <AnimatedEntry variant="slideUp" delay={0.3}>
          <span
            className="text-[24px] uppercase tracking-[0.2em] mt-8 block"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-primary)",
            }}
          >
            Year over Year
          </span>
        </AnimatedEntry>

        <AnimatedEntry variant="slideUp" delay={0.45}>
          <BodyText size="sm" className="mt-6 max-w-lg text-center">
            Our platform has delivered consistent growth for partners across all
            key metrics
          </BodyText>
        </AnimatedEntry>
      </CenterContent>
    </SlideContainer>
  );
}
