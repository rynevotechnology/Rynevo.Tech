import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogIndex, type PostListing } from "@/components/blog-index";
import { CtaSection } from "@/components/layout/cta-section";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Engineering essays and practical guides from Rynevo Technologys: AI that works, web performance, SaaS architecture, automation and digital transformation.",
  alternates: { canonical: "/insights" },
};

export const dynamic = "force-dynamic";

export default async function InsightsPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: [{ isFeatured: "desc" }, { publishedAt: "desc" }],
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      excerpt: true,
      readMinutes: true,
      tags: true,
      isFeatured: true,
      publishedAt: true,
    },
  });

  const listings: PostListing[] = posts.map((p) => ({
    ...p,
    publishedAt: p.publishedAt.toISOString(),
  }));

  return (
    <>
      <section className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="insights-hero">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-cyan right-1/4 top-0 h-72 w-72" aria-hidden />
        <div className="relative mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-card/70 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-accent2">
              Insights
            </span>
            <h1 id="insights-hero" className="font-display text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl">
              Field-tested writing on <span className="gradient-text">software & AI.</span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-2 md:text-lg">
              No trend-chasing listicles — the patterns, frameworks, and honest assessments we use in
              client work, written by our engineers.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
          <BlogIndex posts={listings} />
        </div>
      </section>

      <CtaSection
        headline="Have a question this writing didn't answer?"
        subline="Ask it directly — project questions get real answers from senior engineers, not a sales queue."
      />
    </>
  );
}
