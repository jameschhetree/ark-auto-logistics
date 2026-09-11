import Link from "next/link";
import type { Metadata } from "next";
import { crmLogout } from "@/app/actions/crm";
import { crmConfigured, isCrmSignedIn } from "@/lib/crm-session";
import {
  STAGES,
  STAGE_LABELS,
  crmStorageConfigured,
  daysUntilTouch,
  listContacts,
  type Contact,
  type Stage,
} from "@/lib/crm";
import { CrmLogin } from "./CrmLogin";
import { CountdownBadge, StageBadge } from "./badges";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "CRM | Ark Auto Logistics",
  robots: { index: false, follow: false },
};

export default async function CrmPage({
  searchParams,
}: {
  searchParams: Promise<{ stage?: string }>;
}) {
  const signedIn = await isCrmSignedIn();

  if (!signedIn) {
    return (
      <main className="pt-20">
        <div className="mx-auto max-w-7xl px-4 py-16">
          {crmConfigured() ? (
            <CrmLogin />
          ) : (
            <p className="mx-auto max-w-sm rounded-xl bg-ark-surface border border-ark-border p-6 text-sm text-ark-muted">
              The CRM is switched off until a password is set. Nothing is
              exposed in the meantime.
            </p>
          )}
        </div>
      </main>
    );
  }

  const { stage } = await searchParams;
  const stageFilter = STAGES.includes(stage as Stage) ? (stage as Stage) : null;

  return (
    <main className="pt-20">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <div className="flex items-center justify-between gap-3">
          <h1 className="text-2xl font-extrabold text-white">Ark CRM</h1>
          <div className="flex items-center gap-3">
            <Link
              href="/crm/new"
              className="rounded-lg bg-ark-red px-4 py-2.5 text-sm font-bold text-white hover:bg-ark-red-dark transition-colors"
            >
              + Contact
            </Link>
            <form action={crmLogout}>
              <button
                type="submit"
                className="text-xs font-semibold text-ark-muted hover:text-white transition-colors"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>

        <ContactList stageFilter={stageFilter} />
      </div>
    </main>
  );
}

async function ContactList({ stageFilter }: { stageFilter: Stage | null }) {
  if (!crmStorageConfigured()) {
    return (
      <p className="mt-8 rounded-xl bg-ark-surface border border-ark-border p-6 text-sm text-ark-muted">
        Storage is not configured (SUPABASE_URL / SUPABASE_SERVICE_KEY), so
        nothing can be listed yet.
      </p>
    );
  }

  let contacts: Contact[];
  try {
    contacts = await listContacts();
  } catch {
    return (
      <p className="mt-8 rounded-xl bg-ark-surface border border-ark-border p-6 text-sm text-ark-muted">
        Could not load contacts right now.
      </p>
    );
  }

  const due = contacts.filter((c) => {
    const d = daysUntilTouch(c);
    return d !== null && d <= 0;
  }).length;

  const shown = stageFilter
    ? contacts.filter((c) => c.stage === stageFilter)
    : contacts;

  return (
    <>
      <p className="mt-2 text-sm text-ark-muted">
        {due === 0
          ? "Nobody is due for a follow-up. All caught up."
          : `${due} contact${due === 1 ? "" : "s"} due for a follow-up.`}
      </p>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        <FilterChip href="/crm" active={!stageFilter} label={`All (${contacts.length})`} />
        {STAGES.map((s) => {
          const count = contacts.filter((c) => c.stage === s).length;
          if (count === 0) return null;
          return (
            <FilterChip
              key={s}
              href={`/crm?stage=${s}`}
              active={stageFilter === s}
              label={`${STAGE_LABELS[s]} (${count})`}
            />
          );
        })}
      </div>

      {shown.length === 0 ? (
        <p className="mt-8 rounded-xl bg-ark-surface border border-ark-border p-6 text-sm text-ark-muted">
          No contacts here yet. Add one with the + Contact button — quote form
          submissions land here on their own.
        </p>
      ) : (
        <ul className="mt-4 space-y-3">
          {shown.map((c) => (
            <ContactCard key={c.id} contact={c} />
          ))}
        </ul>
      )}
    </>
  );
}

function FilterChip({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
        active
          ? "border-ark-red bg-ark-red/15 text-white"
          : "border-ark-border text-ark-muted hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  return (
    <li className="rounded-xl bg-ark-surface border border-ark-border hover:border-ark-red/40 transition-colors">
      <Link href={`/crm/${contact.id}`} className="block p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-white">{contact.name}</p>
            {contact.business && (
              <p className="truncate text-sm text-ark-muted">{contact.business}</p>
            )}
          </div>
          <CountdownBadge contact={contact} />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <StageBadge stage={contact.stage} />
          <span className="text-xs text-ark-muted">
            every {contact.cadence_days}d
          </span>
        </div>
      </Link>
      {(contact.phone || contact.email) && (
        <div className="flex divide-x divide-ark-border border-t border-ark-border">
          {contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex-1 py-3 text-center text-sm font-bold text-ark-silver hover:text-white transition-colors"
            >
              Call
            </a>
          )}
          {contact.phone && (
            <a
              href={`sms:${contact.phone.replace(/[^+\d]/g, "")}`}
              className="flex-1 py-3 text-center text-sm font-bold text-ark-silver hover:text-white transition-colors"
            >
              Text
            </a>
          )}
          {contact.email && (
            <a
              href={`mailto:${contact.email}`}
              className="flex-1 py-3 text-center text-sm font-bold text-ark-silver hover:text-white transition-colors"
            >
              Email
            </a>
          )}
        </div>
      )}
    </li>
  );
}
