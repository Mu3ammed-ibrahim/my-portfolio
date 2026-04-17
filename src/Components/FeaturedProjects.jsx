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
