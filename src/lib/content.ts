/** Decode the small set of HTML entities that show up in CMS content. */
function decodeEntities(value: string): string {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&apos;/gi, "'");
}

/**
 * Convert simple CMS HTML (a run of `<p>` blocks) into plain-text paragraphs.
 * Tags are stripped so the content can be rendered safely as React text.
 */
export function htmlToParagraphs(html?: string | null): string[] {
  if (!html) return [];

  return html
    .split(/<\/p>/i)
    .map((chunk) =>
      decodeEntities(chunk.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()),
    )
    .filter(Boolean);
}

export interface ParsedStat {
  label: string;
  /** Numeric target for the count-up animation, or `undefined` to show `raw`. */
  value?: number;
  /** Text displayed after the animated number (e.g. `"+"`, `"/7"`). */
  suffix: string;
  /** Original string, used when the value can't be animated (e.g. `"4K+"`). */
  raw: string;
}

/**
 * Parse a display value like `"12+"` into an animatable number + suffix.
 * Values containing letters (e.g. `"4K+"`) are shown as-is.
 */
export function parseStatValue(label: string, raw: string): ParsedStat {
  const source = raw ?? "";
  const match = /^(\d+(?:[.,]\d+)?)(.*)$/.exec(source.trim());

  if (!match || /[a-z]/i.test(match[2])) {
    return { label, suffix: "", raw: source };
  }

  return {
    label,
    value: Number(match[1].replace(/,/g, "")),
    suffix: match[2],
    raw: source,
  };
}
