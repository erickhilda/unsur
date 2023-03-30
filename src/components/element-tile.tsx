import React from 'react';
import Link from 'next/link';

import { ChemicalElement } from '@/types/global';

// make teh color a bit more pastel
function generateColorBasedOnCategory(category: string) {
  switch (category) {
    case 'alkali metal':
      return 'bg-red-400';
    case 'alkaline earth metal':
      return 'bg-red-200';
    case 'transition metal':
      return 'bg-yellow-400';
    case 'post-transition metal':
      return 'bg-yellow-200';
    case 'metalloid':
      return 'bg-green-400';
    case 'diatomic nonmetal':
      return 'bg-green-200';
    case 'polyatomic nonmetal':
      return 'bg-blue-400';
    case 'noble gas':
      return 'bg-violet-400';
    case 'lanthanide':
      return 'bg-teal-400';
    case 'actinide':
      return 'bg-teal-200';
    default:
      return 'bg-gray-600';
  }
}

// make the element to receive partial type of ChemicalElement
function ElementTile({
  element,
  style,
  onHover,
}: {
  element: Partial<ChemicalElement>;
  style: React.CSSProperties;
  onHover?: () => void;
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
    <Link
      href={redirectUrl()}
      className={`rounded-sm aspect-w-1 aspect-h-1 relative hover:shadow-sm ${generateColorBasedOnCategory(
        element.category || ''
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
