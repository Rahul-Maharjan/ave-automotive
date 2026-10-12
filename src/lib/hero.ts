export interface HeroTitleParts {
  /** Text before the highlighted phrase. */
  before: string;
  /** The highlighted phrase itself (empty when nothing matched). */
  highlight: string;
  /** Text after the highlighted phrase. */
  after: string;
}

/**
 * Split a hero title around the first matching highlight phrase.
 * Matches are case-insensitive and the original casing from the title is kept.
 *
 * `splitHeroTitle('Your Trusted Partner in Automotive Parts', ['Automotive Parts'])`
 * -> { before: 'Your Trusted Partner in', highlight: 'Automotive Parts', after: '' }
 */
export function splitHeroTitle(
  title: string,
  highlights: string[],
): HeroTitleParts {
  const safeTitle = title ?? "";

  for (const phrase of highlights) {
    if (!phrase) continue;
    const index = safeTitle.toLowerCase().indexOf(phrase.toLowerCase());
    if (index !== -1) {
      return {
        before: safeTitle.slice(0, index).trim(),
        highlight: safeTitle.slice(index, index + phrase.length),
        after: safeTitle.slice(index + phrase.length).trim(),
      };
    }
  }

  return { before: safeTitle, highlight: "", after: "" };
}
