# StudyOrbital S8.0 — codebase map

This is a **separate-repository candidate** built from the S7.9 Physics Chapter List Update baseline. The original `Mission-IIT` repository is not modified. Existing tracker sections and calculations are retained behind a professional, mobile-first navigation shell.

## Files and load order

- `index.html` — original tracker markup and inline engine; chapter/stage plan; progress metrics; original JSON export/restore; service-worker registration.
- `studyorbit-features.js` / `.css` — existing Question Bank, Daily Log, Revision, Leave, Testing, Analysis, charts and record editing modules.
- `studyorbit-todo.js` / `.css` — existing task planner, carry-forward, history, undo and summary data.
- `studyorbit-library.js` / `.css` — additive Personal Storage for local notes and allowed reference files; optional private Supabase upload.
- `studyorbit-shell.js` / `.css` — navigation, home overview, section search, clickable insight cards and responsive behavior. It hides inactive panels; it does not delete their DOM or replace their calculations.
- `studyorbit-auth.js` / `.css` — optional account creation/login/recovery, account menu, conflict protection, tracker sync and private file flow. Inactive when `studyorbit-config.js` values are blank.
- `studyorbit-config.js` — public frontend configuration only. Keep it blank until the owner's Supabase project, policies and redirects are configured. Never place service-role/secret keys here.
- `supabase-schema.sql` — per-user tracker table, RLS policies and private Storage bucket/object policies.
- `sw.js` — network-first app-code fetch with bounded wait and offline fallback. S8.0 has a cache namespace isolated from the old project.
- `manifest.json`, `icon-*.png`, `studyorbit-*.png`, `.nojekyll` — PWA metadata and assets.
- `.github/workflows/deploy-pages.yml` — static validation and GitHub Pages deployment on pushes to `main`/`master` or manual workflow dispatch.
- `scripts/validate_release.py` — dependency-free checks for HTML IDs, local asset references, manifest icon references, Service Worker core files, and S8.0 storage/cache namespace isolation.
- `DEPLOY-NEW-REPOSITORY.md`, `AUTH-CLOUD-SETUP-S8.0.md`, `DESIGN-SYSTEM-S8.0.md`, `PRE-LAUNCH-CHECKLIST-S8.0.md` — operator docs.

## Storage and safety boundaries

S8.0 has intentionally unique storage namespaces because GitHub Pages project sites under the same username share the same web origin even when the repository paths differ:

- Tracker localStorage key: `studyorbitS80_private_workspace_v1`.
- Personal Storage IndexedDB database: `studyorbit-s80-private-library`.
- Auth metadata/archive keys: `studyorbit_s80_*`.
- Service Worker cache: `studyorbit-s80-shell-professional1`, with cleanup limited to `studyorbit-s80-shell-*`.

These names must not be changed back to S7.x names: the old Mission-IIT app must retain its own local data and Service Worker caches. Data transfer is opt-in through JSON export/restore; Personal Storage files require separate download/copy.

## Current limitations

The package passed static checks, but this does not prove browser behavior or security. Real-device visual/navigation testing and a live Supabase test with separate users remain open until the new repository is deployed and backend configuration is supplied. See the pre-launch checklist.
