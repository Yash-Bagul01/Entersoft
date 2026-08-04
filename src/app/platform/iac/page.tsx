import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Infrastructure as Code (IaC) — EnProbe Platform | Entersoft Security",
  description: "Ingest and audit IaC security findings in Terraform, CloudFormation, and Kubernetes manifests before deployment.",
};

export default function IacPage() {
  const pillar = platformPillars["iac"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
