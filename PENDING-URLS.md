# URL Migration — Decisions & Pending Items

Tracking doc for the 1:1 URL mapping from the old WordPress site
(`gmattorneyscr.com`, Elementor/AIOSEO) to the new Next.js headless site.
Source of truth for the old URLs: the 6 sitemaps listed in Yoast's
`sitemap_index.xml` (`post-sitemap.xml`, `page-sitemap.xml`, `fb-sitemap.xml`,
`wpm_team-sitemap.xml`, `category-sitemap.xml`, `author-sitemap.xml`).

## Decided & implemented

- **Blog posts** (`post-sitemap.xml`, 95 URLs): old permalinks are
  `/YYYY/MM/DD/slug/`. Decision: **keep the new site's clean `/blog/slug/`
  structure** going forward (better for all future content) and 301 the old
  dated URLs to it via a pattern-matched redirect in `next.config.ts`
  (`/:year/:month/:day/:slug` → `/blog/:slug`), rather than replicating the
  dated structure 1:1. Rationale: Google treats a well-formed 301 as passing
  effectively all link equity to the destination after a re-crawl window —
  there's no material SEO loss from redirecting, and it avoids permanently
  tying all future blog URLs to a date-based path.
- **`/practice-areas/`** and **`/our-team/`**: the corresponding new routes
  were **renamed to match exactly** (`/services` → `/practice-areas`,
  `/team` → `/our-team`), rather than redirected. Client's explicit choice.
  All internal links (navbar, footer, sitemap.ts) were updated accordingly.
- **Blog category archives** (`category-sitemap.xml`, 8 URLs,
  `/category/<slug>/`): the new site has no standalone category page — the
  `/blog` listing filters client-side instead. Redirected to
  `/blog?category=<slug>`; `BlogListing` reads that query param on mount and
  pre-selects the matching category so the filtered view still shows up.

## Explicitly pending — client to decide with their team

These were left **without a redirect** on purpose, per client instruction —
do not invent a destination for them. Revisit once a decision comes back.

- **`/about-us/`** — no equivalent page exists yet in the new site. No page
  built, no redirect added.
- **`/contact-us/`** — same as above, page doesn't exist yet.
- **`/newslettersubs/`** — likely an old newsletter signup landing/form. Not
  rebuilt, not redirected. Confirm whether the newsletter flow is even still
  active before deciding.
- **`/privacy-policy/`** and **`/privacy-policy-2/`** — the `-2` looks like a
  duplicate/draft that got indexed by mistake. Need a real privacy policy
  page in the new site (legal review likely required) before deciding
  where these should point.
- **`/wpm-team/<slug>/`** (`wpm_team-sitemap.xml`, 5 URLs: Carmen Julia
  Rodríguez, Fiorella Rodríguez, Santiago Batalla, Alina Guzmán, Efraín
  Hidalgo) — the old "Team Members" plugin gave 5 of the 24 team members
  their own individual page. The new `/our-team` is a single page listing
  everyone, no per-person subpages. Client is checking internally whether
  individual team member pages are worth building (`/our-team/[slug]`) or
  whether these should just redirect to `/our-team`.
- **`/author/assistant/`** (`author-sitemap.xml`, 1 URL) — WordPress author
  archive page, low priority. No destination decided.
- **`/fb/`** and **`/fb/2864/`** (`fb-sitemap.xml`, 2 URLs, last modified
  2024 — looks stale/inactive already) — unclear purpose, possibly a
  Facebook-linked redirector from an old plugin. Not investigated further;
  flagged for the client to confirm whether it's still relevant at all.

## Also still open (unrelated to URL mapping, tracked here for visibility)

- **`WORDPRESS_REVALIDATE_SECRET`** — the on-demand revalidation webhook
  (`/api/revalidate`, see [src/app/api/revalidate/route.ts](src/app/api/revalidate/route.ts))
  is built and working, but nothing in WordPress calls it yet. Needs a
  webhook plugin (e.g. WP Webhooks) configured to POST to
  `/api/revalidate?secret=...` on post publish/update, using the same
  secret value set in `.env.local`. Until then, the blog still updates on
  its own via the hourly ISR revalidation — this only makes new/edited
  posts appear instantly instead of within an hour.
- **ACF + WPGraphQL for ACF** — not started. Needed to make Team /
  Practice Areas / Testimonials content editable from WordPress instead of
  hardcoded in the repo (currently only [src/data/team.ts](src/data/team.ts)
  exists as static data).
- **Old WordPress site de-indexing** — once the new Next.js site is live in
  production, the old WordPress install needs a site-wide `noindex` (or to
  be taken down) to avoid duplicate-content indexing, per the project's SEO
  requirements.
- **Plugin cleanup on WordPress** — the project criteria call for
  deactivating visual builders/cache/image-optimizer plugins no longer
  needed in headless mode (Elementor, Optimole, etc.). Not evaluated yet.
