import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "DAST & AI DAST — EnProbe Platform | Entersoft Security",
  description: "Test runtime web applications and APIs like an attacker using Proof-Based Scanning.",
};

export default function DastPage() {
  const pillar = platformPillars["dast"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
