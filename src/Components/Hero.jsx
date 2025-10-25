import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import Logo from "../assets/Icons/my avatar.png";
import TypingText from "./TypingText";
import JarvisHUD from "./JarvisHUD"; // Import the JARVIS component

const Hero = () => {
  return (
    <section className="relative flex flex-col-reverse items-center justify-between min-h-screen px-4 py-10 overflow-hidden md:flex-row md:px-10">
      {/* JARVIS HUD Background */}
      <div className="absolute inset-0 -z-10">
        <JarvisHUD />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col justify-center w-full gap-6 mt-10 text-center md:gap-10 md:w-1/2 md:text-left md:mt-0"
      >
        <motion.h1
          className="text-4xl font-bold text-green-500 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Hello, I&apos;m
        </motion.h1>

        <motion.div
          className="overflow-hidden h-19 sm:h-20 md:h-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <TypingText
            phrases={["Mohammed Ibrahim", "Frontend Developer", "Web Designer"]}
            typingSpeed={100}
            pauseTime={1500}
          />
        </motion.div>

        <motion.div
          className="flex flex-col justify-center gap-4 mt-4 sm:flex-row sm:gap-6 md:gap-10 md:justify-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button>
              <a
                href="/Mohammed Almuatsim Ibrahim V1-Resume.pdf.pdf"
                download="Mohammed Almuatsim Ibrahim Gallab RESUME"
                rel="noopener noreferrer"
              >
                Download CV
              </a>
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Button bgClass="bg-green-700 hover:bg-white">
              <a href="#contact">Hire Me</a>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex justify-center w-full mb-8 md:w-1/2 md:mb-0"
      >
        <motion.img
          src={Logo}
          alt="Mohammed Ibrahim"
          className="relative object-contain w-64 h-auto sm:w-72 md:w-80 lg:w-96"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
