# StudyOrbital — S8.0 Professional Shell

## Design direction
A restrained, study-first workspace: clear hierarchy, dense-but-readable data, stable navigation, low visual noise, and motion only where it improves feedback. No mascot/cartoon aesthetic, decorative symbol rain, heavy glow, animated gradients, or glass-card overload.

## Design tokens

| Token | Value | Intended use |
|---|---|---|
| App background | `#0B1220` | Page canvas |
| Main surface | `#111C2D` | Sections and core cards |
| Raised surface | `#152238` | Selected navigation, form headers |
| Border | `#26374D` | Subtle separation |
| Primary text | `#EDF3FA` | Headings and high-priority data |
| Secondary text | `#9CAEC2` | Descriptions and helper text |
| Teal accent | `#56C6C0` | Active navigation, controls, progress |
| Success | `#73D4A2` | Saved/success status only |
| Caution | `#E8C27A` | Warnings where needed |

## Typography and layout
- System sans-serif stack for predictable rendering and no external font dependency.
- Small, consistent heading hierarchy; tabular figures for metrics; 8–14 px radii; 1 px borders; no default glow.
- Desktop: 224 px sidebar and one flexible content column; maximum workspace width 1480 px.
- Mobile: five-item bottom navigation, with overflow destinations in the More menu; one-column forms and horizontally scrollable existing tables.
- Search: section/action finder with `Ctrl+K` / `⌘K` shortcut, not a claim of full-text record search.

## Motion
- Brief 380 ms home entrance, no blocking splash screen.
- Home insight rotation every 12 seconds as an initial usability default; manual previous/next, dots, pause/resume, swipe, an action to open the related section, pause while hovered/focused, and stop while the page is backgrounded.
- `prefers-reduced-motion` disables automatic rotation and reduces CSS motion.
- No continuous decorative animation or background symbol generation.

## Home insights
Every displayed value comes from the existing tracker DOM or To-do records. Empty data produces a “No data / start logging” state instead of invented numbers. Existing tracker calculations are reused as-is; this shell does not define new study-score formulas.

## Navigation destinations
Overview, Chapter Plan, Question Bank, Daily Log, My Tests (existing Testing module), Analysis, Leave Records, Personal Storage, To-do List, and Data & Backup. Existing S7.9 tracker panels are hidden/shown without deleting their DOM or data; Personal Storage is an additive section with its own IndexedDB-backed notes/files.

## Current data / account boundary
S7.9 uses browser `localStorage` and its existing JSON snapshot format. It is not a secure multi-user authentication system and does not sync data across devices. The shell labels this fact explicitly. Email account flow, tracker cloud sync and private document upload/list/download/delete are scaffolded with Supabase. They require a configured backend, the included per-user RLS schema, and full launch verification before cloud behavior can be called production-ready. Without configuration, tracker data remains in localStorage and library items use IndexedDB.
