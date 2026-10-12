import { Link } from 'react-router-dom'
import blogPosts from '../data/blogPosts.js'
import { useBlogs } from '../hooks/useBlogs'
import { toBlogCard } from '../lib/blog'

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

export default function BlogSection() {
  const { data } = useBlogs()
  const posts = data?.length
    ? data.map(toBlogCard)
    : blogPosts.map(toBlogCard)

  return (
    <section id="blog" className="relative isolate overflow-hidden bg-[#060606] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(18,242,21,0.12),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1350px]">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12f215]">
              Blog
            </p>
            <h2 className="mt-4 font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-white">
              Insights & Guides
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-[#12f215]" />
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-3 self-start text-[clamp(0.95rem,1vw,1.05rem)] font-medium tracking-[0.06em] text-[#ff8a00] transition-transform duration-200 hover:translate-x-1"
          >
            View All Posts
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
