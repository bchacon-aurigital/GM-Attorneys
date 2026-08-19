import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { BlogListing } from "@/components/sections/blog/blog-listing";
import { getPosts, getCategories } from "@/lib/wordpress";
import type { Locale } from "@/i18n/routing";

interface BlogPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { locale } = await params;
  const t = await getTranslations("blog");

  const [{ posts }, categories] = await Promise.all([
    getPosts({ first: 100 }),
    getCategories(),
  ]);

  return (
    <>
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

            <BlogListing posts={posts} categories={categories} locale={locale} />
          </div>
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
