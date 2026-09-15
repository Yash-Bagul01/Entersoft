import React from "react";
import ExposureDecisioningRoot from "@/components/platform/roots/ExposureDecisioningRoot";

export const metadata = {
  title: "Vulnerability Management (ASPM) — EnProbe Platform | Entersoft Security",
  description: "Centralize and correlate AppSec findings from SAST, DAST, SCA, secrets, and cloud scanners into one view.",
};

export default function AspmPage() {
  return <ExposureDecisioningRoot />;
}
