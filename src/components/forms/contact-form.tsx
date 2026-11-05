"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { services } from "@/lib/content/services";
import { cn } from "@/lib/utils";

const budgets = ["< $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000 – $150,000", "Not sure yet"];

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full rounded-xl border border-line bg-bg-2/60 px-4 py-3 text-sm text-ink placeholder:text-ink-2/60 focus:border-accent focus:outline-none";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [startedAt] = useState(() => Date.now()); // anti-bot timing anchor

  const toggleService = (slug: string) =>
    setSelectedServices((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      company: String(data.get("company") || "").trim(),
      services: selectedServices,
      budget: String(data.get("budget") || ""),
      message: String(data.get("message") || "").trim(),
      // Sender identity + "website" must stay unmodified — bot traps (honeypot)
      website: String(data.get("website") || ""),
      profileUrl: String(data.get("profileUrl") || ""),
      formStartedAt: Number(data.get("formStartedAt") || 0),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(result.error || "Something went wrong. Please try again, or email us directly.");
        return;
      }
      setStatus("success");
      form.reset();
      setSelectedServices([]);
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-accent/40 bg-accent/5 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-accent2" />
        <h3 className="font-display text-xl font-semibold">Thank you — message received.</h3>
        <p className="max-w-md text-sm leading-relaxed text-ink-2">
          Your inquiry has been logged and our team will review it. You can expect a reply within one
          business day.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent hover:text-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="relative flex flex-col gap-5">
      {/* Honeypot traps: hidden from humans, populated by bots */}
      <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <input type="text" name="profileUrl" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {/* Submission timing (seconds since mount) — bots submitting instantly get rejected */}
      <input type="number" name="formStartedAt" className="hidden" tabIndex={-1} aria-hidden="true" value={startedAt} readOnly />

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium">Full name *</label>
          <input id="name" name="name" type="text" required minLength={2} placeholder="Jane Doe" className={inputCls} autoComplete="name" />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Work email *</label>
          <input id="email" name="email" type="email" required placeholder="jane@company.com" className={inputCls} autoComplete="email" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">Phone</label>
          <input id="phone" name="phone" type="tel" placeholder="+1 555 000 1234" className={inputCls} autoComplete="tel" />
        </div>
        <div>
          <label htmlFor="company" className="mb-1.5 block text-sm font-medium">Company</label>
          <input id="company" name="company" type="text" placeholder="Company Ltd." className={inputCls} autoComplete="organization" />
        </div>
      </div>

      <fieldset>
        <legend className="mb-2 block text-sm font-medium">Services you&apos;re interested in</legend>
        <div className="flex flex-wrap gap-2">
          {services.map((s) => (
            <button
              key={s.slug}
              type="button"
              aria-pressed={selectedServices.includes(s.slug)}
              onClick={() => toggleService(s.slug)}
              className={cn(
                "rounded-full border px-3.5 py-2 text-xs font-medium transition-all sm:text-[13px]",
                selectedServices.includes(s.slug)
                  ? "border-accent bg-accent/15 text-accent2"
                  : "border-line bg-bg-2/50 text-ink-2 hover:border-accent/50 hover:text-ink"
              )}
            >
              {s.shortTitle}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">Project budget</label>
        <select id="budget" name="budget" className={inputCls} defaultValue="">
          <option value="" disabled>Select a range (optional)</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium">Project description *</label>
        <textarea
          id="message"
          name="message"
          required
          minLength={30}
          rows={5}
          placeholder="Tell us about your goals, the problem you're solving, and any timeline constraints…"
          className={cn(inputCls, "resize-y")}
        />
      </div>

      {status === "error" && (
        <div className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-[15px] font-medium text-white transition-all hover:bg-[#6E7BFF] hover:shadow-[0_0_28px_rgba(88,101,242,0.45)] disabled:opacity-60"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" />
            Send message
          </>
        )}
      </button>

      <p className="text-xs leading-relaxed text-ink-2">
        By submitting this form you agree that we may contact you about your inquiry. We handle your
        data responsibly — no spam, no list-selling.
      </p>
    </form>
  );
}
