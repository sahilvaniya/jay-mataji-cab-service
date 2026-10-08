import type { Metadata } from "next";
import localFont from "next/font/local";
import { Archivo, Instrument_Serif, Space_Mono } from "next/font/google";
import "./globals.css";

/* Self-hosted typefaces — no build-time or runtime network dependency. */
// const archivo = localFont({
//   src: "../fonts/archivo-latin.woff2",
//   weight: "500 900",
//   style: "normal",
//   variable: "--font-archivo",
//   display: "swap",
// });

// const instrument = localFont({
//   src: "../fonts/instrument-latin.woff2",
//   weight: "400 700",
//   style: "normal",
//   variable: "--font-instrument",
//   display: "swap",
// });

// const spacemono = localFont({
//   src: [
//     { path: "../fonts/spacemono-400.woff2", weight: "400", style: "normal" },
//     { path: "../fonts/spacemono-700.woff2", weight: "700", style: "normal" },
//   ],
//   variable: "--font-spacemono",
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
    <html lang="en-IN" >
      <body className="min-h-screen">
        <div className="noise-layer" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
