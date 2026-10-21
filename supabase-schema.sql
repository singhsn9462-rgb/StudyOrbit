-- StudyOrbital private account data. Run in the Supabase SQL Editor.
-- Keep the frontend on the Publishable key only. Never ship service_role keys.

create table if not exists public.studyorbit_user_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.studyorbit_user_data enable row level security;
revoke all on public.studyorbit_user_data from public, anon, authenticated;
grant select, insert, update on public.studyorbit_user_data to authenticated;

drop policy if exists "Users can read own StudyOrbital data" on public.studyorbit_user_data;
create policy "Users can read own StudyOrbital data"
  on public.studyorbit_user_data for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Users can insert own StudyOrbital data" on public.studyorbit_user_data;
create policy "Users can insert own StudyOrbital data"
  on public.studyorbit_user_data for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Users can update own StudyOrbital data" on public.studyorbit_user_data;
create policy "Users can update own StudyOrbital data"
  on public.studyorbit_user_data for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

-- Private file bucket for the future Personal Storage section. Files must live
-- in a first-level folder whose name is the signed-in user's UUID.
insert into storage.buckets (id, name, public, file_size_limit)
values ('studyorbit-private', 'studyorbit-private', false, 26214400)
on conflict (id) do update set public = false, file_size_limit = 26214400;

drop policy if exists "Users can list own StudyOrbital files" on storage.objects;
create policy "Users can list own StudyOrbital files"
  on storage.objects for select to authenticated
  using (bucket_id = 'studyorbit-private' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can upload own StudyOrbital files" on storage.objects;
create policy "Users can upload own StudyOrbital files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'studyorbit-private' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can update own StudyOrbital files" on storage.objects;
create policy "Users can update own StudyOrbital files"
  on storage.objects for update to authenticated
  using (bucket_id = 'studyorbit-private' and (storage.foldername(name))[1] = (select auth.uid())::text)
  with check (bucket_id = 'studyorbit-private' and (storage.foldername(name))[1] = (select auth.uid())::text);

drop policy if exists "Users can delete own StudyOrbital files" on storage.objects;
create policy "Users can delete own StudyOrbital files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'studyorbit-private' and (storage.foldername(name))[1] = (select auth.uid())::text);
