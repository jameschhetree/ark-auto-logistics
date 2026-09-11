const REASONS = [
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Fast Vehicle Pickup",
    body: "Quick scheduling with pickups arranged within days, not weeks.",
    accent: "from-cyan-400 to-blue-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Professional Carrier Network",
    body: "Vetted, insured carriers with proven track records across all 50 states.",
    accent: "from-amber-400 to-orange-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
      </svg>
    ),
    title: "Dealer-to-Dealer Transport",
    body: "Seamless inventory transfers between dealership locations nationwide.",
    accent: "from-emerald-400 to-green-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Auction Transportation",
    body: "Reliable pickup from Copart, IAA, Manheim, and other major auctions.",
    accent: "from-violet-400 to-purple-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Door-to-Door Service",
    body: "We pick up and deliver directly to your specified locations.",
    accent: "from-rose-400 to-red-500",
  },
  {
    icon: (
      <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Real-Time Shipment Updates",
    body: "Stay informed with tracking updates from pickup to delivery.",
    accent: "from-sky-400 to-indigo-500",
  },
];

export function WhyChoose() {
  return (
    <section className="relative py-28 bg-ark-bg overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(244,196,48,0.06),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ark-gold/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-ark-gold mb-4">
            Our Advantage
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why Choose Ark Auto Logistics
          </h2>
          <p className="mt-5 text-ark-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Industry-leading service backed by years of experience in vehicle transportation.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-ark-gold to-ark-gold-dark" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((r, i) => (
            <div
              key={r.title}
              className="group relative rounded-2xl bg-ark-surface border border-ark-border p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/30 hover:border-ark-gold/30"
            >
              {/* Subtle gradient overlay on hover */}
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-br ${r.accent} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-500 pointer-events-none`} />

              {/* Icon */}
              <div className="relative">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${r.accent} p-[1px] group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-xl bg-ark-surface flex items-center justify-center text-white">
                    {r.icon}
                  </div>
                </div>
                <div className={`absolute -bottom-1 left-3 w-8 h-2 rounded-full bg-gradient-to-r ${r.accent} opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-500`} />
              </div>

              <h3 className="relative mt-6 text-lg font-bold text-white mb-2">{r.title}</h3>
              <p className="relative text-sm text-ark-muted leading-relaxed group-hover:text-white/75 transition-colors duration-300">{r.body}</p>

              {/* Bottom accent */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r ${r.accent} group-hover:w-1/2 transition-all duration-500 rounded-full`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
