import { cn } from '@/lib/utils';
import { ChemicalElement } from '@/types/global';
import Image from 'next/image';

interface ElementSeriesRowProps {
  label: keyof ChemicalElement;
  value: string | ChemicalElement['image'];
  className?: string;
}

export function DetailRows({ label, value, className }: ElementSeriesRowProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between py-2 px-4 border-t border-border',
        className
      )}
    >
      <span className="text-sm">{label}</span>
      <span className="text-zinc-400 text-xs font-medium">
        {typeof value === 'string' ? value : null}
      </span>
    </div>
  );
}

export function DetailImageRows({
  image,
}: {
  image: ChemicalElement['image'];
}) {
  return (
    <div className="border-t border-border p-2">
      <figure className="relative rounded-md overflow-hidden w-52 h-52 self-baseline mx-auto">
        <Image
          src={image.url}
          alt={image.attribution}
          className="object-cover object-center"
          fill
        />
        <figcaption className="absolute bottom-0 left-0 w-full bg-gray-900/50 text-white text-center text-sm p-2">
          {image.title}
        </figcaption>
      </figure>
    </div>
  );
}
