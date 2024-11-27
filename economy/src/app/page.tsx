"use client";

import { AnimatePresence, motion } from "motion/react";

export default function Page() {
  interface Color {
    value: string;
  }
  const background_color: Color = { value: "#ff3864" };

  return (
    <AnimatePresence>
      <main
        className="w-screen h-[8000px] overflow-y-auto bg-[var(--background-color)]"
        style={
          {
            "--background-color": background_color.value,
          } as React.CSSProperties
        }
      >
        <motion.div
          className="fixed md:ml-20 ml-2"
          initial={{ y: 500 }}
          animate={{
            y: 50,
            transition: { duration: 3, delay: 3, ease: "easeInOut" },
          }}
        >
          <motion.h2
            className="overflow-hidden md:text-6xl text-3xl text-white font-extrabold"
            initial={{ width: 0 }}
            animate={{
              width: "100%",
              transition: { duration: 2.5, delay: 0.3, ease: "easeInOut" },
            }}
          >
            Inflation
          </motion.h2>
        </motion.div>
      </main>
    </AnimatePresence>
  );
}
