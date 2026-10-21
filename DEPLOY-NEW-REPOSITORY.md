# New repository launch — short steps

## 1. Create the repository

- Create a **new** GitHub repository (suggested name: `StudyOrbital`).
- For the simplest GitHub Free Pages setup, make it public.
- Leave the old `Mission-IIT` repository untouched.

## 2. Upload the app files

- Extract `StudyOrbital-S8.0-New-Repository-Pack.zip` on your phone/computer.
- Upload the **contents** of the extracted folder to the root of the new repository. The root should show `index.html`, `sw.js`, `manifest.json`, all `studyorbit-*.js/css`, image files, `.nojekyll`, and the `.github/workflows/deploy-pages.yml` workflow.
- Do not create an extra folder layer around these files. Keep the filenames unchanged.
- Commit the upload to `main` (or `master`).

## 3. Enable deployment

- Open the new repository → **Settings → Pages**.
- Under **Build and deployment → Source**, choose **GitHub Actions**.
- Open **Actions**. The `Deploy StudyOrbital` workflow should run on the first push. Wait until it shows success.
- The live URL is shown by the workflow and under Settings → Pages; it normally looks like `https://USERNAME.github.io/REPOSITORY/`.

## 4. Verify before everyday use

- Open the URL in Chrome and check navigation, Chapter Plan, question bank, Daily Log, tests, Analysis, To-do, backup/restore and Personal Storage.
- Export an S8.0 JSON backup after entering test data. Verify restored data, then remove the test data.
- Install/add to Home Screen only after the web version passes. Test an update and a fresh opening after deployment. Do **not** clear browser/site storage as a first troubleshooting step; it can erase local study records.

## 5. Enable secure account login and cloud sync (one-time owner setup)

This is the only part that cannot be finished from the ZIP alone because it needs a backend project owned by you. Follow `AUTH-CLOUD-SETUP-S8.0.md`: create a Supabase project, run `supabase-schema.sql`, set the exact new GitHub Pages URL as an auth redirect, then add the project URL, Publishable key and redirect URL to `studyorbit-config.js`. Use **only** the frontend Publishable key—never a `service_role` or secret key. Test sign-up, email confirmation, recovery, conflict handling, data isolation, sign-out and file privacy before allowing real records into the cloud.

## Important privacy distinction

Because GitHub Pages project sites under the same account share the same origin, this S8.0 package uses separate browser storage and cache namespaces. The existing Mission-IIT app is not part of this package and its files are not changed. Data migration only occurs if you deliberately export and restore it.
