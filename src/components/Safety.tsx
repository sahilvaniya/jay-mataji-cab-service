import { SAFETY } from "@/lib/data";
import { Reveal, SectionHead } from "./Reveal";
import { ShieldIcon, GpsIcon, ShareIcon, PhoneIcon, BadgeIcon, LockIcon } from "./Icons";

const ICONS = {
  shield: ShieldIcon,
  gps: GpsIcon,
  share: ShareIcon,
  phone: PhoneIcon,
  badge: BadgeIcon,
  lock: LockIcon,
} as const;

export default function Safety() {
  return (
    <section className="bg-ink py-20 text-cream lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          dark
          index="07"
          kicker="Why ride with Mahesh"
          title={
            <>
              Your family should know
              <br />
              who&apos;s driving you.
            </>
          }
          copy="Whether it's your mother travelling alone to Vadodara or the whole family on a Somnath yatra — careful driving, a clean car, and a name and number you can trust."
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {SAFETY.map((s, i) => {
            const Icon = ICONS[s.icon];
            return (
              <Reveal key={s.title} delay={(i % 3) * 100} className="h-full">
                <article className="group h-full bg-ink p-7 transition-colors duration-300 hover:bg-[#1e1c14]">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sun/30 bg-sun/10 text-sun transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105">
                    <Icon className="h-5.5 w-5.5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-cream">{s.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-cream/60">{s.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={150}>
          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl bg-sun px-7 py-5 text-ink sm:flex-row sm:items-center">
            <p className="font-display text-lg font-extrabold tracking-tight">
              Call or WhatsApp any time, day or night:{" "}
              <a href="tel:+919313920315" className="font-mono text-[0.95em] underline decoration-2 underline-offset-4">
                +91 93139 20315
              </a>
            </p>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase">24 / 7 / 365</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
