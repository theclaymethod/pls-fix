# Spec: Deck Management Chat + DnD

## Overview

Add a collapsible right panel to the builder home page (`/builder`) with an AI chat interface and drag-and-drop grid for deck-level operations: reorder, delete, duplicate, rename, add new slides, bulk operations, and metadata editing (titles, shortTitles, IDs).

---

## Architecture

### API

- **New endpoint**: `POST /api/deck-chat`
- **Streaming**: SSE (same format as `/api/edit`)
- **Session**: `sessionId` returned on first request, reused for conversation continuity
- **System context**: AI receives full deck structure (slide list with numbers, titles, fileKeys, IDs) on every request
- **Execution model**: Backend invokes existing skill logic (reorder, remove, rename, add) under the hood
- **Request body**: `{ prompt: string, sessionId?: string }`
- **SSE events**: Same types as existing (`session`, `assistant`, `content_block_delta`, `tool`, `done`) plus a new `deck-changed` event signaling the frontend to reload

### State Sync

- After any deck-modifying operation completes, backend sends `{ type: "deck-changed" }` SSE event
- Frontend performs a **full page reload** on receiving this event
- Panel auto-reopens after reload (open/closed state persisted in localStorage)
- Chat history persisted in localStorage (`builder-deck-chat`) survives the reload

### AI Behavior

- **Plan then execute**: AI describes what it will do, waits for user confirmation before executing
- **Always confirm destructive ops**: Deletes always require explicit "yes" / "confirm" from user
- **Full deck management scope**: reorder, delete, duplicate, rename, add new (from template), bulk operations, edit slide metadata (title, shortTitle, id)

---

## Frontend

### Panel

- **Placement**: Collapsible right panel on builder home page
- **Toggle**: "Manage Deck" button added to existing action button row (top-right)
- **Sizing**: Resizable using existing `useResizable` hook (default ~320px)
- **Persistence**: Panel open/closed state stored in localStorage
- **Content**: Chat thread (text-only input, no image support)

### Chat Component

- Reuse/adapt `ChatThread` component pattern from edit sidebar
- Text-only input (no image paste/upload)
- Message persistence in localStorage (`builder-deck-chat` key)
- New hook: `useDeckChat` (adapts `useEditSession` + `useGeneration` for `/api/deck-chat`)
- No deck list rendered in chat — AI has implicit context, user references the grid visually

### Management Mode (Grid Changes)

When the panel is **open**, the slide grid enters management mode:

- Each slide card gains:
  - **Drag handle** (top-left or left edge)
  - **Delete button** (top-right, icon only)
- Cards are draggable via `@dnd-kit/core`
- When panel is **closed**, grid returns to current behavior (click to edit, no drag handles)

### Drag-and-Drop

- **Library**: `@dnd-kit/core` + `@dnd-kit/sortable`
- **Execution**: Pending state — slide shows "moving..." indicator at new position until backend confirms
- **Concurrency**: Grid is **locked** (DnD disabled, inputs disabled) while a file operation is in progress. Shows progress indicator.
- **Chat integration**: DnD operations are reflected as system messages in the chat log (e.g., "Moved slide 05-team from position 5 to position 3")
- No visual highlights on grid during chat confirmations — chat text is sufficient

### Reload Flow

1. User triggers operation (via chat or DnD)
2. Backend executes file operations (rename, config rewrite)
3. Backend sends `deck-changed` SSE event
4. Frontend saves chat state + panel state to localStorage
5. Frontend performs `window.location.reload()`
6. On mount: panel reopens, chat restores, grid reflects new deck state

---

## Files to Create / Modify

### New Files

| File | Purpose |
|------|---------|
| `src/builder/components/deck-chat-panel.tsx` | Collapsible right panel wrapper with toggle |
| `src/builder/components/deck-chat-thread.tsx` | Chat thread adapted for deck operations (text-only) |
| `src/builder/components/sortable-slide-grid.tsx` | DnD-enabled slide grid using @dnd-kit |
| `src/builder/components/sortable-slide-card.tsx` | Individual draggable slide card with handle + delete |
| `src/builder/hooks/use-deck-chat.ts` | Chat session + generation hook for `/api/deck-chat` |
| `src/builder/hooks/use-deck-operations.ts` | Grid lock state, pending operations, DnD handlers |
| `api/deck-chat.ts` (or equivalent server file) | New API endpoint |

### Modified Files

| File | Change |
|------|--------|
| `src/routes/builder/index.tsx` | Add panel toggle button, integrate DeckChatPanel + SortableSlideGrid, management mode logic |
| `package.json` | Add `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities` |

---

## Interaction Flows

### Chat: Reorder

```
User: "Move the team slide to position 3"
AI:   "I'll move slide 14-team from position 14 to position 3.
       This will renumber slides 03 through 14. Proceed?"
User: "yes"
AI:   [executes, page reloads]
       "Done. Slide is now at position 3."
```

### Chat: Delete

```
User: "Delete the intro slide"
AI:   "I'll delete slide 02-intro. This will renumber slides 03-18
       down by one. This cannot be undone. Confirm?"
User: "confirm"
AI:   [executes, page reloads]
       "Deleted. Deck now has 17 slides."
```

### Chat: Metadata Edit

```
User: "Rename slide 5's title to 'Our Journey'"
AI:   "I'll update slide 05-our-process:
       - title: 'Our Process' → 'Our Journey'
       - shortTitle: 'Process' → 'Journey'
       Proceed?"
User: "yes"
AI:   [executes, page reloads]
```

### DnD: Reorder

1. User drags slide card from position 8 to position 3
2. Card shows "moving..." badge at position 3
3. Grid locks (no further DnD, no delete buttons active)
4. Backend renames files, updates config
5. System message appears in chat: "Moved slide 08-features to position 3"
6. `deck-changed` event triggers reload
7. Grid shows new order, panel reopens

---

## Constraints

- No `as any`, `@ts-ignore`, or type suppression
- Reuse existing patterns (useResizable, ChatThread structure, SSE parsing)
- Grid lock is mandatory during file operations to prevent race conditions
- All operations go through skill logic — no direct file manipulation in the API handler
- Chat is text-only (no image support)
- Panel state and chat history survive page reloads via localStorage
