// Section 09 — Interactive Primitives: HoverCard lift presets, AnimatedEntry + StaggerContainer

import { motion } from "motion/react";
import { SlideContainer, GridSection } from "../layout";
import { Eyebrow, BodyText } from "../typography";
import { FeatureCard, StatCard } from "../cards";
import { IndustrialIcon } from "../decorative";
import { HoverCard, AnimatedEntry, StaggerContainer } from "../interactions";
import { slideUpVariants } from "../animations";
import { BriefSection, ReplayWrapper } from "./helpers";

export function ShowcaseInteractive() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={9} title="Interactive Primitives">
        <BodyText className="mb-6 max-w-[1000px]">
          Interactive behavior is composed via wrappers — static components stay untouched.
          Wrap any card or block in a HoverCard to add lift and shadow on hover, or in an
          AnimatedEntry to fade in on mount. Interactive states follow "relaxed rules" — shadows
          and soft radii are permitted to signal interactivity.
        </BodyText>
        <BodyText size="sm" className="mb-10 max-w-[1000px]">
          These wrappers compose around existing primitives. A FeatureCard inside a HoverCard
          gains hover behavior without any changes to the card itself.
        </BodyText>

        <Eyebrow className="mb-6">Hover Card — Lift Amounts</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Three lift presets: sm (-4px), md (-8px), lg (-12px). Shadow enabled by default.
        </BodyText>
        <GridSection columns={3} className="mb-16">
          <HoverCard lift="sm">
            <FeatureCard
              icon={<IndustrialIcon symbol="star" size="lg" />}
              title="Small Lift"
              description="Subtle elevation for dense layouts. Lift: -4px."
              className="border-2"
            />
          </HoverCard>
          <HoverCard lift="md">
            <FeatureCard
              icon={<IndustrialIcon symbol="cross" size="lg" />}
              title="Medium Lift"
              description="Default. Good for card grids. Lift: -8px."
              className="border-2"
            />
          </HoverCard>
          <HoverCard lift="lg">
            <FeatureCard
              icon={<IndustrialIcon symbol="arrow" size="lg" />}
              title="Large Lift"
              description="Dramatic hover for hero cards. Lift: -12px."
              className="border-2"
            />
          </HoverCard>
        </GridSection>

        <Eyebrow className="mb-6">Animated Entry + Stagger</Eyebrow>
        <BodyText size="sm" className="mb-4">
          AnimatedEntry fades/slides children on mount. StaggerContainer sequences children
          so they animate in one after another.
        </BodyText>
        <ReplayWrapper>
          <StaggerContainer stagger={0.15} delay={0} className="grid grid-cols-4 gap-6">
            <motion.div variants={slideUpVariants}>
              <StatCard value="99%" label="Uptime" className="border-2" />
            </motion.div>
            <motion.div variants={slideUpVariants}>
              <StatCard value="2.4M" label="Users" className="border-2" />
            </motion.div>
            <motion.div variants={slideUpVariants}>
              <StatCard value="<50ms" label="Latency" className="border-2" />
            </motion.div>
            <motion.div variants={slideUpVariants}>
              <StatCard value="150+" label="Countries" className="border-2" />
            </motion.div>
          </StaggerContainer>
        </ReplayWrapper>
      </BriefSection>
    </SlideContainer>
  );
}
