import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  cleanHtml,
  formatDate,
  getAuthorName,
  getCategoryName,
  getFeaturedImageUrl,
  type WPPost,
} from "@/lib/wordpress";
import { cn } from "@/lib/utils";

interface BlogPostCardProps {
  post: WPPost;
  locale: "es" | "en";
  className?: string;
}

export function BlogPostCard({ post, locale, className }: BlogPostCardProps) {
  const imageUrl = getFeaturedImageUrl(post);
  const category = getCategoryName(post);
  const author = getAuthorName(post);
  const date = formatDate(post.date, locale);
  const excerpt = cleanHtml(post.excerpt);

  return (
    <Link
      href={`/blog/${post.slug}`}
      data-aos="fade-up"
      className={cn("flex flex-col gap-4 sm:gap-6 h-full", className)}
    >
      <div className="relative w-full aspect-[610/430] rounded overflow-hidden bg-black/[0.08]">
        {imageUrl && (
          <Image
            src={imageUrl}
            alt={post.featuredImage?.node.altText || post.title}
            fill
            sizes="(min-width: 1024px) 33vw, 100vw"
            className="object-cover"
          />
        )}
        <span className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded backdrop-blur-[10.45px] bg-black/[0.08] border border-white/[0.12] px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white">
          {category}
        </span>
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span className="rounded bg-[#240824] border border-[#240824] px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold uppercase text-white whitespace-nowrap">
            {date}
          </span>
          <span className="text-xs sm:text-sm text-black/50">By {author}</span>
        </div>

        <p className="text-base sm:text-lg font-bold uppercase tracking-tight text-[#240824] line-clamp-2">
          {post.title}
        </p>

        <p className="text-sm sm:text-base font-medium text-[#240824]/50 line-clamp-3">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
