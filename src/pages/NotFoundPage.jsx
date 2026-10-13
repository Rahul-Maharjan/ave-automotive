import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[#fafafa] px-4 py-20 sm:px-6 lg:px-10">
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found. Browse AVE Automotives for car parts, lubricants, and automotive accessories in Nepal."
        path="/404"
        noindex
      />

      <div className="mx-auto flex max-w-[640px] flex-col items-center text-center">
        <p className="font-['Orbitron',sans-serif] text-[clamp(4rem,14vw,9rem)] font-extrabold leading-none tracking-[-0.04em] text-[#12f215]">
          404
        </p>
        <h1 className="mt-4 font-['Orbitron',sans-serif] text-[clamp(1.4rem,3vw,2rem)] font-bold tracking-[-0.02em] text-[#1f1f1f]">
          This Road Leads Nowhere
        </h1>
        <p className="mt-4 max-w-md text-[1rem] leading-8 text-[#6b7280]">
          The page you are looking for has moved or no longer exists. Let&apos;s
          get you back to the parts you need.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link
            to="/"
            className="inline-flex h-14 items-center justify-center rounded-[6px] bg-[#12f215] px-8 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
          >
            BROWSE CATEGORIES
          </Link>
          <Link
            to="/contact"
            className="inline-flex h-14 items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-white px-8 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#1f1f1f] transition-colors duration-200 hover:border-[#12f215] hover:text-[#12a817]"
          >
            CONTACT US
          </Link>
        </div>
      </div>
    </div>
  )
}
