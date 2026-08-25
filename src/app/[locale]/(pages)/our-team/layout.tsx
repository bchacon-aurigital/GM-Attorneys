import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

const TITLE = {
  es: "Nuestro Equipo",
  en: "Our Team",
};

const DESCRIPTION = {
  es: "Conoce a los abogados, notarios y asesores de GM Attorneys: un equipo con décadas de experiencia en bienes raíces, derecho corporativo e inmigración en Costa Rica.",
  en: "Meet the attorneys, notaries, and advisors of GM Attorneys: a team with decades of experience in real estate, corporate law, and immigration in Costa Rica.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === routing.defaultLocale;
  const { path, canonical, languages } = localizedAlternates("/our-team", locale);

  return {
    title: isSpanish ? TITLE.es : TITLE.en,
    description: isSpanish ? DESCRIPTION.es : DESCRIPTION.en,
    alternates: { canonical, languages },
    openGraph: { url: path },
  };
}

export default async function OurTeamLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isSpanish = locale === routing.defaultLocale;
  const { path } = localizedAlternates("/our-team", locale);

  return (
    <>
      <BreadcrumbSchema
        path={path}
        name={isSpanish ? TITLE.es : TITLE.en}
        homeLabel={isSpanish ? "Inicio" : "Home"}
      />
      {children}
    </>
  );
}
