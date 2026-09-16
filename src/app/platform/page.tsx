import React from "react";
import type { Metadata } from "next";
import PlatformHubScene from "@/components/platform/PlatformHubScene";

export const metadata: Metadata = {
  title: "Platform — EnProbe modules | Entersoft Security",
  description:
    "Explore EnProbe platform modules: SAST, SCA, SBOM, secrets, IaC, DAST, agentic pentesting, API security, attack surface, cloud AppSec and AI AppSec.",
};

export default function PlatformHubPage() {
  return <PlatformHubScene />;
}
