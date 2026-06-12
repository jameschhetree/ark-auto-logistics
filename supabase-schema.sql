-- Ark Auto Logistics — Supabase schema
-- Run this in the Supabase SQL Editor after creating the project.

create table if not exists quotes (
  id bigint generated always as identity primary key,
  pickup_zip text not null,
  delivery_zip text not null,
  transport_type text not null default 'open',
  vehicle_year text,
  vehicle_make text,
  vehicle_model text,
  is_running text default 'yes',
  pickup_date text,
  name text not null,
  phone text not null,
  email text not null,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists contacts (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null unique,
  phone text,
  total_quotes int not null default 1,
  last_quote_date timestamptz not null default now(),
  notes text,
  created_at timestamptz not null default now()
);

create index idx_quotes_email on quotes(email);
create index idx_quotes_status on quotes(status);
create index idx_quotes_created on quotes(created_at desc);
create index idx_contacts_email on contacts(email);
