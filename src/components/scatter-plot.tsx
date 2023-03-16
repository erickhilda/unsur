'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { useSpring, animated } from '@react-spring/web';

import useInterval from '@/hooks/useInterval';

const generateDataset = () => {
  const coord = Array(10)
    .fill(0)
    .map(() => [Math.random() * 1120 + 30, Math.random() * 220]);
  const isShowing = Math.random() > 0.5;

  return coord.map((d) => ({ data: d, isShowing }));
};

const AnimatedCircle = ({
  data,
  isShowing,
}: {
  data: number[];
  isShowing: boolean;
}) => {
  const wasShowing = useRef(false);

  useEffect(() => {
    wasShowing.current = isShowing;
  }, [isShowing]);
  const style = useSpring({
    config: {
      duration: 1200,
    },
    r: isShowing ? 6 : 0,
    opacity: isShowing ? 1 : 0,
  });
  return (
    <animated.circle
      {...style}
      cx={data[0] || 0}
      cy={data[1] || 0}
      fill={
        !isShowing
          ? 'tomato'
          : !wasShowing.current
          ? 'cornflowerblue'
          : 'lightgrey'
      }
    />
  );
};

function ScatterPlot() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const clientHeight = svgRef.current?.clientHeight || 0;
  const clientWidth = svgRef.current?.clientWidth || 0;
  const [dataset, setDataset] = useState(generateDataset());

  useInterval(() => {
    const newDataset = dataset.map((d) => ({
      ...d,
      isShowing: Math.random() > 0.5,
    }));

    setDataset(newDataset);
  }, 2000);

  const xTicks = useMemo(() => {
    const xScale = scaleLinear().domain([0, 100]).range([30, clientWidth]);

    const width = clientWidth - 20;
    const pixelsPerTick = 100;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, [clientWidth]);

  const yTicks = useMemo(() => {
    const yScale = scaleLinear().domain([0, 10]).range([clientHeight, 10]);

    const height = clientHeight - 20;
    const pixelsPerTick = 50;
    const numberOfTicksTarget = Math.max(1, Math.floor(height / pixelsPerTick));
    return yScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      yOffset: yScale(value),
    }));
  }, [clientHeight]);

  return (
    <svg className="w-full h-full overflow-visible" ref={svgRef}>
      {dataset.map((d, i) => (
        <AnimatedCircle key={i} data={d.data} isShowing={d.isShowing} />
      ))}

      <path
        d={['M', 30, clientHeight, 'H', clientWidth].join(' ')}
        fill="none"
        stroke="currentColor"
      />

      {/* x-axis */}
      {xTicks.map((tick) => (
        <g
          key={tick.value}
          transform={`translate(${tick.xOffset}, ${clientHeight})`}
        >
          <line y2="6" stroke="currentColor" />
          <text
            key={tick.value}
            fill="currentColor"
            style={{
              fontSize: '10px',
              textAnchor: 'middle',
              transform: 'translateY(20px)',
            }}
          >
            {tick.value}
          </text>
        </g>
      ))}

      <path
        d={['M', 30, 0, 'V', clientHeight].join(' ')}
        fill="none"
        stroke="currentColor"
      />
      {/* y-axis */}
      {yTicks.map((tick) => (
        <g key={tick.value} transform={`translate(24, ${tick.yOffset})`}>
          <line x2="6" stroke="currentColor" />
          <text
            key={tick.value}
            fill="currentColor"
            style={{
              fontSize: '10px',
              textAnchor: 'end',
              transform: 'translate(-3px, 3px)',
            }}
          >
            {tick.value}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default ScatterPlot;
