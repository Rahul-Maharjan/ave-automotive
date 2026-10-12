import { useQuery } from "@tanstack/react-query";
import {
  fetchPage,
  fetchPages,
  findLandingPage,
  findPage,
  getHeroSection,
  type HeroSection,
  type PageDetail,
  type PageSummary,
} from "../lib/api";

/** Query keys, kept in one place so pages can be invalidated consistently. */
export const pageKeys = {
  all: ["pages"] as const,
  lists: () => [...pageKeys.all, "list"] as const,
  detail: (slug: string) => [...pageKeys.all, "detail", slug] as const,
};

/** `GET /pages` — the list of pages (id, name, slug). */
export function usePages() {
  return useQuery<PageSummary[]>({
    queryKey: pageKeys.lists(),
    queryFn: ({ signal }) => fetchPages(signal),
    staleTime: 5 * 60 * 1000,
  });
}

/** Resolve the landing page (`overview`/`home`/`landing`) from the pages list. */
export function useLandingPage() {
  const query = usePages();

  return {
    ...query,
    page: query.data ? findLandingPage(query.data) : undefined,
  };
}

/** `GET /pages/{slug}` — full page including its content blocks. */
export function usePage(slug?: string) {
  return useQuery<PageDetail>({
    queryKey: pageKeys.detail(slug ?? ""),
    queryFn: ({ signal }) => fetchPage(slug as string, signal),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * `hero_section` data for a page, resolved by slug or name from the pages list.
 *
 * @param keys One or more slugs/names that identify the page (e.g. `"about"`).
 * @param fallbackToFirst Fall back to the first page when nothing matches (used for the landing page).
 */
export function usePageHero(keys: string | string[], fallbackToFirst = false) {
  const keyList = Array.isArray(keys) ? keys : [keys];
  const { data: pages, isLoading: isLoadingList } = usePages();

  const page = pages
    ? findPage(pages, keyList) ?? (fallbackToFirst ? pages[0] : undefined)
    : undefined;

  const {
    data: detail,
    isPending: isLoadingDetail,
    isError,
  } = usePage(page?.slug);

  const hero: HeroSection | undefined = getHeroSection(detail);

  return {
    hero,
    page,
    isLoading: isLoadingList || (Boolean(page) && isLoadingDetail),
    isError,
  };
}

/**
 * Landing page (home) `hero_section` data.
 * Waits for the pages list, resolves the landing slug, then fetches its detail.
 */
export function useLandingHero() {
  return usePageHero(["overview", "home", "landing"], true);
}
