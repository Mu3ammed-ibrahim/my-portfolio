import { memo } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

import htmlIcon from "../assets/Icons/html.png";
import cssIcon from "../assets/Icons/css.png";
import jsIcon from "../assets/Icons/js.png";
import reactIcon from "../assets/Icons/react.png";
import nextjsIcon from "../assets/Icons/Next js.png";
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
import typescriptIcon from "../assets/Icons/Typescript.png";

const techs = [
  { name: "HTML", icon: htmlIcon },
  { name: "CSS", icon: cssIcon },
  { name: "JavaScript", icon: jsIcon },
  { name: "TypeScript", icon: typescriptIcon },
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

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const TechCard = memo(function TechCard({ name, icon }) {
  return (
    <figure className="relative flex cursor-pointer flex-col items-center gap-2 overflow-hidden rounded-xl border px-5 py-4 border-white/10 bg-white/[.03] hover:bg-white/[.06] transition-colors duration-300">
      <img src={icon} alt={name} className="w-8 h-8 object-contain" loading="lazy" decoding="async" />
      <figcaption className="text-xs text-brand-muted whitespace-nowrap">{name}</figcaption>
    </figure>
  );
});

export default function TechStack() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-16 bg-brand-bg">
      <p className="text-center mb-8">
        <span className="type-kicker">{t("tech.label")}</span>
      </p>
      <motion.div
        ref={ref}
        className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto px-6"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {techs.map((tech) => (
          <motion.div key={tech.name} variants={itemVariants}>
            <TechCard {...tech} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
