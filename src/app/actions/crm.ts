"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import {
  checkPassword,
  endCrmSession,
  requireCrm,
  startCrmSession,
} from "@/lib/crm-session";
import {
  STAGES,
  TOUCH_KINDS,
  createContact,
  deleteContact,
  getContact,
  logTouch,
  todayEst,
  updateContact,
  type Stage,
  type TouchKind,
} from "@/lib/crm";
import { EMAIL_FROM, getTemplate, renderHtml } from "@/lib/email-templates";

export type FormState = { error?: string; ok?: string };

export async function crmLogin(_prev: FormState, form: FormData): Promise<FormState> {
  const password = String(form.get("password") ?? "");
  if (!checkPassword(password)) {
    // One message for a wrong password and for not-configured: a login screen
    // should not tell an attacker which of the two it is.
    return { error: "That password is not right." };
  }
  await startCrmSession();
  redirect("/crm");
}

export async function crmLogout() {
  await endCrmSession();
  redirect("/crm");
}

function str(form: FormData, name: string) {
  const value = String(form.get(name) ?? "").trim();
  return value || null;
}

function parseContactFields(form: FormData) {
  const name = str(form, "name");
  if (!name) return { error: "Name is required." as const };

  const stage = String(form.get("stage") ?? "new") as Stage;
  if (!STAGES.includes(stage)) return { error: "Unknown stage." as const };

  const cadence = Number(form.get("cadence_days") ?? 30);
  if (!Number.isInteger(cadence) || cadence < 1 || cadence > 365) {
    return { error: "Follow-up cadence must be 1-365 days." as const };
  }

  const email = str(form, "email");
  if (email && !/^\S+@\S+\.\S+$/.test(email)) {
    return { error: "That email does not look right." as const };
  }

  const next = str(form, "next_touch_at");
  if (next && !/^\d{4}-\d{2}-\d{2}$/.test(next)) {
    return { error: "Next touch must be a date." as const };
  }

  return {
    fields: {
      name,
      business: str(form, "business"),
      phone: str(form, "phone"),
      email,
      stage,
      notes: str(form, "notes"),
      cadence_days: cadence,
      next_touch_at: next,
    },
  };
}

export async function saveContact(_prev: FormState, form: FormData): Promise<FormState> {
  await requireCrm();
  const parsed = parseContactFields(form);
  if ("error" in parsed) return { error: parsed.error };

  const id = str(form, "id");
  let newId: string | null = null;
  try {
    if (id) {
      await updateContact(id, parsed.fields);
    } else {
      // A brand-new contact with no follow-up date is due today, not never —
      // otherwise it disappears to the bottom of the list.
      newId = await createContact({
        ...parsed.fields,
        next_touch_at: parsed.fields.next_touch_at ?? todayEst(),
      });
    }
  } catch {
    return { error: "Could not save. Is storage configured?" };
  }
  revalidatePath("/crm");
  if (newId) redirect(`/crm/${newId}`);
  revalidatePath(`/crm/${id}`);
  return { ok: "Saved." };
}

export async function removeContact(form: FormData) {
  await requireCrm();
  const id = String(form.get("id") ?? "");
  if (id) await deleteContact(id);
  revalidatePath("/crm");
  redirect("/crm");
}

export async function addTouch(_prev: FormState, form: FormData): Promise<FormState> {
  await requireCrm();
  const id = String(form.get("id") ?? "");
  const kind = String(form.get("kind") ?? "note") as TouchKind;
  if (!TOUCH_KINDS.includes(kind)) return { error: "Unknown touch type." };

  const contact = await getContact(id);
  if (!contact) return { error: "Contact not found." };

  try {
    await logTouch(contact, { kind, summary: str(form, "summary") });
  } catch {
    return { error: "Could not log the touch." };
  }
  revalidatePath("/crm");
  revalidatePath(`/crm/${id}`);
  return { ok: "Logged — countdown reset." };
}

export async function sendSequenceEmail(
  _prev: FormState,
  form: FormData
): Promise<FormState> {
  await requireCrm();
  const id = String(form.get("id") ?? "");
  const templateId = String(form.get("template") ?? "");

  const contact = await getContact(id);
  if (!contact) return { error: "Contact not found." };
  if (!contact.email) return { error: "This contact has no email address." };

  const template = getTemplate(templateId);
  if (!template) return { error: "Pick a template first." };

  // The preview screen posts back with confirm=yes; a send without it is a
  // bug, not a shortcut. No email leaves without a human seeing it first.
  if (String(form.get("confirm")) !== "yes") return { error: "Not confirmed." };

  if (!process.env.RESEND_API_KEY) {
    return { error: "Email is not configured (RESEND_API_KEY missing)." };
  }

  const body = template.text(contact);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: EMAIL_FROM,
    to: [contact.email],
    subject: template.subject(contact),
    text: body,
    html: renderHtml(body),
    replyTo: "arkautologistics@gmail.com",
  });
  if (error) return { error: `Send failed: ${error.message}` };

  try {
    await logTouch(contact, {
      kind: "email",
      summary: `Sent "${template.label}"`,
      template: template.id,
      resend_id: data?.id,
    });
  } catch {
    // The email went out; a failed log line should not read as a failed send.
    return { ok: "Sent, but the touch log did not save." };
  }
  revalidatePath("/crm");
  revalidatePath(`/crm/${id}`);
  return { ok: `Sent to ${contact.email}.` };
}
