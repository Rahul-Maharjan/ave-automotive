import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import blackCar from '../assets/black car.jpeg'
import engineImg from '../assets/categories/engine.png'
import tireImg from '../assets/categories/tire.png'

const stats = [
  {
    value: 12,
    suffix: '+',
    label: 'Years of automotive supply experience',
  },
  {
    value: 4000,
    suffix: '+',
    label: 'Parts and accessories sourced for customers',
    formatter: (value) => `${Math.round(value / 100) / 10}K`,
  },
  {
    value: 24,
    suffix: '/7',
    label: 'Support mindset for orders and inquiries',
  },
]

const missionVision = [
  {
    title: 'Our Mission',
    description:
      'To simplify the automotive parts supply chain by providing a trusted platform where customers can find quality components, expert guidance, and seamless service from selection to delivery.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Our Vision',
    description:
      'To become the most reliable automotive parts source in the region, known for speed, integrity, and a genuine commitment to helping every customer keep their vehicle performing at its best.',
    icon: (
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v4" />
        <path d="M12 18v4" />
        <path d="M4.93 4.93l2.83 2.83" />
        <path d="M16.24 16.24l2.83 2.83" />
        <path d="M2 12h4" />
        <path d="M18 12h4" />
        <path d="M4.93 19.07l2.83-2.83" />
        <path d="M16.24 7.76l2.83-2.83" />
      </svg>
    ),
  },
]

const values = [
  {
    title: 'Quality First',
    description: 'Every part we source meets strict quality standards so our customers can buy with absolute confidence.',
    color: 'text-[#12f215]',
    bgGlow: 'bg-[#12f215]',
  },
  {
    title: 'Reliability',
    description: 'We deliver on our promises with consistent service, accurate orders, and dependable support every time.',
    color: 'text-[#ff8a00]',
    bgGlow: 'bg-[#ff8a00]',
  },
  {
    title: 'Integrity',
    description: 'Honest advice, transparent pricing, and fair dealings are the foundation of every relationship we build.',
    color: 'text-[#3b82f6]',
    bgGlow: 'bg-[#3b82f6]',
  },
  {
    title: 'Innovation',
    description: 'We continuously improve our processes and platform to make sourcing parts faster and simpler for our customers.',
    color: 'text-[#a855f7]',
    bgGlow: 'bg-[#a855f7]',
  },
]

function useCountUp(target, active, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) {
      setValue(0)
      return undefined
    }

    let frameId = 0
    const start = performance.now()

    const animate = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(target * eased)

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(frameId)
  }, [active, duration, target])

  return value
}

function StatCard({ stat, active }) {
  const count = useCountUp(stat.value, active)
  const displayValue = stat.formatter ? stat.formatter(count) : Math.round(count)

  return (
    <div className="rounded-[18px] border border-[#ececec] bg-white p-5 shadow-[0_10px_26px_rgba(0,0,0,0.04)]">
      <div className="font-['Orbitron',sans-serif] text-[1.65rem] font-bold tracking-[-0.03em] text-[#12a817]">
        {displayValue}
        {stat.suffix}
      </div>
      <p className="mt-2 text-sm leading-6 text-[#6b7280]">{stat.label}</p>
    </div>
  )
}

function ImageTile({ src, alt, className = '', label }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b] shadow-[0_18px_50px_rgba(0,0,0,0.18)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.62),rgba(0,0,0,0.02)_55%)]" />
      {label ? (
        <div className="absolute inset-x-0 bottom-0 p-4">
          <div className="inline-flex rounded-full border border-white/10 bg-black/40 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/75 backdrop-blur-sm">
            {label}
          </div>
        </div>
      ) : null}
    </div>
  )
}

function ValueCard({ value }) {
  return (
    <div className="group relative overflow-hidden rounded-[18px] border border-[#ececec] bg-white p-6 shadow-[0_10px_26px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(0,0,0,0.10)]">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[#ececec] bg-[#fafafa]">
        <div className={`h-1 w-6 rounded-full ${value.bgGlow}`} />
      </div>
      <h3 className="font-['Orbitron',sans-serif] text-[1.05rem] font-bold tracking-[-0.02em] text-[#1f1f1f]">
        {value.title}
      </h3>
      <p className="mt-3 text-[0.95rem] leading-7 text-[#6b7280]">{value.description}</p>
    </div>
  )
}

export default function AboutPage() {
  const statsRef = useRef(null)
  const [statsActive, setStatsActive] = useState(false)

  useEffect(() => {
    const node = statsRef.current
    if (!node) return undefined

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsActive(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PageHeader
        badge="About AVE Automotives"
        titleBefore="Your Trusted Partner in"
        highlight="Automotive Parts"
        description="With over a decade of experience, AVE Automotives delivers quality parts, expert advice, and dependable service to keep your vehicle performing at its peak."
        backgroundImage={blackCar}
      >
        <a
          href="#story"
          className="mt-12 inline-flex h-16 items-center justify-center gap-3 rounded-[6px] bg-[#12f215] px-10 font-['Orbitron',sans-serif] text-[0.95rem] font-bold tracking-[0.18em] text-[#08110a] shadow-[0_14px_40px_rgba(18,242,21,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#18ff1b]"
        >
          <span>OUR STORY</span>
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 13l5 5 5-5" />
            <path d="M12 6v12" />
          </svg>
        </a>
      </PageHeader>

      {/* ───── STORY / INTRO SECTION ───── */}
      <section
        id="story"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f4_100%)] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20"
      >
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(18,242,21,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(255,138,0,0.10),transparent_28%)]" />

        <div className="relative mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12a817]">
              Who We Are
            </p>

            <h2 className="mt-4 font-['Orbitron',sans-serif] text-[clamp(1.9rem,3vw,3.35rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#1f1f1f]">
              We source automotive parts with precision, speed, and a cleaner buying experience.
            </h2>

            <p className="mt-5 max-w-2xl text-[1rem] leading-8 text-[#6b7280]">
              AVE Automotives brings together performance parts, maintenance essentials, and
              practical accessories so customers can source what they need from one trusted place.
              The goal is simple: make the buying experience clear, fast, and dependable.
            </p>

            <p className="mt-4 max-w-2xl text-[1rem] leading-8 text-[#6b7280]">
              Founded with a passion for automotive excellence, we have grown from a small 
              supplier into a comprehensive parts provider serving mechanics, enthusiasts, and 
              everyday drivers alike. Our team understands vehicles inside and out, and we bring 
              that knowledge to every interaction.
            </p>

            <div ref={statsRef} className="mt-8 grid gap-4 sm:grid-cols-3">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} active={statsActive} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex h-14 items-center justify-center rounded-[6px] bg-[#12f215] px-7 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
              >
                EXPLORE CATEGORIES
              </Link>
              <Link
                to="/#contact"
                className="inline-flex h-14 items-center justify-center rounded-[6px] border border-[#e5e7eb] bg-white px-7 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#1f1f1f] transition-colors duration-200 hover:border-[#12f215] hover:text-[#12a817]"
              >
                CONTACT US
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 -top-4 h-24 w-24 rounded-full bg-[#12f215]/15 blur-3xl" />
            <div className="absolute -bottom-8 right-4 h-28 w-28 rounded-full bg-[#ff8a00]/15 blur-3xl" />

            <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
              <ImageTile
                src={blackCar}
                alt="AVE Automotives brand vehicle"
                className="min-h-12 sm:row-span-2"
                label="Brand statement"
              />
              <ImageTile src={engineImg} alt="Engine parts" className="min-h-6" label="Engine" />
              <ImageTile src={tireImg} alt="Tires and wheels" className="min-h-6" label="Tires" />
            </div>
          </div>
        </div>
      </section>

      {/* ───── MISSION & VISION ───── */}
      <section className="relative isolate overflow-hidden bg-[#060606] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(18,242,21,0.08),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(255,138,0,0.06),transparent_40%)]" />
        <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(18,242,21,0.12),transparent_60%)] blur-3xl" />

        <div className="relative mx-auto max-w-[1350px]">
          <div className="flex flex-col items-center text-center">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12f215]">
              Mission & Vision
            </p>
            <h2 className="mt-4 max-w-2xl font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-white">
              Driven by purpose, guided by values.
            </h2>
            <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-[#12f215]" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {missionVision.map((item) => (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,18,18,0.94),rgba(8,8,8,0.97))] p-8 shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12f215]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.34)]"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(18,242,21,0.08),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(255,138,0,0.08),transparent_22%)]" />
                <div className="relative">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-[#12f215] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-transform duration-300 group-hover:scale-105">
                    {item.icon}
                  </div>
                  <h3 className="mt-6 font-['Orbitron',sans-serif] text-[1.3rem] font-bold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-[1rem] leading-8 text-white/68">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── OUR VALUES ───── */}
      <section className="relative overflow-hidden bg-white px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
        <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_bottom_left,rgba(18,242,21,0.08),transparent_30%),radial-gradient(circle_at_top_right,rgba(255,138,0,0.06),transparent_25%)]" />

        <div className="relative mx-auto max-w-[1350px]">
          <div className="flex flex-col items-center text-center">
            <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12a817]">
              Our Values
            </p>
            <h2 className="mt-4 max-w-2xl font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-[#1f1f1f]">
              What we stand for
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-[#12f215]" />
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((val) => (
              <ValueCard key={val.title} value={val} />
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA SECTION ───── */}
      <section className="relative isolate overflow-hidden bg-[#060606] px-4 py-16 sm:px-6 sm:py-20 lg:px-10 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.10),transparent_60%)] blur-2xl" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-[radial-gradient(circle_at_center,rgba(255,138,0,0.08),transparent_50%)] blur-2xl" />

        <div className="relative mx-auto flex max-w-[800px] flex-col items-center text-center">
          <h2 className="font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-white">
            Ready to find the right parts for your vehicle?
          </h2>
          <p className="mt-6 max-w-xl text-[1rem] leading-8 text-white/68">
            Browse our categories, get expert advice, and experience the AVE difference. 
            We are here to help you every step of the way.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/"
              className="inline-flex h-14 items-center justify-center rounded-[6px] bg-[#12f215] px-8 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
            >
              SHOP CATEGORIES
            </Link>
            <Link
              to="/#contact"
              className="inline-flex h-14 items-center justify-center rounded-[6px] border border-white/15 bg-white/5 px-8 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-white transition-colors duration-200 hover:border-[#12f215] hover:text-[#12f215]"
            >
              GET IN TOUCH
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
