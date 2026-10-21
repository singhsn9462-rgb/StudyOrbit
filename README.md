# StudyOrbital — S8.0 Professional Workspace

A mobile-first JEE preparation workspace with the existing Chapter Plan, Integrated Question Bank, Daily Log, Tests, Analysis, Leave records, To-do list and JSON backup, wrapped in a restrained navy/teal interface. It adds section search, a data-driven overview, Personal Storage, and an optional private Supabase account/sync layer.

## New repository — important isolation

This package is intended for a **separate GitHub repository**. The existing `Mission-IIT` project has not been edited. Browser storage and Service Worker cache names in this package are namespaced for S8.0, so the new app does not reuse the old app’s tracker key, IndexedDB database, or cache names. If you wish to move old tracker records, export a JSON backup in the old app and restore it manually inside S8.0. Personal Storage files are separate from tracker JSON and must be downloaded/copied separately.

## Quick launch

1. Extract the ZIP and upload **all extracted files and folders** into the root of a brand-new repository. Keep `.github/workflows/deploy-pages.yml` and `.nojekyll`. Do not upload the ZIP itself as a substitute for its contents.
2. In the new repository, open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**. The included workflow deploys the static app after each push to the default branch. See `DEPLOY-NEW-REPOSITORY.md`.
3. Open the new repository’s deployment URL on HTTPS and run the launch checklist before relying on the app.

## Data and account mode

- Tracker records are stored locally under the S8.0-specific localStorage key. JSON export/restore continues to work, but existing legacy backups should be imported only when intentionally migrating data.
- Personal Storage uses a separate S8.0 IndexedDB database for local notes/files. Those items are **not** included in tracker JSON backup; download important files separately.
- The sign-in, sign-up, recovery, per-user cloud sync and private file upload code is included but inactive until a project owner creates/configures the private Supabase backend. GitHub Pages does not provide a database or user authentication by itself.
- `studyorbit-config.js` accepts only a project URL, a frontend **Publishable** key and the exact redirect URL. Never place a Supabase `service_role` or secret key in frontend files. Run `supabase-schema.sql` in the owner’s Supabase project and follow `AUTH-CLOUD-SETUP-S8.0.md`.

## Design principles

- Dark navy/charcoal surfaces, restrained teal accent, consistent borders and compact typography.
- Simple desktop sidebar and mobile bottom navigation with a More menu.
- Insights use existing tracker values and explicitly show when data is missing; card rotation pauses for interaction, focus, page backgrounding and reduced-motion preference.
- Existing calculations and tracker data structure are retained where possible; navigation hides inactive sections rather than deleting them.

## Verification status

Static syntax, internal asset references, manifest JSON, CSS parsing, SQL policy structure and ZIP integrity were checked for this release candidate. A full real-browser visual test, live GitHub Pages test, and Supabase signup/data-isolation end-to-end test have **not** been completed here. Do not claim cloud login/sync is live until the owner configuration and launch checklist pass.
