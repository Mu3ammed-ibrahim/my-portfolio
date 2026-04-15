import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "I build Company Websites",
  "I build Admin Dashboards",
  "I build CMS Systems",
  "I build CRM Platforms",
];

const RoleSwitcher = () => {
  const [index, setIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);

    const onChange = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return (
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-brand-cta">
        {roles.join(" / ")}
      </p>
    );
  }

  return (
    <div className="h-10 sm:h-12 md:h-14 lg:h-16 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={roles[index]}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-brand-cta"
        >
          {roles[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default RoleSwitcher;
