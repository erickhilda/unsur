import React from 'react';

import { ChemicalElement } from '@/types/global';

// make teh color a bit more pastel
function generateColorBasedOnCategory(category: string) {
  switch (category) {
    case 'alkali metal':
      return 'bg-red-400 dark:bg-red-600';
    case 'alkaline earth metal':
      return 'bg-pink-200 dark:bg-pink-500';
    case 'transition metal':
      return 'bg-yellow-200 dark:bg-yellow-600';
    case 'post-transition metal':
      return 'bg-orange-200 dark:bg-orange-400';
    case 'metalloid':
      return 'bg-green-200 dark:bg-green-600';
    case 'diatomic nonmetal':
      return 'bg-green-200';
    case 'polyatomic nonmetal':
    // added for data-v2 compatibility
    case 'reactive nonmetal':
      return 'bg-blue-300 dark:bg-blue-700';
    case 'noble gas':
      return 'bg-violet-400 dark:bg-violet-600';
    case 'lanthanide':
      return 'bg-emerald-400 dark:bg-emerald-700';
    case 'actinide':
      return 'bg-teal-200 dark:bg-teal-500';
    case 'unknown':
    default:
      return 'bg-zinc-300 dark:bg-zinc-600';
  }
}

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
  const isLantinideOrActinide =
    element.name === 'Lanthanide' || element.name === 'Actinide';
  const redirectUrl = () => {
    if (isLantinideOrActinide) {
      return '/';
    }

    return `/${element.name?.toLowerCase().replace(/ /g, '-')}`;
  };

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
