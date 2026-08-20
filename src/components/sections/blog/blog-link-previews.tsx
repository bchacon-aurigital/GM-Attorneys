"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { LinkPreviewCard } from "@/components/ui/link-preview-card";

interface BlogLinkPreviewsProps {
  // Ref to the article container whose innerHTML holds the placeholder
  // divs (data-link-preview-url) inserted server-side by
  // replaceStandaloneLinksWithPreviews.
  containerRef: React.RefObject<HTMLElement | null>;
}

interface PreviewSlot {
  url: string;
  element: HTMLElement;
}

// Scans the (already-hydrated, raw-HTML) article for
// [data-link-preview-url] placeholders and portals a <LinkPreviewCard>
// into each one. Runs once after mount — the placeholders come from static
// HTML set via dangerouslySetInnerHTML, so there's nothing to react to
// beyond the initial render.
export function BlogLinkPreviews({ containerRef }: BlogLinkPreviewsProps) {
  const [slots, setSlots] = useState<PreviewSlot[]>([]);
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    const container = containerRef.current;
    if (!container) return;

    const placeholders = container.querySelectorAll<HTMLElement>("[data-link-preview-url]");
    const found: PreviewSlot[] = [];
    placeholders.forEach((el) => {
      const url = el.getAttribute("data-link-preview-url");
      if (url) found.push({ url, element: el });
    });

    setSlots(found);
  }, [containerRef]);

  return (
    <>
      {slots.map(({ url, element }) =>
        createPortal(<LinkPreviewCard url={url} />, element)
      )}
    </>
  );
}
