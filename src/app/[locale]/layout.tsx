import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import "mapbox-gl/dist/mapbox-gl.css";
import "aos/dist/aos.css";
import { LoadingProvider } from "./context/LoadingContext";
import { ContactDrawerProvider } from "./context/ContactDrawerContext";
import Script from "next/script";
import AOSInit from "@/components/AOSInit";
import LenisProvider from "@/components/LenisProvider";
import JsonLd from "@/components/JsonLd";
import { StickyCtaButtons } from "@/components/StickyCtaButtons";
import { ContactDrawer } from "@/components/ContactDrawer";
import { manrope, arial } from "@/lib/fonts";
import { routing, type Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const DEFAULT_TITLE = {
  es: "GM Attorneys | Despacho Legal Boutique en Costa Rica",
  en: "GM Attorneys | Boutique Law Firm in Costa Rica",
};

const DEFAULT_DESCRIPTION = {
  es: "Despacho legal boutique en Costa Rica con más de 48 años de experiencia en bienes raíces, inversión extranjera, derecho corporativo e inmigración. Oficinas en San José, Flamingo, Tamarindo y Nosara.",
  en: "Premium boutique law firm in Costa Rica with over 48 years of experience in real estate, foreign investment, corporate law, and immigration. Offices in San José, Flamingo, Tamarindo, and Nosara.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path, canonical, languages } = localizedAlternates("/", locale);

  const title = isSpanish ? DEFAULT_TITLE.es : DEFAULT_TITLE.en;
  const description = isSpanish ? DEFAULT_DESCRIPTION.es : DEFAULT_DESCRIPTION.en;

  return {
    title: {
      default: title,
      template: `%s | GM Attorneys`,
    },
    description,
    keywords: [
      "GM Attorneys",
      "Costa Rica law firm",
      "abogados Costa Rica",
      "real estate lawyer Costa Rica",
      "immigration lawyer Costa Rica",
      "Guanacaste attorney",
    ],
    authors: [{ name: "GM Attorneys", url: "https://gmattorneyscr.com" }],
    creator: "GM Attorneys",
    publisher: "GM Attorneys",
    metadataBase: new URL(
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "https://gmattorneyscr.com"
    ),
    alternates: { canonical, languages },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_CR" : "en_US",
      url: path,
      siteName: "GM Attorneys",
      title,
      description,
      images: [
        {
          url: "/assets/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "GM Attorneys",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/assets/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  return (
    <html lang={locale} className={`${manrope.variable} ${arial.variable}`}>
      <head>
        <JsonLd />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="antialiased font-sans" suppressHydrationWarning>
        <NextIntlClientProvider>
          <LoadingProvider>
            <ContactDrawerProvider>
              <LenisProvider />
              <AOSInit />
              <StickyCtaButtons />
              <ContactDrawer />
              {children}
            </ContactDrawerProvider>
          </LoadingProvider>
        </NextIntlClientProvider>
        {gaMeasurementId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaMeasurementId}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
