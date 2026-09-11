import Link from "next/link";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { isCrmSignedIn } from "@/lib/crm-session";
import {
  getContact,
  listQuotes,
  listTouches,
  type Quote,
  type Touch,
} from "@/lib/crm";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { ContactForm } from "../ContactForm";
import { CountdownBadge, StageBadge } from "../badges";
import { TouchForm } from "./TouchForm";
import { EmailSender, type TemplatePreview } from "./EmailSender";
import { DeleteButton } from "./DeleteButton";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | Ark CRM",
  robots: { index: false, follow: false },
};

function when(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/New_York",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if (!(await isCrmSignedIn())) redirect("/crm");

  const { id } = await params;
  const contact = await getContact(id);
  if (!contact) notFound();

  const [touches, quotes] = await Promise.all([
    listTouches(id).catch(() => [] as Touch[]),
    listQuotes(id).catch(() => [] as Quote[]),
  ]);

  // Recommended-for-this-stage templates first; the rest still available.
  const previews: TemplatePreview[] = EMAIL_TEMPLATES.map((t) => ({
    id: t.id,
    label: t.label,
    subject: t.subject(contact),
    body: t.text(contact),
    recommended: t.stages.includes(contact.stage),
  })).sort((a, b) => Number(b.recommended) - Number(a.recommended));

  return (
    <main className="pt-20">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <Link
          href="/crm"
          className="text-sm font-semibold text-ark-muted hover:text-white transition-colors"
        >
          &larr; All contacts
        </Link>

        <div className="mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-white">{contact.name}</h1>
            {contact.business && (
              <p className="text-sm text-ark-muted">{contact.business}</p>
            )}
          </div>
          <CountdownBadge contact={contact} />
        </div>
        <div className="mt-2">
          <StageBadge stage={contact.stage} />
        </div>

        {(contact.phone || contact.email) && (
          <div className="mt-4 flex divide-x divide-ark-border overflow-hidden rounded-xl border border-ark-border bg-ark-surface">
            {contact.phone && (
              <a
                href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="flex-1 py-3.5 text-center text-sm font-bold text-ark-silver hover:text-white transition-colors"
              >
                Call
              </a>
            )}
            {contact.phone && (
              <a
                href={`sms:${contact.phone.replace(/[^+\d]/g, "")}`}
                className="flex-1 py-3.5 text-center text-sm font-bold text-ark-silver hover:text-white transition-colors"
              >
                Text
              </a>
            )}
            {contact.email && (
              <a
                href={`mailto:${contact.email}`}
                className="flex-1 py-3.5 text-center text-sm font-bold text-ark-silver hover:text-white transition-colors"
              >
                Email
              </a>
            )}
          </div>
        )}

        <Section title="Log a touch">
          <TouchForm contactId={contact.id} />
        </Section>

        <Section title="Send a sequence email">
          <EmailSender
            contactId={contact.id}
            email={contact.email}
            previews={previews}
          />
        </Section>

        <Section title="Details">
          <ContactForm contact={contact} />
        </Section>

        {quotes.length > 0 && (
          <Section title="Quote requests">
            <ul className="space-y-3">
              {quotes.map((q) => (
                <li key={q.id} className="rounded-lg border border-ark-border bg-ark-bg p-4">
                  <p className="text-sm font-bold text-white">
                    {[q.vehicle_year, q.vehicle_make, q.vehicle_model]
                      .filter(Boolean)
                      .join(" ") || "Vehicle"}
                  </p>
                  <p className="mt-1 text-sm text-ark-muted">
                    {q.pickup_zip} &rarr; {q.delivery_zip} &middot; {q.transport_type}
                    {q.is_running === "no" && " · not running"}
                    {q.pickup_date && ` · pickup ${q.pickup_date}`}
                  </p>
                  <p className="mt-1 text-xs text-ark-muted">{when(q.created_at)}</p>
                </li>
              ))}
            </ul>
          </Section>
        )}

        <Section title="History">
          {touches.length === 0 ? (
            <p className="text-sm text-ark-muted">No touches logged yet.</p>
          ) : (
            <ul className="space-y-3">
              {touches.map((t) => (
                <li key={t.id} className="flex items-baseline gap-3">
                  <span className="shrink-0 rounded-full border border-ark-border px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ark-muted">
                    {t.kind}
                  </span>
                  <span className="min-w-0 flex-1 text-sm text-ark-silver">
                    {t.summary || "—"}
                  </span>
                  <span className="shrink-0 text-xs text-ark-muted">
                    {when(t.created_at)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Section>

        <div className="mt-10 flex justify-end">
          <DeleteButton contactId={contact.id} name={contact.name} />
        </div>
      </div>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-6 rounded-xl bg-ark-surface border border-ark-border p-4 sm:p-6">
      <h2 className="text-xs font-bold uppercase tracking-widest text-ark-muted">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}
