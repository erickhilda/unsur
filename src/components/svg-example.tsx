'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { scaleLinear } from 'd3-scale';
import { useSpring, animated } from '@react-spring/web';

import useInterval from '@/hooks/useInterval';

const generateDataset = () => {
  const coord = Array(10)
    .fill(0)
    .map(() => [Math.random() * 280 + 10, Math.random() * 135 + 10]);
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
      cx={data[0]}
      cy={data[1]}
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

function SvgExample() {
  const ref = useRef<SVGSVGElement>(null);
  const [dataset, setDataset] = useState(generateDataset());

  useInterval(() => {
    const newDataset = dataset.map((d) => ({
      ...d,
      isShowing: Math.random() > 0.5,
    }));

    setDataset(newDataset);
  }, 2000);

  const ticks = useMemo(() => {
    const xScale = scaleLinear().domain([10, 100]).range([10, 290]);
    const width = 290 - 10;
    const pixelsPerTick = 30;
    const numberOfTicksTarget = Math.max(1, Math.floor(width / pixelsPerTick));
    return xScale.ticks(numberOfTicksTarget).map((value) => ({
      value,
      xOffset: xScale(value),
    }));
  }, []);

  return (
    <svg ref={ref}>
      {dataset.map((d, i) => (
        <AnimatedCircle key={i} data={d.data} isShowing={d.isShowing} />
      ))}
      <path
        d={['M', 10, 6, 'v', -6, 'H', 290, 'v', 6].join(' ')}
        fill="none"
        stroke="currentColor"
      />
      {ticks.map((tick) => (
        <g key={tick.value} transform={`translate(${tick.xOffset}, 0)`}>
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
    </svg>
  );
}

export default SvgExample;
