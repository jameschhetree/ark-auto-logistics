const SERVICES = [
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Dealer Transport",
    description: "Helping dealerships move inventory quickly and efficiently across state lines.",
    gradient: "from-blue-500 to-cyan-400",
    glow: "shadow-blue-500/30",
    border: "hover:border-blue-500/50",
    number: "01",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
    title: "Auction Transport",
    description: "Vehicle transportation from auctions such as Copart, IAA, and Manheim.",
    gradient: "from-amber-400 to-yellow-300",
    glow: "shadow-amber-500/30",
    border: "hover:border-amber-500/50",
    number: "02",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349m-18 0V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v4.1" />
      </svg>
    ),
    title: "Open Auto Transport",
    description: "The most affordable option for standard vehicles. Safe, reliable, and cost-effective.",
    gradient: "from-emerald-500 to-green-400",
    glow: "shadow-emerald-500/30",
    border: "hover:border-emerald-500/50",
    number: "03",
  },
  {
    icon: (
      <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Enclosed Auto Transport",
    description: "Extra protection for luxury, classic, and exotic vehicles during transit.",
    gradient: "from-red-500 to-rose-400",
    glow: "shadow-red-500/30",
    border: "hover:border-red-500/50",
    number: "04",
  },
];

export function Services() {
  return (
    <section id="services" className="relative py-28 scroll-mt-20 overflow-hidden">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-ark-surface" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(225,29,46,0.08),transparent_60%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ark-red/30 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-ark-red mb-4">
            What We Do
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Our Services
          </h2>
          <p className="mt-5 text-ark-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Comprehensive auto transport solutions tailored to your needs.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-ark-red to-ark-red-dark" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div
              key={s.title}
              className={`group relative rounded-2xl bg-ark-bg border border-ark-border p-8 text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${s.glow} ${s.border}`}
            >
              {/* Hover glow effect behind card */}
              <div className={`absolute -inset-px rounded-2xl bg-gradient-to-b ${s.gradient} opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 pointer-events-none`} />

              {/* Number tag */}
              <span className="absolute top-4 right-4 text-[10px] font-mono font-bold text-white/20 group-hover:text-white/40 transition-colors">
                {s.number}
              </span>

              {/* Icon with gradient background */}
              <div className="relative mx-auto mb-6">
                <div className={`w-18 h-18 mx-auto rounded-2xl bg-gradient-to-br ${s.gradient} p-[1px] group-hover:scale-110 transition-transform duration-500`}>
                  <div className="w-full h-full rounded-2xl bg-ark-bg flex items-center justify-center p-4">
                    <div className="text-white">{s.icon}</div>
                  </div>
                </div>
                {/* Glow dot under icon */}
                <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-8 h-3 rounded-full bg-gradient-to-r ${s.gradient} opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500`} />
              </div>

              <h3 className="relative text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                {s.title}
              </h3>
              <p className="relative text-sm text-ark-muted leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                {s.description}
              </p>

              {/* Bottom accent line */}
              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r ${s.gradient} group-hover:w-2/3 transition-all duration-500 rounded-full`} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
