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
    minimumCacheTTL: process.env.NODE_ENV === 'development' ? 0 : 60,
  },
  async headers() {
    const isDev = process.env.NODE_ENV === 'development';
    return [
      // Keep Vercel preview/deployment URLs out of search indexes.
      {
        source: "/:path*",
        has: [{ type: "host", value: "(.*\\.)?vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
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
      // In dev, prevent the browser from caching static assets so replaced
      // image files are picked up immediately without a hard refresh.
      ...(isDev ? [{
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store" },
        ],
      }] : []),
    ];
  },
  async redirects() {
    return [
      // iOS requests this legacy variant; serve the same icon to avoid 404s.
      {
        source: "/apple-touch-icon-precomposed.png",
        destination: "/apple-touch-icon.png",
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
      // Indexed images and absolute URLs inside post content
      { source: "/wp-content/:path*", destination: "https://wp.gmattorneyscr.com/wp-content/:path*", permanent: true },
      // Admin access for the client's team
      { source: "/wp-admin", destination: "https://wp.gmattorneyscr.com/wp-admin/", permanent: false },
      { source: "/wp-admin/:path*", destination: "https://wp.gmattorneyscr.com/wp-admin/:path*", permanent: false },
      { source: "/wp-login.php", destination: "https://wp.gmattorneyscr.com/wp-login.php", permanent: false },
      // Yoast sitemaps and feed
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/:name(post|page|category|author|fb|wpm_team)-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/feed", destination: "/blog", permanent: true },
      { source: "/feed/:path*", destination: "/blog", permanent: true },
      // Pending client decision: 302 to avoid 404s in the meantime
      { source: "/newslettersubs", destination: "/", permanent: false },
      { source: "/privacy-policy-2", destination: "/privacy-policy", permanent: false },
      { source: "/wpm-team/:slug", destination: "/our-team", permanent: false },
      { source: "/author/:slug", destination: "/blog", permanent: false },
      { source: "/fb/:path*", destination: "/", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
