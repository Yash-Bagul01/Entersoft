import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Threat Intelligence — EnProbe Platform | Entersoft Security",
  description: "Overlay reachability, EPSS, CISA KEV feeds, and dark web exploitability onto application vulnerabilities.",
};

export default function ThreatIntelligencePage() {
  const pillar = platformPillars["threat-intelligence"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
