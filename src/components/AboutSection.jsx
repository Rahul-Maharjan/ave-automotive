import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import blackCar from '../assets/black car.jpeg'
import engineImg from '../assets/categories/engine.png'
import tireImg from '../assets/categories/tire.png'
import { useAbout } from '../hooks/useAbout'
import { storageUrl } from '../lib/api'
import { htmlToParagraphs, parseStatValue } from '../lib/content'

/** Fallback content shown while the API loads (or if it fails). */
const FALLBACK_WHO_WE_ARE = {
  heading: 'About AVE',
  title: 'We source automotive parts with precision, speed, and a cleaner buying experience.',
  paragraphs: [
    'AVE Automotives brings together performance parts, maintenance essentials, and practical accessories so customers can source what they need from one trusted place. The goal is simple: make the buying experience clear, fast, and dependable.',
    'Founded with a passion for automotive excellence, we have grown from a small supplier into a comprehensive parts provider serving mechanics, enthusiasts, and everyday drivers alike. Our team understands vehicles inside and out, and we bring that knowledge to every interaction.',
  ],
  stats: [
    { label: 'Years of automotive supply experience', value: '12+' },
    { label: 'Parts and accessories sourced for customers', value: '4K+' },
    { label: 'Support mindset for orders and inquiries', value: '24/7' },
  ],
}

/** Labels for the three gallery tiles, matched to the number of images available. */
const API_IMAGE_LABELS = ['AVE Automotives', 'Our Workshop', 'Genuine Parts']
const FALLBACK_IMAGE_LABELS = ['Brand statement', 'Engine', 'Tires']

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
  const count = useCountUp(stat.value ?? 0, active && stat.value !== undefined)
  const displayValue =
    stat.value === undefined ? stat.raw : `${Math.round(count)}${stat.suffix}`

  return (
    <div className="rounded-[18px] border border-[#ececec] bg-white p-5 shadow-[0_10px_26px_rgba(0,0,0,0.04)]">
      <div className="font-['Orbitron',sans-serif] text-[1.65rem] font-bold tracking-[-0.03em] text-[#12a817]">
        {displayValue}
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

export default function AboutSection() {
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
      {
        threshold: 0.35,
      },
    )

    observer.observe(node)

    return () => observer.disconnect()
  }, [])

  const { data: about } = useAbout()
  const whoWeAre = about?.content?.who_we_are

  const badge = whoWeAre?.heading?.trim() || FALLBACK_WHO_WE_ARE.heading
  const title = whoWeAre?.title || FALLBACK_WHO_WE_ARE.title

  const paragraphs = htmlToParagraphs(whoWeAre?.description)
  const descriptionParagraphs = paragraphs.length
    ? paragraphs
    : FALLBACK_WHO_WE_ARE.paragraphs

  const rawStats = whoWeAre?.stats?.length
    ? whoWeAre.stats
    : FALLBACK_WHO_WE_ARE.stats
  const stats = rawStats.map((stat) => parseStatValue(stat.label, stat.value))

  const apiImages = (whoWeAre?.images ?? [])
    .map((image) => storageUrl(image))
    .filter((image) => Boolean(image))
  const imageSources = apiImages.length
    ? [apiImages[0] || blackCar, apiImages[1] || engineImg, apiImages[2] || tireImg]
    : [blackCar, engineImg, tireImg]
  const imageLabels = apiImages.length ? API_IMAGE_LABELS : FALLBACK_IMAGE_LABELS

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f4f4_100%)] px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20"
    >
      <div className="absolute inset-x-0 top-0 h-full bg-[radial-gradient(circle_at_top_left,rgba(18,242,21,0.12),transparent_35%),radial-gradient(circle_at_top_right,rgba(255,138,0,0.10),transparent_28%)]" />

      <div className="relative mx-auto grid max-w-[1350px] gap-10 lg:grid-cols-[1fr_1.02fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12a817]">
            {badge}
          </p>

          <h2 className="mt-4 font-['Orbitron',sans-serif] text-[clamp(1.9rem,3vw,3.35rem)] font-bold leading-[1.02] tracking-[-0.03em] text-[#1f1f1f]">
            {title}
          </h2>

          {descriptionParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`${
                index === 0 ? 'mt-5' : 'mt-4'
              } max-w-2xl text-[1rem] leading-8 text-[#6b7280]`}
            >
              {paragraph}
            </p>
          ))}

          <div ref={statsRef} className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} active={statsActive} />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/about"
              className="inline-flex h-14 items-center justify-center rounded-[6px] bg-[#12f215] px-7 font-['Orbitron',sans-serif] text-[0.9rem] font-bold tracking-[0.16em] text-[#08110a] transition-transform duration-200 hover:-translate-y-0.5"
            >
              LEARN MORE
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
              src={imageSources[0]}
              alt="AVE Automotives brand vehicle"
              className="min-h-12 sm:row-span-2"
              label={imageLabels[0]}
            />
            <ImageTile
              src={imageSources[1]}
              alt="AVE Automotives workshop"
              className="min-h-6"
              label={imageLabels[1]}
            />
            <ImageTile
              src={imageSources[2]}
              alt="Automotive parts and accessories"
              className="min-h-6"
              label={imageLabels[2]}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
