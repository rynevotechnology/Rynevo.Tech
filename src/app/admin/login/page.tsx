"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/logo";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(result.error || "Login failed.");
        setLoading(false);
        return;
      }
      // `next` arrives as a query param from the middleware redirect; read it
      // off window.location instead of useSearchParams() so the page can be
      // statically prerendered without a Suspense bailout.
      const next = new URLSearchParams(window.location.search).get("next") || "/admin";
      router.replace(next.startsWith("/") ? next : "/admin");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-svh items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 grid-backdrop" aria-hidden />
      <div className="glow-orb glow-orb-blue left-1/3 top-1/4 h-80 w-80" aria-hidden />
      <div className="glow-orb glow-orb-cyan right-1/4 bottom-0 h-60 w-60" aria-hidden />

      <div className="relative w-full max-w-sm">
        <div className="glass rounded-3xl p-8 shadow-2xl shadow-black/20">
          <div className="flex justify-center"><Logo /></div>
          <div className="mt-8">
            <h1 className="text-center font-display text-xl font-semibold">Admin sign in</h1>
            <p className="mt-1.5 text-center text-xs text-ink-2">
              Authorized personnel only. Sessions expire after 8 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                id="admin-email"
                name="email"
                type="email"
                required
                autoComplete="username"
                placeholder="admin@rynevotechnologys.com"
                className="w-full rounded-xl border border-line bg-bg-2/60 px-4 py-3 text-sm text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none"
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium">Password</label>
              <input
                id="admin-password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full rounded-xl border border-line bg-bg-2/60 px-4 py-3 text-sm text-ink focus:border-accent focus:outline-none"
              />
            </div>

            {error && (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-2.5 text-xs text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-[#6E7BFF] disabled:opacity-60"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-ink-2">
            <ShieldCheck className="h-3.5 w-3.5 text-accent2" />
            Rate-limited · bcrypt-hashed · signed session cookies
          </p>
        </div>
        <p className="mt-6 text-center text-xs text-ink-2">
          <a href="/" className="hover:text-accent">← Back to website</a>
        </p>
      </div>
    </div>
  );
}
