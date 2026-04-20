import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import { StickyScroll } from "@/Components/ui/sticky-scroll-reveal";
import Carousel from "@/Components/ui/carousel";
import ProjectModal from "./ProjectModal";
import { projects } from "../data/projects";
import { fadeInUp, staggerContainer } from "../data/animations";

export default function FeaturedProjects() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);

  // Merge base project data with translated strings
  const translatedProjects = projects.map((p) => ({
    ...p,
    tagline: t(`projectData.${p.id}.tagline`),
    description: t(`projectData.${p.id}.description`),
    problem: t(`projectData.${p.id}.problem`),
    solution: t(`projectData.${p.id}.solution`),
    result: t(`projectData.${p.id}.result`),
  }));

  const stickyContent = translatedProjects.map((project) => ({
    title: project.title,
    description: project.description,
    content: (
      <img
        src={project.images[0]}
        alt={project.title}
        className="h-full w-full object-cover"
      />
    ),
  }));

  const carouselSlides = translatedProjects.map((project) => ({
    src: project.images[0],
    title: project.title,
    button: t("featured.viewCaseStudy"),
  }));

  const handleItemClick = (index) => setSelectedProject(translatedProjects[index]);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="type-title mb-4"
          >
            {t("featured.title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="type-subtitle max-w-2xl mx-auto">
            {t("featured.subtitle")}
          </motion.p>
        </motion.div>
      </div>

      <div className="hidden md:block">
        <StickyScroll content={stickyContent} onItemClick={handleItemClick} />
      </div>

      <div className="md:hidden flex flex-col items-center gap-10 px-4 pb-10">
        <Carousel slides={carouselSlides} onSlideClick={handleItemClick} />
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
