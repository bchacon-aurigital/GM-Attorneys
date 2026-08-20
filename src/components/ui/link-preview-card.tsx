"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LinkPreviewData {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
}

interface LinkPreviewCardProps {
  url: string;
}

export function LinkPreviewCard({ url }: LinkPreviewCardProps) {
  const [data, setData] = useState<LinkPreviewData | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(`/api/link-preview?url=${encodeURIComponent(url)}`)
      .then((res) => res.json())
      .then((json: LinkPreviewData) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });

    return () => {
      cancelled = true;
    };
  }, [url]);

  // While loading, or if the fetch failed entirely, fall back to a plain
  // link so the content never disappears.
  if (failed || (data && !data.title)) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block text-[#01a299] underline underline-offset-2 break-all"
      >
        {url}
      </a>
    );
  }

  if (!data) {
    return (
      <span className="flex items-center gap-4 rounded-lg border border-black/[0.12] p-5 animate-pulse">
        <span className="h-24 w-36 shrink-0 rounded bg-black/[0.06]" />
        <span className="flex flex-1 flex-col gap-2">
          <span className="h-4 w-2/3 rounded bg-black/[0.06]" />
          <span className="h-3 w-full rounded bg-black/[0.06]" />
        </span>
      </span>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col sm:flex-row gap-4 sm:gap-8 items-stretch sm:items-center rounded-lg border border-black/[0.12] overflow-hidden sm:p-5 !no-underline hover:border-black/[0.24] transition-colors duration-150"
    >
      {data.image && (
        <span className="relative w-full sm:w-[232px] aspect-[3/2] shrink-0 rounded overflow-hidden bg-black/[0.08]">
          <Image src={data.image} alt="" fill sizes="232px" className="object-cover" />
        </span>
      )}
      <span className="flex flex-1 min-w-0 flex-col gap-2 p-4 sm:p-0">
        {data.siteName && (
          <span className="w-fit rounded bg-[#e5e5e5] px-4 py-2 text-sm font-semibold text-[#8c8c8c]">
            {data.siteName}
          </span>
        )}
        <span className="text-lg font-medium text-black/90 line-clamp-2">{data.title}</span>
        {data.description && (
          <span className="text-base text-black/50 line-clamp-2">{data.description}</span>
        )}
      </span>
    </a>
  );
}
