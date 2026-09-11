import Link from "next/link";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isCrmSignedIn } from "@/lib/crm-session";
import { ContactForm } from "../ContactForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "New contact | Ark CRM",
  robots: { index: false, follow: false },
};

export default async function NewContactPage() {
  if (!(await isCrmSignedIn())) redirect("/crm");

  return (
    <main className="pt-20">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-6">
        <Link
          href="/crm"
          className="text-sm font-semibold text-ark-muted hover:text-white transition-colors"
        >
          &larr; All contacts
        </Link>
        <h1 className="mt-4 text-2xl font-extrabold text-white">New contact</h1>
        <div className="mt-6 rounded-xl bg-ark-surface border border-ark-border p-4 sm:p-6">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
