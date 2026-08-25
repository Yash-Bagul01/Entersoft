import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import SolutionsShowcase from "@/components/solutions/SolutionsShowcase";

const TITLE = "Cybersecurity Solutions | Entersoft Security";
const DESCRIPTION =
  "Explore Entersoft's outcome-aligned cybersecurity solutions across AI security, multi-cloud posture, API security, ASPM, CTEM, DevSecOps, and identity governance.";
const CANONICAL = getCanonicalUrl(ROUTES.solutions);

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

export default function SolutionsPage() {
  return (
    <main className="w-full h-screen overflow-hidden relative z-10 bg-[#0b0b0d]">
      <SolutionsShowcase />
    </main>
  );
}
