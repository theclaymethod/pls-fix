# Reorder Slide Skill

Move a slide to a different position in the deck.

## Auto-invoke triggers
- "reorder slide"
- "move slide"
- "swap slides"
- "change slide order"

## Workflow

### Step 1: Identify Source and Destination
Ask for:
1. **Source**: Which slide to move (by number or name)
2. **Destination**: New position (number or "before X" / "after X")

### Step 2: Preview Change
Show the user:
- Current order (abbreviated)
- New order after move
- Which slides will be renumbered

Ask for confirmation.

### Step 3: Execute Reorder

**For moving slide N to position M:**

If N < M (moving forward):
1. Slides N+1 through M shift down (decrement numbers)
2. Slide N becomes M

If N > M (moving backward):
1. Slides M through N-1 shift up (increment numbers)
2. Slide N becomes M

### Step 4: Rename Files and Update References

For each affected slide:
1. Rename the file (`NN-name.tsx` -> `MM-name.tsx`)
2. Update the export name in the file (`SlideNNName` -> `SlideMMName`)
3. Update the import in `config.ts`
4. Update the component reference in `SLIDE_CONFIG`

### Step 5: Verify
Run `pnpm build` to ensure no errors.

## Example

**Move slide 3 to position 7**

Before:
```
01-title.tsx
02-intro.tsx
03-problem.tsx    <- MOVING THIS
04-features.tsx
05-stats.tsx
06-timeline.tsx
07-comparison.tsx <- TO HERE
08-quote.tsx
```

After:
```
01-title.tsx
02-intro.tsx
03-features.tsx   <- was 04
04-stats.tsx      <- was 05
05-timeline.tsx   <- was 06
06-comparison.tsx <- was 07
07-problem.tsx    <- MOVED FROM 03
08-quote.tsx
```

Changes:
1. Rename 04->03, 05->04, 06->05, 07->06
2. Rename original 03 to 07
3. Update all exports and imports

## Swap Shortcut

For "swap slide 3 and 7":
- This is equivalent to two moves
- Simpler: just swap the content/names, keeping numbers
- Rename files: `03-problem.tsx` <-> `03-comparison.tsx` (swap names)
- Update exports and config accordingly
