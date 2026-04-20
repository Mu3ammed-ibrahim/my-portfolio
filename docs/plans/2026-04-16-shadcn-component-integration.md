# Shadcn Component Integration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Integrate FloatingDock (mobile-only nav), Marquee (tech stack strip after Hero), and Features Section (Services grid before Contact) with full brand consistency.

**Architecture:** FloatingDock wraps the existing ui component with portfolio-specific items, hidden on desktop via `md:hidden` in App.jsx. TechStack.jsx wraps the Marquee ui component with imported icon assets. Services.jsx is a restyled copy of features-section-demo-2.jsx. Skills is removed. App.jsx is the single wiring point.

**Tech Stack:** React 19, Tailwind v4, Framer Motion (`framer-motion`), Lucide React, `react-intersection-observer`, `motion/react` (for FloatingDock internals)

---

### Task 1: Restyle `floating-dock.jsx` with brand colors

**Files:**
- Modify: `src/Components/ui/floating-dock.jsx`

**Step 1: Replace Tabler icon import with Lucide**

Remove:
```js
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
```
Add:
```js
import { LayoutDashboard } from "lucide-react";
```

**Step 2: Replace the collapse button icon element**

Find: `<IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />`
Replace with: `<LayoutDashboard className="h-5 w-5 text-brand-muted" />`

**Step 3: Restyle `FloatingDockMobile` button**

Find: `className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"`
Replace with: `className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-bg/90 backdrop-blur-xl border border-white/10"`

**Step 4: Restyle `FloatingDockMobile` item link circles**

Find: `className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"`
Replace with: `className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-surface border border-white/10"`

**Step 5: Restyle `FloatingDockDesktop` bar**

Find: `"mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900"`
Replace with: `"mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-brand-bg/90 backdrop-blur-xl border border-white/10 px-4 pb-3 md:flex"`

**Step 6: Restyle `IconContainer` background**

Find: `className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"`
Replace with: `className="relative flex aspect-square items-center justify-center rounded-full bg-brand-surface"`

**Step 7: Restyle tooltip**

Find: `className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"`
Replace with: `className="absolute -top-8 left-1/2 w-fit rounded-md border border-white/10 bg-brand-surface px-2 py-0.5 text-xs whitespace-pre text-brand-text"`

**Step 8: Commit**
```bash
git add src/Components/ui/floating-dock.jsx
git commit -m "style: restyle FloatingDock with brand colors and Lucide icon"
```

---

### Task 2: Create `FloatingDockNav.jsx`

**Files:**
- Create: `src/Components/FloatingDockNav.jsx`

**Step 1: Write the component**

```jsx
import { FloatingDock } from "@/Components/ui/floating-dock";
import { Home, Briefcase, Wrench, Trophy, Mail, FileText } from "lucide-react";

const items = [
  {
    title: "Home",
    icon: <Home className="w-full h-full text-brand-muted" />,
    href: "#hero",
  },
  {
    title: "Projects",
    icon: <Briefcase className="w-full h-full text-brand-muted" />,
    href: "#projects",
  },
  {
    title: "Services",
    icon: <Wrench className="w-full h-full text-brand-muted" />,
    href: "#services",
  },
  {
    title: "Achievements",
    icon: <Trophy className="w-full h-full text-brand-muted" />,
    href: "#achievements",
  },
  {
    title: "Contact",
    icon: <Mail className="w-full h-full text-brand-muted" />,
    href: "#contact",
  },
  {
    title: "Resume",
    icon: <FileText className="w-full h-full text-brand-muted" />,
    href: "/Mohammed Almuatsim Ibrahim V1-Resume.pdf.pdf",
  },
];

export default function FloatingDockNav() {
  return (
    <FloatingDock
      items={items}
      mobileClassName="fixed bottom-6 right-6 z-50"
    />
  );
}
```

**Step 2: Commit**
```bash
git add src/Components/FloatingDockNav.jsx
git commit -m "feat: create FloatingDockNav for mobile navigation"
```

---

### Task 3: Create `TechStack.jsx`

**Files:**
- Create: `src/Components/TechStack.jsx`

**Step 1: Write the component**

```jsx
import { Marquee } from "@/Components/ui/marquee";

import htmlIcon from "../assets/Icons/html.png";
import cssIcon from "../assets/Icons/css.png";
import jsIcon from "../assets/Icons/js.png";
import reactIcon from "../assets/Icons/react.png";
import nextjsIcon from "../assets/Icons/Next js (1).png";
import tailwindIcon from "../assets/Icons/tailwind-css-seeklogo.png";
import gitIcon from "../assets/Icons/git.png";
import githubIcon from "../assets/Icons/github.png";
import framerIcon from "../assets/Icons/framer-motion-logo-png_seeklogo-446185 (1).png";
import reduxIcon from "../assets/Icons/Redux.png";
import bootstrapIcon from "../assets/Icons/bootstrap.png";
import figmaIcon from "../assets/Icons/Figma logo.png";
import gsapIcon from "../assets/Icons/Gsap.webp";
import supabaseIcon from "../assets/Icons/Supabase.png";
import vercelIcon from "../assets/Icons/Vercel.png";

const techs = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "React", icon: reactIcon },
  { name: "Next.js", icon: nextjsIcon },
  { name: "Tailwind", icon: tailwindIcon },
  { name: "Git", icon: gitIcon },
  { name: "GitHub", icon: githubIcon },
  { name: "Framer Motion", icon: framerIcon },
  { name: "Redux", icon: reduxIcon },
  { name: "Bootstrap", icon: bootstrapIcon },
  { name: "Figma", icon: figmaIcon },
  { name: "GSAP", icon: gsapIcon },
  { name: "Supabase", icon: supabaseIcon },
  { name: "Vercel", icon: vercelIcon },
];

function TechCard({ name, icon }) {
  return (
    <div className="flex flex-col items-center gap-2 mx-3 px-4 py-3 rounded-xl bg-brand-surface border border-white/5 hover:border-brand-cta/30 hover:shadow-[0_0_12px_rgba(34,197,94,0.1)] transition-all duration-300">
      <img src={icon} alt={name} className="w-8 h-8 object-contain" />
      <span className="text-xs text-brand-muted whitespace-nowrap">{name}</span>
    </div>
  );
}

export default function TechStack() {
  return (
    <section className="py-16 bg-brand-bg overflow-hidden">
      <p className="text-center text-xs font-semibold uppercase tracking-widest text-brand-muted mb-8">
        Technologies
      </p>
      <div className="relative">
        <Marquee pauseOnHover repeat={4}>
          {techs.map((tech) => (
            <TechCard key={tech.name} {...tech} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-brand-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-bg to-transparent" />
      </div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add src/Components/TechStack.jsx
git commit -m "feat: create TechStack marquee section"
```

---

### Task 4: Create `Services.jsx`

**Files:**
- Create: `src/Components/Services.jsx`

**Step 1: Write the component**

```jsx
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import {
  Monitor,
  Paintbrush,
  Smartphone,
  Zap,
  Plug,
  Component,
  GitBranch,
  Layers,
} from "lucide-react";

const services = [
  {
    title: "Frontend Development",
    description: "Building fast, responsive UIs with React and modern tooling.",
    icon: <Monitor />,
  },
  {
    title: "UI/UX Implementation",
    description: "Translating designs into pixel-perfect, accessible interfaces.",
    icon: <Paintbrush />,
  },
  {
    title: "Responsive Design",
    description: "Layouts that work flawlessly across all screen sizes.",
    icon: <Smartphone />,
  },
  {
    title: "Performance Optimization",
    description: "Lazy loading, code splitting, and render optimization.",
    icon: <Zap />,
  },
  {
    title: "API Integration",
    description: "Connecting frontends to REST APIs and third-party services.",
    icon: <Plug />,
  },
  {
    title: "Component Libraries",
    description: "Building reusable, maintainable design systems.",
    icon: <Component />,
  },
  {
    title: "Version Control",
    description: "Git workflows, branching strategies, and clean code reviews.",
    icon: <GitBranch />,
  },
  {
    title: "Animation & Motion",
    description: "Smooth, purposeful animations with Framer Motion.",
    icon: <Layers />,
  },
];

const ServiceCard = ({ title, description, icon, index }) => (
  <div
    className={cn(
      "flex flex-col lg:border-r py-10 relative group/feature border-white/5",
      (index === 0 || index === 4) && "lg:border-l border-white/5",
      index < 4 && "lg:border-b border-white/5"
    )}
  >
    {index < 4 && (
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-brand-surface to-transparent pointer-events-none" />
    )}
    {index >= 4 && (
      <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-brand-surface to-transparent pointer-events-none" />
    )}
    <div className="mb-4 relative z-10 px-10 text-brand-muted">{icon}</div>
    <div className="text-lg font-bold mb-2 relative z-10 px-10">
      <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-white/10 group-hover/feature:bg-brand-cta transition-all duration-200 origin-center" />
      <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-brand-text">
        {title}
      </span>
    </div>
    <p className="text-sm text-brand-muted max-w-xs relative z-10 px-10">
      {description}
    </p>
  </div>
);

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="services" className="bg-brand-bg py-20">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6"
      >
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-brand-text font-nippo mb-3">
            What I Offer
          </h2>
          <p className="text-brand-muted">Services &amp; capabilities</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {services.map((service, index) => (
            <ServiceCard key={service.title} {...service} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
```

**Step 2: Commit**
```bash
git add src/Components/Services.jsx
git commit -m "feat: create Services section with brand styling"
```

---

### Task 5: Update `Navbar.jsx` — swap Skills for Services

**Files:**
- Modify: `src/Components/Navbar.jsx`

**Step 1: Update `navLinks`**

Find:
```js
const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];
```

Replace with:
```js
const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#services", label: "Services" },
  { href: "#achievements", label: "Achievements" },
  { href: "#contact", label: "Contact" },
];
```

**Step 2: Update scroll-detection sections array**

Find:
```js
const sections = ["projects", "skills", "achievements", "contact"];
```

Replace with:
```js
const sections = ["projects", "services", "achievements", "contact"];
```

**Step 3: Commit**
```bash
git add src/Components/Navbar.jsx
git commit -m "feat: replace Skills nav link with Services"
```

---

### Task 6: Rewrite `App.jsx` — wire everything together

**Files:**
- Modify: `src/App.jsx`

**Step 1: Replace entire file content**

```jsx
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import TechStack from "./Components/TechStack";
import FeaturedProjects from "./Components/FeaturedProjects";
import Achievements from "./Components/Achievements";
import Workflow from "./Components/Workflow";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import FloatingDockNav from "./Components/FloatingDockNav";
import "./App.css";

function App() {
  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile navigation */}
      <div className="md:hidden">
        <FloatingDockNav />
      </div>

      <section id="hero">
        <Hero />
      </section>

      <TechStack />

      <section id="projects">
        <FeaturedProjects />
      </section>

      <section id="achievements">
        <Achievements />
      </section>

      <Workflow />

      <Services />

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
```

**Step 2: Commit**
```bash
git add src/App.jsx
git commit -m "feat: wire FloatingDockNav, TechStack, Services into App; remove Skills"
```

---

### Task 7: Verify

**Step 1: Run dev server**
```bash
npm run dev
```

Check in browser:
- [ ] Desktop (≥768px): Navbar visible at top, FloatingDock hidden
- [ ] Mobile (<768px): Navbar hidden, FloatingDock trigger visible bottom-right; expands with 6 items; all hrefs scroll correctly
- [ ] TechStack: marquee scrolls after Hero, pauses on hover, fade edges visible
- [ ] Services: section appears between Workflow and Contact; 8 cards with green hover border and gradient

**Step 2: Production build**
```bash
npm run build
```
Expected: `✓ built in Xs` — no errors.

**Step 3: Commit any fixes**
```bash
git add -A
git commit -m "fix: post-integration fixes"
```
