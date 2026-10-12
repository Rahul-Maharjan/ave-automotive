/**
 * Thin API client for the AVE Automotive admin endpoints.
 * Base URL is shared across every request.
 */
export const API_BASE_URL = "https://aveautomotive.com.np/admin/api";

/** A page as returned by `GET /pages` (id, name, slug). */
export interface PageSummary {
  id: number;
  name: string;
  slug: string;
}

/**
 * A single block inside a page (`contents`).
 * `hero_section` is the one used by the landing page hero.
 */
export interface PageContent {
  id: number;
  type: string;
  slug: string;
  include_video?: boolean;
  image?: string | null;
  heading?: string | null;
  title?: string | null;
  excerpt?: string | null;
  [key: string]: unknown;
}

/** A page as returned by `GET /pages/{slug}`, including its content blocks. */
export interface PageDetail extends PageSummary {
  contents: PageContent[];
}

/** A "hero_section" block with the fields the hero actually renders. */
export type HeroSection = PageContent & {
  type: "hero_section";
  heading?: string | null;
  title?: string | null;
  excerpt?: string | null;
  image?: string | null;
};

interface PagesResponse {
  data: PageSummary[];
}

interface PageResponse {
  data: PageDetail;
}

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    signal,
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(
      `API request to ${path} failed (${response.status} ${response.statusText})`,
    );
  }

  return (await response.json()) as T;
}

/** `GET /pages` -> list of pages (id, name, slug). */
export async function fetchPages(signal?: AbortSignal): Promise<PageSummary[]> {
  const { data } = await request<PagesResponse>("/pages", signal);
  return data;
}

/** `GET /pages/{slug}` -> full page with its content blocks. */
export async function fetchPage(
  slug: string,
  signal?: AbortSignal,
): Promise<PageDetail> {
  const { data } = await request<PageResponse>(
    `/pages/${encodeURIComponent(slug)}`,
    signal,
  );
  return data;
}

/** Slugs/names that can identify the landing (home) page across environments. */
const LANDING_PAGE_KEYS = ["overview", "home", "landing"];

/** Find a page whose slug or name matches any of the given keys (case-insensitive). */
export function findPage(
  pages: PageSummary[],
  keys: string[],
): PageSummary | undefined {
  if (!pages.length) return undefined;

  const normalized = keys.map((key) => key.toLowerCase());

  return pages.find((page) => {
    const slug = page.slug?.toLowerCase();
    const name = page.name?.toLowerCase();
    return normalized.includes(slug) || normalized.includes(name);
  });
}

/** Resolve the landing page from the pages list, falling back to the first page. */
export function findLandingPage(pages: PageSummary[]): PageSummary | undefined {
  return findPage(pages, LANDING_PAGE_KEYS) ?? pages[0];
}

/** Pick the `hero_section` block out of a page's contents. */
export function getHeroSection(page?: PageDetail): HeroSection | undefined {
  const hero = page?.contents?.find((content) => content.type === "hero_section");
  return hero as HeroSection | undefined;
}

/** Base URL for media stored by the admin panel. */
export const STORAGE_BASE_URL = "https://aveautomotive.com.np/admin/storage/";

/**
 * Turn a (possibly relative) storage path into a full URL.
 * Absolute URLs are returned untouched; empty values become `undefined`.
 */
export function storageUrl(path?: string | null): string | undefined {
  if (!path) return undefined;
  if (/^(https?:)?\/\//i.test(path)) return path;
  return `${STORAGE_BASE_URL}${path.replace(/^\/+/, "")}`;
}

/** A single stat on the about section, e.g. `{ label: "Years...", value: "12+" }`. */
export interface AboutStat {
  label: string;
  value: string;
}

/** A titled item (mission/vision, values) with an HTML description. */
export interface AboutItem {
  title: string;
  description: string;
}

/** One grouped block of the `GET /abouts` payload (e.g. `who_we_are`). */
export interface AboutGroup {
  heading?: string;
  title?: string;
  description?: string;
  items?: AboutItem[];
  stats?: AboutStat[];
  images?: string[];
}

/** The structured content returned by `GET /abouts`. */
export interface AboutContent {
  who_we_are?: AboutGroup;
  values?: AboutGroup;
  mission_vision?: AboutGroup;
}

export interface About {
  id: number;
  content: AboutContent;
  created_at?: string;
  updated_at?: string;
}

interface AboutResponse {
  data: About;
}

/** `GET /abouts` -> structured about content (who we are, values, mission/vision). */
export async function fetchAbout(signal?: AbortSignal): Promise<About> {
  const { data } = await request<AboutResponse>("/abouts", signal);
  return data;
}

/** A single service/step entry with a (possibly HTML) description. */
export interface ServiceItem {
  title: string;
  description: string;
}

/** One grouped block of the `GET /services` payload (e.g. `what_we_offer`). */
export interface ServiceGroup {
  heading?: string;
  title?: string;
  items?: ServiceItem[];
}

/** A services record returned by `GET /services`. */
export interface Service {
  id: number;
  what_we_offer?: ServiceGroup;
  how_it_works?: ServiceGroup;
  created_at?: string;
  updated_at?: string;
}

interface ServicesResponse {
  data: Service[];
}

/** `GET /services` -> services content (what we offer, how it works). */
export async function fetchServices(signal?: AbortSignal): Promise<Service[]> {
  const { data } = await request<ServicesResponse>("/services", signal);
  return data;
}

/** Payload accepted by `POST /contact-messages`. */
export interface ContactMessageInput {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

/**
 * `POST /contact-messages` -> submits a contact form message.
 * Throws with the first server validation message when the request fails.
 */
export async function sendContactMessage(
  payload: ContactMessageInput,
): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/contact-messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (response.ok) return;

  let message = `Request failed (${response.status} ${response.statusText})`;

  try {
    const body = (await response.json()) as ApiErrorBody;
    const firstFieldError = body.errors
      ? Object.values(body.errors)[0]?.[0]
      : undefined;
    message = firstFieldError || body.message || message;
  } catch {
    // Non-JSON error body; keep the generic message.
  }

  throw new Error(message);
}

/** A blog post as returned by `GET /blogs` (list view). */
export interface BlogSummary {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  tag?: string | null;
  excerpt?: string | null;
  read_time?: number | null;
  created_at?: string;
}

/** A blog post as returned by `GET /blogs/{slug}` (detail view). */
export interface BlogDetail extends BlogSummary {
  description?: string | null;
  keywords?: string[];
  updated_at?: string;
}

interface BlogsResponse {
  data: BlogSummary[];
}

interface BlogResponse {
  data: BlogDetail;
}

/** `GET /blogs` -> list of blog posts. */
export async function fetchBlogs(signal?: AbortSignal): Promise<BlogSummary[]> {
  const { data } = await request<BlogsResponse>("/blogs", signal);
  return data;
}

/** `GET /blogs/{slug}` -> a single blog post with its HTML description. */
export async function fetchBlog(
  slug: string,
  signal?: AbortSignal,
): Promise<BlogDetail> {
  const { data } = await request<BlogResponse>(
    `/blogs/${encodeURIComponent(slug)}`,
    signal,
  );
  return data;
}
