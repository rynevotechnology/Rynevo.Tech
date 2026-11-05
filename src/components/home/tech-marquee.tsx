import { TechIcon } from "@/components/tech-icon";

const stack = [
  "React", "Next.js", "Python", "Flask", "Node.js", "JavaScript", "TypeScript",
  "PHP", "Laravel", "Flutter", "TensorFlow", "OpenAI", "PostgreSQL", "MongoDB", "AWS",
];

export function TechMarquee() {
  // Duplicate list so the CSS marquee loops seamlessly
  const row = [...stack, ...stack];

  return (
    <section className="relative border-y border-line bg-bg-2/60 py-14" aria-label="Technologies we use">
      <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-2">
        The stack behind products we ship
      </p>
      <div
        className="relative overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]"
      >
        <div className="flex w-max animate-marquee items-center gap-4 pr-4 motion-reduce:animate-none">
          {row.map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="flex items-center gap-2.5 rounded-xl border border-line bg-card/60 px-5 py-3"
              title={tech}
            >
              <TechIcon name={tech} className="h-6 w-6" />
              <span className="whitespace-nowrap text-sm font-medium text-ink-2">{tech}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
