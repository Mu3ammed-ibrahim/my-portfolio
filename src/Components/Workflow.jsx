import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Palette, Code2, Database, Rocket, Gauge } from "lucide-react";
import { fadeInUp, staggerContainer } from "../data/animations";

const workflowSteps = [
  {
    step: 1,
    title: "Design",
    description: "UI/UX wireframes & prototypes in Figma",
    icon: Palette,
  },
  {
    step: 2,
    title: "Development",
    description: "Component-driven React with Tailwind CSS",
    icon: Code2,
  },
  {
    step: 3,
    title: "CMS Integration",
    description: "Dynamic content management & APIs",
    icon: Database,
  },
  {
    step: 4,
    title: "Deployment",
    description: "CI/CD pipeline, DNS & SSL setup",
    icon: Rocket,
  },
  {
    step: 5,
    title: "Optimization",
    description: "Lighthouse audits & performance tuning",
    icon: Gauge,
  },
];

const Workflow = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section className="py-20 md:py-28">
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
            Development Workflow
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-brand-muted max-w-2xl mx-auto"
          >
            My end-to-end process for delivering production-ready web platforms.
          </motion.p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className="relative">
          {/* Desktop: Horizontal */}
          <div className="hidden md:flex items-start justify-between relative">
            {/* Connecting Line */}
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-white/5">
              <motion.div
                className="h-full bg-brand-cta"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + index * 0.2,
                    ease: "easeOut",
                  }}
                  className="flex flex-col items-center text-center flex-1 relative z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-surface border-2 border-brand-cta flex items-center justify-center mb-4">
                    <Icon size={20} className="text-brand-cta" />
                  </div>
                  <h3 className="text-sm font-semibold text-brand-text mb-1">
                    {step.title}
                  </h3>
                  <p className="text-xs text-brand-muted max-w-[140px]">
                    {step.description}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: Vertical */}
          <div className="md:hidden relative pl-8">
            {/* Vertical Line */}
            <div className="absolute left-[15px] top-0 bottom-0 w-0.5 bg-white/5">
              <motion.div
                className="w-full bg-brand-cta"
                initial={{ height: "0%" }}
                animate={inView ? { height: "100%" } : {}}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            <div className="space-y-8">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + index * 0.15,
                      ease: "easeOut",
                    }}
                    className="relative flex items-start gap-4"
                  >
                    <div className="absolute -left-8 w-8 h-8 rounded-full bg-brand-surface border-2 border-brand-cta flex items-center justify-center z-10">
                      <Icon size={14} className="text-brand-cta" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-brand-text mb-1">
                        {step.title}
                      </h3>
                      <p className="text-xs text-brand-muted">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Workflow;
