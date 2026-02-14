// Section 05 — Component Library: FeatureCard, StatCard, QuoteCard, ProcessCard

import { SlideContainer, GridSection } from "../layout";
import { Eyebrow, BodyText } from "../typography";
import { FeatureCard, StatCard, QuoteCard, ProcessCard } from "../cards";
import { IndustrialIcon } from "../decorative";
import { BriefSection } from "./helpers";

export function ShowcaseComponents() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={5} title="Component Library">
        <BodyText className="mb-10 max-w-[1000px]">
          Components are the building blocks for slides. Each is designed to work
          independently or in combination. They inherit the active color mode
          through CSS variables — the same StatCard renders correctly on white,
          dark, or yellow backgrounds without any code changes.
        </BodyText>

        <Eyebrow className="mb-6">Feature Cards</Eyebrow>
        <BodyText size="sm" className="mb-4">
          For highlighting capabilities, benefits, or key points. Icon optional.
        </BodyText>
        <GridSection columns={3} className="mb-16">
          <FeatureCard
            icon={<IndustrialIcon symbol="star" size="lg" />}
            title="Feature Title"
            description="A concise description of the feature or capability being highlighted."
            className="border-2"
          />
          <FeatureCard
            icon={<IndustrialIcon symbol="cross" size="lg" />}
            title="Second Feature"
            description="Cards work best in groups of 2–4, placed inside a GridSection."
            className="border-2"
          />
          <FeatureCard
            title="Without Icon"
            description="Icons are optional. The card adapts to text-only content."
            className="border-2"
          />
        </GridSection>

        <Eyebrow className="mb-6">Stat Cards</Eyebrow>
        <BodyText size="sm" className="mb-4">
          For key metrics. The value is set in Bebas Neue at 96px for maximum impact.
        </BodyText>
        <GridSection columns={4} className="mb-16">
          <StatCard value="99.9%" label="Uptime" sublabel="Last 12 months" className="border-2" />
          <StatCard value="2.4M" label="Active Users" className="border-2" />
          <StatCard value="<50ms" label="P95 Latency" sublabel="Global average" className="border-2" />
          <StatCard value="150+" label="Countries" className="border-2" />
        </GridSection>

        <Eyebrow className="mb-6">Quote Cards</Eyebrow>
        <BodyText size="sm" className="mb-4">
          For testimonials and attributed quotes. The initial-letter avatar reinforces
          the personal attribution.
        </BodyText>
        <GridSection columns={2} className="mb-16">
          <QuoteCard
            quote="The system scales with our ambitions."
            attribution="Sarah Chen"
            role="VP Design, Acme Corp"
            className="border-2"
          />
          <QuoteCard
            quote="Clean, opinionated, and ready to ship."
            attribution="Marcus Johnson"
            role="CTO, StartupCo"
            className="border-2"
          />
        </GridSection>

        <Eyebrow className="mb-6">Process Cards</Eyebrow>
        <BodyText size="sm" className="mb-4">
          For sequential workflows. The numbered index uses monospace for alignment.
        </BodyText>
        <GridSection columns={4} className="mb-12">
          <ProcessCard number={1} title="Discover" description="Research and define." className="border-2" />
          <ProcessCard number={2} title="Design" description="Wireframe and iterate." className="border-2" />
          <ProcessCard number={3} title="Build" description="Implement with precision." className="border-2" />
          <ProcessCard number={4} title="Ship" description="Deploy and monitor." className="border-2" />
        </GridSection>
      </BriefSection>
    </SlideContainer>
  );
}
