import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Your existing technology icons array
const technologies = [
  { name: 'React', icon: '/src/assets/Icons/react.png' },
  { name: 'JavaScript', icon: "/src/assets/Icons/js.png" },
  { name: 'Tailwind Css', icon: '/src/assets/Icons/tailwind-css-seeklogo.png' },
  { name: 'HTML', icon: '/src/assets/Icons/html.png' },
  { name: 'CSS', icon: '/src/assets/Icons/css.png' },
  { name: 'Git', icon: '/src/assets/Icons/github.png' },
  { name: 'Bootstrap', icon: '/src/assets/Icons/bootstrap.png' }
];

// Duplicate the technologies array to create a seamless loop effect
const duplicatedTechnologies = [...technologies, ...technologies];

export default function Technologies() {
  const [width, setWidth] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Calculate container width on component mount and set up Intersection Observer
  useEffect(() => {
    // Calculate the width needed for the animation
    setWidth(duplicatedTechnologies.length * 110); // Each tech item takes ~110px
    
    // Set up the Intersection Observer to detect when slider enters viewport
    const observer = new IntersectionObserver(
      (entries) => {
        // When the slider enters the viewport, set isVisible to true
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          // Once visible, we can disconnect the observer
          observer.disconnect();
        }
      },
      // Configure the observer with threshold and rootMargin options
      // This starts loading when the element is 200px from entering the viewport
      { threshold: 0.1, rootMargin: '200px' }
    );
    
    // Get the container element to observe
    const container = document.getElementById('tech-slider-container');
    if (container) {
      observer.observe(container);
    }
    
    // Clean up observer on component unmount
    return () => {
      if (container) {
        observer.unobserve(container);
      }
      observer.disconnect();
    };
  }, []);
  
  return (
    <div 
      id="tech-slider-container"
      className="py-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-green-600">
          My Technology Stack
        </h2>
        
        <div className="relative overflow-hidden w-full">
          {isVisible ? (
            <motion.div
              className="flex"
              animate={{
                x: [-width / 2, 0],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                },
              }}
              style={{ width: `${width}px` }}
            >
              {duplicatedTechnologies.map((tech, index) => (
                <div key={index} className="flex flex-col items-center mx-4 w-20">
                  <div className="flex items-center justify-center w-16 h-16 bg-zinc-900 rounded-full shadow-md mb-2">
                    {/* Added loading="lazy" attribute and image optimization attributes */}
                    <img 
                      src={tech.icon} 
                      alt={`${tech.name} icon`}
                      loading="lazy"
                      className="max-w-full max-h-full object-contain p-2"
                    />
                  </div>
                  <span className="text-sm font-medium text-white">{tech.name}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <div className="flex justify-center items-center h-24">
              {/* A simple loading placeholder that shows before the slider is visible */}
              <div className="text-green-600 font-medium">Loading technologies...</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}