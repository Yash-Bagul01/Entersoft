import React from "react";
import type { Metadata } from "next";
import IacExoapePage from "@/components/platform/iac/IacExoapePage";

export const metadata: Metadata = {
  title: "Infrastructure as Code (IaC) Security — EnProbe Platform | Entersoft",
  description:
    "Deterministic Infrastructure as Code security scanning Terraform, CloudFormation, Helm, and Kubernetes manifests with OPA policy-as-code guardrails and automated drift prevention.",
  openGraph: {
    title: "Infrastructure as Code (IaC) Security | Entersoft EnProbe",
    description:
      "Deterministic Infrastructure as Code security scanning Terraform, CloudFormation, Helm, and Kubernetes manifests before cloud provisioning.",
    type: "website",
  },
};

export default function IacPage() {
  return <IacExoapePage />;
}
