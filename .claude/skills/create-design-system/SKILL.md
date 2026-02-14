# Create Design System Skill

Generate a complete design system from user intent and visual references, then visually verify the output in-browser.

## Auto-invoke triggers
- "create design system"
- "new design system"
- "generate design system"
- "redesign the design system"
- "make a design system"

## Workflow

### Step 1: Gather Intent

Ask the user for:
1. **Color direction**: Named palette or specific hex values
2. **Typography direction**: Heading/body font pairing and feel (e.g. "industrial", "editorial", "geometric", "humanist")
3. **Look & feel**: Sharp & technical, soft & friendly, bold & editorial, or minimal & restrained
4. **Additional notes**: Brand guidelines, specific requirements, anything else

Check `public/assets/inspiration/` for uploaded reference images. If images exist, acknowledge them — they'll inform the design.

### Step 2: Read Current State

Read these files to understand the existing design system structure and exports:
- `src/design-system/index.ts` (barrel exports — new files must maintain this contract)
- `src/design-system/typography.tsx`
- `src/design-system/layout.tsx`
- `src/design-system/cards.tsx`
- `src/design-system/decorative.tsx`
- `src/design-system/interactions.tsx`
- `src/design-system/data-viz.tsx`
- `src/design-system/animations.ts`
- `src/design-system/showcase/` (directory — `index.tsx` barrel + per-section files)
- `src/deck/theme.css`

If reference images exist in `public/assets/inspiration/`, read each one to analyze visual style.

### Step 3: Generate Design System

Regenerate these files based on the user's intent:

| File | What to generate |
|------|-----------------|
| `src/deck/theme.css` | CSS custom properties: colors, fonts, spacing, border-radius |
| `src/design-system/typography.tsx` | All typography components (HeroTitle, SectionHeader, Eyebrow, BodyText, etc.) |
| `src/design-system/layout.tsx` | Layout primitives (SlideContainer, TwoColumnLayout, GridSection, etc.) |
| `src/design-system/cards.tsx` | Card components (FeatureCard, StatCard, QuoteCard, etc.) |
| `src/design-system/decorative.tsx` | Decorative elements (icons, grids, marks, backgrounds) |
| `src/design-system/showcase/` | Showcase directory — `index.tsx` barrel composes per-section files (`cover.tsx`, `01-brand.tsx` … `14-effects.tsx`), `helpers.tsx` has shared components (BriefSection, ColorSwatch, TypeSpecimen, ReplayWrapper) |
| `src/design-system/interactions.tsx` | Interactive primitives (hover, accordion, tabs, etc.) |
| `src/design-system/data-viz.tsx` | Data visualization primitives (charts: BarChart, DonutChart, LineChart; metrics: ProgressRing, AnimatedCounter, TrendIndicator, Sparkline, HarveyBall, MagnitudeBar) |
| `src/design-system/animations.ts` | Motion/framer-motion animation variants |
| `src/design-system/index.ts` | Barrel file re-exporting everything |

**Critical rules:**
- Preserve all existing component names and prop interfaces — slides depend on them
- Every component exported in the current `index.ts` must still be exported
- New components can be added, but nothing removed
- Chart components (BarChart, DonutChart, LineChart) in data-viz.tsx use `motion.rect`, `motion.path`, `motion.polyline`, and `motion.circle` for animated data transitions — preserve this animation pattern when regenerating
- Use CSS custom properties from theme.css for all colors — never hardcode hex in components
- `SlideContainer` must always set up the 1920x1080 slide frame with proper padding and CSS variable scoping per mode

Update `src/design-system/CHANGELOG.md` with a summary of the new design system.

### Step 4: Build Verification

Run `pnpm build` to confirm no type errors or broken imports.

If the build fails, fix the errors and re-run until clean.

### Step 5: Visual Verification

Open a browser and visually inspect the generated design system.

1. **Ensure dev server is running**: Read `.dev-ports` in the project root to get the `builder` port. If the file doesn't exist or the port doesn't respond, start `pnpm dev` in the background and wait for `.dev-ports` to appear.

2. **Navigate to the showcase**: Open `http://localhost:{builder port}/builder/designer` in the browser.

3. **Take a full-page screenshot** of the design system showcase.

4. **Evaluate the screenshot** against the user's intent:
   - Do the colors match the requested palette?
   - Does the typography feel match the requested direction?
   - Do cards and decorative elements match the requested personality?
   - Is the overall composition clean — no overlapping elements, no broken layouts, no invisible text?
   - Are all showcase sections rendering (typography, colors, cards, decorative, modes)?

5. **If issues are found**: Fix the specific design system file, re-build, refresh the page, and re-verify. Do not iterate more than 3 times — if still broken, report what's wrong and stop.

6. **If clean**: Report the result to the user with a summary of what was generated.

### Step 6: Fire Design Brief Assessment

After successful verification, fire a background assessment to generate the design brief:

```bash
# Read the API port from .dev-ports (the "api" key)
curl -s -X POST http://localhost:{api port}/api/assess-design-system \
  -H "Content-Type: application/json" \
  -d '{"description": "<the user intent description>", "imagePaths": [<inspiration paths if any>]}'
```

This spawns a background process that writes `src/design-system/design-brief.md`. No need to wait for it.

## What NOT To Do
- Do not delete or rename existing exported components
- Do not change component prop interfaces in breaking ways
- Do not skip the build verification step
- Do not skip the visual verification step — the browser check catches issues that type-checking cannot (wrong colors, broken layouts, invisible text)
- Do not modify slide files in `src/deck/slides/` — this skill only touches the design system
- Do not modify template files in `src/templates/`
