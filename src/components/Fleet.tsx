import { CAR_CLASSES } from "@/lib/fare";
import { Reveal, SectionHead } from "./Reveal";
import { CabSide, UsersIcon } from "./Icons";

const ART: (0 | 1 | 2 | 3 | 4)[] = [0, 1, 2, 4];

export default function Fleet() {
  return (
    <section id="cars" className="scroll-mt-24 border-y border-line bg-cream py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHead
          index="02"
          kicker="The cars"
          title={
            <>
              One sedan I drive myself.
              <span className="text-sun-deep"> Bigger cars when the group is bigger.</span>
            </>
          }
          copy="Most trips go in my own Swift Dzire. For families and groups, I arrange an Ertiga, Innova Crysta, or Tempo Traveller with drivers I've known and worked with for years — same fare rules, same phone number, one bill."
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {CAR_CLASSES.map((c, i) => (
            <Reveal key={c.id} delay={i * 100}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-paper transition-all duration-300 hover:-translate-y-1.5 hover:border-ink hover:shadow-[0_28px_50px_-26px_rgba(23,21,15,0.35)]">
                <div className="checker-yellow opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden="true" />
                <div className="relative flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-xl font-extrabold tracking-tight text-ink uppercase">{c.name}</h3>
                      <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase">{c.vehicles}</p>
                    </div>
                    {c.owner === "mahesh" ? (
                      <span className="shrink-0 rounded-md bg-sun px-2 py-1 font-mono text-[9.5px] font-bold tracking-wide text-ink uppercase">
                        Mahesh drives
                      </span>
                    ) : (
                      <span className="shrink-0 rounded-md border border-line px-2 py-1 font-mono text-[9.5px] tracking-wide text-ink-soft uppercase">
                        On request
                      </span>
                    )}
                  </div>

                  <div className="mt-5 text-ink transition-transform duration-500 group-hover:translate-x-2">
                    <CabSide variant={ART[i]} className="h-24 w-full" />
                  </div>

                  <p className="mt-4 text-[13.5px] leading-relaxed text-ink-soft">{c.tagline}</p>

                  <div className="mt-5 flex items-center gap-3 border-t border-dashed border-line pt-4">
                    <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-soft">
                      <UsersIcon className="h-4 w-4" /> {c.seats} seats
                    </span>
                    <span className="font-mono text-[11px] text-ink-soft">· {c.bags} bags · AC</span>
                  </div>

                  <p className="mt-auto pt-4 font-mono text-[12px] font-bold tracking-wide text-ink">
                    ₹{c.oneWayPerKm}/km <span className="font-normal text-ink-soft">outstation · ₹{c.localPerKm}/km local</span>
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-ink-soft uppercase">
            ✚ All commercial yellow-plate vehicles · Carrier available for extra luggage on request
          </p>
        </Reveal>
      </div>
    </section>
  );
}
