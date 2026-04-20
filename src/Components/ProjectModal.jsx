import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Github, ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProjectModal({ project, onClose }) {
  const { t } = useTranslation();
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const hasMultipleImages = project.images.length > 1;

  const prevImage = () =>
    setCurrentImage((i) => (i === 0 ? project.images.length - 1 : i - 1));

  const nextImage = () =>
    setCurrentImage((i) => (i === project.images.length - 1 ? 0 : i + 1));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="relative bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
          aria-label={t("modal.closeModal")}
        >
          <X size={18} />
        </button>

        <div className="flex flex-col md:flex-row rtl:md:flex-row-reverse gap-0">
          <div className="md:w-1/2 relative bg-zinc-950 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none rtl:md:rounded-l-none rtl:md:rounded-r-2xl overflow-hidden">
            <div className="relative aspect-video md:aspect-auto md:h-full min-h-[240px]">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentImage}
                  src={project.images[currentImage]}
                  alt={`${project.title} screenshot ${currentImage + 1}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              {hasMultipleImages && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 rtl:left-auto rtl:right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    aria-label={t("modal.prevImage")}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 rtl:right-auto rtl:left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
                    aria-label={t("modal.nextImage")}
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {hasMultipleImages && (
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImage(i)}
                    className={`rounded-full transition-all duration-200 ${
                      i === currentImage
                        ? "w-4 h-1.5 bg-green-500"
                        : "w-1.5 h-1.5 bg-white/40"
                    }`}
                    aria-label={t("modal.imageLabel", { num: i + 1 })}
                    aria-current={i === currentImage ? "true" : undefined}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="md:w-1/2 p-6 md:p-8 flex flex-col gap-5">
            <div>
              <p className="text-xs font-medium text-green-500 uppercase tracking-widest mb-1">
                {project.tagline}
              </p>
              <h2 id="modal-title" className="text-2xl font-bold text-white">
                {project.title}
              </h2>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                  {t("modal.problem")}
                </h3>
                <p className="text-zinc-300 leading-relaxed">{project.problem}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                  {t("modal.solution")}
                </h3>
                <p className="text-zinc-300 leading-relaxed">{project.solution}</p>
              </div>
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-1">
                  {t("modal.result")}
                </h3>
                <p className="text-zinc-300 leading-relaxed">{project.result}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 text-xs rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-3 mt-auto pt-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-zinc-700 text-sm text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors"
              >
                <Github size={15} />
                {t("modal.github")}
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-600 hover:bg-green-500 text-sm text-white font-medium transition-colors"
              >
                <ExternalLink size={15} />
                {t("modal.liveSite")}
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
