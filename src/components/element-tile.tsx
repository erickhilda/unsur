import React from 'react';
import Link from 'next/link';

import { ChemicalElement } from '@/types/global';

function generateColorBasedOnCategory(category: string) {
  switch (category) {
    case 'alkali metal':
      return 'bg-red-700';
    case 'alkaline earth metal':
      return 'bg-red-500';
    case 'transition metal':
      return 'bg-yellow-700';
    case 'post-transition metal':
      return 'bg-yellow-500';
    case 'metalloid':
      return 'bg-green-700';
    case 'diatomic nonmetal':
      return 'bg-green-500';
    case 'polyatomic nonmetal':
      return 'bg-blue-700';
    case 'noble gas':
      return 'bg-violet-700';
    case 'lanthanide':
      return 'bg-teal-700';
    case 'actinide':
      return 'bg-teal-500';
    default:
      return 'bg-gray-900';
  }
}

function ElementTile({
  element,
  style,
  onHover,
}: {
  element: ChemicalElement;
  style: React.CSSProperties;
  onHover?: () => void;
}) {
  return (
    <Link
      href={`/${element.name.toLowerCase().replace(/ /g, '-')}`}
      className={`rounded-sm aspect-w-1 aspect-h-1 relative hover:shadow-sm ${generateColorBasedOnCategory(
        element.category
      )} hover:opacity-80`}
      style={style}
      onMouseEnter={onHover}
    >
      <span className="text-xxxxs lg:text-xxxs absolute lg:left-1 lg:top-1 left-[1px] top-[1px]">
        {element.number}
      </span>

      <span className="flex flex-col justify-center items-center text-center">
        <h2 className="lg:text-lg text-xxxs font-semibold">{element.symbol}</h2>
        <p className="lg:text-xxxs font-bold hidden lg:block">{element.name}</p>
        <p className="lg:text-xxxs hidden lg:block">{element.category}</p>
      </span>
    </Link>
  );
}

export default ElementTile;
