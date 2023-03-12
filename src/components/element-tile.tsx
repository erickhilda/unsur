import { ChemicalElement } from '@/types/global';
import Link from 'next/link';

function ElementTile({ element }: { element: ChemicalElement }) {
  console.log('🚀 ~ ElementTile ~ element:', element);
  return (
    <Link
      href={`/${element.name}`}
      className="bg-gray-800 rounded-sm aspect-w-1 aspect-h-1 relative hover:shadow-sm"
      style={{
        gridArea: `${element.row} / ${element.column} / auto / auto`,
      }}
    >
      <span className="text-xs absolute left-1 top-1">{element.number}</span>
      <span className="flex flex-col justify-center items-center">
        <h2 className="text-lg font-semibold">{element.symbol}</h2>
        <p className="text-xs">{element.name}</p>
        <p className="text-xxs">{element.atomic_mass}</p>
      </span>
    </Link>
  );
}

export default ElementTile;
