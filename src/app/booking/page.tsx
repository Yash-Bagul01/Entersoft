import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Booking";
const CANONICAL = getCanonicalUrl(ROUTES.booking);

export const metadata: Metadata = {
  title: TITLE,
  alternates: { canonical: CANONICAL },
  robots: { index: false, follow: false },
};

export default function BookingPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <h1 className="text-[clamp(2rem,6vw,4.5rem)] font-medium tracking-[-0.04em]">Booking</h1>
    </main>
  );
}
