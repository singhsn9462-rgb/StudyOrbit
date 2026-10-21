# StudyOrbital S8.1 pre-launch checklist

This release is a structure-refresh candidate. It is not launch-certified until the live Pages and cloud-account tests pass.

## Static / deployment
- [ ] `scripts/validate_release.py` passes.
- [ ] Actions deployment completes with a green tick.
- [ ] Open the live URL and hard-refresh once; confirm S8.1 appears.
- [ ] Test desktop navigation groups and the mobile More menu.
- [ ] Test Home, Chapter Plan, Question Bank, Daily Log, My Tests, Analysis, Leave Records, Data & Backup, and Personal Storage.
- [ ] Confirm the To-do trigger is to the right of the welcome message and still opens/closes the existing panel.
- [ ] Confirm creator credits appear once in the rectangular bottom panel.
- [ ] Test add/complete/carry-forward/undo for To-do, and export/restore test data using a backup copy.
- [ ] Confirm existing S8.0 tracker and Personal Storage data remain after updating.

## Account / cloud (requires owner-controlled Supabase project)
- [ ] Configure `studyorbit-config.js` with the project URL, Publishable key, and exact Pages redirect URL.
- [ ] Test sign-up, email verification, login, password recovery, password update, sign-out, and sign-in again.
- [ ] Use two test accounts to confirm user A cannot read user B's tracker data or private files.
- [ ] Test first sync, local/cloud conflict choice, offline edits/reconnect, and sync-failure messaging.
- [ ] Confirm cloud status is shown only after successful account activation.

## Known boundary
The frontend account/sync implementation is present, but this repository cannot activate it without project-owner configuration. A green GitHub Pages workflow tick does not mean login or cloud sync has been tested.
