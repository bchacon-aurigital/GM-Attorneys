import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Services } from "@/components/sections/services/services";
import { localizedAlternates } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const TITLE = {
  es: "Áreas de Práctica",
  en: "Practice Areas",
};

const DESCRIPTION = {
  es: "Bienes raíces, derecho corporativo, inmigración, derecho tributario, planificación patrimonial, servicios notariales y más. Asesoría legal integral en Costa Rica.",
  en: "Real estate, corporate law, immigration, tax law, estate planning, notary services, and more. Comprehensive legal advisory in Costa Rica.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path, canonical, languages } = localizedAlternates("/practice-areas", locale);

  return {
    title: isSpanish ? TITLE.es : TITLE.en,
    description: isSpanish ? DESCRIPTION.es : DESCRIPTION.en,
    alternates: { canonical, languages },
    openGraph: { url: path },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isSpanish = locale === "es";
  const { path } = localizedAlternates("/practice-areas", locale);

  return (
    <>
      <BreadcrumbSchema
        path={path}
        name={isSpanish ? TITLE.es : TITLE.en}
        homeLabel={isSpanish ? "Inicio" : "Home"}
      />
      <Navbar variant="default" />
      <main>
        <Services />
      </main>
      <Footer variant="dark" />
    </>
  );
}
