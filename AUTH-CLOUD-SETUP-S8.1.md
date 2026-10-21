# StudyOrbital S8.1 — account and cloud setup

The account UI and cloud tracker sync are included, but remain inactive until a backend is configured. GitHub Pages only hosts static files; it does not supply authentication or a database.

## One-time owner setup
1. Create a Supabase project in your own account.
2. In its SQL Editor, run `supabase-schema.sql`. Verify `studyorbit_user_data` has Row Level Security enabled and the `studyorbit-private` storage bucket is private.
3. In Supabase Authentication settings, set the site URL and redirect allow-list to the exact new GitHub Pages HTTPS URL, including the repository path and trailing slash (for example, `https://USERNAME.github.io/REPOSITORY/`).
4. Edit `studyorbit-config.js` and set `supabaseUrl`, the frontend **Publishable** key, and `redirectUrl` to that exact URL. These are public frontend settings; never put a `service_role` or secret key in any public file.
5. Commit the updated config and wait for the GitHub Pages deployment.

## What the account system provides after setup
- Create profile with display name and email/password, plus email verification.
- Sign in, password recovery, and password update.
- Per-user tracker data stored in `studyorbit_user_data`, protected by `auth.uid()` row-level policies.
- Account menu with profile display and sign-out.
- Safeguards for existing local data versus cloud data: before either side replaces the other, the app offers a choice and attempts to archive/export the local copy.
- Local save while offline, with a cloud sync attempt on reconnect. Sync status messages report failures.

## Important limitations and checks
- Login/cross-device sync are not live until the owner's project details are configured and end-to-end tests pass. Until then, tracker data is stored in this browser only; export backups.
- Test create account, email verification, login, recovery, two separate accounts and data isolation, first sync, conflicting local/cloud records, sign-out, offline/reconnect, and per-user file privacy before using real records.
- `Personal Storage` content is still local IndexedDB data unless its own upload/sync operation is explicitly used; it is not part of the tracker JSON snapshot.
- S8.1 deliberately keeps S8.0 localStorage key `studyorbitS80_private_workspace_v1` and IndexedDB database `studyorbit-s80-private-library` to preserve this app's data. Both are still distinct from Mission-IIT.
