"use client";

import { useState, useEffect, useCallback } from "react";

const REVIEWS = [
  {
    name: "Jessica T.",
    initial: "J",
    text: "Ark Auto Logistics delivered my car across the country in perfect condition. The communication was excellent throughout the entire process.",
    color: "from-blue-500 to-cyan-400",
  },
  {
    name: "Daniel P.",
    initial: "D",
    text: "As a dealer, I rely on fast and dependable transport. Ark has been a game-changer for my business. Highly recommend to any dealership.",
    color: "from-emerald-500 to-green-400",
  },
  {
    name: "Amanda S.",
    initial: "A",
    text: "I was nervous about shipping my classic car, but the enclosed transport service was top-notch. It arrived without a scratch.",
    color: "from-violet-500 to-purple-400",
  },
  {
    name: "Marcus W.",
    initial: "M",
    text: "Excellent communication and timely delivery. They kept me updated every step of the way. Would use them again without hesitation.",
    color: "from-amber-500 to-yellow-400",
  },
  {
    name: "Rachel K.",
    initial: "R",
    text: "Professional service from pickup to delivery. The driver was courteous and the vehicle was handled with care. Five stars all around.",
    color: "from-rose-500 to-pink-400",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 justify-center">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-5 h-5 text-ark-gold drop-shadow-[0_0_4px_rgba(244,196,48,0.4)]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = REVIEWS.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section id="testimonials" className="relative py-28 bg-ark-surface scroll-mt-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(244,196,48,0.04),transparent_70%)]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-ark-gold/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-ark-gold mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-5 text-ark-muted text-lg">
            Trusted by dealers, auction buyers, and individuals nationwide.
          </p>
          <div className="mt-6 mx-auto w-16 h-1 rounded-full bg-gradient-to-r from-ark-gold to-ark-gold-dark" />
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {REVIEWS.map((r) => (
                <div key={r.name} className="w-full flex-shrink-0 px-4">
                  <div className="relative rounded-3xl bg-ark-bg border border-ark-border p-12 text-center overflow-hidden">
                    {/* Background glow */}
                    <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-b ${r.color} opacity-[0.06] rounded-full blur-3xl`} />

                    {/* Quote mark */}
                    <div className="absolute top-6 left-8 text-6xl font-serif text-white/[0.06] leading-none">&ldquo;</div>

                    {/* Avatar */}
                    <div className={`relative mx-auto w-18 h-18 rounded-2xl bg-gradient-to-br ${r.color} p-[2px] mb-8`}>
                      <div className="w-full h-full rounded-2xl bg-ark-bg flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">{r.initial}</span>
                      </div>
                    </div>

                    <Stars />

                    <blockquote className="relative mt-8 text-lg sm:text-xl text-white leading-relaxed font-light">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>

                    <div className="mt-8 flex items-center justify-center gap-2">
                      <div className={`w-6 h-[2px] rounded-full bg-gradient-to-r ${r.color}`} />
                      <p className="text-sm font-bold text-ark-silver tracking-wide uppercase">
                        {r.name}
                      </p>
                      <div className={`w-6 h-[2px] rounded-full bg-gradient-to-r ${r.color}`} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 rounded-xl bg-ark-bg border border-ark-border flex items-center justify-center text-white hover:bg-ark-red hover:border-ark-red hover:shadow-lg hover:shadow-ark-red/20 transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 rounded-xl bg-ark-bg border border-ark-border flex items-center justify-center text-white hover:bg-ark-red hover:border-ark-red hover:shadow-lg hover:shadow-ark-red/20 transition-all duration-300"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2.5 mt-10">
            {REVIEWS.map((r, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === current
                    ? `bg-gradient-to-r ${r.color} w-10 shadow-lg`
                    : "bg-ark-border hover:bg-ark-muted w-2.5"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
