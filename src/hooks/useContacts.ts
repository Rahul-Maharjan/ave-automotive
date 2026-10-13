import { useQuery } from "@tanstack/react-query";
import { fetchContacts, type ContactDetails } from "../lib/api";

/** Query key for the contact details, kept here for consistent invalidation. */
export const contactKeys = {
  all: ["contacts"] as const,
};

/** `GET /contacts` — the business contact details shown across the site. */
export function useContacts() {
  return useQuery<ContactDetails>({
    queryKey: contactKeys.all,
    queryFn: ({ signal }) => fetchContacts(signal),
    staleTime: 10 * 60 * 1000,
  });
}
