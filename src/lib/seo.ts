import { routing } from "@/i18n/routing";

/**
 * Builds the canonical path and hreflang alternates for a route, given its
 * locale-agnostic pathname (e.g. "/about-us", "" for the home page).
 *
 * Spanish is the default locale with no URL prefix ("/about-us"), English
 * gets the "/en" prefix ("/en/about-us") — matches routing.localePrefix
 * "as-needed". Every page that defines its own generateMetadata should call
 * this so canonical + hreflang stay correct per-route instead of inheriting
 * the root layout's (which only ever pointed at the home page).
 */
export function localizedAlternates(pathname: string, locale: string) {
  const isSpanish = locale === routing.defaultLocale;
  const cleanPath = pathname === "/" ? "" : pathname;

  const canonical = isSpanish ? cleanPath || "/" : `/en${cleanPath}`;

  return {
    path: canonical,
    canonical,
    languages: {
      "es-CR": cleanPath || "/",
      "en-US": `/en${cleanPath}`,
      "x-default": cleanPath || "/",
    },
  };
}
