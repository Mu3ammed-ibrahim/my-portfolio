import React from "react";
import Button from "./Button";
import { motion } from "framer-motion";
import CV from "/public/My Resume (1).pdf"
import TypingText from "./TypingText";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center  justify-between min-h-screen py-10 px-4 md:px-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-6 md:gap-10 justify-center w-full md:w-1/2 text-center md:text-left mt-10 md:mt-0"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-green-700 font-bold">
          Hello, I&apos;m
        </h1>

        <div className="h-16 sm:h-20 md:h-24 overflow-hidden">
          <TypingText
            phrases={["Mohammed Ibrahim", "Frontend Developer", "Content Creator"]}
            typingSpeed={100}
            pauseTime={1500}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-10 justify-center md:justify-start mt-4">
          <Button><a href={CV} download="my=cv">Download CV</a></Button>
          <Button bgClass="bg-green-700 hover:bg-white" ><a href="#contact">Hire Me</a></Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0"
      >
        <img 
          src="/src/assets/my avatar.png" 
          alt="Mohammed Ibrahim" 
          className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto  object-contain" 
        />
      </motion.div>
    </section>
  );
};

export default Hero;