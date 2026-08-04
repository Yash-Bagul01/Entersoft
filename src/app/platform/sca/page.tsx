import React from "react";
import SCAPageRoot from "@/components/platform/roots/SCAPageRoot";

export const metadata = {
  title: "Open Source (SCA) — EnProbe Platform | Entersoft Security",
  description: "Find vulnerable dependencies, transitive software risks, and licensing issues across your supply chain.",
};

export default function SCAPage() {
  return (
    <div data-theme="light" data-page="sca">
      <SCAPageRoot />
    </div>
  );
}
