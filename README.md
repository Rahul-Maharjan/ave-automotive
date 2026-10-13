# AVE Automotive

AVE Automotive is a modern automotive solutions platform that specializes in:

* 🚗 Genuine Car Parts
* 🛢️ Lubricants & Engine Oils
* 🔧 Vehicle Maintenance & Repair Services

The website provides customers with an easy way to explore products, learn about services, and connect with our automotive experts.

---

## Features

### Car Parts

* Genuine and high-quality automotive parts
* Parts for multiple vehicle brands and models
* Detailed product information
* Easy browsing and inquiry system

### Lubricants

* Engine oils
* Transmission fluids
* Coolants
* Brake fluids
* Industrial lubricants

### Automotive Services

* Vehicle diagnostics
* Engine maintenance
* Oil changes
* Brake inspection
* General vehicle servicing
* Professional automotive consultation

### Website Features

* Responsive design for all devices
* Modern user interface
* Fast loading performance
* SEO-friendly structure
* Contact and inquiry forms
* Product and service showcase

---

## Technology Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* React Router
* JavaScript (ES6+)

### Development Tools

* Node.js
* npm

---

## Installation

Clone the repository:

```bash
git clone https://github.com/your-username/ave-automotive.git
```

Navigate to the project directory:

```bash
cd ave-automotive
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and visit:

```bash
http://localhost:5173
```

---

## Build for Production

Create a production build:

```bash
npm run build
```

This runs `tsc -b && vite build` after a `prebuild` step that regenerates
`public/sitemap.xml` from the admin API (static routes are always included; the
build never fails if the API is unreachable).

Preview the production build:

```bash
npm run preview
```

---

## SEO

Every major page sets its own document metadata (`<title>`, description,
canonical URL, Open Graph / Twitter cards, JSON-LD structured data) through the
reusable `<Seo>` component, which is backed by
[`react-helmet-async`](https://www.npmjs.com/package/react-helmet-async) (React 19
compatible).

| Page | Route | Structured data |
| --- | --- | --- |
| Home | `/` | `AutoPartsStore`, `WebSite` |
| About | `/about` | `BreadcrumbList` |
| Services | `/services` | `BreadcrumbList` |
| Blog | `/blog` | `CollectionPage`, `BreadcrumbList` |
| Blog post | `/blog/:slug` | `BlogPosting`, `BreadcrumbList` |
| Product category | `/products/:categorySlug` | `CollectionPage`, `BreadcrumbList` |
| Contact | `/contact` | `AutoPartsStore`, `BreadcrumbList` |
| Not found | `*` | `noindex` |

Configuration lives in [`src/lib/seo.ts`](src/lib/seo.ts). The canonical origin
defaults to `https://aveautomotive.com.np` and can be overridden with
`VITE_SITE_URL` (see `.env.example`).

> **Note:** This is a client-rendered SPA, so metadata is injected in the browser.
> Googlebot executes JavaScript and will see it, but social scrapers (Facebook,
> LinkedIn, X) and some crawlers do not. Rich previews for those services require
> prerendering/SSR. The static defaults in `index.html` cover the fallback case.

---

## Deployment

The app is served from a subdirectory. Vite's `base` (in `vite.config.ts`), the
router's `basename` (in `src/App.tsx`), and the Apache config all assume `/new`.
Keep them in sync if this changes.

1. Configure the environment (optional — defaults already target production):
   ```bash
   cp .env.example .env
   ```
   Set `VITE_SITE_URL` and `VITE_API_BASE_URL` as needed.

2. Build:
   ```bash
   npm run build
   ```

3. Upload the contents of `dist/` to the `public_html/new/` directory (or any
   folder matching Vite's `base`). `dist/.htaccess` is included and provides:
   - SPA fallback, so deep links such as `/new/blog/:slug` work on refresh;
   - long-lived caching for fingerprinted assets, no-cache for HTML;
   - gzip compression, correct MIME types, and basic security headers.

4. Ensure `dist/robots.txt` and `dist/sitemap.xml` are reachable at
   `https://aveautomotive.com.np/new/robots.txt` and
   `https://aveautomotive.com.np/new/sitemap.xml`.

> **Subdirectory SEO note:** crawlers only look for `robots.txt` at the domain
> root (`https://aveautomotive.com.np/robots.txt`), not at `/new/`. If the app
> lives under `/new`, ask the hosting admin to add a `Sitemap:` line to the root
> `robots.txt` pointing at `/new/sitemap.xml`, or submit the sitemap directly in
> Google Search Console.

---

## Project Structure

```bash
src/
├── assets/
├── components/
├── pages/
├── layouts/
├── routes/
├── hooks/
├── data/
├── utils/
├── App.jsx
└── main.jsx

public/
├── images/
├── icons/
└── favicon.ico
```

---

## Mission

Our mission is to provide reliable automotive products and professional services that ensure vehicle performance, safety, and longevity.

---


## License

This project is proprietary and owned by AVE Automotive. All rights reserved.
