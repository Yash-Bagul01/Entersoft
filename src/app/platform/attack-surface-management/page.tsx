import React from "react";
import type { Metadata } from "next";
import SolutionCasePage from "@/components/solutions/SolutionCasePage";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Attack Surface Visibility — EnProbe Platform | Entersoft Security";
const DESCRIPTION =
  "Identify exposed apps, subdomains, open ports, and unmanaged perimeter endpoints.";
const CANONICAL = getCanonicalUrl(ROUTES.platform.attackSurfaceManagement);

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

export default function AttackSurfaceManagementPage() {
  return <SolutionCasePage slug="attack-surface-management" />;
}
