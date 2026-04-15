# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- **Dev server:** `npm run dev` (Vite dev server with HMR)
- **Build:** `npm run build` (production build to `dist/`)
- **Preview:** `npm run preview` (serve production build locally)
- **Lint:** `npm run lint` (ESLint with React hooks + refresh plugins)

No test framework is configured.

## Architecture

Single-page React 19 portfolio app (no router). The page renders as a vertical scroll of sections in this order:

`Navbar` → `Hero` → `Technologies` → `AboutMe` → `Projects` → `Contact`

All components live in `src/Components/` (capital C). Entry point is `src/main.jsx` → `src/App.jsx`.

### Key patterns

- **Styling:** Tailwind CSS utility classes everywhere. Dark theme (`bg-zinc-900` / `#212122`) with green accent (`green-500`/`green-600`/`green-700`). Custom Nippo font loaded via `src/fonts/nippo.css`.
- **Animations:** Framer Motion is used in every component for entrance animations, hover effects, and scroll-triggered reveals. `react-intersection-observer` (`useInView`) drives scroll-based animation triggers in `AboutMe` and `Projects`.
- **Hero background:** `JarvisHUD.jsx` renders a Three.js canvas with concentric rotating rings, particles, arc segments, and a scanning line. It responds to mouse movement and click events. This is the most performance-sensitive component.
- **Contact form:** Uses EmailJS (`@emailjs/browser`) with hardcoded service/template/user IDs in `Contact.jsx`.
- **Icons:** `lucide-react` for UI icons. Technology stack icons are PNG/SVG files in `src/assets/Icons/`.
- **Project/certification data:** Hardcoded arrays in `Projects.jsx` with static image imports from `src/assets/Projects/` and `src/assets/Certifications/`. The Projects section has three tabs: Projects, Certifications, Designs.
- **No TypeScript** -- all source is `.jsx`.

### Asset locations

- `src/assets/Icons/` -- technology and avatar images
- `src/assets/Projects/` -- project screenshot images
- `src/assets/Certifications/` -- certification images
- `public/` -- resume PDF, vite.svg favicon

### Deployment

Deployed to Netlify at `mo-portfolio1.netlify.app`. Vite `base` is set to `"./"` for relative asset paths.

### Image filenames

Image filenames contain spaces and mixed case (e.g., `"my avatar.png"`, `"E commerce app.png"`). Case sensitivity matters on Linux/Netlify -- always match the exact filename case when adding or referencing images.
