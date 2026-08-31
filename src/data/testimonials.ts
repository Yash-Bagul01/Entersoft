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
  avatarColor?: string;
}

export const testimonials: TestimonialItem[] = [
  // Column 1 Items
  {
    id: "ck-birla",
    quote: "Entersoft's exploit-first verification provided a level of security analysis that automated scanning tools cannot match. Their team discovered critical business logic vulnerabilities that protected our operational pipelines.",
    author: "Manoj Kumar",
    role: "Director of IT & Cyber Infrastructure",
    company: "HIL / CK Birla Group",
    badge: "Enterprise Manufacturing",
    metric: "0 Zero-Day Exposure",
    initials: "MK",
    rating: "5.0 ★ Audit Verified",
    avatarColor: "from-blue-500 to-indigo-600",
  },
  {
    id: "utrade",
    quote: "The assurance is absolute. Entersoft doesn't dump thousands of noisy false-positive alerts on our engineering team; they deliver verified proof-of-concept evidence and developer-ready fixes.",
    author: "Harshvardhan R.",
    role: "Chief Information Security Officer",
    company: "UTrade Solutions",
    badge: "Fintech Trading Platform",
    metric: "0 False Positives",
    initials: "HR",
    rating: "5.0 ★ Exploit Proof",
    avatarColor: "from-cyan-500 to-blue-600",
  },
  {
    id: "biogenex",
    quote: "Achieving complex regulatory readiness across our cloud platform was seamless. Entersoft mapped out our controls and validated our security posture in compliance with strict international regulations.",
    author: "Alan Shaw",
    role: "Director of Security Operations",
    company: "BioGenex",
    badge: "MedTech & Biotech",
    metric: "100% HIPAA/GDPR Pass",
    initials: "AS",
    rating: "5.0 ★ Compliance Validated",
    avatarColor: "from-teal-500 to-emerald-600",
  },
  {
    id: "quant-vault",
    quote: "Entersoft systematically audited our smart contracts and API endpoints prior to mainnet launch. Their PoC exploits allowed our engineers to patch high-severity edge cases before production exposure.",
    author: "Viktor Vanek",
    role: "Chief Technology Officer",
    company: "QuantVault Protocol",
    badge: "Decentralized Finance",
    metric: "$2.4B Assets Secured",
    initials: "VV",
    rating: "5.0 ★ Zero Re-audit Fails",
    avatarColor: "from-purple-500 to-indigo-600",
  },

  // Column 2 Items
  {
    id: "ioof",
    quote: "Their analysts worked within our deployment pipelines to run continuous security audits. The integration with our GitHub workflow ensures our codebase is secure before deployment.",
    author: "Sarah Connell",
    role: "VP of Platform Risk",
    company: "IOOF Holdings",
    badge: "Wealth Management",
    metric: "CI/CD DevSecOps",
    initials: "SC",
    rating: "5.0 ★ DevSec Integrated",
    avatarColor: "from-sky-500 to-blue-600",
  },
  {
    id: "oakridge",
    quote: "Entersoft's same senior analyst team has supported us for years. Their stable tenure and deep understanding of our custom architecture are essential to our defensive line.",
    author: "Rajiv Sharma",
    role: "Head of Platform Security",
    company: "Oakridge IT Services",
    badge: "Global IT Services",
    metric: "5+ Yr Defensive Tenure",
    initials: "RS",
    rating: "5.0 ★ Trusted Partner",
    avatarColor: "from-blue-600 to-cyan-500",
  },
  {
    id: "apex-cloud",
    quote: "The EnProbe platform combined with Entersoft's penetration testers gave us complete visibility into IAM misconfigurations and API exposure across our multi-cloud deployment.",
    author: "Elena Rostova",
    role: "VP of Infrastructure Security",
    company: "Apex Cloud Networks",
    badge: "Enterprise SaaS",
    metric: "AWS/Azure Posture Pass",
    initials: "ER",
    rating: "5.0 ★ ASPM Verified",
    avatarColor: "from-indigo-500 to-purple-600",
  },
  {
    id: "nexus-health",
    quote: "Entersoft performed rigorous red teaming against our electronic health records infrastructure. Their actionable report enabled us to pass SOC2 Type II and ISO 27001 audits without delay.",
    author: "David Miller",
    role: "Chief Compliance Officer",
    company: "Nexus Health Systems",
    badge: "Healthcare Infrastructure",
    metric: "ISO 27001 Certified",
    initials: "DM",
    rating: "5.0 ★ Audit Ready",
    avatarColor: "from-emerald-500 to-teal-600",
  },

  // Column 3 Items
  {
    id: "astra-defense",
    quote: "Working with Entersoft feels like having an extended elite security team. Their manual penetration testing exposed critical zero-day logic flaws that automated engines missed.",
    author: "Marcus Thorne",
    role: "Head of Cybersecurity Operations",
    company: "Astra Defense Systems",
    badge: "Aerospace & Defense",
    metric: "CREST Empanelled",
    initials: "MT",
    rating: "5.0 ★ Red Team Verified",
    avatarColor: "from-blue-600 to-indigo-700",
  },
  {
    id: "paypulse",
    quote: "Entersoft's turnaround time for re-testing verified fixes is unmatched. They provide code diff suggestions directly to our developers, cutting remediation time by 65%.",
    author: "Ananya Patel",
    role: "Lead Application Security Architect",
    company: "PayPulse Gateway",
    badge: "Fintech Payments",
    metric: "65% Faster Fix Rate",
    initials: "AP",
    rating: "5.0 ★ Rapid Remediation",
    avatarColor: "from-cyan-500 to-teal-600",
  },
  {
    id: "solaris-energy",
    quote: "Protecting our SCADA and cloud telemetry systems against sophisticated attack vectors required deep domain expertise. Entersoft delivered clear, zero-noise vulnerability proof.",
    author: "Jonathan Vance",
    role: "Director of Critical Infrastructure",
    company: "Solaris Energy Group",
    badge: "Clean Energy & Grid",
    metric: "OT/ICS Shielded",
    initials: "JV",
    rating: "5.0 ★ Zero Noise",
    avatarColor: "from-amber-500 to-orange-600",
  },
  {
    id: "veritas-bank",
    quote: "Their CERT-In empanelled security auditors conducted end-to-end vulnerability assessment across our mobile banking applications, ensuring absolute regulatory compliance.",
    author: "Sophia Martinez",
    role: "Head of Cyber Governance",
    company: "Veritas Financial Bank",
    badge: "Banking & Financial Services",
    metric: "CERT-In Accredited",
    initials: "SM",
    rating: "5.0 ★ Regulatory Pass",
    avatarColor: "from-indigo-600 to-sky-600",
  },
];
