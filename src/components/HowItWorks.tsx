import { STEPS } from "@/lib/data";
import { MaskLines, Reveal } from "./Reveal";
import { PinIcon, GpsIcon, ShareIcon, CardIcon } from "./Icons";

const STEP_ICONS = [PinIcon, GpsIcon, ShareIcon, CardIcon];

export default function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* sticky intro */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-36">
              <Reveal>
                <p className="font-mono text-[11px] tracking-[0.22em] text-sun-deep uppercase">01 — How it works</p>
              </Reveal>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.02]">
                <MaskLines lines={["No app. No call centre.", "Just me."]} />
              </h2>
              <Reveal delay={200}>
                <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-ink-soft">
                  The person who picks up the phone is the person who drives the car. Four simple
                  steps — and the fare you agree on the call is what you pay at the end.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className="mt-8 inline-flex items-center gap-4 rounded-xl border border-line bg-cream px-5 py-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sun font-display text-[15px] font-black text-ink">
                    MC
                  </span>
                  <p className="text-[13px] leading-snug text-ink-soft">
                    <strong className="font-semibold text-ink">Gujarati, Hindi &amp; English.</strong>{" "}
                    Tourists from outside Gujarat are very welcome.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          {/* steps */}
          <ol className="lg:col-span-7">
            {STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i];
              return (
                <Reveal as="li" key={s.num} delay={i * 90}>
                  <article
                    className={`group grid grid-cols-[auto_1fr] gap-5 rounded-2xl border border-line bg-cream p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_44px_-24px_rgba(23,21,15,0.28)] sm:grid-cols-[72px_auto_1fr] sm:gap-6 sm:p-8 ${
                      i < STEPS.length - 1 ? "mb-4" : ""
                    }`}
                  >
                    <span className="font-display text-[44px] leading-none font-extrabold tracking-tighter text-line transition-colors duration-300 group-hover:text-sun sm:text-[56px]">
                      {s.num}
                    </span>
                    <span className="mt-1.5 hidden h-11 w-11 items-center justify-center rounded-xl bg-ink text-sun transition-transform duration-300 group-hover:rotate-6 sm:flex">
                      <Icon className="h-5.5 w-5.5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-tight text-ink">{s.title}</h3>
                      <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">{s.body}</p>
                      <p className="mt-3.5 inline-block rounded-full bg-sun-soft px-3 py-1 font-mono text-[10px] tracking-[0.14em] text-ink uppercase">
                        {s.note}
                      </p>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
