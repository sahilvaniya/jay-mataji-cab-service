import { MaskLines, Reveal } from "./Reveal";
import BookingForm from "./BookingForm";
import MapView from "./MapView";
import { CONTACT, LED_ITEMS, TICKER_DESTINATIONS, whatsappLink } from "@/lib/data";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper pt-[120px] lg:pt-[128px]">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-24 h-[560px] w-[560px] rounded-full bg-sun/15 blur-[120px]" />

      {/* LED marquee */}
      <div className="relative border-y-2 border-ink bg-ink py-2.5" aria-hidden="true">
        <div className="led-track">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {LED_ITEMS.map((item, i) => (
                <span key={`${half}-${i}`} className="flex items-center">
                  <span className="px-6 font-mono text-[11.5px] font-bold tracking-[0.24em] whitespace-nowrap text-sun">{item}</span>
                  <span className="text-sun/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:pb-20 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7 xl:col-span-6">
            <Reveal>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] tracking-[0.24em] text-ink-soft uppercase">
                <span className="inline-block h-2 w-2 rounded-full bg-sun-deep" />
                Mahesh Chavda
                <span className="text-line">/</span>
                Ahmedabad, Gujarat
              </p>
            </Reveal>

            <h1 className="mt-5 font-display text-[clamp(2.05rem,10vw,2.75rem)] leading-[0.98] font-extrabold tracking-[-0.02em] text-ink sm:text-6xl lg:text-[4.4rem]">
              <MaskLines
                lines={[
                  "From Ahmedabad",
                  <>
                    to{" "}
                    <span className="relative inline-block">
                      anywhere.
                      <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 220 14" fill="none" preserveAspectRatio="none" aria-hidden="true">
                        <path d="M3 10.5C60 4 140 3.5 217 8.5" stroke="#FFC400" strokeWidth="7" strokeLinecap="round" />
                      </svg>
                    </span>
                  </>,
                ]}
              />
            </h1>

            <Reveal delay={250}>
              <p className="mt-6 max-w-xl text-[16.5px] leading-relaxed text-ink-soft">
                Namaste — I&apos;m <strong className="font-semibold text-ink">Mahesh Chavda</strong>, a full-time
                taxi driver based in Ahmedabad. An early-morning airport drop, a day around the city, or a
                900 km run to Delhi — book below, see the fare before you send it, and I&apos;ll call you
                back to confirm. Or just call or WhatsApp me directly.
              </p>
            </Reveal>

            <Reveal delay={330}>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={`tel:${CONTACT.phoneTel}`}
                  className="group flex items-center gap-3 rounded-full border-2 border-ink bg-ink py-2.5 pl-2.5 pr-6 text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sun text-ink transition-colors group-hover:bg-ink group-hover:text-sun">
                    <PhoneIcon className="h-4.5 w-4.5" />
                  </span>
                  <span className="leading-tight">
                    <span className="block font-mono text-[9.5px] tracking-[0.2em] uppercase opacity-60">Call now</span>
                    <span className="block font-mono text-[15px] font-bold">{CONTACT.phoneDisplay}</span>
                  </span>
                </a>
                <a
                  href={whatsappLink("Namaste Maheshbhai, I want to book a taxi.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 rounded-full border-2 border-line bg-cream px-6 py-2.5 font-display text-[14px] font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:border-[#25D366]"
                >
                  <WhatsAppIcon className="h-5 w-5 text-[#1fa855]" />
                  WhatsApp
                </a>
              </div>
            </Reveal>

            <Reveal delay={420} className="mt-9">
              <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                <Stat value="All India" label="Outstation service" />
                <span className="hidden h-9 w-px bg-line sm:block" />
                <Stat value="24 × 7" label="Call or WhatsApp" />
                <span className="hidden h-9 w-px bg-line sm:block" />
                <Stat value="₹11/km" label="Sedan, per km" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5 xl:col-span-6">
            <div id="book" className="scroll-mt-32">
              <Reveal delay={150}>
                <BookingForm />
              </Reveal>
            </div>
            <Reveal delay={300} className="mt-8 hidden xl:block">
              <MapView />
            </Reveal>
          </div>
        </div>
      </div>

      {/* destinations ticker */}
      <div className="relative border-t border-line bg-cream py-3.5" aria-hidden="true">
        <div className="led-track led-track-slow">
          {[0, 1].map((half) => (
            <div key={half} className="flex shrink-0 items-center">
              {TICKER_DESTINATIONS.map((d, i) => (
                <span key={`${half}-${i}`} className="flex items-center">
                  <span className="px-7 font-display text-[13px] font-bold tracking-[0.18em] text-ink/70">{d}</span>
                  <span className="font-mono text-[10px] text-sun-deep">✚</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 xl:hidden">
        <Reveal>
          <MapView />
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-2xl font-extrabold tracking-tight text-ink">{value}</p>
      <p className="mt-1 font-mono text-[10px] tracking-[0.18em] text-ink-soft uppercase">{label}</p>
    </div>
  );
}
