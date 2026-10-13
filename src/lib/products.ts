import { htmlToParagraphs } from "./content";

/** Input shape that covers both the API payloads and the local fallback data. */
export interface ProductCardInput {
  id: number;
  /** API field. */
  title?: string | null;
  /** Local fallback field. */
  name?: string | null;
  image?: string | null;
  /** API field: HTML description. */
  description?: string | null;
  /** API field: array of `{ feature }` objects; local fallback: array of strings. */
  features?: Array<{ feature?: string | null } | string | null> | null;
}

/** Shape consumed by the product card components. */
export interface ProductCardModel {
  id: number;
  name: string;
  image?: string;
  description: string;
  features: string[];
}

/** Normalize an API/local product into the fields the product card renders. */
export function toProductCard(product: ProductCardInput): ProductCardModel {
  const features = (product.features ?? [])
    .map((feature) =>
      typeof feature === "string" ? feature : feature?.feature ?? "",
    )
    .filter(Boolean);

  return {
    id: product.id,
    name: product.title ?? product.name ?? "",
    image: product.image ?? undefined,
    description: htmlToParagraphs(product.description)[0] ?? "",
    features,
  };
}

/** Input shape that covers both the API categories and the local fallback data. */
export interface CategoryInput {
  id?: number;
  title: string;
  slug: string;
  /** API field. */
  excerpt?: string | null;
  /** Local fallback field. */
  subtitle?: string | null;
  image?: string | null;
}

/** Shape consumed by the category card and the product page header. */
export interface CategoryModel {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  image?: string;
}

/** Normalize an API/local category into the fields the UI renders. */
export function toCategory(category: CategoryInput): CategoryModel {
  return {
    id: category.id,
    title: category.title,
    slug: category.slug,
    excerpt: category.excerpt ?? category.subtitle ?? "",
    image: category.image ?? undefined,
  };
}