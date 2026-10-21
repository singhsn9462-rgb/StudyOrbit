# StudyOrbital S8.2 — structure and layout specification

## Visual system retained
- Existing dark navy/charcoal surfaces and restrained teal accent.
- Existing typography, card radii, control styling, table design and modal treatment retained.
- Existing calculation logic, tracker schema and saved-data keys retained.

## Information architecture
- Desktop sidebar: Home; Study (Chapter Plan, Question Bank, Daily Log); Performance (My Tests, Analysis); Records (Leave Records, Personal Storage, Data & Backup).
- Mobile bar: Home, Daily Log, My Tests, Analysis and More. Other destinations appear in the grouped More menu only; there is one menu source for all destinations.
- Main section order follows the navigation. Selecting a destination exposes only that destination's content.
- Removed the legacy “Main managing part END” scroll note and removed the repeated daily-log quick-action from Home. The real tracker dashboard remains the one source of preparation metrics.
- Global search remains a single header utility and uses the same destination list as the navigation.

## To-do placement
On Home, the existing To-do control sits to the right of the greeting/subtitle. Its 78 px by 88 px outer dimensions and established icon/label style are not enlarged. On other pages it returns to its existing floating position.

## Bottom creator panel
A single rectangular panel follows the content and stays at the bottom on short pages. It follows content on long pages. Architect, author tag, age and “Developed by Passion” are separated into clean text groups with restrained symbols. It is not a fixed overlay and does not cover tracker data.

## Profile system
- Profile display name is stored in Supabase Auth user metadata and can be edited from the account menu.
- Tracker JSON is stored per authenticated user with row-level security; the SQL schema requires `auth.uid() = user_id`.
- Account creation and cloud sync stay disabled until owner-controlled configuration is added. Static checks cannot certify live auth or two-user isolation.
