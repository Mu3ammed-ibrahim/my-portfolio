import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import Logo from "../assets/Icons/my avatar.png";
import TypingText from "./TypingText";

const Hero = () => {
  return (
    <section className="relative flex flex-col-reverse items-center justify-between min-h-screen px-4 py-10 overflow-hidden md:flex-row md:px-10">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 -z-10">
        {/* Moving gradient that follows mouse */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 25%, rgba(4, 120, 87, 0.05) 50%, transparent 70%)",
              "radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 25%, rgba(4, 120, 87, 0.05) 50%, transparent 70%)",
              "radial-gradient(circle at 50% 80%, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 25%, rgba(4, 120, 87, 0.05) 50%, transparent 70%)",
              "radial-gradient(circle at 50% 20%, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 25%, rgba(4, 120, 87, 0.05) 50%, transparent 70%)",
              "radial-gradient(circle at 20% 50%, rgba(16, 185, 129, 0.15) 0%, rgba(5, 150, 105, 0.1) 25%, rgba(4, 120, 87, 0.05) 50%, transparent 70%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Static gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-teal-500/5" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-10 flex flex-col justify-center w-full gap-6 mt-10 text-center md:gap-10 md:w-1/2 md:text-left md:mt-0"
      >
        <motion.h1
          className="text-4xl font-bold text-green-700 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
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
                href="/Mohammed Almuatsim Ibrahim Gallab RESUME.pdf"
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
        {/* Glow effect behind image */}
        <motion.div
          className="absolute inset-0 bg-green-500/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.img
          src={Logo}
          alt="Mohammed Ibrahim"
          className="relative object-contain w-64 h-auto sm:w-72 md:w-80 lg:w-96"
          whileHover={{
            scale: 1.05,
            rotate: [0, 2, -2, 0],
            transition: { duration: 0.5 },
          }}
          animate={{
            y: [0, -10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;