"use client";

import { useActionState } from "react";
import { saveContact, type FormState } from "@/app/actions/crm";
import { STAGES, STAGE_LABELS, type Contact } from "@/lib/crm-types";

const field =
  "mt-1.5 w-full rounded-lg border border-ark-border bg-ark-bg px-3.5 py-3 text-base text-white placeholder:text-white/30";
const label = "block text-xs font-bold uppercase tracking-widest text-ark-muted";

export function ContactForm({ contact }: { contact?: Contact }) {
  const [state, action, pending] = useActionState<FormState, FormData>(saveContact, {});

  return (
    <form action={action} className="space-y-4">
      {contact && <input type="hidden" name="id" value={contact.id} />}

      <label className={label}>
        Name *
        <input name="name" required defaultValue={contact?.name ?? ""} className={field} />
      </label>
      <label className={label}>
        Business
        <input name="business" defaultValue={contact?.business ?? ""} className={field} />
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={label}>
          Phone
          <input
            name="phone"
            type="tel"
            inputMode="tel"
            defaultValue={contact?.phone ?? ""}
            className={field}
          />
        </label>
        <label className={label}>
          Email
          <input
            name="email"
            type="email"
            inputMode="email"
            defaultValue={contact?.email ?? ""}
            className={field}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <label className={label}>
          Stage
          <select name="stage" defaultValue={contact?.stage ?? "new"} className={field}>
            {STAGES.map((s) => (
              <option key={s} value={s}>
                {STAGE_LABELS[s]}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          Every (days)
          <input
            name="cadence_days"
            type="number"
            min={1}
            max={365}
            inputMode="numeric"
            defaultValue={contact?.cadence_days ?? 30}
            className={field}
          />
        </label>
        <label className={`${label} col-span-2 sm:col-span-1`}>
          Next follow-up
          <input
            name="next_touch_at"
            type="date"
            defaultValue={contact?.next_touch_at ?? ""}
            className={field}
          />
        </label>
      </div>
      <label className={label}>
        Notes
        <textarea
          name="notes"
          rows={3}
          defaultValue={contact?.notes ?? ""}
          className={field}
          placeholder="What are they shipping? What did they say?"
        />
      </label>

      {state.error && <p className="text-sm text-ark-red">{state.error}</p>}
      {state.ok && <p className="text-sm text-green-400">{state.ok}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-ark-red px-5 py-3 text-base font-bold text-white hover:bg-ark-red-dark transition-colors disabled:opacity-60 sm:w-auto sm:px-8"
      >
        {pending ? "Saving…" : contact ? "Save changes" : "Add contact"}
      </button>
    </form>
  );
}
