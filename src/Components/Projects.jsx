import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ProjectImage1 from "../assets/Projects/E commerce app.png";
import ProjectImage2 from "../assets/Projects/Jumping dianasour.png";
import ProjectImage3 from "../assets/Projects/Mega store.png";
import ProjectImage4 from "../assets/Projects/portfolio app.png";
import ProjectImage5 from "../assets/Projects/watchly.png";
import { useInView } from "react-intersection-observer";

const projectsData = [
  {
    id: 5,
    title: "Watchly",
    description: "A web application for watching movies and TV shows.",
    technologies: ["React", "Tailwind CSS", "Framer Motion","Redux Toolkit","React Router","Semantic Html"],
    image: ProjectImage5,
    link: "https://watchly-m.netlify.app/",
    github: "https://github.com/Mu3ammed-ibrahim/watchly",
  },
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
    id: 4,
    title: "Portfolio Website",
    description: "My personal portfolio to showcase projects and skills with a modern look.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    image: ProjectImage4,
    link: "#",
    github: "https://github.com/Mu3ammed-ibrahim/my-portfolio",
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
  }
];

export default function Projects() {
  // Track which project overlay is active (for mobile)
  const [activeProject, setActiveProject] = useState(null);
  
  // Animation controls setup
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    // Removed triggerOnce to allow animations to replay
  });

  // Trigger animations when component comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

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

  // Toggle project overlay
  const toggleProjectOverlay = (projectId) => {
    if (activeProject === projectId) {
      setActiveProject(null);
    } else {
      setActiveProject(projectId);
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
            Check out some of my recent work
          </p>
        </motion.div>

        {/* Project Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {projectsData.map((project) => (
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
                onClick={() => toggleProjectOverlay(project.id)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <motion.div 
                  className={`absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 transition duration-300 ${
                    activeProject === project.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                  }`}
                >
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-full text-sm"
                    whileHover={{ scale: 1.1, backgroundColor: "#16a34a" }}
                    whileTap={{ scale: 0.95 }}
                    // Stop propagation to prevent toggling the overlay when clicking links
                    onClick={(e) => e.stopPropagation()}
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
                    onClick={(e) => e.stopPropagation()}
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
      </div>
    </section>
  );
}