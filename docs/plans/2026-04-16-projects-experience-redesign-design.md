# Projects & Experience Redesign Design

**Date:** 2026-04-16
**Status:** Approved

---

## Overview

Replace the existing card-based `FeaturedProjects` section with the `StickyScroll` component, remove the `Achievements` section, and introduce a new `Experience` section using the `Timeline` component. Both components keep their original animation logic intact — only content and colors are updated to match the portfolio design system.

---

## Page Structure (After)

```
Navbar / FloatingDockNav
Hero
TechStack          (unchanged)
FeaturedProjects   ← rebuilt with StickyScroll
Experience         ← new section, Timeline component
Workflow
Services
Contact
```

`Achievements` is removed from `App.jsx` (file retained, just not rendered).

---

## Section 1 — FeaturedProjects (StickyScroll)

**File:** `src/Components/FeaturedProjects.jsx` (rewritten)
**UI primitive:** `src/Components/ui/sticky-scroll-reveal.jsx` (no changes to primitive)

### Color changes

| Element | Before | After |
|---|---|---|
| Background colors array | `#0f172a`, `#000000`, `#171717` | all `#0F172A` (brand-bg) |
| Left title | `text-slate-100` | `text-brand-text` |
| Left description | `text-slate-300` | `text-brand-muted` |
| Container height | `h-[30rem]` | `h-[40rem]` |
| Right panel | gradient placeholder | full-cover `<img>` |

### Section header
Centered above the scroll box, matching other sections:
- Heading: "Featured Projects" — Nippo font, `text-brand-text`
- Subtitle: "Production systems solving real business problems." — `text-brand-muted`
- Framer Motion fade-up entrance via `useInView`

### Content array (3 entries)

```js
[
  {
    title: "Nabdh-Alibtikar",
    description: "Designed and built the full company website, implemented CMS and CRM using Supabase and Next.js — responsible for performance, maintenance, and the full tech stack.",
    content: <img src={NabdhImage} alt="Nabdh-Alibtikar" className="h-full w-full object-cover" />,
  },
  {
    title: "Kobonvip",
    description: "Coupon aggregation platform with role-based admin dashboard, merchant analytics, and real-time coupon validation built with React, Redux Toolkit, and Supabase.",
    content: <img src={KobonvipImage} alt="Kobonvip" className="h-full w-full object-cover" />,
  },
  {
    title: "Watchly",
    description: "Movie discovery app consuming the TMDB API — search, filtering, watchlists, and dynamic routing. Demonstrates clean API integration patterns.",
    content: <img src={WatchlyImage} alt="Watchly" className="h-full w-full object-cover" />,
  },
]
```

### Image imports
```js
import NabdhImage from "../assets/Projects/Nabdh-Alibtikar.png";
import KobonvipImage from "../assets/Projects/koponvip.png";
import WatchlyImage from "../assets/Projects/watchly.png";
```

---

## Section 2 — Experience (Timeline)

**File:** `src/Components/Experience.jsx` (new file)
**UI primitive:** `src/Components/ui/timeline.jsx` — animation logic untouched, color tokens updated inline

### Color changes to primitive (edit `timeline.jsx`)

| Element | Before | After |
|---|---|---|
| Container bg | `bg-white dark:bg-neutral-950` | `bg-brand-bg` |
| Header title text | `dark:text-white` | `text-brand-text` |
| Header subtitle text | `dark:text-neutral-300` | `text-brand-muted` |
| Year label | `dark:text-neutral-500` | `text-brand-muted` |
| Dot outer ring | `dark:bg-black` | `bg-brand-bg` |
| Dot inner | `dark:bg-neutral-800 border-neutral-700` | `bg-brand-surface border-white/10` |
| Static line | `dark:via-neutral-700` | `via-white/10` |
| **Animated fill line** | `from-purple-500 via-blue-500` | `from-brand-cta via-brand-cta to-transparent` |
| Content text | `dark:text-neutral-200 / neutral-300` | `text-brand-muted` |

Header text in the primitive:
- Title: "My Journey"
- Subtitle: "From self-teaching to production — a timeline of growth."

### 5 Timeline entries

**1. 2023**
```
Description: Started self-teaching HTML, CSS & JS — built personal projects to cement the fundamentals.
Images: portfolio app.png (single image)
```

**2. Aug–Sep 2024**
```
Description: Internship @ KreativeStorm — built an e-commerce store and a browser jumping game in a team using HTML, CSS & JS.
Images: E commerce app.png + Jumping dianasour.png (2-col grid)
```

**3. Late 2024**
```
Description: Completed the Meta Frontend Developer Professional Certificate on Coursera — covering React, Advanced React, UX/UI Design, JavaScript, and HTML/CSS.
Images: none — render a styled certificate badge element instead
```

**4. 2025**
```
Description: Freelance frontend developer — delivered 5+ production-ready projects to clients including dashboards, API-integrated apps, and full-stack CMS/CRM features.
Images: Trackify.png + watchly.png (2-col grid)
```

**5. Oct 2025 – Present**
```
Description: UI/UX & Frontend Developer @ Nabdh-Alibtikar — designed and built the company website, implemented CMS & CRM with Supabase + Next.js, responsible for tech infrastructure and ongoing performance.
Images: Nabdh-Alibtikar.png + Nabdh-Alibtikar-service section.png + Nabdh-Alibtikar-projects-page.png (2-col grid, 3rd image below)
```

### Image imports for Experience.jsx
```js
import PortfolioImg from "../assets/Projects/portfolio app.png";
import EcommerceImg from "../assets/Projects/E commerce app.png";
import JumpingImg from "../assets/Projects/Jumping dianasour.png";
import TrackifyImg from "../assets/Projects/Trackify.png";
import WatchlyImg from "../assets/Projects/watchly.png";
import NabdhImg from "../assets/Projects/Nabdh-Alibtikar.png";
import NabdhServiceImg from "../assets/Projects/Nabdh-Alibtikar-service section.png";
import NabdhProjectsImg from "../assets/Projects/Nabdh-Alibtikar-projects-page.png";
```

---

## App.jsx changes

```jsx
// Add
import Experience from "./Components/Experience";

// Remove
import Achievements from "./Components/Achievements"; // ← delete this line

// Replace in JSX:
// Remove: <section id="achievements"><Achievements /></section>
// Add after FeaturedProjects: <Experience />
```

---

## Constraints

- No changes to animation logic in either UI primitive
- No TypeScript — all files remain `.jsx`
- Image filenames contain spaces — use exact filenames with quotes in imports
- Framer Motion (`motion/react`) is already installed and used throughout

---

## Verification

1. `npm run dev` — dev server starts, no errors
2. Sticky scroll: 3 projects cycle as you scroll inside the box, screenshots visible in right panel, height is `h-[40rem]`
3. Timeline: green animated line fills on scroll, 5 entries render with correct images and text
4. Achievements section no longer renders
5. FloatingDock nav links still work (no `id="achievements"` link existed)
6. `npm run build` — production build passes
