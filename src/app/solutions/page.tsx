import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl, ROUTES } from "@/config/routes";
import SolutionsWorksGallery from "@/components/solutions/SolutionsWorksGallery";

const TITLE = "Cybersecurity Solutions | Entersoft Security";
const DESCRIPTION =
  "Entersoft solutions for API discovery, AI-BOM, vulnerability management, security workflows, AppSec KPIs and open-source risk.";
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
    <main className="w-full h-screen overflow-hidden relative z-10 bg-[#e7f0fb]">
      <SolutionsWorksGallery />
    </main>
  );
}
