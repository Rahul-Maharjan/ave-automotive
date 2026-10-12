import { htmlToParagraphs } from "./content";

/** Input shape that covers both the API payloads and the local fallback data. */
export interface BlogCardInput {
  id: number;
  slug: string;
  title: string;
  excerpt?: string | null;
  image?: string | null;
  /** API field. */
  tag?: string | null;
  /** Local fallback field. */
  category?: string | null;
  created_at?: string;
  /** Local fallback field. */
  date?: string;
  author?: string | null;
}

export interface BlogDetailInput extends BlogCardInput {
  /** API field: HTML description. */
  description?: string | null;
  /** Local fallback field: array of paragraphs. */
  content?: string[] | null;
}

/** Shape consumed by the blog card components. */
export interface BlogCardModel {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category: string;
  date: string;
  author: string;
}

/** Shape consumed by the single blog page. */
export interface BlogDetailModel {
  title: string;
  image?: string;
  category: string;
  date: string;
  author: string;
  paragraphs: string[];
}

const DEFAULT_AUTHOR = "AVE Team";

/** Format an ISO date as e.g. "Sep 26, 2026". */
export function formatBlogDate(value?: string | null): string {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

/** Normalize an API/fallback post into the fields the blog cards render. */
export function toBlogCard(post: BlogCardInput): BlogCardModel {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    image: post.image ?? undefined,
    category: post.tag ?? post.category ?? "General",
    date: post.created_at ? formatBlogDate(post.created_at) : post.date ?? "",
    author: post.author ?? DEFAULT_AUTHOR,
  };
}

/** Normalize a post into the fields the single blog page renders. */
export function toBlogDetail(post: BlogDetailInput): BlogDetailModel {
  const card = toBlogCard(post);
  return {
    title: card.title,
    image: card.image,
    category: card.category,
    date: card.date,
    author: card.author,
    paragraphs: post.description
      ? htmlToParagraphs(post.description)
      : post.content ?? [],
  };
}
