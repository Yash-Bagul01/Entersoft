import React from "react";
import SbomLicenseRiskPageRoot from "@/components/platform/roots/SbomLicenseRiskPageRoot";

export const metadata = {
  title: "SBOM & License Risk — EnProbe Platform | Entersoft Security",
  description: "Generate continuous CycloneDX and SPDX SBOMs while tracking open-source license compliance.",
};

export default function SbomLicenseRiskPage() {
  return <SbomLicenseRiskPageRoot />;
}
