// Section 13 — Tabs & Carousels: Tabs component with content switching, QuoteCarousel with auto-rotation

import { SlideContainer, Divider } from "../layout";
import { SectionHeader, Eyebrow, BodyText, ListItem } from "../typography";
import { StatCard } from "../cards";
import { Tabs, QuoteCarousel } from "../interactions";
import { BriefSection } from "./helpers";

export function ShowcaseTabs() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={13} title="Tabs & Carousels">
        <BodyText className="mb-6 max-w-[1000px]">
          Content switchers for multi-panel layouts. Tabs use a persistent underline indicator
          with AnimatePresence transitions. QuoteCarousel auto-rotates with a dot pagination
          track.
        </BodyText>

        <Eyebrow className="mb-6">Tabs</Eyebrow>
        <Tabs
          items={[
            {
              label: "Overview",
              content: (
                <div className="space-y-4">
                  <SectionHeader className="text-[36px]">Product Overview</SectionHeader>
                  <BodyText>
                    The core platform serves as the foundation for all downstream features.
                    Built on a modular architecture that scales horizontally.
                  </BodyText>
                </div>
              ),
            },
            {
              label: "Metrics",
              content: (
                <div className="flex gap-8">
                  <StatCard value="99.9%" label="SLA" className="border-2" />
                  <StatCard value="<10ms" label="P99 Latency" className="border-2" />
                  <StatCard value="50M+" label="Daily Events" className="border-2" />
                </div>
              ),
            },
            {
              label: "Roadmap",
              content: (
                <div className="space-y-3">
                  <ListItem number={1}>Q1 — Core infrastructure rebuild</ListItem>
                  <ListItem number={2}>Q2 — API v2 launch</ListItem>
                  <ListItem number={3}>Q3 — Enterprise tier</ListItem>
                  <ListItem number={4}>Q4 — International expansion</ListItem>
                </div>
              ),
            },
          ]}
          className="mb-16"
        />

        <Divider thickness="thin" className="my-12" />

        <Eyebrow className="mb-6">Quote Carousel</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Auto-rotating quotes with dot navigation. 5s interval by default.
        </BodyText>
        <QuoteCarousel
          quotes={[
            { text: "This changed how we think about performance.", attribution: "VP Engineering, Acme Corp" },
            { text: "The precision of the system is remarkable.", attribution: "CTO, TechStart" },
            { text: "We shipped 3x faster after adopting the platform.", attribution: "Lead Developer, ScaleUp" },
          ]}
        />
      </BriefSection>
    </SlideContainer>
  );
}
