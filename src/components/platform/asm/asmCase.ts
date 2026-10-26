import { hubFront, hubVideo } from "@/data/platformHub";
import type { ExoApeCase } from "@/components/platform/exoape/types";

const img = (name: string) => `/images/platform/runtime/asm/${name}.jpg`;

const RECOGNITION = [
  { name: "CREST", detail: "Registered penetration testing services" },
  { name: "CERT-In", detail: "Empanelled information security auditing organisation" },
  { name: "ISO/IEC 27001", detail: "Certified information security management system" },
  { name: "GDPR", detail: "Validated data processing controls" },
];

export const ASM_CASE: ExoApeCase = {
  id: "attack-surface-management",
  heroTitle: "EnProbe ASM",
  heroSubtitle: "Attack Surface Management",
  intro:
    "EnProbe continuously maps the external digital footprint — unknown subdomains, open ports, forgotten staging hosts and leaked cloud buckets — then ranks what an attacker can actually reach.",
  ctaLabel: "Book a briefing",
  ctaHref: "/contact",
  meta: [
    { label: "Capability", values: ["External discovery"] },
    { label: "Coverage", values: ["Domains · IPs · Certificates"] },
    { label: "Focus", values: ["Shadow IT · Cloud leaks"] },
    { label: "Delivery", values: ["SOC alerts · Ownership"] },
  ],
  images: {
    hero: hubFront("asm"),
    heroVideo: hubVideo("asm"),
    heroAlt: "City perimeter used as a stand-in for the external attack surface",
    wide: img("wide"),
    wideAlt: "Night city grid standing in for a living asset map",
    beliefs: img("beliefs"),
    beliefsAlt: "Skyline used as an external exposure field",
    statement: img("statement"),
    statementAlt: "Highway light trails as newly discovered routes",
    mockup: img("mockup"),
    mockupAlt: "Aerial city used while ranking reachable hosts",
    next: img("next"),
    nextAlt: "Wide aerial used for the next platform chapter",
    collage: [
      {
        src: "/images/platform/runtime/asm/center-surface.jpg",
        alt: "Earth from orbit, the external attack surface",
        tag: "01 / PERIMETER SEED",
        headline: "Domains, ranges and ASNs become the map",
        metric: "Corporate seed input",
        desc: "Start from the names and ranges you already own, then expand into what the internet already published.",
      },
      {
        src: img("c02"),
        alt: "Dusk towers standing in for DNS and certificate noise",
        tag: "02 / OSINT & DNS",
        headline: "Certificates and WHOIS fill the gaps",
        metric: "Global reconnaissance",
        desc: "TLS, DNS, WHOIS and public threat telemetry reveal hosts no inventory listed.",
      },
      {
        src: img("c03"),
        alt: "Lit facade used as an exposed service fingerprint",
        tag: "03 / PORT & FINGERPRINT",
        headline: "What is actually listening",
        metric: "Active services named",
        desc: "Open ports, server versions and cloud providers are fingerprinted without a noisy sweep story.",
      },
      {
        src: img("c04"),
        alt: "Glass towers used for shadow-IT detection",
        tag: "04 / SHADOW IT",
        headline: "Staging, buckets and leftover portals",
        metric: "Unmanaged exposure",
        desc: "Forgotten cloud storage, staging apps and legacy portals surface before an outsider names them.",
      },
      {
        src: img("c05"),
        alt: "Night streets used for ownership ranking",
        tag: "05 / RISK RANK",
        headline: "Criticality, exposure, owner",
        metric: "Business-domain sort",
        desc: "Each asset is scored by reachability and assigned to the team that can take it down or lock it.",
      },
      {
        src: img("c06"),
        alt: "Skyline used for continuous alerting",
        tag: "06 / NEW-HOST ALERT",
        headline: "The map updates when the perimeter does",
        metric: "SOC-ready notice",
        desc: "A new subdomain or certificate is an event, not a quarterly surprise.",
      },
      {
        src: img("c07"),
        alt: "Wide city used as the living external graph",
        tag: "07 / LIVING GRAPH",
        headline: "One picture of what faces the internet",
        metric: "Continuous footprint",
        desc: "The external graph stays current so DAST and agentic tests start from what is actually exposed.",
      },
    ],
  },
  objective: {
    lines: ["See the", "edge", "first"],
    body: "Attackers do not start from your CMDB. They start from DNS, certificates and a forgotten staging host. The objective was to map that public edge continuously, name the owner, and alert the moment a new asset appears.",
  },
  solution: {
    lines: ["Map what the internet", "already knows about you"],
    left: "EnProbe seeds from domains, IP ranges and ASNs, then walks DNS, TLS certificates, WHOIS and public telemetry to find hosts no one listed.",
    right:
      "Active services are fingerprinted, shadow cloud and leftover portals are flagged, and each asset is ranked by exposure and business ownership so the SOC is not staring at an unsorted list.",
  },
  beliefs: {
    label: "The exposure cycle, in three moves",
    items: [
      { word: "Seed", note: "Domains, ranges, ASNs", align: "right" },
      { word: "Reveal", note: "DNS, certs, open ports", align: "left" },
      { word: "Assign", note: "Owner and severity", align: "right" },
    ],
  },
  anticipate: {
    marker: "Continuity",
    lines: ["Anticipating the", "host you did not list"],
    body: "The perimeter is not a quarterly scan. A marketing subdomain, a leftover bucket or a new certificate should reach the SOC the day it appears — with an owner already attached.",
    cards: [
      {
        index: "01",
        label: "The Seed",
        title: "Corporate names and ranges expand into the public graph.",
        image: img("a01"),
        alt: "Aerial streets used while seeding discovery",
        tag: "DOMAIN / ASN",
        metric: "Known estate first",
        desc: "Start from what you own, then let public records name the rest.",
      },
      {
        index: "02",
        label: "The Reveal",
        title: "Certificates and open ports show what is actually reachable.",
        image: img("a02"),
        alt: "Night city used as a newly revealed host set",
        tag: "OSINT + FINGERPRINT",
        metric: "Reachable services",
        desc: "TLS, DNS and port evidence become assets, not raw scanner noise.",
      },
      {
        index: "03",
        label: "The Alert",
        title: "A new unmapped host is an event with an owner.",
        image: img("a03"),
        alt: "Lit towers used for exposure alerting",
        tag: "SOC NOTICE",
        metric: "Same-day visibility",
        desc: "Operations receive the host, the exposure class and the team that can close it.",
      },
    ],
  },
  railTitle: "Precision in external discovery",
  stages: [
    {
      index: "01",
      title: "Domain & IP seed input",
      body: "Corporate domains, IP ranges and ASN details seed the engine — the estate you already claim.",
      image: img("a01"),
      alt: "Aerial streets used while seeding discovery",
    },
    {
      index: "02",
      title: "OSINT & DNS reconnaissance",
      body: "Global DNS, TLS certificates, WHOIS and public threat telemetry reveal hosts no inventory listed.",
      image: img("c02"),
      alt: "Dusk towers standing in for DNS and certificate noise",
    },
    {
      index: "03",
      title: "Port & fingerprint scan",
      body: "Active web servers, versions, exposed services and cloud providers are identified with a light touch.",
      image: img("a02"),
      alt: "Night city used as a newly revealed host set",
    },
    {
      index: "04",
      title: "Shadow IT & cloud leaks",
      body: "Unmanaged buckets, staging environments and leftover portals are named before an outsider publishes them.",
      image: img("c04"),
      alt: "Glass towers used for shadow-IT detection",
    },
    {
      index: "05",
      title: "Exposure alerting",
      body: "A new unmapped perimeter asset notifies operations with criticality and a suggested owner.",
      image: img("a03"),
      alt: "Lit towers used for exposure alerting",
    },
  ],
  specs: [
    {
      label: "Surface",
      value: "External footprint",
      body: "Web apps, subdomains, cloud IPs, DNS records, certificates and leftover portals.",
    },
    {
      label: "Focus",
      value: "Reachability",
      body: "What an outsider can find from public records — not only what the CMDB claims.",
    },
    {
      label: "Evidence",
      value: "Host + owner",
      body: "Each asset carries exposure class, fingerprint and a business-domain owner.",
    },
    {
      label: "Integration",
      value: "SOC feed",
      body: "New-host events land in the same operations queue that already watches the perimeter.",
    },
  ],
  partnershipLines: ["Stellar", "partnership"],
  quote: {
    text: "Visibility is not a pretty map. It is knowing a staging host appeared this morning, who owns the certificate, and whether DAST should already be looking at it. EnProbe ASM was built so that sentence is ordinary.",
    name: "EnProbe practice",
    role: "Attack surface · Test Runtime cluster",
    initials: "AM",
  },
  recognition: RECOGNITION,
  mockupCaption: "Newly discovered host ranked and assigned the same day.",
  floatNote: { label: "1. Discovery phase", title: "You name the estate. We find the rest." },
  faqs: [
    {
      question: "How is this different from a one-off external scan?",
      answer:
        "A point-in-time scan is a snapshot. EnProbe keeps DNS, certificates and newly issued hosts in a living inventory, so a marketing subdomain or leftover bucket is an event the day it appears.",
    },
    {
      question: "Will discovery generate noisy traffic against production?",
      answer:
        "Reconnaissance leans on public records first — DNS, TLS, WHOIS and threat telemetry. Active fingerprinting is scoped and rate-limited so it does not become a story on your edge.",
    },
    {
      question: "Can you find unmanaged cloud accounts and buckets?",
      answer:
        "Yes. Certificate and DNS evidence plus known cloud patterns surface unmanaged storage, staging apps and leftover portals, then attach a suggested owner.",
    },
    {
      question: "How do findings reach the SOC?",
      answer:
        "New or changed perimeter assets raise an alert with exposure class, fingerprint and business-domain ownership so operations are not sorting a raw host list.",
    },
    {
      question: "How does ASM feed the rest of EnProbe?",
      answer:
        "Reachable web and API hosts become candidates for DAST and agentic testing. Cloud leaks inform Cloud AppSec. The map is the start of the test, not a separate spreadsheet.",
    },
  ],
  next: {
    href: "/platform/cloud-appsec",
    title: "Cloud AppSec",
    subtitle: "Single-pane cloud application risk",
  },
};
