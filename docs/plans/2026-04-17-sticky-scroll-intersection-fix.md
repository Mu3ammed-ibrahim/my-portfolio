# StickyScroll Intersection Observer Fix Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Fix the StickyScroll active-card switching so the right-panel image swaps when the corresponding text item is mid-screen, not when it has nearly scrolled off the top.

**Architecture:** Replace the `useScroll` + `useMotionValueEvent` breakpoint system with per-item IntersectionObserver via `useInView`. A new `ContentItem` subcomponent holds each item's `useInView` ref (hooks cannot be called inside `.map()`). When an item enters the middle third of the viewport, it calls `setActiveCard`. Everything else — background animation, sticky panel, spacer — stays unchanged.

**Tech Stack:** React 19, Framer Motion (`motion/react`), `react-intersection-observer` (already installed)

---

### Task 1: Rewrite sticky-scroll-reveal.jsx

**Files:**
- Modify: `src/Components/ui/sticky-scroll-reveal.jsx`

**Step 1: Read the current file**

Read `src/Components/ui/sticky-scroll-reveal.jsx` to confirm current state before editing.

**Step 2: Write the complete replacement**

Replace the entire file with the following. Every line is intentional — do not add or remove anything beyond what is shown.

```jsx
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const linearGradients = [
  "#1E293B",
  "#1E293B",
  "#1E293B",
];

const ContentItem = ({ item, index, activeCard, onInView }) => {
  const { ref, inView } = useInView({
    rootMargin: "-33% 0px -33% 0px",
  });

  useEffect(() => {
    if (inView) onInView(index);
  }, [inView, index, onInView]);

  return (
    <div ref={ref} className="my-28">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
        className="text-2xl font-bold text-brand-text"
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
    </div>
  );
};

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = useState(0);

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
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <ContentItem
              key={item.title + index}
              item={item}
              index={index}
              activeCard={activeCard}
              onInView={setActiveCard}
            />
          ))}
          <div className="h-[500px]" />
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

**Key differences from old file:**
- `useScroll`, `useMotionValueEvent`, `useRef` removed from imports
- `useInView` added to imports (from `react-intersection-observer`)
- `React.useState` → `useState` (named import, consistent style)
- `useScroll(...)` call removed entirely
- `useMotionValueEvent(...)` call removed entirely
- `ref` attribute removed from outer `motion.div`
- New `ContentItem` component defined above `StickyScroll`
- `.map()` now renders `<ContentItem>` instead of inline `<div>`

**Step 3: Verify the diff looks correct**

Run:
```bash
cd "C:\Users\muhammed almutassim\Desktop\MyProjects\my-portfolio"
git diff src/Components/ui/sticky-scroll-reveal.jsx
```

Confirm:
- Lines removed: `useScroll`, `useMotionValueEvent`, `useRef` import lines
- Lines removed: the `const ref = useRef(null)` line
- Lines removed: the entire `useScroll({...})` block
- Lines removed: the entire `useMotionValueEvent(...)` block
- Lines removed: `ref={ref}` from the outer `motion.div`
- Lines added: `useInView` import
- Lines added: `ContentItem` component (above `StickyScroll`)
- Lines changed: `.map()` body now uses `<ContentItem>`

**Step 4: Commit**

```bash
git add src/Components/ui/sticky-scroll-reveal.jsx
git commit -m "fix: replace scroll-progress breakpoints with per-item IntersectionObserver"
```

---

### Task 2: Verify

**Step 1: Run lint**

```bash
cd "C:\Users\muhammed almutassim\Desktop\MyProjects\my-portfolio"
npm run lint 2>&1 | grep "sticky-scroll"
```

Expected: no new errors on `sticky-scroll-reveal.jsx` beyond any that existed before.

**Step 2: Run production build**

```bash
npm run build
```

Expected: `✓ built in` with no errors. (Warnings about unused `motion` in other files are pre-existing and can be ignored.)

**Step 3: Manual verification checklist**

Start dev server:
```bash
npm run dev
```

Open the browser and scroll to the Projects section. Verify:

- [ ] Card 0 (Nabdh-Alibtikar) image visible on first entering the section
- [ ] Scrolling down: Kobonvip title enters mid-screen → Kobonvip image switches in immediately
- [ ] Continuing to scroll: Watchly title enters mid-screen → Watchly image switches in while text is still prominently visible (NOT when it has almost scrolled off the top)
- [ ] Scrolling back up: cards switch back correctly (not locked to one direction)
- [ ] No scrollbar visible on the section
- [ ] Right panel remains sticky throughout

**Step 4: Commit if build and manual check pass**

```bash
git add -p
git commit -m "chore: verify intersection observer fix passes build and visual check"
```

---

### Notes

- `react-intersection-observer` is already a dependency — no `npm install` needed
- `rootMargin: "-33% 0px -33% 0px"` defines the trigger zone as the middle third of the viewport. If switching feels slightly early or late after testing, adjust: use `"-25% 0px -50% 0px"` to trigger slightly higher on screen, or `"-40% 0px -25% 0px"` to trigger later
- The `h-[500px]` bottom spacer is intentional — it keeps the last item visible with the sticky panel while the user lingers on it
- The `div` class in `className="div relative flex items-start px-4"` is a pre-existing stray literal (no effect) — do not fix it as part of this task
