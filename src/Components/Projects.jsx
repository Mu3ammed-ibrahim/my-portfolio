import { useState } from 'react';
import { motion } from 'framer-motion';

// Sample project data - replace with your actual projects
const projectsData = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "I developed a dynamic, fully responsive e-commerce web application that showcases advanced front-end development techniques and user-centric design principles. The project demonstrates my ability to create sophisticated, interactive web experiences using contemporary React ecosystem tools.",
    technologies: ["React", " React Router", "Framer Motion", "Tailwind CSS","netlify"],
    image: "/src/assets/Projects/E commerce app.png",
    link: "https://ecommerce-app-eshop.netlify.app",
    github: "https://github.com/Mu3ammed-ibrahim/e-commerce-app" // Add your GitHub repo URL here
  },
  {
    id: 2,
    title: "Jumping dinasour game",
    description: "This is a simple game that uses keyframe animations to animate objects towards the game character who has the capability to jump them.",
    technologies: ["Semantic Html", " Javascript", "Css"],
    image: "/src/assets/Projects/Jumping dianasour.png",
    link: "https://mu3ammed-ibrahim.github.io/Jumping-man",
    github: "https://github.com/Mu3ammed-ibrahim/Jumping-man" // Add your GitHub repo URL here
  },
  {
    id: 3,
    title: "Simple Online Store",
    description: "This webpage provides a multipage website with simple navigation between the four pages. It contains some ai art. It presents part of a store front for a ficticious company called Mega-Store.",
    technologies: ["Semantic Html", " Css", "Javascript", "Canva"],
    image: "/src/assets/Projects/Mega store.png",
    link: "https://kevinstaresdarbon.github.io/css-project/index.html",
    github: "https://github.com/Mu3ammed-ibrahim/css-project" // Add your GitHub repo URL here
  },
  {
    id: 4,
    title: "Portfolio Website",
    description: "Personal portfolio showcasing projects, skills, and professional experience with a modern design.",
    technologies: ["React", "Framer Motion", "Tailwind CSS", "Netlify"],
    image: "/src/assets/Projects/portfolio app.png",
    link: "#",
    github: "https://github.com/yourusername/portfolio" // Add your GitHub repo URL here
  }
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const projectVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    y: -10,
    transition: {
      duration: 0.3
    }
  }
};

const tagVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: {
      duration: 0.3
    }
  }
};

export default function Projects() {
  const [filter, setFilter] = useState("all");
  const technologies = ["all", ...new Set(projectsData.flatMap(project => project.technologies))];
  
  const filteredProjects = filter === "all" 
    ? projectsData 
    : projectsData.filter(project => project.technologies.includes(filter));

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-green-600 ">My Projects</h2>
          
          <p className="text-lg text-white max-w-2xl mx-auto">
            Explore my latest work and the technologies I've been using to solve real-world problems.
          </p>
        </motion.div>

        {/* Filter buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {technologies.map((tech) => (
            <motion.button
              key={tech}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                filter === tech
                  ? "bg-green-700 text-white"
                  : "bg-green-200 text-gray-800 "
              }`}
              onClick={() => setFilter(tech)}
            >
              {tech.charAt(0).toUpperCase() + tech.slice(1)}
            </motion.button>
          ))}
        </div>

        {/* Projects grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={projectVariants}
              whileHover="hover"
              className="bg-zinc-800 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative overflow-hidden h-48">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 gap-4">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-zinc-800 text-white rounded-full font-medium hover:bg-green-700 transition-colors duration-300 text-sm"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-zinc-800 text-white rounded-full font-medium hover:bg-green-700 transition-colors duration-300 text-sm"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-green-600">{project.title}</h3>
                <p className="text-white mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      variants={tagVariants}
                      className="px-3 py-1 bg-emerald-700 text-white text-xs font-medium rounded-full"
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