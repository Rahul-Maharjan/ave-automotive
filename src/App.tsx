import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import logo from "./assets/logo.png";
import blackCar from "./assets/black car.jpeg";
import AboutSection from "./components/AboutSection.jsx";
import CategorySection from "./components/CategorySection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import BlogSection from "./components/BlogSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import AboutPage from "./pages/AboutPage.jsx";
import BlogPage from "./pages/BlogPage.jsx";
import SingleBlogPage from "./pages/SingleBlogPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";

const navItems = ["HOME", "ABOUT", "SERVICES", "BLOG", "CONTACT"];

function getNavTo(item: string) {
  switch (item) {
    case "HOME":
      return "/";
    case "ABOUT":
      return "/about";
    case "SERVICES":
      return "/services";
    case "BLOG":
      return "/blog";
    case "CONTACT":
      return "/contact";
    default:
      return `/#${item.toLowerCase()}`;
  }
}

function useScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 50);
      }
    }
  }, [location]);
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative z-20 bg-white/95 shadow-[0_1px_0_rgba(0,0,0,0.06)] backdrop-blur">
      <div className="mx-auto flex h-[110px] max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link className="shrink-0" to="/" aria-label="AVE Automotive home">
          <img
            className="h-[56px] w-auto sm:h-[64px] lg:h-[70px]"
            src={logo}
            alt="AVE Automotive"
          />
        </Link>

        <nav
          className="hidden items-center gap-8 xl:flex"
          aria-label="Primary"
        >
          {navItems.map((item) => (
            <Link
              key={item}
              to={getNavTo(item)}
              className="text-[15px] font-medium tracking-[0.22em] transition-colors duration-200 text-[#6b7280] hover:text-[#111827]"
            >
              {item}
            </Link>
          ))}
        </nav>

        <form
          className="hidden h-[58px] w-full max-w-[330px] items-center gap-3 rounded-full border border-[#e7e7e7] bg-[#f5f3f2] px-5 shadow-[0_0_0_1px_rgba(0,0,0,0.02)_inset] xl:flex"
          role="search"
          aria-label="Search parts"
        >
          <svg
            className="h-5 w-5 text-[#a3a3a3]"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fill="currentColor"
              d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0-2a8.5 8.5 0 1 0 5.38 15.05l4.54 4.54 1.42-1.42-4.54-4.54A8.5 8.5 0 0 0 10.5 2Z"
            />
          </svg>
          <input
            type="search"
            placeholder="Search parts..."
            className="w-full bg-transparent text-[15px] text-[#111827] outline-none placeholder:text-[#9ca3af]"
          />
        </form>

        <button
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#e5e7eb] bg-white text-[#111827] shadow-sm xl:hidden"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className="sr-only">Toggle navigation</span>
          <div className="flex flex-col gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
            <span className="h-0.5 w-5 rounded-full bg-current" />
          </div>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`border-t border-[#ececec] bg-white px-4 py-4 xl:hidden ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <nav
          className="mx-auto flex max-w-[1440px] flex-col gap-3"
          aria-label="Mobile"
        >
          {navItems.map((item) => (
            <Link
              key={item}
              to={getNavTo(item)}
              className={`rounded-2xl px-4 py-3 text-sm font-medium tracking-[0.22em] transition-colors ${
                item === "HOME"
                  ? "bg-[#f0fff0] text-[#12f215]"
                  : "text-[#6b7280] hover:bg-[#f8f8f8] hover:text-[#111827]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </Link>
          ))}

          <form
            className="mt-2 flex h-[56px] items-center gap-3 rounded-full border border-[#e7e7e7] bg-[#f5f3f2] px-5"
            role="search"
            aria-label="Search parts mobile"
          >
            <svg
              className="h-5 w-5 text-[#a3a3a3]"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="currentColor"
                d="M10.5 4a6.5 6.5 0 1 1 0 13 6.5 6.5 0 0 1 0-13Zm0-2a8.5 8.5 0 1 0 5.38 15.05l4.54 4.54 1.42-1.42-4.54-4.54A8.5 8.5 0 0 0 10.5 2Z"
              />
            </svg>
            <input
              type="search"
              placeholder="Search parts..."
              className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#9ca3af]"
            />
          </form>
        </nav>
      </div>
    </header>
  );
}

function HomePage() {
  useScrollToHash();

  return (
    <>
      <main
        id="home"
        className="relative isolate flex min-h-[calc(100vh-110px)] items-center overflow-hidden bg-black/10 bg-cover bg-center px-4 py-16 sm:px-6 lg:px-10"
        style={{ backgroundImage: `url(${blackCar})` }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.35),rgba(0,0,0,0.75))]" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_center,rgba(18,242,21,0.12),rgba(0,0,0,0)_65%)] blur-3xl" />

        <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center text-center">
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-white/55 backdrop-blur-sm">
            Premium performance parts, lubricants, and accessories
          </div>

          <h1 className="max-w-[1000px] font-['Orbitron',sans-serif] text-[clamp(2.35rem,6vw,5.1rem)] font-extrabold leading-[0.94] tracking-[-0.02em] text-white">
            Find the Right <span className="text-[#12f215]">Parts</span>
            <br className="h-0.5" />
            for Your Vehicle
          </h1>

          <p className="mt-8 max-w-[760px] text-[clamp(1rem,2vw,1.35rem)] leading-8 text-white/72">
            Premium performance parts, lubricants, and high-end accessories
            engineered for excellence.
          </p>

          <Link
            to="/#shop"
            className="mt-12 inline-flex h-16 items-center justify-center gap-3 rounded-[6px] bg-[#12f215] px-10 font-['Orbitron',sans-serif] text-[0.95rem] font-bold tracking-[0.18em] text-[#08110a] shadow-[0_14px_40px_rgba(18,242,21,0.28)] transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[#18ff1b]"
          >
            <span>VIEW PRODUCTS</span>
            <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z"
              />
            </svg>
          </Link>
        </div>
      </main>

      <AboutSection />
      <ServicesSection />
      <CategorySection />
      <BlogSection />
      <ContactSection />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#fafafa] text-[#111827]">
        <ScrollToTop/>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<SingleBlogPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
