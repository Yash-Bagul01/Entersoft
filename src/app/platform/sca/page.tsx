import React from "react";
import PlatformOvaPage from "@/components/platform/ova/PlatformOvaPage";
import { SCA_OVA } from "@/components/platform/ova/platformOva";

export const metadata = {
  title: "Open Source (SCA) — EnProbe Platform | Entersoft Security",
  description: "Find vulnerable dependencies, transitive software risks, and licensing issues across your supply chain.",
};

export default function SCAPage() {
  return <PlatformOvaPage page={SCA_OVA} />;
}
