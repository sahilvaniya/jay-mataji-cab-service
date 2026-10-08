import { carClassById, type CarClassId, type TripType } from "./fare";

/* Frontend-only bookings: nothing is sent to a server. The details are
   saved on the customer's own device and handed to WhatsApp as a message. */

export interface StoredBooking {
  id: string;
  code: string;
  name: string;
  phone: string; // 10 digits
  tripType: TripType;
  pickup: string;
  dropoff: string;
  carType: CarClassId;
  passengers: number;
  pickupAt: string | null;
  returnAt: string | null;
  createdAt: string;
}

const KEY = "mc-bookings";

export function loadBookings(): StoredBooking[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    return Array.isArray(raw) ? (raw as StoredBooking[]) : [];
  } catch {
    return [];
  }
}

export function saveBooking(b: StoredBooking): void {
  try {
    const list = loadBookings();
    list.unshift(b);
    localStorage.setItem(KEY, JSON.stringify(list.slice(0, 30)));
  } catch {
    /* storage blocked — the WhatsApp message still goes out */
  }
}

export function deleteBooking(id: string): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(loadBookings().filter((b) => b.id !== id)));
  } catch {
    /* ignore */
  }
}

export const TRIP_TYPE_LABEL: Record<TripType, string> = {
  local: "LOCAL — within Ahmedabad",
  oneway: "ONE-WAY — drop only, no return",
  round: "ROUND TRIP — go & return",
};

export function formatPhone(phone: string): string {
  return phone.replace(/(\d{5})(\d{5})/, "+91 $1 $2");
}

export function formatWhen(iso: string | null): string {
  if (!iso) return "As soon as possible";
  return new Date(iso).toLocaleString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
}

/** The full WhatsApp message — every field the customer filled in. */
export function buildWhatsAppMessage(b: StoredBooking): string {
  const car = carClassById(b.carType);
  const lines: string[] = [
    "*New booking request* — Mahesh Chavda Taxi Service",
    "",
    `*Booking type:* ${TRIP_TYPE_LABEL[b.tripType]}`,
    `*Booking code:* ${b.code}`,
    "",
    `*Name:* ${b.name}`,
    `*Mobile:* ${formatPhone(b.phone)}`,
    "",
    `*Pickup:* ${b.pickup}`,
    `*Drop:* ${b.dropoff}`,
    `*Pickup time:* ${formatWhen(b.pickupAt)}`,
    "",
    `*Passengers:* ${b.passengers}`,
    `*Car:* ${car.name} (${car.vehicles})`,
    `*Rate:* ₹${car.perKm} per km`,
  ];

  if (b.tripType === "round") {
    lines.push(`*Return:* ${b.returnAt ? formatWhen(b.returnAt) : "Flexible — will decide with you"}`);
    lines.push("*Fare:* please quote for both ways");
  } else {
    lines.push("*Fare:* please quote");
  }

  lines.push(
    "*Extra at actuals:* tolls, parking & state tax",
    "",
    "Please confirm availability and the final fare. Thank you 🙏"
  );
  return lines.join("\n");
}

export function newCode(): string {
  return `MC-${Math.floor(1000 + Math.random() * 9000)}`;
}
