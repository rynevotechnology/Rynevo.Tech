/**
 * Lightweight renderer for the site's markdown-lite article format:
 * "\n\n"-separated blocks; "## " heading; "- " list items; "1. " numbered items.
 */
export function ArticleBody({ content }: { content: string }) {
  const blocks = content.split("\n\n").filter((b) => b.trim());

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        const lines = block.split("\n").filter((l) => l.trim());

        // Heading
        if (lines[0]?.startsWith("## ")) {
          return (
            <h2 key={i} className="pt-4 font-display text-2xl font-semibold">
              {lines[0].slice(3)}
            </h2>
          );
        }

        // List block (bulleted or numbered)
        const isList = lines.length > 0 && lines.every((l) => /^[•-]\s|^\d+\.\s/.test(l.trim()));
        if (isList) {
          const ordered = /^\d+\.\s/.test(lines[0].trim());
          if (ordered) {
            return (
              <ol key={i} className="list-decimal space-y-3 pl-6 text-[15px] leading-relaxed text-ink-2">
                {lines.map((l, j) => (
                  <li key={j}>{l.replace(/^\d+\.\s*/, "")}</li>
                ))}
              </ol>
            );
          }
          return (
            <ul key={i} className="space-y-3">
              {lines.map((l, j) => (
                <li key={j} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent2" />
                  <span>{l.replace(/^-\s*/, "")}</span>
                </li>
              ))}
            </ul>
          );
        }

        // Paragraph (may include "strong:" inline syntax: **bold**)
        return (
          <p key={i} className="text-[15.5px] leading-relaxed text-ink-2">
            {block.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <strong key={j} className="text-ink">{part.slice(2, -2)}</strong>
              ) : (
                part
              )
            )}
          </p>
        );
      })}
    </div>
  );
}
