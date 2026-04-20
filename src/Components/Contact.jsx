import { useState, useCallback, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  Mail,
  MapPin,
  Send,
  Linkedin,
  Github,
  Check,
  Clock,
  Instagram,
  MessageCircle,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import { fadeInUp, staggerContainer } from "../data/animations";

const ContactMe = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const successTimerRef = useRef(null);

  useEffect(() => {
    if (!submitSuccess) return;
    successTimerRef.current = setTimeout(() => setSubmitSuccess(false), 8000);
    return () => clearTimeout(successTimerRef.current);
  }, [submitSuccess]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        "service_wm9rjdm",
        "template_i6e6f1m",
        formData,
        "l09rp7DojnnBnAB1r"
      );
      console.log(result.text);
      setSubmitSuccess(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Failed to send message:", error);
      alert(t("contact.errorMessage"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="text-center mb-14"
        >
          <motion.h2
            variants={fadeInUp}
            className="type-title mb-4"
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p variants={fadeInUp} className="type-subtitle max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-1"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="bg-brand-surface rounded-xl p-6 border border-white/5">
                <h3 className="text-xl font-semibold text-brand-cta mb-6">
                  {t("contact.getInTouch")}
                </h3>

                <ul className="space-y-5">
                  <li className="flex items-start gap-4">
                    <div className="bg-brand-cta p-2.5 rounded-full shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-brand-text font-medium text-sm">
                        {t("contact.email")}
                      </h4>
                      <a
                        href="mailto:www.tota.11@gmail.com"
                        className="text-brand-muted text-sm hover:text-brand-cta transition-colors cursor-pointer"
                      >
                        www.tota.11@gmail.com
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="bg-brand-cta p-2.5 rounded-full shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-brand-text font-medium text-sm">
                        {t("contact.whatsapp")}
                      </h4>
                      <a
                        href="https://wa.me/966558636746"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-brand-muted text-sm hover:text-brand-cta transition-colors cursor-pointer"
                      >
                        {t("contact.chatWhatsapp")}
                      </a>
                    </div>
                  </li>

                  <li className="flex items-start gap-4">
                    <div className="bg-brand-cta p-2.5 rounded-full shrink-0">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-brand-text font-medium text-sm">
                        {t("contact.location")}
                      </h4>
                      <p className="text-brand-muted text-sm">
                        {t("contact.locationValue")}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <motion.div
                variants={fadeInUp}
                className="bg-brand-surface rounded-xl p-6 border border-white/5"
              >
                <h3 className="text-lg font-semibold text-brand-cta mb-4">
                  {t("contact.connectWith")}
                </h3>
                <div className="flex gap-3">
                  <motion.a
                    href="https://www.linkedin.com/in/mohammed-almutassim-gallab-39a11098"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="bg-brand-surface-alt text-brand-text hover:bg-brand-cta hover:text-white transition-colors duration-300 p-3 rounded-full cursor-pointer"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/Mu3ammed-ibrahim"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="bg-brand-surface-alt text-brand-text hover:bg-brand-cta hover:text-white transition-colors duration-300 p-3 rounded-full cursor-pointer"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/m0hammed_code"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="bg-brand-surface-alt text-brand-text hover:bg-brand-cta hover:text-white transition-colors duration-300 p-3 rounded-full cursor-pointer"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5" />
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
            className="lg:col-span-2"
          >
            <motion.div
              variants={fadeInUp}
              className="bg-brand-surface rounded-xl p-6 md:p-8 border border-white/5"
            >
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full py-10"
                >
                  <div className="bg-brand-cta rounded-full p-4 mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-cta mb-4 text-center">
                    {t("contact.successTitle")}
                  </h3>
                  <div className="text-brand-text text-center max-w-md mb-6">
                    <p className="mb-4">{t("contact.successMessage")}</p>
                    <div className="flex items-center justify-center gap-2 text-brand-muted">
                      <Clock className="w-4 h-4" />
                      <p className="text-sm">{t("contact.responseTime")}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 bg-brand-surface-alt hover:bg-brand-surface text-brand-text px-6 py-2 rounded-lg transition-colors duration-300 cursor-pointer"
                  >
                    {t("contact.sendAnother")}
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-brand-cta mb-6">
                    {t("contact.sendMessage")}
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-brand-text text-sm font-medium mb-2"
                        >
                          {t("contact.yourName")}
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-cta/50 focus:border-brand-cta/50 transition-all"
                          placeholder={t("contact.placeholderName")}
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-brand-text text-sm font-medium mb-2"
                        >
                          {t("contact.yourEmail")}
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-cta/50 focus:border-brand-cta/50 transition-all"
                          placeholder={t("contact.placeholderEmail")}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-brand-text text-sm font-medium mb-2"
                      >
                        {t("contact.subject")}
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-cta/50 focus:border-brand-cta/50 transition-all"
                        placeholder={t("contact.placeholderSubject")}
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-brand-text text-sm font-medium mb-2"
                      >
                        {t("contact.yourMessage")}
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full bg-brand-bg border border-white/10 rounded-lg px-4 py-3 text-brand-text text-sm focus:outline-none focus:ring-2 focus:ring-brand-cta/50 focus:border-brand-cta/50 transition-all resize-none"
                        placeholder={t("contact.placeholderMessage")}
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand-cta hover:bg-brand-cta-hover text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center gap-2 w-full sm:w-auto disabled:opacity-70 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center gap-2">
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>{t("contact.sending")}</span>
                        </div>
                      ) : (
                        <>
                          <span>{t("contact.send")}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactMe;
