import { htmlToParagraphs } from "./content";

/**
 * Central SEO configuration.
 *
 * The canonical origin can be overridden per environment with `VITE_SITE_URL`
 * (e.g. in a `.env.production` file or the hosting provider's env settings).
 * The path prefix comes from Vite's `base`, so it always matches the router's
 * `basename` and the built asset URLs.
 */
export const SITE_URL = (
  import.meta.env.VITE_SITE_URL || "https://aveautomotive.com.np"
).replace(/\/+$/, "");

/** Path the app is served from, matching Vite's `base` (e.g. `/new`). */
export const BASE_PATH = (import.meta.env.BASE_URL || "/").replace(/\/+$/, "");

export const SITE_NAME = "AVE Automotives";

export const DEFAULT_TITLE =
  "AVE Automotives | Premium Auto Parts, Lubricants & Accessories in Nepal";

export const DEFAULT_DESCRIPTION =
  "AVE Automotives supplies genuine car parts, high-performance lubricants, and accessories in Nepal. Browse tires, engine parts, brake systems, and more with expert guidance.";

export const DEFAULT_KEYWORDS = [
  "auto parts Nepal",
  "car parts Kathmandu",
  "automotive accessories",
  "engine parts",
  "car lubricants",
  "tires and wheels",
  "brake system",
  "AVE Automotives",
];

export const DEFAULT_OG_IMAGE = "/android-chrome-512x512.png";

export const CONTACT_EMAIL = "info@aveautomotive.com.np";
export const CONTACT_PHONE = "+977-01-5553000";
export const CONTACT_LOCALITY = "Kupondole, Lalitpur";

/** Build an absolute URL for an in-app path (respecting the deploy base). */
export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${BASE_PATH}${clean === "/" ? "/" : clean}`;
}

/**
 * Resolve an image to an absolute URL suitable for `og:image`.
 * Handles absolute API/storage URLs, Vite-bundled assets (which already
 * include the base path), and public files referenced from the root.
 */
export function absoluteImageUrl(image?: string | null): string | undefined {
  if (!image) return undefined;
  if (/^(https?:)?\/\//i.test(image) || image.startsWith("data:")) return image;

  const withBase =
    BASE_PATH && image.startsWith(`${BASE_PATH}/`)
      ? `${SITE_URL}${image}`
      : `${SITE_URL}${BASE_PATH}${image.startsWith("/") ? image : `/${image}`}`;

  return encodeURI(withBase);
}

/** Strip HTML and clamp text to a meta-description friendly length. */
export function toMetaDescription(
  value?: string | null,
  maxLength = 160,
): string {
  const text = htmlToParagraphs(value).join(" ").trim();
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

/** A schema.org JSON-LD object. */
export interface JsonLd {
  [key: string]: unknown;
}

/** Business/organization structured data (also used for the contact page). */
export function organizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "AutoPartsStore",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteImageUrl(DEFAULT_OG_IMAGE),
    image: absoluteImageUrl(DEFAULT_OG_IMAGE),
    description: DEFAULT_DESCRIPTION,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kupondole",
      addressLocality: "Lalitpur",
      addressCountry: "NP",
    },
    areaServed: "Nepal",
  };
}

/** Site-level structured data for the home page. */
export function websiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteUrl("/"),
    description: DEFAULT_DESCRIPTION,
  };
}

/** Breadcrumb trail for a page. */
export function breadcrumbSchema(
  items: Array<{ name: string; path: string }>,
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Article structured data for a blog post. */
export function articleSchema(post: {
  title: string;
  description?: string;
  image?: string;
  path: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  section?: string;
}): JsonLd {
  const url = absoluteUrl(post.path);
  const image = absoluteImageUrl(post.image);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: image ? [image] : undefined,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
    author: { "@type": "Organization", name: post.author || SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: absoluteImageUrl(DEFAULT_OG_IMAGE) },
    },
    articleSection: post.section,
  };
}

/** Listing/collection structured data (product category, blog index, …). */
export function collectionPageSchema(input: {
  name: string;
  description?: string;
  path: string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: absoluteUrl("/"),
    },
  };
}
