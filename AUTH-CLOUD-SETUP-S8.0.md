# StudyOrbital S8.0 — account and cloud setup

The complete account UI and cloud integration are included, but remain deliberately **inactive** until you configure a backend you own. GitHub Pages hosts static files; it does not provide authentication or a database.

## One-time owner setup

1. Create a Supabase project under your own account.
2. Open its SQL Editor and run `supabase-schema.sql`. Confirm the tracker table has Row Level Security enabled and the `studyorbit-private` file bucket is private.
3. In Supabase Authentication settings, set the site URL and redirect allow-list to the **new repository's exact HTTPS GitHub Pages URL**, e.g. `https://USERNAME.github.io/REPOSITORY/`. Use the exact real URL after deployment; do not use the old `Mission-IIT` path unless the new repository genuinely has that name.
4. Edit `studyorbit-config.js`: set `supabaseUrl`, the project's frontend **Publishable** key, and `redirectUrl` to the exact URL from step 3. These are public frontend settings. Never put a `service_role` or secret key in HTML, JavaScript, GitHub Pages, or any public repository.
5. Deploy again so the config file reaches Pages. Run every account/security item in `PRE-LAUNCH-CHECKLIST-S8.0.md` before calling the service launch-ready.

## Data safety

- S8.0 uses localStorage key `studyorbitS80_private_workspace_v1`; its Personal Storage uses IndexedDB database `studyorbit-s80-private-library`. Both are distinct from the old app so a new GitHub Pages repository does not reuse the old app's local records.
- If you intentionally migrate old tracker data, export a JSON snapshot from the old app and restore it from S8.0's Data & Backup page. Always keep the original JSON backup. Personal Storage files are not included in tracker JSON; download/copy those separately.
- On first connection, differing meaningful tracker data triggers an explicit local-versus-cloud choice. The local version is archived/exported before cloud replacement. Never bypass this step in future refactors.
- Tracker rows are protected by `auth.uid()` row-level policies. File paths must begin with the signed-in user's UUID, and Storage policies enforce this. Keep RLS enabled.

## Do not skip end-to-end tests

Test create account, email verification, login, password recovery, account switching, first sync, conflicting local/cloud records, sign-out, offline/reconnect, and per-user file privacy with two separate test accounts. Cloud sync is not active just because the config values are present; it is active only after those tests pass.
