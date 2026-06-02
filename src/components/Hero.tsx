import Image from "next/image";
import { QuoteForm } from "./QuoteForm";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/hero.jpg"
          alt="Car carrier truck transporting vehicles"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/70 to-black/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-ark-bg via-transparent to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
              Reliable Vehicle
              <br />
              Transportation
              <br />
              <span className="text-ark-silver">Across the United States</span>
            </h1>
            <p className="mt-6 text-lg text-ark-muted max-w-xl leading-relaxed">
              Open &amp; Enclosed Auto Transport for Dealers, Auctions,
              Businesses, and Individuals.
            </p>

            {/* Check bullets */}
            <ul className="mt-8 space-y-3">
              {[
                "Licensed & Insured",
                "Nationwide Coverage",
                "Competitive Pricing",
                "Dedicated Support",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-white">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ark-red/20 flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-ark-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-sm font-medium">{item}</span>
                </li>
              ))}
            </ul>

            <a
              href="#quote"
              className="mt-10 inline-flex items-center gap-2 rounded-lg bg-ark-red px-8 py-4 text-base font-bold text-white hover:bg-ark-red-dark transition-colors shadow-lg shadow-ark-red/25"
            >
              Get a Free Quote
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* Right: Quote form */}
          <div id="quote" className="scroll-mt-24">
            <QuoteForm variant="stepped" />
          </div>
        </div>
      </div>
    </section>
  );
}
