"use client";

import { useActionState } from "react";
import { crmLogin, type FormState } from "@/app/actions/crm";

export function CrmLogin() {
  const [state, action, pending] = useActionState<FormState, FormData>(crmLogin, {});

  return (
    <form action={action} className="mx-auto w-full max-w-sm">
      <div className="rounded-xl bg-ark-surface border border-ark-border p-6 sm:p-8">
        <h1 className="text-xl font-extrabold text-white">Ark CRM</h1>
        <p className="mt-1 text-sm text-ark-muted">Team access only.</p>
        <label className="mt-6 block text-xs font-bold uppercase tracking-widest text-ark-muted">
          Password
          <input
            type="password"
            name="password"
            required
            autoFocus
            autoComplete="current-password"
            className="mt-2 w-full rounded-lg border border-ark-border bg-ark-bg px-4 py-3 text-base text-white"
          />
        </label>
        {state.error && <p className="mt-3 text-sm text-ark-red">{state.error}</p>}
        <button
          type="submit"
          disabled={pending}
          className="mt-5 w-full rounded-lg bg-ark-red px-5 py-3 text-base font-bold text-white hover:bg-ark-red-dark transition-colors disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </div>
    </form>
  );
}
