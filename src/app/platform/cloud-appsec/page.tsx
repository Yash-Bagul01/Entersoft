import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Cloud AppSec — EnProbe Platform | Entersoft Security",
  description: "Get a single-pane view of cloud application security risk across code, containers, and IAM roles.",
};

export default function CloudAppsecPage() {
  const pillar = platformPillars["cloud-appsec"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
