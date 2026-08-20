import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import Navbar from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Section } from "@/components/ui/section";
import { Link } from "@/i18n/navigation";
import {
  getPostBySlug,
  getAllPostSlugs,
  getRelatedPosts,
  getFeaturedImageUrl,
  getAuthorName,
  getCategoryName,
  formatDate,
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
        <Section className="!pt-6">
          <article className="flex flex-col gap-8 sm:gap-10 max-w-[900px] mx-auto">
            <Link
              href="/blog"
              className="flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors duration-150 w-fit"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {t("backToBlog")}
            </Link>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded bg-[#240824] border border-[#240824] px-4 py-2 text-sm font-semibold uppercase text-white">
                  {formatDate(post.date, locale)}
                </span>
                <span className="text-sm text-black/50">
                  By {getAuthorName(post)} · {getCategoryName(post)}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-[#240824]">
                {post.title}
              </h1>
            </div>

            {imageUrl && (
              <div className="relative w-full aspect-[16/9] rounded overflow-hidden">
                <Image
                  src={imageUrl}
                  alt={post.featuredImage?.node.altText || post.title}
                  fill
                  sizes="(min-width: 1024px) 900px, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div
              className="prose prose-sm sm:prose-base max-w-none prose-headings:text-[#240824] prose-headings:font-bold prose-a:text-[#240824] prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </article>

          {relatedPosts.length > 0 && (
            <div className="flex flex-col gap-8 sm:gap-10 mt-16 sm:mt-24 pt-10 border-t border-black/10">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#240824]">
                {t("relatedPosts")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10">
                {relatedPosts.map((related) => (
                  <BlogPostCard key={related.id} post={related} locale={locale} />
                ))}
              </div>
            </div>
          )}
        </Section>
      </main>
      <Footer variant="dark" />
    </>
  );
}
