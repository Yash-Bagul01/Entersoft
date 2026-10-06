export const ENPROBE_SITE = "https://enprobe.io";

export const OVA_WORDS = ["specialty.", "priority.", "evidence."] as const;

export const OVA_SECTORS = [
  {
    index: "01",
    title: "Asset intelligence",
    lead: "What do we own or depend on? Applications, APIs, repositories, components, cloud accounts, resources, identities and owners live in one inventory.",
    body: "A living map of owned and dependent assets — so priority is never guessed from a scanner name.",
    image: "/images/platform/enprobe-ova/s01.jpg?v=2",
    alt: "A living estate of applications, workstations and data systems in one inventory",
  },
  {
    index: "02",
    title: "ASPM",
    lead: "What is wrong in software — and what should be fixed first. Correlate evidence, remove duplicate work, and record verified retest outcomes.",
    body: "Application security evidence becomes one queue with a next safe action, not a pile of tool exports.",
    image: "/images/platform/enprobe-ova/s02.jpg?v=2",
    alt: "An engineer reviewing application code and security evidence",
  },
  {
    index: "03",
    title: "CSPM",
    lead: "Is the cloud configured safely right now? Public exposure, excessive access, protection gaps, stale evidence and drift — from read-only discovery.",
    body: "Cloud posture is evaluated without inventing a second risk language beside application security.",
    image: "/images/platform/enprobe-ova/s03.jpg?v=2",
    alt: "Cloud and network fabric used to evaluate configuration and exposure",
  },
  {
    index: "04",
    title: "Compound exposure",
    lead: "A software weakness becomes urgent when it is public, in production, backed by a powerful identity and connected to sensitive data.",
    body: "EnProbe makes that full path visible — and explains why it should be fixed now.",
    image: "/images/platform/enprobe-ova/s04.jpg?v=2",
    alt: "Connected paths showing how a weakness becomes compound exposure",
  },
  {
    index: "05",
    title: "Operating loop",
    lead: "Discover, ingest, normalize, correlate, prioritize, assign, remediate, retest and report — with history and staleness visible.",
    body: "Security and engineering share one discover-to-retest loop instead of two disconnected queues.",
    image: "/images/platform/enprobe-ova/s05.jpg?v=2",
    alt: "Security and engineering sharing one discover-to-retest operating loop",
  },
  {
    index: "06",
    title: "Runtime fabric",
    lead: "A signed telemetry contract correlating agentless discovery with approved runtime sensors. Telemetry, not remote administration.",
    body: "Policy-bound evidence from the fabric you already run — not another unmanaged agent.",
    image: "/images/platform/enprobe-ova/s06.jpg?v=2",
    alt: "Runtime interfaces collecting signed telemetry from the fabric you already run",
  },
  {
    index: "07",
    title: "Tenant-safe",
    lead: "Isolation, provenance and authorized publication at the API, job, database and evidence-download layers.",
    body: "Tenant, organization, project, role and object-level access decide who can see a finding.",
    image: "/images/platform/enprobe-ova/s07.jpg?v=2",
    alt: "Isolation and authorized access at every tenant boundary",
  },
  {
    index: "08",
    title: "Verified retest",
    lead: "A retest is authorized verification of the reported weakness in the intended scope — not merely another tool execution.",
    body: "Then prove posture, trend and risk reduction with reviewed evidence and a recorded outcome.",
    image: "/images/platform/enprobe-ova/s08.jpg?v=2",
    alt: "Verified evidence that a reported weakness was retested and closed",
  },
] as const;

export const OVA_VERBS = [
  {
    word: "Assures",
    body: "See the whole exposure. Fix what matters. Prove risk is gone. Application security first, AI assisted, expert governed.",
  },
  {
    word: "Discovers",
    body: "Map assets and evidence sources across applications, APIs, repositories, cloud accounts, resources and identities.",
  },
  {
    word: "Correlates",
    body: "Connect assets, findings, controls and owners. Deduplicate recurring evidence into one lifecycle record.",
  },
  {
    word: "Proves",
    body: "Keep severity intact, then explain urgency with reachability, exposure, threat evidence and controls. Evidence decides.",
  },
] as const;

export const OVA_ABOUT = [
  "EnProbe is an exposure-assurance platform dedicated to identifying what exists, what is wrong, and whether risk is actually gone.",
  "It unifies application testing, cloud-posture evidence, asset intelligence, remediation workflow and verified retesting into one operating picture.",
  "AI assists. Evidence decides. Closure, acceptance and verification remain policy-driven, tenant-safe and auditable.",
] as const;
