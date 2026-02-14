// Section 14 — Effects & Utilities: ShineBorder, PulseRing, Tooltip, SkeletonBlock

import { SlideContainer, GridSection } from "../layout";
import { Eyebrow, BodyText, Label } from "../typography";
import { FeatureCard } from "../cards";
import { IndustrialIcon } from "../decorative";
import { ShineBorder, PulseRing, Tooltip, SkeletonBlock } from "../interactions";
import { BriefSection } from "./helpers";

export function ShowcaseEffects() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={14} title="Effects & Utilities">
        <BodyText className="mb-6 max-w-[1000px]">
          Decorative effects and utility components for polish. ShineBorder adds a
          mouse-tracking glow. PulseRing draws attention to live indicators. Tooltips
          surface context on hover. Skeleton blocks hold layout during loading.
        </BodyText>

        <Eyebrow className="mb-6">Shine Border</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Mouse-tracking radial glow border. Move your cursor over the cards.
        </BodyText>
        <GridSection columns={2} className="mb-16">
          <ShineBorder>
            <FeatureCard
              icon={<IndustrialIcon symbol="star" size="lg" />}
              title="Shine Effect"
              description="Radial gradient follows cursor along the border edge."
              className="border-2"
            />
          </ShineBorder>
          <ShineBorder color="var(--color-text-primary)">
            <FeatureCard
              icon={<IndustrialIcon symbol="cross" size="lg" />}
              title="Custom Color"
              description="Pass any CSS color to customize the glow."
              className="border-2"
            />
          </ShineBorder>
        </GridSection>

        <Eyebrow className="mb-6">Pulse Ring</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Animated expanding ring for live status indicators.
        </BodyText>
        <div className="flex items-center gap-12 mb-16">
          <div className="flex items-center gap-4">
            <PulseRing size={24} />
            <Label>Default</Label>
          </div>
          <div className="flex items-center gap-4">
            <PulseRing size={32} color="var(--color-yellow)" />
            <Label>Yellow accent</Label>
          </div>
          <div className="flex items-center gap-4">
            <PulseRing size={40} />
            <Label>Large</Label>
          </div>
        </div>

        <Eyebrow className="mb-6">Tooltip</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Hover-triggered context labels. Top or bottom positioning.
        </BodyText>
        <div className="flex items-center gap-12 mb-16">
          <Tooltip content="Default — top position">
            <div
              className="px-6 py-3 cursor-pointer"
              style={{
                border: "2px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "16px",
                color: "var(--color-text-primary)",
              }}
            >
              Hover me (top)
            </div>
          </Tooltip>
          <Tooltip content="Bottom position" position="bottom">
            <div
              className="px-6 py-3 cursor-pointer"
              style={{
                border: "2px solid var(--color-border)",
                fontFamily: "var(--font-mono)",
                fontSize: "16px",
                color: "var(--color-text-primary)",
              }}
            >
              Hover me (bottom)
            </div>
          </Tooltip>
        </div>

        <Eyebrow className="mb-6">Skeleton Block</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Pulsing placeholder for loading states.
        </BodyText>
        <div className="flex flex-col gap-3 max-w-[600px]">
          <SkeletonBlock height={40} width="60%" />
          <SkeletonBlock height={20} />
          <SkeletonBlock height={20} width="80%" />
          <div className="flex gap-3 mt-2">
            <SkeletonBlock height={100} />
            <SkeletonBlock height={100} />
            <SkeletonBlock height={100} />
          </div>
        </div>
      </BriefSection>
    </SlideContainer>
  );
}
