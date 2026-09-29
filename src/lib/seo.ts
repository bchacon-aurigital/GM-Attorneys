export const SITE_URL = "https://gmattorneyscr.com";

export const DEFAULT_OG_IMAGES = [
  {
    url: "/assets/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "GM Attorneys",
  },
];

/**
 * Builds an openGraph object with the site defaults (siteName, images, type,
 * locale). Next.js does a shallow merge on `openGraph`, so subpages that set
 * `openGraph: { url }` lose the parent layout's images — call this instead.
 */
export function buildOpenGraph(pathname: string, locale: string) {
  return {
    type: "website" as const,
    locale: locale === "es" ? "es_CR" : "en_US",
    url: pathname,
    siteName: "GM Attorneys",
    images: DEFAULT_OG_IMAGES,
  };
}

/**
 * Builds the canonical path and hreflang alternates for a route, given its
 * locale-agnostic pathname (e.g. "/about-us", "/" for the home page).
 *
 * English is the default locale with no URL prefix ("/about-us"), Spanish
 * gets the "/esn" prefix ("/esn/about-us") — matches routing.localePrefix
 * mode "as-needed" with a custom prefix for "es".
 */
export function localizedAlternates(pathname: string, locale: string) {
  const cleanPath = pathname === "/" ? "" : pathname;
  const isSpanish = locale === "es";

  const enPath = cleanPath || "/";
  const esPath = cleanPath ? `/esn${cleanPath}` : "/esn";

  const canonical = isSpanish ? esPath : enPath;

  return {
    path: canonical,
    canonical,
    languages: {
      "en-US": enPath,
      "es-CR": esPath,
      "x-default": enPath,
    },
  };
}
