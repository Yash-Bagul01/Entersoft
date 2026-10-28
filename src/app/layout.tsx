import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter_Tight, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import GrainOverlay from "@/components/layout/GrainOverlay";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { SolutionTransitionProvider } from "@/components/solutions/SolutionTransitionContext";
import { PlatformTransitionProvider } from "@/components/layout/PlatformPageTransition";
import { IS_PRODUCTION_HOST, METADATA_BASE } from "@/config/routes";

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_TITLE = "Application Security & Penetration Testing | Entersoft";
const SITE_DESCRIPTION =
  "Entersoft combines EnProbe automation with expert-led application security, penetration testing, cloud, MDR and AI security services for enterprises.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  metadataBase: new URL(METADATA_BASE),
  applicationName: "Entersoft Security",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Entersoft Security",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: IS_PRODUCTION_HOST
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      }
    : { index: false, follow: false },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="light"
      suppressHydrationWarning
      className={`${interTight.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..900&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,300..800&family=IBM+Plex+Mono:wght@300;400;500;600&family=Instrument+Serif:ital,wght@0,400;1,400&family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,600&display=swap"
        />
      </head>
      <body className="min-h-full bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col font-sans">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var saved=localStorage.getItem('theme');var theme=saved||'light';document.documentElement.setAttribute('data-theme',theme);}catch(e){}})();`}
        </Script>
        <SmoothScrollProvider>
          <SolutionTransitionProvider>
            <PlatformTransitionProvider>
              <GrainOverlay />
              <Navbar />
              <div className="flex flex-col flex-1 relative z-10">
                {children}
              </div>
              <Footer />
            </PlatformTransitionProvider>
          </SolutionTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
