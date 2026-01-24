# Remove Slide Skill

Remove a slide from the deck and renumber remaining slides.

## Auto-invoke triggers
- "remove slide"
- "delete slide"
- "drop slide"

## Workflow

### Step 1: Identify Slide
Ask which slide to remove by:
- Number (e.g., "slide 5")
- Name (e.g., "client-testimonial")
- ID from config (e.g., "quote")

If ambiguous, list all slides and ask user to confirm.

### Step 2: Preview and Confirm
Show the user:
- Slide number and filename
- Slide title from config
- Template being used

Ask for confirmation before proceeding.

### Step 3: Delete Slide File
Remove `src/deck/slides/NN-name.tsx`

### Step 4: Update config.ts
In `src/deck/config.ts`:
1. Remove the import statement for the deleted slide
2. Remove the config entry from `SLIDE_CONFIG` array

### Step 5: Renumber Remaining Slides
For all slides after the deleted position:
1. Rename slide files (decrement NN prefix)
2. Update export names in each renamed file
3. Update imports in config.ts
4. Update component references in SLIDE_CONFIG

### Step 6: Verify
Run `pnpm build` to ensure no errors.

## Current Slides Reference

Check `src/deck/config.ts` for current slide list. Format:
```
01-title.tsx      -> Slide01Title
02-intro.tsx      -> Slide02Intro
...
```

## Example

User: "Remove slide 5"

Current state:
```
04-features.tsx
05-stats.tsx      <- TO DELETE
06-timeline.tsx
07-comparison.tsx
```

After removal:
```
04-features.tsx
05-timeline.tsx   <- Renamed from 06
06-comparison.tsx <- Renamed from 07
```

Changes made:
1. Delete `src/deck/slides/05-stats.tsx`
2. Rename `06-timeline.tsx` to `05-timeline.tsx`, update export to `Slide05Timeline`
3. Rename `07-comparison.tsx` to `06-comparison.tsx`, update export to `Slide06Comparison`
4. Update all imports and config entries in `config.ts`

## Safety

Always ask for confirmation before deleting. The slide content cannot be recovered after deletion.
