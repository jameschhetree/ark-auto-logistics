import { STAGE_LABELS, daysUntilTouch, type Contact, type Stage } from "@/lib/crm";

const STAGE_STYLES: Record<Stage, string> = {
  new: "bg-ark-blue/15 text-ark-blue border-ark-blue/40",
  contacted: "bg-ark-silver/10 text-ark-silver border-ark-silver/30",
  quoted: "bg-ark-gold/10 text-ark-gold border-ark-gold/40",
  negotiating: "bg-ark-gold/20 text-ark-gold border-ark-gold/60",
  won: "bg-green-500/10 text-green-400 border-green-500/40",
  lost: "bg-white/5 text-ark-muted border-ark-border",
};

export function StageBadge({ stage }: { stage: Stage }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider ${STAGE_STYLES[stage]}`}
    >
      {STAGE_LABELS[stage]}
    </span>
  );
}

export function CountdownBadge({ contact }: { contact: Contact }) {
  const days = daysUntilTouch(contact);
  if (days === null) {
    return <span className="text-xs text-ark-muted">no follow-up set</span>;
  }
  if (days < 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-ark-red px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-white">
        {-days}d overdue
      </span>
    );
  }
  if (days === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-ark-gold px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider text-ark-bg">
        due today
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold text-ark-muted">
      follow up in {days}d
    </span>
  );
}
