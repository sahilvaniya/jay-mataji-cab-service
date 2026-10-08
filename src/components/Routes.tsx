"use client";

import { POPULAR_ROUTES } from "@/lib/data";
import { CAR_CLASSES } from "@/lib/fare";
import { Reveal, SectionHead } from "./Reveal";
import { ArrowIcon, PinIcon, FlagIcon } from "./Icons";
import type { PrefillDetail } from "./BookingForm";

export default function Routes() {
  const pick = (to: string) => {
    window.dispatchEvent(
      new CustomEvent<PrefillDetail>("mc-prefill", {
        detail: { pickup: "Ahmedabad", dropoff: to, tripType: "oneway" },
      })
    );
    document.getElementById("book")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="routes" className="scroll-mt-24 border-y border-line bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          index="05"
          kicker="Popular from Ahmedabad"
          title={
            <>
              Where people usually
              <br className="hidden sm:block" /> <span className="text-sun-deep">ask me to go.</span>
            </>
          }
          copy="Tap any route and the booking form fills in with Ahmedabad as your pickup and that city as the drop. Choose the car and the trip type there, and the fare is worked out on the call."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR_ROUTES.map((r, i) => (
            <Reveal key={r.to} delay={(i % 3) * 80} className="h-full">
              <button
                type="button"
                onClick={() => pick(r.to)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-line bg-paper text-left transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_26px_46px_-26px_rgba(23,21,15,0.35)] focus-visible:border-ink"
              >
                <div className="flex items-center justify-between gap-2 bg-sun px-4 py-2 transition-colors duration-300 group-hover:bg-ink">
                  <p className="truncate font-mono text-[9px] font-bold tracking-[0.22em] text-ink/70 uppercase transition-colors duration-300 group-hover:text-sun/80">
                    {r.tag}
                  </p>
                  <p className="shrink-0 font-mono text-[10px] font-bold tracking-wide text-ink transition-colors duration-300 group-hover:text-sun">
                    Sedan ₹{CAR_CLASSES[0].perKm}/km
                  </p>
                </div>

                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <p className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.22em] text-ink-soft uppercase">
                    <PinIcon className="h-3 w-3 shrink-0 text-sun-deep" />
                    Ahmedabad
                  </p>

                  <p className="mt-2 flex items-start gap-2">
                    <FlagIcon className="mt-1 h-4 w-4 shrink-0 text-sun-deep" />
                    <span className="min-w-0 truncate font-display text-[20px] leading-[1.15] font-extrabold tracking-tight text-ink">
                      {r.to}
                    </span>
                  </p>

                  <div className="my-4 border-b border-dashed border-line" />

                  <div className="mt-auto flex items-end justify-between gap-3">
                    <div className="min-w-0">
                      <p className="font-mono text-[9px] tracking-[0.2em] text-ink-soft uppercase">
                        One-way &amp; round trip
                      </p>
                      <p className="mt-1 text-[13px] leading-snug text-ink-soft">
                        Tap to fill the form — fare confirmed on the call.
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-sun transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowIcon className="h-4.5 w-4.5" />
                    </span>
                  </div>
                </div>
              </button>
            </Reveal>
          ))}
        </div>

        {/* any destination */}
        <Reveal delay={120}>
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border-2 border-dashed border-line bg-paper px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:px-7">
            <div className="flex items-start gap-3.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sun-soft text-sun-deep">
                <FlagIcon className="h-4.5 w-4.5" />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[17px] font-extrabold tracking-tight text-ink">Any other city in India</p>
                <p className="mt-1 text-[13.5px] leading-relaxed text-ink-soft">
                  Type it in the booking form — Delhi, Goa, Haridwar, Bengaluru, anywhere — or just call.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => pick("")}
              className="group/btn flex shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-[13.5px] font-bold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
            >
              Book any route
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
