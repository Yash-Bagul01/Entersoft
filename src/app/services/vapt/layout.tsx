import React from "react";
import type { Metadata } from "next";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

/**
 * The VAPT page itself is a client component, so its route metadata lives here.
 */
const TITLE = "Penetration Testing and Adversarial Validation | Entersoft";
const DESCRIPTION =
  "CREST-accredited, CERT-In empanelled penetration testing and adversarial validation for web, API, mobile, network, cloud, and identity environments with human-validated findings and reproducible evidence.";
const CANONICAL = getCanonicalUrl(ROUTES.services.vapt);

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: CANONICAL,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: CANONICAL,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
};

export default function VaptLayout({ children }: { children: React.ReactNode }) {
  return children;
}
