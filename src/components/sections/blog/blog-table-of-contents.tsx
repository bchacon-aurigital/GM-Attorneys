"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import type { Heading } from "@/lib/wordpress";
import { cn } from "@/lib/utils";

interface BlogTableOfContentsProps {
  headings: Heading[];
}

export function BlogTableOfContents({ headings }: BlogTableOfContentsProps) {
  const t = useTranslations("blog");
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: "-96px 0px -70% 0px" }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label={t("onThisPage")}
      className="hidden lg:flex flex-col gap-6 w-[280px] xl:w-[340px] shrink-0 sticky top-24 self-start"
    >
      <p className="border-b border-[#d4d5dd] pb-4 text-xl font-bold tracking-tight text-[#2f3037]">
        {t("onThisPage")}
      </p>
      <div className="flex flex-col gap-3">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block py-3 text-base leading-snug transition-colors duration-150",
                heading.level === 3 ? "pl-6" : "",
                isActive
                  ? "border-l-4 border-[#01a299] pl-6 font-semibold text-[#01a299]"
                  : "border-l-4 border-transparent text-[#2f3037]/60 hover:text-[#2f3037]"
              )}
            >
              {heading.text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
