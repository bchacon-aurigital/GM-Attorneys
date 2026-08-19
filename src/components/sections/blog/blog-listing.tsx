"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { BlogPostCard } from "@/components/ui/blog-post-card";
import type { WPCategory, WPPost } from "@/lib/wordpress";
import { cn } from "@/lib/utils";

interface BlogListingProps {
  posts: WPPost[];
  categories: WPCategory[];
  locale: "es" | "en";
}

const POSTS_PER_PAGE = 9;

export function BlogListing({ posts, categories, locale }: BlogListingProps) {
  const t = useTranslations("blog");

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        !selectedCategory || post.categories.nodes.some((c) => c.id === selectedCategory);
      const matchesSearch =
        !search || post.title.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, search]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(page, totalPages);
  const paginatedPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  const selectedCategoryName =
    categories.find((c) => c.id === selectedCategory)?.name ?? t("sortAll");

  return (
    <div className="flex flex-col gap-8 sm:gap-10 w-full">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 border-b border-[#d4d5dd] pb-6">
        <div className="relative sm:w-[299px]" ref={sortRef}>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            aria-expanded={isSortOpen}
            className="flex w-full items-center justify-between gap-2 rounded border-[1.5px] border-black/20 px-4 sm:px-5 py-3 text-sm sm:text-base font-medium text-black"
          >
            <span>{t("sortBy")}</span>
            <span className="flex items-center gap-2">
              {selectedCategoryName}
              <svg
                width="11"
                height="6"
                viewBox="0 0 11 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className={cn("transition-transform duration-200", isSortOpen ? "rotate-180" : "")}
              >
                <path d="M1 1L5.5 5L10 1" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>

          {isSortOpen && (
            <div className="absolute left-0 right-0 top-full z-10 mt-2 overflow-hidden rounded border-[1.5px] border-black/20 bg-white max-h-64 overflow-y-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory(null);
                  setPage(1);
                  setIsSortOpen(false);
                }}
                className={cn(
                  "block w-full px-4 sm:px-5 py-3 text-left text-sm sm:text-base font-medium transition-colors duration-150 hover:bg-black/5",
                  !selectedCategory ? "text-black" : "text-black/60"
                )}
              >
                {t("sortAll")}
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setPage(1);
                    setIsSortOpen(false);
                  }}
                  className={cn(
                    "block w-full px-4 sm:px-5 py-3 text-left text-sm sm:text-base font-medium transition-colors duration-150 hover:bg-black/5",
                    selectedCategory === category.id ? "text-black" : "text-black/60"
                  )}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <label className="flex items-center justify-between gap-2 rounded border-[1.5px] border-black/20 px-4 sm:px-5 py-3 sm:w-[299px]">
          <input
            type="search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder={t("search")}
            aria-label={t("search")}
            className="w-full bg-transparent text-sm sm:text-base font-medium text-black placeholder:text-black outline-none"
          />
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="shrink-0">
            <circle cx="9" cy="9" r="7" stroke="black" strokeWidth="1.5" />
            <path d="M19 19L14.5 14.5" stroke="black" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </label>
      </div>

      {paginatedPosts.length === 0 ? (
        <p className="py-16 text-center text-sm sm:text-base text-black/50">{t("noResults")}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-12">
          {paginatedPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-4">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            aria-label={t("previousPage")}
            className="flex size-9 items-center justify-center rounded bg-[#edeff5] disabled:opacity-40"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M8 2L4 6L8 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2 text-lg font-semibold">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setPage(pageNum)}
                className={cn(
                  "transition-colors duration-150",
                  pageNum === currentPage ? "text-black font-extrabold" : "text-[#a8a8a8]"
                )}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            aria-label={t("nextPage")}
            className="flex size-9 items-center justify-center rounded bg-[#edeff5] disabled:opacity-40"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 2L8 6L4 10" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
