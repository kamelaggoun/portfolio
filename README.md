# Kamel Aggoun — Data Analyst Portfolio

A professional, minimal, and fast portfolio website for **Kamel Aggoun** — a Data
Analyst with a background in English Language and Literature, skilled in **Python,
SQL, Excel, and Power BI**.

Built with plain **HTML5, CSS3, and vanilla JavaScript**. No frameworks, no build
step, no backend. Deploys directly to **GitHub Pages**.

---

## Table of contents

1. [Overview](#1-overview)
2. [Features](#2-features)
3. [Technologies](#3-technologies)
4. [Repository structure](#4-repository-structure)
5. [Getting started](#5-getting-started)
6. [How to customize personal information](#6-how-to-customize-personal-information)
7. [How to update the CV](#7-how-to-update-the-cv)
8. [How to add a project](#8-how-to-add-a-project)
9. [How to add images](#9-how-to-add-images)
10. [How to add a certification](#10-how-to-add-a-certification)
11. [How to deploy with GitHub Pages](#11-how-to-deploy-with-github-pages)
12. [Design &amp; accessibility notes](#12-design--accessibility-notes)
13. [License](#13-license)

---

## 1. Overview

This portfolio is designed to present a Data Analyst for job applications: a clear
hero section, an honest "About" statement, categorized skills, an expandable
projects section, an experience timeline, education, certifications, and contact
details.

It intentionally **avoids invented content**: work experience, certificates, and
statistics are left as clearly marked `[placeholders]` so you can fill them in with
your real information.

## 2. Features

- **Responsive, mobile-first layout** — works from small phones to large screens.
- **Sticky header** with an accessible mobile menu (works even without JavaScript).
- **Expandable project cards** using native `<details>/<summary>` — no framework.
- **Project filtering** by technology (Python, SQL, Power BI, Excel).
- **Scroll-spy** active navigation state.
- **Dark / light mode** toggle, saved to `localStorage` and honoring the OS preference.
- **Scroll-reveal animations** that respect `prefers-reduced-motion`.
- **Back-to-top** button.
- **Smooth scrolling** between sections.
- **Fully usable without JavaScript** (the menu is a CSS checkbox toggle, projects
  are native `<details>`, links are plain anchors).
- **Accessible**: semantic HTML, heading hierarchy, skip link, keyboard focus states,
  ARIA labels, and sufficient color contrast.
- **SEO-ready**: descriptive title, meta description, Open Graph tags, JSON-LD
  structured data, `robots.txt`, and `sitemap.xml`.

## 3. Technologies

| Layer | Technology |
| ----- | ---------- |
| Markup | HTML5 (semantic elements) |
| Styling | CSS3 (custom properties, grid/flexbox, no framework) |
| Behaviour | Vanilla JavaScript (progressive enhancement) |
| Fonts | Google Fonts — Inter &amp; JetBrains Mono (with system fallbacks) |
| Hosting | GitHub Pages (static, no backend) |

## 4. Repository structure

```
/
├── index.html            # The entire single-page site
├── README.md             # This file
├── LICENSE               # MIT license
├── robots.txt            # Search engine rules
├── sitemap.xml           # Sitemap for search engines
├── assets/
│   ├── images/           # Project images + Open Graph image
│   ├── icons/            # Favicon
│   └── cv/               # Your CV (Kamel-Aggoun-CV.pdf)
├── projects/
│   ├── project-01/       # Per-project folder (screenshots, docs, data)
│   ├── project-02/
│   └── project-03/
├── css/
│   └── style.css         # All styles (organized, commented)
└── js/
    └── script.js         # All behaviour (organized, commented)
```

## 5. Getting started

No build tools required. To preview locally:

```bash
# Option A — just open the file
open index.html

# Option B — serve the folder (recommended)
python3 -m http.server 8000
# then visit http://localhost:8000
```

> Tip: a local server (Option B) matches GitHub Pages behavior more closely.

## 6. How to customize personal information

All personal data lives in **`index.html`** in a few obvious places:

| What | Where to edit |
| ---- | ------------- |
| Name, title, introduction | The `<section class="hero">` block |
| About text | The `<section id="about">` block |
| Skills | The `<section id="skills">` block (chips) |
| Experience | The `<section id="experience">` timeline |
| Education | The `<section id="education">` block |
| Certifications | The `<section id="certifications">` block |
| Contact links (email, LinkedIn, GitHub) | Hero, contact section, and footer |
| Site title / meta description / OG tags | The `<head>` of `index.html` |
| Colors &amp; fonts | CSS variables at the top of `css/style.css` |
| Sitemap URL | `sitemap.xml` |
| Footer | The `<footer>` element |

Search for the `EDIT:` comments in `index.html` — they mark the spots intended to
change. Replace any `[placeholder]` text with your real details.

## 7. How to update the CV

1. Replace **`assets/cv/Kamel-Aggoun-CV.pdf`** with your own PDF (keep the same
   filename, or update the two "Download CV" links in `index.html`).
2. The current file is a **placeholder** generated from the portfolio content so the
   button always works — swap it for your real CV before applying.

## 8. How to add a project

Each project is a single `<article class="project-card">` block in the
`<div class="projects-list">` section of `index.html`. To add a new one:

1. Copy an existing `<article class="project-card">…</article>` block and paste it
   below the last project.
2. Update:
   - `data-tags` — space-separated filter tags (`python`, `sql`, `power-bi`, `excel`, …)
   - `data-title` — the project name
   - the `<img src="…">` — point it at your screenshot in `assets/images/`
   - the title, tagline, and `<span class="tag">…</span>` technologies
   - the business problem, key insights, and results fields
   - the GitHub repository and live-demo links
3. Create a matching folder under `projects/` (e.g. `projects/project-04/`) for the
   project's screenshots, docs, and data. Copy a `README.md` from an existing
   project folder as a template.

No JavaScript changes are needed — filtering and the expand/collapse behavior are
automatic.

## 9. How to add images

- **Project screenshots:** drop them in `assets/images/` (PNG/JPG/SVG, ideally
  ~1200×750 or 16:10) and reference them from the project card's `<img>`.
- **Open Graph / social preview image:** replace `assets/images/og-image.png`
  (1200×630 recommended).
- **Favicon:** replace `assets/icons/favicon.svg` (or add a `favicon.ico` and update
  the `<link rel="icon">` in `<head>`).
- **Certificate images:** store them under a `projects/` folder or
  `assets/images/`, then link them from the relevant certification card.

## 10. How to add a certification

In the `<section id="certifications">` block, each card looks like:

```html
<li class="cert-card">
  <h3 class="cert-cat">Python</h3>
  <span class="cert-name">[Add certification name]</span>
  <span class="cert-issuer">[Add issuer · date]</span>
  <a class="cert-link" href="YOUR_URL" target="_blank" rel="noopener">View credential</a>
</li>
```

Replace the placeholders with the real name, issuer, date, and credential link.

## 11. How to deploy with GitHub Pages

1. Push this repository to GitHub (e.g. `kamelaggoun/kamelaggoun.github.io`).
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **Deploy from a branch**.
4. Select the branch (e.g. `main`) and the root folder (`/`), then **Save**.
5. The site will be published at `https://kamelaggoun.github.io/`.

> Because the site is fully static with relative paths, it also works on any
> project pages URL (e.g. `https://kamelaggoun.github.io/<repo>/`) without changes.
> Just update the `sitemap.xml` and Open Graph URLs to match the final URL.

## 12. Design &amp; accessibility notes

- **Semantic HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`,
  `<footer>`, one `<h1>` and a logical heading order.
- **Keyboard support**: visible `:focus-visible` outlines, skip-to-content link,
  native interactive elements.
- **Contrast**: the teal/navy palette meets WCAG AA for body text.
- **Reduced motion**: `prefers-reduced-motion` disables animations.
- **No fake data**: no invented employers, testimonials, or statistics.

## 13. License

MIT — see [LICENSE](LICENSE).
