# Akhil Arya — Portfolio Website

A minimalistic, modern, fully responsive personal portfolio built with plain HTML5, CSS3, and vanilla JavaScript — no frameworks, no build step. Ready to deploy directly on GitHub Pages.

## Structure

```
/
├── index.html          Home — hero, highlights, projects teaser, services teaser, CTA
├── about.html           Journey, Microsoft/UW–Madison background, interests, timeline
├── cv.html              Full resume: experience, education, projects, skills
├── ai-art.html           AI-generated art gallery (placeholder images)
├── services.html         Mentorship & consulting service cards
├── contact.html          Email / LinkedIn / GitHub + map placeholder
├── css/
│   └── styles.css        All design tokens + component/page styles
├── js/
│   └── script.js          Theme toggle, mobile nav, scroll progress, reveal animations,
│                           hero typing effect, back-to-top, lazy-load handling
├── assets/
│   ├── Akhil_CV.pdf       Downloadable CV (linked from Home and CV page)
│   └── images/            Photo placeholders, AI art placeholders, favicon, OG image
└── README.md
```

## Design notes

- **Palette:** warm paper background with a pine-green primary accent and a brass/gold secondary accent — quiet and professional rather than flashy, with a full dark mode.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/tags/data) — loaded from Google Fonts.
- **Signature motif:** a topographic "trail" contour line, referencing running/biking routes, threads through the hero, section dividers, the scroll-progress bar, and the About timeline.
- **Icons:** Font Awesome (via CDN).

## Replacing placeholders

- **Photos:** swap `assets/images/photo-hero.svg` and `assets/images/photo-about.svg` for real photos (any image format works — update the `src` in `index.html` / `about.html`).
- **AI art:** replace `assets/images/art-1.svg` … `art-6.svg` in `ai-art.html` with your generated images and update the title/prompt/date text for each `<figure>`.
- **CV:** the current `assets/Akhil_CV.pdf` is used for the Download CV buttons — replace the file (keep the same name) any time you update your resume, and update `cv.html` if the content changes.
- **Social links:** LinkedIn and GitHub URLs currently point to `linkedin.com/in/akhilarya123` and `github.com/akhilarya123` — confirm these match your live profiles across `index.html`, `about.html`, `cv.html`, `services.html`, `ai-art.html`, `contact.html`, and the footer on every page.
- **Map:** `contact.html` has a placeholder map block (`.map-placeholder`) — replace it with a real Google Maps `<iframe>` embed if you'd like a live map.

## Deploying to GitHub Pages

1. Create a new GitHub repository (for a user/organization site, name it `<your-username>.github.io`; for a project site, any name works).
2. Push these files to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose the **main** branch and the **/(root)** folder, then **Save**.
6. GitHub will publish the site at:
   - `https://<your-username>.github.io/` (if the repo is named `<your-username>.github.io`), or
   - `https://<your-username>.github.io/<repo-name>/` (for a project site).
7. Wait a minute or two for the first deployment, then visit the URL. Future pushes to `main` redeploy automatically.

### Before you push
- Update the `canonical` and `og:url` meta tags in each page's `<head>` to match your actual GitHub Pages URL.
- If deploying as a project site (URL includes `/<repo-name>/`), double-check that relative asset paths (`css/`, `js/`, `assets/`) still resolve correctly — they will, since all links in this project are relative.

## Accessibility & performance

- Skip-to-content link, visible focus states, and `prefers-reduced-motion` support are built in.
- Images use `loading="lazy"` where appropriate; fonts and icons are loaded from CDNs with `preconnect` hints.
- Semantic HTML (`<nav>`, `<main>`, `<footer>`, `<figure>`) and descriptive `alt` text throughout.

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses `color-mix()` and `backdrop-filter`, both broadly supported in current browser versions.
