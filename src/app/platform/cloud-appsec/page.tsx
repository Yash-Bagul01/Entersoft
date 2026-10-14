import React from "react";
import type { Metadata } from "next";
import ExoApeCaseStudy from "@/components/platform/exoape/ExoApeCaseStudy";
import { CLOUD_APPSEC_CASE } from "@/components/platform/cloud-appsec/cloudCase";
import { getCanonicalUrl, ROUTES } from "@/config/routes";

const TITLE = "Cloud AppSec — EnProbe Platform | Entersoft Security";
const DESCRIPTION =
  "Get a single-pane view of cloud application security risk across code, containers, and IAM roles.";
const CANONICAL = getCanonicalUrl(ROUTES.platform.cloudAppsec);

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

export default function CloudAppsecPage() {
  return <ExoApeCaseStudy data={CLOUD_APPSEC_CASE} />;
}
