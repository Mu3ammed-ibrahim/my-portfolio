# Projects & Experience Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace the card-based FeaturedProjects with a StickyScroll component, remove Achievements, and add an Experience section using the Timeline component — keeping all animation logic intact, only swapping content and colors.

**Architecture:** Four sequential file edits: restyle two UI primitives (sticky-scroll-reveal.jsx, timeline.jsx), rewrite FeaturedProjects.jsx to use StickyScroll, create Experience.jsx with Timeline, then wire both into App.jsx.

**Tech Stack:** React 19, Framer Motion (`motion/react`), Tailwind CSS v4, `react-intersection-observer`, Lucide React, existing UI primitives at `src/Components/ui/`

---

## Task 1: Restyle `sticky-scroll-reveal.jsx` — colors + height

**File:**
- Modify: `src/Components/ui/sticky-scroll-reveal.jsx`

No animation logic changes. Only update hardcoded color values and container height.

**Step 1: Change background colors array to all brand-bg**

Find this block (lines 33–37):
```js
const backgroundColors = [
  "#0f172a", // slate-900
  "#000000", // black
  "#171717", // neutral-900
];
```
Replace with:
```js
const backgroundColors = [
  "#0F172A",
  "#0F172A",
  "#0F172A",
];
```

**Step 2: Change linearGradients to dark surface fallback**

Find this block (lines 38–42):
```js
const linearGradients = [
  "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
  "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
  "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
];
```
Replace with:
```js
const linearGradients = [
  "#1E293B",
  "#1E293B",
  "#1E293B",
];
```

**Step 3: Change container height and left text colors**

Find:
```jsx
className="relative flex h-[30rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
```
Replace with:
```jsx
className="relative flex h-[40rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"
```

Find:
```jsx
className="text-2xl font-bold text-slate-100">
```
Replace with:
```jsx
className="text-2xl font-bold text-brand-text">
```

Find:
```jsx
className="text-kg mt-10 max-w-sm text-slate-300">
```
Replace with:
```jsx
className="text-kg mt-10 max-w-sm text-brand-muted">
```

**Step 4: Commit**
```bash
git add src/Components/ui/sticky-scroll-reveal.jsx
git commit -m "style: restyle StickyScroll primitive to portfolio colors"
```

---

## Task 2: Restyle `timeline.jsx` — colors + header text

**File:**
- Modify: `src/Components/ui/timeline.jsx`

No animation logic changes. Update colors throughout and replace the hardcoded Aceternity placeholder text.

**Step 1: Update container background**

Find:
```jsx
className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
```
Replace with:
```jsx
className="w-full bg-brand-bg font-sans md:px-10"
```

**Step 2: Update header title — text + color**

Find:
```jsx
      <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">
          Changelog from my journey
        </h2>
```
Replace with:
```jsx
      <h2 className="text-lg md:text-4xl mb-4 text-brand-text max-w-4xl">
          My Journey
        </h2>
```

**Step 3: Update header subtitle — text + color**

Find:
```jsx
        <p
          className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">
          I&apos;ve been working on Aceternity for the past 2 years. Here&apos;s
          a timeline of my journey.
        </p>
```
Replace with:
```jsx
        <p
          className="text-brand-muted text-sm md:text-base max-w-sm">
          From self-teaching to production — a timeline of growth.
        </p>
```

**Step 4: Update dot outer ring color**

Find:
```jsx
              className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
```
Replace with:
```jsx
              className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-brand-bg flex items-center justify-center">
```

**Step 5: Update dot inner color**

Find:
```jsx
                className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
```
Replace with:
```jsx
                className="h-4 w-4 rounded-full bg-brand-surface border border-white/10 p-2" />
```

**Step 6: Update year label colors (desktop + mobile)**

Find:
```jsx
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
```
Replace with:
```jsx
                className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-brand-muted">
```

Find:
```jsx
              className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
```
Replace with:
```jsx
              className="md:hidden block text-2xl mb-4 text-left font-bold text-brand-muted">
```

**Step 7: Update static line — change via color**

Find in the long className string:
```
via-neutral-200 dark:via-neutral-700
```
Replace with:
```
via-white/10
```

**Step 8: Update animated fill line — purple/blue → brand green**

Find:
```jsx
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full" />
```
Replace with:
```jsx
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-brand-cta via-brand-cta to-transparent from-[0%] via-[10%] rounded-full" />
```

**Step 9: Commit**
```bash
git add src/Components/ui/timeline.jsx
git commit -m "style: restyle Timeline primitive to portfolio colors"
```

---

## Task 3: Rewrite `FeaturedProjects.jsx` with StickyScroll

**File:**
- Modify: `src/Components/FeaturedProjects.jsx` (full rewrite)

Replace the entire file content with the following:

```jsx
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StickyScroll } from "@/Components/ui/sticky-scroll-reveal";
import { fadeInUp, staggerContainer } from "../data/animations";

import NabdhImage from "../assets/Projects/Nabdh-Alibtikar.png";
import KobonvipImage from "../assets/Projects/koponvip.png";
import WatchlyImage from "../assets/Projects/watchly.png";

const content = [
  {
    title: "Nabdh-Alibtikar",
    description:
      "Designed and built the full company website, implemented CMS and CRM using Supabase and Next.js — responsible for performance, maintenance, and the full tech stack.",
    content: (
      <img
        src={NabdhImage}
        alt="Nabdh-Alibtikar"
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Kobonvip",
    description:
      "Coupon aggregation platform with role-based admin dashboard, merchant analytics, and real-time coupon validation built with React, Redux Toolkit, and Supabase.",
    content: (
      <img
        src={KobonvipImage}
        alt="Kobonvip"
        className="h-full w-full object-cover"
      />
    ),
  },
  {
    title: "Watchly",
    description:
      "Movie discovery app consuming the TMDB API — search, filtering, watchlists, and dynamic routing. Demonstrates clean API integration patterns.",
    content: (
      <img
        src={WatchlyImage}
        alt="Watchly"
        className="h-full w-full object-cover"
      />
    ),
  },
];

export default function FeaturedProjects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-brand-muted max-w-2xl mx-auto"
          >
            Production systems solving real business problems.
          </motion.p>
        </motion.div>
        <StickyScroll content={content} />
      </div>
    </section>
  );
}
```

**Step 2: Verify dev server — projects section**

Run: `npm run dev`

Check in browser:
- "Featured Projects" heading fades in on scroll
- Sticky scroll box is taller (`h-[40rem]`)
- Scrolling inside the box cycles between the 3 projects
- Nabdh, Kobonvip, Watchly screenshots appear in the right panel on desktop (≥1024px)
- Text fades in/out as active card changes
- Background stays dark (`#0F172A`) throughout

**Step 3: Commit**
```bash
git add src/Components/FeaturedProjects.jsx
git commit -m "feat: replace FeaturedProjects cards with StickyScroll"
```

---

## Task 4: Create `Experience.jsx` with Timeline

**File:**
- Create: `src/Components/Experience.jsx`

Create the file with the following content:

```jsx
import { Timeline } from "@/Components/ui/timeline";
import { ShieldCheck } from "lucide-react";

import PortfolioImg from "../assets/Projects/portfolio app.png";
import EcommerceImg from "../assets/Projects/E commerce app.png";
import JumpingImg from "../assets/Projects/Jumping dianasour.png";
import TrackifyImg from "../assets/Projects/Trackify.png";
import WatchlyImg from "../assets/Projects/watchly.png";
import NabdhImg from "../assets/Projects/Nabdh-Alibtikar.png";
import NabdhServiceImg from "../assets/Projects/Nabdh-Alibtikar-service section.png";
import NabdhProjectsImg from "../assets/Projects/Nabdh-Alibtikar-projects-page.png";

const imgClass =
  "h-20 w-full rounded-lg object-cover md:h-44 lg:h-60 shadow-[0_0_24px_rgba(0,0,0,0.4)]";

const data = [
  {
    title: "2023",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Started self-teaching HTML, CSS & JavaScript — built personal projects
          to cement the fundamentals.
        </p>
        <div className="grid grid-cols-1 gap-4">
          <img src={PortfolioImg} alt="Portfolio project" className={imgClass} />
        </div>
      </div>
    ),
  },
  {
    title: "Aug–Sep 2024",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Internship @ KreativeStorm — built an e-commerce store and a browser
          jumping game in a team using HTML, CSS & JS.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src={EcommerceImg} alt="E-commerce app" className={imgClass} />
          <img src={JumpingImg} alt="Jumping game" className={imgClass} />
        </div>
      </div>
    ),
  },
  {
    title: "Late 2024",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Completed the Meta Frontend Developer Professional Certificate on
          Coursera — covering React, Advanced React, UX/UI Design, JavaScript,
          and HTML/CSS.
        </p>
        <div className="flex items-center gap-4 rounded-xl border border-brand-cta/20 bg-brand-surface p-5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-cta/10">
            <ShieldCheck className="text-brand-cta" size={24} />
          </div>
          <div>
            <p className="text-sm font-semibold text-brand-text">
              Meta Frontend Developer
            </p>
            <p className="text-xs text-brand-muted">
              Professional Certificate · Coursera · 2024
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          Freelance frontend developer — delivered 5+ production-ready projects
          to clients including dashboards, API-integrated apps, and full-stack
          CMS/CRM features.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src={TrackifyImg} alt="Trackify" className={imgClass} />
          <img src={WatchlyImg} alt="Watchly" className={imgClass} />
        </div>
      </div>
    ),
  },
  {
    title: "Oct 2025 – Now",
    content: (
      <div>
        <p className="mb-8 text-xs font-normal text-brand-muted md:text-sm">
          UI/UX & Frontend Developer @ Nabdh-Alibtikar — designed and built the
          company website, implemented CMS & CRM with Supabase and Next.js,
          responsible for tech infrastructure and ongoing performance.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <img src={NabdhImg} alt="Nabdh website" className={imgClass} />
          <img
            src={NabdhServiceImg}
            alt="Nabdh services section"
            className={imgClass}
          />
          <img
            src={NabdhProjectsImg}
            alt="Nabdh projects page"
            className="col-span-2 h-20 w-full rounded-lg object-cover md:h-44 lg:h-60 shadow-[0_0_24px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>
    ),
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <Timeline data={data} />
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add src/Components/Experience.jsx
git commit -m "feat: add Experience section with Timeline component"
```

---

## Task 5: Update `App.jsx` — wire Experience, remove Achievements

**File:**
- Modify: `src/App.jsx`

**Step 1: Swap imports**

Find:
```jsx
import Achievements from "./Components/Achievements";
```
Replace with:
```jsx
import Experience from "./Components/Experience";
```

**Step 2: Swap JSX**

Find:
```jsx
      <section id="achievements">
        <Achievements />
      </section>
```
Replace with:
```jsx
      <Experience />
```

**Step 3: Verify dev server — full page**

Run: `npm run dev` and check:
- Page order: Hero → TechStack → FeaturedProjects (sticky scroll) → Experience (timeline) → Workflow → Services → Contact
- Achievements section is gone
- Timeline green line fills as you scroll down through the Experience section
- All 5 timeline entries render with correct images and text
- Certificate badge renders (no image) for Late 2024 entry
- Mobile: year labels appear above content (not sticky sidebar)
- No console errors

**Step 4: Commit**
```bash
git add src/App.jsx
git commit -m "feat: wire Experience into App, remove Achievements"
```

---

## Final verification

```bash
npm run build
```
Expected: build completes with no errors. Check that image filenames with spaces (`portfolio app.png`, `E commerce app.png`, etc.) resolved correctly — Vite handles these via static import, so they will be fingerprinted and bundled correctly as long as the imports match the exact filenames (case-sensitive on Linux/Netlify).
