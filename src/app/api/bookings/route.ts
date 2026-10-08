import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { bookings, type BookingRow } from "@/db/schema";
import { normalizeIndianMobile, quoteTrip, type CarClassId, type TripType } from "@/lib/fare";

const CAR_IDS = new Set(["sedan", "suv", "innova", "traveller"]);
const TRIP_IDS = new Set(["local", "oneway", "round"]);

function toPublic(b: BookingRow) {
  return {
    id: b.id,
    code: b.code,
    customerName: b.customerName,
    tripType: b.tripType,
    pickup: b.pickup,
    dropoff: b.dropoff,
    carType: b.carType,
    passengers: b.passengers,
    distanceKm: b.distanceKm,
    fareRupees: b.fareRupees,
    status: b.status,
    notes: b.notes,
    pickupAt: b.pickupAt,
    createdAt: b.createdAt,
  };
}

function generateCode() {
  return `MC-${Math.floor(1000 + Math.random() * 9000)}`;
}

/** GET /api/bookings?phone=9876543210 — a customer's own bookings only. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const phone = normalizeIndianMobile(url.searchParams.get("phone") ?? "");
  if (!phone) {
    return NextResponse.json({ error: "Enter a valid 10-digit mobile number." }, { status: 400 });
  }
  try {
    const rows = await db
      .select()
      .from(bookings)
      .where(eq(bookings.customerPhone, phone))
      .orderBy(desc(bookings.createdAt))
      .limit(30);
    return NextResponse.json({ bookings: rows.map(toPublic) });
  } catch (err) {
    console.error("GET /api/bookings failed:", err);
    return NextResponse.json({ error: "Could not load bookings." }, { status: 500 });
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const customerName = str(body.customerName);
  const phone = normalizeIndianMobile(str(body.customerPhone));
  const pickup = str(body.pickup);
  const dropoff = str(body.dropoff);
  const carType = str(body.carType);
  const tripType = str(body.tripType);
  const notes = str(body.notes).slice(0, 400) || null;
  const passengers = Number(body.passengers);
  const pickupAt = str(body.pickupAt) ? new Date(str(body.pickupAt)) : null;

  if (customerName.length < 2 || customerName.length > 60) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Please enter a valid 10-digit mobile number." }, { status: 400 });
  }
  if (pickup.length < 3 || pickup.length > 160 || dropoff.length < 3 || dropoff.length > 160) {
    return NextResponse.json({ error: "Pickup and drop are required." }, { status: 400 });
  }
  if (pickup.toLowerCase() === dropoff.toLowerCase()) {
    return NextResponse.json({ error: "Pickup and drop must be different." }, { status: 400 });
  }
  if (!CAR_IDS.has(carType) || !TRIP_IDS.has(tripType)) {
    return NextResponse.json({ error: "Unknown car or trip type." }, { status: 400 });
  }
  if (!Number.isInteger(passengers) || passengers < 1 || passengers > 12) {
    return NextResponse.json({ error: "Passengers must be between 1 and 12." }, { status: 400 });
  }
  if (pickupAt) {
    const t = pickupAt.getTime();
    if (Number.isNaN(t) || t < Date.now() - 10 * 60_000) {
      return NextResponse.json({ error: "Pickup time must be in the future." }, { status: 400 });
    }
    if (t > Date.now() + 90 * 86400_000) {
      return NextResponse.json({ error: "Bookings can be made up to 90 days ahead." }, { status: 400 });
    }
  }

  // Server recomputes the quote — never trusts a client-sent fare.
  const quote = quoteTrip({
    pickup,
    dropoff,
    passengers,
    carId: carType as CarClassId,
    tripType: tripType as TripType,
  });
  if (!quote.ok && quote.reason === "seats") {
    return NextResponse.json({ error: quote.message }, { status: 400 });
  }

  let inserted: BookingRow | undefined;
  for (let attempt = 0; attempt < 5 && !inserted; attempt++) {
    try {
      const [row] = await db
        .insert(bookings)
        .values({
          code: generateCode(),
          customerName,
          customerPhone: phone,
          tripType,
          pickup,
          dropoff,
          carType,
          passengers,
          distanceKm: quote.ok ? quote.distanceKm : null,
          fareRupees: quote.ok ? quote.total : null,
          status: "requested",
          notes,
          pickupAt,
        })
        .returning();
      inserted = row;
    } catch (err) {
      if ((err as { code?: string })?.code !== "23505") {
        console.error("POST /api/bookings failed:", err);
        return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
      }
    }
  }

  if (!inserted) {
    return NextResponse.json({ error: "Please try again." }, { status: 503 });
  }
  return NextResponse.json(toPublic(inserted), { status: 201 });
}
