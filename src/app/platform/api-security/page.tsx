import React from "react";
import type { Metadata } from "next";
import SolutionCasePage from "@/components/solutions/SolutionCasePage";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "API Security Testing — EnProbe Platform | Entersoft Security";
const DESCRIPTION =
  "Discover shadow APIs and test REST, GraphQL, and gRPC endpoints for BOLA and OWASP API Top 10 risks.";
const CANONICAL = getCanonicalUrl(ROUTES.platform.apiSecurity);

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

export default function ApiSecurityPage() {
  return <SolutionCasePage slug="api-security" />;
}
