import Image from "next/image";

export function ForDealerships() {
  return (
    <section className="relative py-28 bg-ark-bg overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-ark-red/5 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-ark-gold/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ark-red/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: content */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-ark-red mb-4">
              For Dealerships
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.1]">
              Need a Reliable Vehicle
              <br />
              Logistics Partner?
            </h2>
            <p className="mt-6 text-ark-muted text-lg leading-relaxed">
              Ark Auto Logistics helps dealerships:
            </p>
            <ul className="mt-8 space-y-5">
              {[
                "Safe & secure vehicle transportation",
                "Reliable, fully vetted carriers",
                "On-time pickups and deliveries",
                "Real-time tracking and communication",
                "Fully insured transport solutions",
                "Dedicated customer support from pickup to delivery",
              ].map((item, i) => (
                <li key={item} className="group flex items-center gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-ark-red to-ark-red-dark flex items-center justify-center shadow-lg shadow-ark-red/20 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-white font-medium text-lg group-hover:text-ark-silver transition-colors">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="mt-12 inline-flex items-center gap-3 rounded-xl bg-gradient-to-r from-ark-red to-ark-red-dark px-10 py-5 text-lg font-bold text-white hover:shadow-2xl hover:shadow-ark-red/30 hover:-translate-y-0.5 transition-all duration-300"
            >
              Request Dealer Pricing
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: badge + visual */}
          <div className="flex items-center justify-center">
            <div className="relative group">
              {/* Outer glow ring */}
              <div className="absolute -inset-8 rounded-[2.5rem] border border-ark-red/10 group-hover:border-ark-red/20 transition-colors duration-500" />
              <div className="absolute -inset-4 rounded-[2rem] border border-ark-red/20 group-hover:border-ark-red/30 transition-colors duration-500" />

              {/* Main card */}
              <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-ark-surface via-ark-bg to-ark-surface border border-ark-border flex items-center justify-center overflow-hidden group-hover:border-ark-red/30 transition-all duration-500">
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent group-hover:via-white/[0.06] transition-all duration-500" />

                <Image
                  src="/badge.webp"
                  alt="Quality Assured"
                  width={200}
                  height={280}
                  className="relative h-56 w-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Glow underneath */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-ark-red/15 blur-xl group-hover:bg-ark-red/25 transition-colors duration-500" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
