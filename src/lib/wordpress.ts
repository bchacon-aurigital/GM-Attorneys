// WordPress Headless client via WPGraphQL.
//
// Requires in WordPress: WPGraphQL, WPGraphQL for Yoast SEO (or Rank Math's
// GraphQL integration), and WPGraphQL CORS restricted to this app's origin.
// See .env.local for WORDPRESS_GRAPHQL_URL / WORDPRESS_REVALIDATE_SECRET.

const WORDPRESS_GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL;

export interface WPImage {
  sourceUrl: string;
  altText: string;
  mediaDetails?: {
    width: number;
    height: number;
  };
}

export interface WPSeo {
  title: string | null;
  metaDesc: string | null;
  canonical: string | null;
  opengraphTitle: string | null;
  opengraphDescription: string | null;
  opengraphImage: { sourceUrl: string } | null;
  twitterTitle: string | null;
  twitterDescription: string | null;
  twitterImage: { sourceUrl: string } | null;
  schema: { raw: string | null } | null;
}

export interface WPCategory {
  id: string;
  slug: string;
  name: string;
}

export interface WPAuthor {
  node: {
    name: string;
  };
}

export interface WPPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  featuredImage: { node: WPImage } | null;
  categories: { nodes: WPCategory[] };
  author: WPAuthor;
  seo?: WPSeo;
}

interface GraphQLResponse<T> {
  data?: T;
  errors?: { message: string }[];
}

async function fetchGraphQL<T>(
  query: string,
  variables: Record<string, unknown> = {},
  revalidate: number | false = 3600
): Promise<T | null> {
  if (!WORDPRESS_GRAPHQL_URL) {
    console.error(
      "WORDPRESS_GRAPHQL_URL is not set. Add it to .env.local once WPGraphQL is live."
    );
    return null;
  }

  try {
    const res = await fetch(WORDPRESS_GRAPHQL_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables }),
      next: revalidate === false ? undefined : { revalidate },
      cache: revalidate === false ? "no-store" : undefined,
    });

    if (!res.ok) {
      throw new Error(`WPGraphQL request failed: ${res.status}`);
    }

    const json: GraphQLResponse<T> = await res.json();

    if (json.errors?.length) {
      console.error("WPGraphQL errors:", json.errors);
      return null;
    }

    return json.data ?? null;
  } catch (error) {
    console.error("Error fetching from WPGraphQL:", error);
    return null;
  }
}

const SEO_FIELDS = `
  seo {
    title
    metaDesc
    canonical
    opengraphTitle
    opengraphDescription
    opengraphImage { sourceUrl }
    twitterTitle
    twitterDescription
    twitterImage { sourceUrl }
    schema { raw }
  }
`;

const POST_CARD_FIELDS = `
  id
  slug
  title
  excerpt
  date
  featuredImage {
    node {
      sourceUrl
      altText
      mediaDetails { width height }
    }
  }
  categories {
    nodes { id slug name }
  }
  author {
    node { name }
  }
`;

export interface GetPostsOptions {
  first?: number;
  after?: string | null;
  categoryId?: string | null;
  search?: string | null;
}

export interface GetPostsResult {
  posts: WPPost[];
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string | null;
  };
}

export async function getPosts({
  first = 9,
  after = null,
  categoryId = null,
  search = null,
}: GetPostsOptions = {}): Promise<GetPostsResult> {
  const query = `
    query GetPosts($first: Int!, $after: String, $where: RootQueryToPostConnectionWhereArgs) {
      posts(first: $first, after: $after, where: $where) {
        pageInfo { hasNextPage endCursor }
        nodes { ${POST_CARD_FIELDS} }
      }
    }
  `;

  const where: Record<string, unknown> = { status: "PUBLISH" };
  if (categoryId) where.categoryId = categoryId;
  if (search) where.search = search;

  const data = await fetchGraphQL<{
    posts: { pageInfo: GetPostsResult["pageInfo"]; nodes: WPPost[] };
  }>(query, { first, after, where });

  if (!data) {
    return { posts: [], pageInfo: { hasNextPage: false, endCursor: null } };
  }

  return { posts: data.posts.nodes, pageInfo: data.posts.pageInfo };
}

export async function getPostBySlug(slug: string): Promise<WPPost | null> {
  const query = `
    query GetPostBySlug($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        ${POST_CARD_FIELDS}
        content
        ${SEO_FIELDS}
      }
    }
  `;

  const data = await fetchGraphQL<{ post: WPPost | null }>(query, { slug });
  return data?.post ?? null;
}

export async function getAllPostSlugs(): Promise<string[]> {
  const query = `
    query GetAllPostSlugs {
      posts(first: 1000, where: { status: PUBLISH }) {
        nodes { slug }
      }
    }
  `;

  const data = await fetchGraphQL<{ posts: { nodes: { slug: string }[] } }>(
    query,
    {},
    3600
  );
  return data?.posts.nodes.map((n) => n.slug) ?? [];
}

export async function getCategories(): Promise<WPCategory[]> {
  const query = `
    query GetCategories {
      categories(first: 100, where: { hideEmpty: true }) {
        nodes { id slug name }
      }
    }
  `;

  const data = await fetchGraphQL<{ categories: { nodes: WPCategory[] } }>(
    query
  );
  return data?.categories.nodes ?? [];
}

export async function getRelatedPosts(
  categoryId: string,
  excludePostId: string,
  limit = 3
): Promise<WPPost[]> {
  const query = `
    query GetRelatedPosts($first: Int!, $where: RootQueryToPostConnectionWhereArgs) {
      posts(first: $first, where: $where) {
        nodes { ${POST_CARD_FIELDS} }
      }
    }
  `;

  const data = await fetchGraphQL<{ posts: { nodes: WPPost[] } }>(query, {
    first: limit + 1,
    where: { categoryId, status: "PUBLISH" },
  });

  const posts = data?.posts.nodes ?? [];
  return posts.filter((p) => p.id !== excludePostId).slice(0, limit);
}

export function getFeaturedImageUrl(post: WPPost): string | null {
  return post.featuredImage?.node.sourceUrl ?? null;
}

export function getAuthorName(post: WPPost): string {
  return post.author?.node.name ?? "GM Attorneys";
}

export function getCategoryName(post: WPPost): string {
  return post.categories?.nodes[0]?.name ?? "General";
}

export function formatDate(dateString: string, locale: "es" | "en" = "es"): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === "es" ? "es-CR" : "en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Strips WordPress/Gutenberg HTML and decodes common entities, for use in
// plain-text excerpts (card previews, meta descriptions).
export function cleanHtml(html: string | null | undefined): string {
  if (!html) return "";
  let text = html.replace(/<\/?[^>]+(>|$)/g, "");
  const entities: Record<string, string> = {
    "&amp;": "&",
    "&lt;": "<",
    "&gt;": ">",
    "&quot;": '"',
    "&#039;": "'",
    "&nbsp;": " ",
    "&#8217;": "'",
    "&#8216;": "'",
    "&#8220;": '"',
    "&#8221;": '"',
    "&#8211;": "–",
    "&#8212;": "—",
  };
  Object.keys(entities).forEach((entity) => {
    text = text.replace(new RegExp(entity, "g"), entities[entity]);
  });
  return text.trim();
}
