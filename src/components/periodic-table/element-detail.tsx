'use client';

import { detailsPropertyLabels } from '@/data/label';
import { useMemo } from 'react';
import { ChemicalElement } from '@/types/global';
import { ElementTileDetail } from './element-tile-detail';
import { DetailImageRows, DetailRows } from './detail-rows';
import { useElementStore } from '@/hooks/use-element-store';

function ElementDetail() {
  const { element } = useElementStore();

  const elementProperties = useMemo(() => {
    if (!element) {
      return [];
    }

    return Object.keys(detailsPropertyLabels).map((key) => {
      const [label, unit] =
        detailsPropertyLabels[key as keyof typeof detailsPropertyLabels] || [];
      let value = element[key as keyof ChemicalElement];

      if (key === 'image') {
        return { key, label, value, element: element.name.toLowerCase() };
      }
      if (typeof value === 'number') {
        value = value.toString();
      }

      return {
        key,
        label,
        value: `${value ?? '-'} ${unit}`,
        element: element.name.toLowerCase().replace(/ /g, '-'),
      };
    });
  }, [element]);

  if (!element) {
    return null;
  }
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col justify-center">
        <ElementTileDetail
          symbol={element.symbol}
          name={element.name}
          atomicNumber={element.number as number}
          atomicMass={element.atomic_mass}
          category={element.category}
          source={element.source}
        />
        <div className="mt-2">
          {elementProperties.length &&
            elementProperties.map((p) => {
              if (p.key === 'image') {
                return (
                  <DetailImageRows
                    key={`${p.element}-${p.key}`}
                    image={p.value as ChemicalElement['image']}
                  />
                );
              } else {
                return (
                  <DetailRows
                    key={`${p.element}-${p.key}`}
                    label={p.label as keyof ChemicalElement}
                    value={p.value as string}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}

export default ElementDetail;
