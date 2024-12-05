"use client";

import { AnimatePresence, motion } from "motion/react";
import { InflationTitle } from "./components/inflation/inflation_title";
import InflationGraph from "./components/inflation/inflation_graph";
import { useScroll } from "motion/react";
import { useTransform } from "motion/react";

export default function Page() {
  const { scrollYProgress } = useScroll();
  const background_color = useTransform(
    scrollYProgress,
    [0, 0.4, 0.5, 1],
    ["#f00000", "#f00000", "#1e293b", "#0f0111"]
  );

  return (
    <AnimatePresence>
      <motion.main
        className="absolute w-screen h-[8000px]"
        style={{ backgroundColor: background_color }}
      >
        <div className="relative h-[3000px]">
          <div className="sticky top-0 bg-blue-100">
            <InflationTitle />
            <InflationGraph scrollYProgress={scrollYProgress} />
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  );
}
