import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Monitor, Layers, Database, Wrench, Rocket } from "lucide-react";
import { fadeInUp, staggerContainer } from "../data/animations";

import ReactIcon from "../assets/Icons/react.png";
import NextIcon from "../assets/Icons/Next js (1).png";
import TailwindIcon from "../assets/Icons/tailwind-css-seeklogo.png";
import JsIcon from "../assets/Icons/js.png";
import HtmlIcon from "../assets/Icons/html.png";
import CssIcon from "../assets/Icons/css.png";
import FramerIcon from "../assets/Icons/framer-motion-logo-png_seeklogo-446185 (1).png";
import ReduxIcon from "../assets/Icons/Redux.png";
import SupabaseIcon from "../assets/Icons/Supabase.png";
import GitIcon from "../assets/Icons/git.png";
import GithubIcon from "../assets/Icons/github.png";
import VercelIcon from "../assets/Icons/Vercel.png";
import FigmaIcon from "../assets/Icons/Figma logo.png";

const iconMap = {
  Monitor,
  Layers,
  Database,
  Wrench,
  Rocket,
};

const skillCategories = [
  {
    title: "Frontend",
    icon: "Monitor",
    skills: [
      { name: "React", icon: ReactIcon },
      { name: "Next.js", icon: NextIcon },
      { name: "Tailwind CSS", icon: TailwindIcon },
      { name: "JavaScript", icon: JsIcon },
      { name: "HTML", icon: HtmlIcon },
      { name: "CSS", icon: CssIcon },
      { name: "Framer Motion", icon: FramerIcon },
    ],
  },
  {
    title: "State Management",
    icon: "Layers",
    skills: [{ name: "Redux Toolkit", icon: ReduxIcon }],
  },
  {
    title: "Backend Integration",
    icon: "Database",
    skills: [
      { name: "Supabase", icon: SupabaseIcon },
      { name: "REST APIs", icon: null },
    ],
  },
  {
    title: "Tools",
    icon: "Wrench",
    skills: [
      { name: "Git", icon: GitIcon },
      { name: "GitHub", icon: GithubIcon },
      { name: "Vercel", icon: VercelIcon },
      { name: "Figma", icon: FigmaIcon },
    ],
  },
  {
    title: "Deployment",
    icon: "Rocket",
    skills: [
      { name: "DNS & SSL", icon: null },
      { name: "Hosting", icon: null },
    ],
  },
];

const CategoryCard = ({ category, index }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const IconComponent = iconMap[category.icon];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
      className="bg-brand-surface rounded-xl p-6 border border-white/5 hover:border-brand-cta/20 transition-all duration-300"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-lg bg-brand-cta/10 flex items-center justify-center">
          <IconComponent size={20} className="text-brand-cta" />
        </div>
        <h3 className="text-lg font-semibold text-brand-text">
          {category.title}
        </h3>
      </div>

      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{
              duration: 0.3,
              delay: index * 0.1 + i * 0.05,
              ease: "easeOut",
            }}
            className="flex items-center gap-2 px-3 py-2 bg-brand-bg/60 rounded-lg border border-white/5 hover:border-brand-cta/20 hover:scale-105 transition-all duration-200 cursor-default"
          >
            {skill.icon ? (
              <img
                src={skill.icon}
                alt={skill.name}
                className="w-5 h-5 object-contain"
                loading="lazy"
              />
            ) : (
              <div className="w-5 h-5 rounded bg-brand-cta/20 flex items-center justify-center">
                <span className="text-[10px] text-brand-cta font-bold">
                  {skill.name.charAt(0)}
                </span>
              </div>
            )}
            <span className="text-sm text-brand-muted">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-20 md:py-28">
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
            Skills & Tech Stack
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-brand-muted max-w-2xl mx-auto">
            Technologies I use to build production-ready web applications.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <CategoryCard
              key={category.title}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
