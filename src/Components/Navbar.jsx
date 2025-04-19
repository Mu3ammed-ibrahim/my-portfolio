import React from "react";
import { motion } from "framer-motion";
const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
      className="py-6 px-8 flex items-center sticky top-0 z-10 justify-between"
    >
      <h2 className="text-green-700 text-3xl font-bold">{`</Mo>`}</h2>
      <div className="flex space-x-8">
        <a
          href="#about"
          className="text-gray-100 text-lg hover:text-green-400 transition-colors"
        >
          About
        </a>
        <a
          href="#projects"
          className="text-gray-100 text-lg hover:text-green-400 transition-colors"
        >
          Projects
        </a>
        <a
          href="#contact"
          className="text-gray-100 text-lg hover:text-green-400 transition-colors"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
