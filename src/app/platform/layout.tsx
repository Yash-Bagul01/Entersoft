"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCyberOntology = pathname === "/platform/cyber-ontology";
  const isSast = pathname === "/platform/sast";
  const isSca = pathname === "/platform/sca";
  const isIac = pathname === "/platform/iac";
  const isSbom = pathname === "/platform/sbom-license-risk";
  const isSecrets = pathname === "/platform/secrets";
  const isDast = pathname === "/platform/dast";
  const isAgentic = pathname === "/platform/agentic-pentesting";
  const isLightPage = isCyberOntology || isSca || isSecrets;
  const isExoCase = isDast || isIac || isAgentic;

  useEffect(() => {
    if (isLightPage) {
      document.documentElement.setAttribute("data-theme", "light");
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }

    const html = document.documentElement;
    const body = document.body;
    if (isExoCase) {
      html.style.setProperty("overflow-x", "clip", "important");
      body.style.setProperty("overflow-x", "clip", "important");
      body.style.setProperty("overflow-y", "visible", "important");
    }

    return () => {
      document.documentElement.removeAttribute("data-theme");
      html.style.removeProperty("overflow-x");
      body.style.removeProperty("overflow-x");
      body.style.removeProperty("overflow-y");
    };
  }, [isLightPage, isExoCase]);

  if (isExoCase) {
    return (
      <div data-page={isAgentic ? "agentic" : isDast ? "dast" : "iac"} className="bg-white min-h-screen">
        {children}
      </div>
    );
  }

  return (
    <div
      data-page={isCyberOntology ? "cyber-ontology" : isSast ? "sast" : isSca ? "sca" : isSbom ? "sbom" : isSecrets ? "secrets" : "platform"}
      className={isLightPage ? "bg-[#FAFCFF] text-slate-900 min-h-screen" : "dark bg-[#0A0A0A] text-white min-h-screen"}
    >
      <div className={`w-full min-h-[80vh] flex flex-col justify-between ${isLightPage ? "bg-[#FAFCFF] text-slate-900" : "bg-[#0A0A0A] text-white"}`}>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
    </div>
  );
}
