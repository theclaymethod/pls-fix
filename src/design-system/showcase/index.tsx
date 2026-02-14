import { ShowcaseCover } from "./cover";
import { ShowcaseBrand } from "./01-brand";
import { ShowcaseColor } from "./02-color";
import { ShowcaseTypography } from "./03-typography";
import { ShowcaseLabels } from "./04-labels";
import { ShowcaseComponents } from "./05-components";
import { ShowcaseDecorative } from "./06-decorative";
import { ShowcaseModes } from "./07-modes";
import { ShowcaseGuidelines } from "./08-guidelines";
import { ShowcaseInteractive } from "./09-interactive";
import { ShowcaseExpandable } from "./10-expandable";
import { ShowcaseHover } from "./11-hover";
import { ShowcaseDataViz } from "./12-data-viz";
import { ShowcaseTabs } from "./13-tabs";
import { ShowcaseEffects } from "./14-effects";

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
