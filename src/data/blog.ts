export interface BlogPostItem {
  id: string;
  category: string;
  title: string;
  teaser: string;
  date: string;
  link: string;
}

export const blogPosts: BlogPostItem[] = [
  {
    id: "vapt-roundup",
    category: "VAPT METHODOLOGY",
    title: "Why Automated Scanners Miss 80% of Business Logic Flaws",
    teaser: "Analyzing the delta between signature-based scanning patterns and deep logical verification in enterprise pipelines.",
    date: "JUNE 12, 2026",
    link: "#insights/vapt-roundup"
  },
  {
    id: "crowdstrike-workaround",
    category: "MANAGED SECURITY",
    title: "Post-Incident Workarounds: Mitigating Kernel-Level Failure Nodes",
    teaser: "A technical brief detailing cloud infrastructure resiliency strategies when operating system kernel modules fail.",
    date: "JULY 22, 2026",
    link: "#insights/crowdstrike-workaround"
  },
  {
    id: "defi-attacks",
    category: "DEFI & BLOCKCHAIN",
    title: "Dissecting Reentrancy & Flash Loan Flaws in Decentralized Code",
    teaser: "A walkthrough of major smart contract attack vectors in Solidity networks and our audited remediation patches.",
    date: "AUGUST 05, 2026",
    link: "#insights/defi-attacks"
  }
];
