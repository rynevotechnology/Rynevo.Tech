/**
 * Portfolio projects & case studies — real Rynevo builds.
 *
 * Content policy: only real projects are listed here. Case-study numbers use
 * verified, structural facts (feature counts, timelines, capabilities) rather
 * than invented performance metrics. Delicate client details may be generalised.
 */

export type CaseStudyBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] };

export type Project = {
  slug: string;
  title: string;
  category: "Web Development" | "Mobile Applications" | "AI & ML" | "SaaS Products" | "UI/UX Design" | "Enterprise Software";
  industry: string;
  summary: string;
  stack: string[];
  isDemo: boolean;
  caseStudy: {
    projectType: string;
    duration: string;
    challenge: string[];
    solution: string[];
    keyFeatures: string[];
    results: { metric: string; label: string; note: string }[];
    process: string;
  };
};

export const projects: Project[] = [
  {
    slug: "ai-study-assistant",
    title: "AI Study Assistant",
    category: "AI & ML",
    industry: "Education & E-Learning",
    summary:
      "A companion app for students that turns uploaded notes, PDFs, and syllabi into structured study plans, flashcards, and self-quiz sessions — with every answer grounded in the student's own material.",
    stack: ["Next.js", "TypeScript", "Python", "OpenAI", "LangChain", "PostgreSQL", "Tailwind CSS"],
    isDemo: false,
    caseStudy: {
      projectType: "Rynevo AI product build",
      duration: "10 weeks",
      challenge: [
        "Students study from scattered material — lecture notes, screenshots of slides, downloaded PDFs — without any structure connecting them.",
        "Generic chat assistants answer study questions with confidence even when they're inventing content, which is exactly the wrong behaviour for exam preparation.",
      ],
      solution: [
        "We built the assistant as a retrieval-augmented system: study answers are composed only from the student's uploaded material, with citations shown so sources are always traceable.",
        "On top of the grounding layer we added structure-producing features — a syllabus-to-study-plan generator, flashcards, and self-grading quizzes with explanations — turning the raw notes into an actual study workflow.",
      ],
      keyFeatures: [
        "Document upload (PDFs, notes, slides) with per-subject organisation",
        "Syllabus parser that generates a dated study plan",
        "Auto-generated flashcards with spaced-repetition ordering",
        "Quiz mode with explanations and progress scoring",
        "Doubt-answering restricted to uploaded sources, with citation display",
      ],
      results: [
        { metric: "4", label: "study modes shipped", note: "Plan · Flashcards · Quiz · Q&A" },
        { metric: "RAG", label: "grounded answers with citations", note: "Answers restricted to uploaded material" },
        { metric: "10wk", label: "from kickoff to launch-ready build", note: "Delivery timeline" },
      ],
      process:
        "We began by mapping how students actually work through a semester — plan, revise, self-test, ask doubts — and set a hard retrieval-quality bar before any generation feature was added. The prototype was evaluated against real study material with weekly review rounds; grounding failures were treated as bugs, not edge cases.",
    },
  },
  {
    slug: "nilkanth-farshan-website",
    title: "Nilkanth Farshan — Snacks Brand Website",
    category: "Web Development",
    industry: "Food & Beverage / Retail",
    summary:
      "Product showcase website for an Indian snacks brand: a complete online catalogue with a low-friction order flow, designed so a small team can keep prices and products up to date themselves.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "WhatsApp Business", "Email API"],
    isDemo: false,
    caseStudy: {
      projectType: "Client website build",
      duration: "6 weeks",
      challenge: [
        "The brand existed only on social media and word of mouth — there was no central place where customers could see the full product range, packaging sizes, or prices.",
        "Order requests were arriving as unstructured chat messages, making them easy to lose and hard to follow up.",
      ],
      solution: [
        "We designed and built a catalogue-first website: every product gets its own page with photos, ingredients, packaging sizes, and pricing, organised by snack category.",
        "Ordering was kept deliberately low-friction — a two-step flow that hands a filled product list to WhatsApp — plus proper enquiry forms for distributors and bulk orders, so business enquiries stopped disappearing into DMs.",
      ],
      keyFeatures: [
        "Mobile-first product catalogue organised by snack category",
        "Per-product pages with packaging sizes and pricing",
        "Two-step order flow with WhatsApp handoff",
        "Distributor and bulk-order enquiry forms with email routing",
        "Easy content updates so the team can manage prices and products",
      ],
      results: [
        { metric: "1", label: "central catalogue replacing scattered DMs", note: "Single source for products & prices" },
        { metric: "2-step", label: "order flow with WhatsApp handoff", note: "Designed for small-team fulfilment" },
        { metric: "6wk", label: "brief to launch", note: "Delivery timeline" },
      ],
      process:
        "Photography and catalogue structure came first — the site was organised around the real product line, not a template. The order flow was validated with the owner's actual WhatsApp fulfilment habit, then iterate-tested with real customers during a soft launch week.",
    },
  },
  {
    slug: "mini-voice-assistant",
    title: "Mini Voice Assistant",
    category: "AI & ML",
    industry: "Consumer Technology",
    summary:
      "A lightweight voice assistant prototype: wake-word activation, speech-to-text, an intent router, and spoken responses — designed around a small footprint and an offline-capable core.",
    stack: ["Python", "Whisper", "SpeechRecognition", "pyttsx3 TTS", "SQLite"],
    isDemo: false,
    caseStudy: {
      projectType: "Rynevo product engineering — prototype to v1",
      duration: "5 weeks",
      challenge: [
        "Mainstream voice assistants are heavyweight and cloud-bound — constantly listening, sending audio to remote services, and tied to a vendor's ecosystem.",
        "The goal was the opposite: a small, local, always-available assistant that handles a focused set of everyday commands reliably rather than pretending to do everything.",
      ],
      solution: [
        "We built a staged pipeline — wake-word detection, WAV capture, speech-to-text, intent routing, and text-to-speech — where every stage is a replaceable module.",
        "The intent set is deliberately practical: reminders and to-dos stored in local SQLite, simple lookups, and system-level quick actions, each with short spoken confirmations. The core loop runs locally with no cloud dependency.",
      ],
      keyFeatures: [
        "Wake-word activation instead of always-on capture",
        "Speech-to-text with offline fallback for the core command set",
        "Intent router covering a focused everyday command set",
        "Local storage of reminders and preferences",
        "Spoken responses with low-latency TTS",
      ],
      results: [
        { metric: "10+", label: "supported voice commands", note: "Focused, reliable intent set" },
        { metric: "Offline", label: "core pipeline runs without internet", note: "Wake word → command loop" },
        { metric: "v1", label: "prototype evolved toward daily-driver use", note: "Retrieval and cloud options kept modular" },
      ],
      process:
        "Hardware access patterns (microphone permissions, sample rates) were validated in week one. Each pipeline stage was benchmarked separately before integration, and the intent set grew only after the previous command was reliable — the discipline that keeps voice products from feeling broken.",
    },
  },
];

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export const portfolioCategories = [
  "All",
  "Web Development",
  "Mobile Applications",
  "AI & ML",
  "SaaS Products",
  "UI/UX Design",
  "Enterprise Software",
] as const;
