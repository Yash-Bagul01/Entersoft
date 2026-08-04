import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Attack Surface Management — EnProbe Platform | Entersoft Security",
  description: "Identify exposed apps, subdomains, open ports, and unmanaged perimeter endpoints.",
};

export default function AttackSurfaceManagementPage() {
  const pillar = platformPillars["attack-surface-management"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
