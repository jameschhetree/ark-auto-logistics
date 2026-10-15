"use client";
import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/** A decorative vehicle follows reading progress. No autonomous animation. */
export function TruckProgress() {
  const truck = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    const update = () => {
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        distance > 0 ? Math.min(1, Math.max(0, window.scrollY / distance)) : 0;
      truck.current?.style.setProperty("--truck-progress", String(progress));
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [reducedMotion]);
  return (
    <div className="ark-truck-road" aria-hidden="true">
      <div
        ref={truck}
        className="ark-truck-marker"
        data-reduced-motion={reducedMotion}
      >
        <svg viewBox="0 0 100 36" fill="none">
          <path d="M3 6h57v21H3z" fill="#e1bd70" />
          <path d="M63 11h17l12 10v7H63z" fill="#b41631" />
          <path d="M77 13v8h12l-10-8z" fill="#c8e2ee" />
          <path d="M2 28h92" stroke="#e1bd70" strokeWidth="3" />
          <path d="M9 4h45" stroke="#f5e7c5" strokeWidth="2" />
          <text x="20" y="21" fill="#242020" fontSize="12" fontWeight="900">
            ARK
          </text>
          <g fill="#171515" stroke="#eee7dc" strokeWidth="2">
            <circle cx="16" cy="29" r="5" />
            <circle cx="49" cy="29" r="5" />
            <circle cx="77" cy="29" r="5" />
          </g>
        </svg>
      </div>
    </div>
  );
}
