import { generateColorBasedOnCategory } from '@/lib/color-helpers';
import { cn } from '@/lib/utils';
import { Category } from '@/types/global';
import Link from 'next/link';
import Icon from '../ui/icon';

interface ElementCardProps {
  symbol: string;
  name: string;
  atomicNumber: number;
  atomicMass: number;
  className?: string;
  category: Category;
  source: string;
}

export function ElementTileDetail({
  symbol,
  name,
  atomicNumber,
  atomicMass,
  className,
  category,
  source,
}: ElementCardProps) {
  return (
    <div
      className={cn(
        'relative aspect-square w-52 h-52 p-2 mx-auto mt-2',
        generateColorBasedOnCategory(category),
        className
      )}
    >
      <div className="flex flex-col items-start justify-center h-full">
        <div className="text-xl font-light">{atomicNumber}</div>
        <div className="text-6xl font-bold">{symbol}</div>

        <Link
          href={source}
          target="_blank"
          className="text-2xl font-light flex items-center gap-1 hover:underline"
        >
          {name}
          <Icon icon="lucide:external-link" width={18} height={18} />
        </Link>
        <div className="text-lg font-light">{category}</div>
        <div className="text-lg font-light">{atomicMass} u</div>
      </div>
    </div>
  );
}
