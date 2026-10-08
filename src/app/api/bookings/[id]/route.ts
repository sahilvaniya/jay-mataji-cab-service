import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { db } from "@/db";
import { bookings } from "@/db/schema";
import { normalizeIndianMobile } from "@/lib/fare";

/** PATCH /api/bookings/:id  { status: "cancelled", phone } */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const num = Number(id);
  if (!Number.isInteger(num) || num < 1) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const phone = normalizeIndianMobile(typeof body.phone === "string" ? body.phone : "");
  if (body.status !== "cancelled" || !phone) {
    return NextResponse.json({ error: "Only cancellation with the booking phone is supported." }, { status: 400 });
  }

  const rows = await db
    .update(bookings)
    .set({ status: "cancelled" })
    .where(and(eq(bookings.id, num), eq(bookings.customerPhone, phone)))
    .returning({ id: bookings.id });

  if (!rows.length) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, status: "cancelled" });
}
