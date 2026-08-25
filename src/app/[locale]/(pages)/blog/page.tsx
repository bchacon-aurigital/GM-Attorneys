import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { BlogListing } from "@/components/sections/blog/blog-listing";
import { getPosts, getCategories } from "@/lib/wordpress";
import { routing, type Locale } from "@/i18n/routing";
import { localizedAlternates } from "@/lib/seo";
import { BreadcrumbSchema } from "@/components/BreadcrumbSchema";

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

const TITLE = {
  es: "Blog",
  en: "Blog",
};

const DESCRIPTION = {
  es: "Noticias legales, análisis y actualizaciones sobre el sistema jurídico costarricense: bienes raíces, inmigración, derecho corporativo y tributario.",
  en: "Legal news, insights, and updates on the Costa Rican legal system: real estate, immigration, corporate law, and tax law.",
};

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale } = await params;
  const isSpanish = locale === routing.defaultLocale;
  const { path, canonical, languages } = localizedAlternates("/blog", locale);

  return {
    title: isSpanish ? TITLE.es : TITLE.en,
    description: isSpanish ? DESCRIPTION.es : DESCRIPTION.en,
    alternates: { canonical, languages },
    openGraph: { url: path },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const isSpanish = locale === routing.defaultLocale;
  const { path } = localizedAlternates("/blog", locale);
  const t = await getTranslations("blog");

  const [{ posts }, categories] = await Promise.all([
    getPosts({ first: 100 }),
    getCategories(),
  ]);

  return (
    <>
      <BreadcrumbSchema
        path={path}
        name={isSpanish ? TITLE.es : TITLE.en}
        homeLabel={isSpanish ? "Inicio" : "Home"}
      />
      <Navbar variant="default" />
      <main>
        <Section className="!pt-6">
          <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
            <div>
              <h1 className="sr-only">{t("title")}</h1>
              <object
                data="/assets/blog/THE BLOG.svg"
                type="image/svg+xml"
                aria-label={t("title")}
                className="block w-full aspect-[1846/316]"
              >
                <img src="/assets/blog/THE BLOG.svg" alt={t("title")} className="block w-full aspect-[1846/316]" />
              </object>
            </div>

            <Suspense fallback={null}>
              <BlogListing posts={posts} categories={categories} locale={locale} />
            </Suspense>
          </div>
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
