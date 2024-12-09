import { motion } from "motion/react";

export function InflationTitle({ inflation_data }) {
  const lastObservation =
    inflation_data.observations[inflation_data.observations.length - 1];
  const inflationRate = Number(lastObservation.value).toFixed(1);
  return (
    <motion.div
      initial={{ y: 500 }}
      animate={{
        y: 0,
        transition: { duration: 1, delay: 0.2, ease: "easeInOut" },
      }}
    >
      <motion.h2 className="md:text-6xl text-3xl text-white font-bold ml-6 mt-6 ">
        Inflation last month: {inflationRate ? inflationRate : null}%
      </motion.h2>
    </motion.div>
  );
}
