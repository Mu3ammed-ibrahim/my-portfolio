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
