import { useRef, useLayoutEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

export function InfiniteMarquee({ items, duration = 10, renderItem }) {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const controls = useAnimation();

  useLayoutEffect(() => {
    if (trackRef.current) {
      setOffset(trackRef.current.offsetWidth / 2);
    }
  }, []);

  useLayoutEffect(() => {
    if (!offset) return;  
    controls.start({
      x: [0, -offset],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, [offset, duration, controls]);

  const duplicated = [...items, ...items];

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex w-max"
        animate={controls}
        onHoverStart={() => controls.stop()}
        onHoverEnd={() =>
          controls.start({
            x: [null, -offset],
            transition: {
              duration,
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
            },
          })
        }
      >
        {duplicated.map((item, index) => (
          <div key={index} className="mr-4 shrink-0">
            {renderItem(item, index)}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
