# StudyOrbital S8.2 — account, profile and cloud-data setup

## Important
GitHub Pages is a static host; it does not provide a login server or database. The account system is included in this release, but it becomes active only after the owner connects a Supabase project. Until then, the app clearly shows **Account setup** and continues saving on the current device.

## One-time setup (owner only)

1. Create a Supabase project in your own account and wait until the project is ready.
2. Open **SQL Editor** in that project, paste the complete `supabase-schema.sql` file and run it. It creates the per-user tracker row with Row Level Security and a **private** file bucket.
3. Open **Authentication → Providers** and make sure Email/password sign-in is enabled. Keep email verification enabled for real use.
4. In **Authentication → URL Configuration**, set the Site URL to the exact StudyOrbital GitHub Pages URL. Also add that exact URL as an allowed redirect URL, including the repository path and trailing slash, for example `https://USERNAME.github.io/REPOSITORY/`.
5. In **Project Settings → API**, copy the Project URL and the frontend **Publishable** key. Never copy a `service_role` or secret key.
6. Edit `studyorbit-config.js` in the repository and fill these three values:

   ```js
   window.STUDYORBIT_CONFIG = Object.freeze({
     supabaseUrl: 'https://YOUR-PROJECT.supabase.co',
     supabasePublishableKey: 'sb_publishable_YOUR_PUBLIC_KEY',
     redirectUrl: 'https://USERNAME.github.io/REPOSITORY/'
   });
   ```

   Use the exact URL and Publishable key from your own project. The example values above are placeholders, not working credentials.
7. Commit and deploy. In the app header, **Account setup** should be replaced by the account/signup flow. If it still appears, the config values are missing or invalid, or the newest deployment has not loaded.

## Included account features
- Signup with display name, email and password, with email-verification handling.
- Sign in, forgot-password email, and password update after recovery.
- Account menu showing the signed-in profile; profile display name can be edited.
- Tracker snapshot stored against the signed-in user's own `user_id`; database policies compare that ID with `auth.uid()`.
- Local/cloud conflict choice and a local archive before replacing one copy with the other.
- Debounced cloud sync when online, local edits while offline, reconnect sync, and visible sync-error messages.
- Separate per-user storage paths for Personal Storage uploads.

## Live acceptance test (must be done after setup)
1. Create a test account with a display name and verify the email.
2. Sign in, edit the profile name, add a harmless test record, and wait for **All changes synced**.
3. Sign out, sign in again, and confirm the test record returns.
4. Sign in on a second device/browser using the same account and confirm the record loads.
5. Make a second test account and confirm it does not see the first account's record or files.
6. Test password recovery, local/cloud conflict choice, offline edit/reconnect, and a failed-network message.
7. Test export/restore using a backup copy. Do not test restore on the only copy of important records.

## Data boundary
Until these tests pass, do not treat cloud sync as launch-certified. In local-only mode the tracker is saved in the current browser only; export backups regularly. Personal Storage maintains its own IndexedDB copy and uses the private bucket only when account configuration and online upload are active. Keep the Supabase project active and retain access to its owner account for continued service.
