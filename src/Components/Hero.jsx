import { motion } from "framer-motion";
import RoleSwitcher from "./RoleSwitcher";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* Background Image — replace the src with your own image */}
      {/* Drop your image in src/assets/ and import it, or use a URL */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-brand-bg" />
        {/* Uncomment and update when you have your bg image:
        <img
          src={yourBgImage}
          alt=""
          className="w-full h-full object-cover opacity-30"
        />
        */}
        {/* Subtle radial glow as a fallback */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.08)_0%,_transparent_70%)]" />
      </div>

      {/* Content */}
      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
        {/* Badge */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-block text-sm font-medium text-brand-cta bg-brand-cta/10 border border-brand-cta/20 rounded-full px-4 py-1.5 mb-6"
        >
          Frontend Developer
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-text leading-tight mb-6"
        >
          Building scalable{" "}
          <span className="text-brand-cta">web platforms</span>
        </motion.h1>

        {/* Role Switcher */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="mb-6"
        >
          <RoleSwitcher />
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="text-lg md:text-xl text-brand-muted max-w-2xl mb-10"
        >
          Specializing in React, Next.js &amp; modern web architecture.
          Turning complex business problems into elegant digital solutions.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex items-center justify-center px-8 py-3.5 bg-brand-cta hover:bg-brand-cta-hover text-white font-medium rounded-lg transition-colors cursor-pointer"
          >
            View Projects
          </motion.a>
          <motion.a
            href="/Mohammed Almuatsim Ibrahim V1-Resume.pdf.pdf"
            download="Mohammed_Ibrahim_Resume"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-brand-cta/30 text-brand-cta hover:bg-brand-cta/10 font-medium rounded-lg transition-colors cursor-pointer"
          >
            Download CV
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
