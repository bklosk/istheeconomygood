"use client";

import { AnimatePresence, useScroll, motion } from "motion/react";
import { InflationGraph } from "./components/inflation/inflation_graph";
import { InflationTitle } from "./components/inflation/inflation_title";

export default function Page() {
  interface Color {
    value: string;
  }
  const background_color: Color = { value: "#ff3864" };
  const { scrollY } = useScroll();

  return (
    <AnimatePresence>
      <main
        className="w-screen h-[2000px] bg-[var(--background-color)]"
        style={
          {
            "--background-color": background_color.value,
          } as React.CSSProperties
        }
      >
        <div className="relative h-[900px] grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1">
          <div>
            <InflationTitle />
            <InflationGraph scrollY={scrollY} />
          </div>
          <motion.div
            className="sticky top-1/2 w-[200px] mx-auto"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 4.5, duration: 0.2 },
            }}
          >
            Four dollar toast organic synth tacos etsy distillery before they
            sold out irony same. Kombucha bruh roof party grailed yuccie
            shoreditch. Fanny pack marfa kale chips palo santo pabst locavore.
            Gatekeep schlitz offal helvetica mlkshk asymmetrical biodiesel
            yuccie. Fingerstache hella plaid quinoa subway tile. Direct trade
            synth raclette humblebrag four dollar toast, lomo post-ironic
            distillery scenester. Solarpunk adaptogen hot chicken beard. La
            croix YOLO lomo, yuccie bruh flannel keffiyeh edison bulb before
            they sold out cronut JOMO four loko gatekeep kombucha. Fam adaptogen
            jawn tote bag listicle, raw denim marfa af intelligentsia
            letterpress. Jawn hella blue bottle intelligentsia, vaporware la
            croix copper mug tattooed keffiyeh disrupt humblebrag. Echo park
            marxism sustainable meggings small batch disrupt. Big mood XOXO art
            party readymade, post-ironic artisan chillwave JOMO marfa irony
            pinterest man bun coloring book gochujang.
          </motion.div>
        </div>
      </main>
    </AnimatePresence>
  );
}
