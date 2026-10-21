# StudyOrbital S8.2 — structure and profile system

StudyOrbital is a mobile-first JEE preparation workspace with Chapter Plan, Question Bank, Daily Log, My Tests, Analysis, Leave Records, To-do list, Data & Backup, and Personal Storage.

## S8.2 changes
- Navigation and actual section order are now consistent.
- Mobile destinations are grouped once in More; the legacy end-of-management note and repeated Home quick action are removed.
- To-do remains the same size and sits to the right of the Home greeting.
- Creator credits sit in one rectangular bottom panel with clear labels and restrained symbols.
- Account UI supports signup, sign-in, password recovery, editable profile name, per-user tracker sync, conflict protection and a private file bucket once configured.
- Existing tracker math, data schema and StudyOrbital storage keys are preserved.

## Deploy
Use the complete `StudyOrbital-S8.2-Structure-and-Profiles.zip` archive as the source package. For a targeted patch, follow `S8.2-CHANGED-FILES.txt`. Keep all app files at the repository root; retain `.github/workflows/static.yml` and set Pages source to GitHub Actions.

## Accounts
GitHub Pages itself does not provide authentication or a database. To activate real profiles and cross-device cloud saving, follow `AUTH-CLOUD-SETUP-S8.2.md` and run `supabase-schema.sql` in your own Supabase project. Do not paste service-role or secret keys into public files. Until live tests pass, cloud login/sync is not launch-certified; use JSON exports for backups.

## Validation
Run `python scripts/validate_release.py`. It checks HTML identifiers/assets, manifest, service-worker assets, JavaScript syntax, key preservation, navigation targets and presence of account safeguards. These are static checks, not a live backend security test.
