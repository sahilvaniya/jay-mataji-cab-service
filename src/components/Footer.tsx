import Link from "next/link";
import { LogoMark } from "./Icons";
import { CONTACT, whatsappLink } from "@/lib/data";

const COLS: { head: string; links: { label: string; href: string; external?: boolean }[] }[] = [
  {
    head: "Ride",
    links: [
      { label: "Book a taxi", href: "/#book" },
      { label: "My bookings", href: "/bookings" },
      { label: "Rate card", href: "/#fares" },
      { label: "Cars", href: "/#cars" },
    ],
  },
  {
    head: "Popular",
    links: [
      { label: "Airport drop", href: "/#book" },
      { label: "Ahmedabad → Udaipur", href: "/#routes" },
      { label: "Dwarka – Somnath", href: "/#routes" },
      { label: "Ahmedabad → Mumbai", href: "/#routes" },
    ],
  },
  {
    head: "Help",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "About Mahesh", href: "/#about" },
      { label: "Call", href: `tel:${CONTACT.phoneTel}` },
      { label: "WhatsApp", href: whatsappLink(), external: true },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="h-2 bg-sun" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="/" className="flex items-center gap-3">
              <LogoMark className="h-11 w-11" />
              <span className="leading-none">
                <span className="block font-display text-2xl font-extrabold tracking-tight">MAHESH CHAVDA</span>
                <span className="mt-1 block font-mono text-[9.5px] tracking-[0.3em] text-cream/50 uppercase">Taxi Service · Ahmedabad</span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-cream/60">
              Local, airport and outstation taxi from Ahmedabad, Gujarat — to anywhere in India. Honest fares,
              clean car, and a driver who answers his own phone.
            </p>
            <div className="mt-7 rounded-xl border border-line-dark bg-[#1e1c14] p-5">
              <p className="font-mono text-[10px] tracking-[0.24em] text-sun uppercase">Call / WhatsApp · 24 × 7</p>
              <a href={`tel:${CONTACT.phoneTel}`} className="mt-1.5 block font-display text-3xl font-extrabold tracking-tight text-cream hover:text-sun">
                {CONTACT.phoneDisplay}
              </a>
              <p className="mt-2 font-mono text-[10.5px] tracking-wide text-cream/50">{CONTACT.region}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-7">
            {COLS.map((c) => (
              <nav key={c.head} aria-label={c.head}>
                <p className="font-mono text-[10px] tracking-[0.26em] text-sun uppercase">{c.head}</p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l.label}>
                      {l.external || l.href.startsWith("tel:") ? (
                        <a
                          href={l.href}
                          target={l.external ? "_blank" : undefined}
                          rel={l.external ? "noopener noreferrer" : undefined}
                          className="link-under text-[13.5px] text-cream/70 hover:text-cream"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href} className="link-under text-[13.5px] text-cream/70 hover:text-cream">
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p
          className="mt-14 select-none text-center font-display text-[15vw] leading-[0.85] font-extrabold tracking-tighter text-cream/[0.05] sm:text-[11vw] lg:text-[8.5rem]"
          aria-hidden="true"
        >
          MAHESH
        </p>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-line-dark pt-6 sm:flex-row">
          <p className="font-mono text-[10.5px] tracking-wide text-cream/40">
            © {new Date().getFullYear()} Mahesh Chavda Taxi Service · Ahmedabad, Gujarat, India
          </p>
          <p className="font-mono text-[10.5px] tracking-wide text-cream/40">Cash · UPI · All India service</p>
        </div>
      </div>
    </footer>
  );
}
