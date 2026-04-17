import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useInView } from "react-intersection-observer";
import { cn } from "@/lib/utils";

const linearGradients = [
  "#1E293B",
  "#1E293B",
  "#1E293B",
];

const ContentItem = ({ item, index, activeCard, onInView }) => {
  const { ref, inView } = useInView({
    rootMargin: "-33% 0px -33% 0px",
  });

  useEffect(() => {
    if (inView) onInView(index);
  }, [inView, index, onInView]);

  return (
    <div ref={ref} className="my-28">
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
        className="text-2xl font-bold text-brand-text"
      >
        {item.title}
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: activeCard === index ? 1 : 0.3 }}
        className="text-sm mt-10 max-w-sm text-brand-muted"
      >
        {item.description}
      </motion.p>
    </div>
  );
};

export const StickyScroll = ({
  content,
  contentClassName
}) => {
  const [activeCard, setActiveCard] = useState(0);

  const backgroundColors = [
    "#0F172A",
    "#0F172A",
    "#0F172A",
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(linearGradients[0]);

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="relative flex justify-center space-x-10 rounded-md p-10"
    >
      <div className="div relative flex items-start px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <ContentItem
              key={item.title + index}
              item={item}
              index={index}
              activeCard={activeCard}
              onInView={setActiveCard}
            />
          ))}
          <div className="h-[500px]" />
        </div>
      </div>
      <div
        style={{ background: backgroundGradient }}
        className={cn(
          "sticky top-10 hidden h-[500px] w-[45%] overflow-hidden rounded-md bg-white lg:block",
          contentClassName
        )}>
        {content[activeCard].content ?? null}
      </div>
    </motion.div>
  );
};
