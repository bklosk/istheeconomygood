import { motion } from "motion/react";

export function InflationTitle() {
  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{
        y: 0,
        transition: { duration: 1.2, delay: 0.5, ease: "easeInOut" },
      }}
    >
      <motion.h2
        className="md:text-6xl text-3xl text-white font-bold ml-6 mt-6 "
        initial={{ width: 0.5 }}
        animate={{
          width: "100%",
          transition: {
            duration: 2,
            ease: "easeInOut",
          },
        }}
      >
        Inflation
      </motion.h2>
    </motion.div>
  );
}
