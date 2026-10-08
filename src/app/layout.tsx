import type { Metadata } from "next";
import { Archivo, Instrument_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-archivo",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-instrument",
  display: "swap",
});

const spacemono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-spacemono",
  display: "swap",
});

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
    <html lang="en-IN" className={`${archivo.variable} ${instrument.variable} ${spacemono.variable}`}>
      <body className="min-h-screen">
        <div className="noise-layer" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
