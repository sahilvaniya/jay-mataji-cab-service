"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { carClassById, formatINR, normalizeIndianMobile, tripLabel } from "@/lib/fare";
import { CONTACT, whatsappLink } from "@/lib/data";
import { PinIcon, FlagIcon, ArrowIcon, PhoneIcon } from "@/components/Icons";

interface Booking {
  id: number;
  code: string;
  customerName: string;
  tripType: string;
  pickup: string;
  dropoff: string;
  carType: string;
  passengers: number;
  distanceKm: number | null;
  fareRupees: number | null;
  status: string;
  pickupAt: string | null;
  createdAt: string;
}

const STATUS_STYLE: Record<string, string> = {
  requested: "bg-sun text-ink",
  confirmed: "bg-ink text-sun",
  completed: "bg-ok/15 text-ok",
  cancelled: "bg-line text-ink-soft",
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
}

export default function BookingsPage() {
  const [phoneInput, setPhoneInput] = useState("");
  const [phone, setPhone] = useState<string | null>(null);
  const [items, setItems] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState<number | null>(null);

  const load = useCallback(async (mobile: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/bookings?phone=${mobile}`, { cache: "no-store" });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error ?? "Could not load bookings.");
      setItems(data.bookings as Booking[]);
      setPhone(mobile);
      localStorage.setItem(
        "mc-customer",
        JSON.stringify({ ...(JSON.parse(localStorage.getItem("mc-customer") ?? "{}") as object), phone: mobile })
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load bookings.");
      setItems(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get("phone");
    let saved: string | undefined;
    try {
      saved = (JSON.parse(localStorage.getItem("mc-customer") ?? "null") as { phone?: string } | null)?.phone;
    } catch {
      /* ignore */
    }
    const initial = normalizeIndianMobile(fromUrl ?? saved ?? "");
    if (initial) {
      setPhoneInput(initial);
      load(initial);
    }
  }, [load]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const mobile = normalizeIndianMobile(phoneInput);
    if (!mobile) {
      setError("Please enter the 10-digit mobile number you booked with.");
      return;
    }
    load(mobile);
  };

  const cancel = async (b: Booking) => {
    if (!phone) return;
    if (!window.confirm(`Cancel booking ${b.code}?`)) return;
    setCancelling(b.id);
    try {
      const res = await fetch(`/api/bookings/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "cancelled", phone }),
      });
      if (res.ok) setItems((xs) => xs?.map((x) => (x.id === b.id ? { ...x, status: "cancelled" } : x)) ?? null);
    } finally {
      setCancelling(null);
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pb-24 pt-[112px]">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <p className="pt-6 font-mono text-[11px] tracking-[0.22em] text-sun-deep uppercase">Your trips</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">My bookings</h1>
            <Link
              href="/#book"
              className="group flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-display text-[13px] font-bold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
            >
              New booking <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <form onSubmit={submit} className="mt-8 flex flex-col gap-3 rounded-2xl border border-line bg-cream p-4 sm:flex-row sm:items-center sm:p-5">
            <label className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-mono text-[13.5px] font-bold text-ink-soft">+91</span>
              <input
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                inputMode="tel"
                placeholder="Mobile number used for booking"
                aria-label="Mobile number used for booking"
                className="w-full rounded-xl border border-line bg-paper py-3.5 pl-13 pr-4 text-[14.5px] font-medium placeholder:text-ink-soft/60 focus:border-sun-deep focus:bg-cream"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="rounded-full bg-sun px-7 py-3.5 font-display text-[14px] font-extrabold text-ink transition-all hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? "Loading…" : "Show my bookings"}
            </button>
          </form>
          {error && (
            <p role="alert" className="mt-3 rounded-lg border border-warn/30 bg-warn/10 px-3.5 py-2.5 text-[13px] font-medium text-warn">
              {error}
            </p>
          )}

          {loading && !items ? (
            <div className="mt-8 grid gap-4">
              {[0, 1].map((i) => (
                <div key={i} className="h-36 animate-pulse rounded-2xl border border-line bg-cream/70" />
              ))}
            </div>
          ) : items && items.length === 0 ? (
            <div className="mt-8 rounded-2xl border-2 border-dashed border-line bg-cream px-8 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sun-soft">
                <PinIcon className="h-7 w-7 text-sun-deep" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-extrabold text-ink">No bookings on this number yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-[14px] text-ink-soft">
                Booked by phone? Those are in Mahesh&apos;s diary, not here — call to check any time.
              </p>
              <Link
                href="/#book"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-[14px] font-bold text-cream transition-all hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
              >
                Book your first trip
              </Link>
            </div>
          ) : items ? (
            <ul className="mt-8 grid gap-4">
              {items.map((b) => {
                const car = carClassById(b.carType);
                const isCancelled = b.status === "cancelled";
                return (
                  <li
                    key={b.id}
                    className={`rounded-2xl border border-line bg-cream p-5 transition-shadow duration-300 hover:shadow-[0_22px_44px_-24px_rgba(23,21,15,0.3)] sm:p-6 ${
                      isCancelled ? "opacity-70" : ""
                    }`}
                  >
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <span className="rounded bg-ink px-2 py-1 font-mono text-[11px] font-bold text-sun">{b.code}</span>
                          <span className={`rounded-full px-2.5 py-1 font-mono text-[10px] font-bold tracking-[0.14em] uppercase ${STATUS_STYLE[b.status] ?? "bg-line text-ink-soft"}`}>
                            {b.status}
                          </span>
                          <span className="font-mono text-[10.5px] text-ink-soft">
                            {b.pickupAt ? `Pickup ${fmt(b.pickupAt)}` : `Booked ${fmt(b.createdAt)} · ASAP`}
                          </span>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] font-semibold text-ink">
                          <span className="flex items-center gap-2">
                            <PinIcon className="h-4 w-4 text-sun-deep" /> {b.pickup}
                          </span>
                          <ArrowIcon className="h-4 w-4 text-ink-soft" />
                          <span className="flex items-center gap-2">
                            <FlagIcon className="h-4 w-4 text-sun-deep" /> {b.dropoff}
                          </span>
                        </div>
                        <p className="mt-2.5 font-mono text-[11.5px] text-ink-soft">
                          {tripLabel(b.tripType)} · {car.name} · {b.passengers} pax · {b.customerName}
                        </p>
                      </div>

                      <div className="flex flex-col items-end gap-3">
                        <div className="text-right">
                          <p className="font-mono text-[9.5px] tracking-[0.2em] text-ink-soft uppercase">Estimate</p>
                          <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
                            {b.fareRupees ? formatINR(b.fareRupees) : "On call"}
                          </p>
                          {b.distanceKm ? <p className="font-mono text-[10.5px] text-ink-soft">~{b.distanceKm} km</p> : null}
                        </div>
                        {(b.status === "requested" || b.status === "confirmed") && (
                          <div className="flex gap-2">
                            <a
                              href={whatsappLink(`Namaste Maheshbhai, about my booking ${b.code} (${b.pickup} → ${b.dropoff}).`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10.5px] font-bold tracking-[0.1em] text-[#1fa855] uppercase transition-colors hover:border-[#25D366]"
                            >
                              WhatsApp
                            </a>
                            <button
                              onClick={() => cancel(b)}
                              disabled={cancelling === b.id}
                              className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10.5px] font-bold tracking-[0.1em] text-ink-soft uppercase transition-colors hover:border-warn hover:text-warn disabled:opacity-50"
                            >
                              {cancelling === b.id ? "Cancelling…" : "Cancel"}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : null}

          <div className="mt-10 flex flex-col items-start justify-between gap-3 rounded-2xl bg-ink px-6 py-5 text-cream sm:flex-row sm:items-center">
            <p className="text-[14px] text-cream/70">Need to change a booking? Changes are free — just call.</p>
            <a href={`tel:${CONTACT.phoneTel}`} className="flex items-center gap-2 font-mono text-[14px] font-bold text-sun">
              <PhoneIcon className="h-4 w-4" /> {CONTACT.phoneDisplay}
            </a>
          </div>
        </div>
      </main>
      <WhatsAppFloat />
    </>
  );
}
