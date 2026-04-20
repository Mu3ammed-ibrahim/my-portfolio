import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { Palette, Code2, Database, Rocket, Gauge } from "lucide-react";
import { fadeInUp, staggerContainer } from "../data/animations";

const icons = [Palette, Code2, Database, Rocket, Gauge];

const Workflow = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  const workflowSteps = t("workflow.steps", { returnObjects: true });

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
            className="type-title mb-4"
          >
            {t("workflow.title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="type-subtitle max-w-2xl mx-auto">
            {t("workflow.subtitle")}
          </motion.p>
        </motion.div>

        <div ref={ref} className="relative">
          {/* Desktop: Horizontal */}
          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute top-6 left-6 right-6 h-0.5 bg-white/5">
              <motion.div
                className="h-full bg-brand-cta"
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            {workflowSteps.map((step, index) => {
              const Icon = icons[index];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.2, ease: "easeOut" }}
                  className="flex flex-col items-center text-center flex-1 relative z-10"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-surface border-2 border-brand-cta flex items-center justify-center mb-4">
                    <Icon size={20} className="text-brand-cta" />
                  </div>
                  <h3 className="type-card-title mb-1 text-sm md:text-base">{step.title}</h3>
                  <p className="type-card-body text-xs md:text-sm max-w-[140px]">{step.description}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: Vertical */}
          <div className="md:hidden relative pl-8 rtl:pl-0 rtl:pr-8">
            <div className="absolute left-[15px] rtl:left-auto rtl:right-[15px] top-0 bottom-0 w-0.5 bg-white/5">
              <motion.div
                className="w-full bg-brand-cta"
                initial={{ height: "0%" }}
                animate={inView ? { height: "100%" } : {}}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
              />
            </div>

            <div className="space-y-8">
              {workflowSteps.map((step, index) => {
                const Icon = icons[index];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.15, ease: "easeOut" }}
                    className="relative flex items-start gap-4"
                  >
                    <div className="absolute -left-8 rtl:-left-auto rtl:-right-8 w-8 h-8 rounded-full bg-brand-surface border-2 border-brand-cta flex items-center justify-center z-10">
                      <Icon size={14} className="text-brand-cta" />
                    </div>
                    <div>
                      <h3 className="type-card-title mb-1 text-sm md:text-base">{step.title}</h3>
                      <p className="type-card-body text-xs md:text-sm">{step.description}</p>
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
