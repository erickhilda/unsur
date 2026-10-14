function BohrAtom({
  shells,
  symbol,
  orbitalPeriod,
  className,
}: {
  shells: number[];
  symbol: string;
  orbitalPeriod: number;
  className?: string;
}) {
  const highlightShell = null;
  const shellWidth = 15;
  const size = (shells.length + 1) * 2 * shellWidth;

  const nucleusProps = {
    r: 15,
    fill: 'gray',
  };

  const shellProps = {
    fill: 'none',
    stroke: 'gray',
    strokeWidth: 1,
  };

  const electronProps = {
    r: 3,
    fill: 'blue',
    stroke: 'black',
    strokeWidth: 0.5,
  };

  return (
    <svg
      fill="white"
      viewBox={`${-size / 2}, ${-size / 2}, ${size}, ${size}`}
      className={className}
    >
      {/* nucleus */}
      <circle {...nucleusProps} />
      <text style={{ textAnchor: 'middle', dominantBaseline: 'central' }}>
        {symbol}
      </text>
      {/* electron orbotals */}
      {shells.map((electrons, shell_idx) => {
        const n = shell_idx + 1;
        const shell_radius = nucleusProps.r + n * shellWidth;
        const active = n === highlightShell;
        return (
          <g
            key={shell_idx}
            className="animate-spin"
            style={{ animationDuration: `${orbitalPeriod * n * 1.5}s` }}
          >
            <circle r={shell_radius} {...shellProps} />

            {/* electrons */}
            {Array(electrons)
              .fill(0)
              .map((_, elec_idx) => {
                const elec_x =
                  Math.cos((2 * Math.PI * elec_idx) / electrons) * shell_radius;
                const elec_y =
                  Math.sin((2 * Math.PI * elec_idx) / electrons) * shell_radius;
                return (
                  <circle
                    key={elec_idx}
                    cx={elec_x}
                    cy={elec_y}
                    {...electronProps}
                    className="electron"
                  >
                    <title>{`Electron ${elec_idx + 1}`}</title>
                  </circle>
                );
              })}
          </g>
        );
      })}
    </svg>
  );
}

export default BohrAtom;
