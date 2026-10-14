import React from 'react';

import { ChemicalElement } from '@/types/global';
import { generateColorBasedOnCategory } from '@/lib/color-helpers';

// make the element to receive partial type of ChemicalElement
function ElementTile({
  element,
  style,
  onHover,
  onClick,
  className,
}: {
  element: Partial<ChemicalElement>;
  style?: React.CSSProperties;
  onHover?: () => void;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`rounded-md aspect-w-1 aspect-h-1 relative hover:shadow-sm hover:opacity-80 ${generateColorBasedOnCategory(
        element.category || ''
      )} ${className}`}
      style={style}
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <span className="text-xxxxs lg:text-xxxs absolute lg:left-1 lg:top-1 left-[2px] top-[2px]">
        {element.number}
      </span>

      <span className="flex flex-col justify-center items-center text-center">
        <h2 className="lg:text-lg text-xs font-semibold">{element.symbol}</h2>
        <p className="text-xxxxs lg:text-xxxs lg:font-bold lg:block">
          {element.name}
        </p>
        <p className="lg:text-xxxs hidden lg:block">{element.category}</p>
      </span>
    </div>
  );
}

export default ElementTile;
