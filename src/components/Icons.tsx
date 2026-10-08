import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
  ...props,
});

export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-5.4-6.5-10.2A6.5 6.5 0 0 1 12 4a6.5 6.5 0 0 1 6.5 6.8C18.5 15.6 12 21 12 21Z" />
    <circle cx="12" cy="10.6" r="2.3" />
  </svg>
);

export const FlagIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 21V4" />
    <path d="M5 4c2.2-1.4 4.3-1.4 6.5 0S15.8 5.4 18 4v8c-2.2 1.4-4.3 1.4-6.5 0S7.2 10.6 5 12" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.25" />
    <path d="M12 7.5V12l3 1.8" />
  </svg>
);

export const UsersIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5c.6-3.2 2.9-5 5.5-5s4.9 1.8 5.5 5" />
    <path d="M15.5 5.7a3.2 3.2 0 0 1 0 5.7M17.8 14.9c1.5.7 2.4 2.2 2.7 4.1" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 3 5 5.8v5.4c0 4.4 2.9 7.6 7 9.8 4.1-2.2 7-5.4 7-9.8V5.8L12 3Z" />
    <path d="m9 11.6 2.1 2.2L15.2 9.6" />
  </svg>
);

export const GpsIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="3.4" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" />
    <circle cx="12" cy="12" r="8.2" />
  </svg>
);

export const ShareIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="6" cy="12" r="2.6" />
    <circle cx="17.5" cy="5.5" r="2.6" />
    <circle cx="17.5" cy="18.5" r="2.6" />
    <path d="m8.4 10.7 6.8-3.9M8.4 13.3l6.8 3.9" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 4.5C5 3.7 5.7 3 6.5 3h2L10 7 8.2 8.8a12.5 12.5 0 0 0 7 7L17 14l4 1.5v2c0 .8-.7 1.5-1.5 1.5C10.9 19 5 13.1 5 4.5Z" />
  </svg>
);

export const BadgeIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="4.5" y="3.5" width="15" height="17" rx="2.5" />
    <circle cx="12" cy="9.5" r="2.6" />
    <path d="M7.5 17.5c.8-2.1 2.5-3.2 4.5-3.2s3.7 1.1 4.5 3.2" />
  </svg>
);

export const LockIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="5" y="10.5" width="14" height="10" rx="2.5" />
    <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    <path d="M12 14.5v2.5" />
  </svg>
);

export const StarIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2.8l2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.1l6.1-.7L12 2.8z" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15M13.5 5.5 20 12l-6.5 6.5" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m4.5 12.5 5 5L19.5 6.5" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.22 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
  </svg>
);

export const CardIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
    <path d="M3 10h18M7 14.5h4" />
  </svg>
);

export const WheelchairIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="10" cy="4.5" r="1.8" />
    <path d="M10 7v5h5l2.5 5" />
    <path d="M10 9.5h4" />
    <path d="M13.6 14.7a5 5 0 1 1-6.4-6.2" />
  </svg>
);

/** "MC" logo mark, styled as a yellow commercial number plate */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {/* styled after an Indian yellow commercial number plate */}
      <rect x="1.5" y="1.5" width="37" height="37" rx="8" fill="#FFC400" stroke="#17150F" strokeWidth="2" />
      <rect x="5" y="5" width="30" height="30" rx="5" fill="none" stroke="#17150F" strokeWidth="1" opacity="0.35" />
      <text
        x="20"
        y="25.5"
        textAnchor="middle"
        fontSize="15"
        fontWeight="900"
        fill="#17150F"
        style={{ fontFamily: "var(--font-archivo), Archivo, sans-serif", letterSpacing: "-0.5px" }}
      >
        MC
      </text>
      <rect x="9" y="29.5" width="22" height="2" rx="1" fill="#17150F" />
    </svg>
  );
}

/** Side-profile cab used in fleet cards */
export function CabSide({ variant = 0, className = "" }: { variant?: 0 | 1 | 2 | 3 | 4; className?: string }) {
  const body = [
    // city sedan
    "M8 30c-2.5 0-4-1.6-4-3.8V22c0-1.6 1-2.6 2.6-3L14 17.4c2-.9 3.6-1.3 6-1.3h6.5c2.3 0 4.2.5 6.2 1.4l5.7 2.4c1.4.6 2.1 1.5 2.1 2.9v4.2c0 2.3-1.4 4-3.5 4",
    // comfort sedan (longer, sleeker)
    "M5 30c-2 0-3.2-1.5-3.2-3.4V22c0-1.4.9-2.4 2.3-2.8l8.6-2.9c2.3-.8 4.2-1.2 6.6-1.2h8c2.6 0 4.6.6 6.8 1.6l6.4 2.7c1.3.5 1.9 1.4 1.9 2.6v4.6c0 2-1.2 3.4-3 3.4",
    // xl minivan (boxy)
    "M6 30c-1.8 0-3-1.4-3-3.2V19.5c0-2 .8-3.2 2.8-3.6l8-1.6c2-.4 3.8-.6 6-.6h7.4c2.4 0 4.4.6 6.6 1.8l4.4 2.4c1.2.7 1.8 1.6 1.8 2.9v5.9c0 1.8-1.2 3.2-3 3.2",
    // lux (long hood)
    "M4 30c-1.8 0-2.9-1.4-2.9-3.1V23c0-1.2.7-2 2-2.4l9-2.7c2.4-.8 4.6-1.2 7.2-1.2h8.4c2.6 0 4.8.6 7 1.7l5 2.5c1.2.6 1.7 1.4 1.7 2.5v3.6c0 1.9-1.2 3.1-3 3.1",
    // tempo traveller (tall van)
    "M5 30c-1.6 0-2.6-1.2-2.6-2.8V12.4c0-1.8 1-2.8 2.8-2.8h29.4c2 0 3.4.8 4.6 2.3l5.2 6.8c.8 1 1.2 2.2 1.2 3.4v5.1c0 1.6-1 2.8-2.6 2.8",
  ][variant];

  const windows = [
    <g key="w0">
      <path d="M16 16.6c2-.7 3.7-1.1 5.9-1.1h3.5v6.8h-9.4l-.5-5.7Z" fill="currentColor" opacity="0.16" />
      <path d="M26.2 15.5h2.6c1.9 0 3.5.5 5.1 1.3l1.4.7v4.8h-9.1v-6.8Z" fill="currentColor" opacity="0.16" />
    </g>,
    <g key="w1">
      <path d="M17 15.8l6.4-1.4c1.6-.3 3-.4 4.6-.4h2.4v7h-12.4l-.5-5.8Z" fill="currentColor" opacity="0.16" />
      <path d="M30.6 14.2h1.6c2.3 0 4.3.5 6.4 1.5l1.9.9v4.8H30.6v-7.2Z" fill="currentColor" opacity="0.16" />
    </g>,
    <g key="w2">
      <path d="M11.5 17.6l6-1.2h8v8.4h-14l0-7.2Z" fill="currentColor" opacity="0.16" />
      <path d="M26.8 16.4h1.9c1.5 0 2.9.4 4.3 1.2l1.4.8v6.4H26.8v-8.4Z" fill="currentColor" opacity="0.16" />
    </g>,
    <g key="w3">
      <path d="M18 16.2l7-1.3c1.4-.2 2.8-.3 4.2-.3h1.8v7H18.6l-.6-5.4Z" fill="currentColor" opacity="0.16" />
      <path d="M31.5 14.9h1.4c2.5 0 4.7.6 6.9 1.7l1.6.8v4.7h-9.9v-7.2Z" fill="currentColor" opacity="0.16" />
    </g>,
    <g key="w4">
      <rect x="5.5" y="12.5" width="6" height="6" rx="1" fill="currentColor" opacity="0.16" stroke="none" />
      <rect x="13" y="12.5" width="6" height="6" rx="1" fill="currentColor" opacity="0.16" stroke="none" />
      <rect x="20.5" y="12.5" width="6" height="6" rx="1" fill="currentColor" opacity="0.16" stroke="none" />
      <rect x="28" y="12.5" width="5.5" height="6" rx="1" fill="currentColor" opacity="0.16" stroke="none" />
      <path d="M35.5 12.5h1.2c1 0 1.8.4 2.4 1.2l3.4 4.8h-7v-6Z" fill="currentColor" opacity="0.16" stroke="none" />
    </g>,
  ][variant];

  const wheelsY = 30;
  const w1x = variant === 2 ? 13 : variant === 3 ? 11 : variant === 4 ? 11 : 15;
  const w2x = variant === 2 ? 36 : variant === 3 ? 39 : variant === 4 ? 37 : 33;

  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <path d={body} />
      {windows}
      <circle cx={w1x} cy={wheelsY} r="4.1" />
      <circle cx={w2x} cy={wheelsY} r="4.1" />
      <circle cx={w1x} cy={wheelsY} r="1.4" fill="currentColor" stroke="none" />
      <circle cx={w2x} cy={wheelsY} r="1.4" fill="currentColor" stroke="none" />
      <path d="M6 24.5h3M39 24.5h3" opacity="0.5" />
    </svg>
  );
}
