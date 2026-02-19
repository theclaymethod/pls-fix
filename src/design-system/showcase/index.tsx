import { ShowcaseCover } from "./cover"; // Dark cover slide — logo, title, brief intro
import { ShowcaseBrand } from "./01-brand"; // Brand overview — principles, crosshair marks, category grid
import { ShowcaseColor } from "./02-color"; // Color palette — primary, text hierarchy, backgrounds (ColorSwatch)
import { ShowcaseTypography } from "./03-typography"; // Type specimens — HeroTitle through TechCode at all sizes (TypeSpecimen)
import { ShowcaseLabels } from "./04-labels"; // Labels, numbered lists, pipe lists, category labels, section markers
import { ShowcaseComponents } from "./05-components"; // Card library — FeatureCard, StatCard, QuoteCard, ProcessCard
import { ShowcaseDecorative } from "./06-decorative"; // Industrial icons, icon row, feature blocks, crosshairs, rule grid
import { ShowcaseModes } from "./07-modes"; // Dark + yellow mode demos — same components, different palettes
import { ShowcaseGuidelines } from "./08-guidelines"; // Do/don't usage rules — two-column layout
import { ShowcaseInteractive } from "./09-interactive"; // HoverCard lifts, AnimatedEntry + StaggerContainer
import { ShowcaseExpandable } from "./10-expandable"; // AccordionItem, ExpandableCard
import { ShowcaseHover } from "./11-hover"; // HoverCaption — bottom/top positions on colored blocks
import { ShowcaseDataViz } from "./12-data-viz"; // Charts (Bar, Donut, Line), ProgressRing, Counter, Trend, Sparkline, Harvey, Magnitude
import { ShowcaseTabs } from "./13-tabs"; // Tabs component, QuoteCarousel with auto-rotation
import { ShowcaseEffects } from "./14-effects"; // ShineBorder, PulseRing, Tooltip, SkeletonBlock

export function DesignSystemShowcase() {
  return (
    <div style={{ width: 1920 }}>
      <ShowcaseCover />
      <ShowcaseBrand />
      <ShowcaseColor />
      <ShowcaseTypography />
      <ShowcaseLabels />
      <ShowcaseComponents />
      <ShowcaseDecorative />
      <ShowcaseModes />
      <ShowcaseGuidelines />
      <ShowcaseInteractive />
      <ShowcaseExpandable />
      <ShowcaseHover />
      <ShowcaseDataViz />
      <ShowcaseTabs />
      <ShowcaseEffects />
    </div>
  );
}
