// Section 01 — Brand Overview: design principles, crosshair marks, category grid

import { SlideContainer, TwoColumnLayout } from "../layout";
import { BodyText } from "../typography";
import { CrosshairMark, CategoryGrid } from "../decorative";
import { BriefSection } from "./helpers";

export function ShowcaseBrand() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={1} title="Brand Overview">
        <TwoColumnLayout
          ratio="3:2"
          left={
            <div className="space-y-6">
              <BodyText size="lg">
                The visual identity is rooted in industrial design and Swiss typography.
                We use high-contrast black and white as the primary palette, with signal yellow
                as a single accent color. Every element earns its place on the slide — no
                decoration without purpose.
              </BodyText>
              <BodyText>
                The system favors stark geometry over soft gradients, monospaced labeling over
                decorative flourishes, and generous negative space over visual density. Slides
                should feel like architectural blueprints: precise, intentional, and confident.
              </BodyText>
              <BodyText>
                Type hierarchy is enforced through scale contrast rather than weight variation.
                Headlines are set in Bebas Neue at dramatic sizes. Body copy in Inter provides
                neutral readability. JetBrains Mono handles technical labels and data.
              </BodyText>
            </div>
          }
          right={
            <div className="flex flex-col items-center justify-center gap-8">
              <CrosshairMark size="lg" />
              <CategoryGrid
                items={[
                  { title: "Precision", icon: "cross" },
                  { title: "Contrast", icon: "star" },
                  { title: "Restraint", icon: "dots" },
                  { title: "Clarity", icon: "arrow" },
                ]}
              />
            </div>
          }
        />
      </BriefSection>
    </SlideContainer>
  );
}
