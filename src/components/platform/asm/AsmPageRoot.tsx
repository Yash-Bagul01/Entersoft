import React from "react";
import AsmHero from "./AsmHero";
import AsmManifesto from "./AsmManifesto";
import AsmGallery from "./AsmGallery";
import AsmFits from "./AsmFits";

export default function AsmPageRoot() {
  return (
    <main id="asm-page" className="relative z-10 flex w-full flex-col bg-[#f6f5f0]">
      <AsmHero />
      <AsmManifesto />
      <AsmGallery />
      <AsmFits />
    </main>
  );
}
