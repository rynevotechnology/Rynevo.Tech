"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Briefcase,
  FileText,
  Inbox,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  Users,
} from "lucide-react";
import { Logo } from "@/components/logo";
import { formatDate } from "@/lib/utils";
import { blogCategoryLabels } from "@/lib/content/blog";
import { jobCategoryLabels } from "@/lib/content/jobs";

type Tab = "inquiries" | "applications" | "jobs" | "posts" | "projects" | "testimonials";
type Item = Record<string, unknown> & { id: string; createdAt?: string };

const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
  { key: "inquiries", label: "Inquiries", icon: <Inbox className="h-4 w-4" /> },
  { key: "applications", label: "Applications", icon: <FileText className="h-4 w-4" /> },
  { key: "jobs", label: "Jobs", icon: <Briefcase className="h-4 w-4" /> },
  { key: "posts", label: "Blog Posts", icon: <Pencil className="h-4 w-4" /> },
  { key: "projects", label: "Portfolio", icon: <Briefcase className="h-4 w-4" /> },
  { key: "testimonials", label: "Testimonials", icon: <Users className="h-4 w-4" /> },
];

const readonlyResources = new Set(["inquiries", "applications"]);
const inquiryStatuses = ["NEW", "IN_PROGRESS", "CLOSED"];
const appStatuses = ["RECEIVED", "REVIEWING", "INTERVIEW", "HIRED", "REJECTED"];

const inputCls =
  "w-full rounded-lg border border-line bg-bg-2/60 px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none";

// Field definitions per editable resource for the create/edit form
const editFields: Record<string, { field: string; label: string; type: "text" | "textarea" | "bool" | "select" | "int"; options?: { value: string; label: string }[] }[]> = {
  jobs: [
    { field: "title", label: "Title", type: "text" },
    { field: "slug", label: "Slug", type: "text" },
    { field: "category", label: "Category", type: "select", options: Object.entries(jobCategoryLabels).map(([value, label]) => ({ value, label })) },
    { field: "jobType", label: "Job type", type: "text" },
    { field: "experience", label: "Experience", type: "text" },
    { field: "location", label: "Location", type: "text" },
    { field: "remote", label: "Remote", type: "bool" },
    { field: "published", label: "Published", type: "bool" },
    { field: "summary", label: "Summary", type: "textarea" },
    { field: "description", label: "Description", type: "textarea" },
    { field: "responsibilities", label: "Responsibilities (bullet lines)", type: "textarea" },
    { field: "requirements", label: "Requirements (bullet lines)", type: "textarea" },
  ],
  posts: [
    { field: "title", label: "Title", type: "text" },
    { field: "slug", label: "Slug", type: "text" },
    { field: "category", label: "Category", type: "select", options: Object.entries(blogCategoryLabels).map(([value, label]) => ({ value, label })) },
    { field: "published", label: "Published", type: "bool" },
    { field: "isFeatured", label: "Featured", type: "bool" },
    { field: "readMinutes", label: "Reading minutes", type: "int" },
    { field: "tags", label: "Tags (comma-sep)", type: "text" },
    { field: "excerpt", label: "Excerpt", type: "textarea" },
    { field: "content", label: "Content (## headings, - lists)", type: "textarea" },
  ],
  projects: [
    { field: "title", label: "Title", type: "text" },
    { field: "slug", label: "Slug", type: "text" },
    { field: "category", label: "Category", type: "text" },
    { field: "industry", label: "Industry", type: "text" },
    { field: "stack", label: "Stack (comma-sep)", type: "text" },
    { field: "isDemo", label: "Demo project", type: "bool" },
    { field: "published", label: "Published", type: "bool" },
    { field: "summary", label: "Summary", type: "textarea" },
  ],
  testimonials: [
    { field: "authorName", label: "Author name", type: "text" },
    { field: "authorRole", label: "Author role", type: "text" },
    { field: "company", label: "Company", type: "text" },
    { field: "quote", label: "Quote", type: "textarea" },
    { field: "isSample", label: "Marked as sample", type: "bool" },
    { field: "published", label: "Published", type: "bool" },
    { field: "order", label: "Display order", type: "int" },
  ],
};

export default function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("inquiries");
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState<Item | null>(null);
  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/${tab}`);
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Failed to load data.");
      } else {
        setItems(result.items || []);
      }
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    load();
    setEditing(null);
    setCreating(false);
  }, [load]);

  async function save(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    const form = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = {};
    const spec = editFields[tab] || [];
    for (const f of spec) {
      const raw = form.get(f.field);
      if (f.type === "bool") payload[f.field] = raw === "on" || raw === "true";
      else if (f.type === "int") payload[f.field] = parseInt(String(raw || "0"), 10) || 0;
      else payload[f.field] = raw;
    }

    try {
      const isEdit = editing && !creating;
      const res = await fetch(isEdit ? `/api/admin/${tab}/${editing!.id}` : `/api/admin/${tab}`, {
        method: isEdit ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.error || "Save failed.");
      } else {
        setEditing(null);
        setCreating(false);
        await load();
      }
    } finally {
      setSaving(false);
    }
  }

  async function patchField(id: string, field: string, value: string) {
    await fetch(`/api/admin/${tab}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: value }),
    });
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this record permanently?")) return;
    await fetch(`/api/admin/${tab}/${id}`, { method: "DELETE" });
    load();
  }

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  function rowLabel(item: Item): { title: string; sub: string } {
    switch (tab) {
      case "inquiries": {
        const status = String(item.status || "NEW");
        return {
          title: `${item.name} — ${item.email}`,
          sub: `${item.services} · ${item.budget ? `Budget: ${item.budget} · ` : ""}${String(item.message).slice(0, 110)}…`,
        };
      }
      case "applications": {
        const status = String(item.status || "RECEIVED");
        return {
          title: `${item.name} — ${item.email}`,
          sub: `Experience: ${item.experienceYears} yrs · Location: ${item.location || "—"} · Resume: ${item.resumeName}`,
        };
      }
      case "jobs": {
        const cat = jobCategoryLabels[String(item.category)] ?? item.category;
        return { title: String(item.title), sub: `${cat} · ${item.location} · ${item.jobType}` };
      }
      case "posts": {
        const cat = blogCategoryLabels[String(item.category)] ?? item.category;
        return { title: String(item.title), sub: `${cat} · ${item.readMinutes} min · ${item.isFeatured ? "Featured" : "Standard"}` };
      }
      case "projects":
        return { title: String(item.title), sub: `${item.category} · ${item.industry}${item.isDemo ? " · Demo" : ""}` };
      case "testimonials":
        return { title: String(item.authorName), sub: `${item.authorRole} · ${item.company}${item.isSample ? " · SAMPLE" : ""}` };
      default:
        return { title: item.id, sub: "" };
    }
  }

  function statusField(): { options: string[] } | null {
    if (tab === "inquiries") return { options: inquiryStatuses };
    if (tab === "applications") return { options: appStatuses };
    return null;
  }

  return (
    <div className="min-h-svh bg-bg">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Logo />
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-ink-2 hover:text-accent">View site</a>
            <button
              type="button"
              onClick={logout}
              className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-ink-2 transition-colors hover:border-red-500/50 hover:text-red-400"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <h1 className="font-display text-2xl font-semibold">Operations dashboard</h1>
        <p className="mt-1 text-sm text-ink-2">Manage inquiries, applications, and site content.</p>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Admin sections">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              onClick={() => setTab(t.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                tab === t.key ? "border-accent bg-accent/15 text-accent2" : "border-line bg-card/50 text-ink-2 hover:text-ink"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={load}
            className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-1.5 text-xs text-ink-2 hover:border-accent hover:text-accent"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
          {!readonlyResources.has(tab) && (
            <button
              type="button"
              onClick={() => { setEditing(null); setCreating(true); }}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-xs font-medium text-white hover:bg-[#6E7BFF]"
            >
              <Plus className="h-3.5 w-3.5" /> New record
            </button>
          )}
        </div>

        {error && (
          <p className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">{error}</p>
        )}

        {/* Editor panel (create / edit) */}
        {(creating || (editing && editFields[tab])) && (
          <form onSubmit={save} className="mt-5 rounded-2xl border border-accent/30 bg-card/60 p-6">
            <h2 className="font-display text-base font-semibold">
              {creating ? `Create new ${tab.slice(0, -1)}` : `Edit record`}
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {(editFields[tab] || []).map((f) => (
                <div key={f.field} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                  <label htmlFor={`f-${f.field}`} className="mb-1 block text-xs font-medium text-ink-2">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea
                      id={`f-${f.field}`}
                      name={f.field}
                      rows={4}
                      defaultValue={creating ? "" : String(editing?.[f.field] ?? "")}
                      className={`${inputCls} resize-y`}
                    />
                  ) : f.type === "bool" ? (
                    <label className="flex items-center gap-2 text-sm">
                      <input
                        id={`f-${f.field}`}
                        type="checkbox"
                        name={f.field}
                        defaultChecked={creating ? false : Boolean(editing?.[f.field])}
                        className="h-4 w-4 accent-[rgb(var(--c-accent))]"
                      />
                      Enabled
                    </label>
                  ) : f.type === "select" ? (
                    <select id={`f-${f.field}`} name={f.field} defaultValue={creating ? undefined : String(editing?.[f.field] ?? "")} className={inputCls}>
                      {f.options?.map((o) => (
                        <option key={o.value} value={o.value}>{o.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={`f-${f.field}`}
                      name={f.field}
                      type={f.type === "int" ? "number" : "text"}
                      defaultValue={creating ? "" : String(editing?.[f.field] ?? "")}
                      className={inputCls}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-medium text-white hover:bg-[#6E7BFF] disabled:opacity-60"
              >
                {saving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                {creating ? "Create" : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => { setEditing(null); setCreating(false); }}
                className="rounded-full border border-line px-5 py-2.5 text-xs font-medium text-ink-2 hover:text-ink"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Records list */}
        <div className="mt-6 space-y-3">
          {loading && (
            <div className="flex items-center gap-3 rounded-2xl border border-line bg-card/50 p-10 text-sm text-ink-2">
              <Loader2 className="h-5 w-5 animate-spin text-accent2" /> Loading records…
            </div>
          )}
          {!loading && items.length === 0 && (
            <div className="rounded-2xl border border-line bg-card/50 p-10 text-center text-sm text-ink-2">
              No records in this section yet.
            </div>
          )}
          {items.map((item) => {
            const { title, sub } = rowLabel(item);
            const status = statusField();
            return (
              <div
                key={item.id}
                className="flex flex-col gap-3 rounded-2xl border border-line bg-card/60 p-5 sm:flex-row sm:items-start sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{title}</p>
                  <p className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-ink-2">{sub}</p>
                  {item.createdAt && (
                    <p className="mt-1.5 text-[11px] text-ink-2/70">Created {formatDate(item.createdAt)}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {status && (
                    <select
                      value={String(item.status)}
                      onChange={(e) => patchField(item.id, "status", e.target.value)}
                      aria-label="Change status"
                      className="rounded-lg border border-line bg-bg-2 px-3 py-1.5 text-xs"
                    >
                      {status.options.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  )}
                  {"published" in item && (
                    <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-line px-3 py-1.5 text-xs text-ink-2">
                      <input
                        type="checkbox"
                        checked={Boolean(item.published)}
                        onChange={(e) => patchField(item.id, "published", e.target.checked ? "true" : "false")}
                        className="h-3.5 w-3.5 accent-[rgb(var(--c-accent))]"
                      />
                      Pub
                    </label>
                  )}
                  {editFields[tab] && (
                    <button
                      type="button"
                      onClick={() => { setCreating(false); setEditing(item); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                      aria-label="Edit record"
                      className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-2 transition-colors hover:border-accent hover:text-accent"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label="Delete record"
                    className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink-2 transition-colors hover:border-red-500/50 hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
