import React from "react";
import ApiHero, { ApiTrusted } from "./ApiHero";
import ApiStory from "./ApiStory";
import ApiShowcase from "./ApiShowcase";
import ApiProof from "./ApiProof";

export default function ApiPageRoot() {
  return (
    <main id="api-page" data-page="api" className="relative z-10 flex w-full flex-col">
      <ApiHero />
      <ApiTrusted />
      <ApiStory />
      <ApiShowcase />
      <ApiProof />
    </main>
  );
}
