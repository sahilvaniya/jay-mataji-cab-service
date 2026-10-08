/* All business copy lives here — edit freely. */

export const CONTACT = {
  name: "Mahesh Chavda",
  phoneDisplay: "+91 93139 20315",
  phoneTel: "+919313920315",
  whatsapp: "919313920315",
  city: "Ahmedabad",
  region: "Ahmedabad, Gujarat, India",
};

export function whatsappLink(text?: string): string {
  const base = `https://wa.me/${CONTACT.whatsapp}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export const LED_ITEMS = [
  "AHMEDABAD → ANYWHERE IN INDIA",
  "AIRPORT · RAILWAY STATION · OUTSTATION · ONE-WAY · ROUND TRIP",
  "CALL / WHATSAPP +91 93139 20315",
  "TOLL & PARKING AT ACTUALS — NO HIDDEN CHARGES",
  "AVAILABLE 24 × 7 · 365 DAYS",
];

export const TICKER_DESTINATIONS = [
  "GANDHINAGAR",
  "VADODARA",
  "SURAT",
  "RAJKOT",
  "DWARKA",
  "SOMNATH",
  "STATUE OF UNITY",
  "UDAIPUR",
  "MOUNT ABU",
  "MUMBAI",
  "JAIPUR",
  "DELHI",
  "INDORE",
  "SHIRDI",
];

export interface Step {
  num: string;
  title: string;
  body: string;
  note: string;
}

export const STEPS: Step[] = [
  {
    num: "01",
    title: "Tell me the trip",
    body: "Fill in the form, call, or send a WhatsApp — whichever is easiest. Pickup, drop, date, and how many people. You see the estimated fare before you send anything.",
    note: "Form · Call · WhatsApp",
  },
  {
    num: "02",
    title: "I call you back",
    body: "Usually within 15 minutes. We confirm the pickup point, luggage, stops on the way, and the final fare — so there are no surprises on the day.",
    note: "One number, one person",
  },
  {
    num: "03",
    title: "Pickup, on time",
    body: "I reach 10 minutes early. The car is cleaned before every trip, AC works, and your live location can be shared with family on WhatsApp the whole way.",
    note: "Early, not just on time",
  },
  {
    num: "04",
    title: "Pay at the end",
    body: "Cash or UPI — GPay, PhonePe, Paytm, any bank. The fare we agreed, plus tolls and parking at actuals with the receipts in your hand. Nothing else.",
    note: "No advance for local trips",
  },
];

export interface PopularRoute {
  to: string;
  tag: string;
}

export const POPULAR_ROUTES: PopularRoute[] = [
  { to: "Vadodara", tag: "Business" },
  { to: "Statue of Unity", tag: "Day trip" },
  { to: "Udaipur", tag: "Weekend" },
  { to: "Mount Abu", tag: "Hill station" },
  { to: "Dwarka", tag: "Pilgrimage" },
  { to: "Somnath", tag: "Pilgrimage" },
  { to: "Surat", tag: "Business" },
  { to: "Rajkot", tag: "Saurashtra" },
  { to: "Mumbai", tag: "Long drive" },
  { to: "Jaipur", tag: "Rajasthan" },
  { to: "Indore", tag: "Ujjain darshan" },
  { to: "Delhi", tag: "All-India" },
];

export interface Receipt {
  name: string;
  area: string;
  quote: string;
  fare: string;
  route: string;
  km: string;
  stars: number;
  code: string;
  rotate: string;
}

/* Sample reviews — replace with real customer feedback. */
export const RECEIPTS: Receipt[] = [
  {
    name: "Rakesh P.",
    area: "Satellite, Ahmedabad",
    quote:
      "4:30 a.m. airport drop. Maheshbhai was outside at 4:20 and had already checked the flight status. Calm driving, clean car, exactly the fare he told me on the phone.",
    fare: "₹450",
    route: "Satellite → SVPI Airport",
    km: "16 km",
    stars: 5,
    code: "MC-4821",
    rotate: "-rotate-2",
  },
  {
    name: "Nisha & family",
    area: "Maninagar",
    quote:
      "Dwarka–Somnath yatra with my parents, four days. He planned the stops around their timings and waited patiently at every temple. My father still asks about him.",
    fare: "₹14,980",
    route: "Ahmedabad → Dwarka → Somnath",
    km: "1,100 km",
    stars: 5,
    code: "MC-7713",
    rotate: "rotate-1",
  },
  {
    name: "Arjun S.",
    area: "Prahlad Nagar",
    quote:
      "One-way to Mumbai for a work trip. Toll slips were handed to me at the end, all neatly folded. That small thing told me everything about how he works.",
    fare: "₹6,600",
    route: "Ahmedabad → Mumbai",
    km: "525 km",
    stars: 5,
    code: "MC-1092",
    rotate: "-rotate-1",
  },
  {
    name: "Hetal M.",
    area: "Bopal",
    quote:
      "I book Mahesh for my mother whenever she travels alone to Vadodara. He shares live location with me on WhatsApp without being asked. Total peace of mind.",
    fare: "₹1,690",
    route: "Bopal → Vadodara",
    km: "125 km",
    stars: 5,
    code: "MC-5540",
    rotate: "rotate-2",
  },
  {
    name: "Imran K.",
    area: "Kalupur",
    quote:
      "Train came in two hours late at night. He waited, didn't make a fuss, didn't add anything extra. Will call him again for sure.",
    fare: "₹320",
    route: "Kalupur Station → Naroda",
    km: "11 km",
    stars: 4,
    code: "MC-9310",
    rotate: "-rotate-1",
  },
  {
    name: "Patel wedding",
    area: "Gandhinagar",
    quote:
      "He arranged three cars and a Tempo Traveller for our guests over two days — Ahmedabad airport to the venue and back. Every pickup on time, one bill at the end.",
    fare: "₹38,500",
    route: "Wedding guest transfers",
    km: "2 days",
    stars: 5,
    code: "MC-0007",
    rotate: "rotate-1",
  },
];

export interface SafetyItem {
  title: string;
  body: string;
  icon: "shield" | "gps" | "share" | "phone" | "badge" | "lock";
}

export const SAFETY: SafetyItem[] = [
  {
    title: "Yellow-plate commercial car",
    body: "A registered commercial taxi with valid permit and insurance — not a private car doing trips on the side. The yellow number plate is the proof.",
    icon: "badge",
  },
  {
    title: "Live location on WhatsApp",
    body: "Your family can follow the trip in real time. On long drives I share it myself before we leave the city.",
    icon: "gps",
  },
  {
    title: "Fixed fare, agreed first",
    body: "The fare is fixed on the phone before the trip. No surge at night, no 'festival rate', no extra for a little waiting.",
    icon: "share",
  },
  {
    title: "Directly reachable",
    body: "No call centre and no app support ticket. The number on this page rings in the driver's pocket.",
    icon: "phone",
  },
  {
    title: "Family & women friendly",
    body: "Elderly parents, children, women travelling alone — careful driving, respectful behaviour, and safe stops on the highway.",
    icon: "shield",
  },
  {
    title: "Clean, serviced car",
    body: "Cleaned before every trip and serviced on schedule. Tyres, brakes, and AC checked before any long outstation drive.",
    icon: "lock",
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const FAQS: Faq[] = [
  {
    q: "Do you really go anywhere in India?",
    a: "Yes. Most trips are within Gujarat and to Rajasthan, Maharashtra and Madhya Pradesh, but long routes like Delhi, Haridwar, Goa or Bengaluru are done regularly. For multi-day trips, the driver allowance covers food and stay.",
  },
  {
    q: "What is included in the fare, and what is extra?",
    a: "The fare covers the car, fuel, and driver. Toll tax, parking, and state entry/permit tax (when crossing into another state) are extra at actuals — you pay exactly what the receipt says. Outstation trips include a driver allowance per day, shown in the quote.",
  },
  {
    q: "How is a one-way trip charged differently from a round trip?",
    a: "One-way is charged per km for the distance to your drop, with a minimum of 130 km. Round trips are charged for the total km driven, with a minimum of 250 km per day, at a slightly lower per-km rate.",
  },
  {
    q: "Do I need to pay an advance?",
    a: "Not for local and airport trips — pay at the end. For outstation trips, a small advance on UPI confirms the booking, and the rest is paid when the trip finishes.",
  },
  {
    q: "How do I pay?",
    a: "Cash or UPI (GPay, PhonePe, Paytm, BHIM — any UPI app). A written bill can be given for company reimbursement.",
  },
  {
    q: "Can I cancel or change my booking?",
    a: "Yes — just call or WhatsApp. Changes are free. Cancellation is free up to 3 hours before pickup; for outstation trips cancelled at the last moment, the advance may be adjusted against the next trip.",
  },
  {
    q: "Which languages can I speak with the driver?",
    a: "Gujarati, Hindi, and basic English. Tourists from outside Gujarat are very welcome.",
  },
];
