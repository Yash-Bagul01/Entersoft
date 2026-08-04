import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Secrets Detection — EnProbe Platform | Entersoft Security",
  description: "Detect exposed secrets, API keys, OAuth tokens, and private credentials in application code repositories.",
};

export default function SecretsPage() {
  const pillar = platformPillars["secrets"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
