import React from "react";
import SolutionCasePage from "@/components/solutions/SolutionCasePage";

export const metadata = {
  title: "Vulnerability Management (ASPM) — EnProbe Platform | Entersoft Security",
  description: "Centralize and correlate AppSec findings from SAST, DAST, SCA, secrets, and cloud scanners into one view.",
};

export default function AspmPage() {
  return <SolutionCasePage slug="aspm" />;
}
