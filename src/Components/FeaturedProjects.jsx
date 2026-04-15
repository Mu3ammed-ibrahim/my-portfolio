import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github } from "lucide-react";
import { fadeInUp, staggerContainer } from "../data/animations";

import TrackifyImage from "../assets/Projects/Trackify.png";

const featuredProjects = [
  {
    id: "nabd",
    title: "Nabd Company Website",
    subtitle: "CMS & CRM Platform",
    problem:
      "The client needed a professional web presence with integrated content management and customer relationship tools to streamline their operations.",
    techStack: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vercel"],
    features: [
      "Dynamic CMS for content updates",
      "CRM integration for lead management",
      "SEO-optimized responsive pages",
      "Role-based access control",
    ],
    metrics: { performance: 95, accessibility: 92, seo: 98 },
    liveUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: "kobonvip",
    title: "Kobonvip",
    subtitle: "Coupon Platform with Admin Panel",
    problem:
      "A coupon aggregation platform needed a robust admin dashboard with role-based authentication to manage merchants and offers at scale.",
    techStack: ["React", "Redux Toolkit", "Tailwind CSS", "Supabase", "REST APIs"],
    features: [
      "Role-based authentication system",
      "Admin panel for coupon management",
      "Merchant analytics dashboard",
      "Real-time coupon validation",
    ],
    metrics: { performance: 91, accessibility: 90, seo: 95 },
    liveUrl: "#",
    githubUrl: "#",
    image: null,
  },
  {
    id: "trackify",
    title: "Trackify",
    subtitle: "Finance Dashboard",
    problem:
      "Users needed an intuitive way to track expenses, visualize spending patterns, and manage personal finances effectively.",
    techStack: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Redux Toolkit",
      "Supabase",
      "Recharts",
    ],
    features: [
      "Interactive expense charts",
      "Category-based tracking",
      "Real-time data sync with Supabase",
      "Responsive dashboard layout",
    ],
    metrics: { performance: 93, accessibility: 88, seo: 90 },
    liveUrl: "https://lnkd.in/dK52KphC",
    githubUrl: "https://github.com/Mu3ammed-ibrahim/Trackify",
    image: TrackifyImage,
  },
];

const ScoreBar = ({ label, score }) => {
  const color =
    score >= 90
      ? "bg-brand-cta"
      : score >= 70
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-brand-muted w-28 shrink-0">{label}</span>
      <div className="flex-1 h-2 bg-brand-bg rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${score}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        />
      </div>
      <span className="text-xs font-medium text-brand-text w-8 text-right">
        {score}
      </span>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className="group bg-brand-surface rounded-2xl border border-white/5 overflow-hidden hover:border-brand-cta/30 hover:shadow-xl hover:shadow-brand-cta/5 transition-all duration-300"
    >
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-2/5 relative overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-64 md:h-full min-h-[280px] bg-gradient-to-br from-brand-cta/20 via-brand-surface-alt to-brand-bg flex items-center justify-center">
              <span className="text-6xl font-bold text-brand-cta/20">
                {project.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-xl md:text-2xl font-bold text-brand-text">
                {project.title}
              </h3>
            </div>
            <p className="text-sm text-brand-cta font-medium mb-4">
              {project.subtitle}
            </p>
            <p className="text-brand-muted text-sm leading-relaxed mb-5">
              {project.problem}
            </p>

            {/* Features */}
            <ul className="space-y-1.5 mb-5">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="text-sm text-brand-muted flex items-start gap-2"
                >
                  <span className="text-brand-cta mt-1 shrink-0">&#9656;</span>
                  {feature}
                </li>
              ))}
            </ul>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2.5 py-1 bg-brand-bg/80 text-brand-muted border border-white/5 rounded-md"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Lighthouse Scores */}
            <div className="space-y-2 mb-6">
              <p className="text-xs font-medium text-brand-text mb-2">
                Lighthouse Scores
              </p>
              <ScoreBar
                label="Performance"
                score={project.metrics.performance}
              />
              <ScoreBar
                label="Accessibility"
                score={project.metrics.accessibility}
              />
              <ScoreBar label="SEO" score={project.metrics.seo} />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-cta hover:bg-brand-cta-hover text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 text-brand-text hover:bg-white/5 text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              <Github size={14} />
              GitHub
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProjects = () => {
  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
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
            Production systems solving real business problems — not just UI demos.
          </motion.p>
        </motion.div>

        <div className="space-y-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
