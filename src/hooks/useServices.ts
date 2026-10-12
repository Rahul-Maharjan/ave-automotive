import { useQuery } from "@tanstack/react-query";
import { fetchServices, type Service } from "../lib/api";

/** Query key for the services content, kept here for consistent invalidation. */
export const serviceKeys = {
  all: ["services"] as const,
};

/** `GET /services` — structured services content used by the services page. */
export function useServices() {
  return useQuery<Service[]>({
    queryKey: serviceKeys.all,
    queryFn: ({ signal }) => fetchServices(signal),
    staleTime: 5 * 60 * 1000,
  });
}
