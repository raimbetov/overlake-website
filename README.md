[![DOI](https://zenodo.org/badge/948136126.svg)](https://doi.org/10.5281/zenodo.16997419) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

# overlake.bio

Static website for `overlake.bio`, served via GitHub Pages.

## Under The Hood

- **Site type:** Multi-page static HTML (no build step)
- **Core pages:** `index.html`, `about.html`, `projects.html`, `publications.html`, `documentation.html`, `blog.html`, plus a styled `404.html`
- **Styling:** `css/dark.min.css` (Water.css base) + custom layer in `css/overlake-styles.css` (design tokens, typography, animations, print styles)
- **Visual background:** Fixed water image served as WebP with JPG fallback via `image-set()` (`asset/water-6901805_1920.{webp,jpg}`) + self-hosted particles.js (`js/particles.min.js` + `js/particles-config.js`)
- **Enhancements:** `js/enhancements.js` adds progressive, reduced-motion-aware scroll-reveal for content sections
- **SEO / social:** Per-page meta description, canonical, and Open Graph / Twitter Card tags with a shared `asset/og-image.png`
- **Documents:** Local PDFs in `pdf/`
- **Domain:** `CNAME` config for custom domain routing

## Structure

```text
.
├── index.html
├── about.html
├── projects.html
├── publications.html
├── documentation.html
├── blog.html
├── 404.html
├── css/
│   ├── dark.min.css
│   ├── overlake-styles.css
│   ├── academic.css
│   └── latex.css
├── js/
│   ├── particles.min.js       # vendored particles.js (no CDN)
│   ├── particles-config.js
│   └── enhancements.js         # scroll-reveal
├── asset/
│   ├── favicons/
│   ├── og-image.png            # social share card
│   ├── water-6901805_1920.webp
│   └── water-6901805_1920.jpg
├── pdf/
└── CNAME
```

## Rendering Notes

- No third-party CDN at runtime — particles.js is vendored locally
- Particle initialization is deferred to page load with a double `requestAnimationFrame` for stable canvas sizing
- Content sections fade and rise in on scroll via `IntersectionObserver`; with no JS they render fully visible
- `prefers-reduced-motion` disables particle rendering and scroll-reveal
- Hyphenation is enabled for justified long-form text and disabled on narrow/mobile layout
- All internal links are relative, so pages render correctly whether opened directly or served

## Deployment

- Hosted on **GitHub Pages** from `main`
- No package manager, bundler, or framework runtime is required

## Acknowledgments

**Styling**
- [Water.css](https://github.com/kognise/water.css); a drop-in CSS framework for minimal design

**Libraries**
- [particles.js](https://github.com/VincentGarreau/particles.js) by Vincent Garreau (MIT); vendored locally in `js/particles.min.js`

**Assets**
- Background image by [Kranich17](https://pixabay.com/users/kranich17-11197573/)
