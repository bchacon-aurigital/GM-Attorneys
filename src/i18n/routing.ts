import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "en",
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      es: "/esn",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
