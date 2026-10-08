/* ------------------------------------------------------------------
 * Vehicle rate card for Mahesh Chavda Taxi Service (Ahmedabad, all-India).
 * One price per kilometre, per vehicle — the same for local, one-way
 * and round trips. The exact fare is worked out on the call, once the
 * route and distance are known. Nothing here pretends to calculate it.
 * ------------------------------------------------------------------ */

export type CarClassId = "sedan" | "ertiga" | "innova" | "traveller" | "harbaniya";
export type TripType = "local" | "oneway" | "round";

export interface CarClass {
  id: CarClassId;
  name: string;
  short: string;
  tagline: string;
  bestFor: string;
  vehicles: string;
  seats: number;
  seatsLabel?: string;
  bags: number;
  perKm: number;
  owner: "mahesh" | "partner";
}

export const CAR_CLASSES: CarClass[] = [
  {
    id: "sedan",
    name: "Sedan",
    short: "Sedan",
    tagline:
      "Mahesh's own car. AC, spotless, and the right size for 1–4 people with a week of luggage.",
    bestFor: "City runs & airport",
    vehicles: "Maruti Swift Dzire",
    seats: 4,
    bags: 3,
    perKm: 11,
    owner: "mahesh",
  },
  {
    id: "ertiga",
    name: "Ertiga",
    short: "Ertiga",
    tagline: "Six seats with the boot still usable. The family-trip default.",
    bestFor: "Families with luggage",
    vehicles: "Maruti Ertiga",
    seats: 6,
    bags: 4,
    perKm: 13,
    owner: "partner",
  },
  {
    id: "innova",
    name: "Innova Crysta",
    short: "Innova",
    tagline: "Captain seats and a suspension that forgives NH-48. Built for 600 km days.",
    bestFor: "Long outstation drives",
    vehicles: "Toyota Innova Crysta",
    seats: 7,
    bags: 5,
    perKm: 18,
    owner: "partner",
  },
  {
    id: "traveller",
    name: "Tempo Traveller",
    short: "Traveller",
    tagline: "Weddings, yatra groups, office outings — everybody in one vehicle.",
    bestFor: "Groups, weddings, yatra",
    vehicles: "Force Tempo Traveller",
    seats: 12,
    bags: 10,
    perKm: 30,
    owner: "partner",
  },
  {
    id: "harbaniya",
    name: "Harbaniya",
    short: "Harbaniya",
    tagline:
      "The big one — for the largest groups and full-family functions. Seating plan confirmed on the call.",
    bestFor: "Big functions & full families",
    vehicles: "Harbaniya",
    seats: 12,
    seatsLabel: "Large group",
    bags: 10,
    perKm: 30,
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

/* ---------------- suggestions for the address fields ---------------- */

const AHMEDABAD_AREAS = [
  "SVPI Airport, Ahmedabad",
  "Kalupur Railway Station",
  "Sabarmati Railway Station",
  "Navrangpura, Ahmedabad",
  "CG Road, Ahmedabad",
  "Satellite, Ahmedabad",
  "Vastrapur, Ahmedabad",
  "Bodakdev, Ahmedabad",
  "Prahlad Nagar, Ahmedabad",
  "SG Highway, Ahmedabad",
  "Bopal, Ahmedabad",
  "Shela, Ahmedabad",
  "Maninagar, Ahmedabad",
  "Chandkheda, Ahmedabad",
  "Gota, Ahmedabad",
  "Naroda, Ahmedabad",
  "Nikol, Ahmedabad",
  "Vastral, Ahmedabad",
  "Ellis Bridge, Ahmedabad",
  "Sabarmati Ashram",
  "Science City, Ahmedabad",
  "Sanand",
];

const CITIES = [
  "Ahmedabad",
  "Gandhinagar",
  "GIFT City",
  "Vadodara",
  "Surat",
  "Rajkot",
  "Bhavnagar",
  "Jamnagar",
  "Junagadh",
  "Dwarka",
  "Somnath",
  "Bhuj",
  "Statue of Unity",
  "Ambaji",
  "Saputara",
  "Anand",
  "Nadiad",
  "Mehsana",
  "Palanpur",
  "Pavagadh",
  "Daman",
  "Diu",
  "Udaipur",
  "Mount Abu",
  "Nathdwara",
  "Jodhpur",
  "Jaipur",
  "Mumbai",
  "Pune",
  "Nashik",
  "Shirdi",
  "Indore",
  "Ujjain",
  "Bhopal",
  "Delhi",
  "Agra",
  "Haridwar",
  "Goa",
  "Bengaluru",
  "Hyderabad",
];

export const PLACE_SUGGESTIONS: string[] = [...AHMEDABAD_AREAS, ...CITIES];

/* ---------------- formatting helpers ---------------- */

export function formatINR(n: number): string {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

/** Normalise an Indian mobile number to 10 digits, or null if invalid. */
export function normalizeIndianMobile(raw: string): string | null {
  let s = raw.replace(/[^\d]/g, "");
  if (s.length === 12 && s.startsWith("91")) s = s.slice(2);
  if (s.length === 11 && s.startsWith("0")) s = s.slice(1);
  return /^[6-9]\d{9}$/.test(s) ? s : null;
}
