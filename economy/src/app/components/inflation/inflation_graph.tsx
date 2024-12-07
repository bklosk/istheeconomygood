import React from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { motion, useTransform } from "motion/react";

import { extent, max } from "d3-array";
import * as d3 from "d3";

export default function InflationGraph({ inflation_data, scrollYProgress }) {
  const filteredData = inflation_data.observations.filter(
    (d) =>
      new Date(d.date) >= new Date("2010-01-01") &&
      new Date(d.date) <= new Date()
  );
  // transform that maps scroll to trigger animation
  const taylor_path_length = useTransform(scrollYProgress, [0.1, 0.2], [0, 1]);

  // Accessors
  const getX = (d: { date: Date; value: number }) => new Date(d.date);
  const getY = (d: { date: Date; value: number }) => d.value;
  // Model Accessor
  const modelY = (d: { date: Date }) => {
    const t =
      (new Date(d.date).getFullYear() - 2010) * 12 +
      new Date(d.date).getMonth();
    return 210 * Math.pow(1.02, t / 12);
  };
  // Scales
  const xScale = scaleTime({
    domain: extent(filteredData, getX) as [Date, Date],
    range: [0, 1000],
  });
  const yScale = scaleLinear({
    domain: [0, max(filteredData, getY) || 0],
    range: [400, 0],
  });

  return (
    <svg className="ml-2" width={2000} height={900}>
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
        whileInView={{ pathLength: 1, transition: { delay: 1, duration: 2 } }}
      />
      <motion.path
        d={
          line<{ date: Date; value: number }>()
            .curve(d3.curveBasis) // Adding a curve to the line
            .x((d) => xScale(getX(d)) ?? 0)
            .y((d) => yScale(modelY(d)) ?? 0)(filteredData) || ""
        }
        stroke="yellow"
        strokeWidth={2}
        fill="none"
        initial={{ pathLength: 0 }}
        style={{
          pathLength: taylor_path_length,
        }}
      />
      <motion.g
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, transition: { delay: 1.9, duration: 2 } }}
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
              {d3.timeFormat("%Y")(tick)}
            </text>
          </g>
        ))}
      </motion.g>
      <motion.text
        x="910"
        y="0"
        fill="white"
        fontSize="14"
        textAnchor="start"
        alignmentBaseline="middle"
      >
        Prices
      </motion.text>
    </svg>
  );
}
