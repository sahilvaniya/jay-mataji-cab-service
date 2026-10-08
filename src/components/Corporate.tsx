import { Reveal } from "./Reveal";
import { CheckIcon, WhatsAppIcon } from "./Icons";
import { CONTACT, whatsappLink } from "@/lib/data";

const PACKAGES = [
  {
    title: "Weddings & functions",
    body: "Guest pickups from airport and station, venue shuttles, baraat-day cars — planned together, billed once.",
  },
  {
    title: "Yatra & temple tours",
    body: "Dwarka–Somnath, Ambaji, Pavagadh, Nathdwara, Ujjain–Omkareshwar. Paced for elders, with darshan timings in mind.",
  },
  {
    title: "Company & guest travel",
    body: "Airport transfers for visiting clients, monthly bookings for staff, and a proper bill for reimbursement.",
  },
];

export default function Corporate() {
  return (
    <section className="border-b border-line bg-cream py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-10 rounded-3xl border border-line bg-paper p-8 sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-14">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="font-mono text-[11px] tracking-[0.22em] text-sun-deep uppercase">08 — Groups, tours &amp; events</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Bigger plans, still
                <br className="hidden sm:block" /> one phone call.
              </h2>
            </Reveal>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {PACKAGES.map((p, i) => (
                <Reveal as="li" key={p.title} delay={120 + i * 80}>
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sun text-ink">
                    <CheckIcon className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <h3 className="mt-3 font-display text-[16px] font-extrabold tracking-tight text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">{p.body}</p>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={240} className="lg:col-span-5">
            <div className="rounded-2xl bg-ink p-7 text-cream">
              <p className="font-mono text-[10px] tracking-[0.24em] text-cream/50 uppercase">Plan it together</p>
              <p className="mt-3 font-display text-[28px] leading-tight font-extrabold tracking-tight text-sun">
                Multiple cars,
                <br /> one bill.
              </p>
              <p className="mt-2 text-[13.5px] text-cream/60">
                Send the dates, number of guests and places — I&apos;ll come back with a complete plan and price.
              </p>
              <a
                href={whatsappLink("Namaste Maheshbhai, I need cars for a group / event. Details:")}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-display text-[14px] font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
              >
                <WhatsAppIcon className="h-5 w-5" /> Plan on WhatsApp
              </a>
              <p className="mt-3 text-center font-mono text-[10.5px] tracking-wide text-cream/45">or call {CONTACT.phoneDisplay}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
