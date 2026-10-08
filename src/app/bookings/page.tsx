"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import {
  buildWhatsAppMessage,
  deleteBooking,
  formatPhone,
  formatWhen,
  loadBookings,
  TRIP_TYPE_LABEL,
  type StoredBooking,
} from "@/lib/bookings";
import { carClassById } from "@/lib/fare";
import { CONTACT, whatsappLink } from "@/lib/data";
import { PinIcon, FlagIcon, ArrowIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";

export default function BookingsPage() {
  const [items, setItems] = useState<StoredBooking[] | null>(null);

  useEffect(() => {
    setItems(loadBookings());
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-paper pb-24 pt-[112px]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
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
          <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
            Every booking you send from this device, saved here for you. Nothing is stored on a
            server — to change a trip, open the message again or just call{" "}
            <a href={`tel:${CONTACT.phoneTel}`} className="link-under font-semibold text-ink">
              {CONTACT.phoneDisplay}
            </a>
            .
          </p>

          {items === null ? (
            <div className="mt-10 grid gap-4">
              {[0, 1].map((i) => (
                <div key={i} className="h-36 animate-pulse rounded-2xl border border-line bg-cream/70" />
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="mt-10 rounded-2xl border-2 border-dashed border-line bg-cream px-8 py-14 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sun-soft">
                <PinIcon className="h-7 w-7 text-sun-deep" />
              </div>
              <h2 className="mt-5 font-display text-2xl font-extrabold text-ink">No bookings on this device yet</h2>
              <p className="mx-auto mt-2 max-w-sm text-[14px] text-ink-soft">
                Fill in the booking form and your details go straight to Mahesh on WhatsApp — and
                get saved here so you can find them again.
              </p>
              <Link
                href="/#book"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-display text-[14px] font-bold text-cream transition-all hover:-translate-y-0.5 hover:bg-sun hover:text-ink"
              >
                Book your first trip
              </Link>
            </div>
          ) : (
            <ul className="mt-8 grid gap-4">
              {items.map((b) => {
                const car = carClassById(b.carType);
                return (
                  <li
                    key={b.id}
                    className="group overflow-hidden rounded-2xl border border-line bg-cream transition-shadow duration-300 hover:shadow-[0_22px_44px_-24px_rgba(23,21,15,0.3)]"
                  >
                    <div className="flex items-center justify-between gap-2 bg-sun px-4 py-2">
                      <p className="truncate font-mono text-[9px] font-bold tracking-[0.22em] text-ink/70 uppercase">
                        {TRIP_TYPE_LABEL[b.tripType]}
                      </p>
                      <p className="shrink-0 font-mono text-[10px] font-bold text-ink">{b.code}</p>
                    </div>

                    <div className="p-5 sm:p-6">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] font-semibold text-ink">
                        <span className="flex min-w-0 items-center gap-2">
                          <PinIcon className="h-4 w-4 shrink-0 text-sun-deep" />
                          <span className="truncate">{b.pickup}</span>
                        </span>
                        <ArrowIcon className="h-4 w-4 shrink-0 text-ink-soft" />
                        <span className="flex min-w-0 items-center gap-2">
                          <FlagIcon className="h-4 w-4 shrink-0 text-sun-deep" />
                          <span className="truncate">{b.dropoff}</span>
                        </span>
                      </div>

                      <p className="mt-2.5 font-mono text-[11.5px] text-ink-soft">
                        {car.name} · {b.passengers} pax · {b.name} ({formatPhone(b.phone)})
                      </p>

                      <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-dashed border-line pt-4">
                        <div>
                          <p className="font-mono text-[9.5px] tracking-[0.2em] text-ink-soft uppercase">Pickup</p>
                          <p className="mt-0.5 font-mono text-[12.5px] text-ink">{formatWhen(b.pickupAt)}</p>
                          {b.tripType === "round" ? (
                            <p className="mt-1 font-mono text-[11px] text-ink-soft">
                              Return: {formatWhen(b.returnAt)}
                            </p>
                          ) : null}
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-[9.5px] tracking-[0.2em] text-ink-soft uppercase">Rate</p>
                          <p className="font-display text-2xl font-extrabold tracking-tight text-ink">
                            ₹{car.perKm}
                            <span className="text-[12px] font-normal text-ink-soft"> / km</span>
                          </p>
                          <p className="font-mono text-[10.5px] text-ink-soft">fare on the call</p>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap gap-2">
                        <a
                          href={whatsappLink(buildWhatsAppMessage(b))}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 font-display text-[13px] font-bold text-white transition-all hover:-translate-y-0.5 hover:brightness-95"
                        >
                          <WhatsAppIcon className="h-4.5 w-4.5" /> Open message again
                        </a>
                        <a
                          href={`tel:${CONTACT.phoneTel}`}
                          className="flex items-center gap-2 rounded-full border border-line px-5 py-2.5 font-display text-[13px] font-bold text-ink transition-colors hover:border-ink"
                        >
                          <PhoneIcon className="h-4 w-4" /> Call
                        </a>
                        <button
                          onClick={() => {
                            deleteBooking(b.id);
                            setItems((xs) => xs?.filter((x) => x.id !== b.id) ?? null);
                          }}
                          className="rounded-full border border-line px-5 py-2.5 font-mono text-[10.5px] font-bold tracking-[0.12em] text-ink-soft uppercase transition-colors hover:border-warn hover:text-warn"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}

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
