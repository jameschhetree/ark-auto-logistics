"use client";

import { removeContact } from "@/app/actions/crm";

export function DeleteButton({ contactId, name }: { contactId: string; name: string }) {
  return (
    <form
      action={removeContact}
      onSubmit={(e) => {
        if (!window.confirm(`Delete ${name} and their whole history?`)) {
          e.preventDefault();
        }
      }}
    >
      <input type="hidden" name="id" value={contactId} />
      <button
        type="submit"
        className="text-xs font-semibold text-ark-muted hover:text-ark-red transition-colors"
      >
        Delete contact
      </button>
    </form>
  );
}
