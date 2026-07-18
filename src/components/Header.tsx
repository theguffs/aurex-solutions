"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";

const LINKS = [
  { href: "/#chi-siamo", label: "Chi siamo" },
  { href: "/#ruoli", label: "Ruoli" },
  { href: "/#contatti", label: "Contatti" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className={`site-header${open ? " is-open" : ""}`}>
      <div className="shell header-inner">
        <BrandLogo priority />

        <nav className="nav nav-desktop" aria-label="Principale">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
          <Link href="/candidati" className="btn btn-small btn-header-cta">
            Invia candidatura
          </Link>
        </nav>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
          <span className="menu-toggle-bar" />
        </button>
      </div>

      <div
        id="mobile-menu"
        className={`mobile-menu${open ? " is-open" : ""}`}
      >
        <nav className="mobile-nav" aria-label="Menu mobile">
          {LINKS.map((link) => (
            <Link key={link.href} href={link.href} onClick={closeMenu}>
              {link.label}
            </Link>
          ))}
          <Link
            href="/candidati"
            className="btn btn-primary mobile-cta"
            onClick={closeMenu}
          >
            Invia candidatura
          </Link>
        </nav>
      </div>
    </header>
  );
}
