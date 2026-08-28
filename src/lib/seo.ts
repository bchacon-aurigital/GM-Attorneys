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
