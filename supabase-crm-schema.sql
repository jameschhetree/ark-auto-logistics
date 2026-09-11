-- Ark Auto Logistics CRM — Supabase schema
-- Lives in the shared Supabase project (same one as singlecity_leads, oneblow_*,
-- wt_*), so every table is ark_-prefixed. Run in the Supabase SQL Editor.
--
-- RLS is enabled with no policies on every table: only the service key reaches
-- the data, and only from the server. These rows are real customers' names,
-- phone numbers and email addresses.
--
-- Replaces supabase-schema.sql, whose unprefixed quotes/contacts tables were
-- never created in any project.

create table if not exists ark_contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  business text,
  phone text,
  email text,
  stage text not null default 'new'
    check (stage in ('new', 'contacted', 'quoted', 'negotiating', 'won', 'lost')),
  notes text,
  -- The follow-up engine: "hit them up like 1x a month". Logging any touch
  -- rolls next_touch_at forward by cadence_days.
  cadence_days int not null default 30,
  next_touch_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists ark_contacts_next_touch_idx
  on ark_contacts (next_touch_at asc nulls last);
create index if not exists ark_contacts_email_idx on ark_contacts (email);

create table if not exists ark_touches (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid not null references ark_contacts(id) on delete cascade,
  kind text not null check (kind in ('call', 'text', 'email', 'note')),
  summary text,
  -- Set when the touch was a sequence email sent through Resend.
  template text,
  resend_id text,
  created_at timestamptz not null default now()
);

create index if not exists ark_touches_contact_idx
  on ark_touches (contact_id, created_at desc);

create table if not exists ark_quotes (
  id uuid primary key default gen_random_uuid(),
  contact_id uuid references ark_contacts(id) on delete set null,
  pickup_zip text not null,
  delivery_zip text not null,
  transport_type text not null default 'open',
  vehicle_year text,
  vehicle_make text,
  vehicle_model text,
  is_running text default 'yes',
  pickup_date text,
  created_at timestamptz not null default now()
);

create index if not exists ark_quotes_contact_idx on ark_quotes (contact_id);

alter table ark_contacts enable row level security;
alter table ark_touches enable row level security;
alter table ark_quotes enable row level security;
