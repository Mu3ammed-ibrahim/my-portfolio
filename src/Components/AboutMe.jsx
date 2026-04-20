import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslation } from "react-i18next";
import myImg2 from '../assets/My-img2.png';
import { Github, Linkedin, LucideInstagram } from "lucide-react";

const AboutMe = () => {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ threshold: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="about" className="py-20">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="max-w-5xl px-6 mx-auto"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-start gap-12 md:flex-row rtl:md:flex-row-reverse"
        >
          {/* Profile Image */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center w-full md:w-1/3"
          >
            <div className="relative mb-6">
              {/* Glow */}
              {/* <div
                className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_40%,rgba(34,197,94,0.12)_0%,transparent_70%)] blur-lg scale-110 -z-10 pointer-events-none"
                aria-hidden="true"
              /> */}
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className="relative overflow-hidden rounded-2xl border border-brand-cta/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]"
              >
                <img
                  src={myImg2}
                  alt="Mohammed Ibrahim — digital illustration, three-quarter view with green headphones"
                  className="w-52 md:w-full h-auto object-cover "
                  style={{ aspectRatio: "3/4" }}
                />
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="flex gap-4 mt-4">
              <motion.a
                href="https://github.com/Mu3ammed-ibrahim"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#22C55E" }}
                className="text-brand-text hover:text-brand-cta"
                aria-label={t("about.ariaGithub")}
              >
                <Github size={22} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/mohammed-almutassim-gallab-39a11098"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#22C55E" }}
                className="text-brand-text hover:text-brand-cta"
                aria-label={t("about.ariaLinkedin")}
              >
                <Linkedin size={22} />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/m0hammed_code"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "#22C55E" }}
                className="text-brand-text hover:text-brand-cta"
                aria-label={t("about.ariaInstagram")}
              >
                <LucideInstagram size={22} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Content */}
          <motion.div variants={itemVariants} className="w-full md:w-2/3">
            <motion.h2
              variants={itemVariants}
              className="mb-5 type-title"
            >
              {t("about.title")}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-6 type-body max-w-prose"
            >
              {t("about.para1")}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6 type-body max-w-prose"
            >
              {t("about.para2")}
            </motion.p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default AboutMe;
