/** Small shared helpers. */

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function formatDate(date: Date | string, opts: Intl.DateTimeFormatOptions = {}) {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...opts,
  }).format(d);
}

/** Escape user content that ends up inside JSON-LD script tags. */
export function escapeJsonLd(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1).trimEnd() + "…" : str;
}
