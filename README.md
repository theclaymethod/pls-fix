# Vibe Decks

A reusable slide deck template system built with TanStack Router, React, and Tailwind CSS.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/theclaymethod/vibe-decks)

## Features

- **1920x1080 Scaling** - Slides scale to fit any viewport while maintaining aspect ratio
- **Keyboard Navigation** - Arrow keys, Home/End support
- **Collapsible Sidebar** - Auto-collapsing navigation panel
- **Password Protection** - Optional authentication gate
- **Mobile Blocking** - Warning for screens below minimum width
- **Design System** - Typography, layout, and card components
- **Slide Templates** - 20 pre-built templates for common layouts

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
```

## Project Structure

```
vibe-decks/
├── src/
│   ├── routes/              # TanStack Router file-based routes
│   ├── deck/                # Your deck content
│   │   ├── config.ts        # Slide registry
│   │   ├── theme.css        # CSS variables
│   │   └── slides/          # Individual slides
│   ├── core/                # Reusable infrastructure
│   ├── templates/           # Slide templates
│   ├── design-system/       # Base components
│   └── lib/
├── deck.config.ts           # Top-level configuration
└── package.json
```

## Configuration

### deck.config.ts

```typescript
export const deckConfig = {
  title: "My Presentation",
  auth: {
    enabled: false,
    password: "secret123",
  },
  design: {
    width: 1920,
    height: 1080,
    minViewportWidth: 1024,
  },
  theme: {
    googleFontsUrl: "https://fonts.googleapis.com/...",
  },
  navigation: {
    showSlideNumbers: true,
    enableKeyboard: true,
  },
};
```

### Theme CSS Variables

Edit `src/deck/theme.css` to customize colors and fonts:

```css
:root {
  --color-primary: #ff6e41;
  --color-bg-light: #ffffff;
  --color-bg-dark: #1a1a1a;
  --color-bg-cream: #fcfbf7;
  --font-heading: 'Playfair Display', serif;
  --font-body: 'IBM Plex Mono', monospace;
}
```

## Adding Slides

1. Create a new file in `src/deck/slides/`:

```tsx
// src/deck/slides/04-features.tsx
import { TwoColumnTextTemplate } from "@/templates";

export function Slide04Features() {
  return (
    <TwoColumnTextTemplate
      eyebrow="Features"
      title="What Makes Us Different"
      leftTitle="Speed"
      leftItems={["Fast rendering", "Optimized builds"]}
      rightTitle="Flexibility"
      rightItems={["Custom themes", "Easy to extend"]}
    />
  );
}
```

2. Register in `src/deck/config.ts`:

```typescript
import { Slide04Features } from "./slides/04-features";

export const SLIDE_CONFIG: SlideConfig[] = [
  // ... existing slides
  {
    id: "features",
    title: "Key Features",
    shortTitle: "Features",
    component: Slide04Features,
  },
];
```

## Available Templates

### HeroTemplate
Full-screen image with text overlay.

```tsx
<HeroTemplate
  eyebrow="Category"
  title="Main Headline"
  subtitle="Supporting text"
  imageUrl="https://..."
/>
```

### SplitContentTemplate
Image and text side by side.

```tsx
<SplitContentTemplate
  eyebrow="Section"
  title="Headline"
  content="Description text..."
  imageUrl="https://..."
  imageSide="right"
/>
```

### TwoColumnTemplate / TwoColumnTextTemplate
Two-column layouts.

```tsx
<TwoColumnTextTemplate
  title="Comparison"
  leftTitle="Before"
  leftItems={["Item 1", "Item 2"]}
  rightTitle="After"
  rightItems={["Item 1", "Item 2"]}
/>
```

### StatCardsTemplate
Display metrics with emphasis.

```tsx
<StatCardsTemplate
  eyebrow="Results"
  title="Impact"
  stats={[
    { value: "10K", label: "Users" },
    { value: "98%", label: "Satisfaction" },
    { value: "2.5x", label: "ROI" },
  ]}
  accentIndex={1}
/>
```

### QuoteTemplate
Centered quote with attribution.

```tsx
<QuoteTemplate
  quote="The best products are built at the intersection..."
  attribution="Jane Doe"
  role="CEO"
  variant="dark"
/>
```

### BigNumberTemplate
Single dramatic number.

```tsx
<BigNumberTemplate
  eyebrow="Growth"
  number="247%"
  label="Year over Year"
  variant="primary"
  showBrackets
/>
```

### TitleTemplate
Centered title slide with corner accents.

```tsx
<TitleTemplate
  eyebrow="Product Overview"
  title="Project Name"
  subtitle="Brief description"
  tag="Q1 2024"
  author="Your Name"
  date="January 2024"
  variant="dark"
/>
```

### FeatureGridTemplate
Grid of feature cards.

```tsx
<FeatureGridTemplate
  eyebrow="Capabilities"
  title="Key Features"
  features={[
    { icon: <Icon />, title: "Feature", description: "Description" },
  ]}
  columns={3}
/>
```

### IconGridTemplate
Grid of icons with labels.

```tsx
<IconGridTemplate
  eyebrow="Tools"
  title="Technology Stack"
  items={[
    { icon: <Icon />, label: "React", description: "Frontend" },
  ]}
  columns={4}
/>
```

### TimelineTemplate
Vertical timeline with milestones.

```tsx
<TimelineTemplate
  eyebrow="Roadmap"
  title="Project Timeline"
  milestones={[
    { phase: "Phase 1", date: "Q1", title: "Discovery", description: "...", status: "complete" },
    { phase: "Phase 2", date: "Q2", title: "Build", description: "...", status: "current" },
  ]}
/>
```

### ComparisonTableTemplate
Feature comparison table.

```tsx
<ComparisonTableTemplate
  eyebrow="Comparison"
  title="Feature Matrix"
  beforeLabel="Standard"
  afterLabel="Premium"
  rows={[
    { feature: "Core Analytics", before: true, after: true },
    { feature: "Priority Support", before: false, after: true },
  ]}
/>
```

### BeforeAfterTemplate
Split-screen before/after comparison.

```tsx
<BeforeAfterTemplate
  beforeTitle="The Challenge"
  beforeItems={["Problem 1", "Problem 2"]}
  afterTitle="The Solution"
  afterItems={["Solution 1", "Solution 2"]}
/>
```

### DiagramTemplate
Box-and-arrow architecture diagrams.

```tsx
<DiagramTemplate
  eyebrow="Architecture"
  title="System Overview"
  boxes={[
    { id: "client", label: "Client", variant: "default" },
    { id: "api", label: "API", variant: "primary" },
    { id: "db", label: "Database", variant: "secondary" },
  ]}
  layout="horizontal"
  caption="Data flow diagram"
/>
```

### FullscreenImageTemplate
Full-bleed background image with text overlay.

```tsx
<FullscreenImageTemplate
  imageUrl="https://..."
  eyebrow="Visual Impact"
  title="Full-Screen Layout"
  subtitle="Supporting text"
  position="bottom-left"
  overlay="gradient"
/>
```

### PhotoGridTemplate
Grid gallery of images with captions.

```tsx
<PhotoGridTemplate
  eyebrow="Portfolio"
  title="Featured Work"
  items={[
    { imageUrl: "https://...", title: "Project", subtitle: "Category" },
  ]}
  columns={3}
/>
```

### PhoneMockupTemplate
Mobile device mockup with screenshot.

```tsx
<PhoneMockupTemplate
  eyebrow="Mobile Experience"
  title="Native App"
  imageUrl="https://..."
  caption="iOS and Android"
  phoneColor="black"
/>
```

### BrowserMockupTemplate
Browser window mockup with screenshot.

```tsx
<BrowserMockupTemplate
  eyebrow="Web Application"
  title="Dashboard"
  imageUrl="https://..."
  browserUrl="app.example.com"
  caption="Real-time analytics"
/>
```

### TeamTemplate
Team members with photos or initials.

```tsx
<TeamTemplate
  eyebrow="The Team"
  title="Key Stakeholders"
  members={[
    { name: "Alex Chen", role: "Product Lead", initials: "AC" },
    { name: "Sarah Kim", role: "Engineering", imageUrl: "https://..." },
  ]}
  columns={4}
/>
```

### LogoCloudTemplate
Grid of logos or partner brands.

```tsx
<LogoCloudTemplate
  eyebrow="Technology Stack"
  title="Built With"
  logos={[
    { name: "React", label: "Frontend" },
    { name: "TypeScript", label: "Language" },
  ]}
  columns={3}
  centered
/>
```

### StackedCardsTemplate
Stacked process or step cards.

```tsx
<StackedCardsTemplate
  eyebrow="Process"
  title="How We Work"
  subtitle="Our approach"
  cards={[
    { label: "Step 1", title: "Discovery", color: "#ff6e41" },
    { label: "Step 2", title: "Design", color: "#85d7ff" },
  ]}
/>
```

### ThreeUpTemplate
Three images side by side with captions.

```tsx
<ThreeUpTemplate
  eyebrow="Case Studies"
  title="Recent Projects"
  items={[
    { imageUrl: "https://...", title: "Project A", subtitle: "Category" },
    { imageUrl: "https://...", title: "Project B", subtitle: "Category" },
    { imageUrl: "https://...", title: "Project C", subtitle: "Category" },
  ]}
  aspectRatio="portrait"
/>
```

## Design System Components

### Typography
- `HeroTitle` - Large display headings (86px)
- `SectionHeader` - Section titles (48px)
- `Eyebrow` - Small caps labels
- `MonoText` - Monospace body text
- `Quote` - Blockquote styling
- `ListItem` - Numbered list items

### Layout
- `SlideContainer` - Full-slide wrapper with variants (light/dark/cream/primary)
- `TwoColumnLayout` - Grid layouts with ratio options
- `GridSection` - 2-4 column grids
- `CenterContent` - Centered flex container
- `CornerBrackets` - Decorative corner elements
- `Divider` - Horizontal dividers

### Cards
- `FeatureCard` - Icon, title, description
- `StatCard` - Value, label, sublabel
- `QuoteCard` - Quote with avatar

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

## License

MIT
