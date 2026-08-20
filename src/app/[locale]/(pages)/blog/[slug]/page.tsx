import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { BlogTableOfContents } from "@/components/sections/blog/blog-table-of-contents";
import { BlogArticleBody } from "@/components/sections/blog/blog-article-body";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  getFeaturedImageUrl,
  getAuthorName,
  getCategoryName,
  formatDate,
  addHeadingIdsAndExtract,
  replaceStandaloneLinksWithPreviews,
} from "@/lib/wordpress";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import type { Locale } from "@/i18n/routing";

interface BlogPostPageProps {
  params: Promise<{ locale: Locale; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "Post not found" };
  }

  const seo = post.seo;
  const imageUrl = seo?.opengraphImage?.sourceUrl || getFeaturedImageUrl(post) || undefined;

  return {
    title: seo?.title || post.title,
    description: seo?.metaDesc || undefined,
    alternates: {
      canonical: seo?.canonical || undefined,
    },
    openGraph: {
      title: seo?.opengraphTitle || seo?.title || post.title,
      description: seo?.opengraphDescription || seo?.metaDesc || undefined,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle || seo?.title || post.title,
      description: seo?.twitterDescription || seo?.metaDesc || undefined,
      images: seo?.twitterImage?.sourceUrl ? [seo.twitterImage.sourceUrl] : imageUrl ? [imageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { locale, slug } = await params;
  const t = await getTranslations("blog");
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const categorySlug = post.categories.nodes[0]?.slug;
  const relatedPosts = categorySlug ? await getRelatedPosts(categorySlug, post.id, 3) : [];
  const imageUrl = getFeaturedImageUrl(post);
  const jsonLd = post.seo?.schema?.raw;
  const { html: withHeadingIds, headings } = addHeadingIdsAndExtract(post.content);
  const contentHtml = replaceStandaloneLinksWithPreviews(withHeadingIds);

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
      )}

      <Navbar variant="default" />
      <main>
        <Section className="!pt-16 sm:!pt-20">
          <div className="flex flex-col items-center gap-9">
            <div className="flex flex-col items-center gap-6 sm:gap-9">
              <span className="rounded-lg border border-black/[0.12] px-6 sm:px-8 py-3 text-base sm:text-xl font-semibold text-black/50">
                {getCategoryName(post)}
              </span>

              <div className="flex flex-col items-center gap-4 sm:gap-6 max-w-3xl">
                <h1 className="text-center text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#2f3037] leading-tight">
                  {post.title}
                </h1>
                <p className="text-sm sm:text-lg">
                  <span className="font-semibold text-[#2f3037]/80">{getAuthorName(post)}</span>
                  <span className="text-[#2f3037]"> </span>
                  <span className="font-semibold text-[#2f3037]/60">
                    - {formatDate(post.date, locale)}
                  </span>
                </p>
              </div>
            </div>

            {imageUrl && (
              <div className="relative w-full aspect-[16/9] sm:aspect-[1856/908] rounded-lg overflow-hidden bg-black/[0.08]">
                <Image
                  src={imageUrl}
                  alt={post.featuredImage?.node.altText || post.title}
                  fill
                  sizes="(min-width: 1024px) 1856px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-14 mt-8 sm:mt-10">
            <BlogTableOfContents headings={headings} />

            <BlogArticleBody html={contentHtml} className="blog-content flex-1 min-w-0" />
          </div>
        </Section>

        {relatedPosts.length > 0 && (
          <section className="bg-white py-16 sm:py-20">
            <div className="w-full px-4 sm:px-6 lg:px-10">
              <p className="text-4xl sm:text-6xl lg:text-8xl font-medium uppercase tracking-tight text-[#240824] mb-10 sm:mb-14">
                {t("otherArticles")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10">
                {relatedPosts.map((related) => (
                  <BlogPostCard key={related.id} post={related} locale={locale} variant="light" />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer variant="dark" />
    </>
  );
}
