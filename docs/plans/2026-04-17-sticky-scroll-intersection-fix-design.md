# StickyScroll Intersection Observer Fix Design

**Date:** 2026-04-17
**Status:** Approved

---

## Problem

After switching StickyScroll from internal scroll to page scroll (`target: ref`), the active card breakpoints became misaligned with the actual item positions on screen.

The breakpoints use `index / cardLength` (0, 0.333, 0.667), but the items are physically positioned at approximately 0.13, 0.33, and 0.54 of the section's scroll progress. This means card 2 (Watchly) doesn't activate until the corresponding text has scrolled ~200px past center — almost off-screen — before the image switches.

---

## Root Cause

`useScroll` with `offset: ["start start", "end start"]` measures scroll progress across the full section height (including header, padding, and bottom spacer). The evenly-spaced breakpoints assume items are evenly distributed across that full height, which they are not.

---

## Solution

Replace `useScroll` + `useMotionValueEvent` with `useInView` (IntersectionObserver) on each item. The image switches when the item's text enters a defined viewport zone — no arithmetic, no offset tuning.

---

## File: `src/Components/ui/sticky-scroll-reveal.jsx`

### Removed

- `useScroll`, `useMotionValueEvent`, `useRef` imports
- `useScroll({ target: ref, ... })` call
- `useMotionValueEvent(scrollYProgress, ...)` call
- `ref` attribute on the outer `motion.div`

### Added

A `ContentItem` subcomponent extracted from the `.map()` so hooks can be called per-item:

```jsx
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
```

### rootMargin explained

`"-33% 0px -33% 0px"` shrinks the intersection zone to the **middle third of the viewport**:
- Top inset: -33% (items must be below top third)
- Bottom inset: -33% (items must be above bottom third)

When an item's text enters this zone while scrolling down, `onInView(index)` fires and the right panel switches to its image. This fires when the text is comfortably visible — not when it's almost gone.

### Unchanged

- `backgroundColors` + `linearGradients` arrays
- `backgroundGradient` state and `useEffect`
- Background color animation on outer `motion.div`
- Sticky right panel: `sticky top-10 h-[500px] w-[45%]`
- `h-[500px]` bottom spacer
- `contentClassName` prop
- All Tailwind classes not mentioned above

---

## Verification

1. `npm run dev` — no console errors
2. Scroll into the Projects section — card 0 (Nabdh) is active immediately
3. Scroll down — card 1 (Kobonvip) image switches when Kobonvip title is mid-screen
4. Continue scrolling — card 2 (Watchly) image switches when Watchly title is mid-screen, NOT when it's near the top
5. Scroll back up — cards switch back correctly (not `triggerOnce`)
6. `npm run build` — clean
