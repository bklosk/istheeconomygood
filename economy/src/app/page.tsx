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
          className="fixed text-4xl text-white font-extrabold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.8, delay: 0.5 } }}
        >
          <p>Inflation</p>
        </motion.div>
      </main>
    </AnimatePresence>
  );
}
