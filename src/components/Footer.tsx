import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ark-surface border-t border-ark-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo + tagline */}
          <div>
            <Link href="/">
              <Image
                src="/logo-text.webp"
                alt="Ark Auto Logistics"
                width={160}
                height={53}
                className="h-12 w-auto mb-4"
              />
            </Link>
            <p className="text-ark-muted text-sm leading-relaxed max-w-xs">
              Licensed and insured auto transport across the United States.
              Professional service from pickup to delivery.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-ark-silver mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "Services", href: "/#services" },
                { label: "Testimonials", href: "/#testimonials" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-ark-muted hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-ark-silver mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3 text-ark-muted">
                <svg className="w-4 h-4 text-ark-red flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
                <a href="tel:3014078822" className="hover:text-white transition-colors">
                  (301) 407-8822
                </a>
              </li>
              <li className="flex items-center gap-3 text-ark-muted">
                <svg className="w-4 h-4 text-ark-red flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
                <a href="mailto:info@arkautologistics.com" className="hover:text-white transition-colors">
                  info@arkautologistics.com
                </a>
              </li>
              <li className="flex items-center gap-3 text-ark-muted">
                <svg className="w-4 h-4 text-ark-red flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                </svg>
                <span>Mon - Sat: 8AM - 6PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-ark-border text-center">
          <p className="text-xs text-ark-muted">
            &copy; 2026 Ark Auto Logistics. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
