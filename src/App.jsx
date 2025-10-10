import Navbar from './Components/Navbar'
import Hero from './Components/Hero'
import Technologies from './Components/Technologies'
import AboutMe from './Components/AboutMe'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
import './App.css'

function App() {

  return (
    <div className="  bg-zinc-900" >
      <Navbar/>
      <Hero/>
      <Technologies/>
      <AboutMe/>
      <Projects/>
      <Contact/>
      
    </div>
  )
}

export default App
