import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        // Applies to every route. The old WordPress site's .htaccess set
        // these but .htaccess is an Apache-only directive — it does nothing
        // under Next.js's Node/Vercel runtime, so these were silently not
        // applied. Re-added here where they actually take effect.
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Old WordPress blog permalinks used /YYYY/MM/DD/slug/. The new site
      // keeps the slug-only /blog/[slug] structure going forward, so every
      // old post URL 301s to its new home instead of matching the route
      // literally (decided over replicating /YYYY/MM/DD/ 1:1 — see commit
      // message / PENDING-URLS.md for the reasoning).
      {
        source: "/:year(\\d{4})/:month(\\d{2})/:day(\\d{2})/:slug",
        destination: "/blog/:slug",
        permanent: true,
      },
      // Old blog category archives (/category/slug/) have no equivalent
      // page in the new site — the /blog listing filters client-side
      // instead. Redirect to the listing pre-filtered via query param.
      {
        source: "/category/:slug",
        destination: "/blog?category=:slug",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
