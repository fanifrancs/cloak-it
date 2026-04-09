create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  created_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),

  receiver_id uuid not null references profiles(id) on delete cascade,

  content text not null,

  is_anonymous boolean default true,

  created_at timestamptz not null default now()
);

---------------------------------------------------
---------------------------------------------------

-- Safe migration for existing databases:
-- run this once on your current database to preserve existing data while converting
-- old UTC timestamp values into timestamptz.

alter table profiles
  alter column created_at type timestamptz
  using created_at at time zone 'UTC';

alter table profiles
  alter column created_at set not null,
  alter column created_at set default now();

alter table messages
  alter column created_at type timestamptz
  using created_at at time zone 'UTC';

alter table messages
  alter column created_at set not null,
  alter column created_at set default now();

---------------------------------------------------
---------------------------------------------------

alter table messages enable row level security;

create policy "Users can view their messages"
on messages
for select
using (auth.uid() = receiver_id);

create policy "Anyone can send messages"
on messages
for insert
with check (true);
