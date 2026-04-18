import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { StickyScroll } from "@/Components/ui/sticky-scroll-reveal";
import Carousel from "@/Components/ui/carousel";
import ProjectModal from "./ProjectModal";
import { projects } from "../data/projects";
import { fadeInUp, staggerContainer } from "../data/animations";

const stickyContent = projects.map((project) => ({
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

const carouselSlides = projects.map((project) => ({
  src: project.images[0],
  title: project.title,
  button: "View Case Study",
}));

export default function FeaturedProjects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState(null);

  const handleItemClick = (index) => setSelectedProject(projects[index]);

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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-text mb-4"
          >
            Featured Projects
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-brand-muted max-w-2xl mx-auto">
            Production systems solving real business problems.
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
