import logo from '../assets/logo.png'

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Shop', href: '#shop' },
  { label: 'Categories', href: '#categories' },
  { label: 'About', href: '#about' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
]

const services = [
  { label: 'Genuine Parts', href: '#' },
  { label: 'Expert Advice', href: '#' },
  { label: 'Quick Delivery', href: '#' },
  { label: 'Secure Support', href: '#' },
]

const contacts = [
  { label: 'info@aveautomotive.com.np', href: 'mailto:info@aveautomotive.com.np' },
  { label: '+1 (555) 123-4567', href: 'tel:+15551234567' },
  { label: 'Kupondol-Lalitpur,Nepal', href: '#' },
]

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/5 bg-[#060606] px-4 pb-6 pt-14 sm:px-6 lg:px-10 lg:pt-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.08),transparent_60%)] blur-3xl" />

      <div className="relative mx-auto grid max-w-[1350px] gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12">
        <div>
          <img
            src={logo}
            alt="AVE Automotive"
            className="h-14 w-auto"
          />
          <p className="mt-5 max-w-xs text-[0.95rem] leading-7 text-white/55">
            Premium performance parts, lubricants, and high-end accessories engineered for
            automotive excellence.
          </p>
          <div className="mt-6 flex gap-3">
            {['facebook', 'instagram', 'twitter', 'youtube'].map((platform) => (
              <a
                key={platform}
                href="#"
                aria-label={platform}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-200 hover:border-[#12f215]/40 hover:bg-[#12f215]/10 hover:text-[#12f215]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  {platform === 'facebook' && <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />}
                  {platform === 'instagram' && <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />}
                  {platform === 'twitter' && <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />}
                  {platform === 'youtube' && <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-['Orbitron',sans-serif] text-sm font-bold tracking-[0.2em] text-white">
            QUICK LINKS
          </h3>
          <ul className="mt-5 space-y-3">
            {quickLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-[0.95rem] text-white/50 transition-colors duration-200 hover:text-[#12f215]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-['Orbitron',sans-serif] text-sm font-bold tracking-[0.2em] text-white">
            SERVICES
          </h3>
          <ul className="mt-5 space-y-3">
            {services.map((service) => (
              <li key={service.label}>
                <a
                  href={service.href}
                  className="text-[0.95rem] text-white/50 transition-colors duration-200 hover:text-[#12f215]"
                >
                  {service.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-['Orbitron',sans-serif] text-sm font-bold tracking-[0.2em] text-white">
            CONTACT
          </h3>
          <ul className="mt-5 space-y-4">
            {contacts.map((contact) => (
              <li key={contact.label}>
                <a
                  href={contact.href}
                  className="flex items-start gap-3 text-[0.95rem] text-white/50 transition-colors duration-200 hover:text-[#12f215]"
                >
                  {contact.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative mx-auto mt-14 max-w-[1350px] border-t border-white/5 pt-6 sm:mt-16 lg:mt-20">
        <div className="flex flex-col items-center justify-between gap-3 text-center text-[0.85rem] text-white/40 sm:flex-row sm:text-left">
          <p>&copy; {new Date().getFullYear()} AVE Automotives. All rights reserved.</p>
          <p>Developed by Archiesoft Technologies</p>
        </div>
      </div>
    </footer>
  )
}
