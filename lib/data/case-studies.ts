export interface CaseStudySectionData {
  key: string;
  title: string;
  body: string;
}

export interface CaseStudyData {
  id: string;
  slug: string;
  title: string;
  client: string;
  industry: string;
  category: string;
  summary: string;
  coverImage: string;
  heroImage: string;
  duration: string;
  team: string;
  role: string;
  technologies: string[];
  metrics: { label: string; value: string }[];
  sections: CaseStudySectionData[];
}

export const DEFAULT_CASE_STUDIES: CaseStudyData[] = [
  {
    id: "cs1",
    slug: "ashford-logistics-pipeline-attribution",
    title: "Unifying pipeline attribution across 14 regional marketing teams",
    client: "Ashford Logistics Group",
    industry: "Freight & Supply Chain",
    category: "Pipeline Intelligence",
    summary:
      "Ashford's 14 regional marketing teams ran on 14 different spreadsheets. Meridian gave them one attribution model the whole company could trust.",
    coverImage: "/images/case-studies/ashford-cover.svg",
    heroImage: "/images/case-studies/ashford-hero.svg",
    duration: "5 months",
    team: "6 Meridian implementation specialists, 3 Ashford stakeholders",
    role: "Platform implementation, data migration, attribution model design",
    technologies: ["Salesforce", "Snowflake", "Google Ads", "LinkedIn Ads"],
    metrics: [
      { label: "Pipeline visibility", value: "100%" },
      { label: "Reporting time saved", value: "31 hrs/mo" },
      { label: "Attribution accuracy", value: "+64%" },
      { label: "Regional teams unified", value: "14" },
    ],
    sections: [
      {
        key: "OVERVIEW",
        title: "Overview",
        body: "Ashford Logistics Group operates 14 semi-autonomous regional marketing teams across North America, each running its own campaigns, budgets, and — critically — its own spreadsheet-based attribution model. Corporate marketing leadership had no reliable way to compare regional performance or defend total marketing spend to the board. Meridian was brought in to replace all 14 models with one governed, company-wide standard.",
      },
      {
        key: "PROBLEM",
        title: "The Problem",
        body: "Each region attributed pipeline differently: some used last-touch, others first-touch, one region simply divided credit evenly across every campaign a contact had ever touched. When corporate tried to roll these numbers up for a quarterly board review, the totals didn't reconcile with Salesforce's own pipeline figures by nearly 40%. Marketing's credibility with the executive team was eroding quarter over quarter.",
      },
      {
        key: "RESEARCH",
        title: "Research",
        body: "Our implementation team spent three weeks auditing all 14 regional models, interviewing regional marketing directors, and reconciling every model's logic against actual Salesforce opportunity data. We found that no single existing model — first-touch, last-touch, or linear — matched Ashford's actual multi-region, multi-touch buying journeys, which routinely spanned 6 to 11 touchpoints across 90+ days.",
      },
      {
        key: "DISCOVERY",
        title: "Discovery",
        body: "Workshops with regional stakeholders surfaced a shared, unstated requirement: regions wanted credit preserved for early-funnel brand campaigns, not just the last email that triggered a demo request. This ruled out simple last-touch models and pointed toward a time-decay, multi-touch model weighted toward moments of genuine engagement rather than raw click volume.",
      },
      {
        key: "COMPETITIVE_ANALYSIS",
        title: "Competitive Analysis",
        body: "Ashford had evaluated two other attribution vendors previously. Both required a rip-and-replace of the regional teams' existing ad tooling, which stalled adoption for over a year. Meridian's non-destructive, read-layer integration model — sitting alongside existing tools rather than replacing them — was the deciding factor in vendor selection.",
      },
      {
        key: "GOALS",
        title: "Goals",
        body: "Three measurable goals were set at kickoff: (1) a single attribution model adopted by all 14 regions within two quarters, (2) monthly reconciliation variance versus Salesforce under 5%, and (3) a 50% reduction in the manual hours regional analysts spent building spreadsheet reports.",
      },
      {
        key: "WIREFRAMES",
        title: "Wireframes",
        body: "Low-fidelity wireframes for the unified regional dashboard were sketched collaboratively with three pilot regions, focused on a single 'campaign to closed-won' waterfall view that every region — regardless of size or channel mix — could read the same way at a glance.",
      },
      {
        key: "USER_FLOW",
        title: "User Flow",
        body: "The final flow let a regional director land on their own scoped dashboard by default, drill into any campaign to see full touchpoint-level detail, and roll up seamlessly into the corporate view without needing separate logins or exported spreadsheets — solving the exact hand-off problem that caused the original reconciliation gap.",
      },
      {
        key: "VISUAL_DESIGN",
        title: "Visual Design",
        body: "Dashboards were designed around a restrained, high-contrast style intentionally different from Ashford's cluttered legacy BI tool — large single-number KPIs at the top of every view, with detail progressively disclosed rather than front-loaded, reducing the cognitive load on non-technical regional stakeholders.",
      },
      {
        key: "DESIGN_SYSTEM",
        title: "Design System",
        body: "We extended Meridian's core design system with an Ashford-specific theme (their brand navy as the primary accent) while keeping every interaction pattern — filters, date ranges, export actions — identical to the standard platform, minimizing training overhead for a 40-person rollout.",
      },
      {
        key: "DEVELOPMENT",
        title: "Development",
        body: "The attribution engine was implemented as a nightly batch reconciliation job against Ashford's Snowflake warehouse, with an incremental streaming layer for same-day campaign performance. Historical data going back 3 years was backfilled and re-attributed under the new model for like-for-like year-over-year comparison.",
      },
      {
        key: "ARCHITECTURE",
        title: "Architecture",
        body: "Data flows from Google Ads, LinkedIn Ads, and 11 regional ad accounts into a staging layer, is deduplicated against Salesforce contact and account IDs, and is scored using a configurable time-decay weighting function before landing in the reporting layer that powers every regional and corporate dashboard.",
      },
      {
        key: "PERFORMANCE",
        title: "Performance",
        body: "The reconciliation job processes roughly 2.1 million touchpoint events per month across all 14 regions in under 11 minutes, with dashboard queries returning in under 400ms at the p95 percentile thanks to pre-aggregated rollup tables refreshed on each batch run.",
      },
      {
        key: "ACCESSIBILITY",
        title: "Accessibility",
        body: "All dashboard components meet WCAG 2.1 AA contrast requirements, are fully keyboard-navigable, and every chart ships with an accessible data-table fallback view for screen reader users on the regional analyst team who rely on assistive technology.",
      },
      {
        key: "SEO",
        title: "SEO",
        body: "Not applicable to this internal reporting engagement — the attribution platform is authenticated and not publicly indexed. Documentation for the rollout was published internally on Ashford's intranet with structured, searchable headings for the regional support team.",
      },
      {
        key: "TESTING",
        title: "Testing",
        body: "Every region's historical numbers were shadow-run against the new model for six full weeks before cutover, with discrepancies above 2% flagged for manual review by both Meridian's data team and the regional analyst. This shadow period was the single biggest driver of stakeholder trust ahead of go-live.",
      },
      {
        key: "DEPLOYMENT",
        title: "Deployment",
        body: "Regions were migrated in three waves of roughly five regions each, two weeks apart, rather than a single cutover — allowing the implementation team to resolve data-quality issues discovered in wave one before they affected the remaining nine regions.",
      },
      {
        key: "RESULTS",
        title: "Results",
        body: "Within two quarters, all 14 regions were reporting from the same attribution model. Reconciliation variance against Salesforce dropped from 40% to under 3%. Regional analysts collectively reclaimed roughly 31 hours per month previously spent building manual spreadsheet reports, redirected into campaign strategy work.",
      },
      {
        key: "LESSONS_LEARNED",
        title: "Lessons Learned",
        body: "The biggest lesson was organizational, not technical: giving regional teams a voice in the attribution model's design — rather than mandating a corporate standard top-down — was what actually drove adoption. The wave-based rollout, born from necessity, became the template we now recommend for any multi-region deployment.",
      },
    ],
  },
  {
    id: "cs2",
    slug: "nordwind-health-abm-command-center",
    title: "From spreadsheet chaos to a single ABM command center",
    client: "Nordwind Health Systems",
    industry: "Healthcare Technology",
    category: "Account Orchestration",
    summary:
      "Nordwind's enterprise sales motion depended on coordinated account plays that were being planned in shared spreadsheets and Slack threads. Meridian gave them an orchestration canvas their whole GTM team could run from.",
    coverImage: "/images/case-studies/nordwind-cover.svg",
    heroImage: "/images/case-studies/nordwind-hero.svg",
    duration: "4 months",
    team: "5 Meridian specialists, 4 Nordwind GTM stakeholders",
    role: "ABM strategy, platform configuration, sales enablement",
    technologies: ["HubSpot", "Marketo", "Outreach", "Meridian Orchestration"],
    metrics: [
      { label: "Planning meetings per week", value: "3 → 1" },
      { label: "Concurrent account plays", value: "12 → 47" },
      { label: "Sales-accepted opportunities", value: "+58%" },
      { label: "Time to launch a play", value: "9 days → 36 hrs" },
    ],
    sections: [
      {
        key: "OVERVIEW",
        title: "Overview",
        body: "Nordwind Health Systems sells clinical software to hospital networks — a long, multi-stakeholder sales cycle that depends on tightly coordinated marketing and sales plays per target account. Before Meridian, those plays lived in a shared spreadsheet, a Trello board, and a dozen ad-hoc Slack threads, with no single view of which account was in which stage of which play.",
      },
      {
        key: "PROBLEM",
        title: "The Problem",
        body: "Sales reps routinely discovered that marketing had already emailed a target account's CFO the same week the rep was trying to schedule a first meeting — sequencing collisions that were damaging relationships in a small, reputation-sensitive healthcare buyer market. Marketing had no reliable way to see which accounts sales had already engaged.",
      },
      {
        key: "RESEARCH",
        title: "Research",
        body: "Interviews with 11 account executives and 4 marketing managers revealed the coordination gap wasn't a communication problem — it was a tooling gap. Every team had tried adding more Slack channels and more recurring meetings; none of it scaled past roughly 15 concurrently active account plays.",
      },
      {
        key: "DISCOVERY",
        title: "Discovery",
        body: "The clearest signal from discovery: reps didn't want another dashboard to check — they wanted play status pushed to where they already worked, primarily their CRM and Outreach sequences. This shaped Meridian's integration priority list from day one.",
      },
      {
        key: "COMPETITIVE_ANALYSIS",
        title: "Competitive Analysis",
        body: "Nordwind had piloted a standalone ABM point-tool the prior year. It offered account scoring but no actual orchestration — teams still had to manually coordinate execution elsewhere, which meant the coordination problem was never actually solved, only measured.",
      },
      {
        key: "GOALS",
        title: "Goals",
        body: "The engagement targeted three outcomes: zero sequencing collisions between marketing and sales on any tracked account, the ability to run 40+ concurrent account plays without adding headcount, and a single canvas visible to both teams for real-time play status.",
      },
      {
        key: "WIREFRAMES",
        title: "Wireframes",
        body: "Early wireframes modeled the orchestration canvas as a kanban-style board with accounts as cards moving through play stages, but usability testing with actual account executives showed this hid too much detail — the final design used a timeline view instead, showing every touchpoint across time per account.",
      },
      {
        key: "USER_FLOW",
        title: "User Flow",
        body: "A marketer builds a play once — a sequence of ad, email, and sales-task steps — and applies it to any account tier. Sales reps see relevant plays surface directly inside their existing CRM account view, with a single 'pause outreach' control if a rep needs to hold marketing back during active deal conversations.",
      },
      {
        key: "VISUAL_DESIGN",
        title: "Visual Design",
        body: "The orchestration canvas uses color exclusively to communicate play stage (not team ownership), reinforcing that marketing and sales are viewing one shared timeline rather than two separate systems bolted together.",
      },
      {
        key: "DESIGN_SYSTEM",
        title: "Design System",
        body: "Nordwind's rollout reused Meridian's core component library with no custom theming, a deliberate choice from their VP of Marketing Ops to minimize the sense of 'yet another new tool' for a sales team already fatigued by point-solution proliferation.",
      },
      {
        key: "DEVELOPMENT",
        title: "Development",
        body: "The 'pause outreach' control required a real-time webhook integration with Outreach.io, halting any in-flight sequence step within 60 seconds of a rep's request — a tight latency requirement given how reputation-sensitive premature outreach is in healthcare sales.",
      },
      {
        key: "ARCHITECTURE",
        title: "Architecture",
        body: "Account state is held in a single source-of-truth service that both the marketing orchestration layer and the CRM sync layer read from, eliminating the two-system inconsistency that caused the original sequencing collisions.",
      },
      {
        key: "PERFORMANCE",
        title: "Performance",
        body: "The orchestration canvas supports real-time updates across all 47 concurrent account plays with sub-second UI refresh, using optimistic updates on the client with server reconciliation to avoid perceived lag for users actively managing a play.",
      },
      {
        key: "ACCESSIBILITY",
        title: "Accessibility",
        body: "Given the mixed-ability GTM team, the canvas ships with a full list-view alternative to the timeline visualization, ensuring every interaction available via mouse drag is equally available via keyboard and screen reader.",
      },
      {
        key: "SEO",
        title: "SEO",
        body: "Not applicable — this is an internal, authenticated GTM tool. Nordwind's public-facing site was out of scope for this engagement.",
      },
      {
        key: "TESTING",
        title: "Testing",
        body: "Nordwind ran a 6-week pilot with 3 account executives and 2 marketers before wider rollout, using that period specifically to stress-test the pause-outreach latency requirement under real sequencing conditions rather than synthetic load.",
      },
      {
        key: "DEPLOYMENT",
        title: "Deployment",
        body: "Full GTM team rollout followed the successful pilot, with a two-week enablement period pairing every account executive with a marketing counterpart to co-build their first live play on the new canvas.",
      },
      {
        key: "RESULTS",
        title: "Results",
        body: "Concurrent account plays grew from 12 to 47 without additional headcount. Sequencing collisions dropped to zero in the 90 days post-launch. Sales-accepted opportunities from marketing-sourced accounts rose 58%, and the weekly cross-team planning meeting was reduced from three sessions to one.",
      },
      {
        key: "LESSONS_LEARNED",
        title: "Lessons Learned",
        body: "The 'pause outreach' control — a relatively small feature — turned out to be the single highest-leverage trust-builder for sales adoption. Teams evaluating ABM orchestration tools should prioritize real-time sales control over marketing automation, not the reverse.",
      },
    ],
  },
  {
    id: "cs3",
    slug: "vantage-capital-boardroom-attribution",
    title: "Proving marketing's contribution to a $40M pipeline",
    client: "Vantage Capital Partners",
    industry: "Financial Services",
    category: "Revenue Reporting",
    summary:
      "Vantage's marketing team was funding a growing share of the deal pipeline but had no defensible way to prove it. Meridian's revenue reporting layer changed the budget conversation entirely.",
    coverImage: "/images/case-studies/vantage-cover.svg",
    heroImage: "/images/case-studies/vantage-hero.svg",
    duration: "3 months",
    team: "4 Meridian specialists, 2 Vantage finance & marketing stakeholders",
    role: "Revenue reporting architecture, board dashboard design",
    technologies: ["Salesforce", "NetSuite", "Meridian Reporting"],
    metrics: [
      { label: "Marketing-sourced pipeline proven", value: "$40M" },
      { label: "Budget approved next cycle", value: "+22%" },
      { label: "Board reporting prep time", value: "3 days → 2 hrs" },
      { label: "Metrics disputed by finance", value: "12 → 0" },
    ],
    sections: [
      {
        key: "OVERVIEW",
        title: "Overview",
        body: "Vantage Capital Partners' marketing team had scaled its budget 3x over two years on the strength of anecdotal wins, but every quarterly board meeting turned into a dispute between marketing and finance over whose numbers were correct. Meridian was engaged to build a reporting layer both teams would actually trust.",
      },
      {
        key: "PROBLEM",
        title: "The Problem",
        body: "Marketing counted a deal as 'sourced' the moment any tracked touchpoint appeared in a contact's history. Finance, reconciling against NetSuite booked revenue, routinely found deals marketing claimed credit for that had, in finance's view, originated from an existing account relationship with no real marketing influence.",
      },
      {
        key: "RESEARCH",
        title: "Research",
        body: "We conducted a joint audit with finance and marketing across 40 closed deals from the prior two quarters, tracing each one's actual touchpoint history against booking records to establish, empirically, where the two teams' definitions of 'marketing-sourced' actually diverged.",
      },
      {
        key: "DISCOVERY",
        title: "Discovery",
        body: "The audit revealed the dispute wasn't really about attribution methodology — it was about deal recency and account tenure. Finance wanted any account with a prior closed deal excluded from 'new pipeline sourced' claims. This became a formal, board-approved rule embedded directly into the reporting logic.",
      },
      {
        key: "COMPETITIVE_ANALYSIS",
        title: "Competitive Analysis",
        body: "Vantage's existing BI tool (a generic dashboarding product layered over Salesforce exports) had no concept of marketing-specific attribution rules and required a data analyst to manually rebuild the board deck each quarter — a single point of failure that made the report itself part of the trust problem.",
      },
      {
        key: "GOALS",
        title: "Goals",
        body: "Success criteria: a board-ready revenue dashboard finance would sign off on without dispute, board deck preparation time under 4 hours per quarter, and a documented, jointly-owned definition of 'marketing-sourced pipeline' that would not need re-litigating each quarter.",
      },
      {
        key: "WIREFRAMES",
        title: "Wireframes",
        body: "Wireframes were reviewed jointly by Vantage's CMO and CFO before any development began — an unusual but deliberate step to ensure finance had design input, not just final sign-off, on a tool meant to end an interdepartmental dispute.",
      },
      {
        key: "USER_FLOW",
        title: "User Flow",
        body: "The board dashboard opens on a single reconciled number — total marketing-influenced pipeline, net of the account-tenure exclusion rule — with a drill-down path into methodology documentation available inline, so any board member questioning a number could self-serve the explanation.",
      },
      {
        key: "VISUAL_DESIGN",
        title: "Visual Design",
        body: "Design intentionally avoided marketing's usual vibrant chart palette in favor of a restrained, financial-report aesthetic — muted blues and grays — reinforcing to the board that this was a finance-grade number, not a marketing self-assessment.",
      },
      {
        key: "DESIGN_SYSTEM",
        title: "Design System",
        body: "A dedicated 'boardroom' theme was added to Meridian's reporting module, now offered as a standard configuration option to any customer needing finance-facing rather than marketing-facing dashboard styling.",
      },
      {
        key: "DEVELOPMENT",
        title: "Development",
        body: "The account-tenure exclusion rule was implemented as a configurable, auditable filter in the attribution pipeline — every excluded deal remains queryable with a stated reason, so the rule's effect is fully transparent rather than a silent adjustment.",
      },
      {
        key: "ARCHITECTURE",
        title: "Architecture",
        body: "Nightly reconciliation jobs join Salesforce opportunity data with NetSuite booked-revenue records, applying the jointly-approved attribution rules before the board dashboard's single source-of-truth table is refreshed each morning.",
      },
      {
        key: "PERFORMANCE",
        title: "Performance",
        body: "The reconciliation pipeline processes the full multi-year deal history in under 4 minutes nightly, with the board dashboard itself loading in under a second thanks to pre-computed quarterly rollups.",
      },
      {
        key: "ACCESSIBILITY",
        title: "Accessibility",
        body: "Given board members occasionally review the dashboard on shared conference-room displays, all typography and chart contrast ratios were tested at a distance and against ambient lighting conditions, not just against WCAG's on-screen minimums.",
      },
      {
        key: "SEO",
        title: "SEO",
        body: "Not applicable — an internal, authenticated finance and board reporting tool.",
      },
      {
        key: "TESTING",
        title: "Testing",
        body: "The reconciled numbers were run in parallel with finance's manual quarterly close process for one full quarter before the board relied on the dashboard exclusively, giving both teams a real audit trail to compare against.",
      },
      {
        key: "DEPLOYMENT",
        title: "Deployment",
        body: "The dashboard launched quietly one full quarter ahead of its first live board presentation, giving the CMO and CFO time to jointly rehearse the new reporting narrative before presenting it externally.",
      },
      {
        key: "RESULTS",
        title: "Results",
        body: "The board accepted $40M in marketing-sourced pipeline without dispute for the first time in company history. Marketing's budget was subsequently approved for a 22% increase the following cycle. Board deck preparation time dropped from roughly three days of analyst work to under two hours.",
      },
      {
        key: "LESSONS_LEARNED",
        title: "Lessons Learned",
        body: "Involving finance in the design phase — not just as a final approver — was the single decision that made the resulting numbers trusted rather than merely accurate. Attribution disputes are as often organizational as they are technical.",
      },
    ],
  },
  {
    id: "cs4",
    slug: "circuitry-robotics-scaling-abm",
    title: "Scaling account-based campaigns without scaling headcount",
    client: "Circuitry Robotics",
    industry: "Industrial Robotics",
    category: "Workflow Automation",
    summary:
      "Circuitry's five-person growth marketing team needed to run enterprise-scale ABM. Meridian's automation layer let them do it without a single new hire.",
    coverImage: "/images/case-studies/circuitry-cover.svg",
    heroImage: "/images/case-studies/circuitry-hero.svg",
    duration: "4 months",
    team: "4 Meridian specialists, 2 Circuitry marketers",
    role: "Automation architecture, campaign migration, team enablement",
    technologies: ["Marketo", "Salesforce", "Meridian Workflows", "Slack"],
    metrics: [
      { label: "Concurrent campaigns", value: "12 → 40" },
      { label: "Team headcount added", value: "0" },
      { label: "Campaign launch time", value: "-71%" },
      { label: "Manual routing errors", value: "-94%" },
    ],
    sections: [
      {
        key: "OVERVIEW",
        title: "Overview",
        body: "Circuitry Robotics' five-person growth marketing team supported a rapidly expanding enterprise sales motion, but every new target account required a nearly-manual campaign build — copying a prior campaign, manually adjusting lead routing rules, and manually notifying the right account executive.",
      },
      {
        key: "PROBLEM",
        title: "The Problem",
        body: "The team was capped at roughly 12 concurrently running account campaigns purely by manual capacity, even though sales leadership had identified over 60 target accounts worth pursuing. Every attempt to hire additional campaign managers was rejected in budget planning in favor of sales headcount.",
      },
      {
        key: "RESEARCH",
        title: "Research",
        body: "Time-tracking across two weeks showed campaign managers spent nearly 60% of their time on repetitive configuration tasks — routing rules, list segmentation, and Slack notifications — rather than strategy or creative work, the actual differentiated value of their role.",
      },
      {
        key: "DISCOVERY",
        title: "Discovery",
        body: "The team didn't need more sophisticated targeting — their existing segmentation logic was already sound. They needed the mechanical configuration steps automated so the same strategic template could be reapplied to new accounts in minutes rather than days.",
      },
      {
        key: "COMPETITIVE_ANALYSIS",
        title: "Competitive Analysis",
        body: "Circuitry evaluated hiring a marketing operations contractor as an alternative to new tooling; the cost analysis showed automation tooling paid for itself within the first quarter versus even a part-time contractor hire, with no ongoing headcount risk.",
      },
      {
        key: "GOALS",
        title: "Goals",
        body: "Targets: triple concurrent campaign capacity without new hires, cut campaign launch time by at least half, and eliminate manual lead-routing errors that had previously caused two significant missed follow-ups on high-value accounts.",
      },
      {
        key: "WIREFRAMES",
        title: "Wireframes",
        body: "The workflow builder was wireframed around a 'clone and parameterize' pattern — rather than building automation from a blank canvas, marketers would clone a proven campaign template and adjust only the account-specific parameters.",
      },
      {
        key: "USER_FLOW",
        title: "User Flow",
        body: "A marketer selects a target account, chooses a campaign template, and the workflow engine automatically generates account-specific segmentation, routing rules, and a Slack notification to the assigned account executive — a process that previously took a day, now taking minutes.",
      },
      {
        key: "VISUAL_DESIGN",
        title: "Visual Design",
        body: "The workflow canvas uses a visual, node-based editor so non-technical marketers could inspect and adjust automation logic without needing to understand the underlying rule syntax — a deliberate trade-off favoring approachability over raw configurability.",
      },
      {
        key: "DESIGN_SYSTEM",
        title: "Design System",
        body: "Workflow nodes reused Meridian's core card and badge components with status-specific coloring (draft, active, paused), keeping the automation builder visually consistent with the rest of the platform rather than feeling like a bolted-on tool.",
      },
      {
        key: "DEVELOPMENT",
        title: "Development",
        body: "Templates are stored as versioned, parameterized workflow definitions; cloning a template for a new account is a metadata operation, not a data-copy operation, which kept campaign creation fast even as the template library grew past 30 variants.",
      },
      {
        key: "ARCHITECTURE",
        title: "Architecture",
        body: "The workflow engine runs as an event-driven service reacting to CRM stage changes and marketing engagement events, triggering the appropriate next workflow step and routing action without requiring a marketer to manually monitor account status.",
      },
      {
        key: "PERFORMANCE",
        title: "Performance",
        body: "The engine processes account state changes and triggers routing actions within an average of 8 seconds end-to-end, fast enough that sales reps reported the Slack notifications felt 'instant' relative to the actual account event.",
      },
      {
        key: "ACCESSIBILITY",
        title: "Accessibility",
        body: "The node-based workflow editor ships with a linear, list-based accessible view for keyboard and screen-reader users, since graph-based canvases are notoriously difficult to navigate non-visually.",
      },
      {
        key: "SEO",
        title: "SEO",
        body: "Not applicable — an internal marketing operations tool with no public-facing surface.",
      },
      {
        key: "TESTING",
        title: "Testing",
        body: "Templates were piloted on 5 real target accounts for three weeks, with every automated routing decision shadow-reviewed by a human marketer before the team trusted the engine to run unsupervised.",
      },
      {
        key: "DEPLOYMENT",
        title: "Deployment",
        body: "Rollout was gradual — one new template type added every two weeks — allowing the team to build trust and institutional knowledge in the automation layer rather than migrating their entire campaign playbook at once.",
      },
      {
        key: "RESULTS",
        title: "Results",
        body: "Circuitry scaled from 12 to 40 concurrent account campaigns with the same five-person team. Campaign launch time dropped 71%, and manual lead-routing errors fell 94%, directly resolving the missed-follow-up problem that had motivated the project.",
      },
      {
        key: "LESSONS_LEARNED",
        title: "Lessons Learned",
        body: "Automating the mechanical 60% of the job freed the team to spend far more time on the creative and strategic 40% — the actual differentiator sales leadership valued. The lesson generalizes: automation ROI is highest when it targets time, not headcount, as the constraint.",
      },
    ],
  },
];
