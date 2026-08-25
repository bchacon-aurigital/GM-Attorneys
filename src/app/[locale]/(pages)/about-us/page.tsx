import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { AboutHero } from "@/components/sections/about/about-hero";
import { AboutValues } from "@/components/sections/about/about-values";
import { AboutImpact } from "@/components/sections/about/about-impact";
import { AboutFaq } from "@/components/sections/about/about-faq";
import { StoreLocator } from "@/components/sections/about/store-locator";
import { OfficesStack } from "@/components/sections/about/offices-stack";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const TITLE = {
  es: "Sobre Nosotros",
  en: "About Us",
};

const DESCRIPTION = {
  es: "Conoce a GM Attorneys: más de 45 años de trayectoria como despacho legal boutique en Costa Rica, con presencia en San José, Flamingo, Tamarindo y Nosara.",
  en: "Meet GM Attorneys: over 45 years of experience as a boutique law firm in Costa Rica, with offices in San José, Flamingo, Tamarindo, and Nosara.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === routing.defaultLocale;
  const { path, canonical, languages } = localizedAlternates("/about-us", locale);

  return {
    title: isSpanish ? TITLE.es : TITLE.en,
    description: isSpanish ? DESCRIPTION.es : DESCRIPTION.en,
    alternates: { canonical, languages },
    openGraph: { url: path },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isSpanish = locale === routing.defaultLocale;
  const { path } = localizedAlternates("/about-us", locale);

  return (
    <>
      <BreadcrumbSchema
        path={path}
        name={isSpanish ? TITLE.es : TITLE.en}
        homeLabel={isSpanish ? "Inicio" : "Home"}
      />
      <Navbar variant="default" />
      <main>
        <AboutHero />
        <AboutValues />
        <AboutImpact />
        <OfficesStack />
        <StoreLocator variant="light" />
        <AboutFaq curveCornerColor="#ffffff" />
      </main>
      <Footer variant="dark" />
    </>
  );
}
