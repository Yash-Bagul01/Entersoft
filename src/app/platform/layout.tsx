"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  const isLightPage = isCyberOntology || isSca || isSecrets || isIac;

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

    return () => {
      document.documentElement.removeAttribute("data-theme");
    };
  }, [isLightPage]);

  return (
    <div 
      data-page={isCyberOntology ? "cyber-ontology" : isSast ? "sast" : isSca ? "sca" : isIac ? "iac" : isSbom ? "sbom" : isSecrets ? "secrets" : "platform"} 
      className={isLightPage ? "bg-[#FAFCFF] text-slate-900 min-h-screen" : "dark bg-[#0A0A0A] text-white min-h-screen"}
    >
      <Navbar />
      <div className={`w-full min-h-[80vh] flex flex-col justify-between ${isLightPage ? "bg-[#FAFCFF] text-slate-900" : "bg-[#0A0A0A] text-white"}`}>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
      {!isLightPage && !isSast && !isSbom && !isSecrets && <Footer />}
    </div>
  );
}
