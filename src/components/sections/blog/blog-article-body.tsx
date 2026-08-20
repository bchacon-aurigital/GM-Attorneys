"use client";

import { useRef } from "react";
import { BlogLinkPreviews } from "./blog-link-previews";

interface BlogArticleBodyProps {
  html: string;
  className?: string;
}

// Client wrapper around the raw post HTML so BlogLinkPreviews can get a ref
// to it and portal <LinkPreviewCard>s into the standalone-link placeholders
// inserted server-side (see replaceStandaloneLinksWithPreviews).
export function BlogArticleBody({ html, className }: BlogArticleBodyProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <>
      <article
        ref={ref}
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <BlogLinkPreviews containerRef={ref} />
    </>
  );
}
