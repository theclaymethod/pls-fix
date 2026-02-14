// Section 04 — Labels & Lists: Label variants, numbered lists, pipe lists, category labels, section markers

import { SlideContainer } from "../layout";
import {
  Eyebrow,
  BodyText,
  Label,
  ListItem,
  PipeList,
  CategoryLabel,
  SectionMarker,
} from "../typography";
import { BriefSection } from "./helpers";

export function ShowcaseLabels() {
  return (
    <SlideContainer mode="white" className="h-auto min-h-[1080px]">
      <BriefSection number={4} title="Labels & Lists">
        <BodyText className="mb-10 max-w-[1000px]">
          Supporting typographic elements for structured content. Labels provide
          categorical emphasis. Lists use numbered markers with monospaced indices
          for technical precision. Pipe-separated lists work inline for metadata
          and navigation.
        </BodyText>

        <Eyebrow className="mb-6">Labels</Eyebrow>
        <div className="flex gap-4 mb-12">
          <Label>Default</Label>
          <Label variant="primary">Primary</Label>
          <Label variant="dark">Dark</Label>
        </div>

        <Eyebrow className="mb-6">Numbered List</Eyebrow>
        <div className="space-y-3 mb-12">
          <ListItem number={1}>Define the problem space and user needs clearly</ListItem>
          <ListItem number={2}>Map the solution to existing component primitives</ListItem>
          <ListItem number={3}>Compose the slide from design system building blocks</ListItem>
        </div>

        <Eyebrow className="mb-6">Pipe List</Eyebrow>
        <PipeList items={["Strategy", "Design", "Engineering", "Launch", "Growth"]} className="mb-12" />

        <Eyebrow className="mb-6">Category Label</Eyebrow>
        <div className="flex gap-12 mb-12">
          <CategoryLabel title="Category" subtitle="With a subtitle" />
          <CategoryLabel title="Standalone" />
        </div>

        <Eyebrow className="mb-6">Section Marker</Eyebrow>
        <div className="space-y-2">
          <SectionMarker number={1} label="Introduction" />
          <SectionMarker number={2} label="Problem Statement" />
          <SectionMarker number={3} label="Solution" />
        </div>
      </BriefSection>
    </SlideContainer>
  );
}
