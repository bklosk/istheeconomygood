import { motion } from "motion/react";

export function InflationTitle() {
  return (
    <motion.div
      className="sticky md:top-4 top-2 md:ml-20 ml-4"
      initial={{ y: 500 }}
      animate={{
        y: 0,
        transition: { duration: 1.2, delay: 1, ease: "easeInOut" },
      }}
    >
      <motion.h2
        className="overflow-hidden md:text-6xl text-3xl text-white font-extrabold"
        initial={{ width: 0 }}
        animate={{
          width: "100%",
          transition: {
            duration: 0.9,
            delay: 0.3,
            ease: "easeInOut",
          },
        }}
      >
        Inflation
      </motion.h2>
    </motion.div>
  );
}
