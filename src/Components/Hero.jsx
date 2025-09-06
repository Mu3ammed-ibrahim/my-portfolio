import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import Logo from "../assets/Icons/my avatar.png";
import TypingText from "./TypingText";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse items-center justify-between min-h-screen px-4 py-10 overflow-hidden md:flex-row md:px-10">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="z-0 flex flex-col justify-center w-full gap-6 mt-10 text-center md:gap-10 md:w-1/2 md:text-left md:mt-0"
      >
        <h1 className="text-4xl font-bold text-green-700 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
          Hello, I&apos;m
        </h1>

        <div className="overflow-hidden h-19 sm:h-20 md:h-24">
          <TypingText
            phrases={["Mohammed Ibrahim", "Frontend Developer", "Web Designer"]}
            typingSpeed={100}
            pauseTime={1500}
          />
        </div>

        <div className="flex flex-col justify-center gap-4 mt-4 sm:flex-row sm:gap-6 md:gap-10 md:justify-start">
          <Button>
            <a
              href="/Mohammed Almuatsim Ibrahim Gallab RESUME.pdf"
              download="Mohammed Almuatsim Ibrahim Gallab RESUME"
              rel="noopener noreferrer"
            >
              Download CV
            </a>
          </Button>
          <Button bgClass="bg-green-700 hover:bg-white">
            <a href="#contact">Hire Me</a>
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        gi
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex justify-center w-full mb-8 md:w-1/2 md:mb-0"
      >
        <img
          src={Logo}
          alt="Mohammed Ibrahim"
          className="object-contain w-64 h-auto sm:w-72 md:w-80 lg:w-96"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
