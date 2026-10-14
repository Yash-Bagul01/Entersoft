import { ROUTES } from "@/config/routes";

export const resourceNav = [
  {
    label: "Blog",
    href: ROUTES.resources.blog,
    description: "Practice notes on testing, cloud and application risk.",
  },
  {
    label: "Media",
    href: ROUTES.resources.media,
    description: "Announcements, accreditation and public recognition.",
  },
  {
    label: "FAQ",
    href: ROUTES.resources.faq,
    description: "How engagements, scope and evidence actually work.",
  },
  {
    label: "Events",
    href: ROUTES.resources.events,
    description: "Closed sessions with senior white-hat practitioners.",
  },
  {
    label: "Webinars",
    href: ROUTES.resources.webinars,
    description: "A quarterly series on cloud and identity risk.",
  },
  {
    label: "Hackfest",
    href: ROUTES.resources.hackfest,
    description: "A room of hackers, a day of findings, a culture of secure code.",
  },
] as const;

export const blogEntries = [
  {
    id: "vapt-tools-2024",
    category: "VAPT",
    date: "18 Mar 2024",
    title: "Six VAPT tools worth knowing in 2024",
    teaser:
      "A scanner is a starting inventory. These are the classes of tool a test still leans on, and the flaw each one cannot see.",
    href: ROUTES.services.vapt,
    paragraphs: [
      "Vulnerability assessment and penetration testing still starts with an inventory: what is exposed, what answers, and which versions are standing behind the hostname. In 2024 the useful bench is a small set of tools with a person deciding what the output means.",
      "A proxy such as Burp Suite is where the real test happens, because it lets a tester change a request the application never expected. Nmap and similar scanners answer what is listening. Nikto and directory tools catch the forgotten path. SQLMap is for one class of injection, not for business logic. An API client such as Postman is how you walk roles. SSL checkers tell you whether the transport is the problem.",
      "None of those tools notice that a refund can be called twice or that a price is trusted from the browser. The short list clears the known issues. The finding that matters is still the one a tester reproduced by hand.",
    ],
  },
  {
    id: "endpoint-agent-outage",
    category: "Cloud",
    date: "19 Jul 2024",
    title: "When a security agent takes Windows down",
    teaser:
      "A faulty endpoint update can halt a fleet faster than an intrusion. The workaround is operational: boot, isolate the channel, and return on a known-good build.",
    href: ROUTES.services.cloud,
    paragraphs: [
      "In July 2024 a faulty update from a widely deployed endpoint agent left Windows hosts in a recovery loop. The lesson for a security programme is that the control closest to the kernel is also an availability dependency.",
      "The practical workaround is the one operations already rehearses for a bad driver: boot into recovery, remove or rename the faulting component, and bring the host back before the root-cause meeting. Staged rings, a known-good version, and a person who can freeze the channel matter more than a second vendor with the same blast radius.",
      "After the fleet is up, write down what the update system could see and what it could not. That note is the start of the next architecture review.",
    ],
  },
  {
    id: "attacks-2023",
    category: "Practice",
    date: "8 Jan 2024",
    title: "What the 2023 attack year asked of 2024",
    teaser:
      "The public breaches of 2023 were less about a new bug class and more about identity, exposed edge systems, and vendors.",
    href: ROUTES.services.appsec,
    paragraphs: [
      "Looking back at 2023, the incidents that travelled were familiar: stolen credentials, an edge appliance left unpatched, a vendor with more access than the contract described, and ransomware after the first foothold stayed quiet.",
      "The useful response is narrower than a new framework. Multi-factor authentication on the paths that move money and data. A list of internet-facing systems that someone owns. A way to patch the edge without waiting for a quarterly window. A vendor review that asks what they can reach, not only which logo is on the slide.",
      "Application testing still belongs in that list. Most of those intrusions became serious once an attacker could move through a system the business actually uses. A test that stops at the marketing site does not change the year.",
    ],
  },
  {
    id: "scanners-miss-logic",
    category: "VAPT",
    date: "12 Jun 2026",
    title: "Why automated scanners miss most business-logic flaws",
    teaser:
      "Signature scanners walk happy paths. The flaws that move money, skip a role, or trust a client-side total live between those paths.",
    href: ROUTES.services.vapt,
    paragraphs: [
      "A scanner is excellent at repeating a known request and matching a known response. It is poor at noticing that a refund can be called twice, that a price is trusted from the browser, or that step three of a workflow can be opened without step two.",
      "That gap is why a penetration test still has a person in it. The tester maps roles, objects and state, then tries the transitions the product never advertised. The report should show the request, the unintended state, and the fix a developer can replay.",
      "Use scanners to keep the known issues from coming back. Use a manual test when the question is whether the business rules themselves can be bent.",
    ],
  },
  {
    id: "kernel-failure",
    category: "Cloud",
    date: "22 Jul 2026",
    title: "When a kernel module fails, the cloud plan is the product",
    teaser:
      "A bad security agent can take a fleet down faster than an attacker. Resilience is the runbook you already rehearsed.",
    href: ROUTES.services.cloud,
    paragraphs: [
      "Endpoint and cloud agents sit close to the operating system. When one of them faults, every host that received the update faults together. The incident is no longer a security ticket. It is an availability incident with a security cause.",
      "The useful preparation is dull: staged rollouts, a known-good version, a way to boot without the module, and an owner who can freeze the channel. Multi-cloud does not help if every account consumes the same update at the same minute.",
      "After the fleet is back, write down what the control plane could see and what it could not. That note is the start of the next architecture review, not a postmortem that lives in a slide.",
    ],
  },
  {
    id: "reentrancy",
    category: "Web3",
    date: "05 Aug 2026",
    title: "Reentrancy and flash loans are still design problems",
    teaser:
      "The exploit is rarely a mysterious opcode. It is a function that hands over control before it finishes its own accounting.",
    href: ROUTES.services.smartContract,
    paragraphs: [
      "Reentrancy happens when an external call can re-enter the contract before balances, shares or collateral have been updated. Flash loans make the same class of bug expensive: the attacker borrows the size of the pool, bends a price or a share calculation, and repays inside one transaction.",
      "A useful audit names the invariant that broke, the call that yielded control, and the order of updates that should have held. Sample patches matter less than a test that fails if the order changes again.",
      "Protocol teams that treat the audit as a last gate keep rediscovering the same bugs. Teams that put the invariant in CI stop shipping the regression.",
    ],
  },
  {
    id: "sast-vs-dast",
    category: "AppSec",
    date: "13 Nov 2024",
    title: "SAST and DAST answer different questions",
    teaser:
      "Source analysis shows what the code can do. A running test shows what the deployed application will allow.",
    href: ROUTES.platform.sast,
    paragraphs: [
      "Static analysis reads the code and the dependency graph before anything is deployed. It is the right place to catch dangerous sinks, insecure defaults and secrets that should never have been committed. It cannot see a misconfigured gateway, a forgotten admin route, or a header the runtime adds.",
      "Dynamic testing hits the running application. It proves whether a flaw is reachable with the authentication, routing and configuration you actually shipped. It will miss a branch that no request exercised.",
      "Pick both, and give each a job. SAST on the change. DAST on the environment you are about to trust. Neither replaces a test of the business rules.",
    ],
  },
  {
    id: "black-white-box",
    category: "Testing",
    date: "18 Oct 2024",
    title: "Black-box, grey-box and white-box are scopes, not slogans",
    teaser:
      "The difference is how much of the system the tester is allowed to see before the first request.",
    href: ROUTES.services.vapt,
    paragraphs: [
      "Black-box starts from the outside: a URL, an app binary, or a network range, and the same knowledge an outsider can gather. It is honest about exposure. It is slow on deep paths that need an account.",
      "Grey-box adds credentials, roles and a short walkthrough so the tester spends time on privileged paths instead of on the login form. White-box adds source, architecture and sometimes a debugger. Findings get more precise, and the test can name the line that has to change.",
      "Tell the tester which of the three you bought. A black-box report that reads like a code review, or a white-box report with no source citation, is the wrong engagement.",
    ],
  },
  {
    id: "api-security",
    category: "API",
    date: "02 Oct 2024",
    title: "API testing starts with the inventory you do not have",
    teaser:
      "The dangerous endpoint is usually the one the gateway diagram forgot: an old version, a partner route, a debug method.",
    href: ROUTES.platform.apiSecurity,
    paragraphs: [
      "Most API programmes test the collection in the portal. Attackers test the collection on the wire. Old versions, internal hosts that became public, and methods that were never in the spec are where object-level access control fails.",
      "A serious test begins by enumerating hosts, versions and object types, then tries to read or change an object that belongs to someone else. Authentication bugs matter, but broken authorisation on a valid token is the finding that shows up in real incidents.",
      "Keep the inventory after the test. A point-in-time report goes stale the week a new service ships.",
    ],
  },
] as const;

export const mediaStories = [
  {
    kicker: "Accreditation",
    date: "6 January 2026",
    title: "CREST accredits Entersoft for penetration testing",
    body: "CREST recognised Entersoft’s penetration testing practice, placing the company among a network of more than 500 accredited organisations. The accreditation sits alongside CERT-In empanelment in India and is the public check a buyer can verify without taking the firm’s word for it.",
    source: "CREST",
    href: "https://www.crest-approved.org/entersoft-secures-crest-accreditation-strengthening-its-commitment-to-global-cybersecurity-standards/",
  },
  {
    kicker: "Ecosystem",
    date: "24 November 2025",
    title: "Digital-asset security for Abu Dhabi’s startup ecosystem",
    body: "Entersoft was engaged to support selected startups in Abu Dhabi’s technology ecosystem, with the work centred on digital-asset security, smart-contract audits and penetration testing for companies that are still forming their first security programme.",
    source: "Public announcement",
    href: ROUTES.services.smartContract,
  },
  {
    kicker: "Recognition",
    date: "On record",
    title: "Application security, noted at the ELETS BFSI Tech Innovation Awards",
    body: "Entersoft’s application-security practice has been publicly recognised for treating security as part of how software is built, not as a scan added at the end. The awards page on the previous site recorded that recognition alongside the firm’s fintech work.",
    source: "Awards",
    href: ROUTES.company.accreditations,
  },
] as const;

export const faqGroups = [
  {
    title: "The work",
    items: [
      {
        q: "What is application security?",
        a: "It is the set of practices that put a secure development lifecycle in front of product, testing and IT teams: find the issues, fix them, and stop the same class from shipping again. The aim is fewer vulnerabilities in the application, not a larger pile of scanner tickets.",
      },
      {
        q: "What breaks in blockchain systems?",
        a: "The public list is familiar: weak endpoints around wallets and nodes, routing and phishing against operators, and leakage of transaction privacy. The incidents that cost money are usually closer to the contract: a broken invariant, a price the protocol trusts, or an admin key with too much reach.",
      },
      {
        q: "Why does cloud security matter this much?",
        a: "Teams lose data through threats they have not named yet, credentials that were never rotated, a cloud model they only half adopted, and storage that was left open. Posture is the habit of noticing those four before an outsider does.",
      },
      {
        q: "What kinds of security testing are there?",
        a: "Black-box, grey-box and white-box. They differ by how much of the system the tester can see. The same three apply to web applications, mobile applications and networks. The scope should say which one you are buying.",
      },
      {
        q: "What is the difference between automated and manual testing?",
        a: "A person uses judgement to follow business rules, roles and odd state. A tool repeats a framework of checks quickly and consistently. Entersoft uses both. The tool covers the known catalogue. The tester covers the paths the catalogue does not name.",
      },
      {
        q: "Which standards do you test against?",
        a: "OWASP Top 10 for web, mobile and API work, WASC for web applications, and the SANS Top 25 where the engagement is about implementation bugs. The report maps findings back to the standard you asked for, instead of inventing a private scoring system.",
      },
    ],
  },
  {
    title: "The engagement",
    items: [
      {
        q: "Do you issue a certificate?",
        a: "Yes, when the engagement asks for one and the retest supports it. A certificate describes what was tested and when. It is not a promise that later code changes stayed safe.",
      },
      {
        q: "Why bring in Entersoft?",
        a: "The practice is built around application security and an offensive way of reading a system. Clients keep the running record in Entersoft’s own portal, and the same team can cover web, mobile, API, cloud and adjacent platforms without splitting the evidence across vendors.",
      },
      {
        q: "How often should we test?",
        a: "It depends on how often the product changes and how regulated the industry is. For most teams the useful rhythm is once a quarter, with a shorter check after a major release.",
      },
      {
        q: "What does an external team see that an internal one does not?",
        a: "Distance. An outside tester is not attached to the roadmap that shipped the feature, and has usually seen the same flaw in other industries. Your internal team still owns the fix. The external report is there to widen what they look at.",
      },
      {
        q: "Are you allowed to perform these assessments?",
        a: "Entersoft is ISO 27001 certified, CREST accredited for penetration testing, and a CERT-In empanelled auditing organisation. The people who test are certified practitioners. Ask for the current certificates rather than a logo on a slide.",
      },
      {
        q: "Which tools show up in a test?",
        a: "The bench usually includes Burp Suite, SQLMap, Nikto, dirb, Nmap, Postman for APIs, and SSL checkers such as testssl and SSLScan. Tools change with the target. The finding is never “the tool said so” without a request that reproduces it.",
      },
      {
        q: "How long does a test take?",
        a: "It follows the size of the target: roles, pages, API operations, and how much walkthrough the team needs. A single application with a handful of roles is not the same job as a network plus three apps.",
      },
      {
        q: "Will you find every vulnerability?",
        a: "No honest test claims that. What we do provide is evidence for what was found and for the important cases that were attempted and did not reproduce. The assurance is about the work performed, not about a future with no bugs.",
      },
    ],
  },
  {
    title: "After the test",
    items: [
      {
        q: "What if you find nothing?",
        a: "You still get the test cases and the proof that they were run. An empty findings list without that record is not a result. It is a missing report.",
      },
      {
        q: "What do you need from us to start?",
        a: "A pre-engagement questionnaire for web, API, mobile or network, plus a walkthrough. Scope is agreed after that conversation, not from a guess at a URL.",
      },
      {
        q: "What happens once testing ends?",
        a: "You receive the findings and the cases behind them, with sample fixes where they help the development team. After patches land, a validation test checks the closures. When the retest is clean, the engagement can close with a certificate.",
      },
      {
        q: "How is scope decided?",
        a: "From the questionnaire and a walkthrough of the application. That is where roles, environments and out-of-scope systems get written down before anyone sends a payload.",
      },
      {
        q: "Should you test production or a lower environment?",
        a: "Production shows the real target, and automated checks can add junk data, open tickets or slow a page a customer is using. A non-production environment avoids that, and it can include code that is not released yet. A dedicated instance with a realistic data set is often the better place for a deep test. The choice is a balance between fidelity and blast radius.",
      },
      {
        q: "Do you guarantee the application stays secure?",
        a: "Only for the window and the build named in the engagement. The next release can add a new flaw, and new vulnerability classes appear whether or not your code changed. Security that matters is retested on a rhythm.",
      },
      {
        q: "Can you test the payment methods in our application?",
        a: "We test how your application implements the payment flow. We do not test the payment gateway itself. The boundary is written into the scope so nobody expects a card-scheme assessment from an application test.",
      },
    ],
  },
] as const;

export const eventSteps = [
  {
    n: "01",
    title: "Register",
    body: "Hold a seat and block the time. The room stays small on purpose.",
  },
  {
    n: "02",
    title: "Bring the real problem",
    body: "Come with the control, the finding, or the architecture decision that is actually stuck.",
  },
  {
    n: "03",
    title: "Work it in the session",
    body: "The point of the hour is to leave with a direction, not with a recording to watch later.",
  },
  {
    n: "04",
    title: "Take the notes",
    body: "You keep the assessment notes and, where a scan was part of the session, the report that follows.",
  },
  {
    n: "05",
    title: "Continue one to one",
    body: "If the hour is not enough, we book a follow-up with the same practitioners.",
  },
] as const;

export const webinarSessions = [
  {
    day: "24",
    month: "February",
    year: "2022",
    title: "Why missing MFA on IAM accounts is how the real hacks start",
    body: "An earlier session covered identity hygiene. This one stayed on the failure mode we keep seeing: an IAM account without multi-factor authentication, and the other basic controls that were never turned on.",
  },
  {
    day: "07",
    month: "September",
    year: "2021",
    title: "Securing the cloud environment through IAM",
    body: "Cloud adoption and remote work left a lot of roles over-privileged. The session was for the people who grant access: know what the organisation is trying to do, then give the role that matches it.",
  },
  {
    day: "22",
    month: "July",
    year: "2021",
    title: "What accelerates when the workload moves",
    body: "Public cloud risk does not stay with the new cloud-native services. Applications moving from on-premises carry their old assumptions with them. The session was about protecting both.",
  },
] as const;
