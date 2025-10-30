import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import ProjectImage1 from "../assets/Projects/E commerce app.png";
import ProjectImage2 from "../assets/Projects/Jumping dianasour.png";
import ProjectImage3 from "../assets/Projects/Mega store.png";
import ProjectImage4 from "../assets/Projects/portfolio app.png";
import ProjectImage5 from "../assets/Projects/watchly.png";
import ProjectImage6 from "../assets/Projects/Trackify.png";
import ProjectImage7 from "../assets/Projects/GameZone.png";
import Certification1 from "../assets/Certifications/Advanced React.png"
import Certification3 from "../assets/Certifications/Html and Css.png"
import Certification4 from "../assets/Certifications/Programming with Javascript.png"
import Certification5 from "../assets/Certifications/UXUI DESIGN.png"
import Certification6 from "../assets/Certifications/React Basics.png"
import Certification7 from "../assets/Certifications/Meta Frontend Developer Certification.png"
import { useInView } from "react-intersection-observer";
import { Code2, Award, Palette, ExternalLink, Github } from "lucide-react";

const projectsData = [
  {
    id: 7,
    title: "GameZone",
    description: "A fully responsive gaming store landing page.",
    technologies: ["React","Vite" ,"Shadcn","React Router", "Gsap", "Tailwind CSS"],
    image: ProjectImage7,
    link: "https://game-zone-orpin-eta.vercel.app/",
    github: "https://github.com/Mu3ammed-ibrahim/GameZone",
  },
  {
    id: 6,
    title: "Trackify",
    description: "Trackify is a modern, responsive expense tracking web application built to help users manage their personal finances with ease. ",
    technologies: ["Next js","React", "Tailwind CSS", "Framer Motion","Redux Toolkit","Supabase","Semantic Html","Rechart"],
    image: ProjectImage6,
    link: " https://lnkd.in/dK52KphC",
    github: "https://github.com/Mu3ammed-ibrahim/Trackify",
  },
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

// Placeholder data for certifications and designs
// Add your certification images in the assets folder and import them
const certificationsData = [
  {
    id: 1,
    title: "Meta Frontend Developer Certification ",
    issuer: "Coursera",
    date: "2025",
    image: Certification7 , // Replace with your image path
    credentialUrl: "#",
  },
  {
    id: 2,
    title: "React Advanced ",
    issuer: "coursera",
    date: "2025",
    image: Certification1, // Replace with your image path
    credentialUrl: "#",
  },
  {
    id: 3,
    title: "Princeples Of UX/UI Design ",
    issuer: "Coursera",
    date: "2025",
    image: Certification5 , // Replace with your image path
    credentialUrl: "#",
  },
  {
    id: 4,
    title: "Programming with Javascript ",
    issuer: "Coursera",
    date: "2025",
    image: Certification4, // Replace with your image path
    credentialUrl: "#",
  },
  {
    id: 5,
    title: "Html and Css ",
    issuer: "Coursera",
    date: "2025",
    image: Certification3 , // Replace with your image path
    credentialUrl: "#",
  },
  {
    id: 6,
    title: "React Basics ",
    issuer: "Coursera",
    date: "2025",
    image: Certification6 , // Replace with your image path
    credentialUrl: "#",
  },
];

const designsData = [
  {
    id: 1,
    title: "Little Lemon Restruant",
    description: "Designed a modern and vibrant restaurant website with a focus on user experience.",
    tool: "Figma",
    link: "#",
  },
  {
    id: 2,
    title: "Mobile Banking App",
    description: "Sleek and intuitive mobile banking interface with focus on user experience.",
    tool: "Adobe XD",
    link: "#",
  },

];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeTab, setActiveTab] = useState("projects");
  
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Reset and trigger animations when tab changes
  useEffect(() => {
    controls.start("visible");
  }, [activeTab, controls]);

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

  const toggleProjectOverlay = (projectId) => {
    if (activeProject === projectId) {
      setActiveProject(null);
    } else {
      setActiveProject(projectId);
    }
  };

  const tabs = [
    { id: "projects", label: "Projects", icon: Code2 },
    { id: "certifications", label: "Certifications", icon: Award },
    { id: "designs", label: "Designs", icon: Palette },
  ];

  return (
    <section id="projects" className="relative py-20 overflow-hidden text-white bg-zinc-900">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 70% 60%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)",
              "radial-gradient(circle at 30% 40%, rgba(16, 185, 129, 0.08) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5" />
      </div>

      <div 
        ref={ref}
        className="container relative z-10 px-4 mx-auto"
      >
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate={controls}
          variants={headingVariants}
          className="mb-8 text-center"
        >
          <h2 className="text-4xl font-bold text-green-500 md:text-5xl lg:text-6xl">
            Portfolio Showcase
          </h2>
          <p className="max-w-3xl mx-auto mt-4 text-lg text-gray-300 md:text-xl">
            Explore my journey through projects, certifications, and functional designs. Each section represents a milestone in my continued learning path.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={headingVariants}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-green-700 text-white shadow-lg shadow-green-700/50"
                    : "bg-zinc-800/70 text-gray-300 hover:bg-zinc-700/70 backdrop-blur-sm border border-zinc-700/50"
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Projects Tab Content */}
        {activeTab === "projects" && (
          <motion.div
            key="projects-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {projectsData.map((project) => (
              <motion.div
                key={project.id}
                variants={projectVariants}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden border shadow-lg bg-zinc-800/50 backdrop-blur-sm rounded-xl border-zinc-700/50 hover:border-green-700/50 hover:shadow-xl hover:shadow-green-700/20"
              >
                <motion.div 
                  className="relative h-48 overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => toggleProjectOverlay(project.id)}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="object-cover w-full h-full"
                  />
                  <motion.div 
                    className={`absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center gap-4 transition duration-300 ${
                      activeProject === project.id ? 'opacity-100' : 'opacity-0 hover:opacity-100'
                    }`}
                  >
                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "#16a34a" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} />
                      Live Demo
                    </motion.a>
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-white bg-green-600 rounded-full"
                      whileHover={{ scale: 1.1, backgroundColor: "#16a34a" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} />
                      GitHub
                    </motion.a>
                  </motion.div>
                </motion.div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold text-green-400">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-300">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 text-xs font-medium text-green-400 border rounded-full bg-green-700/10 border-green-700/30"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Certifications Tab Content */}
        {activeTab === "certifications" && (
          <motion.div
            key="certifications-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {certificationsData.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="overflow-hidden border shadow-lg bg-zinc-800/50 backdrop-blur-sm rounded-xl border-zinc-700/50 hover:border-green-700/50 hover:shadow-xl hover:shadow-green-700/20"
              >
                {/* Certificate Image */}
                <div className="relative h-48 overflow-hidden bg-zinc-900">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-green-400">
                    {cert.title}
                  </h3>
                  <p className="mb-1 text-sm text-gray-300">{cert.issuer}</p>
                  <p className="mb-4 text-xs text-gray-500">{cert.date}</p>

                  <motion.a
                    href={cert.credentialUrl}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-green-400 transition-colors hover:text-green-300"
                  >
                    <ExternalLink size={16} />
                    View Credential
                  </motion.a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Designs Tab Content */}
        {activeTab === "designs" && (
          <motion.div
            key="designs-content"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          >
            {designsData.map((design, index) => (
              <motion.div
                key={design.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="overflow-hidden border shadow-lg bg-zinc-800/50 backdrop-blur-sm rounded-xl border-zinc-700/50 hover:border-green-700/50 hover:shadow-xl hover:shadow-green-700/20"
              >
                <div className="relative flex items-center justify-center h-48 overflow-hidden bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                  <Palette className="text-green-700/40" size={64} />
                </div>

                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-green-400">
                    {design.title}
                  </h3>
                  <p className="mb-4 text-sm leading-relaxed text-gray-300">
                    {design.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 text-xs font-medium text-green-400 border rounded-full bg-green-700/10 border-green-700/30">
                      {design.tool}
                    </span>
                    <motion.a
                      href={design.link}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 text-sm text-green-400 transition-colors hover:text-green-300"
                    >
                      <ExternalLink size={16} />
                      View
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}