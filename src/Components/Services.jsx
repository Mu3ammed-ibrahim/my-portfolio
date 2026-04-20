import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
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

const icons = [Monitor, Paintbrush, Smartphone, Zap, Plug, Component, GitBranch, Layers];

const ServiceCard = ({ title, description, icon: Icon, index }) => (
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
    <div className="mb-4 relative z-10 px-10 text-brand-muted">
      <Icon />
    </div>
    <div className="type-card-title mb-2 relative z-10 px-10">
      <div className="absolute left-0 rtl:left-auto rtl:right-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full rtl:rounded-tr-none rtl:rounded-br-none rtl:rounded-tl-full rtl:rounded-bl-full bg-white/10 group-hover/feature:bg-brand-cta transition-all duration-200 origin-center" />
      <span className="group-hover/feature:translate-x-2 rtl:group-hover/feature:translate-x-0 rtl:group-hover/feature:-translate-x-2 transition duration-200 inline-block text-brand-text">
        {title}
      </span>
    </div>
    <p className="type-card-body max-w-xs relative z-10 px-10">
      {description}
    </p>
  </div>
);

export default function Services() {
  const { t } = useTranslation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const serviceItems = t("services.items", { returnObjects: true });

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
          <h2 className="type-title mb-3">
            {t("services.title")}
          </h2>
          <p className="type-subtitle max-w-2xl mx-auto">{t("services.subtitle")}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10">
          {serviceItems.map((service, index) => (
            <ServiceCard
              key={service.title}
              title={service.title}
              description={service.description}
              icon={icons[index]}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
