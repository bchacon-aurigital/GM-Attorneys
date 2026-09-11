import { Suspense } from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { BlogListing } from "@/components/sections/blog/blog-listing";
import { getPosts, getCategories } from "@/lib/wordpress";
import { type Locale } from "@/i18n/routing";
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
  const isSpanish = locale === "es";
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
  const isSpanish = locale === "es";
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
              <h1 className="sr-only">GM {t("title")}</h1>
              <div
                aria-hidden="true"
                className="flex items-baseline gap-[0.14em] font-medium uppercase tracking-tight text-black leading-none"
                style={{ fontSize: "clamp(2.5rem, 18.8vw, 30rem)" }}
              >
                <svg
                  viewBox="0 0 260 80"
                  style={{ height: "0.72em", width: "auto", flexShrink: 0 }}
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M24.471 0H103.453C103.435 4.31029 103.558 9.76703 103.333 13.9837L48.8508 13.9658C44.3266 13.9656 17.7169 13.3644 15.6746 15.1186C15.169 17.3084 15.2095 34.9961 15.3502 38.0178C15.67 44.8887 14.9459 55.6847 15.4222 62.267C17.1927 64.1188 18.8122 65.7847 21.5592 65.6364C30.7065 65.1422 43.7496 66.4065 52.5929 65.6934C61.2638 64.9936 91.2246 67.1365 97.1225 64.9447C98.778 62.3117 98.1365 48.809 98.111 45.137C91.6237 45.1198 35.7134 45.4055 34.7246 44.7069C45.9607 28.3237 43.9892 30.8404 65.1878 31.0715C79.6564 31.2293 95.4653 30.3074 109.84 31.7316C114.458 32.1892 112.622 55.9837 112.722 59.6538C113.012 70.3188 100.225 62.3976 96.4356 69.5766C94.238 72.9617 91.0383 78.9703 86.8111 79.6327C77.5706 80.0456 67.9609 79.8741 58.6862 79.8748L31.1007 79.8588C23.1972 79.8489 13.198 81.0189 6.56944 76.79C2.32112 74.0794 2.15809 70.3497 0 67.1502V17.7646C5.16481 10.1124 8.58281 16.0367 14.3498 12.1253C17.4535 10.0203 20.5322 3.29864 24.471 0Z" />
                  <path d="M150.722 0H163.148C163.991 0.586526 165.468 1.61241 165.881 2.50761C168.272 7.68501 170.282 13.6887 172.209 19.0478L183.097 49.3101C184.886 54.2449 187.195 61.2042 189.297 65.8565C191.889 65.8691 194.552 65.915 197.137 65.8924L212.711 22.7549C215.124 16.1252 217.641 8.58661 220.557 2.13364C220.911 1.34906 222.264 0.496954 223.036 0H256.501C258.299 1.22342 259.742 2.17386 259.798 4.52025C260.215 22.1137 259.837 39.7563 259.959 57.3618C260.01 64.8341 260.021 72.4195 259.744 79.8849C254.959 79.9323 250.174 79.9032 245.389 79.797C245.024 73.104 245.311 63.9015 245.313 57.0595L245.283 13.9662C240.461 13.9592 235.99 13.9734 231.168 14.1905C226.729 28.1337 220.986 42.1386 216.326 56.0718C213.704 63.9122 210.724 72.2012 207.667 79.8872C199.018 79.8998 187.328 80.204 178.937 79.7572C176.698 74.2954 174.058 66.0163 171.89 60.1474L154.795 13.9524C151.635 13.9292 144.704 13.6154 142.1 14.7062C141.332 15.6991 141.186 16.8421 141.167 18.0919C140.858 38.6788 141.297 59.3237 141.038 79.9097L126.317 79.8444C126.229 71.9895 125.43 21.0926 126.766 16.8767C128.349 11.8775 136.185 14.5597 139.809 12.517C144.576 9.83007 145.749 2.52716 150.722 0Z" />
                </svg>
                <span>{t("title")}</span>
              </div>
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
