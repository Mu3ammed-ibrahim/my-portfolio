import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import TechStack from "./Components/TechStack";
import FeaturedProjects from "./Components/FeaturedProjects";
import Experience from "./Components/Experience";
import Workflow from "./Components/Workflow";
import Services from "./Components/Services";
import Contact from "./Components/Contact";
import FloatingDockNav from "./Components/FloatingDockNav";
import "./App.css";

function App() {
  return (
    <>
      {/* Desktop navigation */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Mobile navigation — FloatingDock */}
      <div className="md:hidden">
        <FloatingDockNav />
      </div>

      <section id="hero">
        <Hero />
      </section>

      <TechStack />

      <section id="projects">
        <FeaturedProjects />
      </section>

      <Experience />

      <Workflow />

      <Services />

      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
