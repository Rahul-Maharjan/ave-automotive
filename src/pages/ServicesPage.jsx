import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import engineImg from '../assets/categories/engine.png'
import cleanerImg from '../assets/categories/cleaner.png'
import lubeImg from '../assets/categories/lube.png'
import breakImg from '../assets/categories/break.png'
import tireImg from '../assets/categories/tire.png'
import seatImg from '../assets/categories/seat.png'

const coreServices = [
  {
    title: 'Genuine Parts',
    description: 'Carefully selected components that fit and perform the way they should. We source only from trusted manufacturers and verified suppliers to ensure every part meets strict quality standards before it reaches your hands.',
    icon: engineImg,
  },
  {
    title: 'Expert Advice',
    description: 'Friendly guidance to help you choose the right part for the right job. Our team understands vehicles inside and out, bringing years of hands-on experience to every conversation.',
    icon: cleanerImg,
  },
  {
    title: 'Quick Delivery',
    description: 'Efficient processing and shipping to keep your project moving fast. We optimize our logistics to minimize wait times so you get what you need when you need it.',
    icon: lubeImg,
  },
  {
    title: 'Secure Support',
    description: 'Reliable help before and after purchase so you can buy with confidence. From compatibility checks to installation guidance, we have you covered throughout the entire journey.',
    icon: breakImg,
  },
]

const categories = [
  {
    title: 'Tires & Wheels',
    description: 'All-season, performance, and off-road tires plus rims and accessories for any vehicle type.',
    image: tireImg,
  },
  {
    title: 'Engine Parts',
    description: 'From filters and belts to performance components, keep your engine running at its peak.',
    image: engineImg,
  },
  {
    title: 'Accessories',
    description: 'Interior upgrades, exterior styling, and practical add-ons to personalize your ride.',
    image: seatImg,
  },
  {
    title: 'Lubricants',
    description: 'High-performance oils, greases, and fluids engineered to protect and extend component life.',
    image: lubeImg,
  },
  {
    title: 'Car Care',
    description: 'Cleaning, detailing, and protection products to maintain your vehicle appearance and value.',
    image: cleanerImg,
  },
  {
    title: 'Brake System',
    description: 'Pads, rotors, calipers, and complete brake kits built for safety and stopping power.',
    image: breakImg,
  },
]

function ServiceCard({ service }) {
  return (
    <div className="group relative overflow-hidden rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,18,18,0.94),rgba(8,8,8,0.97))] p-8 shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12f215]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.34)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(18,242,21,0.08),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(255,138,0,0.08),transparent_22%)]" />
      <div className="relative">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-transform duration-300 group-hover:scale-105">
          <img src={service.icon} alt={service.title} loading="lazy" className="h-full w-full rounded-xl object-cover" />
        </div>
        <h3 className="mt-5 font-['Orbitron',sans-serif] text-[1.15rem] font-bold tracking-[-0.03em] text-white">
          {service.title}
        </h3>
        <p className="mt-3 text-[0.95rem] leading-7 text-white/68">{service.description}</p>
      </div>
    </div>
  )
}

function CategoryCard({ category }) {
  return (
    <div className="group relative min-h-[320px] overflow-hidden rounded-[14px] bg-[#0d0d0d] shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(0,0,0,0.28)_55%,rgba(0,0,0,0.85))]" />
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,rgba(0,0,0,0.9),rgba(0,0,0,0))]" />
      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7">
        <h3 className="font-['Orbitron',sans-serif] text-[1.3rem] font-bold leading-[0.95] text-white">
          {category.title}
        </h3>
        <p className="mt-2 text-[0.9rem] leading-6 text-white/68">{category.description}</p>
      </div>
    </div>
  )
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PageHeader
        badge="Our Services"
        titleBefore="Premium Automotive"
        highlight="Services"
        titleAfter=" & Support"
        description="From sourcing genuine parts to expert guidance and fast delivery — we provide end-to-end support for mechanics, enthusiasts, and everyday drivers."
      />

      {/* ───── CORE SERVICES ───── */}
      <section className="relative isolate overflow-hidden bg-[#060606] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(18,242,21,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,138,0,0.06),transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(18,242,21,0.12),transparent_60%)] blur-3xl" />

        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12f215]">
              What We Offer
            </p>
            <h2 className="mt-4 max-w-2xl font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-white">
              Everything you need to keep your vehicle on the road.
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#12f215]" />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {coreServices.map((service) => (
              <ServiceCard key={service.title} service={service} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── CATEGORIES ───── */}
      <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_bottom_left,rgba(18,242,21,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,138,0,0.06),transparent_25%)]" />

        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12a817]">
              Product Categories
            </p>
            <h2 className="mt-4 max-w-2xl font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-[#1f1f1f]">
              Parts and accessories for every need.
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-[#12f215]" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <CategoryCard key={cat.title} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── PROCESS ───── */}
      <section className="relative isolate overflow-hidden bg-[#060606] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.06),transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_center,rgba(255,138,0,0.06),transparent_50%)] blur-2xl" />

        <div className="relative mx-auto max-w-[1350px]">
          <div className="mb-12 flex flex-col items-center text-center">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12f215]">
              How It Works
            </p>
            <h2 className="mt-4 max-w-2xl font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-white">
              From selection to delivery in four simple steps.
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#12f215]" />
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: '01', title: 'Browse & Select', desc: 'Explore our catalog of quality parts and accessories across multiple categories.' },
              { step: '02', title: 'Get Expert Help', desc: 'Not sure what fits? Our team provides fast, accurate compatibility guidance.' },
              { step: '03', title: 'Order & Pay', desc: 'Secure checkout with clear pricing, no hidden fees, and order confirmation.' },
              { step: '04', title: 'Fast Delivery', desc: 'We process and ship your order quickly so you can get back on the road.' },
            ].map((item) => (
              <div key={item.step} className="group relative overflow-hidden rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,18,18,0.94),rgba(8,8,8,0.97))] p-7 shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12f215]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.34)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(18,242,21,0.08),transparent_34%)]" />
                <div className="relative">
                  <span className="font-['Orbitron',sans-serif] text-[2.5rem] font-extrabold leading-none text-[#12f215]/30">
                    {item.step}
                  </span>
                  <h3 className="mt-4 font-['Orbitron',sans-serif] text-[1.05rem] font-bold tracking-[-0.02em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9rem] leading-7 text-white/68">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.08),transparent_40%)]" />

        <div className="relative mx-auto flex max-w-[800px] flex-col items-center text-center">
          <h2 className="font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-[#1f1f1f]">
            Ready to find what your vehicle needs?
          </h2>
          <p className="mt-6 max-w-xl text-[1rem] leading-8 text-[#6b7280]">
            Browse our categories, ask our experts, and experience the AVE difference. We are here to help you every step of the way.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex h-14 items-center justify-center rounded-[6px] bg-[#12f215] px-8 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
            >
              BROWSE PRODUCTS
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-14 items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-white px-8 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#1f1f1f] transition-colors duration-200 hover:border-[#12f215] hover:text-[#12a817]"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
