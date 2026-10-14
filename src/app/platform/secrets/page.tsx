import React from "react";
import PlatformOvaPage from "@/components/platform/ova/PlatformOvaPage";
import { SECRETS_OVA } from "@/components/platform/ova/platformOva";

export const metadata = {
  title: "Secrets Detection & Credential Defense — EnProbe Platform | Entersoft Security",
  description:
    "Detect, verify, and auto-rotate hardcoded API keys, OAuth tokens, AWS access credentials, and private keys across developer workstations, git histories, and CI/CD pipelines.",
};

export default function SecretsPage() {
  return <PlatformOvaPage page={SECRETS_OVA} />;
}
