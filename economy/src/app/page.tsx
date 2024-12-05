"use client";

import { AnimatePresence, motion } from "motion/react";
import { InflationTitle } from "./components/inflation/inflation_title";
import InflationGraph from "./components/inflation/inflation_graph";
import { UnemploymentTitle } from "./components/unemployment/unemployment_title";

import { useScroll } from "motion/react";
import { useTransform } from "motion/react";
import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function Wrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <Page />
    </QueryClientProvider>
  );
}

export function Page() {
  const { scrollYProgress } = useScroll();
  const background_color = useTransform(
    scrollYProgress,
    [0, 0.15, 0.25, 0.9, 1],
    ["#FF3864", "#FF3864", "#345995", "#345995", "#0f0111"]
  );

  async function fetchInflationData() {
    const response = await fetch("http://api.istheeconomygood.com:8000/health");
    return response.json();
  }

  const { data: inflationData } = useQuery({
    queryKey: ["inflation"],
    queryFn: fetchInflationData,
  });

  return (
    <QueryClientProvider client={queryClient}>
      <AnimatePresence>
        <motion.main
          className="absolute w-screen h-[16000px]"
          style={{ backgroundColor: background_color }}
        >
          <div className="relative h-[3000px]">
            <div className="sticky top-6">
              <InflationTitle />
              <InflationGraph scrollYProgress={scrollYProgress} />
            </div>
          </div>
          <div className="relative h-[3000px]">
            <div className="sticky top-0">
              <UnemploymentTitle />
            </div>
          </div>
        </motion.main>
      </AnimatePresence>
    </QueryClientProvider>
  );
}
