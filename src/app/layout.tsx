import type { Metadata } from "next";
import { Geist, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CustomCursor from "@/components/layout/CustomCursor";
import GrainOverlay from "@/components/layout/GrainOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Entersoft Security | Flagship Application & Cloud Security",
  description: "One scan to know where you are exposed. One report to fix it fast. Award-winning cybersecurity including AppSec, VAPT, Managed Cloud Security, Compliance, SIEM, and Smart Contract audits.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://entersoftsecurity.com"),
  openGraph: {
    title: "Entersoft Security | Flagship Application & Cloud Security",
    description: "One scan to know where you are exposed. One report to fix it fast. Certified VAPT and cybersecurity solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#060606] text-[#F6F5F0] flex flex-col font-sans">
        <SmoothScrollProvider>
          <GrainOverlay />
          <div className="flex flex-col flex-1 relative z-10">
            {children}
          </div>
        </SmoothScrollProvider>
        <CustomCursor />
      </body>
    </html>
  );
}
