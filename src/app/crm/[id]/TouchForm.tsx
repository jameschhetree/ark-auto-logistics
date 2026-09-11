"use client";

import { useActionState } from "react";
import { addTouch, type FormState } from "@/app/actions/crm";
import { TOUCH_KINDS } from "@/lib/crm-types";

export function TouchForm({ contactId }: { contactId: string }) {
  const [state, action, pending] = useActionState<FormState, FormData>(addTouch, {});

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="id" value={contactId} />
      <div className="flex gap-3">
        <select
          name="kind"
          className="rounded-lg border border-ark-border bg-ark-bg px-3 py-3 text-base text-white"
        >
          {TOUCH_KINDS.map((k) => (
            <option key={k} value={k}>
              {k}
            </option>
          ))}
        </select>
        <input
          name="summary"
          placeholder="What happened?"
          className="min-w-0 flex-1 rounded-lg border border-ark-border bg-ark-bg px-3.5 py-3 text-base text-white placeholder:text-white/30"
        />
      </div>
      {state.error && <p className="text-sm text-ark-red">{state.error}</p>}
      {state.ok && <p className="text-sm text-green-400">{state.ok}</p>}
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg border border-ark-red px-5 py-3 text-base font-bold text-ark-red hover:bg-ark-red hover:text-white transition-colors disabled:opacity-60 sm:w-auto sm:px-6"
      >
        {pending ? "Logging…" : "Log touch + reset countdown"}
      </button>
    </form>
  );
}
