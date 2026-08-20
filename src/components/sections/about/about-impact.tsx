import { getTranslations, getLocale } from "next-intl/server";
import { Section } from "@/components/ui/section";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import { getPosts } from "@/lib/wordpress";
import type { Locale } from "@/i18n/routing";

export async function AboutImpact() {
  const t = await getTranslations("about");
  const locale = (await getLocale()) as Locale;
  const { posts } = await getPosts({ first: 3 });

  if (posts.length === 0) return null;

  return (
    <Section>
      <div className="flex flex-col gap-10 sm:gap-16 lg:gap-20">
        <p className="text-5xl sm:text-7xl lg:text-8xl xl:text-[140px] font-medium uppercase tracking-tight text-[#240824] leading-none">
          {t("impactTitle")}
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </Section>
  );
}
