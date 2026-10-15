"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

const slides = [
  {
    src: "/hero-v2.jpg",
    alt: "Vehicles loaded on an open auto carrier",
    title: "Open auto transport",
    detail: "A practical choice for standard vehicles",
    kind: "TRANSPORT PHOTO",
  },
  {
    src: "/enclosed-transport.svg",
    alt: "Illustration of a car inside a covered vehicle transport trailer",
    title: "Enclosed auto transport",
    detail: "Extra protection for classic, luxury, and exotic vehicles",
    kind: "SERVICE ILLUSTRATION",
  },
  {
    src: "/hero-highway.jpg",
    alt: "Transport trucks traveling on a highway",
    title: "Across the United States",
    detail: "Coordinating your route from pickup to delivery",
    kind: "TRANSPORT PHOTO",
  },
];
export function TransportGallery() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reduced = useReducedMotion();
  const section = useRef<HTMLElement>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const playing =
    !reduced && !paused && !hovered && !focused && visible && pageVisible;
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (section.current) observer.observe(section.current);
    const onVisibility = () =>
      setPageVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(
      () => setCurrent((index) => (index + 1) % slides.length),
      6000,
    );
    return () => clearInterval(timer);
  }, [playing]);
  function select(index: number) {
    setPaused(true);
    setCurrent((index + slides.length) % slides.length);
  }
  return (
    <section
      id="gallery"
      ref={section}
      className="ark-section ark-dark ark-gallery"
      aria-labelledby="gallery-heading"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      <div className="ark-container">
        <div className="ark-section-heading">
          <p className="ark-eyebrow">TRANSPORT UP CLOSE</p>
          <h2 id="gallery-heading">
            A CLOSER LOOK AT
            <br />
            <em>YOUR NEXT MOVE.</em>
          </h2>
          <p>
            Explore open transport, enclosed protection, and nationwide routes.
            Hover or focus to hold a slide.
          </p>
        </div>
        <div
          className="ark-gallery-stage"
          role="group"
          aria-label="Transport slides. Use left and right arrow keys to browse."
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
              event.preventDefault();
              select(current + (event.key === "ArrowRight" ? 1 : -1));
            } else if (event.key === "Home") {
              event.preventDefault();
              select(0);
            } else if (event.key === "End") {
              event.preventDefault();
              select(slides.length - 1);
            }
          }}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse")
              touchStart.current = { x: event.clientX, y: event.clientY };
          }}
          onPointerCancel={() => {
            touchStart.current = null;
          }}
          onPointerUp={(event) => {
            const start = touchStart.current;
            touchStart.current = null;
            if (!start) return;
            const dx = event.clientX - start.x;
            const dy = event.clientY - start.y;
            if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy))
              select(current + (dx < 0 ? 1 : -1));
          }}
        >
          {slides.map((slide, index) => {
            const position = (index - current + slides.length) % slides.length;
            const place =
              position === 0 ? "active" : position === 1 ? "next" : "previous";
            return (
              <figure
                key={slide.src}
                className={`ark-gallery-card ark-gallery-${place}`}
                aria-hidden={index !== current}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${slides.length}: ${slide.title}`}
              >
                <div className="ark-gallery-photo">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="(max-width: 760px) 85vw, 700px"
                  />
                  <span>{slide.kind}</span>
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{slide.title}</h3>
                    <p>{slide.detail}</p>
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </div>
        <div className="ark-gallery-controls">
          <span
            className="ark-gallery-count"
            aria-live={playing ? "off" : "polite"}
            aria-atomic="true"
          >
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => select(current - 1)}
            aria-label="Previous transport slide"
          >
            ←
          </button>
          <div className="ark-gallery-dots">
            {slides.map((s, i) => (
              <button
                type="button"
                key={s.src}
                onClick={() => select(i)}
                aria-label={`Show transport slide ${i + 1}: ${s.title}`}
                aria-current={current === i ? "true" : undefined}
              >
                <span />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => select(current + 1)}
            aria-label="Next transport slide"
          >
            →
          </button>
          <button
            type="button"
            className="ark-gallery-pause"
            onClick={() => setPaused((value) => !value)}
            disabled={reduced}
            aria-label={
              reduced
                ? "Automatic slides disabled for reduced motion"
                : paused
                  ? "Play automatic slides"
                  : "Pause automatic slides"
            }
          >
            {reduced ? "Motion off" : paused ? "Play" : "Pause"}
          </button>
        </div>
        <p className="ark-gallery-note">
          Transport imagery illustrates our services, not an Ark-owned fleet.
        </p>
      </div>
    </section>
  );
}
