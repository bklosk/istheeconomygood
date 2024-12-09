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

function Page() {
  const { scrollYProgress } = useScroll();
  const background_color = useTransform(
    scrollYProgress,
    [0, 0.47, 0.51, 0.9, 1],
    ["#FF3864", "#FF3864", "#345995", "#345995", "#0f0111"]
  );

  async function fetchInflationData() {
    // const response = await fetch("https://api.istheeconomygood.com/inflation");
    const response = await fetch("http://127.0.0.1:8000/inflation");
    return response.json();
  }

  const { data: inflationData, isPending: pendingInf } = useQuery({
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
          <div className="relative h-[6000px]">
            <div className="sticky top-6">
              {!pendingInf ? (
                <div>
                  <InflationTitle inflation_data={inflationData} />
                  <InflationGraph
                    inflation_data={inflationData}
                    scrollYProgress={scrollYProgress}
                  />
                </div>
              ) : null}
            </div>
            <div className="bg-white w-[400px] h-fit rounded-lg shadow-lg p-6 border border-green-200 float-right mr-4">
              <p>
                The Federal Reserve aims for 2% inflation. Right now, we are{" "}
                <span className="font-extrabold">
                  {!pendingInf
                    ? inflationData.observations[
                        inflationData.observations.length - 1
                      ].value > 2
                      ? "above"
                      : "below"
                    : null}{" "}
                </span>
                that.
              </p>
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
