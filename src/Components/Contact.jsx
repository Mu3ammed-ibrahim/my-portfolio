import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Linkedin, Github, Check, Clock, InstagramIcon, Instagram } from "lucide-react";
import emailjs from "@emailjs/browser";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitSuccess(false), 8000);
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Something went wrong. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="contact" className="py-20 ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="flex flex-col items-center mb-12"
        >
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-green-600 mb-3"
          >
            Contact Me
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-24 h-1 bg-green-600 mb-6"
          ></motion.div>
          <motion.p
            variants={itemVariants}
            className="text-white text-center max-w-2xl mb-10"
          >
            Feel free to reach out if you're looking for a developer, have a
            question, or just want to connect.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            className="lg:col-span-1"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="bg-zinc-800 rounded-lg p-6 shadow-md">
                <h3 className="text-2xl font-semibold text-green-600 mb-6">
                  Let's Talk
                </h3>

                <ul className="space-y-6">
                  <motion.li
                    variants={itemVariants}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-green-600 p-3 rounded-full">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Email</h4>
                      <p className="text-gray-400">www.tota.11@gmail.com</p>
                    </div>
                  </motion.li>

                  <motion.li
                    variants={itemVariants}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-green-600 p-3 rounded-full">
                      <Phone className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Phone</h4>
                      <p className="text-gray-400">+966 (55) 8636-746</p>
                    </div>
                  </motion.li>

                  <motion.li
                    variants={itemVariants}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-green-600 p-3 rounded-full">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">Location</h4>
                      <p className="text-gray-400">makkah, saudi arabia</p>
                    </div>
                  </motion.li>
                </ul>
              </div>

              <motion.div
                variants={itemVariants}
                className="bg-zinc-800 rounded-lg p-6 shadow-md"
              >
                <h3 className="text-xl font-semibold text-green-600 mb-4">
                  Connect With Me
                </h3>
                <div className="flex space-x-4">
                  <motion.a
                    href="https://www.linkedin.com/in/mohammed-almutassim-gallab-39a11098"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="bg-zinc-700 text-white hover:bg-green-600 transition-colors duration-300 p-3 rounded-full"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://github.com/Mu3ammed-ibrahim"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="bg-zinc-700 text-white hover:bg-green-600 transition-colors duration-300 p-3 rounded-full"
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href="https://www.instagram.com/m0hammed_code"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="bg-zinc-700 text-white hover:bg-green-600 transition-colors duration-300 p-3 rounded-full"
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
            variants={containerVariants}
            className="lg:col-span-2"
          >
            <motion.div
              variants={itemVariants}
              className="bg-zinc-800 rounded-lg p-6 md:p-8 shadow-md"
            >
              {submitSuccess ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center h-full py-10"
                >
                  <div className="bg-green-600 rounded-full p-4 mb-6">
                    <Check className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-600 mb-4 text-center">
                    Message Sent Successfully!
                  </h3>
                  <div className="text-white text-center max-w-md mb-6">
                    <p className="mb-4">
                      Thank you for reaching out, {formData.name ? formData.name.split(' ')[0] : 'there'}! I've received your message and will get back to you as soon as possible.
                    </p>
                    <div className="flex items-center justify-center space-x-2 text-gray-300">
                      <Clock className="w-4 h-4" />
                      <p className="text-sm">Expected response time: 24-48 hours</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSubmitSuccess(false)}
                    className="mt-4 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-lg transition-colors duration-300"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-semibold text-green-600 mb-6">
                    Send Me a Message
                  </h3>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="name"
                          className="block text-white font-medium mb-2"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                          placeholder="John Doe"
                        />
                      </motion.div>

                      <motion.div variants={itemVariants}>
                        <label
                          htmlFor="email"
                          className="block text-white font-medium mb-2"
                        >
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                          placeholder="john@example.com"
                        />
                      </motion.div>
                    </div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="subject"
                        className="block text-white font-medium mb-2"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-600"
                        placeholder="Project Inquiry"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label
                        htmlFor="message"
                        className="block text-white font-medium mb-2"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="5"
                        className="w-full bg-zinc-700 border border-zinc-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-600 resize-none"
                        placeholder="Hello, I'd like to talk about..."
                      ></textarea>
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 flex items-center space-x-2 w-full sm:w-auto disabled:opacity-70"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            <span>Sending...</span>
                          </div>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </motion.div>
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