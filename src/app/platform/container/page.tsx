import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Container Security — EnProbe Platform | Entersoft Security",
  description: "Track container image vulnerabilities, OS package flaws, and registry risks before Kubernetes deployment.",
};

export default function ContainerPage() {
  const pillar = platformPillars["container"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
