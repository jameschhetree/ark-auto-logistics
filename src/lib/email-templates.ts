import "server-only";
import type { Contact } from "@/lib/crm";

/**
 * The re-engagement sequence. Four stage-aware templates, sent one at a time
 * by a person who pressed a button — nothing here fires on a schedule.
 *
 * Deliberately plain: a follow-up from a transport broker should read like a
 * short personal email, not a marketing blast.
 */

export const EMAIL_FROM =
  process.env.CRM_EMAIL_FROM ?? "Ark Auto Logistics <bookings@highlifedmv.com>";

const PHONE = "(301) 407-8822";
const SIGNATURE_TEXT = `Ark Auto Logistics
${PHONE}
arkautologistics@gmail.com`;

export type EmailTemplate = {
  id: string;
  label: string;
  /** Which stages this template makes sense for; shown first on those. */
  stages: Contact["stage"][];
  subject: (c: Contact) => string;
  text: (c: Contact) => string;
};

function firstName(c: Contact) {
  return c.name.trim().split(/\s+/)[0] || "there";
}

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "quote_followup",
    label: "Quote follow-up",
    stages: ["new", "contacted", "quoted"],
    subject: () => "Your vehicle transport quote — Ark Auto Logistics",
    text: (c) => `Hi ${firstName(c)},

Just following up on the transport quote we discussed. Happy to answer any
questions, adjust dates, or lock in your spot on a carrier — schedules fill
up fast.

If anything has changed on your end, let me know and I'll re-price it.

You can reach me any time at ${PHONE}.

${SIGNATURE_TEXT}`,
  },
  {
    id: "check_in",
    label: "Monthly check-in",
    stages: ["contacted", "quoted", "negotiating"],
    subject: () => "Still need that vehicle moved?",
    text: (c) => `Hi ${firstName(c)},

Checking in — last time we spoke you were looking at moving a vehicle. If
the timing works now, I can get you an updated quote same day. Rates shift
month to month, so it's worth a fresh look.

No pressure either way. Reply here or call ${PHONE} whenever you're ready.

${SIGNATURE_TEXT}`,
  },
  {
    id: "reengage",
    label: "Re-engage (went cold)",
    stages: ["lost"],
    subject: () => "Whenever you're ready — Ark Auto Logistics",
    text: (c) => `Hi ${firstName(c)},

I know the timing didn't work out last time we talked. No hard feelings —
vehicles need moving when they need moving.

When it does come up again, I'd love another shot at it. Quotes are free
and take a few minutes: just reply here or call ${PHONE}.

${SIGNATURE_TEXT}`,
  },
  {
    id: "thank_you",
    label: "Thank you (after delivery)",
    stages: ["won"],
    subject: () => "Thanks for shipping with Ark Auto Logistics",
    text: (c) => `Hi ${firstName(c)},

Thank you for trusting us with your vehicle — it was a pleasure working
with you.

If you ever need another transport, you'll always get priority scheduling
as a returning customer. And if you know anyone who needs a vehicle moved,
we appreciate every referral.

${SIGNATURE_TEXT}`,
  },
];

export function getTemplate(id: string) {
  return EMAIL_TEMPLATES.find((t) => t.id === id) ?? null;
}

/** Same content as text, wrapped for email clients. */
export function renderHtml(body: string) {
  const escaped = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #111; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${escaped}</div>`;
}
