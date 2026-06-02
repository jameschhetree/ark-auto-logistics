"use client";

import { useState, useEffect, useCallback } from "react";

const REVIEWS = [
  {
    name: "Jessica T.",
    initial: "J",
    text: "Ark Auto Logistics delivered my car across the country in perfect condition. The communication was excellent throughout the entire process.",
    color: "bg-blue-600",
  },
  {
    name: "Daniel P.",
    initial: "D",
    text: "As a dealer, I rely on fast and dependable transport. Ark has been a game-changer for my business. Highly recommend to any dealership.",
    color: "bg-emerald-600",
  },
  {
    name: "Amanda S.",
    initial: "A",
    text: "I was nervous about shipping my classic car, but the enclosed transport service was top-notch. It arrived without a scratch.",
    color: "bg-purple-600",
  },
  {
    name: "Marcus W.",
    initial: "M",
    text: "Excellent communication and timely delivery. They kept me updated every step of the way. Would use them again without hesitation.",
    color: "bg-amber-600",
  },
  {
    name: "Rachel K.",
    initial: "R",
    text: "Professional service from pickup to delivery. The driver was courteous and the vehicle was handled with care. Five stars all around.",
    color: "bg-rose-600",
  },
];

function Stars() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-ark-gold" fill="currentColor" viewBox="0 0 24 24">
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

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <section id="testimonials" className="py-24 bg-ark-surface scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            What Our Customers Say
          </h2>
          <p className="mt-4 text-ark-muted text-lg">
            Trusted by dealers, auction buyers, and individuals nationwide.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          {/* Cards */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {REVIEWS.map((r) => (
                <div
                  key={r.name}
                  className="w-full flex-shrink-0 px-4"
                >
                  <div className="rounded-2xl bg-ark-bg border border-ark-border p-10 text-center">
                    {/* Avatar */}
                    <div className={`mx-auto w-16 h-16 rounded-full ${r.color} flex items-center justify-center text-2xl font-bold text-white mb-6`}>
                      {r.initial}
                    </div>
                    <Stars />
                    <blockquote className="mt-6 text-lg text-white leading-relaxed">
                      &ldquo;{r.text}&rdquo;
                    </blockquote>
                    <p className="mt-6 text-sm font-semibold text-ark-silver">
                      {r.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 rounded-full bg-ark-surface border border-ark-border flex items-center justify-center text-white hover:bg-ark-red hover:border-ark-red transition-colors"
            aria-label="Previous testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 rounded-full bg-ark-surface border border-ark-border flex items-center justify-center text-white hover:bg-ark-red hover:border-ark-red transition-colors"
            aria-label="Next testimonial"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  i === current
                    ? "bg-ark-red w-8"
                    : "bg-ark-border hover:bg-ark-muted"
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
