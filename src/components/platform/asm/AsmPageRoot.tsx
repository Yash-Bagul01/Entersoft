import React from "react";
import AsmPreloader from "./AsmPreloader";
import AsmHero from "./AsmHero";
import HubArrivePhoto from "@/components/platform/HubArrivePhoto";
import AsmManifesto from "./AsmManifesto";
import AsmGallery from "./AsmGallery";
import AsmFits from "./AsmFits";

export default function AsmPageRoot() {
  return (
    <main id="asm-page" data-page="asm" className="relative z-10 flex w-full flex-col">
      <AsmPreloader />
      <HubArrivePhoto id="asm" />
      <AsmHero />
      <AsmManifesto />
      <AsmGallery />
      <AsmFits />
    </main>
  );
}
