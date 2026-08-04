import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "API Security Testing — EnProbe Platform | Entersoft Security",
  description: "Discover shadow APIs and test REST, GraphQL, and gRPC endpoints for BOLA and OWASP API Top 10 risks.",
};

export default function ApiSecurityPage() {
  const pillar = platformPillars["api-security"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
