export interface StatItem {
  value: number;
  decimals: number;
  suffix: string;
  label: string;
  description: string;
}

export const stats: StatItem[] = [
  {
    value: 600,
    decimals: 0,
    suffix: "+",
    label: "CLIENTS SECURED",
    description: "Securing global enterprises across banking, logistics, and health sectors."
  },
  {
    value: 14,
    decimals: 0,
    suffix: " Yrs",
    label: "TEAM STABILITY",
    description: "Uninterrupted tenure of senior threat analysts, guaranteeing zero expertise churn."
  },
  {
    value: 12000,
    decimals: 0,
    suffix: "+",
    label: "EXPLOITS PROVEN",
    description: "Every finding backed by strict Proof of Concept (PoC) and impact evidence."
  },
  {
    value: 100000,
    decimals: 0,
    suffix: "+",
    label: "MANUAL AUDIT HOURS",
    description: "Rigorous manual test cases executing business logic flows beyond scanner limits."
  },
  {
    value: 0.01,
    decimals: 2,
    suffix: "%",
    label: "RECURRENCE RATE",
    description: "Unprecedented mitigation rate, ensuring vulnerabilities do not return."
  },
  {
    value: 0,
    decimals: 0,
    suffix: "",
    label: "BREACHES RECORDED",
    description: "A pristine 14-year track record of comprehensive breach prevention."
  }
];
