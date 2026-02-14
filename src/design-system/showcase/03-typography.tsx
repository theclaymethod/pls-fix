// Section 03 — Typography: HeroTitle, SectionHeader, Eyebrow, BodyText, MonoText, TechCode, Quote specimens

import { SlideContainer } from "../layout";
import {
  HeroTitle,
  SectionHeader,
  Eyebrow,
  BodyText,
  MonoText,
  TechCode,
  Quote,
} from "../typography";
import { BriefSection, TypeSpecimen } from "./helpers";

export function ShowcaseTypography() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={3} title="Typography">
        <BodyText className="mb-10 max-w-[1000px]">
          Three typefaces, each with a distinct role. Bebas Neue is the voice — bold,
          condensed, all-caps. It commands attention at hero scale and maintains
          authority at section headers. Inter is the workhorse — clean, neutral, optimized
          for screen reading at any size. JetBrains Mono provides technical precision
          for labels, codes, and data that needs to align cleanly.
        </BodyText>

        <TypeSpecimen
          label="HERO TITLE"
          spec="Bebas Neue · 140px · leading 0.85 · tracking -0.02em · uppercase"
          component={<HeroTitle>Aa Bb Cc</HeroTitle>}
        />
        <TypeSpecimen
          label="SECTION HEADER"
          spec="Bebas Neue · 72px · leading 0.9 · tracking -0.01em · uppercase"
          component={<SectionHeader>Section Header Text</SectionHeader>}
        />
        <TypeSpecimen
          label="EYEBROW"
          spec="Inter · 18px · tracking 0.15em · uppercase · semibold"
          component={<Eyebrow>Eyebrow Label</Eyebrow>}
        />
        <TypeSpecimen
          label="BODY LARGE"
          spec="Inter · 28px · leading 1.6"
          component={<BodyText size="lg">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</BodyText>}
        />
        <TypeSpecimen
          label="BODY MEDIUM"
          spec="Inter · 24px · leading 1.6"
          component={<BodyText>The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</BodyText>}
        />
        <TypeSpecimen
          label="BODY SMALL"
          spec="Inter · 20px · leading 1.5"
          component={<BodyText size="sm">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</BodyText>}
        />
        <TypeSpecimen
          label="MONO TEXT"
          spec="Inter · 20px · leading 1.6"
          component={<MonoText>Mono 0123456789 — used for secondary technical text</MonoText>}
        />
        <TypeSpecimen
          label="TECH CODE"
          spec="JetBrains Mono · 14–22px · tracking 0.1em · uppercase"
          component={
            <div className="flex items-baseline gap-8">
              <TechCode size="lg">TECH LG</TechCode>
              <TechCode>TECH MD</TechCode>
              <TechCode size="sm">TECH SM</TechCode>
            </div>
          }
        />
        <TypeSpecimen
          label="QUOTE"
          spec="Bebas Neue · 52px · leading 1.2 · uppercase"
          component={
            <Quote attribution="Attribution Name, Role">
              Design is not just what it looks like. Design is how it works.
            </Quote>
          }
        />
      </BriefSection>
    </SlideContainer>
  );
}
