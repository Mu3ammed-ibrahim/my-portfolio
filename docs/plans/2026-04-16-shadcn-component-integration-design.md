# Shadcn Component Integration Design

**Date:** 2026-04-16  
**Status:** Approved

---

## Overview

Integrate three newly added shadcn components — Floating Dock, Marquee, and Features Section — into the portfolio with full brand consistency. All components are restyled to match the existing design system (`#0F172A` background, `#22C55E` green accent, Nippo font, Framer Motion transitions).

---

## Section Order (After Integration)

```
Navbar          — desktop only (≥768px), unchanged
FloatingDock    — mobile only (<768px), fixed bottom
─────────────────────────────────────────────────
Hero            — id="hero"
Marquee         — tech stack strip (replaces Skills)
FeaturedProjects — id="projects"
Achievements
Workflow
Services        — new section, id="services"
Contact         — id="contact"
```

**Removed:** `Skills` component and its import.

---

## Component 1 — Floating Dock (Mobile Nav)

**File:** `src/Components/ui/floating-dock.jsx` (existing, restyle only)  
**Demo file:** `src/Components/floating-dock-demo.jsx` (replace content)  
**Rendered in:** `App.jsx` — inside a `md:hidden` wrapper alongside the existing Navbar

### Nav Items
| Icon (Lucide) | Label | Target |
|---|---|---|
| Home | Home | `#hero` |
| User | About | `#about` |
| Briefcase | Projects | `#projects` |
| Wrench | Services | `#services` |
| Mail | Contact | `#contact` |
| FileText | Resume | Download PDF |

### Styling
- Dock background: `bg-brand-bg/90` + `backdrop-blur-xl`
- Border: `border-white/10`
- Icon hover/active tint: `#22C55E` (brand green)
- Icons: Lucide React (replacing Tabler icons)

### Section IDs Required
Add `id` attributes to each section's root element in `App.jsx`:
- Hero → `id="hero"`
- AboutMe → `id="about"`
- FeaturedProjects → `id="projects"`
- Services → `id="services"`
- Contact → `id="contact"`

---

## Component 2 — Marquee Tech Stack

**File:** `src/Components/ui/marquee.jsx` (existing, no changes needed)  
**New component:** `src/Components/TechStack.jsx`  
**Replaces:** `Skills` component (removed from `App.jsx`)

### Layout
- Narrow section with comfortable vertical padding
- Small caps label: "Technologies" in `text-brand-muted`, centered above the strip
- Single horizontal row, auto-scrolling left
- `pauseOnHover` enabled, `repeat={4}` (default)
- Left/right fade edges via CSS mask gradient (`from-brand-bg` to transparent)

### Marquee Items
- Source: all PNG/SVG icons from `src/assets/Icons/`
- Each item: logo image + name label in `text-brand-muted text-xs`
- Card style: `bg-brand-surface` background, `border-white/5` border, green glow on hover

---

## Component 3 — Services Section

**File:** `src/Components/features-section-demo-2.jsx` (restyle + replace content)  
**Rename to:** `src/Components/Services.jsx`  
**Placement:** Between Workflow and Contact in `App.jsx`

### Section Header
- Heading: "What I Offer" — Nippo font, `text-brand-text`
- Subheading: "Services & capabilities" — `text-brand-muted`
- Framer Motion fade-up entrance via `useInView` (matching existing pattern)

### 8 Service Cards
| Icon (Lucide) | Title | Description |
|---|---|---|
| Monitor | Frontend Development | Building fast, responsive UIs with React and modern tooling |
| Paintbrush | UI/UX Implementation | Translating designs into pixel-perfect, accessible interfaces |
| Smartphone | Responsive Design | Layouts that work flawlessly across all screen sizes |
| Zap | Performance Optimization | Lazy loading, code splitting, and render optimization |
| Plug | API Integration | Connecting frontends to REST APIs and third-party services |
| Component | Component Libraries | Building reusable, maintainable design systems |
| GitBranch | Version Control | Git workflows, branching strategies, and code reviews |
| Layers | Animation & Motion | Smooth, purposeful animations with Framer Motion |

### Styling Changes
- Background: `bg-brand-bg`
- Card hover accent border: `bg-brand-cta` (green, replacing blue-500)
- Card hover background: `bg-brand-surface`
- Text: `text-brand-text` / `text-brand-muted`
- Icons: Lucide React (replacing Tabler icons)

---

## Consistency Requirements

- All new components use Lucide React icons (not Tabler)
- All scroll targets use anchor `id` attributes (not JS scroll handlers)
- Entrance animations use `useInView` from `react-intersection-observer` with `triggerOnce: true` (existing pattern)
- No TypeScript — all files remain `.jsx`

---

## Verification

1. `npm run dev` — dev server starts, no CSS errors
2. Mobile (<768px): Navbar hidden, Floating Dock visible at bottom; all 6 links scroll/navigate correctly
3. Desktop (≥768px): Navbar visible, Floating Dock hidden
4. Marquee animates, pauses on hover, logos + labels render from `src/assets/Icons/`
5. Services section appears between Workflow and Contact; all 8 cards render with correct icons, hover states work (green accent border)
6. `npm run build` — production build completes cleanly
