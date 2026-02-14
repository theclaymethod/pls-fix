// Section 02 — Color Palette: primary colors, text hierarchy, backgrounds (ColorSwatch)

import { SlideContainer, GridSection } from "../layout";
import { Eyebrow, BodyText } from "../typography";
import { BriefSection, ColorSwatch } from "./helpers";

export function ShowcaseColor() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={2} title="Color Palette">
        <BodyText className="mb-10 max-w-[1000px]">
          The palette is intentionally minimal. Black and white do the heavy lifting.
          Yellow is reserved for moments of emphasis — a highlighted label, an active state,
          an accent slide. Secondary grays provide hierarchy without introducing new hues.
          This constraint forces clarity: if a slide needs color to make sense, the layout
          needs rethinking.
        </BodyText>

        <Eyebrow className="mb-6">Primary</Eyebrow>
        <GridSection columns={3} gap="lg" className="mb-12">
          <ColorSwatch name="Black" value="#0A0A0A" cssVar="--color-black" textDark={false} />
          <ColorSwatch name="White" value="#FFFFFF" cssVar="--color-white" />
          <ColorSwatch name="Signal Yellow" value="#FCD94B" cssVar="--color-yellow" />
        </GridSection>

        <Eyebrow className="mb-6">Text Hierarchy</Eyebrow>
        <GridSection columns={4} gap="lg" className="mb-12">
          <ColorSwatch name="Primary" value="#0A0A0A" cssVar="--color-text-primary" textDark={false} />
          <ColorSwatch name="Secondary" value="#333333" cssVar="--color-text-secondary" textDark={false} />
          <ColorSwatch name="Muted" value="#888888" cssVar="--color-text-muted" textDark={false} />
          <ColorSwatch name="Inverse" value="#FFFFFF" cssVar="--color-text-inverse" />
        </GridSection>

        <Eyebrow className="mb-6">Backgrounds</Eyebrow>
        <GridSection columns={3} gap="lg">
          <ColorSwatch name="Primary BG" value="#FFFFFF" cssVar="--color-bg-primary" />
          <ColorSwatch name="Secondary BG" value="#F5F5F5" cssVar="--color-bg-secondary" />
          <ColorSwatch name="Dark BG" value="#0A0A0A" cssVar="--color-bg-dark" textDark={false} />
        </GridSection>
      </BriefSection>
    </SlideContainer>
  );
}
