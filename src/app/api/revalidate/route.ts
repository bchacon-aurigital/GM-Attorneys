import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getPostBySlug, getPostUrl } from "@/lib/wordpress";

// On-demand revalidation webhook. Configure WordPress (e.g. via a small
// plugin or the WPGraphQL Gatsby/webhook helper) to POST here whenever a
// post is published or updated, so the ISR cache refreshes immediately
// instead of waiting for the next scheduled revalidation.
//
// POST /api/revalidate?secret=WORDPRESS_REVALIDATE_SECRET
// Body (optional): { "slug": "post-slug" } to also revalidate that post's page.

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (!process.env.WORDPRESS_REVALIDATE_SECRET) {
    return NextResponse.json(
      { message: "WORDPRESS_REVALIDATE_SECRET is not configured" },
      { status: 500 }
    );
  }

  if (secret !== process.env.WORDPRESS_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  let slug: string | undefined;
  try {
    const body = await request.json();
    slug = body?.slug;
  } catch {
    // No body / not JSON — still revalidate the listing.
  }

  revalidatePath("/[locale]/blog", "page");
  revalidatePath("/[locale]/(pages)/blog", "page");
  revalidateTag("wp-posts", { expire: 0 });

  if (slug) {
    const post = await getPostBySlug(slug);
    if (post) {
      revalidatePath(`/[locale]${getPostUrl(post)}`, "page");
    }
    revalidateTag(`wp-post-${slug}`, { expire: 0 });
  }

  return NextResponse.json({ revalidated: true, slug: slug ?? null, now: Date.now() });
}
