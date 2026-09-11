"use client";

import { useActionState, useState } from "react";
import { sendSequenceEmail, type FormState } from "@/app/actions/crm";

export type TemplatePreview = {
  id: string;
  label: string;
  subject: string;
  body: string;
  recommended: boolean;
};

/**
 * Two steps by design: pick a template, read the exact email, then confirm.
 * Nothing sends until a person has seen the words that will land in a real
 * customer's inbox.
 */
export function EmailSender({
  contactId,
  email,
  previews,
}: {
  contactId: string;
  email: string | null;
  previews: TemplatePreview[];
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const [state, action, pending] = useActionState<FormState, FormData>(
    sendSequenceEmail,
    {}
  );

  if (!email) {
    return (
      <p className="text-sm text-ark-muted">
        Add an email address to this contact to send sequence emails.
      </p>
    );
  }

  const preview = previews.find((p) => p.id === selected) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {previews.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setSelected(p.id === selected ? null : p.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
              p.id === selected
                ? "border-ark-red bg-ark-red/15 text-white"
                : p.recommended
                  ? "border-ark-gold/50 text-ark-gold hover:text-white"
                  : "border-ark-border text-ark-muted hover:text-white"
            }`}
          >
            {p.label}
            {p.recommended && p.id !== selected ? " ★" : ""}
          </button>
        ))}
      </div>

      {preview && (
        <div className="rounded-lg border border-ark-border bg-ark-bg p-4">
          <p className="text-xs text-ark-muted">
            To: <span className="text-ark-silver">{email}</span>
          </p>
          <p className="mt-1 text-sm font-bold text-white">{preview.subject}</p>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-ark-silver">
            {preview.body}
          </pre>
          <form action={action} className="mt-4">
            <input type="hidden" name="id" value={contactId} />
            <input type="hidden" name="template" value={preview.id} />
            <input type="hidden" name="confirm" value="yes" />
            <button
              type="submit"
              disabled={pending}
              className="w-full rounded-lg bg-ark-red px-5 py-3 text-base font-bold text-white hover:bg-ark-red-dark transition-colors disabled:opacity-60 sm:w-auto sm:px-6"
            >
              {pending ? "Sending…" : "Send this email"}
            </button>
          </form>
        </div>
      )}

      {state.error && <p className="text-sm text-ark-red">{state.error}</p>}
      {state.ok && <p className="text-sm text-green-400">{state.ok}</p>}
    </div>
  );
}
