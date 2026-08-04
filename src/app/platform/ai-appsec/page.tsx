import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "AI AppSec — EnProbe Platform | Entersoft Security",
  description: "Scan smarter, accelerate remediation with AI-guided fixes, and secure GenAI / LLM applications.",
};

export default function AiAppsecPage() {
  const pillar = platformPillars["ai-appsec"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
