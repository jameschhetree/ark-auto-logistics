import Image from "next/image";

export function Hero() {
  return (
    <section className="ark-hero" aria-labelledby="hero-title">
      <Image
        src="/hero-v2.jpg"
        alt="Vehicle carrier on the road"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="ark-hero-image"
      />
      <div className="ark-hero-shade" />
      <div className="ark-container ark-hero-copy">
        <p className="ark-eyebrow">ARK AUTO LOGISTICS · NATIONWIDE TRANSPORT</p>
        <h1 id="hero-title">
          YOUR VEHICLE.
          <br />
          OUR COMMITMENT.
          <br />
          <span>EVERY MILE.</span>
        </h1>
        <p className="ark-hero-description">
          Open &amp; enclosed auto transport for dealerships, auctions,
          businesses, and individuals. A dedicated team from pickup to delivery.
        </p>
        <div className="ark-actions">
          <a className="ark-button" href="tel:3014078822">
            Call Ark Now <span aria-hidden="true">↗</span>
          </a>
          <a className="ark-button ark-button-outline" href="#quote">
            Get a Free Quote <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <a
        href="#about"
        className="ark-scroll"
        aria-label="Explore Ark Auto Logistics"
      >
        ↓
      </a>
    </section>
  );
}
