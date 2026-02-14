// Cover slide — dark background with logo, title, brief intro, and pipe-list navigation

import { SlideContainer, HeaderBar } from "../layout";
import { HeroTitle, Eyebrow, BodyText, TechCode, PipeList } from "../typography";
import { LogoMark } from "../decorative";

export function ShowcaseCover() {
  return (
    <SlideContainer mode="dark" className="h-[1080px]">
      <div className="flex flex-col justify-between h-full">
        <HeaderBar
          left={<LogoMark text="VibeDeck" />}
          right={<TechCode size="sm">DESIGN BRIEF V1.0</TechCode>}
        />
        <div className="flex-1 flex flex-col justify-center">
          <Eyebrow className="mb-6">Brand &amp; Design System</Eyebrow>
          <HeroTitle>Design Brief</HeroTitle>
          <BodyText size="lg" className="mt-8 max-w-[900px]">
            A comprehensive guide to our visual language, typographic system,
            color palette, and component library. This document defines how we
            communicate visually and ensures consistency across every slide.
          </BodyText>
        </div>
        <div className="flex items-center justify-between">
          <PipeList items={["Typography", "Color", "Components", "Decorative", "Modes"]} />
          <TechCode size="sm">CONFIDENTIAL</TechCode>
        </div>
      </div>
    </SlideContainer>
  );
}
