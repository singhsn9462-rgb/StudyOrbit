# StudyOrbital — S8.0 Pre-launch Checklist

**Release rule:** deploy and test S8.0 in its new repository. Do not change the existing `Mission-IIT` repository. Treat S8.0 as launch-ready only after all required checks pass.

## 1. Local app and PWA

- [ ] Deploy this candidate to the new repository and keep `Mission-IIT` untouched.
- [ ] Open the direct Pages URL in Android Chrome and desktop browser; confirm there is no blank screen, stale shell, or endless loading indicator.
- [ ] Install/open the PWA shortcut; update from the previous version and confirm the new shell opens on the first navigation.
- [ ] Check Overview, Chapter Plan, Question Bank, Daily Log, My Tests, Analysis, Leave Records, To-do list, Data & Backup and Personal Storage.
- [ ] Add a test tracker record, edit it, reload, and confirm the record remains.
- [ ] Export the tracker JSON; restore it in the test copy and verify chapter, QB, Daily Log, test, leave and task records.
- [ ] Create/edit/download/delete a Personal Storage note and test a small allowed file; reload and confirm IndexedDB persistence.
- [ ] Test narrow mobile widths, desktop layout, search, keyboard focus and reduced-motion mode.

## 2. Account and private cloud (required before enabling config)

- [ ] Create an owner-controlled Supabase project; run and review `supabase-schema.sql`.
- [ ] Configure email confirmation, password recovery and the exact HTTPS GitHub Pages redirect URL.
- [ ] Fill `studyorbit-config.js` with the project URL, **Publishable** key and redirect URL. Never expose a `service_role` key.
- [ ] Test create account, confirmation email, sign-in, sign-out, password reset and new password.
- [ ] Verify user A cannot read, overwrite, list, download or delete user B's tracker row or private Storage objects.
- [ ] Test first sync with empty cloud, same local/cloud data, conflicting local/cloud data, switching accounts, offline changes and reconnect.
- [ ] Confirm local tracker data is archived/exported before any conflict replacement, and that no unsynced data is removed on sign-out.
- [ ] Test Personal Storage upload/list/download/delete and device-only copy into a user account.
- [ ] Check Supabase logs and run the project's RLS test suite before exposing accounts to other students.

## 3. Launch decision

- [ ] No console errors or failed same-origin app assets on a fresh install.
- [ ] No unwanted files removed; backup and rollback copy retained.
- [ ] No secrets in public source; all exposed tables and buckets have the expected access policies.
- [ ] Static validation, browser regression, storage/auth security checks and the final product review are complete.

## Known validation boundary

This candidate passed the automated static checks recorded in `S8.0-VALIDATION-RESULTS.txt`. Browser navigation in the build environment was blocked by administrator policy, and cloud end-to-end tests are impossible until an owner-controlled Supabase project is configured. Those checks remain open, so this ZIP is a **candidate for testing**, not yet a launch-certified release.
