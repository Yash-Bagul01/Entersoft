import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "SBOM & License Risk — EnProbe Platform | Entersoft Security",
  description: "Generate continuous CycloneDX and SPDX SBOMs while tracking open-source license compliance.",
};

export default function SbomLicenseRiskPage() {
  const pillar = platformPillars["sbom-license-risk"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
