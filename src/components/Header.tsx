"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LogoMark, PhoneIcon, WhatsAppIcon } from "./Icons";
import { CONTACT, whatsappLink } from "@/lib/data";

const NAV = [
  { label: "Book", href: "/#book" },
  { label: "How it works", href: "/#how" },
  { label: "Cars", href: "/#cars" },
  { label: "Rates", href: "/#fares" },
  { label: "Routes", href: "/#routes" },
  { label: "Reviews", href: "/#reviews" },
  { label: "My bookings", href: "/bookings" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    fn();
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="bg-ink text-cream/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 sm:px-6">
          <p className="font-mono text-[10.5px] tracking-[0.18em] uppercase">
            Ahmedabad → All India · 24 × 7
          </p>
          <a href={`tel:${CONTACT.phoneTel}`} className="hidden font-mono text-[10.5px] tracking-[0.18em] uppercase hover:text-sun sm:block">
            Call / WhatsApp · {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>

      <div
        className={`border-b border-line bg-cream/90 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-[0_10px_30px_-18px_rgba(23,21,15,0.35)]" : ""
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-2.5" aria-label="Mahesh Chavda Taxi Service — home">
            <LogoMark className="h-9 w-9 transition-transform duration-300 group-hover:-rotate-6" />
            <span className="leading-none">
              <span className="block font-display text-[17px] font-extrabold tracking-tight sm:text-[18px]">MAHESH CHAVDA</span>
              <span className="mt-0.5 block font-mono text-[9px] tracking-[0.28em] text-ink-soft uppercase">
                Taxi Service · Ahmedabad
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href} className="link-under text-[13.5px] font-medium text-ink-soft hover:text-ink">
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={whatsappLink("Namaste Maheshbhai, I want to book a taxi.")}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Mahesh"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-line text-[#1fa855] transition-colors hover:border-[#25D366] hover:bg-[#25D366] hover:text-white md:flex"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[12.5px] font-bold tracking-wide text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun hover:text-ink sm:flex"
            >
              <PhoneIcon className="h-4 w-4 text-sun" />
              {CONTACT.phoneDisplay}
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full border border-line bg-cream xl:hidden"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <span className={`h-0.5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} style={{ width: 18 }} />
              <span className={`h-0.5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} style={{ width: 18 }} />
              <span className={`h-0.5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} style={{ width: 18 }} />
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-line bg-cream px-4 py-4 xl:hidden" aria-label="Mobile">
            <ul className="grid gap-1">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2.5 font-display text-lg font-bold text-ink hover:bg-sun-soft"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center justify-center gap-2 rounded-full bg-ink py-3 font-mono text-sm font-bold text-cream">
                <PhoneIcon className="h-4 w-4 text-sun" /> Call
              </a>
              <a
                href={whatsappLink("Namaste Maheshbhai, I want to book a taxi.")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3 font-mono text-sm font-bold text-white"
              >
                <WhatsAppIcon className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
