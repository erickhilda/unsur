import { ChemicalElement } from '@/types/global';
import Link from 'next/link';

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
}: {
  element: ChemicalElement;
  style: React.CSSProperties;
}) {
  return (
    <Link
      href={`/${element.name.toLowerCase().replace(/ /g, '-')}`}
      className={`rounded-sm aspect-w-1 aspect-h-1 relative hover:shadow-sm ${generateColorBasedOnCategory(
        element.category
      )} hover:opacity-80`}
      style={style}
    >
      <span className="text-xs absolute left-1 top-1">{element.number}</span>
      <span className="flex flex-col justify-center items-center text-center">
        <h2 className="text-lg font-semibold">{element.symbol}</h2>
        <p className="text-xs">{element.name}</p>
        <p className="text-xxxs">{element.category}</p>
      </span>
    </Link>
  );
}

export default ElementTile;
