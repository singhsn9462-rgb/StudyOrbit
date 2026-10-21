# StudyOrbital S8.1 codebase map

- `index.html` — legacy tracker records/form IDs and the app entry point. The existing tracker model and calculations are preserved.
- `studyorbit-shell.js` / `.css` — grouped navigation, simplified overview, global search, insights, responsive layout and bottom creator panel.
- `studyorbit-todo.js` / `.css` — To-do tasks. S8.1 docks the existing trigger into the greeting row without changing its size or task-data schema.
- `studyorbit-auth.js` / `.css` — account create/login/recovery, profile menu, sync status, conflict safeguards, and account-specific tracker sync. Requires configuration before it activates.
- `studyorbit-config.js` — public frontend configuration only; blank values until the owner configures Supabase. Never store a service-role/secret key here.
- `studyorbit-library.js` / `.css` — Personal Storage; local IndexedDB behavior and private-storage-related interface. Files are not part of the tracker JSON snapshot.
- `supabase-schema.sql` — user data table, Row Level Security policies, and private Storage bucket policies. Run in the owner’s Supabase project.
- `sw.js` — update-aware network-first Service Worker. S8.1 advances cache name and query versions while preserving the app's namespaced data keys.
- `.github/workflows/static.yml` — single Pages deployment workflow, named to match the workflow already created in this repository.
- `scripts/validate_release.py` — syntax, unique IDs, local asset paths, manifest, Service Worker, and policy structure checks.
- `AUTH-CLOUD-SETUP-S8.1.md`, `PRE-LAUNCH-CHECKLIST-S8.1.md`, `DESIGN-SYSTEM-S8.1.md` — owner/setup references.

S8.1 intentionally keeps the S8.0 localStorage key `studyorbitS80_private_workspace_v1` and IndexedDB key `studyorbit-s80-private-library` so app updates preserve existing StudyOrbital data. These remain isolated from Mission-IIT.
