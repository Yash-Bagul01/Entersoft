"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <div data-page="platform" className="dark bg-[#060606] text-[#f6f5f0] min-h-screen">
      <Navbar />
      <div className="w-full bg-[#060606] text-white min-h-[80vh] flex flex-col justify-between">
        <div className="flex-1 flex flex-col">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
