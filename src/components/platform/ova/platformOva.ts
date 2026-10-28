import { ROUTES } from "@/config/routes";

export type PlatformOvaSector = {
  index: string;
  title: string;
  lead: string;
  body: string;
  image: string;
  alt: string;
};

export type PlatformOvaVerb = {
  word: string;
  body: string;
};

export type PlatformOvaPageData = {
  id: string;
  brand: string;
  credit: string;
  creditSide: string;
  heroLead: string;
  words: readonly string[];
  ctaLabel: string;
  ctaHref: string;
  sinceTitle: string[];
  hero: string;
  manifesto: string;
  manifestoPosition?: string;
  since: string;
  sectors: readonly PlatformOvaSector[];
  verbs: readonly PlatformOvaVerb[];
  about: readonly string[];
};

const img = (id: string, name: string) => `/images/platform/ova/${id}/${name}.jpg`;

export const SAST_OVA: PlatformOvaPageData = {
  id: "sast",
  brand: "SAST",
  credit: "Static analysis practice",
  creditSide: "Source-path assurance",
  heroLead: "Readable, that is",
  words: ["source.", "graph.", "proof."],
  ctaLabel: "Book a briefing",
  ctaHref: ROUTES.contact,
  sinceTitle: ["Since", "the first parse,"],
  hero: img("sast", "hero"),
  manifesto: img("sast", "manifesto"),
  manifestoPosition: "center 18%",
  since: img("sast", "since"),
  sectors: [
    {
      index: "01",
      title: "Repository connection",
      lead: "Every push is a chance to see the flaw before it ships.",
      body: "Connect GitHub, GitLab, Bitbucket or Azure DevOps and scan the diff — not a weekly dump of the whole tree. The pull request is the unit of work, so the new path is visible before the branch is merged.",
      image: img("sast", "s01"),
      alt: "A developer workstation connected to a source repository",
    },
    {
      index: "02",
      title: "AST & data flow",
      lead: "A finding is only real if the path from source to sink exists.",
      body: "EnProbe builds abstract syntax trees and taint graphs so regex noise never becomes a ticket. If the data never reaches a sink, the match stays an explanation instead of a page.",
      image: img("sast", "s02"),
      alt: "Source code and syntax highlighting on a dark editor",
    },
    {
      index: "03",
      title: "Languages you ship",
      lead: "One engine, the languages your teams actually commit.",
      body: "Java, JavaScript, TypeScript, Python, Go, C# and more share the same severity language and the same queue. A polyglot service does not split into five reports that nobody reconciles.",
      image: img("sast", "s03"),
      alt: "Close view of application source across files",
    },
    {
      index: "04",
      title: "Proof, not pattern",
      lead: "Correlate static traces with runtime evidence when it exists.",
      body: "A reachable path stays urgent. An unreachable match is explained — not buried in a second tool. When runtime evidence exists, it is paired with the static trace so the ticket shows what can actually execute.",
      image: img("sast", "s04"),
      alt: "Engineers reviewing a code path together",
    },
    {
      index: "05",
      title: "Inline remediation",
      lead: "The fix belongs in the pull request, next to the line.",
      body: "Guidance, owner and next safe action post back to the developer workflow that introduced the change. The note sits on the line, with enough context to review the fix like any other diff.",
      image: img("sast", "s05"),
      alt: "A pull-request conversation on a laptop",
    },
    {
      index: "06",
      title: "Policy rules",
      lead: "Your sources, sinks and sanitizers — not only ours.",
      body: "Declarative custom rules keep house standards in the same scan that finds OWASP-class flaws. Sources, sinks and sanitizers you already trust stay in the graph, not in a footnote.",
      image: img("sast", "s06"),
      alt: "Policy notes beside an active codebase",
    },
  ],
  verbs: [
    { word: "Parses", body: "Read the change. Build the tree. Follow the data. Static analysis that names a path, not a pattern. The result is something a reviewer can open, not a banner matched on a string." },
    { word: "Traces", body: "Taint from source to sink across files and languages, so only executable flaws enter the queue. Each hop stays attached to the finding, so the owner can see the whole route." },
    { word: "Filters", body: "Keep severity intact, then drop what cannot run. Noise is a policy failure, not a feature. What remains is short enough to read inside the pull request." },
    { word: "Returns", body: "Post the finding, the owner and a next action into the pull request that introduced the risk. The developer who opened the change is the one who can close it." },
  ],
  about: [
    "EnProbe SAST is the static layer of exposure assurance — source, graph and proof in one operating picture. The scan follows the diff, so the tree stays current with the branch that is about to ship.",
    "It reads the languages you ship, traces what can actually run, and returns a next safe action to the developer who can fix it. Severity stays one language, even when the service is not.",
    "AI assists the explanation. Evidence decides whether the path is real. Closure stays in your pipeline, next to the line that introduced it.",
  ],
};

export const SCA_OVA: PlatformOvaPageData = {
  id: "sca",
  brand: "SCA",
  credit: "Composition practice",
  creditSide: "Reachable supply chain",
  heroLead: "Inherited, that is",
  words: ["graph.", "risk.", "license."],
  ctaLabel: "Book a briefing",
  ctaHref: ROUTES.contact,
  sinceTitle: ["Since", "the first lockfile,"],
  hero: img("sca", "hero"),
  manifesto: img("sca", "manifesto"),
  manifestoPosition: "center 28%",
  since: img("sca", "since"),
  sectors: [
    {
      index: "01",
      title: "Manifest intake",
      lead: "What you inherited starts in the lockfile, not the README.",
      body: "npm, Maven, pip, Go and Cargo manifests become one inventory of declared and transitive packages. The lockfile is the source of truth, so a README version never stands in for what the build actually resolved.",
      image: img("sca", "s01"),
      alt: "Packaged goods as a metaphor for software dependencies",
    },
    {
      index: "02",
      title: "Transitive graph",
      lead: "The risk is rarely the package you chose.",
      body: "Recursive inspection of locks and binaries surfaces nested libraries you never negotiated. The package you pinned is often innocent. The one three levels down is the one that ships the flaw.",
      image: img("sca", "s02"),
      alt: "Stacked crates standing in for a transitive package graph",
    },
    {
      index: "03",
      title: "Intelligence feed",
      lead: "A CVE is only useful if it arrives before the exploit does.",
      body: "NVD, OSV, GitHub advisories and CISA KEV refresh the same queue — not a weekly spreadsheet. A new advisory lands on the package you already have, instead of waiting for the next export.",
      image: img("sca", "s03"),
      alt: "A live operations wall used to watch incoming risk",
    },
    {
      index: "04",
      title: "Reachability",
      lead: "A vulnerable function that you never call is not a ship-stopper.",
      body: "Call-graph analysis ranks only the CVEs your application can actually execute. A vulnerable function you never call stays on the record, but it does not stop the release.",
      image: img("sca", "s04"),
      alt: "Network paths illustrating reachable versus dead dependency code",
    },
    {
      index: "05",
      title: "License class",
      lead: "Copyleft is a release decision, not a surprise at legal review.",
      body: "Permissive, weak and strong copyleft sit beside the CVE so engineering and counsel share one list. The license question is answered on the same package that carries the vulnerability.",
      image: img("sca", "s05"),
      alt: "Documents used to classify open-source licenses",
    },
    {
      index: "06",
      title: "Upgrade path",
      lead: "The next safe version should arrive as a pull request.",
      body: "Non-breaking upgrade proposals keep the inventory moving without a second war-room. The next safe version arrives as a pull request, with the advisory it closes named on the diff.",
      image: img("sca", "s06"),
      alt: "A shipping lane for moving packages to a safer version",
    },
  ],
  verbs: [
    { word: "Inventories", body: "Collect declared and transitive packages from the manifests you already build. What the lockfile resolved is what gets listed, including the libraries nobody chose by name." },
    { word: "Ranks", body: "Score CVE and license together, then keep only what is reachable in your graph. A known flaw you cannot execute does not outrank the one your service calls." },
    { word: "Explains", body: "Show the path from your code to the vulnerable function — or why it cannot run. The explanation is the difference between a ship-stopper and a note for later." },
    { word: "Upgrades", body: "Propose the next safe version in the same workflow that introduced the dependency. The pull request names the advisory, so the reviewer knows what the bump is for." },
  ],
  about: [
    "EnProbe SCA is the supply-chain layer of exposure assurance — inherited packages, reachable risk and license class in one picture. The inventory follows the lockfile, so it changes when the build changes.",
    "It maps lockfiles, ranks what can actually execute, and keeps legal and engineering on the same build. Copyleft and CVE sit on one line, not in two inboxes.",
    "A living inventory beats a scanner export. Evidence decides whether you can still ship it, and the next safe version is offered in the pull request.",
  ],
};

export const SBOM_OVA: PlatformOvaPageData = {
  id: "sbom",
  brand: "SBOM",
  credit: "Inventory practice",
  creditSide: "License-class evidence",
  heroLead: "Declared, that is",
  words: ["bom.", "license.", "proof."],
  ctaLabel: "Book a briefing",
  ctaHref: ROUTES.contact,
  sinceTitle: ["Since", "the first export,"],
  hero: img("sbom", "hero"),
  manifesto: img("sbom", "manifesto"),
  manifestoPosition: "center 22%",
  since: img("sbom", "since"),
  sectors: [
    {
      index: "01",
      title: "Build ingestion",
      lead: "The bill of materials is taken from the build, not reconstructed later.",
      body: "Pipeline extraction keeps CycloneDX and SPDX current with what actually shipped. The bill is taken from the artifact, so a later reconstruction cannot invent components the build never had.",
      image: img("sbom", "s01"),
      alt: "An inventory of components ready for a bill of materials",
    },
    {
      index: "02",
      title: "CycloneDX & SPDX",
      lead: "Customers ask for a format. You should already have both.",
      body: "Machine-readable SBOMs export without a second spreadsheet exercise at audit time. When a customer asks for CycloneDX or SPDX, the file is already the one the pipeline produced.",
      image: img("sbom", "s02"),
      alt: "Structured records standing in for a software bill of materials",
    },
    {
      index: "03",
      title: "License class",
      lead: "GPL in a release is a business decision you can still make.",
      body: "Permissive, weak copyleft and strong copyleft are ranked before the customer asks. GPL in a release is still a choice you can make — just not one you discover in the contract review.",
      image: img("sbom", "s03"),
      alt: "Legal review of license terms",
    },
    {
      index: "04",
      title: "Policy gate",
      lead: "A non-compliant license should fail the build, not the quarter.",
      body: "House rules block the release that would give away the IP you meant to keep. The failing component is named in the build, with the license class that tripped the gate.",
      image: img("sbom", "s04"),
      alt: "A controlled gate before goods leave the dock",
    },
    {
      index: "05",
      title: "Drift across builds",
      lead: "Yesterday's SBOM is not today's release.",
      body: "Component inventory is watched across every build so silent adds do not become a customer finding. A package that appears between yesterday and today is a diff, not a surprise at the next audit.",
      image: img("sbom", "s05"),
      alt: "Time-series records of a changing inventory",
    },
    {
      index: "06",
      title: "Signed export",
      lead: "The file you hand over should be the file you can stand behind.",
      body: "Cryptographically signed packages travel to auditors and customers as reviewed evidence. The file you hand over is the file the build signed, so the inventory and the binary still match.",
      image: img("sbom", "s06"),
      alt: "A signed document prepared for delivery",
    },
  ],
  verbs: [
    { word: "Lists", body: "Produce a living SBOM from the build — CycloneDX and SPDX, not a reconstructed guess. The list changes when the artifact changes, so last quarter's export cannot stand in for this release." },
    { word: "Classes", body: "Rank licenses into permissive, weak and strong copyleft before legal is surprised. The class sits on the component, next to the version that shipped." },
    { word: "Gates", body: "Stop the release that violates house policy. The inventory is the control. The build names the package and the rule, so the failure is a diff and not a meeting." },
    { word: "Signs", body: "Export reviewed, signed evidence the customer and the auditor can both accept. Signature and contents stay together, so the file can be checked later without rebuilding the story." },
  ],
  about: [
    "EnProbe SBOM is the inventory layer of exposure assurance — what you shipped, what it is licensed as, and whether that is still allowed. The bill is taken from the build, not assembled after the fact.",
    "It keeps CycloneDX and SPDX current with the build, classes copyleft before release, and signs the file you hand over. Drift between builds is visible before a customer finds it.",
    "A bill of materials is only useful if it matches the binary. Evidence decides, and the signed export is the record you can stand behind.",
  ],
};

export const SECRETS_OVA: PlatformOvaPageData = {
  id: "secrets",
  brand: "Secrets",
  credit: "Credential practice",
  creditSide: "Live-token defense",
  heroLead: "Exposed, that is",
  words: ["key.", "token.", "secret."],
  ctaLabel: "Book a briefing",
  ctaHref: ROUTES.contact,
  sinceTitle: ["Since", "the first leak,"],
  hero: img("secrets", "hero"),
  manifesto: img("secrets", "manifesto"),
  manifestoPosition: "center 30%",
  since: img("secrets", "since"),
  sectors: [
    {
      index: "01",
      title: "Pre-commit intercept",
      lead: "A key that never reaches the remote never needs a war-room.",
      body: "Workstation hooks and PR gates scan the diff in milliseconds and reject the compromised commit. The key never reaches the remote, so there is no history to scrub and no rotation waiting on a ticket.",
      image: img("secrets", "s01"),
      alt: "A lock standing in for stopping a credential before it ships",
    },
    {
      index: "02",
      title: "Entropy & AST",
      lead: "Random strings are not all secrets. Context decides.",
      body: "Shannon entropy plus syntax-tree context separates live tokens from test fixtures. A random-looking string in a sample stays quiet. The same shape in a config that ships does not.",
      image: img("secrets", "s02"),
      alt: "Encrypted material and keys as a metaphor for credential detection",
    },
    {
      index: "03",
      title: "Git history",
      lead: "Most leaked keys still live in a branch nobody deploys.",
      body: "Full object-database traversal finds credentials in tags, stashes, orphans and merged PRs. A key that left the default branch is still a key, and it still needs an owner.",
      image: img("secrets", "s03"),
      alt: "An archive of records where forgotten credentials still sit",
    },
    {
      index: "04",
      title: "Live verification",
      lead: "A mock string is not an incident. An active AWS key is.",
      body: "Sandboxed checks against issuers confirm whether the token still works — before you page anyone. A dead example stays a note. A live credential becomes the incident it already is.",
      image: img("secrets", "s04"),
      alt: "A verification desk confirming whether a credential is still live",
    },
    {
      index: "05",
      title: "Issuer coverage",
      lead: "The keys you use are the keys we look for.",
      body: "AWS, GCP, Azure, GitHub, Slack, Stripe, Vault and a thousand other issuers share one detector. The format changes. The queue does not, so a Stripe key and an AWS key are reviewed the same way.",
      image: img("secrets", "s05"),
      alt: "A wall of services that issue credentials",
    },
    {
      index: "06",
      title: "Rotation playbooks",
      lead: "Seconds after a live secret, revocation should already be running.",
      body: "IAM, Vault and webhook playbooks rotate the credential without waiting for a ticket to age. Revoke, replace and prove stay one motion, while the old value can still open something.",
      image: img("secrets", "s06"),
      alt: "A vault used to rotate and replace exposed credentials",
    },
  ],
  verbs: [
    { word: "Intercepts", body: "Stop the commit that contains a key. The remote should never see it. The rejection happens on the diff, with the line named, before the object is stored." },
    { word: "Verifies", body: "Ask the issuer whether the token still works. Mock strings are not incidents. A live answer is what turns a match into something worth paging." },
    { word: "Histories", body: "Walk every branch, tag and orphan until forgotten credentials have an owner. Leaving the default branch does not retire a key that still authenticates." },
    { word: "Rotates", body: "Revoke and replace through IAM and Vault playbooks while the blast radius is still small. Closure waits until the old value is confirmed dead." },
  ],
  about: [
    "EnProbe Secrets is the credential layer of exposure assurance — intercept, verify, history and rotation in one loop. The same detector covers the commit you are about to push and the history you already have.",
    "It stops keys at the commit, confirms they are live, and rotates them before the ticket is written. Fixtures stay quiet only when policy says they may.",
    "A secret in git is a clock. Evidence decides whether it still opens something, and the playbook starts while it does.",
  ],
};

export const IAC_OVA: PlatformOvaPageData = {
  id: "iac",
  brand: "IaC",
  credit: "Provision practice",
  creditSide: "Policy-as-code gates",
  heroLead: "Provisioned, that is",
  words: ["policy.", "drift.", "gate."],
  ctaLabel: "Book a briefing",
  ctaHref: ROUTES.contact,
  sinceTitle: ["Since", "the first apply,"],
  hero: "/images/platform/ova/iac/hero-provision.jpg",
  manifesto: img("iac", "manifesto"),
  manifestoPosition: "center 24%",
  since: img("iac", "since"),
  sectors: [
    {
      index: "01",
      title: "Manifest intake",
      lead: "The plan file is the last safe place to refuse a misconfiguration.",
      body: "Terraform, CloudFormation, Helm and Kubernetes YAML are parsed in the same pipeline that would apply them. The plan is read before the cloud creates the resource, so the refusal still has a diff to fix.",
      image: img("iac", "s01"),
      alt: "Infrastructure diagrams before cloud resources are created",
    },
    {
      index: "02",
      title: "Misconfiguration",
      lead: "Open groups, public buckets and powerful roles are still the usual story.",
      body: "Overly permissive IAM, unencrypted stores and exposed workloads are named before they exist in the account. The finding points at the resource and the rule, so the author can see what the plan would open.",
      image: img("iac", "s02"),
      alt: "A datacenter aisle representing provisioned cloud fabric",
    },
    {
      index: "03",
      title: "OPA policy",
      lead: "House baselines belong in Rego, not in a wiki.",
      body: "Open Policy Agent evaluates every template against the rules your security team already wrote. A baseline in Rego runs on every plan, so the wiki version cannot drift away from the gate.",
      image: img("iac", "s03"),
      alt: "Policy documents used as infrastructure guardrails",
    },
    {
      index: "04",
      title: "Deployment gate",
      lead: "A failing policy is a blocked apply — not a finding after go-live.",
      body: "CI/CD refuses the plan that would create the exposure. Developers see the rule that stopped it, on the change they already have open, with the resource named in the log.",
      image: img("iac", "s04"),
      alt: "A pipeline gate before infrastructure is applied",
    },
    {
      index: "05",
      title: "Drift watch",
      lead: "The console click that bypassed IaC is still a finding.",
      body: "Declared templates are compared to live cloud state so silent drift cannot hide beside a green pipeline. A console click that bypassed the repo is still a finding, with an owner.",
      image: img("iac", "s05"),
      alt: "Live cloud operations compared against declared infrastructure",
    },
    {
      index: "06",
      title: "Repair PR",
      lead: "The next safe template should arrive as a change, not a war-room.",
      body: "Non-breaking remediation proposals keep the estate aligned with policy without a second ticket queue. The safer template arrives as a pull request, and the rule it satisfies is written on the diff.",
      image: img("iac", "s06"),
      alt: "Engineers applying a safer infrastructure change",
    },
  ],
  verbs: [
    { word: "Parses", body: "Read HCL, YAML and JSON before the cloud does. The plan is the control. Terraform, CloudFormation, Helm and Kubernetes share that reading, so the format does not decide whether a rule runs." },
    { word: "Evaluates", body: "Run OPA against house baselines so a public bucket never becomes an apply. The rule your team already wrote is the one the pipeline executes." },
    { word: "Blocks", body: "Refuse the pipeline that would provision the exposure. The rule is the ticket. The author sees which resource failed, in the same log as the plan." },
    { word: "Aligns", body: "Compare live state to the template. Drift is a finding with an owner. A green pipeline does not excuse a console change that the repo never approved." },
  ],
  about: [
    "EnProbe IaC is the provision layer of exposure assurance — template, policy, gate and drift in one loop. The refusal happens while the change is still a plan.",
    "It reads what you are about to apply, evaluates it against house rules, and blocks the change that would go public. The safer setting comes back as a pull request.",
    "Infrastructure as code is only safer if the policy runs first. Evidence decides whether yesterday's exception is still allowed.",
  ],
};

export const CORE_PLATFORM_OVA = {
  sast: SAST_OVA,
  sca: SCA_OVA,
  sbom: SBOM_OVA,
  secrets: SECRETS_OVA,
  iac: IAC_OVA,
} as const;
