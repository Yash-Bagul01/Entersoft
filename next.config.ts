import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins:['*.trycloudflare.com'],
  images: {
    qualities: [75, 85, 95],
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
      // M06: apex host on the Adversarial Validation paths only. These must
      // stay ahead of the relative rules so the apex request does not chain.
      {
        source: "/services/adversarial-validation",
        has: [{ type: "host", value: "entersoftsecurity.com" }],
        destination: "https://www.entersoftsecurity.com/services/adversarial-validation",
        permanent: true,
      },
      {
        source: "/services/penetration-testing",
        has: [{ type: "host", value: "entersoftsecurity.com" }],
        destination: "https://www.entersoftsecurity.com/services/adversarial-validation",
        permanent: true,
      },
      {
        source: "/services/vapt",
        has: [{ type: "host", value: "entersoftsecurity.com" }],
        destination: "https://www.entersoftsecurity.com/services/adversarial-validation",
        permanent: true,
      },
      {
        source: "/services/appsec",
        destination: "/services/application-security-testing",
        permanent: true,
      },
      {
        source: "/services/vapt",
        destination: "/services/adversarial-validation",
        permanent: true,
      },
      {
        source: "/services/penetration-testing",
        destination: "/services/adversarial-validation",
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
        source: "/company",
        destination: "/company/accreditations",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;