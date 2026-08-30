import { useGetSiteContentQuery } from "@/services/api";
import type { SiteContent } from "@/types";

/**
 * The public site's content, from a single cached request. RTK Query dedupes,
 * so every section can call this independently and only one fetch is made.
 */
export function useSiteContent(): {
  content: SiteContent | undefined;
  isLoading: boolean;
  isError: boolean;
} {
  const { data, isLoading, isError } = useGetSiteContentQuery();
  return { content: data, isLoading, isError };
}
