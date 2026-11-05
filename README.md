# Rynevo Technologys — Corporate Website

A complete, production-ready corporate website for **Rynevo Technologys**: a premium, futuristic, fully responsive multi-page site with a functional backend (forms, careers, admin dashboard), database, SEO infrastructure, and a distinctive dark-first design system.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Prisma + SQLite (PostgreSQL-portable) · Zod · nodemailer

---

## 1. Quick start (local development)

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (a .env already exists locally; see §2 for details)
#    For fresh clones: copy .env.example → .env and adjust values

# 3. Create the database and seed it
npm run setup       # runs: prisma db push + seed

# 4. Start the dev server
npm run dev         # → http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

### Default admin credentials (local seed)

| Field | Value |
|---|---|
| URL | `/admin/login` |
| Email | `admin@rynevotechnologys.com` |
| Password | `change-me-please-1f3a9` |

Sessions are signed JWTs in httpOnly cookies (8h expiry). Change the seeded credentials by setting `ADMIN_EMAIL` / `ADMIN_PASSWORD` in `.env` **before running the seed**, or via the dashboard's user management (ADMIN role only).

---

## 2. Environment variables (`.env.example`)

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | SQLite file by default (`file:./dev.db`). Swap to a `postgres://…` URL to switch engines. |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | First admin account, used by the seed script. |
| `JWT_SECRET` | Signing secret for admin sessions — **generate a 64+ char random string for production**. |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (metadata, sitemap, OpenGraph). |
| `SMTP_*`, `MAIL_FROM`, `MAIL_TO` | Optional email notifications. Without SMTP, submissions are still stored in the DB and logged server-side. |

---

## 3. Site map

| Page | Route |
|---|---|
| Home | `/` |
| About Us | `/about` |
| Services (overview) | `/services` |
| 16 individual service pages | `/services/[slug]` — e.g. `/services/generative-ai-solutions` |
| Our Expertise | `/expertise` |
| Industries | `/industries` |
| Portfolio (filterable) | `/portfolio` |
| Case studies | `/case-studies/[slug]` |
| Careers (filters) | `/careers` |
| Job detail + application form | `/careers/[slug]` |
| Insights (search + category filters) | `/insights` |
| Blog articles | `/insights/[slug]` |
| Contact (full form) | `/contact` |
| Admin dashboard | `/admin` (protected) |
| Custom 404 | any unknown route |
| SEO | `/sitemap.xml`, `/robots.txt` |

### Backend API

| Endpoint | Purpose |
|---|---|
| `POST /api/contact` | Project inquiry form — validated with Zod, honeypot + timing bot protection, DB persistence, optional email notification. |
| `POST /api/careers/apply` | Job application — multipart upload, resume whitelist (PDF/DOC(X)/RTF, ≤4 MB), randomised storage names, confirmation email. |
| `POST /api/auth/login` `logout` | Admin session management with bcrypt + signed cookies + rate limiting (5 attempts / 10 min). |
| `GET/POST /api/admin/[resource]` | Role-guarded CRUD (list/create). |
| `PATCH/DELETE /api/admin/[resource]/[id]` | Field-allow-listed updates & deletes. `users` resource requires the ADMIN role. |

### Admin dashboard sections

Inquiries · Job Applications (status pipeline) · Job Listings (CRUD) · Blog Posts (CRUD) · Portfolio Projects · Testimonials.

---

## 4. Database schema (`prisma/schema.prisma`)

```
User                  admin / editor accounts (bcrypt, roles)
ContactInquiry        name, email, phone, company, services, budget, message, status, emailSent
Job                   slug, title, category, jobType, experience, location, remote, published, details
JobApplication        job ref, applicant details, resume file name/size, status pipeline
BlogPost              slug, title, category, excerpt, markdown-lite content, tags, featured, published
PortfolioProject      slug, title, industry, category, summary, stack, isDemo, published
Testimonial           author, role, company, quote, isSample flag, order
NewsletterSubscriber  email
```

Enums are intentionally modelled as validated `String` fields so the schema runs identically on **SQLite and PostgreSQL**. To swap engines:

```bash
# 1. point DATABASE_URL at a postgres://… URL
# 2. change datasource provider to "postgresql" in prisma/schema.prisma
npx prisma db push
npm run seed
```

---

## 5. Design system

- **Palette**: deep midnight (`#080B12`/`#101522`), electric blue `#5865F2`, cyan `#00D4FF`, text `#F8FAFC`/`#94A3B8`, borders `#252C3A` — exposed as CSS variables and mapped to Tailwind (`bg`, `card`, `line`, `ink`, `accent`…).
- **Light/dark mode**: functional toggle (persisted, no FOUC); dark is the brand default. Toggle in the navbar.
- **Type**: Inter (body) + Space Grotesk (display), via `next/font`.
- **Motion**: Framer Motion page transitions, scroll reveals, hero entrance; a lightweight **interactive network visualization** (canvas) in the hero; CSS marquee of authentic tech logos (Devicon CDN).
- **Accessibility**: `prefers-reduced-motion` respected globally, skip-link, keyboard focus rings, semantic landmarks, ARIA on menus/tabs/accordions.

---

## 6. Honesty policy (placeholders & samples)

The site deliberately ships with no fabricated business claims and **no demo/sample data**:

- **Portfolio & case studies** — real Rynevo builds only (AI Study Assistant, Nilkanth Farshan website, Mini Voice Assistant). Results sections report verifiable delivery facts (feature counts, timelines, capabilities), never invented performance metrics.
- **Testimonials** — none are published or seeded. Add real, permission-verified quotes via the admin dashboard (Testimonials tab) when they exist.
- **Job listings** — none are seeded; only real roles entered and published through the admin dashboard appear on `/careers`.
- **Contact details** — real details are live: `renevo.technology@gmail.com`, phone `7567559933 / 7203001006`, Instagram `@rynevo.tech`, GitHub `github.com/rynevotechnology`. Marketing email/notify address in `.env` (`MAIL_FROM`/`MAIL_TO`) still points to `renevo.technologys@gmail.com` — confirm the exact Gmail address before enabling SMTP.

## 7. Updating content

- **Jobs, blog posts, portfolio, testimonials** → `/admin` dashboard (or seed data in `src/lib/content/*`).
- **Services (16 pages)** → `src/lib/content/services.ts` (rich, unique per-service structure).
- **Case studies** → `src/lib/content/projects.ts`.
- **Navigation, values, industries, contact info** → `src/lib/content/site.ts`.
- **Email transport** → `src/lib/mail.ts`.

Uploaded resumes are stored in `./uploads/` with randomised names (never exposed publicly). On serverless hosts, back uploads with object storage instead (S3/Blob) — the write is isolated in `api/careers/apply/route.ts`.

---

## 8. Deployment

### Vercel (recommended)

1. Push the repo to GitHub and import it in Vercel.
2. Add all environment variables from `.env.example` in project settings (with a strong `JWT_SECRET`).
3. **Database**: create a managed Postgres (Vercel Postgres, Neon, or Supabase), set `DATABASE_URL`, switch the Prisma provider to `postgresql` (§4), then run `npx prisma db push` and `npm run seed` once against the production DB.
4. **Uploads**: filesystem writes don't persist on serverless — swap the local-write in the apply route for S3/Vercel Blob (documented inline).
5. Set `NEXT_PUBLIC_SITE_URL` to the production domain (Vercel provides this automatically).
6. Deploy — `next build` runs automatically; `sitemap.xml`, `robots.txt`, and JSON-LD are generated.

### VPS / self-hosted

```bash
npm ci && npm run build
NODE_ENV=production node server.js   # or run "npm run start" under pm2
```

Behind Nginx, proxy `localhost:3000`; keep `.env` out of the repo; back up `prisma/dev.db` (SQLite) or use managed Postgres.

### Production checklist

- [ ] Generate a strong `JWT_SECRET` and change seeded admin credentials.
- [ ] Configure SMTP for email notifications. Without SMTP, submissions are still stored in the database and visible in the dashboard (the `emailSent` flag shows which inquiries were emailed).
- [ ] Confirm the notification mailbox in `.env` (`MAIL_FROM` / `MAIL_TO`).
- [ ] Publish real roles with the Sample suffix removed.
- [ ] Post-launch: add real testimonials (replacing the labelled samples) and new case studies as projects complete.
- [ ] Point `NEXT_PUBLIC_SITE_URL` at the live domain; verify `/sitemap.xml` and OG tags.

---

## 9. Scripts

| Command | Action |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm run start` | Production build / serve |
| `npm run setup` | Create DB schema + seed (`prisma db push` + `seed`) |
| `npm run seed` | Seed only (idempotent upserts) |
| `node scripts/smoke.mjs` | End-to-end API smoke test (needs a running server; see script header) |

## 10. Security notes

- All API inputs validated with Zod or explicit guards; admin PATCH/DELETE use strict field allow-lists.
- CSRF-conscious cookie policy (`SameSite=Lax`, httpOnly, secure in production).
- Rate-limited login (per-IP brute-force guard) and bot-tripped honeypots + timing checks on public forms.
- No secrets in frontend bundles — everything sensitive lives in env vars read server-side.
- Middleware blocks `/admin` and `/api/admin` without a valid session; role gate on user management.
#   R y n e v o . T e c h  
 