"use client";

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const fn = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return reduced;
}

export function useInView<T extends HTMLElement>(rootMargin = "0px 0px -10% 0px") {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return { ref, inView };
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article" | "figure";
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      style={{ "--rv-delay": `${delay}ms` } as CSSProperties}
      className={`reveal ${inView ? "in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}

/** Line-mask headline reveal: each line slides up from behind a mask. */
export function MaskLines({
  lines,
  className = "",
  lineClassName = "",
}: {
  lines: (string | ReactNode)[];
  className?: string;
  lineClassName?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className={`mask-lines ${inView ? "in" : ""} ${className}`}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line">
          <span style={{ "--rv-delay": `${i * 110}ms` } as CSSProperties} className={lineClassName}>
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

export function SectionHead({
  index,
  kicker,
  title,
  copy,
  dark = false,
}: {
  index: string;
  kicker: string;
  title: ReactNode;
  copy?: string;
  dark?: boolean;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
      <Reveal className="lg:col-span-7">
        <p
          className={`font-mono text-[11px] tracking-[0.22em] uppercase ${
            dark ? "text-sun" : "text-sun-deep"
          }`}
        >
          {index} — {kicker}
        </p>
        <h2
          className={`mt-4 font-display text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.02] ${
            dark ? "text-cream" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {copy ? (
        <Reveal delay={120} className="lg:col-span-5">
          <p className={`text-[15px] leading-relaxed ${dark ? "text-cream/70" : "text-ink-soft"}`}>{copy}</p>
        </Reveal>
      ) : null}
    </div>
  );
}
