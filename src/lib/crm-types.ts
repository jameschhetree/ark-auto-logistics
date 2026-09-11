// Shared between server code and client components — no "server-only" here.

export const STAGES = [
  "new",
  "contacted",
  "quoted",
  "negotiating",
  "won",
  "lost",
] as const;
export type Stage = (typeof STAGES)[number];

export const STAGE_LABELS: Record<Stage, string> = {
  new: "New lead",
  contacted: "Contacted",
  quoted: "Quoted",
  negotiating: "Negotiating",
  won: "Customer",
  lost: "Lost",
};

export const TOUCH_KINDS = ["call", "text", "email", "note"] as const;
export type TouchKind = (typeof TOUCH_KINDS)[number];

export type Contact = {
  id: string;
  name: string;
  business: string | null;
  phone: string | null;
  email: string | null;
  stage: Stage;
  notes: string | null;
  cadence_days: number;
  next_touch_at: string | null;
  created_at: string;
  updated_at: string;
};

export type Touch = {
  id: string;
  contact_id: string;
  kind: TouchKind;
  summary: string | null;
  template: string | null;
  resend_id: string | null;
  created_at: string;
};

export type Quote = {
  id: string;
  contact_id: string | null;
  pickup_zip: string;
  delivery_zip: string;
  transport_type: string;
  vehicle_year: string | null;
  vehicle_make: string | null;
  vehicle_model: string | null;
  is_running: string | null;
  pickup_date: string | null;
  created_at: string;
};
