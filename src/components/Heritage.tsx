"use client";

import { Reveal, usePrefersReducedMotion } from "./Reveal";

export default function Heritage() {
  const reduced = usePrefersReducedMotion();
  return (
    <section id="about" className="scroll-mt-24 border-b border-line bg-paper py-20 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <div className="relative overflow-hidden rounded-2xl border border-line shadow-[0_36px_70px_-34px_rgba(23,21,15,0.45)]">
            <div className={reduced ? "" : "kenburns"}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/37955325/pexels-photo-37955325.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                alt="A car on an Indian highway at sunset"
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 left-0 bg-ink px-5 py-3">
              <p className="font-mono text-[10px] tracking-[0.24em] text-sun uppercase">On the highway · NH-48</p>
            </div>
          </div>
        </Reveal>

        <div className="lg:col-span-6 lg:pl-8">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.22em] text-sun-deep uppercase">03 — About Mahesh</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink sm:text-4xl lg:text-[2.9rem] lg:leading-[1.05]">
              Ahmedabad is home.
              <br />
              <span className="text-sun-deep">India is the route map.</span>
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
              Driving is my full-time work, not a side job. I know Ahmedabad lane by lane — the quick way
              to the airport at 5 a.m., where to stop for chai on the Rajkot highway, which temple gate
              is closest at Dwarka. Most of my passengers are families, office travellers, and elders
              going on yatra, and most of them call me again.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <p className="mt-4 max-w-xl text-[15.5px] leading-relaxed text-ink-soft">
              I keep things simple: a clean car, an honest fare, and a phone that I actually answer.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
              {[
                ["Ahmedabad", "home base"],
                ["All India", "outstation trips"],
                ["24 × 7", "call or WhatsApp"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="font-display text-xl font-extrabold tracking-tight text-ink sm:text-2xl">{v}</p>
                  <p className="mt-1 font-mono text-[9.5px] tracking-[0.16em] text-ink-soft uppercase">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
