import React from "react";
import AsmPreloader from "./AsmPreloader";
import AsmHero from "./AsmHero";
import AsmManifesto from "./AsmManifesto";
import AsmGallery from "./AsmGallery";
import AsmFits from "./AsmFits";

export default function AsmPageRoot() {
  return (
    <main id="asm-page" data-page="asm" className="relative z-10 flex w-full flex-col">
      <AsmPreloader />
      <AsmHero />
      <AsmManifesto />
      <AsmGallery />
      <AsmFits />
    </main>
  );
}
