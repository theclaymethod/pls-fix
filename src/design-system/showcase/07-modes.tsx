// Section 07 — Color Modes: dark mode demo + yellow mode demo with same components in different palettes

import { SlideContainer, GridSection, Divider } from "../layout";
import { Eyebrow, BodyText, Quote, Label, PipeList } from "../typography";
import { FeatureCard, StatCard, ProcessCard, QuoteCard } from "../cards";
import { IndustrialIcon } from "../decorative";
import { BriefSection } from "./helpers";

export function ShowcaseModes() {
  return (
    <>
      <SlideContainer mode="dark" className="h-auto min-h-[1080px]">
        <BriefSection number={7} title="Color Modes">
          <BodyText className="mb-8 max-w-[1000px]">
            Three modes — white, dark, and yellow — control the entire palette through
            CSS custom properties. Components never reference literal colors. Every
            element reads from the active mode's variables, so switching context is a
            single attribute change on the slide container.
          </BodyText>

          <Eyebrow className="mb-4">Dark Mode (active)</Eyebrow>
          <BodyText size="sm" className="mb-6">
            The inverted palette. White text on black. Borders flip to white. Used for
            emphasis slides, section breaks, and dramatic contrast.
          </BodyText>

          <GridSection columns={3} className="mb-16">
            <StatCard value="42" label="Metric" className="border" />
            <FeatureCard
              icon={<IndustrialIcon symbol="star" size="lg" />}
              title="Feature"
              description="Cards inherit the dark theme automatically."
              className="border"
            />
            <ProcessCard number={1} title="Step" description="All components adapt." className="border" />
          </GridSection>

          <Quote attribution="Design Principle">
            Color is structural, not decorative. Modes define context.
          </Quote>
        </BriefSection>
      </SlideContainer>

      <SlideContainer mode="yellow" className="h-auto min-h-[1080px]">
        <BriefSection number={7} title="Yellow Mode">
          <BodyText className="mb-8 max-w-[1000px]">
            The accent mode. Signal yellow (#FCD94B) floods the background. Text stays
            black for maximum legibility. Use for title slides, callouts, or any moment
            that needs to break the rhythm of black-and-white.
          </BodyText>

          <GridSection columns={2} className="mb-12">
            <QuoteCard
              quote="Yellow demands attention."
              attribution="Creative Director"
              role="Brand Team"
              className="border-2"
            />
            <div className="flex flex-col justify-center space-y-4 p-6">
              <Label>Default Label</Label>
              <Label variant="dark">Dark Label</Label>
              <Divider />
              <PipeList items={["Bold", "Bright", "Intentional"]} />
            </div>
          </GridSection>
        </BriefSection>
      </SlideContainer>
    </>
  );
}
