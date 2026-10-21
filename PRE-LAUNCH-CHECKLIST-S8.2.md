# StudyOrbital S8.2 pre-launch checklist

## Static checks
- [ ] Run `python scripts/validate_release.py` successfully.
- [ ] Confirm Actions deployment finishes with a green check.
- [ ] Open the live Pages URL online and verify the model label says S8.2.
- [ ] Check section order and navigation on mobile and desktop.
- [ ] Confirm Home has only the greeting + overview dashboard, and the To-do control sits at right with the same dimensions.
- [ ] Confirm credit panel appears once at page bottom on short and long pages.
- [ ] Open all destinations: Chapter Plan, Question Bank, Daily Log, My Tests, Analysis, Leave Records, Personal Storage, Data & Backup.
- [ ] Add a harmless test record, export JSON, and test restore with a copy.
- [ ] Confirm existing S8.0 tracker and library keys are still present.

## Account/cloud checks (requires the owner's Supabase project)
- [ ] Enter own Project URL and Publishable key in `studyorbit-config.js`.
- [ ] Run `supabase-schema.sql`; verify RLS is enabled and Storage bucket is private.
- [ ] Test signup, verification, login, profile rename, password recovery/update and sign-out.
- [ ] Confirm first sync works and cloud data reloads after sign-in.
- [ ] Test local/cloud conflict choice and verify no data silently overwrites the other copy.
- [ ] Use two test accounts to confirm data/file isolation.
- [ ] Test offline edit, reconnect, and error messages.
- [ ] Test the same account in a second browser/device.

## Release status boundary
A green GitHub Actions tick proves deployment only. It does not prove authentication, permanent cloud persistence, real-browser interactions or data isolation. Declare launch-ready only after the live checks above pass.
