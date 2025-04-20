import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ProjectImage1 from "../assets/Projects/E commerce app.png";
import ProjectImage2 from "../assets/Projects/Jumping dianasour.png";
import ProjectImage3 from "../assets/Projects/Mega store.png";
import ProjectImage4 from "../assets/Projects/portfolio app.png";
import { useInView } from "react-intersection-observer";

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce web application showcasing advanced front-end skills.",
    technologies: ["React", "React Router", "Framer Motion", "Tailwind CSS"],
    image: ProjectImage1,
    link: "https://ecommerce-app-eshop.netlify.app",
    github: "https://github.com/Mu3ammed-ibrahim/e-commerce-app",
  },
  {
    id: 2,
    title: "Jumping Dinasour Game",
    description: "A game where the player jumps obstacles using CSS keyframe animation.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: ProjectImage2,
    link: "https://mu3ammed-ibrahim.github.io/Jumping-man",
    github: "https://github.com/Mu3ammed-ibrahim/Jumping-man",
  },
  {
    id: 3,
    title: "Simple Online Store",
    description: "Multi-page website for Mega-Store built with clean HTML/CSS and some JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: ProjectImage3,
    link: "https://kevinstaresdarbon.github.io/css-project/index.html",
    github: "https://github.com/Mu3ammed-ibrahim/css-project",
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "My personal portfolio to showcase projects and skills with a modern look.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    image: ProjectImage4,
    link: "#",
    github: "https://github.com/yourusername/portfolio",
  },
];

// Extract unique categories from all projects
const allCategories = [
  "All",
  ...new Set(
    projectsData.flatMap((project) =>
      project.technologies.map((tech) => {
        if (tech.includes("React")) return "React";
        if (tech === "HTML" || tech === "CSS") return "HTML/CSS";
        if (tech === "JavaScript") return "JavaScript";
        return tech;
      })
    )
  ),
];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");
  
  // Animation controls setup
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    // Removed triggerOnce to allow animations to replay
  });

  // Filter projects based on active tab
  const filteredProjects =
    activeTab === "All"
      ? projectsData
      : projectsData.filter((project) =>
          project.technologies.some((tech) =>
            activeTab === "HTML/CSS"
              ? tech === "HTML" || tech === "CSS"
              : tech.includes(activeTab)
          )
        );

  // Trigger animations when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Animation for category buttons
  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Animation variants for heading section
  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Animation variants for projects grid
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  // Animation variants for individual project cards
  const projectVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section id="projects" className="py-20 bg-zinc-900 text-white">
      <div 
        ref={ref}
        className="container mx-auto px-4"
      >
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={headingVariants}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-green-700">My Projects</h2>
          <p className="text-lg mt-2 text-gray-300">
            Browse by technology category
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {allCategories.map((category, index) => (
            <motion.button
              key={category}
              custom={index}
              variants={buttonVariants}
              initial="hidden"
              animate={controls}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeTab === category
                  ? "bg-green-700 text-white"
                  : "bg-zinc-800 text-gray-300 hover:bg-green-700 hover:text-white"
              }`}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg"
            >
              <motion.div 
                className="relative overflow-hidden h-48"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition duration-300"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                >
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-full text-sm"
                    whileHover={{ scale: 1.1, backgroundColor: "#16a34a" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Live Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-full text-sm"
                    whileHover={{ scale: 1.1, backgroundColor: "#16a34a" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    GitHub
                  </motion.a>
                </motion.div>
              </motion.div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.1, backgroundColor: "#166534" }}
                      className="text-xs px-2 py-1 bg-zinc-700 rounded-full text-gray-200"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Empty state if no projects match the filter */}
        {filteredProjects.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-gray-400">No projects found with this technology.</p>
            <motion.button
              onClick={() => setActiveTab("All")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-2 bg-green-700 text-white rounded-full"
            >
              Show all projects
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
}