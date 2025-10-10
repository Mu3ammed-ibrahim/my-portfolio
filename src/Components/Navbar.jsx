import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Update active section based on scroll position
      const sections = ["about", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`py-6 px-8 flex items-center sticky top-0 z-50 justify-between transition-all duration-300 ${
        scrolled 
          ? "bg-zinc-900/80 backdrop-blur-xl shadow-2xl border-b border-white/5" 
          : "bg-zinc-900/10 backdrop-blur-lg shadow-lg"
      }`}
    >
      {/* Logo with enhanced animation */}
      <motion.h2 
        className="text-green-500 text-xl sm:text-3xl md:text-4xl font-bold relative"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <span className="relative inline-block">
          {`</Mo>`}
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </motion.h2>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8 items-center">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className={`text-lg font-medium transition-all duration-300 relative group ${
              activeSection === link.href.substring(1)
                ? "text-green-400"
                : "text-gray-100 hover:text-green-400"
            }`}
          >
            {link.label}
            
            {/* Animated underline */}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300" />
            
            {/* Active indicator dot */}
            {activeSection === link.href.substring(1) && (
              <motion.span
                layoutId="activeSection"
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-green-400 rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors"
      >
        {isMobileMenuOpen ? (
          <X className="text-green-400" size={24} />
        ) : (
          <Menu className="text-gray-100" size={24} />
        )}
      </motion.button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-full left-0 right-0 md:hidden bg-zinc-900/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
        >
          <div className="flex flex-col space-y-1 p-4">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-lg font-medium px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === link.href.substring(1)
                    ? "text-green-400 bg-green-400/10"
                    : "text-gray-100 hover:text-green-400 hover:bg-white/5"
                }`}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;