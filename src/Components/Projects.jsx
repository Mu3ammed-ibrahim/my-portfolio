import { useState } from 'react';
import { motion } from 'framer-motion';

const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A fully responsive e-commerce web application showcasing advanced front-end skills.",
    technologies: ["React", "React Router", "Framer Motion", "Tailwind CSS"],
    image: "/src/assets/Projects/E commerce app.png",
    link: "https://ecommerce-app-eshop.netlify.app",
    github: "https://github.com/Mu3ammed-ibrahim/e-commerce-app"
  },
  {
    id: 2,
    title: "Jumping Dinasour Game",
    description: "A game where the player jumps obstacles using CSS keyframe animation.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/src/assets/Projects/Jumping dianasour.png",
    link: "https://mu3ammed-ibrahim.github.io/Jumping-man",
    github: "https://github.com/Mu3ammed-ibrahim/Jumping-man"
  },
  {
    id: 3,
    title: "Simple Online Store",
    description: "Multi-page website for Mega-Store built with clean HTML/CSS and some JavaScript.",
    technologies: ["HTML", "CSS", "JavaScript"],
    image: "/src/assets/Projects/Mega store.png",
    link: "https://kevinstaresdarbon.github.io/css-project/index.html",
    github: "https://github.com/Mu3ammed-ibrahim/css-project"
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "My personal portfolio to showcase projects and skills with a modern look.",
    technologies: ["React", "Tailwind CSS", "Framer Motion"],
    image: "/src/assets/Projects/portfolio app.png",
    link: "#",
    github: "https://github.com/yourusername/portfolio"
  }
];

// Extract unique categories from all projects
const allCategories = ["All", ...new Set(projectsData.flatMap(project => project.technologies.map(tech => {
  if (tech.includes("React")) return "React";
  if (tech === "HTML" || tech === "CSS") return "HTML/CSS";
  if (tech === "JavaScript") return "JavaScript";
  return tech;
})))];

export default function Projects() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects = activeTab === "All"
    ? projectsData
    : projectsData.filter(project =>
        project.technologies.some(tech =>
          activeTab === "HTML/CSS"
            ? tech === "HTML" || tech === "CSS"
            : tech.includes(activeTab)
        )
      );

  return (
    <section id="projects" className="py-20 bg-zinc-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-700">My Projects</h2>
          <p className="text-lg mt-2 text-gray-300">Browse by technology category</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeTab === category
                  ? "bg-green-700 text-white"
                  : "bg-zinc-800 text-gray-300 hover:bg-green-700 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.2 }
            }
          }}
          className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredProjects.map(project => (
            <motion.div
              key={project.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 }
              }}
              className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center gap-4 opacity-0 hover:opacity-100 transition duration-300">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-full text-sm"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-full text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-green-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-zinc-700 rounded-full text-gray-200"
                    >
                      {tech}
                    </span>
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
