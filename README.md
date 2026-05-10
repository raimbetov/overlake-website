[![DOI](https://zenodo.org/badge/948136126.svg)](https://doi.org/10.5281/zenodo.16997419) [![License: CC BY 4.0](https://img.shields.io/badge/License-CC%20BY%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by/4.0/)

# overlake.bio

Static website for `overlake.bio`, served via GitHub Pages.

## Under The Hood

- **Site type:** Multi-page static HTML (no build step)
- **Core pages:** `index.html`, `projects.html`, `publications.html`, `documentation.html`, `blog.html`
- **Styling:** `css/dark.min.css` + custom layer in `css/overlake-styles.css`
- **Visual background:** Fixed image (`asset/water-6901805_1920.jpg`) + particles.js (`js/particles-config.js`)
- **Documents:** Local PDFs in `pdf/`
- **Domain:** `CNAME` config for custom domain routing

## Structure

```text
.
├── index.html
├── projects.html
├── publications.html
├── documentation.html
├── blog.html
├── css/
│   ├── dark.min.css
│   ├── overlake-styles.css
│   ├── academic.css
│   └── latex.css
├── js/
│   └── particles-config.js
├── asset/
│   ├── favicons/
│   └── water-6901805_1920.jpg
├── pdf/
└── CNAME
```

## Rendering Notes

- Particle initialization is deferred to page load with a double `requestAnimationFrame` for stable canvas sizing
- `prefers-reduced-motion` disables particle rendering
- Hyphenation is enabled for justified long-form text and disabled on narrow/mobile layout

## Deployment

- Hosted on **GitHub Pages** from `main`
- No package manager, bundler, or framework runtime is required

## Acknowledgments

**Styling**
- [Water.css](https://github.com/kognise/water.css); a drop-in CSS framework for minimal design

**Assets**
- Background image by [Kranich17](https://pixabay.com/users/kranich17-11197573/)
