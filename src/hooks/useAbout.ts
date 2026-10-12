import { useQuery } from "@tanstack/react-query";
import { fetchAbout, type About } from "../lib/api";

/** Query key for the about content, kept here for consistent invalidation. */
export const aboutKeys = {
  all: ["abouts"] as const,
};

/** `GET /abouts` — structured about content used by the landing page section. */
export function useAbout() {
  return useQuery<About>({
    queryKey: aboutKeys.all,
    queryFn: ({ signal }) => fetchAbout(signal),
    staleTime: 5 * 60 * 1000,
  });
}
