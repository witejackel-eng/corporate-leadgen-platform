export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  publishedAt: string;
  author: { name: string; role: string; avatar: string };
}

const authorEvelyn = { name: "Evelyn Marsh", role: "Head of Content, Meridian", avatar: "/images/blog/author-evelyn.svg" };
const authorTomas = { name: "Tomas Reindl", role: "Director of Revenue Research, Meridian", avatar: "/images/blog/author-tomas.svg" };

export const DEFAULT_BLOG_POSTS: BlogPostData[] = [
  {
    id: "bp1",
    slug: "multi-touch-attribution-breaks-at-enterprise-scale",
    title: "Why Multi-Touch Attribution Models Break at Enterprise Scale",
    excerpt:
      "The attribution model that worked for your Series B startup will quietly lie to you once you're running 40 concurrent campaigns across 14 regions.",
    category: "Attribution",
    tags: ["Attribution", "Enterprise Marketing", "Data"],
    featured: true,
    readingTime: 7,
    publishedAt: "2026-05-04",
    author: authorTomas,
    coverImage: "/images/blog/attribution-scale.svg",
    content: `
      <p>Most marketing teams adopt an attribution model once, early, and never revisit the decision. A simple last-touch or linear model is easy to explain in a board deck when you're running six campaigns a quarter. The trouble starts when you're running sixty.</p>
      <h2>The hidden assumption in every simple model</h2>
      <p>Last-touch and linear models both assume every touchpoint is created equal, or that the most recent one matters most. That assumption holds reasonably well when your buying journey is short and your campaign count is low. At enterprise scale — multiple regions, dozens of concurrent account plays, buying committees with 6 to 12 stakeholders — the assumption collapses.</p>
      <p>We've seen this pattern repeatedly with customers who outgrew their first attribution model: reconciliation variance against actual CRM pipeline creeps upward, quarter over quarter, until someone in finance finally asks the uncomfortable question — "why don't these numbers match?"</p>
      <h2>What actually breaks first</h2>
      <p>It's rarely the model's math. It's governance. Once more than one team is capable of editing campaign tracking parameters, attribution logic starts drifting regionally, the same failure mode we documented in our <a href="/case-studies/ashford-logistics-pipeline-attribution">Ashford Logistics case study</a>. Fourteen regions, fourteen slightly different interpretations of "first touch," and a board deck that didn't reconcile.</p>
      <h2>The fix isn't a fancier model</h2>
      <p>Time-decay and data-driven attribution models help, but the real fix is governance: one attribution model, centrally owned, with regional visibility but not regional editing rights. Every enterprise team we've helped migrate off a broken model made this organizational change before — or alongside — any technical one.</p>
    `,
  },
  {
    id: "bp2",
    slug: "abm-maturity-curve",
    title: "The ABM Maturity Curve: From Target Lists to Orchestrated Plays",
    excerpt:
      "Most teams think they're doing account-based marketing because they built a target account list. Here's the four-stage curve that separates a spreadsheet from a real ABM motion.",
    category: "ABM",
    tags: ["ABM", "Strategy", "Orchestration"],
    featured: true,
    readingTime: 6,
    publishedAt: "2026-04-18",
    author: authorEvelyn,
    coverImage: "/images/blog/abm-maturity.svg",
    content: `
      <p>Ask ten B2B marketing teams if they "do ABM" and nine will say yes. Ask what that means in practice, and you'll get answers ranging from "we have a spreadsheet of 200 target accounts" to "we run fully orchestrated, cross-channel plays with real-time sales handoffs." Those are wildly different maturity levels, and most teams don't know where they actually sit.</p>
      <h2>Stage 1: The target list</h2>
      <p>A list of accounts, usually built once a year, rarely revisited. No coordinated campaign activity beyond "make sure these accounts are in our general nurture." This is where most teams start, and where far too many stay for years.</p>
      <h2>Stage 2: Segmented campaigns</h2>
      <p>Target accounts get their own campaign variants — different ad creative, maybe a dedicated landing page. Still largely a marketing-only motion with limited sales visibility into what's happening per account.</p>
      <h2>Stage 3: Coordinated plays</h2>
      <p>Marketing and sales agree on sequencing: ads run, then email, then a sales outreach cadence, timed deliberately. This is where most "mature" ABM programs plateau — coordinated, but still manually managed, which caps how many accounts a team can run concurrently.</p>
      <h2>Stage 4: Orchestrated plays</h2>
      <p>Plays are templated, automated, and visible to both teams in real time, with the ability for sales to intervene (pause outreach, escalate a play) without filing a ticket. This is the stage our <a href="/case-studies/nordwind-health-abm-command-center">Nordwind Health Systems</a> team reached — and it's the only stage where account volume stops being capped by manual coordination capacity.</p>
    `,
  },
  {
    id: "bp3",
    slug: "revenue-dashboard-the-c-suite-trusts",
    title: "How to Build a Revenue Dashboard the C-Suite Actually Trusts",
    excerpt:
      "A dashboard's numbers being correct and a dashboard being trusted are two different engineering problems. Most teams only solve the first one.",
    category: "Revenue Reporting",
    tags: ["Reporting", "Leadership", "Finance"],
    featured: false,
    readingTime: 8,
    publishedAt: "2026-03-22",
    author: authorTomas,
    coverImage: "/images/blog/csuite-dashboard.svg",
    content: `
      <p>We've built revenue dashboards for dozens of enterprise marketing teams, and the pattern is consistent: the dashboards that actually get used in board meetings are rarely the ones with the most sophisticated modeling. They're the ones finance signed off on before launch.</p>
      <h2>Correctness is necessary but not sufficient</h2>
      <p>You can build a mathematically defensible attribution model and still have your CFO dispute every number in the room, if finance was never consulted on the underlying definitions. In our work with <a href="/case-studies/vantage-capital-boardroom-attribution">Vantage Capital Partners</a>, the actual unlock wasn't a modeling change — it was involving the CFO in wireframe review before a single line of the dashboard was built.</p>
      <h2>Design for the most skeptical reader</h2>
      <p>Boardroom dashboards should be designed assuming the reader is actively looking for a reason to distrust the number, because in a finance-marketing dispute, that's often literally true. Provide drill-down documentation inline. Show your methodology, don't hide it behind a tooltip nobody clicks.</p>
      <h2>One number, not ten</h2>
      <p>Every dashboard we've seen succeed in front of a board leads with a single, unambiguous top-line number. Save the nuance for the drill-down. A board doesn't have the patience to reconcile five competing metrics in the room.</p>
    `,
  },
  {
    id: "bp4",
    slug: "composable-martech-stack-2026",
    title: "Marketing Ops in 2026: The Rise of the Composable Martech Stack",
    excerpt:
      "The all-in-one marketing suite is losing ground to smaller, interoperable tools stitched together with real data contracts. Here's what that means for your stack.",
    category: "Marketing Operations",
    tags: ["MarTech", "Operations", "Trends"],
    featured: false,
    readingTime: 6,
    publishedAt: "2026-02-11",
    author: authorEvelyn,
    coverImage: "/images/blog/composable-martech.svg",
    content: `
      <p>For most of the last decade, the dominant enterprise marketing strategy was consolidation: buy the biggest suite you can afford, and force every team into its workflow. That era is ending, and the data increasingly backs a different approach.</p>
      <h2>Why the all-in-one model is losing</h2>
      <p>Suites optimize for breadth, not depth. A team that needs best-in-class attribution and best-in-class ABM orchestration will find both exist as mediocre bolt-ons inside most all-in-one platforms, forcing a trade-off no growing enterprise team should have to make.</p>
      <h2>Composability requires real data contracts</h2>
      <p>The teams succeeding with a composable stack aren't just buying more point solutions — they're demanding real, documented data contracts between them. Our <a href="/case-studies/circuitry-robotics-scaling-abm">Circuitry Robotics</a> engagement succeeded specifically because the automation layer had first-class, bi-directional sync with their existing Marketo and Salesforce instances, rather than requiring a migration.</p>
      <h2>What to actually evaluate</h2>
      <p>When evaluating a new tool in a composable stack, ask about its integration model before its feature list. A best-in-class capability that can't cleanly exchange data with the rest of your stack recreates the exact silo problem consolidation was meant to solve.</p>
    `,
  },
  {
    id: "bp5",
    slug: "lead-scoring-is-dead-predictive-propensity",
    title: "Lead Scoring Is Dead. Long Live Predictive Propensity Models.",
    excerpt:
      "Static point-based lead scoring was a reasonable idea in 2010. In 2026, it's actively costing your team pipeline. Here's what's replacing it.",
    category: "Predictive Analytics",
    tags: ["Lead Scoring", "Machine Learning", "Sales Alignment"],
    featured: true,
    readingTime: 5,
    publishedAt: "2026-01-27",
    author: authorTomas,
    coverImage: "/images/blog/predictive-scoring.svg",
    content: `
      <p>Traditional lead scoring assigns fixed point values to actions — 10 points for a pricing page visit, 5 for a whitepaper download — summed into a threshold that triggers a sales handoff. It's simple, explainable, and, at this point, largely obsolete.</p>
      <h2>The problem with fixed point values</h2>
      <p>A pricing page visit means something different from a first-time visitor than from a contact who's been nurtured for six months. Fixed-point models can't express that distinction, so they systematically over-score early-stage curiosity and under-score genuine late-stage intent.</p>
      <h2>What propensity models do differently</h2>
      <p>Rather than fixed points, a propensity model trained on your own closed-deal history learns which specific behavioral patterns actually preceded a closed-won outcome for your business — not a generic industry benchmark. It gets sharper with every deal your team closes or loses.</p>
      <h2>The trust problem, and how to solve it</h2>
      <p>Sales teams are — correctly — skeptical of black-box scores. The models that get adopted are the ones that show their work: which specific signals drove a given score, in plain language, not just a number. That transparency is the actual adoption unlock, more than any accuracy improvement.</p>
    `,
  },
  {
    id: "bp6",
    slug: "hidden-cost-of-six-point-solutions",
    title: "The Hidden Cost of Six Point Solutions: A Martech Consolidation Case Study",
    excerpt:
      "It's rarely the licensing fees that make a fragmented stack expensive. It's everything else. A breakdown of where the real cost hides.",
    category: "Marketing Operations",
    tags: ["MarTech", "Finance", "Case Study"],
    featured: false,
    readingTime: 7,
    publishedAt: "2025-12-09",
    author: authorEvelyn,
    coverImage: "/images/blog/consolidation-cost.svg",
    content: `
      <p>When Meritage Financial's CFO asked their marketing team to justify six separate point-solution contracts, the initial answer focused entirely on license fees. The real cost turned out to be almost four times larger, once every category was counted.</p>
      <h2>Integration maintenance is a hidden headcount cost</h2>
      <p>Six tools meant six sets of API integrations, each requiring ongoing maintenance whenever a vendor shipped a breaking change. Meritage's marketing ops team was spending roughly a third of its capacity just keeping existing integrations functional — work that produced zero new capability.</p>
      <h2>Reconciliation time is a real, if invisible, line item</h2>
      <p>Because no two tools shared a single data model, someone had to manually reconcile numbers between them before every reporting cycle. That reconciliation time rarely appears on a budget spreadsheet, but it was consuming roughly 15 analyst-hours per month.</p>
      <h2>The actual savings after consolidation</h2>
      <p>After consolidating onto a single platform, Meritage's CFO reported a 38% reduction in total martech-related spend — not from license fees alone, but from eliminated integration maintenance, reclaimed analyst hours, and the removal of two contractor engagements that existed solely to keep the fragmented stack running.</p>
    `,
  },
];

export const BLOG_CATEGORIES = Array.from(new Set(DEFAULT_BLOG_POSTS.map((p) => p.category)));
export const BLOG_TAGS = Array.from(new Set(DEFAULT_BLOG_POSTS.flatMap((p) => p.tags)));
