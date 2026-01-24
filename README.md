# Vibe Decks

A slide deck template system built with React and Tailwind CSS, designed to be customized using [Claude Code](https://claude.ai/claude-code).

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/theclaymethod/vibe-decks)

## Features

- **21 Slide Templates** - Pre-built layouts for common presentation needs
- **1920x1080 Scaling** - Slides scale to fit any viewport
- **Keyboard Navigation** - Arrow keys, Home/End support
- **Password Protection** - Optional authentication gate
- **Claude Code Integration** - Built-in skills for slide management

## Quick Start with Claude Code

1. **Clone and install**:
   ```bash
   git clone https://github.com/theclaymethod/vibe-decks.git
   cd vibe-decks
   pnpm install
   ```

2. **Start the dev server**:
   ```bash
   pnpm dev
   ```

3. **Open Claude Code** in the project directory and start building your deck:
   ```
   claude
   ```

4. **Use slash commands** to manage slides:
   - `/add-slide` - Create a new slide
   - `/remove-slide` - Delete a slide
   - `/edit-slide` - Modify slide content
   - `/reorder-slide` - Move slide to new position
   - `/rename-slide` - Rename slide file/title

## Example Prompts

Tell Claude Code what you want in natural language:

```
"Add a new slide at position 3 using the quote template"

"Change the title on slide 5 to 'Our Results'"

"Move slide 8 to be the second slide"

"Update the stats on slide 4 to show 150% growth"

"Delete slide 6"

"Change the color scheme to use a dark theme"

"Add a team slide with 4 members"
```

## Project Structure

```
vibe-decks/
├── src/
│   ├── deck/                   # Your deck content
│   │   ├── config.ts           # Slide registry
│   │   ├── theme.css           # Theme variables
│   │   └── slides/             # Individual slides
│   ├── templates/              # 21 slide templates
│   └── design-system/          # Base components
├── deck.config.ts              # Top-level config
├── CLAUDE.md                   # Claude Code instructions
└── .claude/skills/             # Slide management skills
```

## Available Templates

| Template | Best For |
|----------|----------|
| TitleTemplate | Opening slides |
| HeroTemplate | Bold statements |
| SplitContentTemplate | Text + image |
| TwoColumnTemplate | Side-by-side content |
| StatCardsTemplate | Key metrics |
| QuoteTemplate | Testimonials |
| BigNumberTemplate | Single dramatic stat |
| FeatureGridTemplate | Feature lists |
| TimelineTemplate | Roadmaps, milestones |
| ComparisonTableTemplate | Feature comparison |
| BeforeAfterTemplate | Before/after |
| FullscreenImageTemplate | Full-bleed images |
| PhotoGridTemplate | Image galleries |
| PhoneMockupTemplate | Mobile screenshots |
| BrowserMockupTemplate | Web screenshots |
| TeamTemplate | Team profiles |
| LogoCloudTemplate | Partner logos |
| ThreeUpTemplate | Three-item showcase |

See all 21 templates in `src/templates/`.

## Customization

### Theme
Edit `src/deck/theme.css`:
```css
:root {
  --color-primary: #ff6e41;
  --color-bg-dark: #1a1a1a;
  --font-heading: 'Bebas Neue', sans-serif;
}
```

### Password Protection
In `deck.config.ts`:
```typescript
auth: { enabled: true, password: "your-password" }
```

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `→` or `Space` | Next slide |
| `←` | Previous slide |
| `Home` | First slide |
| `End` | Last slide |

## Deploy

Click the deploy button above or:

```bash
pnpm build
wrangler deploy
```

## License

MIT
