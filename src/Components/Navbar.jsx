import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ["projects", "services", "achievements", "contact"];
      const current = sections.find((section) => {
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
    { href: "#projects", label: "Projects" },
    { href: "#services", label: "Services" },
    { href: "#achievements", label: "Achievements" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`py-5 px-6 md:px-8 flex items-center sticky top-0 z-50 justify-between transition-all duration-300 ${
        scrolled
          ? "bg-brand-bg/80 backdrop-blur-xl shadow-2xl border-b border-white/5"
          : "bg-brand-bg/10 backdrop-blur-lg"
      }`}
    >
      {/* Logo */}
      <motion.a
        href="#"
        className="text-brand-cta text-xl sm:text-2xl md:text-3xl font-bold relative cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <span className="relative inline-block">
          {`</Mo>`}
          <motion.span
            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-brand-cta to-emerald-500"
            initial={{ width: 0 }}
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </span>
      </motion.a>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link, index) => (
          <motion.a
            key={link.href}
            href={link.href}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className={`text-sm font-medium transition-all duration-300 relative group cursor-pointer ${
              activeSection === link.href.substring(1)
                ? "text-brand-cta"
                : "text-brand-text hover:text-brand-cta"
            }`}
          >
            {link.label}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-brand-cta to-emerald-500 group-hover:w-full transition-all duration-300" />
            {activeSection === link.href.substring(1) && (
              <motion.span
                layoutId="activeSection"
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-brand-cta rounded-full"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.a>
        ))}

        {/* Resume Button */}
        <motion.a
          href="/Mohammed Almuatsim Ibrahim V1-Resume.pdf.pdf"
          download="Mohammed_Ibrahim_Resume"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 text-sm font-medium px-4 py-2 border border-brand-cta/30 text-brand-cta hover:bg-brand-cta/10 rounded-lg transition-colors cursor-pointer"
        >
          <Download size={14} />
          Resume
        </motion.a>
      </div>

      {/* Mobile Menu Button */}
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? (
          <X className="text-brand-cta" size={24} />
        ) : (
          <Menu className="text-brand-text" size={24} />
        )}
      </motion.button>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 md:hidden bg-brand-bg/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
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
                  className={`text-lg font-medium px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    activeSection === link.href.substring(1)
                      ? "text-brand-cta bg-brand-cta/10"
                      : "text-brand-text hover:text-brand-cta hover:bg-white/5"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/Mohammed Almuatsim Ibrahim V1-Resume.pdf.pdf"
                download="Mohammed_Ibrahim_Resume"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-2 text-lg font-medium px-4 py-3 rounded-lg text-brand-cta hover:bg-brand-cta/10 transition-all duration-300 cursor-pointer"
              >
                <Download size={18} />
                Download Resume
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
