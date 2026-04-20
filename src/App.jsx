import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import AboutMe from "./Components/AboutMe";
import TechStack from "./Components/TechStack";
import FeaturedProjects from "./Components/FeaturedProjects";
import Experience from "./Components/Experience";
import Workflow from "./Components/Workflow";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import FloatingDockNav from "./Components/FloatingDockNav";
import LanguageSwitcher from "./Components/LanguageSwitcher";
import "./App.css";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const isAr = i18n.language === "ar";
    document.documentElement.dir = isAr ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile navigation — FloatingDock + language toggle */}
      <div className="md:hidden">
        <FloatingDockNav />
        <div className="fixed top-4 left-4 rtl:left-auto rtl:right-4 z-50">
          <LanguageSwitcher />
        </div>
      </div>

      <section id="hero">
        <Hero />
      </section>

      <AboutMe />

      <TechStack />

      <section id="projects">
        <FeaturedProjects />
      </section>

      <Experience />

      <Services />

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
