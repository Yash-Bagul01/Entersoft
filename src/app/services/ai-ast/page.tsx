import React from "react";
import type { Metadata } from "next";
import AZPageRoot from "@/components/services/ai-zkpass/AZPageRoot";

export const metadata: Metadata = {
  title: "AI Systems Assurance | Entersoft Security",
  description:
    "Assess LLMs, RAG pipelines, agents, and model APIs before production. Senior-validated security assurance. Zero noise.",
};

export default function AIASTPage() {
  return (
    <main className="w-full min-h-screen bg-[#05070F]">
      <AZPageRoot />
    </main>
  );
}
