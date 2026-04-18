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
