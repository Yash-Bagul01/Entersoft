import React from "react";
import type { Metadata } from "next";
import SolutionCasePage from "@/components/solutions/SolutionCasePage";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "AI AppSec — EnProbe Platform | Entersoft Security";
const DESCRIPTION =
  "Scan smarter, accelerate remediation with AI-guided fixes, and secure GenAI / LLM applications.";
const CANONICAL = getCanonicalUrl(ROUTES.platform.aiAppsec);

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

export default function AiAppsecPage() {
  return <SolutionCasePage slug="ai-appsec" />;
}
