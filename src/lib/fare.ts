/* ------------------------------------------------------------------
 * Fare engine for Mahesh Chavda Taxi Service (Ahmedabad, all-India).
 * Pure TypeScript — shared by the booking form (live quote) and the
 * API (server recomputes, never trusts the client's number).
 * ------------------------------------------------------------------ */

export type CarClassId = "sedan" | "suv" | "innova" | "traveller";
export type TripType = "local" | "oneway" | "round";

export interface CarClass {
  id: CarClassId;
  name: string;
  short: string;
  tagline: string;
  vehicles: string;
  seats: number;
  bags: number;
  localBase: number;
  localPerKm: number;
  localMin: number;
  oneWayPerKm: number;
  roundPerKm: number;
  allowance: number; // driver allowance per day, outstation
  owner: "mahesh" | "partner";
}

export const CAR_CLASSES: CarClass[] = [
  {
    id: "sedan",
    name: "Sedan",
    short: "Sedan",
    tagline: "Mahesh's own car. AC, spotless, the right size for 1–4 people and a week of luggage.",
    vehicles: "Maruti Swift Dzire",
    seats: 4,
    bags: 3,
    localBase: 100,
    localPerKm: 15,
    localMin: 250,
    oneWayPerKm: 12,
    roundPerKm: 11,
    allowance: 300,
    owner: "mahesh",
  },
  {
    id: "suv",
    name: "SUV · Ertiga",
    short: "SUV",
    tagline: "Six seats with the boot still usable. The family-trip default.",
    vehicles: "Maruti Ertiga",
    seats: 6,
    bags: 4,
    localBase: 150,
    localPerKm: 18,
    localMin: 350,
    oneWayPerKm: 15,
    roundPerKm: 14,
    allowance: 300,
    owner: "partner",
  },
  {
    id: "innova",
    name: "Innova Crysta",
    short: "Innova",
    tagline: "Captain seats and a suspension that forgives NH-48. Built for 600 km days.",
    vehicles: "Toyota Innova Crysta",
    seats: 7,
    bags: 5,
    localBase: 200,
    localPerKm: 22,
    localMin: 500,
    oneWayPerKm: 19,
    roundPerKm: 18,
    allowance: 400,
    owner: "partner",
  },
  {
    id: "traveller",
    name: "Tempo Traveller",
    short: "Traveller",
    tagline: "Weddings, yatra groups, office outings — everybody in one vehicle.",
    vehicles: "Force Tempo Traveller · 12 seats",
    seats: 12,
    bags: 10,
    localBase: 500,
    localPerKm: 30,
    localMin: 1500,
    oneWayPerKm: 26,
    roundPerKm: 24,
    allowance: 500,
    owner: "partner",
  },
];

export const TRIP_TYPES: { id: TripType; label: string; hint: string }[] = [
  { id: "local", label: "Local", hint: "Within Ahmedabad · airport · station" },
  { id: "oneway", label: "One-way", hint: "Drop to another city" },
  { id: "round", label: "Round trip", hint: "Go, stay, come back" },
];

export function carClassById(id: string): CarClass {
  return CAR_CLASSES.find((c) => c.id === id) ?? CAR_CLASSES[0];
}

export function tripLabel(id: string): string {
  return TRIP_TYPES.find((t) => t.id === id)?.label ?? id;
}

/* ---------------- places ---------------- */

interface Place {
  name: string;
  aliases: string[];
  lat: number;
  lng: number;
  area?: boolean; // inside Ahmedabad
}

const AREAS: Place[] = [
  { name: "SVPI Airport, Ahmedabad", aliases: ["svpi", "ahmedabad airport", "sardar vallabhbhai", "amdavad airport"], lat: 23.0734, lng: 72.6266, area: true },
  { name: "Kalupur Railway Station", aliases: ["kalupur", "ahmedabad railway station", "ahmedabad junction"], lat: 23.027, lng: 72.601, area: true },
  { name: "Sabarmati Railway Station", aliases: ["sabarmati station", "sabarmati railway"], lat: 23.0796, lng: 72.5885, area: true },
  { name: "Navrangpura", aliases: ["navrangpura"], lat: 23.0365, lng: 72.5611, area: true },
  { name: "CG Road", aliases: ["cg road", "c.g. road", "c g road"], lat: 23.03, lng: 72.558, area: true },
  { name: "Satellite", aliases: ["satellite"], lat: 23.03, lng: 72.517, area: true },
  { name: "Vastrapur", aliases: ["vastrapur"], lat: 23.0395, lng: 72.529, area: true },
  { name: "Bodakdev", aliases: ["bodakdev"], lat: 23.0423, lng: 72.5129, area: true },
  { name: "Prahlad Nagar", aliases: ["prahlad nagar", "prahladnagar"], lat: 23.012, lng: 72.508, area: true },
  { name: "SG Highway", aliases: ["sg highway", "s.g. highway", "sg road", "thaltej"], lat: 23.05, lng: 72.51, area: true },
  { name: "Bopal", aliases: ["bopal", "south bopal"], lat: 23.033, lng: 72.464, area: true },
  { name: "Shela", aliases: ["shela"], lat: 23.0005, lng: 72.4551, area: true },
  { name: "Maninagar", aliases: ["maninagar"], lat: 22.996, lng: 72.603, area: true },
  { name: "Chandkheda", aliases: ["chandkheda"], lat: 23.11, lng: 72.585, area: true },
  { name: "Gota", aliases: ["gota"], lat: 23.1, lng: 72.54, area: true },
  { name: "Naroda", aliases: ["naroda"], lat: 23.07, lng: 72.66, area: true },
  { name: "Nikol", aliases: ["nikol"], lat: 23.045, lng: 72.67, area: true },
  { name: "Vastral", aliases: ["vastral"], lat: 23.0, lng: 72.66, area: true },
  { name: "Ellis Bridge", aliases: ["ellisbridge", "ellis bridge", "paldi"], lat: 23.0216, lng: 72.5629, area: true },
  { name: "Sabarmati Ashram", aliases: ["gandhi ashram", "sabarmati ashram"], lat: 23.0607, lng: 72.5809, area: true },
  { name: "Science City", aliases: ["science city"], lat: 23.079, lng: 72.495, area: true },
  { name: "Sanand", aliases: ["sanand"], lat: 22.9926, lng: 72.3818, area: true },
];

const CITIES: Place[] = [
  { name: "Ahmedabad", aliases: ["ahmedabad", "amdavad", "ahemdabad"], lat: 23.0225, lng: 72.5714 },
  { name: "Gandhinagar", aliases: ["gandhinagar"], lat: 23.2156, lng: 72.6369 },
  { name: "GIFT City", aliases: ["gift city"], lat: 23.16, lng: 72.684 },
  { name: "Vadodara", aliases: ["vadodara", "baroda"], lat: 22.3072, lng: 73.1812 },
  { name: "Surat", aliases: ["surat"], lat: 21.1702, lng: 72.8311 },
  { name: "Rajkot", aliases: ["rajkot"], lat: 22.3039, lng: 70.8022 },
  { name: "Bhavnagar", aliases: ["bhavnagar"], lat: 21.7645, lng: 72.1519 },
  { name: "Jamnagar", aliases: ["jamnagar"], lat: 22.4707, lng: 70.0577 },
  { name: "Junagadh", aliases: ["junagadh"], lat: 21.5222, lng: 70.4579 },
  { name: "Dwarka", aliases: ["dwarka"], lat: 22.2394, lng: 68.9678 },
  { name: "Somnath", aliases: ["somnath", "veraval"], lat: 20.888, lng: 70.4012 },
  { name: "Bhuj", aliases: ["bhuj", "kutch", "kachchh"], lat: 23.242, lng: 69.6669 },
  { name: "Statue of Unity", aliases: ["statue of unity", "kevadia", "ekta nagar"], lat: 21.838, lng: 73.7191 },
  { name: "Ambaji", aliases: ["ambaji"], lat: 24.331, lng: 72.8503 },
  { name: "Saputara", aliases: ["saputara"], lat: 20.574, lng: 73.747 },
  { name: "Anand", aliases: ["anand"], lat: 22.5645, lng: 72.9289 },
  { name: "Nadiad", aliases: ["nadiad"], lat: 22.6916, lng: 72.8634 },
  { name: "Mehsana", aliases: ["mehsana"], lat: 23.588, lng: 72.3693 },
  { name: "Palanpur", aliases: ["palanpur"], lat: 24.1724, lng: 72.438 },
  { name: "Pavagadh", aliases: ["pavagadh", "champaner"], lat: 22.46, lng: 73.53 },
  { name: "Daman", aliases: ["daman"], lat: 20.3974, lng: 72.8328 },
  { name: "Diu", aliases: ["diu"], lat: 20.7144, lng: 70.9874 },
  { name: "Udaipur", aliases: ["udaipur"], lat: 24.5854, lng: 73.7125 },
  { name: "Mount Abu", aliases: ["mount abu", "abu road"], lat: 24.5926, lng: 72.7156 },
  { name: "Nathdwara", aliases: ["nathdwara", "shrinathji"], lat: 24.9382, lng: 73.8226 },
  { name: "Jodhpur", aliases: ["jodhpur"], lat: 26.2389, lng: 73.0243 },
  { name: "Jaipur", aliases: ["jaipur"], lat: 26.9124, lng: 75.7873 },
  { name: "Mumbai", aliases: ["mumbai", "bombay"], lat: 19.076, lng: 72.8777 },
  { name: "Pune", aliases: ["pune"], lat: 18.5204, lng: 73.8567 },
  { name: "Nashik", aliases: ["nashik", "nasik"], lat: 19.9975, lng: 73.7898 },
  { name: "Shirdi", aliases: ["shirdi"], lat: 19.7645, lng: 74.4762 },
  { name: "Indore", aliases: ["indore"], lat: 22.7196, lng: 75.8577 },
  { name: "Ujjain", aliases: ["ujjain", "mahakal"], lat: 23.1765, lng: 75.7885 },
  { name: "Bhopal", aliases: ["bhopal"], lat: 23.2599, lng: 77.4126 },
  { name: "Delhi", aliases: ["delhi", "new delhi"], lat: 28.6139, lng: 77.209 },
  { name: "Agra", aliases: ["agra"], lat: 27.1767, lng: 78.0081 },
  { name: "Haridwar", aliases: ["haridwar", "rishikesh"], lat: 29.9457, lng: 78.1642 },
  { name: "Goa", aliases: ["goa", "panaji"], lat: 15.4909, lng: 73.8278 },
  { name: "Bengaluru", aliases: ["bengaluru", "bangalore"], lat: 12.9716, lng: 77.5946 },
  { name: "Hyderabad", aliases: ["hyderabad"], lat: 17.385, lng: 78.4867 },
];

const ALL_PLACES = [...AREAS, ...CITIES];

export const PLACE_SUGGESTIONS: string[] = [
  ...AREAS.map((a) => (a.name.includes("Ahmedabad") || a.name.includes("Station") ? a.name : `${a.name}, Ahmedabad`)),
  ...CITIES.map((c) => c.name),
];

export function matchPlace(input: string): Place | null {
  const s = input.toLowerCase();
  let best: Place | null = null;
  let bestScore = 0;
  for (const p of ALL_PLACES) {
    for (const a of [p.name.toLowerCase(), ...p.aliases]) {
      if (a.length > bestScore && s.includes(a)) {
        best = p;
        bestScore = a.length;
      }
    }
  }
  return best;
}

function haversineKm(a: Place, b: Place): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Approximate road distance: straight-line × a winding factor. */
export function roadKm(a: Place, b: Place): number {
  const straight = haversineKm(a, b);
  const factor = straight < 40 ? 1.35 : 1.22;
  return Math.max(3, Math.round(straight * factor));
}

function fnv(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

const AHMEDABAD = CITIES[0];

/* ---------------- quote ---------------- */

export interface QuoteLine {
  label: string;
  amount: number;
}

export type Quote =
  | {
      ok: true;
      distanceKm: number;
      billedKm: number;
      days: number;
      hours: number;
      total: number;
      approx: boolean;
      lines: QuoteLine[];
      note?: string;
      rateLabel: string;
    }
  | { ok: false; reason: "empty" | "same" | "seats" | "unknown"; message: string };

export interface QuoteInput {
  pickup: string;
  dropoff: string;
  passengers: number;
  carId: CarClassId;
  tripType: TripType;
}

export function quoteTrip({ pickup, dropoff, passengers, carId, tripType }: QuoteInput): Quote {
  const p = pickup.trim();
  const d = dropoff.trim();
  if (p.length < 3 || d.length < 3) {
    return { ok: false, reason: "empty", message: "Enter pickup & drop" };
  }
  if (p.toLowerCase() === d.toLowerCase()) {
    return { ok: false, reason: "same", message: "Pickup and drop are the same place." };
  }
  const cls = carClassById(carId);
  if (passengers > cls.seats) {
    return {
      ok: false,
      reason: "seats",
      message: `${cls.short} seats ${cls.seats}. Pick a bigger car for ${passengers} people.`,
    };
  }

  const P = matchPlace(p);
  const D = matchPlace(d);
  let distanceKm: number;
  let approx = false;

  if (P && D && P !== D) {
    distanceKm = roadKm(P, D);
  } else if (tripType === "local") {
    // Unknown Ahmedabad addresses — stable estimate within the city
    distanceKm = 4 + (fnv(p.toLowerCase() + "|" + d.toLowerCase()) % 22);
    approx = true;
  } else if (P || D) {
    // Outstation with one unrecognised end — assume it's in Ahmedabad (home base)
    const known = (P ?? D) as Place;
    if (known.area || known === AHMEDABAD) {
      return { ok: false, reason: "unknown", message: "Pick the destination city from the list for an instant quote." };
    }
    distanceKm = roadKm(AHMEDABAD, known);
    approx = true;
  } else {
    return {
      ok: false,
      reason: "unknown",
      message: "Pick a city from the list for an instant quote — or just book and Mahesh will quote on the call.",
    };
  }

  const lines: QuoteLine[] = [];
  let total = 0;
  let billedKm = distanceKm;
  let days = 1;
  let hours: number;
  let note: string | undefined;
  let rateLabel: string;

  if (tripType === "local") {
    const metered = cls.localBase + distanceKm * cls.localPerKm;
    lines.push({ label: "Base fare", amount: cls.localBase });
    lines.push({ label: `${distanceKm} km × ₹${cls.localPerKm}`, amount: distanceKm * cls.localPerKm });
    if (metered < cls.localMin) {
      lines.push({ label: "Minimum fare top-up", amount: cls.localMin - metered });
    }
    total = Math.max(cls.localMin, metered);
    hours = Math.max(0.3, (distanceKm * 3) / 60);
    rateLabel = `₹${cls.localBase} + ₹${cls.localPerKm}/km`;
    if (distanceKm > 60) note = "That's a long local ride — One-way is usually cheaper.";
  } else if (tripType === "oneway") {
    billedKm = Math.max(distanceKm, 130);
    lines.push({
      label: `${billedKm} km × ₹${cls.oneWayPerKm}${billedKm > distanceKm ? " (min 130 km)" : ""}`,
      amount: billedKm * cls.oneWayPerKm,
    });
    if (distanceKm >= 200) lines.push({ label: "Driver allowance", amount: cls.allowance });
    total = lines.reduce((s, l) => s + l.amount, 0);
    hours = distanceKm / 55;
    rateLabel = `₹${cls.oneWayPerKm}/km one-way`;
    if (distanceKm < 30) note = "Short hop — Local pricing will be cheaper.";
  } else {
    days = Math.max(1, Math.ceil((distanceKm * 2) / 450));
    billedKm = Math.max(distanceKm * 2, 250 * days);
    lines.push({
      label: `${billedKm} km × ₹${cls.roundPerKm}${billedKm > distanceKm * 2 ? ` (min 250 km/day)` : ""}`,
      amount: billedKm * cls.roundPerKm,
    });
    lines.push({ label: `Driver allowance × ${days} day${days > 1 ? "s" : ""}`, amount: cls.allowance * days });
    total = lines.reduce((s, l) => s + l.amount, 0);
    hours = (distanceKm * 2) / 55;
    rateLabel = `₹${cls.roundPerKm}/km round trip`;
    if (distanceKm < 30) note = "Short distance — Local pricing will be cheaper.";
  }

  return {
    ok: true,
    distanceKm,
    billedKm,
    days,
    hours,
    total: Math.round(total),
    approx,
    lines,
    note,
    rateLabel,
  };
}

export function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export function formatHours(h: number): string {
  if (h < 1) return `${Math.max(10, Math.round(h * 60))} min`;
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  return mins >= 10 ? `${whole} h ${mins} min` : `${whole} h`;
}

/** Normalise an Indian mobile number to 10 digits, or null if invalid. */
export function normalizeIndianMobile(raw: string): string | null {
  let s = raw.replace(/[^\d]/g, "");
  if (s.length === 12 && s.startsWith("91")) s = s.slice(2);
  if (s.length === 11 && s.startsWith("0")) s = s.slice(1);
  return /^[6-9]\d{9}$/.test(s) ? s : null;
}
