import type { ComponentType } from "react";
import { Slide01Title } from "./slides/01-title";
import { Slide02Intro } from "./slides/02-intro";
import { Slide03Problem } from "./slides/03-problem";
import { Slide04Features } from "./slides/04-features";
import { Slide05Stats } from "./slides/05-stats";
import { Slide06Timeline } from "./slides/06-timeline";
import { Slide07Comparison } from "./slides/07-comparison";
import { Slide08Quote } from "./slides/08-quote";
import { Slide09Closing } from "./slides/09-closing";
import { Slide10Fullscreen } from "./slides/10-fullscreen";
import { Slide11Gallery } from "./slides/11-gallery";
import { Slide12Mobile } from "./slides/12-mobile";
import { Slide13Browser } from "./slides/13-browser";
import { Slide14Team } from "./slides/14-team";
import { Slide15Partners } from "./slides/15-partners";
import { Slide16Process } from "./slides/16-process";
import { Slide17Showcase } from "./slides/17-showcase";

export interface SlideConfig {
  id: string;
  title: string;
  shortTitle: string;
  component: ComponentType;
}

export const SLIDE_CONFIG: SlideConfig[] = [
  {
    id: "title",
    title: "Title Slide",
    shortTitle: "Title",
    component: Slide01Title,
  },
  {
    id: "intro",
    title: "Introduction",
    shortTitle: "Intro",
    component: Slide02Intro,
  },
  {
    id: "problem",
    title: "Before & After",
    shortTitle: "Problem",
    component: Slide03Problem,
  },
  {
    id: "features",
    title: "Key Features",
    shortTitle: "Features",
    component: Slide04Features,
  },
  {
    id: "stats",
    title: "Impact Metrics",
    shortTitle: "Stats",
    component: Slide05Stats,
  },
  {
    id: "timeline",
    title: "Project Timeline",
    shortTitle: "Timeline",
    component: Slide06Timeline,
  },
  {
    id: "comparison",
    title: "Feature Matrix",
    shortTitle: "Compare",
    component: Slide07Comparison,
  },
  {
    id: "quote",
    title: "Testimonial",
    shortTitle: "Quote",
    component: Slide08Quote,
  },
  {
    id: "closing",
    title: "Closing Number",
    shortTitle: "Close",
    component: Slide09Closing,
  },
  {
    id: "fullscreen",
    title: "Fullscreen Image",
    shortTitle: "Hero",
    component: Slide10Fullscreen,
  },
  {
    id: "gallery",
    title: "Photo Gallery",
    shortTitle: "Gallery",
    component: Slide11Gallery,
  },
  {
    id: "mobile",
    title: "Mobile Mockup",
    shortTitle: "Mobile",
    component: Slide12Mobile,
  },
  {
    id: "browser",
    title: "Browser Mockup",
    shortTitle: "Browser",
    component: Slide13Browser,
  },
  {
    id: "team",
    title: "Team Members",
    shortTitle: "Team",
    component: Slide14Team,
  },
  {
    id: "partners",
    title: "Tech Stack",
    shortTitle: "Stack",
    component: Slide15Partners,
  },
  {
    id: "process",
    title: "Process Cards",
    shortTitle: "Process",
    component: Slide16Process,
  },
  {
    id: "showcase",
    title: "Three-Up Showcase",
    shortTitle: "Showcase",
    component: Slide17Showcase,
  },
];

export const TOTAL_SLIDES = SLIDE_CONFIG.length;

export function getSlideComponent(slideNumber: number): ComponentType {
  const index = slideNumber - 1;
  if (index >= 0 && index < SLIDE_CONFIG.length) {
    return SLIDE_CONFIG[index].component;
  }
  return SLIDE_CONFIG[0].component;
}

export function getSlideConfig(slideNumber: number): SlideConfig | undefined {
  return SLIDE_CONFIG[slideNumber - 1];
}

export const SLIDES_NAV = SLIDE_CONFIG.map((slide, index) => ({
  number: index + 1,
  title: slide.title,
  shortTitle: slide.shortTitle,
}));
