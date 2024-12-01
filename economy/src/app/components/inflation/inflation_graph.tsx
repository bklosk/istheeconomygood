// import { LinePath } from "@visx/shape";
import { motion } from "motion/react";

export function InflationGraph({ scrollY }) {
  return (
    <motion.div
      className="sticky opacity-35 md:top-36 top-12 w-5/6 h-[200px] ml-9 bg-[#EAC435] md:mt-[120px] mt-18"
      initial={{ scale: 0 }}
      animate={{
        scale: 1,
        transition: { duration: 1.2, delay: 3, ease: "easeInOut" },
      }}
    >
      <motion.h1>{scrollY}</motion.h1>
    </motion.div>
  );
}
