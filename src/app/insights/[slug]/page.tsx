import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronRight, Clock3 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { blogCategoryLabels } from "@/lib/content/blog";
import { ArticleBody } from "@/components/article-body";
import { Reveal } from "@/components/ui/reveal";
import { formatDate, escapeJsonLd } from "@/lib/utils";
import { site } from "@/lib/content/site";

export const dynamic = "force-dynamic";

type Params = { params: { slug: string } };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post) return { title: "Article not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/insights/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt.toISOString(),
      tags: post.tags.split(",").map((t) => t.trim()),
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const post = await prisma.blogPost.findUnique({ where: { slug: params.slug } });
  if (!post || !post.published) notFound();

  const related = await prisma.blogPost.findMany({
    where: { published: true, id: { not: post.id }, category: post.category },
    take: 3,
    orderBy: { publishedAt: "desc" },
  });
  const relatedList = related.length
    ? related
    : await prisma.blogPost.findMany({
        where: { published: true, id: { not: post.id } },
        take: 3,
        orderBy: { publishedAt: "desc" },
      });

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: `${site.url}/insights/${post.slug}`,
    timeRequired: `PT${post.readMinutes}M`,
  };

  return (
    <article className="pb-8">
      {/* Hero */}
      <header className="relative overflow-hidden pt-32 md:pt-40" aria-labelledby="article-title">
        <div className="absolute inset-0 grid-backdrop" aria-hidden />
        <div className="glow-orb glow-orb-blue left-1/4 top-0 h-72 w-96" aria-hidden />
        <div className="relative mx-auto max-w-3xl px-4 md:px-6 lg:px-8">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-2">
              <Link href="/" className="hover:text-accent">Home</Link>
              <ChevronRight className="h-3 w-3" />
              <Link href="/insights" className="hover:text-accent">Insights</Link>
              <ChevronRight className="h-3 w-3" />
              <span className="text-ink">{blogCategoryLabels[post.category]}</span>
            </nav>
            <Link href="/insights" className="inline-flex items-center gap-2 text-xs text-ink-2 transition-colors hover:text-accent">
              <ArrowLeft className="h-3.5 w-3.5" /> All articles
            </Link>
            <div className="mt-6">
              <span className="rounded-full border border-line bg-card/70 px-3.5 py-1.5 text-xs font-medium text-accent2">
                {blogCategoryLabels[post.category]}
              </span>
              <h1 id="article-title" className="mt-5 font-display text-3xl font-semibold leading-tight md:text-[2.6rem] md:leading-tight">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-ink-2">
                <span>By {site.name} · Engineering Team</span>
                <span>{formatDate(post.publishedAt)}</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4 text-accent2" /> {post.readMinutes} min read
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </header>

      {/* Body */}
      <div className="mx-auto max-w-3xl px-4 py-14 md:px-6">
        <Reveal>
          <p className="mb-8 border-l-2 border-accent/50 pl-5 text-[16.5px] italic leading-relaxed text-ink">
            {post.excerpt}
          </p>
        </Reveal>
        <ArticleBody content={post.content} />

        <div className="mt-12 flex flex-wrap gap-2">
          {post.tags.split(",").map((tag) => (
            <span key={tag} className="rounded-full border border-line bg-card/60 px-3 py-1.5 text-xs text-ink-2">
              #{tag.trim()}
            </span>
          ))}
        </div>
      </div>

      {/* Related */}
      <section className="border-t border-line bg-bg-2/40 py-16" aria-label="Related articles">
        <div className="mx-auto max-w-5xl px-4 md:px-6 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold">Keep reading</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {relatedList.map((p) => (
                <Link
                  key={p.id}
                  href={`/insights/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-line bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accent2">
                    {blogCategoryLabels[p.category]}
                  </span>
                  <h3 className="mt-2 font-display text-base font-semibold leading-snug transition-colors group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-ink-2 line-clamp-2">{p.excerpt}</p>
                  <span className="mt-3 text-xs text-ink-2">{p.readMinutes} min read</span>
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: escapeJsonLd(articleJsonLd) }} />
    </article>
  );
}
