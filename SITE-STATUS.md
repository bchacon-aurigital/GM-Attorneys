# Site Status — SEO Audit & Pre-Launch Checklist

Snapshot as of this pass (two audit passes so far). Companion doc to
`PENDING-URLS.md` (which only tracks old-URL → new-URL redirect decisions).
This one covers SEO work done, what's left to reach a production-ready
launch, and general rough edges found while auditing the whole site.

## Second pass — additional fixes

Found by re-crawling the live old site's real page sitemap
(`page-sitemap.xml`: `/`, `/about-us/`, `/practice-areas/`, `/our-team/`,
`/contact-us/`, `/privacy-policy/`, `/privacy-policy-2/`,
`/newslettersubs/`) instead of guessing URLs, and by re-auditing the repo
end to end a second time:

- **Broken static `robots.txt` / `sitemap.xml` in `public/` were silently
  shadowing the real ones.** Next.js gives a physical file in `public/`
  priority over a dynamic `src/app/robots.ts` / `sitemap.ts` route — so
  these two leftover scaffold files meant the good, real robots/sitemap
  code in this repo was **never actually being served**. Both were
  completely broken: `sitemap.xml` had a single `<url>` entry pointing at
  the literal string `https://` (no domain), empty `<lastmod>`, and a
  handful of *commented-out* URLs for routes that don't even exist
  (`/about`, `/services`, `/contact` vs. the real `/about-us`,
  `/practice-areas`, `/contact-us`); `robots.txt` pointed its `Sitemap:`
  line at `https:///sitemap.xml` (same missing-domain bug). Deleted both —
  the dynamic `robots.ts`/`sitemap.ts` now actually reach Google for the
  first time.
- **`.htaccess` in `public/` did nothing.** `.htaccess` is an Apache
  directive; this site runs on Next.js (Node/Vercel runtime), which never
  reads it — so its security headers (`X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`), gzip, and cache-control
  rules were silently inert this whole time, giving false confidence they
  were active. Re-added the real security headers via `headers()` in
  `next.config.ts` (where they actually take effect), skipped the
  deprecated/unsafe `X-XSS-Protection` header some old boilerplate still
  includes, and deleted the non-functional `.htaccess`. Gzip and
  cache-control are handled automatically by Next.js/Vercel at the
  platform level, so those parts of the old file had no equivalent to
  port over.
- **Broken footer link**: "Testimonials" pointed at `/testimonials`, a page
  that never existed anywhere in the project — guaranteed 404 from the
  footer of every single page. The real testimonial content (the
  Commitment/Integrity/Excellence quotes) already lives in the home page's
  "What Sets Us Apart" section. Added `id="testimonials"` there and pointed
  the footer link at `/#testimonials` instead.
- **`BreadcrumbList` structured data added.** The old WordPress/Yoast site
  had breadcrumb schema on every page (`Home → Page Name`); the new site
  had none outside of blog posts (which still get theirs from Yoast's own
  schema via WPGraphQL, left untouched — adding a second one there would
  conflict). Added a small `BreadcrumbSchema` component and wired it into
  home, `/about-us`, `/practice-areas`, `/our-team`, `/blog`, `/contact-us`,
  and `/privacy-policy`.
- **Verified nothing else from the old site's real page list got missed**:
  confirmed `/about-us/`, `/practice-areas/`, `/our-team/`, `/contact-us/`,
  `/privacy-policy/` all exist and have real per-page metadata now.
  `/newslettersubs/` and `/privacy-policy-2/` remain intentionally
  unresolved — see `PENDING-URLS.md`.
- **Confirmed via the old site's rendered JSON-LD** that a few of its own
  values were themselves bugs, not a target to replicate: `og:locale` was
  `es_ES` (Spain) instead of `es_CR`, and its `Organization` schema `name`
  was truncated to `"GM"` instead of `"GM Attorneys"`. The new site already
  has both correct — noting this just to confirm it wasn't an oversight
  here, the old values were wrong and weren't copied forward.
- Ran a broken-internal-link sweep across every `href` in the codebase
  (excluding `mailto:`/`tel:`/external) — `/testimonials` above was the
  only dead one found; everything else resolves to a real route.
- Ran an asset-existence sweep on every image path referenced from both
  components and `src/data/*.ts` (`team.ts`, `offices.ts`,
  `services-slider.ts`) — no missing files.

## SEO — done in this pass (first pass)

- **Per-page metadata**: every static page now has its own `generateMetadata`
  (title, description, canonical) instead of inheriting the root layout's
  generic values — home, `/about-us`, `/practice-areas`, `/our-team` (via a
  local `layout.tsx`, since the page itself is a client component),
  `/blog`, `/contact-us`, `/privacy-policy` (marked `noindex`, legal
  boilerplate has no SEO value). Blog posts already had their own metadata
  pulled from Yoast via WPGraphQL — untouched.
- **hreflang fixed**: `alternates.languages` was hardcoded in the root
  layout to always point at the home page (`/` and `/en`), regardless of
  which page you were actually on. Every page's hreflang was silently wrong
  except the home page's. Added `src/lib/seo.ts` (`localizedAlternates()`)
  as the single source of truth for canonical + hreflang per route, used by
  every page's `generateMetadata`. This matters directly for the CR + US
  dual-market goal — Google needs correct hreflang to serve the right
  locale to each market instead of guessing or picking one canonically.
- **JSON-LD structured data**: `JsonLd.tsx` was a template with every field
  empty (`name: ""`, `url: "https://"`, etc.) — effectively broken markup.
  Rebuilt with real data: `LegalService` (more specific than generic
  `Organization` for a law firm) for the main entity, `WebSite`, and one
  `LegalService` entry per office (San José, Flamingo, Tamarindo, Nosara)
  with real address, geo coordinates, phone, and per-office email — pulled
  from `src/data/offices.ts`, which was also filled in with the real
  addresses and per-office emails found on the live old site (previously
  had generic city-only addresses and no emails).
- **GA4 wired up**: was a broken placeholder (`gtag/js?id=G-`, `gtag('config',
  'G-')` — not a valid measurement ID). Connected to the real ID
  (`G-TLH9MEJW8B`) via `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local`
  (not hardcoded — the layout reads the env var and skips injecting the
  script entirely if it's unset, so local/preview builds without the var
  don't send broken analytics calls).
- **Sitemap**: `/about-us` and `/contact-us` were missing from
  `sitemap.ts`'s `STATIC_ROUTES` (only had `""`, `/practice-areas`,
  `/our-team`, `/blog`). Added both. `/privacy-policy` deliberately left out
  (noindex).
- **robots.txt / meta robots**: already correct — `allow: "/"`,
  `disallow: ["/api/"]`, points at `/sitemap.xml`. No changes needed there.

## SEO — carried over from the live old site (verified, not guessed)

Pulled directly from `gmattorneyscr.com`'s rendered HTML and its
`/contact-us/` page to make sure nothing real got lost in the rebuild:

- Real office addresses (previously only had city-level placeholders):
  - Los Yoses: "Ave. 2 and 8, Calle #37, Casa Jorgran"
  - Flamingo: "Commercial Center Arenas, next to BCR Bank, first level,
    office #3"
  - Tamarindo: "Russell E. Wenrich Building, 2nd floor, office #1, in front
    of Selina Hostel"
  - Nosara: "Next to Safari Vet"
- Real per-office emails: `flamingo@gmattorneyscr.com`,
  `tamarindo@gmattorneyscr.com`, `nosara@gmattorneyscr.com` (Los Yoses uses
  the general `info@gmattorneyscr.com`).
- Confirmed social links match what's already live: Instagram
  (`gm_attorneys`), Facebook (`gmattorneyscr`, with the same `?fref=ts`
  param the old site's JSON-LD used), LinkedIn (`gm-attorneys`). No Twitter/X
  on the old site — none added here either, rather than inventing one.

## SEO — still open / needs input

- **OG image (`/og-image.jpg`)**: referenced in the root layout's metadata
  and in `JsonLd`'s `image` field, but the file doesn't exist in `/public`
  yet. Client confirmed one is coming — just drop it at `public/og-image.jpg`
  (1200×630 recommended) once it's ready, no code change needed.
- **Favicon**: none exists yet anywhere in the project. The old site's
  favicon (cursive logo, dark background) doesn't match the new purple
  rebrand, so it wasn't reused as a placeholder — explicitly left blank per
  client instruction rather than inventing a temporary one. Needs a real
  favicon (ideally an `icon.png`/`icon.svg` in `src/app/`) before launch, or
  the browser tab will show a generic default indefinitely.
- **Search Console verification**: no verification meta tag/file exists yet
  (was previously an empty placeholder in the layout, now removed rather
  than left broken). Add back via `metadata.verification.google` once the
  property is set up in Google Search Console — needed to submit the
  sitemap and monitor indexing/hreflang errors post-launch.
- **Old WordPress site de-indexing**: once the new Next.js site goes live at
  `gmattorneyscr.com`, the old WordPress install (wherever it ends up
  living, if anywhere) needs a site-wide `noindex` or to be taken down —
  otherwise Google may keep the old thin/broken-metadata pages indexed
  alongside the new ones, which hurts more than helps. Not something this
  repo can control — flagging for whoever manages the WordPress deploy.
- **`/privacy-policy-2/` redirect** — see `PENDING-URLS.md`, needs a client
  decision on whether it 301s to the new `/privacy-policy`.

## Non-SEO rough edges found during the audit

- **Contact form has no backend** — `/contact-us`'s form (name, phone,
  email, service, subject, details, "I am human" checkbox) is intentionally
  static per an earlier explicit request ("that it be a form simply without
  functionality, just make the design") — the submit button is disabled.
  Needs a real submission handler (API route + email service, or a form
  provider) before launch, or visitors can't actually reach out through the
  site.
- **Mapbox token missing** (`NEXT_PUBLIC_MAPBOX_TOKEN` in `.env.local` is
  empty) — the `StoreLocator` map (home page + `/about-us`) silently shows
  a "Map unavailable" fallback instead of the map. Needs a real Mapbox
  public token (free tier is enough — see earlier conversation for the
  signup walkthrough) before launch.
- **`WORDPRESS_REVALIDATE_SECRET` webhook not connected** — the on-demand
  revalidation endpoint (`/api/revalidate`) works but nothing in WordPress
  calls it yet. Blog still updates fine on its own via hourly ISR — this
  only affects how fast a newly published/edited post shows up (up to an
  hour vs. instantly).
- **`about-us/hero.avif` is 1.9MB** — the heaviest image in the project, and
  it's loaded with `priority` (i.e. it's the LCP element on that page).
  Worth compressing before launch; a 1.9MB LCP image will hurt Core Web
  Vitals and, indirectly, SEO ranking signals. Other hero-sized images
  (Nosara/Flamingo/Tamarindo `.avif`, home `hero.avif`) are also in the
  1–1.5MB range and could use a pass.
- **ACF + WPGraphQL for ACF not started** — Team, Practice Areas, and
  Testimonials content is all hardcoded in `src/data/*.ts` rather than
  editable from WordPress. Fine for launch, but the client won't be able to
  update team members or services without a code change until this exists.
- **Individual team member bios missing for several people** — in
  `src/data/team.ts`, several members (Fiorella Rodríguez, Francella
  Marchena, Julia Rodríguez, Valeska Ruiz, Isabela Juárez, Grettel Araya,
  Allison Canales, Denis López, Marianne Zumbado, Valeria Ramírez) have an
  empty `bio: []`, so their team card never shows the purple hover overlay
  the other members get. Not a bug — there's just no bio text for them yet.
  Several of these also use `placeholder.avif`/`placeholderm.avif` instead
  of a real photo.
- **`/practice-areas` repeats the same generic copy for all 10 services.**
  `ServiceRow` renders `services.bullets` (3 generic bullet points) and
  `services.description` (one long paragraph) identically under every one
  of the 10 practice areas — Real Estate, Corporate Law, Immigration, etc.
  all show the exact same Lorem Ipsum bullets and paragraph, just with a
  different title/heading above them. Checked the live old site too: it
  never had real per-service copy either, so nothing is being lost here —
  but it's real visible content on the new site as-is, and duplicate
  boilerplate repeated 10x on one page isn't great for that page's SEO
  either. Confirmed with the client to leave as-is for now rather than
  hide it or invent copy; needs real per-service bullets + description
  from the client before launch. `about.heroFooterNote` was a similar
  Lorem Ipsum leftover but wasn't actually rendered anywhere — removed the
  dead translation key instead of leaving it to confuse whoever edits that
  file next.



Pendiente:


-OG image: falta el archivo /og-image.jpg — ya sabemos que va a llegar.
-Favicon: no existe todavía (decidiste no poner uno temporal).
-Des-indexar el WordPress viejo una vez el sitio nuevo esté en producción.
-Form de contacto sin backend (a propósito, según pediste — solo falta conectar el envío real).
-Mapbox sin token — el mapa no se ve hasta que pongas el token.
-Bios de varios miembros del equipo faltantes (Fiorella, Francella, Julia, Valeska, Isabela, Grettel, Allison, Denis, Marianne, Valeria).
-Los 10 servicios en /practice-areas repiten el mismo texto genérico (bullets y descripción) — ni el sitio viejo tenía esto resuelto; falta que nos pases contenido real por servicio.
-/newslettersubs/ siguen sin destino decidido (pendiente tuyo, documentado desde antes).