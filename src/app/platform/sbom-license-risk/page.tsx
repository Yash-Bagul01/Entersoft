import React from "react";
import PlatformOvaPage from "@/components/platform/ova/PlatformOvaPage";
import { SBOM_OVA } from "@/components/platform/ova/platformOva";

export const metadata = {
  title: "SBOM & License Risk — EnProbe Platform | Entersoft Security",
  description: "Generate continuous CycloneDX and SPDX SBOMs while tracking open-source license compliance.",
};

export default function SbomLicenseRiskPage() {
  return <PlatformOvaPage page={SBOM_OVA} />;
}
