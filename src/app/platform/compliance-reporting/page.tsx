import React from "react";
import PlatformSubpageTemplate from "@/components/platform/PlatformSubpageTemplate";
import { platformPillars } from "@/data/platform";

export const metadata = {
  title: "Compliance & Executive Reporting — EnProbe Platform | Entersoft Security",
  description: "Measure risk and impact with automated executive dashboards and auditor proof exports.",
};

export default function ComplianceReportingPage() {
  const pillar = platformPillars["compliance-reporting"];
  return <PlatformSubpageTemplate pillar={pillar} />;
}
