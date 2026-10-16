# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Marketing website for GM Attorneys, a boutique law firm in Costa Rica. Next.js 16 (App Router, React 19), bilingual (English/Spanish), with a headless-WordPress blog pulled over WPGraphQL. Deployed on Vercel. The production domain is `https://gmattorneyscr.com` (see [src/lib/seo.ts](src/lib/seo.ts) `SITE_URL`).

## Commands

```bash
npm run dev      # local dev server (next dev)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # next lint (eslint: next/core-web-vitals + next/typescript)
```

There is no test suite. Validate changes with `npm run build` and `npm run lint`.

## Internationalization (next-intl)

i18n is the backbone of routing and content — nearly everything touches it.

- Locales are `en` (default) and `es`, configured in [src/i18n/routing.ts](src/i18n/routing.ts).
- `localePrefix` is `as-needed` with a **custom Spanish prefix of `/esn`** (not `/es`). English URLs have no prefix (`/about-us`); Spanish URLs are `/esn/about-us`. This `/esn` quirk is load-bearing — hreflang alternates, canonicals, and sitemap entries in [src/lib/seo.ts](src/lib/seo.ts) and [src/app/sitemap.ts](src/app/sitemap.ts) all encode it. When adding routes or links, honor it.
- Translation messages live in [src/i18n/messages/](src/i18n/messages/) (`en.json`, `es.json`).
- **Always import navigation primitives (`Link`, `redirect`, `usePathname`, `useRouter`) from [src/i18n/navigation.ts](src/i18n/navigation.ts)**, not from `next/link` or `next/navigation` — the locale-aware versions handle the `/esn` prefix automatically.
- Middleware ([src/middleware.ts](src/middleware.ts)) runs next-intl on all non-asset, non-API routes.

Content that is bilingual-in-code (team bios, offices, services, FAQ) lives in [src/data/](src/data/) as typed objects with `{ es, en }` fields (see the `LocalizedText` / `LocalizedParagraphs` pattern in [src/data/team.ts](src/data/team.ts)), rather than in the JSON message catalogs.

## Routing structure

All pages live under `src/app/[locale]/`. Marketing pages are grouped in a route group `(pages)/` (about-us, practice-areas, our-team, contact-us, privacy-policy, blog). The home page is `[locale]/page.tsx`.

Blog posts use a **date-nested dynamic route** matching the old WordPress permalink structure: `[locale]/(pages)/[year]/[month]/[day]/[slug]`. Build these URLs with `getPostUrl()` from [src/lib/wordpress.ts](src/lib/wordpress.ts), which derives `/YYYY/MM/DD/slug` from a post's UTC date — do not hand-construct blog URLs.

## WordPress / blog (headless, WPGraphQL)

[src/lib/wordpress.ts](src/lib/wordpress.ts) is the entire data layer for the blog. Key points:

- All reads go through `fetchGraphQL`, which defaults to ISR with `revalidate: 3600` and cache tags (`wp-posts`, `wp-categories`, `wp-post-<slug>`). If `WORDPRESS_GRAPHQL_URL` is unset, every fetch logs and returns `null`/empty — pages degrade gracefully rather than crash.
- On-demand revalidation webhook: `POST /api/revalidate?secret=WORDPRESS_REVALIDATE_SECRET` ([src/app/api/revalidate/route.ts](src/app/api/revalidate/route.ts)). WordPress should call this on publish/update to bust the ISR cache for the listing and the affected post.
- Post HTML is post-processed server-side before render: `addHeadingIdsAndExtract` injects `id`s on `<h2>/<h3>` (for the table-of-contents sidebar) and `replaceStandaloneLinksWithPreviews` swaps standalone-link paragraphs and WordPress self-embed blocks for `<div data-link-preview-url="...">` placeholders that a client component hydrates into link-preview cards. The TOC ids and the extracted heading list must stay in sync, so run `addHeadingIdsAndExtract` exactly once per render.
- SEO for posts (title, meta, canonical, OG, JSON-LD) comes from Yoast via WPGraphQL (the `seo { ... }` fields). Do not add a second JSON-LD/breadcrumb block on post pages — it would conflict with Yoast's.

The link-preview API route ([src/app/api/link-preview/route.ts](src/app/api/link-preview/route.ts)) fetches and scrapes OG metadata for those preview cards.

## SEO conventions

- Every static page defines its own `generateMetadata`. The root localized layout ([src/app/[locale]/layout.tsx](src/app/[locale]/layout.tsx)) sets site-wide defaults and the title template.
- Build OpenGraph and canonical/hreflang with the helpers in [src/lib/seo.ts](src/lib/seo.ts): `buildOpenGraph` and `localizedAlternates`. Next.js shallow-merges `openGraph`, so a subpage that sets only `openGraph.url` would drop the parent's images — use `buildOpenGraph` to keep the defaults.
- `robots.txt` and `sitemap.xml` are **dynamic routes** ([src/app/robots.ts](src/app/robots.ts), [src/app/sitemap.ts](src/app/sitemap.ts)). Never add static `robots.txt`/`sitemap.xml` to `public/` — a physical file there silently shadows the dynamic route (this bug happened before; see [SITE-STATUS.md](SITE-STATUS.md)).
- Security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) and legacy URL redirects are set in [next.config.ts](next.config.ts) `headers()` / `redirects()` — not in an `.htaccess` (Apache directives do nothing on Vercel). Redirects there also map old WordPress URLs (e.g. `/category/:slug` → `/blog?category=:slug`).

## UI & styling

- shadcn/ui (new-york style, RSC) with components in [src/components/ui/](src/components/ui/). Config in [components.json](components.json); `cn()` util in [src/lib/utils.ts](src/lib/utils.ts).
- Icon library is **react-icons** (not lucide), per `components.json`.
- Tailwind with `tailwindcss-animate` and `@tailwindcss/typography`. Fonts are self-hosted via `next/font/local` in [src/lib/fonts.ts](src/lib/fonts.ts): Manrope is the default (`font-sans`), Arial is on-demand via `font-arial`.
- Animation/scroll stack: Framer Motion, GSAP, Swiper, AOS, and Lenis smooth-scroll. Lenis and AOS are initialized globally in the locale layout via `LenisProvider` and `AOSInit`.
- Mapbox GL powers the office-locations map (CSS imported in the locale layout).
- Global UI state uses two React contexts in [src/app/[locale]/context/](src/app/[locale]/context/): `LoadingContext` (loading screen) and `ContactDrawerContext` (the site-wide contact drawer, toggled from `StickyCtaButtons`).

## Path aliases

`@/*` maps to `src/*`, with explicit aliases for `@/components`, `@/lib`, `@/ui`, `@/hooks`, `@/types`, `@/config` (see [tsconfig.json](tsconfig.json)).

## Environment variables

Set in `.env.local` (and Vercel). Referenced in code:

- `WORDPRESS_GRAPHQL_URL` — WPGraphQL endpoint. Unset = blog returns empty, no crash.
- `WORDPRESS_REVALIDATE_SECRET` — guards the `/api/revalidate` webhook.
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox GL token for the map.
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` — Google Analytics; GA scripts only render when set.
- `NEXT_PUBLIC_EMAILJS_SERVICE_ID` / `_TEMPLATE_ID` / `_PUBLIC_KEY` — the contact form submits via EmailJS client-side (no backend mailer).

## Status / planning docs

[SITE-STATUS.md](SITE-STATUS.md) (SEO audit + pre-launch checklist) and [PENDING-URLS.md](PENDING-URLS.md) (old-URL → new-URL redirect decisions for the WordPress migration) track migration and launch work. Consult them before changing redirects, sitemap, or SEO metadata.
