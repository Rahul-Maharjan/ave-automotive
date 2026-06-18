import { Link, useParams, Navigate } from 'react-router-dom'
import blogPosts from '../data/blogPosts.js'

export default function SingleBlogPage() {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return <Navigate to="/blog" replace />
  }

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ───── HERO ───── */}
      <section className="relative isolate flex min-h-[60vh] items-end overflow-hidden bg-black/10 bg-cover bg-center px-4 pb-12 pt-20 sm:px-6 lg:px-10"
        style={{ backgroundImage: `url(${post.image})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.10),rgba(0,0,0,0.82))]" />
        <div className="absolute inset-0 bg-black/15" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.10),transparent_60%)] blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-[860px]">
          <Link
            to="/blog"
            className="mb-6 inline-flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-[#12f215] transition-all duration-200 hover:gap-3"
          >
            <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
            Back to Blog
          </Link>

          <span className="inline-flex rounded-full border border-white/10 bg-black/50 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/70 backdrop-blur-sm">
            {post.category}
          </span>

          <h1 className="mt-5 font-['Orbitron',sans-serif] text-[clamp(1.8rem,4vw,3.2rem)] font-extrabold leading-[1.02] tracking-[-0.02em] text-white">
            {post.title}
          </h1>

          <div className="mt-4 flex items-center gap-3 text-[0.85rem] text-white/55">
            <span>{post.date}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{post.author}</span>
          </div>
        </div>
      </section>

      {/* ───── CONTENT ───── */}
      <section className="px-4 py-14 sm:px-6 sm:py-18 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[760px]">
          <div className="space-y-6">
            {post.content.map((paragraph, index) => (
              <p key={index} className="text-[1.05rem] leading-8 text-[#4b5563]">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 border-t border-[#e5e7eb] pt-10">
            <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-[#9ca3af]">
                  Written by
                </p>
                <p className="mt-1 font-['Orbitron',sans-serif] text-[1rem] font-bold text-[#1f1f1f]">
                  {post.author}
                </p>
              </div>

              <Link
                to="/blog"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[6px] bg-[#12f215] px-6 font-['Orbitron',sans-serif] text-[0.8rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
              >
                <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
                ALL POSTS
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
