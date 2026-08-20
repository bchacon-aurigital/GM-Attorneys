import { NextRequest, NextResponse } from "next/server";

// Generic Open Graph link-preview endpoint. Fetches a URL's HTML server-side
// and extracts og:title/og:description/og:image (falling back to <title> /
// meta description) so blog posts can render a rich card for any link —
// internal (another GM Attorneys post) or external — without a third-party
// service. Results are cached for 24h via Next's fetch cache, keyed by URL.
//
// GET /api/link-preview?url=<encoded URL>

interface LinkPreviewData {
  url: string;
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
}

function extractMeta(html: string, patterns: RegExp[]): string | null {
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return null;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .trim();
}

function resolveUrl(maybeRelative: string, baseUrl: string): string {
  try {
    return new URL(maybeRelative, baseUrl).toString();
  } catch {
    return maybeRelative;
  }
}

function metaTag(property: string): RegExp[] {
  return [
    new RegExp(`<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["']`, "i"),
  ];
}

function metaName(name: string): RegExp[] {
  return [
    new RegExp(`<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["']`, "i"),
    new RegExp(`<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["']`, "i"),
  ];
}

async function fetchLinkPreview(url: string): Promise<LinkPreviewData> {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; GMAttorneysBot/1.0; +https://gmattorneyscr.com)",
    },
    next: { revalidate: 86400 },
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status}`);
  }

  // Only read the head — OG tags always live there, and this avoids
  // buffering multi-MB article HTML just to read a few meta tags.
  const reader = res.body?.getReader();
  let html = "";
  if (reader) {
    const decoder = new TextDecoder();
    while (html.length < 100_000) {
      const { done, value } = await reader.read();
      if (done) break;
      html += decoder.decode(value, { stream: true });
      if (/<\/head>/i.test(html)) break;
    }
    reader.cancel().catch(() => {});
  } else {
    html = await res.text();
  }

  const title =
    extractMeta(html, metaTag("og:title")) ??
    extractMeta(html, [/<title[^>]*>([^<]*)<\/title>/i]);

  const description =
    extractMeta(html, metaTag("og:description")) ??
    extractMeta(html, metaName("description"));

  const rawImage =
    extractMeta(html, metaTag("og:image")) ?? extractMeta(html, metaTag("og:image:url"));
  const image = rawImage ? resolveUrl(rawImage, url) : null;

  const siteName =
    extractMeta(html, metaTag("og:site_name")) ?? new URL(url).hostname.replace(/^www\./, "");

  return { url, title, description, image, siteName };
}

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
    return NextResponse.json({ error: "Unsupported protocol" }, { status: 400 });
  }

  try {
    const preview = await fetchLinkPreview(parsed.toString());
    return NextResponse.json(preview, {
      headers: { "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800" },
    });
  } catch (error) {
    console.error("Error fetching link preview:", error);
    return NextResponse.json(
      { url: parsed.toString(), title: null, description: null, image: null, siteName: parsed.hostname },
      { status: 200 }
    );
  }
}
