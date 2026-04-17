# StickyScroll Page-Scroll Fix Design

**Date:** 2026-04-17
**Status:** Approved

---

## Problem

`FeaturedProjects` uses the `StickyScroll` primitive with `container: ref` — this forces scroll tracking to happen inside the component's own `overflow-y-auto` div (`h-[40rem]`). This causes three bugs:

1. The component is visually squished inside a `max-w-6xl` container with a fixed small height
2. A visible scrollbar appears on the component box
3. The last project item is unreachable because the internal scroll height is miscalculated

## Solution

Switch to page-level scroll (`target: ref`), remove the overflow container, make the image panel larger, and remove the outer width constraint in `FeaturedProjects.jsx`.

---

## File 1 — `src/Components/ui/sticky-scroll-reveal.jsx`

| Element | Before | After |
|---|---|---|
| Scroll source | `container: ref` | `target: ref` |
| Outer div height | `h-[40rem]` | removed |
| Outer div overflow | `overflow-y-auto` | removed |
| Right panel size | `h-60 w-80` | `h-[500px] w-[45%]` |
| Left item spacing | `my-20` | `my-28` |

### How page scroll tracking works

With `target: ref` and `offset: ["start start", "end start"]`:
- `scrollYProgress` = 0 when the top of the section aligns with the top of the viewport
- `scrollYProgress` = 1 when the bottom of the section scrolls past the top of the viewport
- 3 items → breakpoints at 0, 1/3, 2/3
- The `closestBreakpointIndex` reducer fires on every scroll event and updates `activeCard`

No overflow container needed. The section must be tall enough for comfortable scrolling — achieved by `my-28` per item.

---

## File 2 — `src/Components/FeaturedProjects.jsx`

Remove the inner `container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl` wrapper div.

Replace with two separate regions:
1. A centered header div (`max-w-6xl mx-auto`) for the "Featured Projects" heading
2. `<StickyScroll content={content} />` rendered at full section width (no wrapper)

The `StickyScroll` outer div already has `p-10` which provides its own side padding.

---

## Verification

1. `npm run dev` — no console errors
2. Scroll to the projects section — no scrollbar visible on the component
3. Scroll through the page normally — all 3 project titles and images cycle correctly
4. The last project (Watchly) is reachable
5. Right image panel is large, sticks in place while scrolling, switches on breakpoint
6. `npm run build` — production build passes
