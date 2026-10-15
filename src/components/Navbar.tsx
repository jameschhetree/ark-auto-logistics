"use client";
import { TruckProgress } from "./TruckProgress";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return (
    <header className="ark-header">
      <a className="ark-skip" href="#main-content">
        Skip to content
      </a>
      <div className="ark-container ark-nav-row">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="ark-brand"
          aria-label="Ark Auto Logistics home"
        >
          <Image
            src="/logo-text.webp"
            alt="Ark Auto Logistics"
            width={240}
            height={240}
            priority
            className="ark-logo"
          />
        </Link>
        <nav className="ark-desktop-nav" aria-label="Primary">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a className="ark-call" href="tel:3014078822">
          <span aria-hidden="true">↗</span>
          <span>
            <small>CALL ARK AUTO</small>(301) 407-8822
          </span>
        </a>
        <button
          className="ark-menu-button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? "Close ×" : "Menu ☰"}
        </button>
      </div>
      <TruckProgress />
      {open ? (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="ark-mobile-nav"
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {links.map((l, i) => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)}>
              <small>0{i + 1}</small>
              {l.label}
              <span>↗</span>
            </Link>
          ))}
          <a href="tel:3014078822">Call (301) 407-8822</a>
        </nav>
      ) : null}
    </header>
  );
}
