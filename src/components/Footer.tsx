import Image from "next/image";
import Link from "next/link";
export function Footer() {
  return (
    <footer className="ark-footer">
      <div className="ark-container">
        <div className="ark-footer-grid">
          <div>
            <Link
              href="/"
              className="ark-brand"
              aria-label="Ark Auto Logistics home"
            >
              <Image
                src="/logo-text.webp"
                alt="Ark Auto Logistics"
                width={240}
                height={240}
              />
            </Link>
            <p>
              Vehicle transportation across the United States. Open and enclosed
              options, with support from pickup to delivery.
            </p>
            <Link className="ark-button" href="/#quote">
              Request a Quote ↗
            </Link>
          </div>
          <nav aria-label="Footer">
            <h2>EXPLORE</h2>
            <Link href="/">Home</Link>
            <Link href="/#about">About Ark</Link>
            <Link href="/#services">Services</Link>
            <Link href="/#testimonials">Testimonials</Link>
            <Link href="/contact">Contact</Link>
          </nav>
          <div>
            <h2>LET’S TALK TRANSPORT</h2>
            <a href="tel:3014078822">(301) 407-8822</a>
            <a href="mailto:arkautologistics@gmail.com">
              arkautologistics@gmail.com
            </a>
            <p>Mon–Sat · 8AM–6PM</p>
          </div>
        </div>
        <div className="ark-footer-bottom">
          <span>© 2026 Ark Auto Logistics. All rights reserved.</span>
          <a href="#main-content">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
