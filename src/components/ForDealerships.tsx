import Image from "next/image";

export function ForDealerships() {
  return (
    <section className="py-24 bg-ark-bg relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-ark-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: content */}
          <div>
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-ark-red mb-4">
              For Dealerships
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Need a Reliable Vehicle
              <br />
              Logistics Partner?
            </h2>
            <p className="mt-6 text-ark-muted text-lg">
              Ark Auto Logistics helps dealerships:
            </p>
            <ul className="mt-6 space-y-4">
              {[
                "Reduce transportation delays",
                "Move inventory faster",
                "Handle auction purchases",
                "Improve customer delivery times",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-ark-red flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-white font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <a
              href="#quote"
              className="mt-10 inline-flex items-center gap-2 rounded-lg bg-ark-red px-8 py-4 text-base font-bold text-white hover:bg-ark-red-dark transition-colors shadow-lg shadow-ark-red/25"
            >
              Request Dealer Pricing
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: badge + visual */}
          <div className="flex items-center justify-center">
            <div className="relative">
              <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-3xl bg-gradient-to-br from-ark-surface to-ark-bg border border-ark-border flex items-center justify-center">
                <Image
                  src="/badge.webp"
                  alt="Quality Assured"
                  width={200}
                  height={280}
                  className="h-56 w-auto drop-shadow-2xl"
                />
              </div>
              {/* Decorative ring */}
              <div className="absolute -inset-4 rounded-[2rem] border border-ark-red/20 -z-10" />
              <div className="absolute -inset-8 rounded-[2.5rem] border border-ark-red/10 -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
