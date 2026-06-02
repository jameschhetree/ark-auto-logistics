import { QuoteForm } from "@/components/QuoteForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Ark Auto Logistics",
  description:
    "Get in touch with Ark Auto Logistics. Request a free quote for vehicle transportation across the United States.",
};

const CARDS = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
    label: "Phone",
    value: "(970) 185-8550",
    href: "tel:9701858550",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
    label: "Email",
    value: "info@arkautologistics.com",
    href: "mailto:info@arkautologistics.com",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Business Hours",
    value: "Mon - Sat: 8AM - 6PM",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <div className="pt-20">
      {/* Header */}
      <section className="bg-ark-surface border-b border-ark-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact Ark Auto Logistics
          </h1>
          <p className="mt-4 text-lg text-ark-muted max-w-2xl mx-auto">
            Ready to transport your vehicle? Get in touch for a free, no-obligation quote.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="bg-ark-bg py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CARDS.map((card) => {
              const inner = (
                <div className="rounded-xl bg-ark-surface border border-ark-border p-8 text-center hover:border-ark-red/40 transition-all duration-300 group">
                  <div className="mx-auto w-14 h-14 rounded-xl bg-ark-red/10 flex items-center justify-center text-ark-red mb-4 group-hover:bg-ark-red/20 transition-colors">
                    {card.icon}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-ark-muted mb-2">
                    {card.label}
                  </p>
                  <p className="text-lg font-semibold text-white">{card.value}</p>
                </div>
              );

              if (card.href) {
                return (
                  <a key={card.label} href={card.href}>
                    {inner}
                  </a>
                );
              }
              return <div key={card.label}>{inner}</div>;
            })}
          </div>
        </div>
      </section>

      {/* Full quote form */}
      <section className="bg-ark-surface py-20 border-t border-ark-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight text-center mb-10">
            Request a Free Quote
          </h2>
          <div className="rounded-2xl bg-ark-bg border border-ark-border p-8 sm:p-10">
            <QuoteForm variant="full" />
          </div>
        </div>
      </section>
    </div>
  );
}
