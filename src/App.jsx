import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import FeaturedProjects from "./Components/FeaturedProjects";
import Skills from "./Components/Skills";
import Achievements from "./Components/Achievements";
import Workflow from "./Components/Workflow";
import Contact from "./Components/Contact";
import "./App.css";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedProjects />
      <Skills />
      <Achievements />
      <Workflow />
      <Contact />
    </>
  );
}

export default App;
