import { RECEIPTS, whatsappLink, CONTACT } from "@/lib/data";
import { Reveal, SectionHead } from "./Reveal";
import { StarIcon, WhatsAppIcon, ArrowIcon } from "./Icons";

export default function Reviews() {
  const [featured, ...rest] = RECEIPTS;

  const total = RECEIPTS.length;
  const counts = [5, 4, 3, 2, 1].map((s) => RECEIPTS.filter((r) => r.stars === s).length);
  const average = RECEIPTS.reduce((sum, r) => sum + r.stars, 0) / Math.max(1, total);
  const fill = RECEIPTS.reduce((sum, r) => sum + r.stars, 0) / Math.max(1, total * 5);

  return (
    <section id="reviews" className="scroll-mt-24 overflow-hidden bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          index="06"
          kicker="From the passenger seat"
          title={
            <>
              What riders say,
              <br className="hidden sm:block" /> <span className="text-sun-deep">with the bill attached.</span>
            </>
          }
          copy="Every note below is printed with the trip it's about — the route, the distance and what was paid. Most new bookings come from someone who rode once and passed the number on."
        />

        {/* rating summary */}
        <Reveal>
          <div className="mt-12 grid gap-8 rounded-2xl border border-line bg-paper p-6 sm:p-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-12">
            <div className="flex items-center gap-5">
              <p className="font-display text-[62px] leading-none font-extrabold tracking-tighter text-ink">
                {average.toFixed(1)}
              </p>
              <div>
                <div className="flex text-sun-deep" aria-label={`${average.toFixed(1)} out of 5 stars`}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <StarIcon key={s} className={`h-4.5 w-4.5 ${s <= Math.round(average) ? "" : "opacity-25"}`} />
                  ))}
                </div>
                <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-ink-soft uppercase">
                  {total} rated trips
                </p>
              </div>
            </div>

            <div className="grid gap-1.5">
              {counts.map((c, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-4 shrink-0 font-mono text-[10px] text-ink-soft">{5 - i}</span>
                  <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                    <span
                      className="block h-full rounded-full bg-sun"
                      style={{ width: `${total ? Math.round((c / total) * 100) : 0}%` }}
                    />
                  </span>
                  <span className="w-9 shrink-0 text-right font-mono text-[10px] text-ink-soft">
                    {total ? Math.round((c / total) * 100) : 0}%
                  </span>
                </div>
              ))}
            </div>

            <div className="lg:max-w-[220px]">
              <p className="font-mono text-[10px] tracking-[0.22em] text-sun-deep uppercase">Word of mouth</p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
                {Math.round(fill * 100)}% of trips rated 4 or 5. Nothing here is bought or collected
                through an app.
              </p>
            </div>
          </div>
        </Reveal>

        {/* featured trip */}
        <Reveal delay={120}>
          <figure className="relative mt-6 overflow-hidden rounded-3xl bg-ink text-cream">
            <div className="flex flex-wrap items-center justify-between gap-2 bg-sun px-5 py-2.5 sm:px-8">
              <p className="font-mono text-[9px] font-bold tracking-[0.24em] text-ink/70 uppercase">Featured trip</p>
              <p className="font-mono text-[10px] font-bold tracking-wide text-ink">
                {featured.code} · {featured.km}
              </p>
            </div>
            <div className="px-5 py-9 sm:px-10 sm:py-12">
              <span className="pointer-events-none absolute right-4 top-12 font-display text-[130px] leading-none text-sun/10 sm:right-10 sm:text-[190px]" aria-hidden="true">
                &rdquo;
              </span>
              <blockquote className="relative max-w-3xl font-display text-[21px] leading-[1.32] font-bold tracking-tight text-cream sm:text-[28px] sm:leading-[1.28] lg:text-[31px]">
                {featured.quote}
              </blockquote>

              <figcaption className="mt-8 flex flex-col gap-6 border-t border-cream/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-display text-[15px] font-extrabold tracking-tight text-cream">{featured.name}</p>
                  <p className="mt-1 font-mono text-[10.5px] tracking-[0.16em] text-cream/55 uppercase">{featured.area}</p>
                </div>
                <dl className="flex flex-wrap gap-x-8 gap-y-3">
                  <Meta label="Route" value={featured.route} />
                  <Meta label="Distance" value={featured.km} />
                  <Meta label="Paid" value={featured.fare} />
                  <Meta label="Rating" value={`${featured.stars}.0 ★`} />
                </dl>
              </figcaption>
            </div>
          </figure>
        </Reveal>

        {/* the rest */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((r, i) => (
            <Reveal key={r.code} delay={(i % 3) * 90} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:shadow-[0_26px_46px_-26px_rgba(23,21,15,0.3)]">
                <div className="flex items-center justify-between gap-2 bg-sun px-4 py-2 transition-colors duration-300 group-hover:bg-ink">
                  <p className="truncate font-mono text-[9px] font-bold tracking-[0.22em] text-ink/70 uppercase transition-colors duration-300 group-hover:text-sun/80">
                    {r.code}
                  </p>
                  <div className="flex shrink-0 text-ink transition-colors duration-300 group-hover:text-sun" aria-label={`${r.stars} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <StarIcon key={s} className={`h-3 w-3 ${s <= r.stars ? "" : "opacity-25"}`} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <blockquote className="text-[14px] leading-relaxed text-ink">{r.quote}</blockquote>

                  <figcaption className="mt-auto pt-5">
                    <div className="border-t border-dashed border-line pt-3.5">
                      <p className="font-display text-[13.5px] font-extrabold tracking-tight text-ink">{r.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] tracking-[0.14em] text-ink-soft uppercase">{r.area}</p>
                      <p className="mt-2.5 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10.5px] text-ink-soft">
                        <span className="max-w-full truncate">{r.route}</span>
                        <span className="text-line">|</span>
                        <span>{r.km}</span>
                        <span className="text-line">|</span>
                        <span className="font-bold text-ink">{r.fare}</span>
                      </p>
                    </div>
                  </figcaption>
                </div>
              </article>
            </Reveal>
          ))}

          {/* join-in card */}
          <Reveal delay={270} className="h-full">
            <div className="flex h-full flex-col justify-between gap-6 rounded-2xl border-2 border-dashed border-line bg-cream p-5">
              <div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-sun-deep uppercase">Rode with Mahesh?</p>
                <p className="mt-3 font-display text-[19px] leading-tight font-extrabold tracking-tight text-ink">
                  Your trip could be the next one printed here.
                </p>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-soft">
                  Send a line about the journey on WhatsApp — it helps families who are deciding
                  whether to trust the number.
                </p>
              </div>
              <a
                href={whatsappLink(`Namaste Maheshbhai, here is my feedback about my trip. (${CONTACT.phoneDisplay})`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 font-display text-[13.5px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                Share your experience
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={150}>
          <p className="mt-10 text-center font-mono text-[11px] tracking-[0.18em] text-ink-soft uppercase">
            Reviewed after the trip · Rode with Mahesh? Feedback on WhatsApp — {CONTACT.phoneDisplay}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-mono text-[9px] tracking-[0.22em] text-cream/45 uppercase">{label}</dt>
      <dd className="mt-1 font-mono text-[13px] font-bold text-sun">{value}</dd>
    </div>
  );
}
