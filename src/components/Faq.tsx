"use client";

import { useState } from "react";
import { FAQS } from "@/lib/data";
import { Reveal, SectionHead } from "./Reveal";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-24 bg-paper py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-36">
              <SectionHead
                index="09"
                kicker="Questions"
                title={
                  <>
                    Asked on the
                    <br />
                    phone, often.
                  </>
                }
                copy="Anything else — just call or WhatsApp +91 93139 20315. Happy to answer before you book."
              />
            </div>
          </div>
          <div className="lg:col-span-8">
            <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-cream">
              {FAQS.map((f, i) => {
                const isOpen = open === i;
                return (
                  <Reveal as="li" key={f.q} delay={i * 60}>
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className={`flex w-full items-center justify-between gap-5 px-6 py-5 text-left transition-colors sm:px-8 ${
                        isOpen ? "bg-sun-wash" : "hover:bg-sun-wash/50"
                      }`}
                    >
                      <span className="flex items-baseline gap-4">
                        <span className={`font-mono text-[11px] font-bold ${isOpen ? "text-sun-deep" : "text-ink-soft/60"}`}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="font-display text-[16px] font-bold tracking-tight text-ink sm:text-[17px]">{f.q}</span>
                      </span>
                      <span
                        className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                          isOpen ? "rotate-45 border-ink bg-ink text-sun" : "border-line text-ink"
                        }`}
                        aria-hidden="true"
                      >
                        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M8 2.5v11M2.5 8h11" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className="grid transition-[grid-template-rows] duration-400 ease-out"
                      style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                    >
                      <div className="overflow-hidden">
                        <p className="px-6 pb-6 pl-[4.35rem] text-[14.5px] leading-relaxed text-ink-soft sm:px-8 sm:pl-[4.85rem]">
                          {f.a}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
