"use client";;
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

export const Timeline = ({ data, heading, subheading }) => {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full overflow-x-clip bg-brand-bg font-sans md:px-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="type-title mb-4 max-w-4xl">
          {heading || "My Journey"}
        </h2>
        <p className="type-subtitle max-w-sm">
          {subheading || "From self-teaching to production — a timeline of growth."}
        </p>
      </div>
      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 rtl:left-auto rtl:right-3 rtl:md:right-3 w-10 rounded-full bg-brand-bg flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-brand-surface border border-white/10 p-2" />
              </div>
              <h3 className="hidden md:block text-brand-cta text-xl md:pl-20 rtl:md:pl-0 rtl:md:pr-20 md:text-5xl font-bold">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 rtl:pl-4 rtl:pr-20 rtl:md:pr-4 w-full min-w-0">
              <h3 className="md:hidden block text-2xl mb-4 text-left rtl:text-right font-bold text-brand-cta">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{ height: height + "px" }}
          className="absolute md:left-8 left-8 rtl:left-auto rtl:right-8 rtl:md:right-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-white/10 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{ height: heightTransform, opacity: opacityTransform }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-brand-cta via-brand-cta to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
