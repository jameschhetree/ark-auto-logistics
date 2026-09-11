import "server-only";
import { getSupabase } from "@/lib/supabase";
import type { Contact, Quote, Stage, Touch, TouchKind } from "@/lib/crm-types";

export * from "@/lib/crm-types";

export function crmStorageConfigured() {
  return !!getSupabase();
}

function db() {
  const supabase = getSupabase();
  if (!supabase) throw new Error("SUPABASE_URL and SUPABASE_SERVICE_KEY must be set");
  return supabase;
}

/** Today's date in EST as YYYY-MM-DD — countdowns run on Ark's clock. */
export function todayEst() {
  return new Date().toLocaleDateString("en-CA", { timeZone: "America/New_York" });
}

export function addDays(date: string, days: number) {
  const d = new Date(`${date}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Days until next touch. Negative means overdue. Null when no date is set. */
export function daysUntilTouch(contact: Contact): number | null {
  if (!contact.next_touch_at) return null;
  const ms =
    new Date(`${contact.next_touch_at}T12:00:00Z`).getTime() -
    new Date(`${todayEst()}T12:00:00Z`).getTime();
  return Math.round(ms / 86_400_000);
}

/** Due-first: overdue, then due soon, then no-date, within that oldest first. */
export async function listContacts(): Promise<Contact[]> {
  const { data, error } = await db()
    .from("ark_contacts")
    .select("*")
    .order("next_touch_at", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });
  if (error) throw new Error(`could not load contacts: ${error.message}`);
  return data as Contact[];
}

export async function getContact(id: string): Promise<Contact | null> {
  const { data, error } = await db()
    .from("ark_contacts")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`could not load contact: ${error.message}`);
  return data as Contact | null;
}

export type NewContact = {
  name: string;
  business: string | null;
  phone: string | null;
  email: string | null;
  stage: Stage;
  notes: string | null;
  cadence_days: number;
  next_touch_at: string | null;
};

export async function createContact(contact: NewContact): Promise<string> {
  const { data, error } = await db()
    .from("ark_contacts")
    .insert(contact)
    .select("id")
    .single();
  if (error) throw new Error(`could not create contact: ${error.message}`);
  return data.id as string;
}

export async function updateContact(id: string, fields: Partial<NewContact>) {
  const { error } = await db()
    .from("ark_contacts")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(`could not update contact: ${error.message}`);
}

export async function deleteContact(id: string) {
  const { error } = await db().from("ark_contacts").delete().eq("id", id);
  if (error) throw new Error(`could not delete contact: ${error.message}`);
}

export async function listTouches(contactId: string): Promise<Touch[]> {
  const { data, error } = await db()
    .from("ark_touches")
    .select("*")
    .eq("contact_id", contactId)
    .order("created_at", { ascending: false })
    .limit(50);
  if (error) throw new Error(`could not load touches: ${error.message}`);
  return data as Touch[];
}

export async function listQuotes(contactId: string): Promise<Quote[]> {
  const { data, error } = await db()
    .from("ark_quotes")
    .select("*")
    .eq("contact_id", contactId)
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) throw new Error(`could not load quotes: ${error.message}`);
  return data as Quote[];
}

/**
 * Record a touch and roll the countdown: next_touch_at moves to today +
 * cadence_days. This is the whole re-engagement engine — every contact made
 * schedules the next one.
 */
export async function logTouch(
  contact: Contact,
  touch: { kind: TouchKind; summary: string | null; template?: string; resend_id?: string }
) {
  const { error } = await db().from("ark_touches").insert({
    contact_id: contact.id,
    kind: touch.kind,
    summary: touch.summary,
    template: touch.template ?? null,
    resend_id: touch.resend_id ?? null,
  });
  if (error) throw new Error(`could not log touch: ${error.message}`);
  await updateContact(contact.id, {
    next_touch_at: addDays(todayEst(), contact.cadence_days),
  });
}
