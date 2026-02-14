// Section 06 — Decorative Language: industrial icons at 3 sizes, icon row, feature blocks, crosshairs, rule grid, category grid

import { SlideContainer, GridSection } from "../layout";
import { Eyebrow, BodyText, TechCode } from "../typography";
import {
  CrosshairMark,
  RuleGrid,
  FeatureBlock,
  CategoryGrid,
} from "../decorative";
import { BriefSection } from "./helpers";

export function ShowcaseDecorative() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={6} title="Decorative Language">
        <BodyText className="mb-10 max-w-[1000px]">
          Decoration is restrained and systematic. Industrial icons are typographic glyphs —
          not illustrations. Registration marks and rule grids provide visual texture
          without competing with content. These elements say "precision engineering"
          without saying a word.
        </BodyText>

        <Eyebrow className="mb-6">Industrial Icon Set</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Seven glyphs at three sizes. Used for markers, bullets, and subtle visual accents.
        </BodyText>
        <div className="flex items-end gap-14 mb-16">
          {(["star", "cross", "dots", "asterisk", "x", "arrow", "plus"] as const).map((sym) => (
            <div key={sym} className="flex flex-col items-center gap-4">
              <span className="text-[48px] inline-block" style={{ color: "var(--color-text-muted)" }}>
                {sym === "star" ? "✦" : sym === "cross" ? "⊕" : sym === "dots" ? "::" : sym === "asterisk" ? "✱" : sym === "x" ? "×" : sym === "arrow" ? "→" : "+"}
              </span>
              <span className="text-[32px] inline-block" style={{ color: "var(--color-text-muted)" }}>
                {sym === "star" ? "✦" : sym === "cross" ? "⊕" : sym === "dots" ? "::" : sym === "asterisk" ? "✱" : sym === "x" ? "×" : sym === "arrow" ? "→" : "+"}
              </span>
              <span className="text-[20px] inline-block" style={{ color: "var(--color-text-muted)" }}>
                {sym === "star" ? "✦" : sym === "cross" ? "⊕" : sym === "dots" ? "::" : sym === "asterisk" ? "✱" : sym === "x" ? "×" : sym === "arrow" ? "→" : "+"}
              </span>
              <TechCode>{sym}</TechCode>
            </div>
          ))}
        </div>

        <Eyebrow className="mb-6">Icon Row</Eyebrow>
        <div className="flex items-center gap-8 mb-16">
          {(["star", "cross", "dots", "asterisk", "arrow"] as const).map((sym) => (
            <span key={sym} className="text-[36px] inline-block" style={{ color: "var(--color-text-muted)" }}>
              {sym === "star" ? "✦" : sym === "cross" ? "⊕" : sym === "dots" ? "::" : sym === "asterisk" ? "✱" : "→"}
            </span>
          ))}
        </div>

        <Eyebrow className="mb-6">Feature Blocks</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Compact content blocks with optional eyebrow, icon, and description.
        </BodyText>
        <GridSection columns={3} className="mb-16">
          <FeatureBlock eyebrow="01" title="Speed" description="Optimized at every layer." icon="arrow" />
          <FeatureBlock eyebrow="02" title="Scale" description="Built for millions." icon="plus" />
          <FeatureBlock eyebrow="03" title="Security" description="Enterprise-grade." icon="star" />
        </GridSection>

        <Eyebrow className="mb-6">Structural Elements</Eyebrow>
        <BodyText size="sm" className="mb-4">
          Registration marks and rule grids add technical texture to layouts.
          Use sparingly — as background elements or visual anchors, never as primary content.
        </BodyText>
        <div className="flex items-center gap-16 mb-12">
          <CrosshairMark size="sm" />
          <CrosshairMark size="md" />
          <CrosshairMark size="lg" />
          <div className="w-64 h-64">
            <RuleGrid />
          </div>
        </div>

        <Eyebrow className="mb-6">Category Grid</Eyebrow>
        <CategoryGrid
          items={[
            { title: "Strategy", subtitle: "Planning & Research", icon: "star" },
            { title: "Design", subtitle: "Visual & UX", icon: "cross" },
            { title: "Engineering", subtitle: "Build & Ship", icon: "dots" },
            { title: "Growth", subtitle: "Scale & Optimize", icon: "arrow" },
          ]}
        />
      </BriefSection>
    </SlideContainer>
  );
}
