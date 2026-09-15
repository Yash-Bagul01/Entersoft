import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import ServicesReel from "@/components/services/ServicesReel";

const TITLE = "Enterprise Security Services | Entersoft Security";
const DESCRIPTION =
  "Entersoft expert-led security services across application security, penetration testing, cloud, GRC, managed detection, smart-contract review and AI security testing.";
const CANONICAL = getCanonicalUrl(ROUTES.servicesHub);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
};

export default function ServicesIndexPage() {
  return (
    <main className="w-full h-screen overflow-hidden relative z-10 bg-[#0b0b0d]">
      <ServicesReel />
    </main>
  );
}
