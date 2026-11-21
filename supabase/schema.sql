create table if not exists public.focusgrid_backups (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.focusgrid_backups enable row level security;

create policy "backup_owner_select"
on public.focusgrid_backups for select
using (auth.uid() = user_id);

create policy "backup_owner_insert"
on public.focusgrid_backups for insert
with check (auth.uid() = user_id);

create policy "backup_owner_update"
on public.focusgrid_backups for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);
