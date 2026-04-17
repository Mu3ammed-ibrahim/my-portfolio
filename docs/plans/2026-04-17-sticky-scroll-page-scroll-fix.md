# StickyScroll Page-Scroll Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix FeaturedProjects so it animates with page scroll (no internal scrollbar, full width, all 3 projects reachable).

**Architecture:** Two targeted edits — switch `useScroll` from container mode to target mode in the primitive, and remove the constraining wrapper div in `FeaturedProjects.jsx`. No logic changes, no new dependencies.

**Tech Stack:** React 19, Framer Motion (`motion/react`), Tailwind CSS

---

### Task 1: Fix the StickyScroll primitive

**Files:**
- Modify: `src/Components/ui/sticky-scroll-reveal.jsx`

**Step 1: Switch scroll source from container to target**

On line 21-22, comment out `container: ref` and uncomment `target: ref`:

```js
const { scrollYProgress } = useScroll({
  target: ref,
  // container: ref,
  offset: ["start start", "end start"],
});
```

**Step 2: Remove the overflow container and fixed height from the outer div**

Line 55 — change the outer `motion.div` className:

```jsx
// Before:
className="relative flex h-[40rem] justify-center space-x-10 overflow-y-auto rounded-md p-10"

// After:
className="relative flex justify-center space-x-10 rounded-md p-10"
```

Remove `h-[40rem]` and `overflow-y-auto`. Keep everything else.

**Step 3: Increase left item spacing**

Line 59 — each content item `div`:

```jsx
// Before:
<div key={item.title + index} className="my-20">

// After:
<div key={item.title + index} className="my-28">
```

**Step 4: Resize the sticky right panel**

Line 88-91 — the sticky right panel div:

```jsx
// Before:
className={cn(
  "sticky top-10 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
  contentClassName
)}

// After:
className={cn(
  "sticky top-10 hidden h-[500px] w-[45%] overflow-hidden rounded-md bg-white lg:block",
  contentClassName
)}
```

**Step 5: Verify the full file looks correct**

The complete file after changes:

```jsx
import React, { useEffect, useRef, useState } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const linearGradients = [
  "#1E293B",
  "#1E293B",
  "#1E293B",
];

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // container: ref,
    offset: ["start start", "end start"],
  });
  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const cardsBreakpoints = content.map((_, index) => index / cardLength);
    const closestBreakpointIndex = cardsBreakpoints.reduce((acc, breakpoint, index) => {
      const distance = Math.abs(latest - breakpoint);
      if (distance < Math.abs(latest - cardsBreakpoints[acc])) {
        return index;
      }
      return acc;
    }, 0);
    setActiveCard(closestBreakpointIndex);
  });

  const backgroundColors = [
    "#0F172A",
    "#0F172A",
    "#0F172A",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex justify-center space-x-10 rounded-md p-10"
      ref={ref}>
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div key={item.title + index} className="my-28">
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-brand-text">
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-sm mt-10 max-w-sm text-brand-muted">
                {item.description}
              </motion.p>
            </div>
          ))}
          <div className="h-40" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-[500px] w-[45%] overflow-hidden rounded-md bg-white lg:block",
          contentClassName
        )}>
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
```

**Step 6: Commit**

```bash
git add src/Components/ui/sticky-scroll-reveal.jsx
git commit -m "fix: switch StickyScroll to page scroll, enlarge image panel"
```

---

### Task 2: Remove the constraining wrapper in FeaturedProjects

**Files:**
- Modify: `src/Components/FeaturedProjects.jsx`

**Step 1: Restructure the section layout**

Remove the single `container mx-auto max-w-6xl` div that wraps everything. Replace with two separate regions — one for the header (keeps centering), one for `StickyScroll` (full section width):

```jsx
export default function FeaturedProjects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="projects" className="py-20 md:py-28">
      {/* Header — stays centered */}
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
          <motion.p
            variants={fadeInUp}
            className="text-brand-muted max-w-2xl mx-auto"
          >
            Production systems solving real business problems.
          </motion.p>
        </motion.div>
      </div>

      {/* StickyScroll — full section width */}
      <StickyScroll content={content} />
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add src/Components/FeaturedProjects.jsx
git commit -m "fix: remove max-w-6xl constraint from FeaturedProjects, let StickyScroll go full width"
```

---

### Task 3: Verify in the browser

**Step 1: Start dev server**

```bash
npm run dev
```

**Step 2: Manual checklist**

- [ ] Navigate to the Projects section — no visible scrollbar on the component
- [ ] Scroll down the page normally through the section — all 3 project titles cycle (Nabdh → Kobonvip → Watchly)
- [ ] The right image panel is large (~45% wide, 500px tall) and sticks in place
- [ ] The last project (Watchly) is reachable
- [ ] The active title is fully opaque; the other two are dimmed
- [ ] Section feels full-width, not squished

**Step 3: Production build check**

```bash
npm run build
```

Expected: no errors, `dist/` generated.

**Step 4: Commit if build passes**

```bash
git add -p   # review any outstanding changes
git commit -m "chore: verify sticky-scroll page-scroll fix builds cleanly"
```

---

### Notes

- `data/animations` (imported in `FeaturedProjects.jsx`) is assumed to exist — do not modify it
- The `h-40` spacer div at the bottom of the left column is intentional — it gives extra scroll room so the last item can reach its breakpoint
- On mobile (`lg:hidden`) the sticky image panel doesn't render — this is existing behavior, no change needed
