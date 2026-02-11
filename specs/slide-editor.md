# Slide Editor — Edit Mode for `/builder`

## Context

The `/builder` route currently supports creating new slides via a wireframe canvas + prompt flow. This spec adds **edit mode** — selecting an existing slide, viewing a live preview, and iterating on it through a chat thread that drives Claude Code CLI edits on the underlying TSX file.

After a create flow completes, the builder auto-transitions to edit mode for the newly created slide.

## Architecture

```
/builder (unified route, two modes)
  ├── Mode: CREATE (existing)
  │   ├── Left: Wireframe canvas (1920x1080 boxes)
  │   └── Right: Slide settings + prompt panel + generation panel
  │
  └── Mode: EDIT (new)
      ├── Left: Live inline preview (SlideScaler rendering the actual component)
      │         Hot-reloads via Vite HMR when Claude edits the TSX file
      └── Right: Unified sidebar
            ├── Slide picker (dropdown of all slides, with delete + reorder controls)
            ├── Chat thread (persisted per-slide in localStorage, wipeable)
            └── Streaming output (shows Claude's work in real-time)
```

**Builder server** gains a new endpoint: `POST /api/edit` — accepts a prompt + session ID, spawns `claude --resume <session_id>` (or `claude -p` for first message), streams SSE back. The prompt includes the file path so Claude knows which TSX to edit. Session IDs are managed client-side.

## Data Model

```typescript
// New types in src/builder/types.ts

type BuilderMode = "create" | "edit";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: number;
  sessionId: string;
  status: "pending" | "streaming" | "complete" | "error";
}

interface SlideEditInfo {
  slideNumber: number;
  fileKey: string;          // e.g. "05-stats"
  filePath: string;         // e.g. "src/deck/slides/05-stats.tsx"
  title: string;
}

interface EditSession {
  slideFileKey: string;
  sessionId: string | null;  // null until first response from Claude
  messages: ChatMessage[];
}
```

## Config Changes

Expose `fileKey` from `SLIDE_CONFIG` so the client can derive file paths:

```typescript
// src/deck/config.ts — make SlideConfig include fileKey
export interface SlideConfig {
  id: string;
  title: string;
  shortTitle: string;
  fileKey: string;  // NEW — e.g. "05-stats"
}
```

The client derives the full path: `src/deck/slides/${fileKey}.tsx`

## File Structure (new/modified files)

```
src/
  builder/
    types.ts                        # + BuilderMode, ChatMessage, SlideEditInfo, EditSession
    components/
      builder-layout.tsx            # Refactored: mode state, conditional left panel + sidebar
      slide-picker.tsx              # NEW: dropdown + delete/reorder controls
      slide-preview.tsx             # NEW: live inline preview via SlideScaler + HMR listener
      chat-thread.tsx               # NEW: scrollable message list + input
      edit-sidebar.tsx              # NEW: slide picker + chat + streaming output
    hooks/
      use-edit-session.ts           # NEW: session management, localStorage persistence, message dispatch
      use-slide-preview.ts          # NEW: HMR event listener, component reload trigger
      use-generation.ts             # Modified: support sessionId for --resume
  deck/
    config.ts                       # Modified: expose fileKey in public SlideConfig
scripts/
  builder-server.ts                 # Modified: add POST /api/edit with session support
```

## Key Components

### Slide Picker (`slide-picker.tsx`)

Dropdown populated from `SLIDE_CONFIG` (now includes `fileKey`). Displays slide number + title. Additional controls:

- **Delete**: confirmation dialog, then sends a prompt to Claude to invoke the `/remove-slide` skill
- **Reorder**: up/down arrows, sends a prompt to Claude to invoke `/reorder-slide`
- **"+ New Slide"**: switches back to create mode

When a slide is selected, the builder enters edit mode, loads chat history from localStorage, and renders the live preview.

### Slide Preview (`slide-preview.tsx`)

- Renders the selected slide component inline using the existing `SlideScaler`
- Uses `getSlideComponent(slideNumber)` to get the lazy/cached component
- Listens for Vite HMR updates on the slide module path via `import.meta.hot`:
  ```typescript
  // When Vite signals an HMR update for the slide file,
  // invalidate the component cache and force a re-render
  if (import.meta.hot) {
    import.meta.hot.on("vite:afterUpdate", (payload) => {
      const updatedModules = payload.updates.map(u => u.path);
      if (updatedModules.some(p => p.includes(fileKey))) {
        // Bust the cache in config.ts, re-import, force re-render
        incrementVersion(); // state counter to trigger React re-render
      }
    });
  }
  ```
- Wraps content in `<Suspense>` for the lazy component boundary

### Chat Thread (`chat-thread.tsx`)

- Scrollable list of messages (user messages right-aligned, assistant left-aligned)
- Text input at the bottom with send button
- Each assistant message shows streaming text that updates in real-time
- "Clear history" button in the header — wipes localStorage for this slide and resets sessionId
- Auto-scrolls to bottom on new messages

### Edit Sidebar (`edit-sidebar.tsx`)

Unified sidebar that replaces the create sidebar when in edit mode. Contains:
1. Slide picker (top)
2. Chat thread (main area, flex-1 to fill space)
3. Status indicator (generating/idle/error)

### Builder Layout (refactored `builder-layout.tsx`)

Top-level now manages `mode: "create" | "edit"` state:

```
mode === "create":
  Left panel:  Canvas (existing wireframe editor)
  Right panel: BoxProperties + PromptPanel + GenerationPanel (existing)

mode === "edit":
  Left panel:  SlidePreview (live rendered slide)
  Right panel: EditSidebar (slide picker + chat thread)
```

After a create flow's generation completes (status === "complete"):
- Parse the output to identify the created slide's file key
- Auto-switch to edit mode for that slide

## Session Management

Client-side. No server state.

1. User selects slide → check localStorage for `builder-chat-${fileKey}`
2. If history exists, restore messages and `sessionId`
3. First message: POST to `/api/edit` with `{ prompt, filePath }` — no sessionId
4. Server spawns `claude -p "<prompt>" --output-format stream-json --dangerously-skip-permissions`
5. Server parses the `init` event from Claude's stream-json to extract `session_id`
6. Server includes `session_id` in the SSE stream back to client
7. Client stores `sessionId`, persists to localStorage
8. Follow-up messages: POST with `{ prompt, filePath, sessionId }`
9. Server spawns `claude --resume <sessionId> -p "<prompt>" --output-format stream-json --dangerously-skip-permissions`

### Prompt Construction for Edits

First message includes file path context:
```
Edit the slide at src/deck/slides/05-stats.tsx.

<user's message>
```

Follow-up messages (with --resume, Claude has context):
```
<user's message>
```

### localStorage Schema

Key: `builder-chat-${fileKey}` (e.g., `builder-chat-05-stats`)

Value:
```json
{
  "sessionId": "abc-123-def",
  "messages": [
    {
      "id": "msg-1",
      "role": "user",
      "text": "Make the title bigger",
      "timestamp": 1707600000,
      "sessionId": "abc-123-def",
      "status": "complete"
    },
    {
      "id": "msg-2",
      "role": "assistant",
      "text": "I've updated the title font size from text-4xl to text-6xl...",
      "timestamp": 1707600005,
      "sessionId": "abc-123-def",
      "status": "complete"
    }
  ]
}
```

"Clear history" wipes this key and resets to a fresh session.

## Server Changes (`builder-server.ts`)

New endpoint alongside existing `POST /api/generate`:

```
POST /api/edit
Body: { prompt: string, filePath: string, sessionId?: string }
Response: SSE stream (same format as /api/generate)

Additional SSE event on init:
data: { "type": "session", "sessionId": "..." }
```

The server parses the `init` message from Claude's stream-json output to extract the session ID and forwards it as a `session` event before streaming the rest.

## Implementation Sequence

| Step | File | What |
|------|------|------|
| 1 | `src/builder/types.ts` | Add BuilderMode, ChatMessage, SlideEditInfo, EditSession types |
| 2 | `src/deck/config.ts` | Expose fileKey in public SlideConfig |
| 3 | `src/builder/hooks/use-edit-session.ts` | Session + localStorage persistence + message dispatch |
| 4 | `src/builder/hooks/use-slide-preview.ts` | HMR listener + component cache invalidation |
| 5 | `src/builder/hooks/use-generation.ts` | Add sessionId support, extract session from init event |
| 6 | `scripts/builder-server.ts` | Add POST /api/edit with --resume support + session extraction |
| 7 | `src/builder/components/slide-picker.tsx` | Slide dropdown + delete/reorder controls |
| 8 | `src/builder/components/slide-preview.tsx` | Live inline preview with HMR |
| 9 | `src/builder/components/chat-thread.tsx` | Message list + input |
| 10 | `src/builder/components/edit-sidebar.tsx` | Compose picker + chat + status |
| 11 | `src/builder/components/builder-layout.tsx` | Refactor for dual mode, auto-transition from create |
| 12 | Verify | `pnpm build`, test create → auto-edit flow, test chat iteration |

## Dev Server Integration

The `pnpm dev` script should also start the builder server. Modify `package.json`:

```json
"scripts": {
  "dev": "tsx scripts/builder-server.ts & vite dev --port 3000",
}
```

## Verification

1. `pnpm dev` → both Vite and builder server start
2. Navigate to `/builder` → create mode (existing wireframe flow)
3. Select a slide from the picker → switches to edit mode, live preview renders
4. Type "Make the title red" → Claude edits the TSX, preview hot-reloads
5. Type "Actually make it blue" → Claude resumes session, applies follow-up edit
6. Navigate away, come back, select same slide → chat history restored
7. Click "Clear history" → fresh session
8. Click "Delete" on a slide → confirmation → Claude runs /remove-slide
9. After create flow completes → auto-transitions to edit mode for the new slide
10. `pnpm build` → no type errors
