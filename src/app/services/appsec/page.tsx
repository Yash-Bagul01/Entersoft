import React from "react";
import type { Metadata } from "next";
import AppSecPlatformPage from "@/components/services/AppSecPlatformPage";

export const metadata: Metadata = {
  title: "Application Security (AppSec) | Entersoft Security",
  description: "Continuous application security testing embedded directly into your CI/CD pipelines. Identify vulnerabilities at the commit level.",
};

export default function AppSecPage() {
  return (
    <main className="w-full flex flex-col">
      <AppSecPlatformPage />
    </main>
  );
}
