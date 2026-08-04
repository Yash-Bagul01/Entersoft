import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Vulnerability Management (ASPM) — EnProbe Platform | Entersoft Security",
  description: "Centralize and correlate AppSec findings from SAST, DAST, SCA, secrets, and cloud scanners into one view.",
};

export default function AspmPage() {
  const pillar = platformPillars["aspm"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
