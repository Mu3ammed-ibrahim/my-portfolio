import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ShieldCheck } from "lucide-react";
import { fadeInUp, staggerContainer } from "../data/animations";

const metrics = [
  { value: 5, suffix: "+", label: "Production Projects" },
  { value: 1000, suffix: "+", label: "Users Served" },
  { value: 90, suffix: "+", label: "Lighthouse Scores" },
  { value: 2, suffix: "+", label: "Years Experience" },
];

const AnimatedCounter = ({ value, suffix }) => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 });
  const motionVal = useMotionValue(0);
  const rounded = useTransform(motionVal, (latest) => Math.round(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
  }, []);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setDisplayValue(v));
    return unsubscribe;
  }, [rounded]);

  useEffect(() => {
    if (inView && !prefersReducedMotion) {
      const controls = animate(motionVal, value, {
        duration: 2,
        ease: "easeOut",
      });
      return controls.stop;
    } else if (inView && prefersReducedMotion) {
      setDisplayValue(value);
    }
  }, [inView, value, motionVal, prefersReducedMotion]);

  return (
    <div ref={ref} className="text-center">
      <span className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-cta tabular-nums">
        {displayValue.toLocaleString()}
        {suffix}
      </span>
    </div>
  );
};

const Achievements = () => {
  return (
    <section id="achievements" className="py-20 md:py-28">
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
            Achievements
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-brand-muted max-w-2xl mx-auto"
          >
            Measurable results from real-world projects.
          </motion.p>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-12">
          {metrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-brand-surface rounded-xl p-6 md:p-8 border border-white/5 text-center"
            >
              <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              <p className="text-sm text-brand-muted mt-3">{metric.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Certification Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-brand-surface rounded-xl p-6 border border-white/5 flex flex-col sm:flex-row items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full bg-brand-cta/10 flex items-center justify-center shrink-0">
            <ShieldCheck size={24} className="text-brand-cta" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-brand-text">
              Meta Frontend Developer Professional Certificate
            </h3>
            <p className="text-sm text-brand-muted">
              Coursera &middot; 2025 &mdash; Comprehensive certification covering
              React, Advanced React, UX/UI Design, JavaScript, and HTML/CSS.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;
