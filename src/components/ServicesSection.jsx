import blackCar from '../assets/black car.jpeg'
import engineImg from '../assets/categories/engine.png'
import cleanerImg from '../assets/categories/cleaner.png'
import lubeImg from '../assets/categories/lube.png'
import breakImg from '../assets/categories/break.png'

const services = [
  {
    title: 'Genuine Parts',
    description: 'Carefully selected components that fit and perform the way they should.',
    icon: engineImg,
  },
  {
    title: 'Expert Advice',
    description: 'Friendly guidance to help you choose the right part for the right job.',
    icon: cleanerImg,
  },
  {
    title: 'Quick Delivery',
    description: 'Efficient processing and shipping to keep your project moving fast.',
    icon: lubeImg,
  },
  {
    title: 'Secure Support',
    description: 'Reliable help before and after purchase so you can buy with confidence.',
    icon: breakImg,
  },
]

function ServiceCard({ service }) {
  return (
    <article className="group relative overflow-hidden rounded-[18px] border border-white/8 bg-[linear-gradient(180deg,rgba(18,18,18,0.94),rgba(8,8,8,0.97))] p-6 shadow-[0_14px_36px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:border-[#12f215]/25 hover:shadow-[0_20px_50px_rgba(0,0,0,0.34)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(18,242,21,0.08),transparent_34%),radial-gradient(circle_at_80%_15%,rgba(255,138,0,0.08),transparent_22%)]" />
      <div className="relative">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-transform duration-300 group-hover:scale-105">
          <img
            src={service.icon}
            alt={service.title}
            loading="lazy"
            className="h-full w-full rounded-xl object-cover"
          />
        </div>

        <h3 className="mt-5 font-['Orbitron',sans-serif] text-[1.15rem] font-bold tracking-[-0.03em] text-white">
          {service.title}
        </h3>

        <p className="mt-3 text-[0.98rem] leading-7 text-white/68">{service.description}</p>
      </div>
    </article>
  )
}

export default function ServicesSection() {
  return (
    <section className="relative isolate overflow-hidden bg-[#060606] px-4 py-14 text-white sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        id='services'
        style={{ backgroundImage: `url(${blackCar})` }}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.82)_0%,rgba(0,0,0,0.66)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(circle_at_top,rgba(18,242,21,0.16),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto max-w-[1350px]">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
          <p className="text-[0.8rem] font-semibold uppercase tracking-[0.35em] text-[#12f215]">
            Services
          </p>
          <h2 className="mt-4 font-['Orbitron',sans-serif] text-[clamp(1.8rem,3vw,2.8rem)] font-bold leading-tight tracking-[-0.03em] text-white">
            Built to support every order from selection to delivery.
          </h2>
          <p className="mt-4 max-w-xl text-[1rem] leading-7 text-white/68">
            A darker, more premium service section that matches the category cards and keeps the
            automotive feel consistent.
          </p>
          </div>

          <div className="hidden h-1 w-20 rounded-full bg-[#12f215] sm:block" />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
