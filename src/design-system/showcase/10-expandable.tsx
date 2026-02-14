// Section 10 — Expandable Patterns: AccordionItem, ExpandableCard

import { SlideContainer, Divider } from "../layout";
import { Eyebrow, BodyText } from "../typography";
import { FeatureCard } from "../cards";
import { IndustrialIcon } from "../decorative";
import { AccordionItem, ExpandableCard } from "../interactions";
import { BriefSection } from "./helpers";

export function ShowcaseExpandable() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={10} title="Expandable Patterns">
        <BodyText className="mb-6 max-w-[1000px]">
          Progressive disclosure keeps interfaces clean. Accordion items collapse and expand
          on click — ideal for FAQ sections, settings panels, and long-form content that
          should not all be visible at once. Expandable cards zoom inline to reveal detail
          without navigating away.
        </BodyText>
        <BodyText size="sm" className="mb-10 max-w-[1000px]">
          Use accordions when content is mutually exclusive or secondary. Use expandable cards
          when the preview itself is the primary content and the detail is supplementary.
        </BodyText>

        <Eyebrow className="mb-6">Accordion</Eyebrow>
        <div className="max-w-[900px] mb-16">
          <AccordionItem
            trigger={
              <span
                className="text-[24px] uppercase"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
              >
                What design principles guide this system?
              </span>
            }
          >
            <BodyText size="sm">
              Precision over decoration. The system uses high-contrast black and white,
              sharp geometry, and generous negative space. Every element earns its place —
              no gradients, no blur, no rounded corners on static components. Interactive
              states get relaxed rules: shadows and soft radii signal that an element responds
              to user input.
            </BodyText>
          </AccordionItem>
          <AccordionItem
            trigger={
              <span
                className="text-[24px] uppercase"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
              >
                How do color modes work?
              </span>
            }
          >
            <BodyText size="sm">
              Three modes — white, dark, and yellow — controlled by CSS custom properties.
              Components never reference literal colors. A single data attribute on the
              SlideContainer switches the entire palette. Interactive wrappers inherit
              the active mode automatically.
            </BodyText>
          </AccordionItem>
          <AccordionItem
            trigger={
              <span
                className="text-[24px] uppercase"
                style={{ fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}
              >
                Can I nest interactive wrappers?
              </span>
            }
          >
            <BodyText size="sm">
              Yes. A HoverCard can wrap an ExpandableCard. A StaggerContainer can contain
              AnimatedEntry children. Wrappers are composable by design — they add behavior
              without modifying the wrapped component.
            </BodyText>
          </AccordionItem>
        </div>

        <Eyebrow className="mb-6">Expandable Card</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Click the card to expand. Click again or click outside to collapse.
        </BodyText>
        <div className="max-w-[600px] mb-12">
          <ExpandableCard
            className="border-2"
            preview={
              <FeatureCard
                icon={<IndustrialIcon symbol="plus" size="lg" />}
                title="Expandable Feature"
                description="Click to reveal additional detail below."
              />
            }
            detail={
              <div className="px-6 pb-6">
                <Divider thickness="thin" className="mb-4" />
                <BodyText size="sm">
                  The expanded state reveals supplementary content inline. Layout animations
                  keep the transition smooth. The card gains an elevated shadow to reinforce
                  the active state. This pattern works well for feature lists where each
                  item has a short preview and a longer explanation.
                </BodyText>
              </div>
            }
          />
        </div>
      </BriefSection>
    </SlideContainer>
  );
}
