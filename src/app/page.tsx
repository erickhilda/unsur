'use client';

import ElementTile from '@/components/periodic-table/element-tile';
import PeriodicTable from '@/components/periodic-table/periodic-table';
import element_data from '@/data/elemens-data-v2';
import { lantinideAndAntinide } from '@/data/label';
import { useElementStore } from '@/hooks/use-element-store';

export default function Home() {
  const { setElementOnSidebar: setElement } = useElementStore();

  return (
    <main className="m-4">
      <PeriodicTable>
        {element_data.map((el) => (
          <ElementTile
            key={el.name}
            element={el}
            style={{
              gridArea: `${el.row} / ${el.column} / auto / auto`,
            }}
            onHover={() => setElement(el)}
            onClick={() => setElement(el)}
          />
        ))}
        {lantinideAndAntinide.map((el) => (
          <ElementTile
            key={el.name}
            element={el}
            style={{
              gridArea: `${el.row} / ${el.column} / auto / auto`,
              cursor: 'not-allowed',
            }}
            onHover={() => {}}
          />
        ))}
      </PeriodicTable>
    </main>
  );
}
