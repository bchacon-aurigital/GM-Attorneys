import type { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/lib/wordpress";
import { routing } from "@/i18n/routing";

const BASE_URL = "https://gmattorneyscr.com";

// Static routes that exist for every locale. Add new pages here as they're
// built. Pages meant to stay out of the index (e.g. /privacy-policy) are
// deliberately left out.
const STATIC_ROUTES = ["", "/about-us", "/practice-areas", "/our-team", "/blog", "/contact-us"];

const LOCALE_PREFIX: Record<string, string> = { en: "", es: "/esn" };

function localizedPath(path: string, locale: string) {
  const prefix = LOCALE_PREFIX[locale] ?? `/${locale}`;
  return `${BASE_URL}${prefix}${path || "/"}`;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = routing.locales.flatMap((locale) =>
    STATIC_ROUTES.map((path) => ({
      url: localizedPath(path, locale),
      lastModified: now,
      changeFrequency: path === "/blog" ? "daily" : "weekly",
      priority: path === "" ? 1 : path === "/blog" ? 0.9 : 0.7,
    }))
  );

  let blogEntries: MetadataRoute.Sitemap = [];
  try {
    const slugs = await getAllPostSlugs();
    blogEntries = routing.locales.flatMap((locale) =>
      slugs.map((slug) => ({
        url: localizedPath(`/blog/${slug}`, locale),
        lastModified: now,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      }))
    );
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error);
  }

  return [...staticEntries, ...blogEntries];
}
