# Edit Slide Skill

Modify an existing slide's content or template.

## Auto-invoke triggers
- "edit slide"
- "change slide"
- "modify slide"
- "update slide content"
- "update slide"

## Workflow

### Step 1: Identify Slide
Ask which slide to edit by:
- Number (e.g., "slide 5")
- Name (e.g., "stats")
- ID from config

If ambiguous, list slides and ask user to choose.

### Step 2: Read Current Slide
Read the slide file at `src/deck/slides/NN-name.tsx` and show user:
- Current template being used
- Current props/content
- Config entry (title, shortTitle)

### Step 3: Determine Changes
Ask what to change:
- **Content**: Update text, images, data
- **Template**: Switch to different template
- **Mode/Variant**: Change color scheme
- **Config**: Update title/shortTitle in config.ts

### Step 4: Make Changes
Edit the slide file and/or config.ts as needed.

If changing template:
- Import the new template
- Restructure props for new template's API
- Remove unused imports

### Step 5: Verify
Check that the slide renders correctly. Run `pnpm build` if structural changes were made.

## Available Templates

| Template | Props Pattern |
|----------|---------------|
| TitleTemplate | eyebrow, title, subtitle, tag, code, author, date, mode |
| HeroTemplate | title, subtitle, backgroundImage, mode |
| SplitContentTemplate | title, content, image, imagePosition |
| TwoColumnTemplate | title, leftContent, rightContent |
| StatCardsTemplate | eyebrow, title, stats[] |
| QuoteTemplate | quote, author, role, company, image |
| BigNumberTemplate | number, label, description, mode |
| FeatureGridTemplate | eyebrow, title, features[], columns, variant |
| IconGridTemplate | eyebrow, title, items[] |
| TimelineTemplate | eyebrow, title, events[] |
| ComparisonTableTemplate | title, headers[], rows[] |
| BeforeAfterTemplate | title, before, after |
| DiagramTemplate | title, children (custom JSX) |
| FullscreenImageTemplate | image, overlay, caption |
| PhotoGridTemplate | title, photos[] |
| PhoneMockupTemplate | title, screens[] |
| BrowserMockupTemplate | title, url, screenshot |
| TeamTemplate | title, members[] |
| LogoCloudTemplate | title, logos[] |
| StackedCardsTemplate | title, cards[] |
| ThreeUpTemplate | eyebrow, title, items[] |

## Example 1: Update Content

User: "Edit slide 5 to change the main stat to 150%"

1. Read `src/deck/slides/05-stats.tsx`
2. Find the stat value prop
3. Update the number
4. Verify build passes

## Example 2: Change Template

User: "Change slide 3 from BeforeAfter to TwoColumn"

1. Read `src/deck/slides/03-problem.tsx`
2. Note current content
3. Change import from `BeforeAfterTemplate` to `TwoColumnTemplate`
4. Restructure props for TwoColumnTemplate API
5. Verify build passes

## Example 3: Update Config

User: "Change slide 8 title to 'Customer Stories'"

1. Open `src/deck/config.ts`
2. Find the entry with `component: Slide08Quote`
3. Update `title: "Customer Stories"`
4. Optionally update `shortTitle` as well
