[![DOI](https://zenodo.org/badge/948136126.svg)](https://doi.org/10.5281/zenodo.16997419) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

# overlake.bio

Static website for `overlake.bio`, served via GitHub Pages.

## Under The Hood

- **Site type:** Multi-page static HTML (no build step)
- **Core pages:** `index.html`, `about.html`, `projects.html`, `publications.html`, `media.html`, `blog.html`, plus a styled `404.html` (`documentation.html` is retained as a legacy page, outside the nav)
- **Agent skill:** `skill/overlake-bio/` is a portable context bundle for AI agents, published as a root `SKILL.md`, a `skill/overlake-bio.zip` download, and an `llms.txt` index
- **Styling:** `css/dark.min.css` (Water.css base) + custom layer in `css/overlake-styles.css` (design tokens, typography, animations, panels and cards, figures, print styles)
- **Home layout:** masthead descriptor under the logo, a highlights carousel, the section panel grid, then the agent bundle. The carousel is a CSS scroll-snap row — it swipes and scrolls with no script; JS only adds arrows, dots and arrow keys
- **Figures:** project entries, blog posts and carousel slides each reserve a picture slot, currently rendered as a placeholder box. Real images drop in as `<img>` with no CSS change
- **Typography:** system sans for body/logo; self-hosted **Fraunces** (variable serif, `asset/fonts/Fraunces-latin.woff2`) for headings, with small heading tags kept sans for contrast
- **Visual background:** Fixed water image served as WebP with JPG fallback via `image-set()` (`asset/water-6901805_1920.{webp,jpg}`) + self-hosted particles.js (`js/particles.min.js` + `js/particles-config.js`)
- **Enhancements:** `js/enhancements.js` adds progressive, reduced-motion-aware scroll-reveal for content sections and blog cards, the carousel controls, and copy-to-clipboard for the skill URL
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
├── media.html
├── blog.html
├── documentation.html          # legacy, not in the nav
├── 404.html
├── SKILL.md                    # agent skill, alias of skill/overlake-bio/SKILL.md
├── llms.txt                    # llmstxt.org index
├── skill/
│   ├── overlake-bio.zip        # downloadable bundle
│   └── overlake-bio/
│       ├── SKILL.md
│       └── references/         # theory, projects, pipeline, publications, press
├── css/
│   ├── dark.min.css
│   └── overlake-styles.css
├── js/
│   ├── particles.min.js       # vendored particles.js (no CDN)
│   ├── particles-config.js
│   └── enhancements.js         # scroll-reveal, carousel, clipboard
├── asset/
│   ├── favicons/
│   ├── fonts/
│   │   └── Fraunces-latin.woff2  # self-hosted serif for headings
│   ├── og-image.png            # social share card
│   ├── water-6901805_1920.webp
│   └── water-6901805_1920.jpg
├── pdf/
└── CNAME
```

## Rendering Notes

- No third-party CDN at runtime — particles.js is vendored locally, and no page requests a third-party image
- Particle initialization is deferred to page load with a double `requestAnimationFrame` for stable canvas sizing
- Content sections and blog cards fade and rise in on scroll via `IntersectionObserver`; with no JS they render fully visible
- The carousel works without JS: the track is a scroll-snap row, and its scrollbar stays visible until the script replaces it with arrows and dots
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
