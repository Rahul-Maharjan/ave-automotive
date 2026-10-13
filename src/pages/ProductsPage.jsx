import { useParams, Link, Navigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { products as fallbackProducts, categoryMap } from '../data/products.js'
import { useProductCategories, useCategoryProducts } from '../hooks/useProductCategories'
import { toProductCard, toCategory } from '../lib/products'
import Seo from '../components/Seo.jsx'
import { breadcrumbSchema, collectionPageSchema } from '../lib/seo'

/** Map API category slugs to the differing local fallback slugs. */
const LOCAL_SLUG_ALIASES = {
  'tires-and-wheels': 'tires-wheels',
}

const DEFAULT_DESCRIPTION = (title) =>
  `Browse our selection of ${title.toLowerCase()} — quality parts and accessories engineered for performance and reliability.`

function ProductCard({ product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[14px] border border-[#e5e7eb] bg-white shadow-[0_6px_18px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12f215]/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.08)]">
      <div className="relative aspect-[16/10] overflow-hidden bg-[#f5f5f5]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.4),rgba(0,0,0,0)_55%)]" />
        <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-white/80 px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-[#6b7280] backdrop-blur-sm">
          #{String(product.id).padStart(3, '0')}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
        <h3 className="min-h-[2.4em] font-['Orbitron',sans-serif] text-[0.95rem] font-bold leading-[1.2] text-[#1f1f1f] transition-colors duration-200 group-hover:text-[#12a817]">
          {product.name}
        </h3>

        <p className="mt-2 text-[0.82rem] leading-6 text-[#6b7280]">
          {product.description}
        </p>

        {product.features.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
            {product.features.slice(0, 3).map((feature, i) => (
              <span key={i} className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1 text-[0.65rem] font-medium leading-none text-[#6b7280]">
                {feature.length > 28 ? feature.slice(0, 26) + '...' : feature}
              </span>
            ))}
            {product.features.length > 3 && (
              <span className="rounded-full border border-[#e5e7eb] bg-[#f9fafb] px-2.5 py-1 text-[0.65rem] font-medium leading-none text-[#12a817]">
                +{product.features.length - 3}
              </span>
            )}
          </div>
        )}

        <div className="mt-4 border-t border-[#e5e7eb] pt-3">
          <span className="inline-flex h-9 w-full items-center justify-center rounded-[6px] border border-[#12f215]/30 bg-[#12f215]/10 text-[0.72rem] font-semibold uppercase tracking-[0.15em] text-[#12a817] transition-colors duration-200 group-hover:bg-[#12f215] group-hover:text-[#08110a]">
            Inquire About This Part
          </span>
        </div>
      </div>
    </article>
  )
}

export default function ProductsPage() {
  const { categorySlug } = useParams()
  const { data: categories, isPending: categoriesPending } = useProductCategories()
  const { data: products } = useCategoryProducts(categorySlug)

  const localSlug = LOCAL_SLUG_ALIASES[categorySlug] ?? categorySlug
  const localCategory = categoryMap[localSlug]
  const apiCategory = categories?.find((category) => category.slug === categorySlug)

  if (!apiCategory && !localCategory && !categoriesPending) {
    return <Navigate to="/" replace />
  }

  const category = apiCategory
    ? toCategory(apiCategory)
    : localCategory
      ? toCategory({ ...localCategory, slug: localSlug })
      : undefined

  if (!category) {
    return <div className="min-h-screen bg-[#fafafa]" />
  }

  const categoryProducts = products?.length
    ? products.map(toProductCard)
    : fallbackProducts.filter((p) => p.category === localSlug).map(toProductCard)

  const path = `/products/${categorySlug}`
  const description =
    category.excerpt || DEFAULT_DESCRIPTION(category.title)

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Seo
        title={category.title}
        description={description}
        image={category.image}
        path={path}
        jsonLd={[
          collectionPageSchema({ name: category.title, description, path }),
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: category.title, path },
          ]),
        ]}
      />
      <PageHeader
        badge={category.title}
        titleBefore="Shop"
        highlight={category.title}
        description={description}
        backgroundImage={category.image}
      />

      <section className="relative overflow-hidden bg-white px-4 pb-20 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          {categoryProducts.length > 0 ? (
            <>
              <div className="mb-8 flex items-center justify-between">
                <p className="text-[0.95rem] text-[#6b7280]">
                  Showing {categoryProducts.length} product{categoryProducts.length > 1 ? 's' : ''}
                </p>
                <Link
                  to="/"
                  className="text-[0.85rem] font-medium text-[#ff8a00] transition-colors hover:text-[#e67a00]"
                >
                  &larr; All Categories
                </Link>
              </div>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center py-20 text-center">
              <p className="text-[1.1rem] font-medium text-[#6b7280]">No products found in this category.</p>
              <Link
                to="/"
                className="mt-6 inline-flex h-12 items-center justify-center rounded-[6px] bg-[#12f215] px-6 font-['Orbitron',sans-serif] text-[0.85rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
              >
                BROWSE CATEGORIES
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
