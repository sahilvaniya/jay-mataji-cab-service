import { CAR_CLASSES, quoteTrip, formatINR } from "@/lib/fare";
import { Reveal, SectionHead } from "./Reveal";
import { CheckIcon } from "./Icons";

function Rate({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0 sm:text-right">
      <p className="font-mono text-[9px] tracking-[0.18em] text-ink-soft uppercase sm:hidden">{label}</p>
      <p className="font-mono text-[13.5px] font-bold text-ink">{value}</p>
      {sub ? <p className="font-mono text-[10px] text-ink-soft">{sub}</p> : null}
    </div>
  );
}

export default function Fares() {
  const sample = quoteTrip({ pickup: "Ahmedabad", dropoff: "Udaipur", passengers: 2, carId: "sedan", tripType: "oneway" });

  return (
    <section id="fares" className="scroll-mt-24 bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          index="04"
          kicker="Rate card"
          title={
            <>
              Per-km rates, printed here.
              <span className="text-sun-deep"> The same on a Diwali night.</span>
            </>
          }
          copy="No surge, no festival pricing, no 'night charge' surprise. The quote is the car rate × kilometres, plus a driver allowance on outstation trips. Toll, parking and state tax are paid at actuals — with the receipts handed to you."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-12">
          <Reveal className="min-w-0 lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-line bg-cream">
              {/* column labels — desktop only */}
              <div className="hidden bg-ink px-4 py-3.5 text-cream sm:grid sm:grid-cols-[1.5fr_1.15fr_1fr_1fr_0.9fr] sm:items-center sm:gap-3">
                {["Car", "Local", "One-way", "Round trip", "Driver / day"].map((h, i) => (
                  <p
                    key={h}
                    className={`font-mono text-[10px] font-bold tracking-[0.18em] uppercase ${i > 0 ? "text-right" : ""}`}
                  >
                    {h}
                  </p>
                ))}
              </div>

              {CAR_CLASSES.map((c) => (
                <div
                  key={c.id}
                  className="border-t border-line px-4 py-4 transition-colors hover:bg-sun-wash sm:grid sm:grid-cols-[1.5fr_1.15fr_1fr_1fr_0.9fr] sm:items-center sm:gap-3"
                >
                  <div className="min-w-0">
                    <p className="font-display text-[15px] font-extrabold tracking-tight text-ink">{c.name}</p>
                    <p className="font-mono text-[10px] tracking-wide text-ink-soft uppercase">{c.seats} seats</p>
                  </div>
                  {/* on phones these sit in a labelled 2-up grid; on desktop they flatten
                      into the row's columns via `sm:contents` */}
                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-3 sm:contents">
                    <Rate label="Local" value={`₹${c.localPerKm}/km`} sub={`min ${formatINR(c.localMin)}`} />
                    <Rate label="One-way" value={`₹${c.oneWayPerKm}/km`} />
                    <Rate label="Round trip" value={`₹${c.roundPerKm}/km`} />
                    <Rate label="Driver / day" value={formatINR(c.allowance)} />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 font-mono text-[10.5px] leading-relaxed tracking-wide text-ink-soft">
              Local = base fare + per km, inside Ahmedabad &amp; Gandhinagar. One-way minimum 130 km.
              Round trip minimum 250 km per day. Driver allowance applies to outstation trips of 200 km+.
            </p>
          </Reveal>

          <div className="min-w-0 lg:col-span-5">
            <Reveal delay={120}>
              <div className="rounded-2xl border border-line bg-cream p-6">
                <p className="font-mono text-[10.5px] tracking-[0.22em] text-sun-deep uppercase">Paid at actuals, with receipt</p>
                <ul className="mt-4 grid gap-3">
                  {[
                    ["Toll tax", "exactly what the FASTag / booth slip says"],
                    ["Parking", "airport, station & monument parking"],
                    ["State entry tax", "only when crossing into another state"],
                  ].map(([t, d]) => (
                    <li key={t} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-sun text-ink">
                        <CheckIcon className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <p className="text-[13.5px] leading-snug text-ink-soft">
                        <strong className="font-semibold text-ink">{t}</strong> — {d}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {sample.ok && (
              <Reveal delay={220}>
                <div className="mt-5 rounded-2xl bg-ink p-6 text-cream">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-cream/50 uppercase">
                    Sample · Sedan · Ahmedabad → Udaipur · One-way
                  </p>
                  <div className="mt-4 space-y-2 font-mono text-[12.5px]">
                    {sample.lines.map((l) => (
                      <p key={l.label} className="flex items-baseline justify-between gap-3">
                        <span className="text-cream/60">{l.label}</span>
                        <span className="flex-1 border-b border-dotted border-cream/25" />
                        <span>{formatINR(l.amount)}</span>
                      </p>
                    ))}
                    <p className="flex items-baseline justify-between gap-3">
                      <span className="text-cream/60">Tolls</span>
                      <span className="flex-1 border-b border-dotted border-cream/25" />
                      <span className="text-cream/60">at actuals</span>
                    </p>
                  </div>
                  <p className="mt-4 flex items-baseline justify-between border-t border-dashed border-cream/25 pt-3">
                    <span className="font-mono text-[10px] tracking-[0.24em] text-cream/50 uppercase">Fare</span>
                    <span className="font-mono text-2xl font-bold text-sun">{formatINR(sample.total)}</span>
                  </p>
                  <p className="mt-3 text-[12px] leading-relaxed text-cream/55">
                    The number on the website is the number on the phone call is the number you pay.
                  </p>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
