import { Helmet } from 'react-helmet-async'
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_NAME,
  absoluteImageUrl,
  absoluteUrl,
  toMetaDescription,
} from '../lib/seo'

/**
 * Per-page document head tags (title, description, canonical, Open Graph,
 * Twitter cards, robots, and optional JSON-LD structured data).
 *
 * Rendered with React Helmet so every major page gets accurate metadata.
 */
export default function Seo({
  title,
  description,
  keywords,
  image,
  path = '/',
  type = 'website',
  noindex = false,
  publishedTime,
  modifiedTime,
  author,
  jsonLd,
  appendSiteName = true,
}) {
  const fullTitle = title
    ? appendSiteName && !title.includes(SITE_NAME)
      ? `${title} | ${SITE_NAME}`
      : title
    : DEFAULT_TITLE

  const metaDescription =
    toMetaDescription(description) || DEFAULT_DESCRIPTION
  const canonical = absoluteUrl(path)
  const imageUrl =
    absoluteImageUrl(image) || absoluteImageUrl(DEFAULT_OG_IMAGE)
  const keywordsValue = (keywords?.length ? keywords : DEFAULT_KEYWORDS).join(', ')

  const schemas = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : []

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={keywordsValue} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1'
        }
      />

      {/* Open Graph */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={title || SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={imageUrl} />

      {/* Article metadata */}
      {type === 'article' && publishedTime ? (
        <meta property="article:published_time" content={publishedTime} />
      ) : null}
      {type === 'article' && modifiedTime ? (
        <meta property="article:modified_time" content={modifiedTime} />
      ) : null}
      {type === 'article' && author ? (
        <meta property="article:author" content={author} />
      ) : null}

      {/* Structured data */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  )
}
