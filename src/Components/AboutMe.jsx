import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Logo from "../assets/Icons/my avatar.png"
import { Github, Linkedin, LucideInstagram, Mail } from "lucide-react";

const AboutMe = () => {
  // State to track active tab
  const [activeTab, setActiveTab] = useState("about");

  // Create animation controls and in-view detection
  // Remove triggerOnce: true to allow animations to replay when scrolling
  const [ref, inView] = useInView({
    threshold: 0.3,
  });
  
  const controls = useAnimation();

  // Trigger animations whenever component comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const skillVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.4,
      },
    },
  };

  // Staggered animation for skills and experience items
  const listItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section id="about" className="py-20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-5xl mx-auto px-6"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-12 items-start"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="w-full md:w-1/3 flex flex-col items-center"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="relative w-64 h-64 rounded-full overflow-hidden mb-6 shadow-xl border-4 border-green-700"
            >
              <img
                src={Logo}
                alt="Mohammed Ibrahim"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div variants={itemVariants} className="flex gap-4 mt-4">
              <motion.a
                href="https://github.com/Mu3ammed-ibrahim"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#4ade80" }}
                className="text-white hover:text-green-600"
                aria-label="GitHub"
              >
                <Github size={22} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mohammed-almutassim-gallab-39a11098"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#4ade80" }}
                className="text-white hover:text-green-600"
                aria-label="LinkedIn"
              >
                <Linkedin size={22} />
              </motion.a>

              <motion.a
                href="https://www.instagram.com/m0hammed_code"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#4ade80" }}
                className="text-white hover:text-green-600"
                aria-label="Email"
              >
                <LucideInstagram size={22} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="w-full md:w-2/3">
            <motion.h2
              variants={itemVariants}
              className="text-3xl font-bold mb-5 text-green-600"
            >
              About Me
            </motion.h2>

            {/* Tab Navigation */}
            <div className="flex border-b border-zinc-700 mb-6">
              <motion.button
                onClick={() => setActiveTab("about")}
                whileHover={{ y: -2 }}
                className={`py-2 px-4 font-medium ${
                  activeTab === "about"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-white hover:text-green-400"
                }`}
              >
                About Me
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("experience")}
                whileHover={{ y: -2 }}
                className={`py-2 px-4 font-medium ${
                  activeTab === "experience"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-white hover:text-green-400"
                }`}
              >
                Experience
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("skills")}
                whileHover={{ y: -2 }}
                className={`py-2 px-4 font-medium ${
                  activeTab === "skills"
                    ? "text-green-500 border-b-2 border-green-500"
                    : "text-white hover:text-green-400"
                }`}
              >
                Skills
              </motion.button>
            </div>

            {/* About Tab Content */}
            {activeTab === "about" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-lg text-white mb-6"
                >
                  Hello! I'm{" "}
                  <span className="font-semibold">Mohammed Ibrahim</span>, a
                  final-year Mechatronics Engineering student with a growing
                  passion for front-end development. Since beginning my coding
                  journey in 2022, I've been bridging the gap between
                  engineering principles and web development, creating intuitive
                  and functional digital experiences.
                </motion.p>

                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg text-white mb-6"
                >
                  Through self-teaching and practical experience, I've evolved
                  from building basic applications to developing comprehensive
                  e-commerce platforms. I enjoy applying my engineering mindset
                  to solve web development challenges, particularly in creating
                  responsive, user-centered designs.
                </motion.p>
              </motion.div>
            )}

            {/* Experience Tab Content */}
            {activeTab === "experience" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-8"
              >
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8 bg-zinc-800 p-6 rounded-lg shadow-sm border border-zinc-700"
                >
                  <div className="mb-4 pb-4 border-b border-zinc-700">
                    <h4 className="font-medium text-white">
                      Front-end Development Intern
                    </h4>
                    <p className="text-sm text-gray-400">
                      KreativeStorm Company | 2024
                    </p>
                    <ul className="mt-2 text-gray-300 pl-5 list-disc">
                      {["Collaborated with a development team to build an interactive shopping store",
                        "Developed interactive web games including a jumping man game",
                        "Created responsive calculator application using HTML, CSS and JavaScript"
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          custom={i}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-white">
                      Self-Driven Projects
                    </h4>
                    <p className="text-sm text-gray-400">2022 - Present</p>
                    <ul className="mt-2 text-gray-300 pl-5 list-disc">
                      {["Built a comprehensive e-commerce application",
                        "Developed a advance weather app using React",
                        "Created an interactive travel application with React",
                        "Designed and implemented a weather app and calculator using vanilla JavaScript"
                      ].map((item, i) => (
                        <motion.li
                          key={i}
                          custom={i}
                          variants={listItemVariants}
                          initial="hidden"
                          animate="visible"
                        >
                          {item}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Skills Tab Content */}
            {activeTab === "skills" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-xl font-semibold mb-4 text-green-700"
                >
                  Technical Skills
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {[
                    "React Js",
                    "Next Js",
                    "Redux",
                    "Redux toolkit",
                    "Semantic Html",
                    "Css",
                    "Javascript",
                    "Bootstrap",
                    "Git&GItub",
                    "Tailwind CSS",
                    "Framer motion",
                    "netlify",
                  ].map((skill, index) => (
                    <motion.div
                      key={skill}
                      custom={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: i => ({
                          opacity: 1,
                          y: 0,
                          transition: { delay: i * 0.1, duration: 0.4 }
                        })
                      }}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                      className="py-2 px-4 bg-green-700 rounded-lg shadow-sm text-center text-white"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>

                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                  className="text-xl font-semibold mt-8 mb-4 text-green-700"
                >
                  Currently Learning
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                  {["TypeScript"].map((skill, index) => (
                    <motion.div
                      key={skill}
                      variants={skillVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ scale: 1.05, backgroundColor: "#16a34a" }}
                      className="py-2 px-4 bg-green-700 rounded-lg shadow-sm text-center text-white"
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;