// Section 11 — Hover & Caption: HoverCaption bottom/top positions on colored blocks

import { SlideContainer, GridSection } from "../layout";
import { SectionHeader, Eyebrow, BodyText } from "../typography";
import { HoverCaption } from "../interactions";
import { BriefSection } from "./helpers";

export function ShowcaseHover() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={11} title="Hover & Caption">
        <BodyText className="mb-6 max-w-[1000px]">
          Micro-interactions add delight without clutter. Hover captions slide in from the
          edge of a container on mouse enter — ideal for image galleries, portfolio grids,
          and any layout where descriptive text should appear on demand rather than
          permanently.
        </BodyText>
        <BodyText size="sm" className="mb-10 max-w-[1000px]">
          The dark overlay (rgba(0,0,0,0.85)) ensures caption text remains legible regardless
          of the content beneath. Position can be top or bottom.
        </BodyText>

        <Eyebrow className="mb-6">Hover Caption</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Hover over the blocks below to reveal captions.
        </BodyText>
        <GridSection columns={3} className="mb-16">
          <HoverCaption
            caption={
              <span
                className="text-[18px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Caption from bottom — default position
              </span>
            }
          >
            <div
              className="h-48 flex items-center justify-center"
              style={{ backgroundColor: "var(--color-bg-secondary)" }}
            >
              <SectionHeader className="text-[36px]">Block A</SectionHeader>
            </div>
          </HoverCaption>
          <HoverCaption
            position="top"
            caption={
              <span
                className="text-[18px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Caption from top
              </span>
            }
          >
            <div
              className="h-48 flex items-center justify-center"
              style={{ backgroundColor: "var(--color-yellow)" }}
            >
              <SectionHeader className="text-[36px]">Block B</SectionHeader>
            </div>
          </HoverCaption>
          <HoverCaption
            caption={
              <span
                className="text-[18px]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Works on any content
              </span>
            }
          >
            <div
              className="h-48 flex items-center justify-center"
              style={{ backgroundColor: "var(--color-bg-dark)", color: "var(--color-white)" }}
            >
              <SectionHeader className="text-[36px]">Block C</SectionHeader>
            </div>
          </HoverCaption>
        </GridSection>

      </BriefSection>
    </SlideContainer>
  );
}
