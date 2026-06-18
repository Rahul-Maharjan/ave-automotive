import engineImg from '../assets/categories/engine.png'
import blackCar from '../assets/black car.jpeg'
import tireImg from '../assets/categories/tire.png'
import cleanerImg from '../assets/categories/cleaner.png'

const blogPosts = [
  {
    id: 1,
    slug: 'engine-oil-guide',
    title: 'How to Choose the Right Engine Oil for Your Vehicle',
    excerpt: 'Understanding viscosity ratings, certifications, and synthetic vs. conventional blends to keep your engine running at its best.',
    image: engineImg,
    date: 'Jun 8, 2026',
    author: 'AVE Team',
    category: 'Maintenance',
    content: [
      'Choosing the right engine oil is one of the most important decisions you can make for your vehicle\'s long-term health. With so many options on the shelf, it is easy to feel overwhelmed, but understanding a few key factors simplifies the process considerably.',
      'Engine oil serves three primary functions: lubricating moving parts, reducing friction and heat, and keeping the engine clean by suspending contaminants. The right oil ensures your engine operates efficiently and lasts longer.',
      'Viscosity is the most critical factor. It is expressed as a number like 5W-30 or 10W-40. The first number with a "W" indicates the oil\'s flow at cold temperatures, and the second number represents its thickness at operating temperature. Always follow your vehicle manufacturer\'s recommended viscosity grade.',
      'Synthetic oils offer superior performance in extreme temperatures, better oxidation resistance, and longer drain intervals compared to conventional oils. While they cost more upfront, the extended protection often makes them more economical over the life of the engine.',
      'Look for certifications from the American Petroleum Institute on the bottle. The "Starburst" symbol indicates the oil meets current industry standards for gasoline engines. For diesel engines, look for the appropriate API category.',
      'Regular oil changes remain the single most effective maintenance task for prolonging engine life. Follow your owner\'s manual for intervals, and consider more frequent changes if you drive in severe conditions such as extreme temperatures, dusty environments, or heavy stop-and-go traffic.',
    ],
  },
  {
    id: 2,
    slug: 'performance-upgrades-under-500',
    title: 'Top 5 Performance Upgrades Under $500',
    excerpt: 'Affordable modifications that deliver real gains in horsepower, handling, and driving enjoyment without breaking the bank.',
    image: blackCar,
    date: 'May 22, 2026',
    author: 'AVE Team',
    category: 'Performance',
    content: [
      'You do not need to spend thousands of dollars to make your car faster, sharper, and more enjoyable to drive. Here are five performance upgrades that deliver measurable improvements for under $500 each.',
      'A performance air intake replaces the restrictive factory air box with a high-flow filter and smoother tubing. This allows your engine to breathe more freely, typically adding five to fifteen horsepower. The improved induction sound is an added bonus that enhances the driving experience.',
      'Upgrading to a performance ECU tune is one of the best bangs for your buck. A professional remap optimizes fuel mapping, ignition timing, and boost pressure for your specific vehicle. Gains of twenty to forty horsepower are common, and throttle response improves dramatically.',
      'High-performance brake pads make a tremendous difference in stopping power and fade resistance. They are a safety upgrade as much as a performance one, and they transform the feel of the brake pedal for more confident driving on both road and track.',
      'A rear sway bar upgrade reduces body roll during cornering, sharpening turn-in response and improving overall handling. It is one of the simplest suspension modifications you can make and delivers an immediate, noticeable improvement in how your car feels through corners.',
      'Finally, lightweight alloy wheels reduce unsprung weight, improving acceleration, braking, and ride quality. Paired with high-performance tires, they transform the character of any vehicle and are well worth the investment for the enthusiast on a budget.',
    ],
  },
  {
    id: 3,
    slug: 'seasonal-tire-guide',
    title: 'Seasonal Tire Guide: When to Switch & What to Look For',
    excerpt: 'Maximize safety and tread life with the right tire selection for summer, winter, and all-season driving conditions.',
    image: tireImg,
    date: 'May 10, 2026',
    author: 'AVE Team',
    category: 'Tires',
    content: [
      'Tires are the only part of your vehicle that makes contact with the road. Choosing the right set for the season is not just about performance, it is about safety. This guide covers when to switch and what to look for in each tire type.',
      'Summer tires are designed for warm weather performance. Their rubber compound remains pliable in heat, providing outstanding grip on both dry and wet roads. However, they lose traction dramatically when temperatures drop below forty-five degrees Fahrenheit.',
      'Winter tires use a special rubber compound that stays flexible in freezing temperatures. Deeper tread patterns and sipes provide grip on snow and ice. The difference between winter tires and all-season tires in cold conditions is night and day.',
      'All-season tires offer a compromise that works well for moderate climates. They provide adequate performance year-round without the need for seasonal swaps. However, they do not match summer tires in warm weather grip or winter tires in snow and ice.',
      'A good rule of thumb is to switch to winter tires when temperatures consistently fall below forty-five degrees. Install them before the first snowfall, not after. Summer tires should go back on when spring temperatures reliably stay above that threshold.',
      'Check tread depth regularly using the penny test. Insert a penny into the tread with Lincoln\'s head facing down. If you can see the top of his head, your tread is below two thirty-seconds of an inch and it is time for new tires regardless of the season.',
    ],
  },
  {
    id: 4,
    slug: 'car-detailing-guide',
    title: 'The Complete Guide to Car Detailing at Home',
    excerpt: 'Professional-grade results with DIY techniques for paint correction, interior care, and long-lasting protection.',
    image: cleanerImg,
    date: 'Apr 28, 2026',
    author: 'AVE Team',
    category: 'Car Care',
    content: [
      'Professional detailing can cost hundreds of dollars, but with the right techniques and products, you can achieve showroom-quality results in your own driveway. This guide walks through the complete process step by step.',
      'Start with the wheels and tires. Use a dedicated wheel cleaner and a stiff brush to remove brake dust and grime. Rinse thoroughly before moving to the paint. This prevents cross-contamination that could scratch your paintwork.',
      'The two-bucket wash method is essential for avoiding swirl marks. One bucket holds soapy water, the other clean water for rinsing your mitt. A microfiber wash mitt glides over the paint without causing damage.',
      'Clay bar treatment removes bonded contaminants that washing cannot. After washing, spray a lubricant and glide the clay bar over the paint. You will feel it smooth out as it pulls impurities from the surface.',
      'Paint correction addresses swirl marks, light scratches, and oxidation. A dual-action polisher with the appropriate compound and pad combination can restore depth and gloss to faded paint. Work in small sections and follow up with a finer polish for maximum clarity.',
      'Finish with a high-quality wax, sealant, or ceramic coating. Ceramic coatings offer the longest protection, lasting up to several years. They create a hydrophobic surface that repels water and makes future washes significantly easier.',
      'For the interior, vacuum thoroughly and use appropriate cleaners for each surface. Leather requires conditioning to prevent cracking, while fabric upholstery benefits from steam cleaning or upholstery shampoo. A final wipe with a protectant on dash and trim restores a like-new appearance.',
    ],
  },
]

export default blogPosts
