import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import "../globals.css";
import { LoadingProvider } from "./context/LoadingContext";
import Script from "next/script";
import AOSInit from "@/components/AOSInit";
import LenisProvider from "@/components/LenisProvider";
import JsonLd from "@/components/JsonLd";
import { manrope, inter } from "@/lib/fonts";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  const languages: Record<string, string> = {
    "es-CR": "/",
    "en-US": "/en",
    "x-default": "/",
  };

  return {
    title: {
      default: "",
      template: "%s | ",
    },
    description: "",
    keywords: [""],
    authors: [{ name: "", url: "" }],
    creator: "",
    publisher: "",
    metadataBase: new URL("https://gmattorneyscr.com"),
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages,
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_CR" : "en_US",
      url: locale === routing.defaultLocale ? "/" : `/${locale}`,
      siteName: "",
      title: "",
      description: "",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "",
      description: "",
      images: ["/og-image.jpg"],
      creator: "@",
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
    verification: {
      google: "",
      yandex: "",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale as Locale);

  return (
    <html lang={locale} className={`${manrope.variable} ${inter.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body className="antialiased font-sans">
        <NextIntlClientProvider>
          <LoadingProvider>
            <LenisProvider />
            <AOSInit />
            {children}
          </LoadingProvider>
        </NextIntlClientProvider>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-');
          `}
        </Script>
      </body>
    </html>
  );
}
