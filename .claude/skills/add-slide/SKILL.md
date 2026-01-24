# Add Slide Skill

Add a new slide to the deck with proper numbering and registration.

## Auto-invoke triggers
- "add a slide"
- "create new slide"
- "insert slide"
- "new slide"

## Workflow

### Step 1: Gather Information
Ask the user for:
1. **Position**: Slide number (1-based) or "end" for last position
2. **Template**: Which template to use (see available templates below)
3. **Slide name**: kebab-case name (e.g., "our-mission")

### Step 2: Create Slide File
Create `src/deck/slides/NN-{name}.tsx` with this structure:

```tsx
import { {TemplateName} } from "@/templates";

export function SlideNNCamelCase() {
  return (
    <{TemplateName}
      // Template-specific props
    />
  );
}
```

**Naming conventions:**
- Filename: `NN-kebab-case.tsx` (e.g., `05-our-mission.tsx`)
- Export: `SlideNNCamelCase` (e.g., `Slide05OurMission`)
- NN is zero-padded 2-digit number

### Step 3: Register in config.ts
Add to `src/deck/config.ts`:
1. Add import statement in the imports section (sorted by number)
2. Add config entry in `SLIDE_CONFIG` array at the correct position:

```typescript
{
  id: "kebab-case-name",
  title: "Full Title",
  shortTitle: "Short",
  component: SlideNNCamelCase,
}
```

### Step 4: Renumber if Inserting
If inserting in the middle (not at end):
1. Rename all subsequent slide files (increment their NN prefix)
2. Update all imports in config.ts to match new filenames
3. Update all component names in both slide files and config.ts

### Step 5: Verify
Run `pnpm build` to ensure no errors.

## Available Templates

| Template | Best For |
|----------|----------|
| TitleTemplate | Opening slide, section headers |
| HeroTemplate | Bold statement with visual |
| SplitContentTemplate | Text + image side by side |
| TwoColumnTemplate | Two content areas |
| StatCardsTemplate | Key metrics/numbers |
| QuoteTemplate | Testimonials, quotes |
| BigNumberTemplate | Single impactful number |
| FeatureGridTemplate | Feature lists (2-4 items) |
| IconGridTemplate | Icon-based feature grid |
| TimelineTemplate | Process, milestones |
| ComparisonTableTemplate | Feature comparison |
| BeforeAfterTemplate | Before/after comparison |
| DiagramTemplate | Custom diagrams |
| FullscreenImageTemplate | Full-bleed image |
| PhotoGridTemplate | Multiple photos |
| PhoneMockupTemplate | Mobile app screenshots |
| BrowserMockupTemplate | Web app screenshots |
| TeamTemplate | Team member profiles |
| LogoCloudTemplate | Partner/client logos |
| StackedCardsTemplate | Layered card content |
| ThreeUpTemplate | Three-item showcase |

## Example

User: "Add a slide at position 5 using the quote template called client-testimonial"

Result:
- Creates `src/deck/slides/05-client-testimonial.tsx`
- Exports `Slide05ClientTestimonial`
- Renumbers slides 05-17 to 06-18
- Updates all imports and config entries
