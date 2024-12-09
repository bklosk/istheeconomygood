import React from "react";
import { line } from "d3-shape";
import { scaleTime, scaleLinear } from "@visx/scale";
import { motion, useTransform } from "motion/react";

import { extent, max } from "d3-array";
import * as d3 from "d3";

export default function InflationGraph({ inflation_data, scrollYProgress }) {
  const filteredData = inflation_data.observations.filter(
    (d) =>
      new Date(d.date) >= new Date("2020-01-01") &&
      new Date(d.date) <= new Date()
  );

  const svg_width = 1000;
  const svg_height = 550;

  // Accessors
  const getX = (d: { date: Date; value: number }) => new Date(d.date);
  const getY = (d: { date: Date; value: number }) => d.value;

  // Scales
  const xScale = scaleTime({
    domain: extent(filteredData, getX) as [Date, Date],
    range: [0, svg_width],
  });
  const yScale = scaleLinear({
    domain: [0, max(filteredData, getY) || 0],
    range: [svg_height, 0],
  });

  return (
    <motion.svg
      className="mt-20"
      width={svg_width}
      height={svg_height}
      viewBox="-20 -20 1000 655"
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
        animate={{
          opacity: 1,
          transition: { delay: 0.9, duration: 1.2 },
        }}
      >
        <line x1="0" x2="1000" y1={svg_height} y2={svg_height} stroke="white" />
        {xScale.ticks().map((tick, index) => (
          <g
            key={index}
            transform={`translate(${xScale(tick)}, ${svg_height})`}
          >
            <line y2="6" stroke="white" />
            <text
              y="9"
              dy="0.71em"
              fill="white"
              fontSize="11"
              textAnchor="middle"
            >
              {d3.timeFormat("%b %y")(tick)}
            </text>
          </g>
        ))}
      </motion.g>
      <motion.g
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.9, duration: 1.2 },
        }}
      >
        <line x1="0" x2="0" y1="0" y2="400" stroke="white" />
        {yScale.ticks().map((tick, index) => (
          <g key={index} transform={`translate(0, ${yScale(tick)})`}>
            <line x2="-6" stroke="white" />
            <text
              x="-12"
              dy="0.32em"
              fill="white"
              fontSize="11"
              textAnchor="end"
            >
              {tick}
            </text>
          </g>
        ))}
      </motion.g>
    </motion.svg>
  );
}
