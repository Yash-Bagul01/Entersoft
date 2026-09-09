import React from "react";
import SolutionCasePage from "@/components/solutions/SolutionCasePage";

export const metadata = {
  title: "Secrets Detection & Credential Defense — EnProbe Platform | Entersoft Security",
  description: "Detect, verify, and auto-rotate hardcoded API keys, OAuth tokens, AWS access credentials, and private keys across developer workstations, git histories, and CI/CD pipelines.",
};

export default function SecretsPage() {
  return <SolutionCasePage slug="secrets" />;
}
