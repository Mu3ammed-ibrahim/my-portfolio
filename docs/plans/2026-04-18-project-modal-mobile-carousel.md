# Project Modal & Mobile Carousel — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a Framer Motion modal with a full case study (Problem/Solution/Result + image gallery + CTA buttons) that opens when a project is clicked, plus swap the FeaturedProjects section to a Carousel on mobile.

**Architecture:** Project data moves from inline JSX in FeaturedProjects into a shared `src/data/projects.js` file consumed by both the StickyScroll (desktop) and Carousel (mobile). A new `ProjectModal.jsx` renders via `AnimatePresence` — backdrop + panel with image gallery and structured case study. `StickyScroll` and `Carousel` receive an `onItemClick` prop to trigger the modal.

**Tech Stack:** React 19, Framer Motion (`AnimatePresence`, `motion`), Tailwind CSS, existing `StickyScroll` + `Carousel` components, `lucide-react` icons.

---

## Task 1: Create project data file

**Files:**
- Create: `src/data/projects.js`

**Step 1: Create the file with all project data**

```js
import NabdhImage from "../assets/Projects/Nabdh-Alibtikar.png";
import NabdhProjectsImage from "../assets/Projects/Nabdh-Alibtikar-projects-page.png";
import NabdhServiceImage from "../assets/Projects/Nabdh-Alibtikar-service section.png";
import KobonvipImage from "../assets/Projects/koponvip.png";
import WatchlyImage from "../assets/Projects/watchly.png";

export const projects = [
  {
    id: "nabdh-alibtikar",
    title: "Nabdh-Alibtikar",
    tagline: "Company website + CMS/CRM",
    description:
      "Designed and built the full company website, implemented CMS and CRM using Supabase and Next.js — responsible for performance, maintenance, and the full tech stack.",
    images: [NabdhImage, NabdhProjectsImage, NabdhServiceImage],
    problem:
      "The company needed a full web presence — website, content management, and customer relationship tools — with no backend developer on the team.",
    solution:
      "Architected and built the entire stack solo: company website, a custom CMS for content updates, and a CRM system — all powered by Supabase (database, auth, storage) with Next.js and React on the frontend.",
    result:
      "A fully operational platform the client's team manages independently, with no ongoing developer dependency.",
    tech: ["Next.js", "React", "Supabase", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "kobonvip",
    title: "Kobonvip",
    tagline: "Coupon platform + admin dashboard",
    description:
      "Coupon aggregation platform with role-based admin dashboard, merchant analytics, and real-time coupon validation built with React, Redux Toolkit, and Supabase.",
    images: [KobonvipImage],
    problem:
      "A client needed a coupon aggregation platform where users browse deals and the business can manage coupons, stores, and track engagement — all without a backend team.",
    solution:
      "Built a public-facing coupon site alongside a full admin dashboard with CRUD operations, store + logo management, and a click-tracking system to surface the most-used coupons. SEO-optimized for organic discovery.",
    result:
      "The client can independently manage their entire catalogue and use click data to prioritize high-performing coupons.",
    tech: ["Next.js", "React", "Supabase", "Redux Toolkit", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: "watchly",
    title: "Watchly",
    tagline: "Movie & anime discovery platform",
    description:
      "Movie discovery app consuming the TMDB API — search, filtering, watchlists, and dynamic routing. Demonstrates clean API integration patterns.",
    images: [WatchlyImage],
    problem:
      "Needed a real project to sharpen API integration, pagination, and Next.js skills beyond tutorial exercises.",
    solution:
      "Built a full movie, TV series, and anime discovery platform on the TMDB API — search, filtering, dynamic routing, and a personal watchlist with save/watched states.",
    result:
      "A polished, production-quality learning project that demonstrates clean API patterns, state management, and user-first library UX.",
    tech: ["Next.js", "React", "TMDB API", "Redux Toolkit", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
  },
];
```

> **Note:** Replace `liveUrl` and `githubUrl` `"#"` values with real URLs once known.

**Step 2: Verify dev server still starts**

Run: `npm run dev`
Expected: No import errors, page loads normally.

**Step 3: Commit**

```bash
git add src/data/projects.js
git commit -m "feat: add project data file with case study content"
```

---

## Task 2: Add `onItemClick` to StickyScroll

**Files:**
- Modify: `src/Components/ui/sticky-scroll-reveal.jsx`

**Context:** `ContentItem` renders each project row. It currently has no click handler. We need to add one so clicking a project title/description row triggers the modal.

**Step 1: Add `onClick` and `onItemClick` props to `ContentItem`**

In `ContentItem`, add `onItemClick` to its props and wrap the content in a clickable div:

```jsx
const ContentItem = ({ item, index, activeCard, onInView, onItemClick }) => {
  const { ref, inView } = useInView({
    rootMargin: "-33% 0px -33% 0px",
  });

  useEffect(() => {
    if (inView) onInView(index);
  }, [inView, index, onInView]);

  return (
    <div
      ref={ref}
      className="my-28 cursor-pointer group"
      onClick={() => onItemClick?.(index)}
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
        className="text-2xl font-bold text-brand-text group-hover:text-brand-cta transition-colors duration-200"
      >
        {item.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
        className="text-sm mt-10 max-w-sm text-brand-muted"
      >
        {item.description}
      </motion.p>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: activeCard === index ? 1 : 0 }}
        className="inline-block mt-4 text-xs text-brand-cta font-medium"
      >
        View case study →
      </motion.span>
    </div>
  );
};
```

**Step 2: Pass `onItemClick` through `StickyScroll` to `ContentItem`**

In `StickyScroll`, accept and forward the prop:

```jsx
export const StickyScroll = ({ content, contentClassName, onItemClick }) => {
  // ... existing state unchanged ...

  return (
    <motion.div /* ... existing props ... */>
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <ContentItem
              key={item.title + index}
              item={item}
              index={index}
              activeCard={activeCard}
              onInView={setActiveCard}
              onItemClick={onItemClick}
            />
          ))}
          <div className="h-[500px]" />
        </div>
      </div>
      <div /* ... sticky image panel unchanged ... */>
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
```

**Step 3: Verify dev server — no errors**

Run: `npm run dev`
Expected: Page loads, no console errors. StickyScroll renders identically (no onItemClick passed yet).

**Step 4: Commit**

```bash
git add src/Components/ui/sticky-scroll-reveal.jsx
git commit -m "feat: add onItemClick prop to StickyScroll"
```

---

## Task 3: Add `onSlideClick` to Carousel

**Files:**
- Modify: `src/Components/ui/carousel.jsx`

**Context:** The Carousel's `handleSlideClick` only changes the active index. We need it to also call an external `onSlideClick(index)` callback so FeaturedProjects can open the modal.

**Step 1: Accept `onSlideClick` in Carousel and call it on click**

```jsx
export default function Carousel({ slides, onSlideClick }) {
  const [current, setCurrent] = useState(0);

  const handlePreviousClick = () => {
    const previous = current - 1;
    setCurrent(previous < 0 ? slides.length - 1 : previous);
  };

  const handleNextClick = () => {
    const next = current + 1;
    setCurrent(next === slides.length ? 0 : next);
  };

  const handleSlideClick = (index) => {
    if (current !== index) {
      setCurrent(index);
    } else {
      onSlideClick?.(index);
    }
  };

  // ... rest unchanged
}
```

> **Behavior:** First tap on a non-active slide makes it active. Second tap (or tap on already-active slide) fires `onSlideClick`. This is natural UX — user selects then confirms.

**Step 2: Verify dev server — no errors**

Run: `npm run dev`
Expected: No errors. Carousel not yet rendered anywhere (added in Task 5).

**Step 3: Commit**

```bash
git add src/Components/ui/carousel.jsx
git commit -m "feat: add onSlideClick callback to Carousel"
```

---

## Task 4: Create ProjectModal component

**Files:**
- Create: `src/Components/ProjectModal.jsx`

**Step 1: Create the full modal component**

```jsx
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  const [currentImage, setCurrentImage] = useState(0);

  // Lock body scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const hasMultipleImages = project.images.length > 1;

  const prevImage = () =>
    setCurrentImage((i) => (i === 0 ? project.images.length - 1 : i - 1));

  const nextImage = () =>
    setCurrentImage((i) => (i === project.images.length - 1 ? 0 : i + 1));

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Panel — stop propagation so clicks inside don't close */}
        <motion.div
          key="panel"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          <div className="flex flex-col md:flex-row gap-0">
            {/* Left: Image gallery */}
            <div className="md:w-1/2 relative bg-zinc-950 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden">
              <div className="relative aspect-video md:aspect-auto md:h-full min-h-[240px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImage}
                    src={project.images[currentImage]}
                    alt={`${project.title} screenshot ${currentImage + 1}`}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </AnimatePresence>

                {/* Prev/Next arrows — only when multiple images */}
                {hasMultipleImages && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>

              {/* Dot indicators — only when multiple images */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`rounded-full transition-all duration-200 ${
                        i === currentImage
                          ? "w-4 h-1.5 bg-green-500"
                          : "w-1.5 h-1.5 bg-white/40"
                      }`}
                      aria-label={`Image ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right: Case study */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col gap-5">
              {/* Header */}
              <div>
                <p className="text-xs font-medium text-green-500 uppercase tracking-widest mb-1">
                  {project.tagline}
                </p>
                <h2 className="text-2xl font-bold text-white">{project.title}</h2>
              </div>

              {/* Case study sections */}
              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                    Problem
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                    Solution
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                    Result
                  </h3>
                  <p className="text-zinc-300 leading-relaxed">{project.result}</p>
                </div>
              </div>

              {/* Tech badges */}
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-3 mt-auto pt-2">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
                >
                  <Github size={15} />
                  GitHub
                </a>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-sm text-white font-medium transition-colors"
                >
                  <ExternalLink size={15} />
                  Live Site
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
```

**Step 2: Verify dev server — no errors**

Run: `npm run dev`
Expected: No import errors (modal not yet wired to anything).

**Step 3: Commit**

```bash
git add src/Components/ProjectModal.jsx
git commit -m "feat: add ProjectModal with image gallery and case study layout"
```

---

## Task 5: Refactor FeaturedProjects to use data file + wire modal + add mobile carousel

**Files:**
- Modify: `src/Components/FeaturedProjects.jsx`

**Step 1: Replace the entire file with the updated version**

```jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StickyScroll } from "@/Components/ui/sticky-scroll-reveal";
import Carousel from "@/Components/ui/carousel";
import ProjectModal from "./ProjectModal";
import { projects } from "../data/projects";
import { fadeInUp, staggerContainer } from "../data/animations";

// Build StickyScroll content array from projects data
const stickyContent = projects.map((project) => ({
  title: project.title,
  description: project.description,
  content: (
    <img
      src={project.images[0]}
      alt={project.title}
      className="h-full w-full object-cover"
    />
  ),
}));

// Build Carousel slides array from projects data
const carouselSlides = projects.map((project) => ({
  src: project.images[0],
  title: project.title,
  button: "View Case Study",
}));

export default function FeaturedProjects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);

  const handleItemClick = (index) => setSelectedProject(projects[index]);

  return (
    <section id="projects" className="py-20 md:py-28">
      {/* Section header */}
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
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
          <motion.p variants={fadeInUp} className="text-brand-muted max-w-2xl mx-auto">
            Production systems solving real business problems.
          </motion.p>
        </motion.div>
      </div>

      {/* Desktop: StickyScroll */}
      <div className="hidden md:block">
        <StickyScroll content={stickyContent} onItemClick={handleItemClick} />
      </div>

      {/* Mobile: Carousel */}
      <div className="md:hidden flex flex-col items-center gap-10 px-4 pb-10">
        <Carousel slides={carouselSlides} onSlideClick={handleItemClick} />
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
```

**Step 2: Verify in browser (desktop)**

Run: `npm run dev`

1. Open `http://localhost:5173`
2. Scroll to Featured Projects
3. Hover a project row — title should turn green, "View case study →" should appear
4. Click a project row — modal opens with correct title, case study content, and images
5. Click backdrop or ✕ — modal closes
6. Press `Escape` — modal closes

**Step 3: Verify in browser (mobile)**

1. Open DevTools → toggle device toolbar → set to mobile width (≤768px)
2. Scroll to Featured Projects — carousel should appear instead of sticky scroll
3. Tap a carousel slide to make it active, tap again — modal opens
4. Modal should stack vertically (image on top, case study below)

**Step 4: Verify image gallery (Nabdh-Alibtikar)**

1. Click Nabdh-Alibtikar — modal opens
2. Prev/next arrows should be visible (3 images)
3. Click next → image changes with fade
4. Dot indicators update to reflect current image

**Step 5: Verify single-image projects (Kobonvip, Watchly)**

1. Click Kobonvip — modal opens
2. No prev/next arrows, no dot indicators
3. Same for Watchly

**Step 6: Commit**

```bash
git add src/Components/FeaturedProjects.jsx
git commit -m "feat: wire project modal and mobile carousel in FeaturedProjects"
```

---

## Verification Checklist

- [ ] `src/data/projects.js` — 3 projects with full case study fields
- [ ] `StickyScroll` — `onItemClick` prop forwarded, hover shows "View case study →"
- [ ] `Carousel` — `onSlideClick` fires on second tap of active slide
- [ ] Modal opens with correct project data on click
- [ ] Modal closes on backdrop click, ✕ button, and `Escape`
- [ ] Body scroll locked while modal is open
- [ ] Nabdh: 3 images with gallery arrows + dots
- [ ] Kobonvip + Watchly: 1 image, no arrows or dots
- [ ] Mobile: carousel renders at ≤768px
- [ ] Desktop: sticky scroll renders at ≥768px
- [ ] `liveUrl` / `githubUrl` updated in `projects.js` with real URLs
