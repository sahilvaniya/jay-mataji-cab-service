"use client";

import { usePrefersReducedMotion } from "./Reveal";
import { CAR_CLASSES } from "@/lib/fare";

/**
 * Stylised Ahmedabad street grid with an animated route from
 * Navrangpura across the Sabarmati to SVPI Airport. Pure SVG.
 */
export default function MapView() {
  const reduced = usePrefersReducedMotion();
  const route = "M70 320 L70 250 L170 250 L170 172 L280 172 L280 104 L372 104 L372 58";

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_30px_60px_-30px_rgba(23,21,15,0.25)]">
        <svg viewBox="0 0 480 400" className="block w-full" role="img" aria-label="Map showing a route from Navrangpura across the Sabarmati river to SVPI Airport, Ahmedabad">
          <rect width="480" height="400" fill="#F6F3E8" />

          <g stroke="#E3DECB" strokeWidth="1.5">
            {[40, 80, 120, 160, 200, 240, 280, 320, 360, 400, 440].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" />
            ))}
            {[36, 80, 124, 168, 212, 256, 300, 344, 388].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="480" y2={y} />
            ))}
          </g>

          <rect x="388" y="250" width="70" height="120" fill="#E9EAD6" />
          <rect x="20" y="30" width="86" height="60" fill="#E9EAD6" />

          <g stroke="#D8D2BB" strokeWidth="4">
            <line x1="170" y1="0" x2="170" y2="400" />
            <line x1="0" y1="172" x2="480" y2="172" />
            <line x1="0" y1="330" x2="480" y2="290" />
          </g>

          {/* Sabarmati river, running north–south */}
          <path d="M236 0 C 222 80, 252 140, 232 210 S 214 330, 240 400" fill="none" stroke="#CBD8D4" strokeWidth="14" strokeLinecap="round" />

          <g fontFamily="Space Mono, monospace" fontSize="8.5" fill="#9A9480" letterSpacing="1.5">
            <text x="292" y="164">AIRPORT ROAD</text>
            <text x="178" y="120" transform="rotate(-90 178 120)">ASHRAM ROAD</text>
            <text x="248" y="250" fill="#8FA7A1" transform="rotate(-80 248 250)">SABARMATI</text>
            <text x="28" y="22">SG HWY →</text>
            <text x="396" y="322">ATAL BRIDGE</text>
          </g>

          <path d={route} fill="none" stroke="#17150F" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" opacity="0.08" />
          <path id="mc-route" d={route} fill="none" stroke="#FFC400" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" className={reduced ? "" : "route-anim"} />

          <g>
            <circle cx="70" cy="320" r="16" fill="#FFC400" opacity="0.35" className={reduced ? "" : "blip"} />
            <rect x="58" y="308" width="24" height="24" rx="6" fill="#17150F" />
            <circle cx="70" cy="320" r="5" fill="#FFC400" />
          </g>
          <text x="90" y="324" fontFamily="Space Mono, monospace" fontSize="9.5" fill="#17150F" letterSpacing="1">PICKUP</text>
          <text x="90" y="336" fontFamily="Space Mono, monospace" fontSize="8" fill="#9A9480" letterSpacing="1">NAVRANGPURA</text>

          <g>
            <rect x="358" y="44" width="28" height="28" rx="7" fill="#FFC400" stroke="#17150F" strokeWidth="2" />
            <path d="M366 66V52m0 0h10l-2.6 3 2.6 3h-10" stroke="#17150F" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
          <text x="350" y="90" textAnchor="end" fontFamily="Space Mono, monospace" fontSize="9.5" fill="#17150F" letterSpacing="1">SVPI AIRPORT</text>

          {reduced ? (
            <g transform="translate(170 220)">
              <CabSprite />
            </g>
          ) : (
            <g>
              <CabSprite />
              <animateMotion dur="11s" repeatCount="indefinite" rotate="auto">
                <mpath href="#mc-route" />
              </animateMotion>
            </g>
          )}
        </svg>

        <div className="absolute right-3 top-3 rounded-lg border border-line bg-ink px-3 py-2 text-cream shadow-lg">
          <p className="font-mono text-[9px] tracking-[0.2em] text-cream/60 uppercase">Sedan rate</p>
          <p className="font-display text-lg font-extrabold text-sun">
            ₹{CAR_CLASSES[0].perKm}
            <span className="text-[11px] font-bold text-cream/70"> / km</span>
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl border border-line bg-cream px-4 py-2.5">
        <p className="flex items-center gap-2 font-mono text-[10.5px] tracking-[0.16em] text-ink-soft uppercase">
          <span className="relative flex h-2 w-2">
            <span className="meter-blink absolute inline-flex h-full w-full rounded-full bg-ok" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
          </span>
          Taking bookings now
        </p>
        <p className="font-mono text-[10.5px] tracking-[0.16em] text-ink-soft uppercase">Base · Ahmedabad</p>
      </div>
    </div>
  );
}

function CabSprite() {
  return (
    <g>
      <rect x="-11" y="-7" width="22" height="14" rx="4" fill="#FFC400" stroke="#17150F" strokeWidth="1.6" />
      <rect x="-7.5" y="-3.5" width="7" height="7" rx="1" fill="#17150F" opacity="0.25" />
      <rect x="3" y="-3.5" width="5" height="7" rx="1" fill="#17150F" opacity="0.18" />
    </g>
  );
}
