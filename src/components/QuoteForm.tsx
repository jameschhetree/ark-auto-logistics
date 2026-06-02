"use client";

import { useState, FormEvent } from "react";
import Image from "next/image";

interface FormData {
  pickupZip: string;
  deliveryZip: string;
  transportType: "open" | "enclosed";
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  isRunning: "yes" | "no";
  pickupDate: string;
  name: string;
  phone: string;
  email: string;
}

const INITIAL: FormData = {
  pickupZip: "",
  deliveryZip: "",
  transportType: "open",
  vehicleYear: "",
  vehicleMake: "",
  vehicleModel: "",
  isRunning: "yes",
  pickupDate: "",
  name: "",
  phone: "",
  email: "",
};

export function QuoteForm({ variant = "stepped" }: { variant?: "stepped" | "full" }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canNext1 = form.pickupZip.length >= 5 && form.deliveryZip.length >= 5;
  const canNext2 =
    form.vehicleYear.length === 4 &&
    form.vehicleMake.trim() !== "" &&
    form.vehicleModel.trim() !== "";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Failed to send quote request");
      }
      setStatus("sent");
      setForm(INITIAL);
      setStep(1);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl bg-ark-surface/90 backdrop-blur-xl border border-ark-border p-8 text-center">
        <div className="mx-auto w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Quote Request Sent!</h3>
        <p className="text-ark-muted text-sm mb-6">
          We&apos;ll get back to you within 30 minutes during business hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="text-sm text-ark-red hover:text-ark-red-dark font-semibold transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  // Full variant (contact page): all fields visible at once
  if (variant === "full") {
    return (
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Pickup ZIP Code" value={form.pickupZip} onChange={(v) => update("pickupZip", v)} placeholder="Enter ZIP code" required maxLength={5} />
          <Input label="Delivery ZIP Code" value={form.deliveryZip} onChange={(v) => update("deliveryZip", v)} placeholder="Enter ZIP code" required maxLength={5} />
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-ark-silver mb-2">Transport Type</legend>
          <div className="flex gap-6">
            <RadioOption name="transportType" value="open" label="Open" checked={form.transportType === "open"} onChange={() => update("transportType", "open")} />
            <RadioOption name="transportType" value="enclosed" label="Enclosed" checked={form.transportType === "enclosed"} onChange={() => update("transportType", "enclosed")} />
          </div>
        </fieldset>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Vehicle Year" value={form.vehicleYear} onChange={(v) => update("vehicleYear", v)} placeholder="2024" required maxLength={4} />
          <Input label="Vehicle Make" value={form.vehicleMake} onChange={(v) => update("vehicleMake", v)} placeholder="Toyota" required />
          <Input label="Vehicle Model" value={form.vehicleModel} onChange={(v) => update("vehicleModel", v)} placeholder="Camry" required />
        </div>
        <fieldset>
          <legend className="text-sm font-semibold text-ark-silver mb-2">Is the vehicle running?</legend>
          <div className="flex gap-6">
            <RadioOption name="isRunning" value="yes" label="Yes" checked={form.isRunning === "yes"} onChange={() => update("isRunning", "yes")} />
            <RadioOption name="isRunning" value="no" label="No" checked={form.isRunning === "no"} onChange={() => update("isRunning", "no")} />
          </div>
        </fieldset>
        <Input label="Preferred Pickup Date" type="date" value={form.pickupDate} onChange={(v) => update("pickupDate", v)} />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Full Name" value={form.name} onChange={(v) => update("name", v)} placeholder="John Doe" required />
          <Input label="Phone Number" value={form.phone} onChange={(v) => update("phone", v)} placeholder="(555) 000-0000" required />
          <Input label="Email Address" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="john@example.com" required />
        </div>
        {status === "error" && (
          <p className="text-red-400 text-sm">{errorMsg}</p>
        )}
        <button
          type="submit"
          disabled={status === "sending"}
          className="w-full rounded-lg bg-ark-red py-4 text-lg font-bold text-white hover:bg-ark-red-dark transition-colors disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Get My Free Quote"}
        </button>
      </form>
    );
  }

  // Stepped variant (hero inline form)
  return (
    <div className="rounded-2xl bg-ark-surface/90 backdrop-blur-xl border border-ark-border overflow-hidden">
      {/* Header */}
      <div className="px-6 pt-6 pb-4 text-center">
        <p className="text-sm text-ark-muted mb-1">
          Get your quote now or contact us directly!
        </p>
        <a href="tel:9701858550" className="text-ark-red font-bold text-lg hover:text-ark-red-dark transition-colors">
          (970) 185-8550
        </a>
      </div>

      {/* Yellow CTA banner */}
      <a
        href="tel:9701858550"
        className="flex items-center justify-center gap-3 bg-ark-gold hover:bg-ark-gold-dark transition-colors py-3 px-4"
      >
        <Image src="/banner.webp" alt="Call Now & Get A Quote (970) 185-8550" width={500} height={60} className="h-10 w-auto" />
      </a>

      {/* Step indicator */}
      <div className="px-6 pt-5 pb-2">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-bold text-white">
            {step === 1 && "Step 1: Travel Info"}
            {step === 2 && "Step 2: Vehicle Info"}
            {step === 3 && "Step 3: Your Details"}
          </span>
          <span className="text-xs text-ark-muted">{step}/3</span>
        </div>
        {/* Progress bar */}
        <div className="h-1.5 rounded-full bg-ark-border overflow-hidden">
          <div
            className="h-full rounded-full bg-ark-red transition-all duration-500 ease-out"
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>
      </div>

      {/* Form steps */}
      <form onSubmit={handleSubmit} className="px-6 pb-6 pt-2">
        {step === 1 && (
          <div className="space-y-4">
            <Input
              label="From (Pickup Zipcode)*"
              value={form.pickupZip}
              onChange={(v) => update("pickupZip", v)}
              placeholder="Enter ZIP code"
              required
              maxLength={5}
              accent
            />
            <Input
              label="To (Delivery Zipcode)*"
              value={form.deliveryZip}
              onChange={(v) => update("deliveryZip", v)}
              placeholder="Enter ZIP code"
              required
              maxLength={5}
              accent
            />
            <fieldset>
              <legend className="text-sm font-semibold text-ark-silver mb-2">Transport Type:</legend>
              <div className="flex gap-6">
                <RadioOption name="transportType" value="open" label="Open" checked={form.transportType === "open"} onChange={() => update("transportType", "open")} />
                <RadioOption name="transportType" value="enclosed" label="Enclosed" checked={form.transportType === "enclosed"} onChange={() => update("transportType", "enclosed")} />
              </div>
            </fieldset>
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!canNext1}
              className="w-full rounded-lg bg-ark-red py-3.5 text-base font-bold text-white hover:bg-ark-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <Input label="Vehicle Year*" value={form.vehicleYear} onChange={(v) => update("vehicleYear", v)} placeholder="2024" required maxLength={4} accent />
            <Input label="Vehicle Make*" value={form.vehicleMake} onChange={(v) => update("vehicleMake", v)} placeholder="Toyota" required accent />
            <Input label="Vehicle Model*" value={form.vehicleModel} onChange={(v) => update("vehicleModel", v)} placeholder="Camry" required accent />
            <fieldset>
              <legend className="text-sm font-semibold text-ark-silver mb-2">Is the vehicle running?</legend>
              <div className="flex gap-6">
                <RadioOption name="isRunning" value="yes" label="Yes" checked={form.isRunning === "yes"} onChange={() => update("isRunning", "yes")} />
                <RadioOption name="isRunning" value="no" label="No" checked={form.isRunning === "no"} onChange={() => update("isRunning", "no")} />
              </div>
            </fieldset>
            <Input label="Preferred Pickup Date" type="date" value={form.pickupDate} onChange={(v) => update("pickupDate", v)} accent />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 rounded-lg border border-ark-border py-3.5 text-base font-semibold text-ark-silver hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                disabled={!canNext2}
                className="flex-1 rounded-lg bg-ark-red py-3.5 text-base font-bold text-white hover:bg-ark-red-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <Input label="Full Name*" value={form.name} onChange={(v) => update("name", v)} placeholder="John Doe" required accent />
            <Input label="Phone Number*" value={form.phone} onChange={(v) => update("phone", v)} placeholder="(555) 000-0000" required accent />
            <Input label="Email Address*" type="email" value={form.email} onChange={(v) => update("email", v)} placeholder="john@example.com" required accent />
            {status === "error" && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex-1 rounded-lg border border-ark-border py-3.5 text-base font-semibold text-ark-silver hover:bg-white/5 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={status === "sending"}
                className="flex-1 rounded-lg bg-ark-red py-3.5 text-base font-bold text-white hover:bg-ark-red-dark transition-colors disabled:opacity-60"
              >
                {status === "sending" ? "Sending..." : "Get Quote"}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

/* ---- Shared sub-components ---- */

function Input({
  label,
  value,
  onChange,
  placeholder,
  required,
  type = "text",
  maxLength,
  accent,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  maxLength?: number;
  accent?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-ark-silver">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        className={`mt-1.5 w-full rounded-lg px-4 py-3 text-sm text-white placeholder-white/40 bg-transparent transition-colors ${
          accent
            ? "border-2 border-ark-red/60 focus:border-ark-red"
            : "border border-ark-border focus:border-ark-red"
        }`}
      />
    </label>
  );
}

function RadioOption({
  name,
  value,
  label,
  checked,
  onChange,
}: {
  name: string;
  value: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer text-sm text-ark-silver hover:text-white transition-colors">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4"
      />
      {label}
    </label>
  );
}
