import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      // Future URL Migration: Permanent 301 Redirect for AppSec page
      // Uncomment this redirect block when migrating from "/services/appsec" to "/offerings/application-security-assurance"
      /*
      {
        source: "/services/appsec",
        destination: "/offerings/application-security-assurance",
        permanent: true, // 301 redirect
      },
      */
    ];
  },
};

export default nextConfig;
