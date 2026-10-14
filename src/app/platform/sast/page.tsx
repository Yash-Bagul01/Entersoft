import React from "react";
import PlatformOvaPage from "@/components/platform/ova/PlatformOvaPage";
import { SAST_OVA } from "@/components/platform/ova/platformOva";

export const metadata = {
  title: "Static Application Security Testing (SAST) — EnProbe Platform | Entersoft Security",
  description: "Find, prioritize, and remediate source code vulnerabilities early before runtime with zero noise.",
};

export default function SASTPage() {
  return <PlatformOvaPage page={SAST_OVA} />;
}
