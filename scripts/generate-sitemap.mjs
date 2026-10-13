/**
 * Generates `public/sitemap.xml` at build time.
 *
 * Static routes are always included; blog posts and product categories are
 * fetched from the admin API and appended when available. The script never
 * fails the build — if the API is unreachable it simply emits the static URLs.
 *
 * Run automatically via the `prebuild` npm script.
 */
import { existsSync, readFileSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Load Vite-style `.env` files so the generator uses the same configuration
 * as the client build. Real environment variables always take precedence.
 */
function loadEnvFiles() {
  const shellEnv = new Set(Object.keys(process.env));
  const files = [
    ".env",
    ".env.local",
    ".env.production",
    ".env.production.local",
  ];
  const parsed = {};

  for (const file of files) {
    const path = resolve(ROOT, file);
    if (!existsSync(path)) continue;

    for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
      const match = /^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/.exec(line);
      if (!match) continue;
      parsed[match[1]] = match[2].replace(/^['"]|['"]$/g, "");
    }
  }

  for (const [key, value] of Object.entries(parsed)) {
    if (!shellEnv.has(key)) process.env[key] = value;
  }
}

loadEnvFiles();

const API_BASE_URL = (
  process.env.VITE_API_BASE_URL || "https://aveautomotive.com.np/admin/api"
).replace(/\/+$/, "");

const SITE_URL = (
  process.env.VITE_SITE_URL || "https://aveautomotive.com.np"
).replace(/\/+$/, "");

/** Path the app is served from; keep in sync with Vite's `base`. */
const BASE_PATH = (process.env.VITE_BASE_PATH || "/new").replace(/\/+$/, "");

const OUTPUT_PATH = resolve(ROOT, "public", "sitemap.xml");

const STATIC_ROUTES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.7" },
];

/** Build an absolute, base-aware URL for a route. */
function absoluteUrl(path) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${BASE_PATH}${clean === "/" ? "/" : clean}`;
}

/** Normalize a timestamp to `YYYY-MM-DD`. */
function toLastmod(value) {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString().slice(0, 10);
}

/** Escape a value for safe inclusion in XML. */
function escapeXml(value) {
  return String(value).replace(
    /[<>&'"]/g,
    (char) =>
      ({
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        "'": "&apos;",
        '"': "&quot;",
      })[char],
  );
}

/** Fetch JSON from the admin API with a hard timeout. */
async function fetchJson(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) {
    throw new Error(`${path} responded with ${response.status}`);
  }
  return response.json();
}

function renderUrl(entry) {
  const lines = [`    <loc>${escapeXml(encodeURI(entry.loc))}</loc>`];
  if (entry.lastmod) lines.push(`    <lastmod>${entry.lastmod}</lastmod>`);
  if (entry.changefreq) {
    lines.push(`    <changefreq>${entry.changefreq}</changefreq>`);
  }
  if (entry.priority) lines.push(`    <priority>${entry.priority}</priority>`);
  return `  <url>\n${lines.join("\n")}\n  </url>`;
}

async function main() {
  const entries = STATIC_ROUTES.map((route) => ({
    loc: absoluteUrl(route.path),
    changefreq: route.changefreq,
    priority: route.priority,
  }));

  try {
    const [blogs, categories] = await Promise.all([
      fetchJson("/blogs").catch(() => ({ data: [] })),
      fetchJson("/product-categories").catch(() => ({ data: [] })),
    ]);

    for (const post of blogs.data ?? []) {
      if (!post?.slug) continue;
      entries.push({
        loc: absoluteUrl(`/blog/${post.slug}`),
        lastmod: toLastmod(post.updated_at || post.created_at),
        changefreq: "monthly",
        priority: "0.6",
      });
    }

    for (const category of categories.data ?? []) {
      if (!category?.slug) continue;
      entries.push({
        loc: absoluteUrl(`/products/${category.slug}`),
        lastmod: toLastmod(category.updated_at || category.created_at),
        changefreq: "weekly",
        priority: "0.7",
      });
    }
  } catch (error) {
    console.warn(`[sitemap] Falling back to static routes (${error.message})`);
  }

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(renderUrl),
    "</urlset>",
    "",
  ].join("\n");

  await writeFile(OUTPUT_PATH, xml, "utf8");
  console.log(`[sitemap] Wrote ${entries.length} URLs to public/sitemap.xml`);
}

main().catch((error) => {
  // A sitemap is a nice-to-have; never block a production build over it.
  console.error(`[sitemap] Skipped: ${error.message}`);
  process.exit(0);
});
