import { useQuery } from "@tanstack/react-query";
import {
  fetchCategoryProducts,
  fetchProductCategories,
  type Product,
  type ProductCategory,
} from "../lib/api";

/** Query keys for product categories, kept here for consistent invalidation. */
export const productCategoryKeys = {
  all: ["product-categories"] as const,
  products: (slug: string) =>
    [...productCategoryKeys.all, "products", slug] as const,
};

/** `GET /product-categories` — list of product categories. */
export function useProductCategories() {
  return useQuery<ProductCategory[]>({
    queryKey: productCategoryKeys.all,
    queryFn: ({ signal }) => fetchProductCategories(signal),
    staleTime: 5 * 60 * 1000,
  });
}

/** `GET /product-categories/{slug}` — products in a single category. */
export function useCategoryProducts(slug?: string) {
  return useQuery<Product[]>({
    queryKey: productCategoryKeys.products(slug ?? ""),
    queryFn: ({ signal }) => fetchCategoryProducts(slug as string, signal),
    enabled: Boolean(slug),
    staleTime: 5 * 60 * 1000,
  });
}