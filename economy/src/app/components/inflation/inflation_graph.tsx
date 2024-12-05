import React from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { motion, useTransform } from "motion/react";
import { extent, max } from "d3-array";
import * as d3 from "d3";

export default function InflationGraph({ inflation_data, scrollYProgress }) {
  console.log(inflation_data.observations);
  // Sample data
  const data = [
    { date: new Date(2020, 0, 1), value: 50 },
    { date: new Date(2020, 1, 1), value: 10 },
    { date: new Date(2020, 2, 1), value: 20 },
    { date: new Date(2020, 3, 1), value: 80 },
    { date: new Date(2020, 4, 1), value: 30 },
  ];

  // Accessors
  const getX = (d: { date: Date; value: number }) => d.date;
  const getY = (d: { date: Date; value: number }) => d.value;

  // Scales
  const xScale = scaleTime({
    domain: extent(data, getX) as [Date, Date],
    range: [0, 1000],
  });
  const yScale = scaleLinear({
    domain: [0, max(data, getY) || 100],
    range: [400, 0],
  });

  const scroll_scaled = useTransform(() => scrollYProgress.get() * 40);
  const clamped_scroll_scaled = useTransform(scroll_scaled, [0, 1], [0, 1], {
    clamp: true,
  });

  return (
    <svg width={1000} height={400}>
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
        pathLength={clamped_scroll_scaled}
      />
    </svg>
  );
}
