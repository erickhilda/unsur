'use client';

import { useState, useMemo } from 'react';

import ElementTile from '@/components/element-tile';
import PeriodicTable from '@/components/periodic-table';
import element_data from '@/data/elemens-data';
import { ChemicalElement } from '@/types/global';

const propertyLabels: Partial<Record<keyof ChemicalElement, [string, string]>> =
  {
    atomic_mass: ['Atomic Mass', 'u'],
    atomic_radius: ['Atomic Radius', 'pm'],
    density: ['Density', 'g/cm³'],
  };

export default function Home() {
  const [element, setElement] = useState<ChemicalElement | null>(null);

  const elementProperties = useMemo(() => {
    if (!element) {
      return [];
    }

    return Object.keys(propertyLabels)
      .filter((key) => element[key as keyof ChemicalElement])
      .map((key) => {
        const [label, unit] =
          propertyLabels[key as keyof typeof propertyLabels] || [];
        let value = element[key as keyof ChemicalElement];

        if (typeof value === 'number') {
          value = value.toLocaleString();
        }

        return [label, `${value} ${unit}`];
      });
  }, [element]);

  return (
    <main className="m-4">
      <h1 className="text-center lg:text-5xl text-lg font-bold my-4">
        Tabel Periodik Unsur
      </h1>

      <PeriodicTable>
        {element && (
          <div className="grid grid-cols-3 row-span-3 col-span-10">
            <div className="col-span-3">
              <h3 className="text-center text-base lg:text-4xl leading-normal font-bold">
                {`${element.number} - ${element.name}`}{' '}
                <span className="font-light text-gray-500">
                  ({element.category})
                </span>
              </h3>
            </div>
            {elementProperties.map(([label, value], idx) => (
              <div
                className="text-center grid place-content-center p-2"
                key={idx}
              >
                <p className="lg:text-lg text-xxxxs">{label}</p>
                <p className="lg:text-2xl text-xxxs font-bold">{value}</p>
              </div>
            ))}
          </div>
        )}
        {element_data.map((el) => (
          <ElementTile
            key={el.name}
            element={el}
            style={{
              gridArea: `${el.row} / ${el.column} / auto / auto`,
            }}
            onHover={() => setElement(el)}
          />
        ))}
      </PeriodicTable>
    </main>
  );
}
