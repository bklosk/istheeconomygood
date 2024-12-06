import React from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { motion, useTransform } from "motion/react";
import { AxisBottom } from "@visx/axis";

import { extent, max } from "d3-array";
import * as d3 from "d3";

export default function InflationGraph({ inflation_data, scrollYProgress }) {
  // Accessors
  const getX = (d: { date: Date; value: number }) => new Date(d.date);
  const getY = (d: { date: Date; value: number }) => d.value;

  // Scales
  const xScale = scaleTime({
    domain: extent(inflation_data.observations, getX) as [Date, Date],
    range: [0, 700],
  });
  const yScale = scaleLinear({
    domain: [0, max(inflation_data.observations, getY) || 100],
    range: [400, 0],
  });

  // const scroll_scaled = useTransform(() => scrollYProgress.get() * 40);
  // const clamped_scroll_scaled = useTransform(scroll_scaled, [0, 1], [0, 1], {
  //   clamp: true,
  // });

  return (
    <svg className="ml-2" width={700} height={400}>
      <motion.path
        d={
          line<{ date: Date; value: number }>()
            .curve(d3.curveBasis) // Adding a curve to the line
            .x((d) => xScale(getX(d)) ?? 0)
            .y((d) => yScale(getY(d)) ?? 0)(inflation_data.observations) || ""
        }
        stroke="white"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1, transition: { delay: 1, duration: 2 } }}
        // pathLength={clamped_scroll_scaled}
      />
      <AxisBottom
        top={400}
        scale={xScale}
        numTicks={5}
        stroke="white"
        tickStroke="white"
        tickLabelProps={() => ({
          fill: "white",
          fontSize: 11,
          textAnchor: "middle",
        })}
      />
    </svg>
  );
}
