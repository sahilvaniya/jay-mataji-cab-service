"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  quoteTrip,
  carClassById,
  formatINR,
  formatHours,
  normalizeIndianMobile,
  tripLabel,
  CAR_CLASSES,
  TRIP_TYPES,
  PLACE_SUGGESTIONS,
  type CarClassId,
  type TripType,
} from "@/lib/fare";
import { CONTACT, whatsappLink } from "@/lib/data";
import { PinIcon, FlagIcon, ClockIcon, UsersIcon, ArrowIcon, CheckIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { usePrefersReducedMotion } from "./Reveal";

export interface PrefillDetail {
  pickup?: string;
  dropoff?: string;
  tripType?: TripType;
}

interface Confirmed {
  code: string;
  name: string;
  phone: string;
  tripType: TripType;
  pickup: string;
  dropoff: string;
  car: string;
  passengers: number;
  fare: number | null;
  distanceKm: number | null;
  pickupAt: string | null;
}

const SCRAMBLE_CHARS = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

function useScramble(text: string, active: boolean) {
  const reduced = usePrefersReducedMotion();
  const [out, setOut] = useState("");
  useEffect(() => {
    if (!active) return;
    if (reduced) {
      setOut(text);
      return;
    }
    let frame = 0;
    const total = 22;
    const id = setInterval(() => {
      frame++;
      const solved = Math.floor((frame / total) * text.length);
      setOut(
        text
          .split("")
          .map((ch, i) => (i < solved || ch === "-" ? ch : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)]))
          .join("")
      );
      if (frame >= total) {
        setOut(text);
        clearInterval(id);
      }
    }, 45);
    return () => clearInterval(id);
  }, [text, active, reduced]);
  return out;
}

function formatWhen(iso: string | null): string {
  if (!iso) return "As soon as possible";
  return new Date(iso).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

function localMinDateTime(): string {
  const d = new Date(Date.now() + 30 * 60_000);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 16);
}

export default function BookingForm() {
  const [tripType, setTripType] = useState<TripType>("local");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [when, setWhen] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [carId, setCarId] = useState<CarClassId>("sedan");
  const [carTouched, setCarTouched] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<Confirmed | null>(null);
  const [minDT, setMinDT] = useState("");

  useEffect(() => {
    setMinDT(localMinDateTime());
    try {
      const saved = JSON.parse(localStorage.getItem("mc-customer") ?? "null") as { name?: string; phone?: string } | null;
      if (saved?.name) setName(saved.name);
      if (saved?.phone) setPhone(saved.phone);
    } catch {
      /* ignore */
    }
  }, []);

  // Popular-route cards dispatch this event to pre-fill the form.
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const detail = (e as CustomEvent<PrefillDetail>).detail ?? {};
      if (detail.pickup !== undefined) setPickup(detail.pickup);
      if (detail.dropoff !== undefined) setDropoff(detail.dropoff);
      if (detail.tripType) setTripType(detail.tripType);
      setDone(null);
      setError(null);
    };
    window.addEventListener("mc-prefill", onPrefill);
    return () => window.removeEventListener("mc-prefill", onPrefill);
  }, []);

  // Suggest the smallest car that fits, unless the user picked one.
  useEffect(() => {
    if (carTouched) return;
    const fit = CAR_CLASSES.find((c) => c.seats >= passengers) ?? CAR_CLASSES[CAR_CLASSES.length - 1];
    setCarId(fit.id);
  }, [passengers, carTouched]);

  const quote = useMemo(
    () => quoteTrip({ pickup, dropoff, passengers, carId, tripType }),
    [pickup, dropoff, passengers, carId, tripType]
  );
  const car = carClassById(carId);
  const scrambled = useScramble(done?.code ?? "", !!done);

  const submit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);
      if (pickup.trim().length < 3 || dropoff.trim().length < 3) {
        setError("Please enter both pickup and drop — an area or city name is enough.");
        return;
      }
      if (!quote.ok && (quote.reason === "same" || quote.reason === "seats")) {
        setError(quote.message);
        return;
      }
      if (name.trim().length < 2) {
        setError("Please enter your name so Mahesh knows whom to call.");
        return;
      }
      const mobile = normalizeIndianMobile(phone);
      if (!mobile) {
        setError("Please enter a valid 10-digit Indian mobile number.");
        return;
      }
      setBusy(true);
      try {
        const res = await fetch("/api/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: name.trim(),
            customerPhone: mobile,
            tripType,
            pickup: pickup.trim(),
            dropoff: dropoff.trim(),
            carType: carId,
            passengers,
            pickupAt: when ? new Date(when).toISOString() : null,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error ?? "failed");
        localStorage.setItem("mc-customer", JSON.stringify({ name: name.trim(), phone: mobile }));
        setDone({
          code: data.code,
          name: name.trim(),
          phone: mobile,
          tripType,
          pickup: pickup.trim(),
          dropoff: dropoff.trim(),
          car: car.name,
          passengers,
          fare: data.fareRupees,
          distanceKm: data.distanceKm,
          pickupAt: data.pickupAt,
        });
      } catch (err) {
        const msg = err instanceof Error && err.message !== "failed" ? err.message : null;
        setError(msg ?? `Couldn't send the booking. Please call ${CONTACT.phoneDisplay} directly.`);
      } finally {
        setBusy(false);
      }
    },
    [pickup, dropoff, quote, name, phone, tripType, carId, passengers, when, car.name]
  );

  /* ---------------- confirmation ---------------- */
  if (done) {
    const waText = [
      `Namaste Maheshbhai, I just booked on your website.`,
      `Booking: ${done.code}`,
      `Name: ${done.name} (${done.phone})`,
      `Trip: ${tripLabel(done.tripType)} · ${done.car} · ${done.passengers} pax`,
      `From: ${done.pickup}`,
      `To: ${done.dropoff}`,
      `When: ${formatWhen(done.pickupAt)}`,
      done.fare ? `Estimate: ${formatINR(done.fare)} + tolls/parking` : `Fare: please quote`,
    ].join("\n");

    return (
        <div className="overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_30px_60px_-30px_rgba(23,21,15,0.3)]">
        <div className="h-1.5 bg-sun" aria-hidden="true" />
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sun text-ink">
              <CheckIcon className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <div>
              <p className="font-mono text-[10.5px] tracking-[0.22em] text-sun-deep uppercase">Booking received</p>
              <h3 className="font-display text-2xl font-extrabold tracking-tight">Thank you, {done.name.split(" ")[0]}.</h3>
            </div>
          </div>

          <div className="mt-6 rounded-xl border-2 border-dashed border-ink/25 bg-sun-wash px-5 py-4 text-center">
            <p className="font-mono text-[10px] tracking-[0.28em] text-ink-soft uppercase">Booking code</p>
            <p className="mt-1 font-mono text-4xl font-bold tracking-[0.14em] text-ink" aria-label={done.code}>
              {scrambled || "\u00A0"}
            </p>
          </div>

          <p className="mt-5 text-[14.5px] leading-relaxed text-ink-soft">
            Mahesh will call you on <strong className="font-semibold text-ink">+91 {done.phone.replace(/(\d{5})(\d{5})/, "$1 $2")}</strong> within
            about 15 minutes to confirm. Want it faster? Send the details on WhatsApp.
          </p>

          <dl className="mt-5 grid gap-3 rounded-xl border border-line bg-paper p-4 text-[13.5px]">
            <Row k="Route" v={`${done.pickup} → ${done.dropoff}`} />
            <Row k="Trip" v={`${tripLabel(done.tripType)} · ${done.car} · ${done.passengers} pax`} />
            <Row k="Pickup" v={formatWhen(done.pickupAt)} />
            <Row
              k="Estimate"
              v={done.fare ? `${formatINR(done.fare)}${done.distanceKm ? ` · ~${done.distanceKm} km` : ""} + tolls/parking` : "Mahesh will quote on the call"}
            />
          </dl>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={whatsappLink(waText)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 font-display text-[14px] font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:brightness-95"
            >
              <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
            </a>
            <a
              href={`tel:${CONTACT.phoneTel}`}
              className="flex items-center justify-center gap-2 rounded-full bg-ink py-3.5 font-display text-[14px] font-bold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
            >
              <PhoneIcon className="h-4.5 w-4.5" /> Call Mahesh
            </a>
          </div>
          <div className="mt-4 flex items-center justify-between text-[13px]">
            <Link href={`/bookings?phone=${done.phone}`} className="link-under font-semibold text-ink">
              View my bookings →
            </Link>
            <button
              onClick={() => {
                setDone(null);
                setPickup("");
                setDropoff("");
                setWhen("");
              }}
              className="link-under font-semibold text-ink-soft hover:text-ink"
            >
              Book another trip
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- form ---------------- */
  return (
    <form
      onSubmit={submit}
      noValidate
      className="overflow-hidden rounded-2xl border border-line bg-cream shadow-[0_30px_60px_-30px_rgba(23,21,15,0.3)]"
    >
      <div className="h-1.5 bg-sun" aria-hidden="true" />
      <div className="p-5 sm:p-6">
        {/* trip type */}
        <div className="grid grid-cols-3 gap-1 rounded-xl border border-line bg-paper p-1" role="tablist" aria-label="Trip type">
          {TRIP_TYPES.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={tripType === t.id}
              onClick={() => setTripType(t.id)}
              className={`rounded-lg px-2 py-2 text-center transition-colors ${
                tripType === t.id ? "bg-ink text-cream" : "text-ink-soft hover:bg-sun-soft hover:text-ink"
              }`}
            >
              <span className="block font-display text-[13px] font-bold">{t.label}</span>
              <span className={`hidden font-mono text-[9px] tracking-wide sm:block ${tripType === t.id ? "text-sun" : "text-ink-soft/70"}`}>
                {t.hint}
              </span>
            </button>
          ))}
        </div>

        {/* route */}
        <div className="mt-4 grid grid-cols-[22px_1fr] gap-x-3 gap-y-3">
          <div className="flex flex-col items-center pt-3.5" aria-hidden="true">
            <span className="h-4 w-4 rounded-full border-2 border-ink bg-sun" />
            <span className="w-px flex-1 border-l-2 border-dotted border-ink/30" />
          </div>
          <Field icon={<PinIcon className="h-4.5 w-4.5" />}>
            <input
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              list="mc-places"
              placeholder="Pickup — e.g. Navrangpura, Ahmedabad"
              aria-label="Pickup location"
              className={inputCls}
            />
          </Field>
          <div className="flex justify-center pt-3.5" aria-hidden="true">
            <span className="h-4 w-4 rounded-sm border-2 border-ink bg-ink" />
          </div>
          <Field icon={<FlagIcon className="h-4.5 w-4.5" />}>
            <input
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              list="mc-places"
              placeholder={tripType === "local" ? "Drop — e.g. SVPI Airport" : "Destination city — e.g. Udaipur"}
              aria-label="Drop location"
              className={inputCls}
            />
          </Field>
        </div>
        <datalist id="mc-places">
          {PLACE_SUGGESTIONS.map((p) => (
            <option key={p} value={p} />
          ))}
        </datalist>

        {/* when + passengers */}
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto]">
          <Field icon={<ClockIcon className="h-4.5 w-4.5" />}>
            <input
              type="datetime-local"
              value={when}
              min={minDT || undefined}
              onChange={(e) => setWhen(e.target.value)}
              aria-label="Pickup date and time (leave empty for as soon as possible)"
              className={`${inputCls} ${when ? "" : "text-ink-soft/70"}`}
            />
          </Field>
          <div className="flex items-center gap-1 rounded-xl border border-line bg-paper p-1.5">
            <UsersIcon className="mx-2 h-4.5 w-4.5 text-ink-soft" />
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.max(1, p - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-lg font-bold hover:bg-sun-soft"
              aria-label="Fewer passengers"
            >
              −
            </button>
            <span className="w-6 text-center font-mono text-sm font-bold" aria-live="polite">
              {passengers}
            </span>
            <button
              type="button"
              onClick={() => setPassengers((p) => Math.min(12, p + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg font-display text-lg font-bold hover:bg-sun-soft"
              aria-label="More passengers"
            >
              +
            </button>
          </div>
        </div>
        <p className="mt-1.5 pl-1 font-mono text-[10px] tracking-wide text-ink-soft">
          Leave date empty for “as soon as possible”
        </p>

        {/* car */}
        <div className="mt-4 grid grid-cols-3 gap-1 rounded-xl border border-line bg-paper p-1.5 sm:grid-cols-5">
          {CAR_CLASSES.map((c, i) => {
            const fits = c.seats >= passengers;
            return (
              <button
                key={c.id}
                type="button"
                disabled={!fits}
                onClick={() => {
                  setCarId(c.id);
                  setCarTouched(true);
                }}
                aria-pressed={carId === c.id}
                className={`rounded-lg px-1 py-2 text-center transition-colors disabled:cursor-not-allowed disabled:opacity-35 ${
                  i === CAR_CLASSES.length - 1 ? "col-span-2 sm:col-span-1" : ""
                } ${carId === c.id ? "bg-ink text-sun" : "text-ink-soft hover:bg-sun-soft hover:text-ink"}`}
              >
                <span className="block truncate font-display text-[12px] font-bold">{c.short}</span>
                <span className="block truncate font-mono text-[9px] opacity-70">{c.seatsLabel ?? `${c.seats} seats`}</span>
              </button>
            );
          })}
        </div>

        {/* contact */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            aria-label="Your name"
            autoComplete="name"
            className={`${inputCls} pl-4`}
          />
          <div className="relative">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[13.5px] font-bold text-ink-soft">+91</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Mobile number"
              aria-label="Mobile number"
              inputMode="tel"
              autoComplete="tel-national"
              className={`${inputCls} pl-13`}
            />
          </div>
        </div>

        {/* meter */}
        <div className="mt-5 rounded-xl bg-ink px-5 py-4">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.22em] text-cream/50 uppercase">
                <span className="meter-blink inline-block h-1.5 w-1.5 rounded-full bg-sun" />
                {quote.ok && quote.approx ? "Approx. fare" : "Estimated fare"}
              </p>
              <p className="mt-1 font-mono text-[32px] leading-none font-bold tracking-tight text-sun tabular-nums">
                {quote.ok ? formatINR(quote.total) : "₹ – – –"}
              </p>
            </div>
            <div className="text-right font-mono text-[10.5px] leading-relaxed text-cream/60">
              {quote.ok ? (
                <>
                  <p className="text-cream/90">
                    ~{quote.distanceKm} km · {formatHours(quote.hours)}
                  </p>
                  <p>{quote.rateLabel}</p>
                </>
              ) : (
                <p className="max-w-[190px]">{quote.message}</p>
              )}
            </div>
          </div>
          {quote.ok && (
            <>
              <button
                type="button"
                onClick={() => setShowBreakdown((v) => !v)}
                className="mt-3 font-mono text-[10px] tracking-[0.16em] text-cream/50 uppercase hover:text-sun"
                aria-expanded={showBreakdown}
              >
                {showBreakdown ? "− Hide" : "+ Show"} breakdown
              </button>
              {showBreakdown && (
                <div className="mt-2 space-y-1.5 border-t border-dashed border-cream/20 pt-2.5 font-mono text-[11.5px]">
                  {quote.lines.map((l) => (
                    <p key={l.label} className="flex items-baseline gap-2">
                      <span className="text-cream/60">{l.label}</span>
                      <span className="flex-1 border-b border-dotted border-cream/20" />
                      <span className="text-cream">{formatINR(l.amount)}</span>
                    </p>
                  ))}
                  {tripType !== "local" && <p className="pt-1 text-cream/45">+ toll, parking & state tax at actuals</p>}
                </div>
              )}
              {quote.note && <p className="mt-2.5 text-[12px] text-sun/90">{quote.note}</p>}
            </>
          )}
        </div>

        {error && (
          <p role="alert" className="mt-3 rounded-lg border border-warn/30 bg-warn/10 px-3.5 py-2.5 text-[13px] font-medium text-warn">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="group mt-5 flex w-full items-center justify-center gap-2.5 rounded-full bg-sun py-4 font-display text-[15px] font-extrabold tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(226,164,0,0.7)] disabled:translate-y-0 disabled:opacity-70"
        >
          {busy ? (
            <>
              <span className="spin inline-block h-4 w-4 rounded-full border-2 border-ink/30 border-t-ink" />
              Sending to Mahesh…
            </>
          ) : (
            <>
              {quote.ok ? `Request booking — ${formatINR(quote.total)}` : "Request booking"}
              <ArrowIcon className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
            </>
          )}
        </button>
        <p className="mt-3 text-center font-mono text-[10px] tracking-wide text-ink-soft">
          No advance for local trips · Pay cash or UPI · Mahesh calls back to confirm
        </p>
      </div>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-line bg-paper py-3.5 pl-12 pr-4 text-[14.5px] font-medium placeholder:text-ink-soft/60 focus:border-sun-deep focus:bg-cream";

function Field({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <label className="relative block">
      <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sun-deep">{icon}</span>
      {children}
    </label>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="grid grid-cols-[72px_1fr] gap-3">
      <dt className="font-mono text-[10px] tracking-[0.16em] text-ink-soft uppercase pt-0.5">{k}</dt>
      <dd className="font-medium text-ink">{v}</dd>
    </div>
  );
}
