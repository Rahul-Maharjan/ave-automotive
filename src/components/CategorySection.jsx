import breakImg from '../assets/categories/break.png'
import cleanerImg from '../assets/categories/cleaner.png'
import engineImg from '../assets/categories/engine.png'
import lubeImg from '../assets/categories/lube.png'
import seatImg from '../assets/categories/seat.png'
import tireImg from '../assets/categories/tire.png'

const categories = [
  {
    title: 'Tires & Wheels',
    subtitle: 'Explore 240+ Products',
    image: tireImg,
  },
  {
    title: 'Engine Parts',
    subtitle: 'Reliability & Power',
    image: engineImg,
  },
  {
    title: 'Accessories',
    subtitle: 'Personalize Your Ride',
    image: seatImg,
  },
  {
    title: 'Lubricants',
    subtitle: 'High Performance Oils',
    image: lubeImg,
  },
  {
    title: 'Car Care',
    subtitle: 'Maintain the Shine',
    image: cleanerImg,
  },
  {
    title: 'Brake System',
    subtitle: 'Safety First Components',
    image: breakImg,
  },
]

function CategoryCard({ category }) {
  return (
    <article className="group relative min-h-[550px] overflow-hidden rounded-[14px] bg-[#0d0d0d] shadow-[0_8px_22px_rgba(0,0,0,0.18)] transition-transform duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.04),rgba(0,0,0,0.28)_55%,rgba(0,0,0,0.85))]" />
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(to_top,rgba(0,0,0,0.88),rgba(0,0,0,0))]" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-6 sm:p-7">
        <h3 className="max-w-[11ch] font-['Orbitron',sans-serif] text-[clamp(1.55rem,2.4vw,2rem)] font-bold leading-[0.95] text-white">
          {category.title}
        </h3>
        <p className="mt-3 font-['Orbitron',sans-serif] text-[clamp(0.9rem,1.1vw,1rem)] font-medium tracking-[0.04em] text-[#ff9900]">
          {category.subtitle}
        </p>
      </div>
    </article>
  )
}

export default function CategorySection() {
  return (
    <section id="categories" className="bg-white px-4 py-14 sm:px-6 sm:py-[4.5rem] lg:px-10 lg:py-20">
      <div className="mx-auto max-w-[1350px]">
        <div className="mb-10 flex flex-col gap-4 sm:mb-12 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h2 className="font-['Orbitron',sans-serif] text-[clamp(1.5rem,3vw,2rem)] font-bold leading-tight tracking-[-0.03em] text-[#262626]">
              Shop by Categories
            </h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-[#12f215]" />
          </div>

          <a
            href="#categories"
            className="inline-flex items-center gap-3 self-start text-[clamp(0.95rem,1vw,1.05rem)] font-medium tracking-[0.06em] text-[#ff8a00] transition-transform duration-200 hover:translate-x-1"
          >
            View All Categories
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>

        <div  className="grid gap-5 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>
      </div>
    </section>
  )
}
