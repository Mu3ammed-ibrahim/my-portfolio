import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import RoleSwitcher from "./RoleSwitcher";
import myImg from '../assets/My-img.png';

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative flex items-center justify-center min-h-screen px-4 overflow-hidden">
      {/* <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-brand-bg" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(34,197,94,0.08)_0%,_transparent_70%)]" />
      </div> */}

      <div className="z-10 w-full max-w-6xl mx-auto flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between px-2">
        {/* Text column */}
        <div className="flex flex-col items-center text-center md:items-start md:text-left rtl:md:text-right md:w-[55%]">
          {/* Badge */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="inline-block text-sm font-medium text-brand-cta bg-brand-cta/10 border border-brand-cta/20 rounded-full px-4 py-1.5 mb-6"
          >
            {t("hero.badge")}
          </motion.span>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-brand-text leading-tight mb-6"
          >
            {t("hero.headline1")}{" "}
            <span className="text-brand-cta">{t("hero.headline2")}</span>
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
            className="type-subtitle md:text-lg max-w-2xl mb-10"
          >
            {t("hero.subtitle")}
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
              {t("hero.viewProjects")}
            </motion.a>
            <motion.a
              href="/Mohammed%20Almuatsim%20Ibrahim%20Gallab%20resume%20(4).pdf"
              download="Mohammed_Ibrahim_Resume"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-brand-cta/30 text-brand-cta hover:bg-brand-cta/10 font-medium rounded-lg transition-colors cursor-pointer"
            >
              {t("hero.downloadCV")}
            </motion.a>
          </motion.div>
        </div>

        {/* Image column */}
        <div className="relative flex justify-center items-end md:w-[45%] order-first md:order-last rtl:md:order-first">
          {/* Atmospheric green glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          />

          {/* Entrance */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 1.0, ease: "easeOut" }}
            className="relative"
          >
            {/* Float bob */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
            >
              <img
                src={myImg}
                alt="Mohammed Ibrahim — frontend developer, side profile with green headphones"
                className="w-56 sm:w-64 md:w-72 lg:w-full md:h-96 object-cover"
              />
            </motion.div>

            {/* Bottom gradient fade */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0A0A0A] to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
