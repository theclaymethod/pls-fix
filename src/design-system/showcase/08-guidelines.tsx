// Section 08 — Usage Guidelines: do/don't rules in two-column layout

import { SlideContainer, TwoColumnLayout } from "../layout";
import { Eyebrow, ListItem } from "../typography";
import { BriefSection } from "./helpers";

export function ShowcaseGuidelines() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={8} title="Usage Guidelines">
        <TwoColumnLayout
          ratio="1:1"
          left={
            <div className="space-y-8">
              <div>
                <Eyebrow className="mb-4">Do</Eyebrow>
                <div className="space-y-3">
                  <ListItem number={1}>Use CSS variables for all colors — never hardcode hex values</ListItem>
                  <ListItem number={2}>Let negative space do the work — resist the urge to fill</ListItem>
                  <ListItem number={3}>Stick to the type scale — 140, 72, 52, 28, 24, 20, 18, 16, 14px</ListItem>
                  <ListItem number={4}>Use Tailwind for spacing and layout, style props for color</ListItem>
                  <ListItem number={5}>Compose slides from primitives — never build from scratch</ListItem>
                </div>
              </div>
            </div>
          }
          right={
            <div className="space-y-8">
              <div>
                <Eyebrow className="mb-4">Avoid</Eyebrow>
                <div className="space-y-3">
                  <ListItem number={1}>Rounded corners — the system uses sharp geometry exclusively</ListItem>
                  <ListItem number={2}>Gradients, shadows, or blur effects</ListItem>
                  <ListItem number={3}>More than one accent color per slide</ListItem>
                  <ListItem number={4}>Decorative elements that don't serve information hierarchy</ListItem>
                  <ListItem number={5}>Tailwind color classes — always use CSS variable style props</ListItem>
                </div>
              </div>
            </div>
          }
        />
      </BriefSection>
    </SlideContainer>
  );
}
