import { useQuery } from "@tanstack/react-query";
import {
  fetchBlog,
  fetchBlogs,
  type BlogDetail,
  type BlogSummary,
} from "../lib/api";

/** Query keys for blog content, kept here for consistent invalidation. */
export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  detail: (slug: string) => [...blogKeys.all, "detail", slug] as const,
};

/** `GET /blogs` — list of blog posts. */
export function useBlogs() {
  return useQuery<BlogSummary[]>({
    queryKey: blogKeys.lists(),
    queryFn: ({ signal }) => fetchBlogs(signal),
    staleTime: 5 * 60 * 1000,
  });
}

/** `GET /blogs/{slug}` — a single blog post with its HTML description. */
export function useBlog(slug?: string) {
  return useQuery<BlogDetail>({
    queryKey: blogKeys.detail(slug ?? ""),
    queryFn: ({ signal }) => fetchBlog(slug as string, signal),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}
