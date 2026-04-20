# Project Modal & Mobile Carousel — Design

## Context

The FeaturedProjects section currently shows 3 projects in a sticky-scroll reveal with only a title and one-line description. There is no way to learn more about a project. On mobile the sticky-scroll UX is poor. This feature adds:

1. A Framer Motion modal that opens when a project is clicked, showing a structured case study (Problem / Solution / Result), an image gallery, tech stack badges, and Live + GitHub CTA buttons.
2. A mobile-responsive layout that swaps the sticky-scroll for the existing `Carousel` component on small screens.

---

## Architecture

### Data Layer

Extract all project data into a single source of truth:

**`src/data/projects.js`** — NEW

Each project object:
```js
{
  id: string,
  title: string,
  tagline: string,
  images: string[],     // array of imported image paths
  problem: string,
  solution: string,
  result: string,
  tech: string[],
  liveUrl: string,
  githubUrl: string,
}
```

Both `FeaturedProjects.jsx` and the mobile `Carousel` import from this file. No duplication.

### Component Layer

| File | Status | Change |
|------|--------|--------|
| `src/data/projects.js` | NEW | Single source of truth for all project data |
| `src/Components/ProjectModal.jsx` | NEW | Framer Motion modal with image gallery + case study |
| `src/Components/FeaturedProjects.jsx` | MODIFIED | Add click handler, mobile carousel, render modal |

`App.jsx` — no changes. Modal state lives inside `FeaturedProjects`.

---

## Components

### ProjectModal.jsx

Built with Framer Motion `AnimatePresence`. Two layers:

1. **Backdrop** — `motion.div` full-screen, `bg-black/60`, click-to-close
2. **Panel** — `motion.div` centered card, animates `scale 0.95→1 + opacity 0→1`

Additional behavior:
- `Escape` key closes the modal (`useEffect` keydown listener)
- Body scroll locked while open (`overflow-hidden` on `document.body`)
- Close button (✕) top-right corner

**Panel layout (two-column desktop / stacked mobile):**
```
[Image gallery]  |  [Case study content]
  ← prev  next → |  Problem / Solution / Result
  [● ○ ○] dots   |  Tech badges
                 |  [GitHub]  [Live Site]
```

Image gallery:
- Local `useState` for current image index
- Prev/next arrows hidden when project has only one image
- Dot indicators scale to number of images

### FeaturedProjects.jsx changes

- Add `const [selectedProject, setSelectedProject] = useState(null)`
- Pass `onClick={() => setSelectedProject(project)}` to each sticky-scroll item
- Render `<AnimatePresence>` + `<ProjectModal>` at component bottom
- Responsive layout via Tailwind:
  - `hidden md:block` wraps `<StickyScroll>` (desktop only)
  - `md:hidden` wraps `<Carousel>` (mobile only)
  - Carousel slides map from `projects.js` data; clicking a slide opens modal

---

## Project Data (approved copy)

### Nabdh-Alibtikar
- **Tagline:** Company website + CMS/CRM
- **Problem:** The company needed a full web presence — website, content management, and customer relationship tools — with no backend developer on the team.
- **Solution:** Architected and built the entire stack solo: company website, a custom CMS for content updates, and a CRM system — all powered by Supabase (database, auth, storage) with Next.js and React on the frontend.
- **Result:** A fully operational platform the client's team manages independently, with no ongoing developer dependency.
- **Tech:** Next.js, React, Supabase, Tailwind CSS
- **Images:** Nabdh-Alibtikar.png, Nabdh-Alibtikar-projects-page.png, Nabdh-Alibtikar-service section.png (3 images — gallery enabled)

### Kobonvip
- **Tagline:** Coupon platform + admin dashboard
- **Problem:** A client needed a coupon aggregation platform where users browse deals and the business can manage coupons, stores, and track engagement — all without a backend team.
- **Solution:** Built a public-facing coupon site alongside a full admin dashboard with CRUD operations, store + logo management, and a click-tracking system to surface the most-used coupons. SEO-optimized for organic discovery. Stack: Next.js, React, Supabase.
- **Result:** The client can independently manage their entire catalogue and use click data to prioritize high-performing coupons.
- **Tech:** Next.js, React, Supabase, Redux Toolkit, Tailwind CSS
- **Images:** koponvip.png (1 image — no gallery arrows)

### Watchly
- **Tagline:** Movie & anime discovery platform
- **Problem:** Needed a real project to sharpen API integration, pagination, and Next.js skills beyond tutorial exercises.
- **Solution:** Built a full movie, TV series, and anime discovery platform on the TMDB API — search, filtering, dynamic routing, and a personal watchlist with save/watched states.
- **Result:** A polished, production-quality learning project that demonstrates clean API patterns, state management, and user-first library UX.
- **Tech:** Next.js, React, TMDB API, Redux Toolkit, Tailwind CSS
- **Images:** watchly.png (1 image — no gallery arrows)

---

## Animations

All use existing Framer Motion patterns from the codebase:

| Element | Animation |
|---------|-----------|
| Backdrop | `opacity: 0 → 1` on enter, reverse on exit |
| Modal panel | `scale: 0.95→1, opacity: 0→1` on enter |
| Case study sections | Staggered `fadeInUp` (existing variant) |
| Image transition | `opacity: 0→1` on slide change |

---

## Verification

1. Run `npm run dev`
2. Click a project card in the sticky-scroll section → modal opens with correct content
3. Image gallery arrows appear for Nabdh (3 images), hidden for Kobonvip and Watchly (1 image)
4. Click backdrop or ✕ → modal closes
5. Press `Escape` → modal closes
6. Resize to mobile → sticky-scroll hidden, carousel visible
7. Click a carousel slide → same modal opens
8. Confirm body scroll is locked while modal is open
