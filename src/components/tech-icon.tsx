// Authentic technology logos served from the Devicon CDN (a widely used,
// community-maintained library of official brand SVGs).

const DEVICON_URL = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

type TechLogo = {
  name: string;
  img?: string; // devicon path "react/react-original"
  fallback?: string; // letter fallback when no CDN logo exists (e.g. OpenAI)
};

const registry: Record<string, TechLogo> = {
  React: { name: "React", img: "react/react-original" },
  "Next.js": { name: "Next.js", img: "nextjs/nextjs-original" },
  Python: { name: "Python", img: "python/python-original" },
  Flask: { name: "Flask", img: "flask/flask-original" },
  "Node.js": { name: "Node.js", img: "nodejs/nodejs-original" },
  JavaScript: { name: "JavaScript", img: "javascript/javascript-original" },
  TypeScript: { name: "TypeScript", img: "typescript/typescript-original" },
  PHP: { name: "PHP", img: "php/php-original" },
  Laravel: { name: "Laravel", img: "laravel/laravel-original" },
  Flutter: { name: "Flutter", img: "flutter/flutter-original" },
  TensorFlow: { name: "TensorFlow", img: "tensorflow/tensorflow-original" },
  OpenAI: { name: "OpenAI", fallback: "OpenAI" },
  PostgreSQL: { name: "PostgreSQL", img: "postgresql/postgresql-original" },
  MongoDB: { name: "MongoDB", img: "mongodb/mongodb-original" },
  AWS: { name: "AWS", img: "amazonwebservices/amazonwebservices-original-wordmark" },
  Docker: { name: "Docker", img: "docker/docker-original" },
  Redis: { name: "Redis", img: "redis/redis-original" },
  Kotlin: { name: "Kotlin", img: "kotlin/kotlin-original" },
  Swift: { name: "Swift", img: "swift/swift-original" },
  Kubernetes: { name: "Kubernetes", img: "kubernetes/kubernetes-plain" },
  Stripe: { name: "Stripe", img: "stripe/stripe-original" },
  Firebase: { name: "Firebase", img: "firebase/firebase-plain" },
  Tailwind: { name: "Tailwind CSS", img: "tailwindcss/tailwindcss-plain" },
  Markdown: { name: "Markdown", img: "markdown/markdown-original" },
};

export function TechIcon({ name, className = "h-7 w-7" }: { name: string; className?: string }) {
  const entry = registry[name];
  if (!entry) return null;

  if (entry.img) {
    return (
      <img
        src={`${DEVICON_URL}/${entry.img}.svg`}
        alt={entry.name}
        width={28}
        height={28}
        loading="lazy"
        className={`${className} object-contain`}
      />
    );
  }

  // Styled wordmark fallback (used for OpenAI and similar non-CDN brands)
  return (
    <span
      className={`${className} grid place-items-center rounded-full bg-accent/15 font-display text-[10px] font-bold tracking-tight text-accent`}
      title={entry.name}
    >
      {entry.fallback ?? entry.name.slice(0, 2).toUpperCase()}
    </span>
  );
}
