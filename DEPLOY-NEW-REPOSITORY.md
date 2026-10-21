# StudyOrbital S8.2 — deployment guide

## Replace files in the existing StudyOrbital repository

Do not change the separate `Mission-IIT` repository. Extract the S8.2 ZIP to inspect it, but for a low-risk patch replace only the files listed in `S8.2-CHANGED-FILES.txt`. Keep all files at the repository root as shown in the ZIP. The nested `scripts/validate_release.py` remains under `scripts/`.

The repository already uses `.github/workflows/static.yml`; do not create another Pages workflow. The provided ZIP retains that workflow file so a complete project archive remains coherent.

## Deploy

1. Commit the replacements to the repository's `main` branch.
2. Open **Actions** and wait for a green deployment check.
3. Open **Settings → Pages** and use the live site link. Refresh online once so the S8.2 service-worker cache replaces the earlier shell.
4. Test each navigation destination and the To-do control before using important study data.

## Login and cloud profiles

The signup, login, password recovery, profile edit, per-user cloud sync and private storage integration are included in code. Actual accounts cannot run until a Supabase project is configured. Follow `AUTH-CLOUD-SETUP-S8.2.md`, run `supabase-schema.sql`, and set your own Project URL and public Publishable key in `studyorbit-config.js`. Never put a service-role/secret key in the repository.

Until the backend is configured and the live acceptance tests pass, account sync is not active and local tracker data remains in that browser. Keep regular JSON exports.
