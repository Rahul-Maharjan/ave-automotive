import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import blogPosts from '../data/blogPosts.js'

function BlogCard({ post }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-[14px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,18,18,0.94),rgba(8,8,8,0.97))] shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12f215]/20 hover:shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
      <Link to={`/blog/${post.slug}`} className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.6),rgba(0,0,0,0)_55%)]" />
        <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
          {post.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col px-5 pb-6 pt-5">
        <div className="flex items-center gap-2 text-[0.75rem] text-white/40">
          <span>{post.date}</span>
          <span aria-hidden="true">&middot;</span>
          <span>{post.author}</span>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <h3 className="mt-3 font-['Orbitron',sans-serif] text-[1.1rem] font-bold leading-[1.2] text-white transition-colors duration-200 group-hover:text-[#12f215]">
            {post.title}
          </h3>
        </Link>

        <p className="mt-3 flex-1 text-[0.9rem] leading-7 text-white/55">
          {post.excerpt}
        </p>

        <Link
          to={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-[#12f215] transition-all duration-200 hover:gap-3"
        >
          Read More
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  )
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PageHeader
        badge="Our Blog"
        titleBefore="Insights &"
        highlight="Guides"
        description="Expert advice, maintenance tips, and automotive knowledge to help you make informed decisions about your vehicle."
      />

      {/* ───── POSTS GRID ───── */}
      <section className="relative overflow-hidden bg-white px-4 pb-20 pt-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-[1350px]">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {blogPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
