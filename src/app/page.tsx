'use client';

import ElementTile from '@/components/periodic-table/element-tile';
import PeriodicTable from '@/components/periodic-table/periodic-table';
import element_data from '@/data/elemens-data-v2';
import { lantinideAndAntinide } from '@/data/label';
import { useSidebar } from '@/components/ui/sidebar';

export default function Home() {
  const { setElement } = useSidebar();

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
