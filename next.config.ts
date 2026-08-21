import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d2ghx8biuioax8.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/services/appsec",
        destination: "/services/application-security-testing",
        permanent: true,
      },
      {
        source: "/services/vapt",
        destination: "/services/penetration-testing",
        permanent: true,
      },
      {
        source: "/services/cloud-resilience",
        destination: "/services/cloud-security",
        permanent: true,
      },
      {
        source: "/services/compliance-management",
        destination: "/services/grc-compliance-privacy",
        permanent: true,
      },
      {
        source: "/services/siem",
        destination: "/services/managed-detection-response",
        permanent: true,
      },
      {
        source: "/services/smart-contract-audits",
        destination: "/services/smart-contract-security",
        permanent: true,
      },
      {
        source: "/services/ai-ast",
        destination: "/services/ai-security-testing",
        permanent: true,
      },
      {
        source: "/platform",
        destination: "/platform/enprobe",
        permanent: true,
      },
      {
        source: "/company",
        destination: "/company/accreditations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
