export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  badge: string;
  metric: string;
  initials: string;
  rating: string;
}

export const testimonials: TestimonialItem[] = [
  {
    id: "ck-birla",
    quote: "Entersoft's exploit-first verification provided a level of security analysis that automated scanning tools cannot match. Their team discovered critical business logic vulnerabilities that protected our operational pipelines.",
    author: "MANOJ KUMAR",
    role: "DIRECTOR OF IT & CYBER INFRASTRUCTURE",
    company: "HIL / CK BIRLA GROUP",
    badge: "ENTERPRISE MANUFACTURING",
    metric: "0 ZERO-DAY EXPOSURE",
    initials: "MK",
    rating: "5.0 ★ AUDIT VERIFIED"
  },
  {
    id: "utrade",
    quote: "The assurance is absolute. Entersoft doesn't dump thousands of noisy false-positive alerts on our engineering team; they deliver verified proof-of-concept evidence and developer-ready fixes.",
    author: "HARSHVARDHAN R.",
    role: "CHIEF INFORMATION SECURITY OFFICER",
    company: "UTRADE SOLUTIONS",
    badge: "FINTECH TRADING PLATFORM",
    metric: "0 FALSE POSITIVES",
    initials: "HR",
    rating: "5.0 ★ EXPLOIT PROOF"
  },
  {
    id: "biogenex",
    quote: "Achieving complex regulatory readiness across our cloud platform was seamless. Entersoft mapped out our controls and validated our security posture in compliance with strict international regulations.",
    author: "ALAN SHAW",
    role: "DIRECTOR OF SECURITY OPERATIONS",
    company: "BIOGENEX",
    badge: "MEDTECH & BIOTECH",
    metric: "100% HIPAA/GDPR PASS",
    initials: "AS",
    rating: "5.0 ★ COMPLIANCE VALIDATED"
  },
  {
    id: "ioof",
    quote: "Their analysts worked within our deployment pipelines to run continuous security audits. The integration with our GitHub workflow ensures our codebase is secure before deployment.",
    author: "SARAH CONNELL",
    role: "VP OF PLATFORM RISK",
    company: "IOOF HOLDINGS",
    badge: "WEALTH MANAGEMENT",
    metric: "CI/CD DEVSEC OPS",
    initials: "SC",
    rating: "5.0 ★ DEVSEC INTEGRATED"
  },
  {
    id: "oakridge",
    quote: "Entersoft's same senior analyst team has supported us for years. Their stable tenure and deep understanding of our custom architecture are essential to our defensive line.",
    author: "RAJIV SHARMA",
    role: "HEAD OF PLATFORM SECURITY",
    company: "OAKRIDGE IT",
    badge: "GLOBAL IT SERVICES",
    metric: "5+ YR DEFENSIVE LINE",
    initials: "RS",
    rating: "5.0 ★ TRUSTED PARTNER"
  }
];
