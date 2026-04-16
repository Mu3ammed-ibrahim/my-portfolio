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
