/**
 * Global site configuration: metadata, navigation, shared content blocks.
 */

export const site = {
  name: "Rynevo Technologys",
  shortName: "Rynevo",
  tagline: "Engineering the Future of Digital Innovation",
  description:
    "Rynevo Technologys empowers businesses with innovative software, intelligent AI solutions, and exceptional digital experiences designed for growth.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  contact: {
    email: "renevo.technology@gmail.com",
    phone: "7567559933",
    phoneAlt: "7203001006",
    responseTime: "We typically reply within one business day.",
  },
  social: {
    instagram: "https://www.instagram.com/rynevo.tech/",
    github: "https://github.com/rynevotechnology",
  },
};

export type NavLink = {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
};

export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "Website Design & Development", href: "/services/website-design-development", description: "Marketing sites that convert" },
      { label: "Full-Stack Development", href: "/services/full-stack-development", description: "End-to-end product engineering" },
      { label: "Custom Software", href: "/services/custom-software-development", description: "Systems built around your workflow" },
      { label: "Mobile App Development", href: "/services/mobile-app-development", description: "iOS, Android & cross-platform" },
      { label: "AI & Machine Learning", href: "/services/ai-machine-learning", description: "Models that act on your data" },
      { label: "Generative AI Solutions", href: "/services/generative-ai-solutions", description: "LLM copilots & content engines" },
      { label: "AI Chatbot Development", href: "/services/ai-chatbot-development", description: "Assistants that resolve tickets" },
      { label: "Automation Solutions", href: "/services/automation-solutions", description: "Workflows that remove busywork" },
      { label: "ERP & CRM Development", href: "/services/erp-crm-development", description: "One source of operational truth" },
      { label: "SaaS Application Development", href: "/services/saas-development", description: "Multi-tenant platforms to launch" },
      { label: "UI/UX Design", href: "/services/ui-ux-design", description: "Interfaces users enjoy returning to" },
      { label: "E-Commerce Development", href: "/services/e-commerce-development", description: "Storefronts engineered to sell" },
      { label: "Cloud Solutions", href: "/services/cloud-solutions", description: "Scalable, secure cloud architecture" },
      { label: "Digital Marketing", href: "/services/digital-marketing", description: "Campaigns with measured ROI" },
      { label: "SEO Services", href: "/services/seo-services", description: "Compounding organic growth" },
      { label: "IT Consulting", href: "/services/it-consulting", description: "A strategy before a codebase" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Careers", href: "/careers" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

/* ── Shared content blocks ─────────────────────────────────────────────── */

export const coreValues = [
  {
    title: "Craft Over Speed",
    description: "We ship fast, but never at the cost of quality. Every line of code and every pixel is deliberate.",
  },
  {
    title: "Outcomes, Not Output",
    description: "Success is measured in what your business achieves — revenue, retention, efficiency — not in features delivered.",
  },
  {
    title: "Radical Transparency",
    description: "Open roadmaps, honest estimates, and clear communication. You always know exactly where your project stands.",
  },
  {
    title: "Build to Last",
    description: "We architect for scale from day one, so today's MVP becomes tomorrow's platform without a rewrite.",
  },
];

export const whyChooseUs = [
  {
    title: "Innovative Thinking",
    description: "We bring product ideas — proven patterns, fresh approaches, and emerging tech — from across industries into every engagement.",
    icon: "Lightbulb",
  },
  {
    title: "Customer-Focused Development",
    description: "Every decision starts with your users. We map journeys, validate assumptions, and build what your customers actually need.",
    icon: "Users",
  },
  {
    title: "Scalable Architecture",
    description: "Systems designed to grow with you — modular, well-documented, and ready for the load of year five, not just week one.",
    icon: "Network",
  },
  {
    title: "Transparent Communication",
    description: "Weekly demos, shared boards, and direct access to engineers who build your product. No black boxes.",
    icon: "MessageSquare",
  },
  {
    title: "Quality-Driven Delivery",
    description: "Automated testing, code review, and staged releases are standard practice on every project, at every budget level.",
    icon: "ShieldCheck",
  },
  {
    title: "Long-Term Technical Support",
    description: "We stay after launch — monitoring, optimizing, and evolving your product as your business and technology change.",
    icon: "LifeBuoy",
  },
];

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    description: "We listen first. Goal mapping, user research, and technical constraints come together in a shared product brief.",
  },
  {
    step: "02",
    title: "Plan",
    description: "Scope, architecture, and delivery milestones are defined — with realistic budgets and measurable success criteria.",
  },
  {
    step: "03",
    title: "Design",
    description: "Wireframes evolve into polished UI systems. Every screen is pressure-tested against real user journeys.",
  },
  {
    step: "04",
    title: "Develop",
    description: "Two-week sprints with working software at every demo. You see progress continuously, not just at the end.",
  },
  {
    step: "05",
    title: "Test",
    description: "Automated suites, cross-device QA, load testing, and accessibility audits before anything ships.",
  },
  {
    step: "06",
    title: "Deploy",
    description: "Zero-downtime releases with rollback plans, monitoring, and infrastructure-as-code from day one.",
  },
  {
    step: "07",
    title: "Support & Optimize",
    description: "Post-launch analytics, performance tuning, and a support retainer that keeps your product improving.",
  },
];

export const industries = [
  {
    slug: "healthcare",
    title: "Healthcare & Life Sciences",
    icon: "HeartPulse",
    intro: "Digital tools that reduce administrative burden and keep the focus on patient outcomes.",
    useCases: ["Telehealth platforms", "Patient scheduling & reminders", "Clinical workflow automation", "Secure health data dashboards"],
    considerations: "Privacy-first architecture, audit trails, and accessibility compliance from the first commit.",
  },
  {
    slug: "finance",
    title: "Finance & FinTech",
    icon: "Landmark",
    intro: "Reliability and compliance built into every ledger, dashboard, and customer flow.",
    useCases: ["Payment & wallet integrations", "Fraud-detection models", "Financial reporting dashboards", "Loan approval automation"],
    considerations: "End-to-end encryption, role-based access control, and traceable audit logging.",
  },
  {
    slug: "retail-ecommerce",
    title: "Retail & E-Commerce",
    icon: "ShoppingBag",
    intro: "Storefronts, back-office systems, and personalization engines that convert browsers into repeat buyers.",
    useCases: ["Headless commerce builds", "Inventory & fulfillment sync", "AI product recommendations", "Abandoned-cart intelligence"],
    considerations: "Conversion-focused UX, sub-second page loads, and seamless third-party integrations.",
  },
  {
    slug: "manufacturing",
    title: "Manufacturing & Logistics",
    icon: "Factory",
    intro: "From shop-floor to delivery: digitized processes that cut waste and increase throughput.",
    useCases: ["Production planning software", "Live fleet & shipment tracking", "Predictive maintenance", "Automated vendor procurement"],
    considerations: "Offline-capable interfaces, integration with machinery/IoT, and rock-solid reporting.",
  },
  {
    slug: "education",
    title: "Education & E-Learning",
    icon: "GraduationCap",
    intro: "Learning platforms that keep students engaged and administrators informed.",
    useCases: ["LMS & course delivery portals", "AI tutoring assistants", "Admissions workflow automation", "Assessment analytics"],
    considerations: "Intuitive UX for every age group, gamification that serves learning, scalable video delivery.",
  },
  {
    slug: "saas-startups",
    title: "SaaS & Startups",
    icon: "Rocket",
    intro: "From idea to first paying customer to funded platform — with architecture that survives the journey.",
    useCases: ["MVP development", "Multi-tenant platforms", "Usage-based billing systems", "Investor-ready analytics"],
    considerations: "Rapid iteration velocity, reliable multi-tenancy, and clean cost-per-user economics.",
  },
];

export type Testimonial = {
  authorName: string;
  authorRole: string;
  company: string;
  quote: string;
};

/**
 * No testimonials are shipped or seeded — quotes are published only after
 * being collected from real clients with verified permission. Add them via
 * the admin dashboard (Testimonials tab) or this module once available.
 */

export const statsAwardsNote =
  "We intentionally avoid vanity statistics until we have verified numbers. Counters on this site only appear once data is real.";
