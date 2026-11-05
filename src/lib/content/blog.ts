/**
 * Blog / Insights seed content. Stored as markdown-lite blocks:
 * content is a single string where "\n\n" separates blocks, "## " marks
 * headings, and lines starting with "- " become list items.
 */

export type BlogSeedPost = {
  slug: string;
  title: string;
  category: "AI" | "WEB_DEV" | "SOFTWARE_ENGINEERING" | "TECH_TRENDS" | "BUSINESS_AUTOMATION" | "DIGITAL_TRANSFORMATION";
  excerpt: string;
  content: string;
  readMinutes: number;
  tags: string;
  isFeatured?: boolean;
};

export const blogCategoryLabels: Record<string, string> = {
  AI: "Artificial Intelligence",
  WEB_DEV: "Web Development",
  SOFTWARE_ENGINEERING: "Software Engineering",
  TECH_TRENDS: "Technology Trends",
  BUSINESS_AUTOMATION: "Business Automation",
  DIGITAL_TRANSFORMATION: "Digital Transformation",
};

export const seedPosts: BlogSeedPost[] = [
  {
    slug: "practical-guide-ai-hype-vs-value",
    title: "AI: A Practical Guide to Separating Hype from Business Value",
    category: "AI",
    excerpt:
      "Most AI projects fail for unglamorous reasons: unclear success criteria and weak data. Here's the evaluation framework we use before writing a single line of ML code.",
    readMinutes: 7,
    tags: "AI strategy, machine learning, business value",
    isFeatured: true,
    content: `Every week we meet teams who have been briefly enchanted — and briefly burned — by AI pitches. The technology is genuinely transformative in many domains. But the gap between a compelling demo and a valuable production system is where almost every AI project dies, and it's rarely a technology gap.

## Start with the decision, not the model

Strong ML projects begin with a specific, repeated business decision: which accounts should customer success prioritize, which support tickets deserve escalation, how much stock we should reorder. Weak projects begin with "let's use AI on our data" and go hunting for a problem. If you can't name the decision, the baseline it currently uses, and the cost of a wrong answer, the project isn't ready.

## The data audit is the whole ballgame

Before any modelling, ask four quality questions about your data: do you have enough of it, is it labelled or labelable, is it legally clean to use, and does today's process capture it in usable form? In real engagements, we find that two of these four fail — and the honest move is often "your data infrastructure needs three months of work" rather than a model that quietly under-delivers.

- Volume: thousands of examples per class is a common practical floor for classic ML.
- Labels: supervised learning needs ground truth; if no one has labelled your outcomes, someone must.
- Rights: data you technically possess may not be data you're allowed to use for training.
- Freshness: models trained on stale distributions decay in production.

## Prototype against a naive baseline

A model should beat the simplest rule already in use — recency, frequency, or gut instinct — by a margin that matters commercially. We ship prototypes as small scored tools evaluated against that baseline over several weeks. If the lift is marginal, you've saved months of dead engineering. If it's large, the business case writes itself with real numbers attached.

## Production is the actual project

Serving a model through an API is easy. Keeping it valuable is not: users drift, retraining triggers, drift monitoring, latency budgets, and explainability requirements for stakeholders are the real work. Budget roughly as much for the operational lifecycle as for the initial modelling — or assume the model will quietly rot within months.

The teams that get durable value from AI rarely feel like early adopters. They look deliberate.`,
  },
  {
    slug: "core-web-vitals-are-a-business-metric",
    title: "Core Web Vitals Are a Business Metric, Not an SEO Checkbox",
    category: "WEB_DEV",
    excerpt:
      "Page speed is user experience money. We break down how INP, LCP and CLS behave, what actually moves them, and how to treat performance work as a revenue lever.",
    readMinutes: 6,
    tags: "performance, SEO, Next.js, web vitals",
    content: `For years, performance lived in dev retros and SEO audit checklists. That framing undersells it: load times drive conversion, bounce, ad costs, and support volume. A heavy site doesn't just rank lower — it leaks revenue on every pageview.

## What the three vitals actually measure

- LCP (Largest Contentful Paint): when the main content arrives — the user's first impression of speed.
- INP (Interaction to Next Paint): how quickly the page responds when they interact — the handshake moment.
- CLS (Cumulative Layout Shift): whether the page behaves while loading — the stability of trust.

Each maps to a human experience: did it arrive, did it respond, did it behave.

## The dull technical moves that actually work

Most performance gains are unglamorous: image formats and sizing, code splitting, font loading strategy, cache headers, and ruthless third-party script governance. On a recent rebuild, the largest single win was simply controlling how fonts and hero images loaded — not a framework migration.

- Ship images in modern formats at correct sizes, always with dimensions to protect CLS.
- Split and lazy-load JS so interactive speed isn't hostage to initial payload.
- Audit third-party scripts quarterly; marketing tags aggregate into real seconds.
- Prefer server rendering for content-dependent pages so LCP doesn't wait on hydration.

## Make it a budget, not a one-off

Good teams treat performance like a hard constraint: a performance budget that fails the build when violated. That's culturally more powerful than a sprint to fix regressions every six months. Next.js's built-in tooling makes this practical on real projects today.

Fast is a feature users can feel and search engines reward. It deserves a line item in your roadmap.`,
  },
  {
    slug: "when-to-build-vs-buy-software",
    title: "Build vs Buy: A Decision Framework That Won't Lie to You",
    category: "SOFTWARE_ENGINEERING",
    excerpt:
      "Custom software, platform licenses, or internal teams? A candid framework based on the pattern that actually predicts long-term cost and regret.",
    readMinutes: 8,
    tags: "custom software, IT strategy, procurement",
    content: `The build-vs-buy question is expensive to get wrong in either direction. Build what should have been bought, and you own a second-rate system forever. Buy what should have been built, and you pay subscription rent on workarounds for a decade. Here's the decision framework we walk consulting clients through.

## The commodity test

Ask: is this process typical of businesses like ours, or does it encode competitive advantage? Payroll, accounting, email — commodity, buy without guilt. The bespoke process that wins deals or uniquely reduces unit cost — a candidate for building, because nobody's roadmap will ever prioritize your edge.

## The evolution test

- How often does this process change in response to the market?
- Commodity-buy: suited to stable processes that vendors nail over time.
- Build: suited to processes that change weekly — your iteration speed is the advantage.
- Hybrid: buy the platform, build the differentiating modules on top with hooks.

## The cost test (do the honest math)

Licenses quote per-seat prices that scale pleasantly in the demo and brutally at year three. Custom software quotes higher upfront and lowers at steady state. Model five-year total cost honestly: licences, admin overhead, integration glue, workarounds, offboarding costs each scenario implies.

## When to build — the honest triggers

- The process is genuinely differentiated and durable.
- Vendors dominate your budget through seat growth you can't control.
- Required integrations between systems are manual and repeated.
- Compliance requires custom audit trails vendors can't offer.

## The pattern we see go wrong most often

Not choosing badly at the start — but choosing one path and refusing to revisit. The smart pattern is a scheduled review: is the tool still earning its cost? Is the custom system still matching the process? Re-ask these questions openly every couple of years, as the answer legitimately changes.

Bring in an advisor who has no incentive tied to either answer. The fee is cheap compared to either mistake.`,
  },
  {
    slug: "designing-multi-tenant-saas-architecture",
    title: "Designing Multi-Tenant SaaS Architecture Without Regret",
    category: "TECH_TRENDS",
    excerpt:
      "How tenancy isolation, billing state, and usage metering decisions made in month one determine what your SaaS platform can survive in year three.",
    readMinutes: 9,
    tags: "SaaS, architecture, multi-tenancy",
    content: `Most SaaS engineering pain is archaeological — the result of tenancy, billing, and metering decisions made at month one, inherited by year three. These decisions are cheap to redo at the whiteboard and brutal to redo in production. It's worth getting them right before the first customer, not the tenth.

## Tenancy: the decision that shapes everything

Pick a tenancy model based on the isolation your buyers demand, not the one easiest to code:

- Shared schema with a tenant column — simplest, cheapest per tenant, requires in-database row-level security.
- Schema-per-tenant — stronger isolation, more operational surface as counts grow.
- Database-per-tenant — strongest isolation, highest infrastructure cost, justifiable at enterprise price points.

Whichever you choose, write automated isolation tests that simulate a tenant leaking a query. It's the single highest-value test suite we've added to SaaS projects.

## Billing as a state machine, not a Stripe callback viewer

Subscriptions fail quietly: webhooks arrive out of order, retries duplicate effects, upgrades race cancellations. Model billing as an explicit state machine with idempotent transitions so any external mess collapses into a sensible account state. Anything less breaks exactly when revenue matters most.

## Usage metering early, not when pricing tiers arrive

Even if you charge seat-based pricing today, record per-feature usage events now. When usage-based tiers arrive (they almost always do), you'll have historical data to price them with. Retrofitting metering is one of the more expensive archaeology exercises in SaaS.

## The admin console is a product

Support cost dominates SaaS economics. A console that lets your team impersonate (with consent and audit), inspect tenant health, and diagnose billing states turns support from archaeology into diagnosis. Reserve real roadmap space for it — it pays for itself in weeks.

The pattern across all of these: simulate year-three pain at month-one. The rest is disciplined execution.`,
  },
  {
    slug: "automation-first-mindset-operations",
    title: "The Automation-First Mindset: Where to Start in Operations",
    category: "BUSINESS_AUTOMATION",
    excerpt:
      "You don't need an automation platform—you need an inventory. A practical approach to finding and fixing the repetitive work consuming your team's hours.",
    readMinutes: 6,
    tags: "automation, operations, workflow",
    content: `When teams ask "should we automate?", the productive answer is a question back: automate what? Much of the value lies in building the inventory before choosing tools. Here's the simple method we run when engagements start.

## Build the hour inventory

Have each team list everything they do weekly, with time consumed. Batch processes that recur produce the highest-yield list. Within a day you get a factual picture of where hours concentrate — the conversation usually surprises the team that built it.

## Score candidates on three axes

- Frequency × time: how many hours per week does the process consume?
- Error cost: what does a mistake in this process actually cost downstream?
- Stability: does the process change often, or is it consistent rule structure?

High on all three? Automate first. You'll normally find three to five candidates that quietly consume 20+ hours weekly across a team.

## Match the tool to the complexity

- Simple, stable, two-system flows: platform automation (Zapier/Make) — cheap and fast to change.
- Multi-system, high-volume, or compliance-heavy: custom automation services with proper testing and monitoring.
- The classic error we see: over-engineering with custom code what a platform handles in an afternoon, and fatally under-engineering what really sits at the heart of the operation.

## Parallel-run before you trust it

Run automation alongside the manual process for two to four weeks. Reconcile differences. Build the monitoring: retries, failure queues, and a named human on call. Automation earns trust through verification, not optimism.

The cumulative effect of three to five well-chosen automations is often larger — in both hours and morale — than an expensive platform project that never reaches adoption.`,
  },
  {
    slug: "digital-transformation-mvp-small-bets",
    title: "Digital Transformation: Why Small Bets Beat Grand Programs",
    category: "DIGITAL_TRANSFORMATION",
    excerpt:
      "Enterprise transformations fail by trying to change everything at once. The seen-versus-unseen pattern of successful tech adoption in mid-size companies.",
    readMinutes: 7,
    tags: "digital transformation, change management",
    isFeatured: true,
    content: `Ask what failed in big-brand transformation stories, and the pattern repeats: too much scope, too little user reality, too much purchased optimism. The transformations that stick in mid-size organizations share a pattern — small bets, real users, measured wins compounding.

## The grand-program trap

Large programs front-load risk: one architecture to rule all processes, one go-live, one moment where ten learned habits change simultaneously. Adoption deaths happen there. Even successful programs frequently deliver value slower than promised when they finally land.

## The small-bets pattern

- Pick a measurable pain: one report, one approval chain, one reconciliation.
- Ship something usable in weeks: adoption can grow only around usable tools.
- Measure against the baseline you documented — hours, errors, cycle time.
- Expand along the seam: once the tool earns trust in one process, the same core pattern extends naturally.

## Resistance is a design input, not an obstacle

Where staff resist a system, listen carefully. Two different reasons dominate: the tool genuinely adds friction to their task, or the process itself has unspoken edge cases. Both are valuable information. Co-design with the users of the tool — their fingerprints in the features are what adoption actually relies on.

## Technology selection follows process, not the other way

We've seen re-platformed systems replicate all the previous workflows, digitized — a bigger, faster version of what wasn't working. Selected technology should be shaped around the re-engineered process, not vice versa.

## Compounding wins as strategy

Four successful small bets build an institutional capability: teams that have shipped, measured, and adopted modern tooling together. That capability and confidence — not any single system — is the actual asset a transformation programme creates.`,
  },
];

export function getSeedPostBySlug(slug: string) {
  return seedPosts.find((p) => p.slug === slug);
}
