import type { Metadata } from "next";
import "./globals.css";

// import {
//   Archivo,
//   Instrument_Serif,
//   Space_Mono,
// } from "next/font/google";

// const archivo = Archivo({
//   subsets: ["latin"],
//   variable: "--font-archivo",
//   weight: ["500", "600", "700", "800", "900"],
//   display: "swap",
// });

// const instrument = Instrument_Serif({
//   subsets: ["latin"],
//   variable: "--font-instrument",
//   weight: ["400"],
//   style: ["normal", "italic"],
//   display: "swap",
// });

// const spacemono = Space_Mono({
//   subsets: ["latin"],
//   variable: "--font-spacemono",
//   weight: ["400", "700"],
//   display: "swap",
// });

export const metadata: Metadata = {
  title: "Mahesh Chavda Taxi Service — Ahmedabad to anywhere in India",
  description:
    "Local, airport and outstation taxi from Ahmedabad, Gujarat — one-way and round trips all over India. Sedan from ₹12/km, no hidden charges. Call or WhatsApp Mahesh Chavda: +91 93139 20315.",
  keywords: [
    "Ahmedabad taxi",
    "taxi service Ahmedabad",
    "Ahmedabad airport taxi",
    "outstation cab Ahmedabad",
    "one way taxi Ahmedabad",
    "Mahesh Chavda taxi",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en-IN" className={`${archivo.variable} ${instrument.variable} ${spacemono.variable}`}>
    <html lang="en-IN">
      <body className="min-h-screen">
        <div className="noise-layer" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
