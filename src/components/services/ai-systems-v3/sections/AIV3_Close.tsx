"use client";

import React from "react";
import ServiceCTA from "@/components/services/ServiceCTA";
import InterServiceNav from "@/components/services/ai-systems/InterServiceNav";

export default function AIV3_Close() {
  return (
    <div className="w-full bg-[#060606] flex flex-col">
      <ServiceCTA />
      <InterServiceNav />
    </div>
  );
}
