import React from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { motion, useTransform } from "motion/react";

import { extent, max } from "d3-array";
import * as d3 from "d3";

export default function InflationGraph({ inflation_data, scrollYProgress }) {
  const filteredData = inflation_data.observations.filter(
    (d) =>
      new Date(d.date) >= new Date("2009-01-01") &&
      new Date(d.date) <= new Date()
  );

  // Accessors
  const getX = (d: { date: Date; value: number }) => new Date(d.date);
  const getY = (d: { date: Date; value: number }) => d.value;

  // Scales
  const xScale = scaleTime({
    domain: extent(filteredData, getX) as [Date, Date],
    range: [0, 1000],
  });
  const yScale = scaleLinear({
    domain: [0, max(filteredData, getY) || 0],
    range: [400, 0],
  });

  // Map the scroll position to rotation
  const rotation = useTransform(scrollYProgress, [0.3, 0.5], [0, 90]);

  return (
    <motion.svg
      className="ml-6 mt-20"
      width={2000}
      height={900}
      style={{ rotate: rotation }}
    >
      <motion.path
        d={
          line<{ date: Date; value: number }>()
            .curve(d3.curveBasis) // Adding a curve to the line
            .x((d) => xScale(getX(d)) ?? 0)
            .y((d) => yScale(getY(d)) ?? 0)(filteredData) || ""
        }
        stroke="white"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { delay: 0.5, duration: 1 } }}
      />
      <motion.path
        d={
          line<{ date: Date; value: number }>()
            .curve(d3.curveBasis) // Adding a curve to the line
            .x((d) => xScale(getX(d)) ?? 0)
            .y(() => yScale(2))(filteredData) || ""
        }
        stroke="yellow"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1, transition: { delay: 0.9, duration: 0.8 } }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 1.2, duration: 1 } }}
      >
        <line x1="0" x2="1000" y1="425" y2="425" stroke="white" />
        {xScale.ticks().map((tick, index) => (
          <g key={index} transform={`translate(${xScale(tick)}, 425)`}>
            <line y2="6" stroke="white" />
            <text
              y="9"
              dy="0.71em"
              fill="white"
              fontSize="11"
              textAnchor="middle"
            >
              {d3.timeFormat("%B")(tick)}
            </text>
          </g>
        ))}
      </motion.g>
    </motion.svg>
  );
}
