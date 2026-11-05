"use client";

import Link from "next/link";
import { ArrowRight, Clock3, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { blogCategoryLabels } from "@/lib/content/blog";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

export type PostListing = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readMinutes: number;
  tags: string;
  isFeatured: boolean;
  publishedAt: string;
};

export function BlogIndex({ posts }: { posts: PostListing[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const categories = useMemo(() => {
    const set = new Set(posts.map((p) => p.category));
    return ["All", ...Array.from(set)];
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (category !== "All" && post.category !== category) return false;
      if (q) {
        const hay = `${post.title} ${post.excerpt} ${post.tags}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [posts, query, category]);

  const featured = filtered.find((p) => p.isFeatured);
  const rest = featured ? filtered.filter((p) => p.id !== featured.id) : filtered;

  const selectCls =
    "rounded-xl border border-line bg-bg-2/60 px-4 py-2.5 text-sm text-ink focus:border-accent focus:outline-none";

  return (
    <div>
      {/* Featured */}
      {featured && (
        <Link
          href={`/insights/${featured.slug}`}
          className="group mb-10 flex flex-col overflow-hidden rounded-3xl border border-accent/30 bg-card/60 transition-all hover:border-accent/60 md:flex-row"
        >
          <div className="relative min-h-44 flex-1 overflow-hidden" aria-hidden>
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(120deg, rgb(var(--c-accent) / 0.5), rgb(var(--c-accent2) / 0.35)), radial-gradient(circle at 80% 20%, rgb(var(--c-accent2) / 0.4), transparent 55%)",
              }}
            />
            <div className="absolute inset-0 grid-backdrop opacity-70" />
            <Sparkles className="absolute right-6 top-6 h-5 w-5 text-white/60" />
          </div>
          <div className="flex flex-1 flex-col p-7 md:p-9">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-accent2/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-accent2">
              Featured
            </span>
            <h2 className="mt-3 font-display text-2xl font-semibold transition-colors group-hover:text-accent md:text-[1.7rem]">
              {featured.title}
            </h2>
            <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-2">{featured.excerpt}</p>
            <div className="mt-5 flex items-center gap-4 text-xs text-ink-2">
              <span>{formatDate(featured.publishedAt)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-accent2" />
                {featured.readMinutes} min read
              </span>
              <span className="inline-flex items-center gap-1.5 font-medium text-accent2">
                Read article
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </Link>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-2" />
          <input
            type="search"
            aria-label="Search articles"
            placeholder="Search articles…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-line bg-bg-2/60 py-2.5 pl-10 pr-4 text-sm text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none"
          />
        </div>
        <select aria-label="Filter by category" className={cn(selectCls, "sm:w-64")} value={category} onChange={(e) => setCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c === "All" ? "All categories" : blogCategoryLabels[c] ?? c}</option>
          ))}
        </select>
      </div>

      {/* Grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <Link
            key={post.id}
            href={`/insights/${post.slug}`}
            className="group flex h-full flex-col rounded-2xl border border-line bg-card/60 p-6 transition-all hover:-translate-y-1 hover:border-accent/40"
          >
            <span className="text-[11px] font-semibold uppercase tracking-wider text-accent2">
              {blogCategoryLabels[post.category] ?? post.category}
            </span>
            <h3 className="mt-2.5 font-display text-lg font-semibold leading-snug transition-colors group-hover:text-accent">
              {post.title}
            </h3>
            <p className="mt-2.5 line-clamp-3 flex-1 text-sm leading-relaxed text-ink-2">{post.excerpt}</p>
            <div className="mt-5 flex items-center justify-between text-xs text-ink-2">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5 text-accent2" /> {post.readMinutes} min
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-sm text-ink-2">
          No articles match your search. Try different keywords or clear the category filter.
        </p>
      )}
    </div>
  );
}
