import React from "react";
import ApiHero, { ApiTrusted } from "./ApiHero";
import ApiStory from "./ApiStory";
import ApiShowcase from "./ApiShowcase";
import ApiProof from "./ApiProof";
import HubArrivePhoto from "@/components/platform/HubArrivePhoto";
import "@/app/platform/api-security/api-security.css";

export default function ApiPageRoot() {
  return (
    <main id="api-page" data-page="api" className="relative z-10 flex w-full flex-col">
      <HubArrivePhoto id="api" />
      <ApiHero />
      <ApiTrusted />
      <ApiStory />
      <ApiShowcase />
      <ApiProof />
    </main>
  );
}
