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
  const isLightPage = isCyberOntology || isSast || isSca;

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
      data-page={isCyberOntology ? "cyber-ontology" : isSast ? "sast" : isSca ? "sca" : "platform"} 
      className={isLightPage ? "bg-[#FAFCFF] text-slate-900 min-h-screen" : "dark bg-[#060606] text-[#f6f5f0] min-h-screen"}
    >
      <Navbar />
      <div className={`w-full min-h-[80vh] flex flex-col justify-between ${isLightPage ? "bg-[#FAFCFF] text-slate-900" : "bg-[#060606] text-white"}`}>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
      {!isLightPage && <Footer />}
    </div>
  );
}
