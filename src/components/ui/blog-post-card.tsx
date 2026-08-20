"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
  variant?: "light" | "dark";
  className?: string;
}

const MotionLink = motion.create(Link);

export function BlogPostCard({ post, locale, variant = "light", className }: BlogPostCardProps) {
  const isDark = variant === "dark";
  const imageUrl = getFeaturedImageUrl(post);
  const category = getCategoryName(post);
  const author = getAuthorName(post);
  const date = formatDate(post.date, locale);
  const excerpt = cleanHtml(post.excerpt);

  return (
    <MotionLink
      href={`/blog/${post.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -80px 0px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
        {!isDark && (
          <span className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded backdrop-blur-[10.45px] bg-black/[0.08] border border-white/[0.12] px-3 sm:px-5 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-white">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:gap-4">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <span
            className={cn(
              "rounded px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold whitespace-nowrap",
              isDark
                ? "border border-white/[0.12] text-white/60"
                : "bg-[#240824] border border-[#240824] uppercase text-white"
            )}
          >
            {isDark ? category : date}
          </span>
          <span className={cn("text-xs sm:text-sm", isDark ? "text-white/50" : "text-black/50")}>
            By {author}
          </span>
        </div>

        <p
          className={cn(
            "text-base sm:text-lg font-medium tracking-tight line-clamp-2",
            isDark ? "text-white" : "font-bold uppercase text-[#240824]"
          )}
        >
          {post.title}
        </p>

        <p
          className={cn(
            "text-sm sm:text-base font-medium line-clamp-3",
            isDark ? "text-white/60" : "text-[#240824]/50"
          )}
        >
          {excerpt}
        </p>
      </div>
    </MotionLink>
  );
}
