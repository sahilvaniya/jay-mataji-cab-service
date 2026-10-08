import Link from "next/link";
import { MaskLines } from "./Reveal";
import { ArrowIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { CONTACT, whatsappLink } from "@/lib/data";

export default function Cta() {
  return (
    <section className="relative overflow-hidden bg-sun">
      <div className="h-2 bg-ink" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:py-28">
        <p className="font-mono text-[11px] tracking-[0.24em] text-ink/60 uppercase">10 — Whenever you need it</p>
        <h2 className="mt-5 font-display text-[clamp(1.85rem,9vw,2.6rem)] font-extrabold tracking-tight text-ink sm:text-6xl lg:text-7xl">
          <MaskLines
            lines={["Chalo, let's go.", <>Ready <span className="inline-block -skew-x-6 bg-ink px-3 text-sun sm:px-5">24 × 7.</span></>]}
          />
        </h2>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <Link
            href="/#book"
            className="group flex items-center justify-center gap-3 rounded-full bg-ink px-8 py-4 font-display text-[16px] font-extrabold text-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-16px_rgba(23,21,15,0.5)]"
          >
            Book a ride
            <ArrowIcon className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
          <a
            href={`tel:${CONTACT.phoneTel}`}
            className="flex items-center justify-center gap-2.5 rounded-full border-2 border-ink/70 px-8 py-3.5 font-mono text-[15px] font-bold text-ink transition-colors duration-300 hover:bg-ink hover:text-sun"
          >
            <PhoneIcon className="h-5 w-5" />
            {CONTACT.phoneDisplay}
          </a>
          <a
            href={whatsappLink("Namaste Maheshbhai, I want to book a taxi.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 rounded-full border-2 border-ink/70 px-8 py-3.5 font-display text-[15px] font-bold text-ink transition-colors duration-300 hover:bg-ink hover:text-sun"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp
          </a>
        </div>
        <p className="mt-6 font-mono text-[11px] tracking-[0.16em] text-ink/60 uppercase">
          Ahmedabad base · Outstation all over India · Cash &amp; UPI accepted
        </p>
      </div>
    </section>
  );
}
