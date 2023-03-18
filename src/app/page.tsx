import ElementTile from '@/components/element-tile';
import PeriodicTable from '@/components/periodic-table';
import element_data from '@/data/elemens-data';

export default function Home() {
  return (
    <main className="m-4">
      <h1 className="text-center text-5xl font-bold my-4">
        Tabel Periodik Unsur
      </h1>
      <PeriodicTable>
        {element_data.map((element) => (
          <ElementTile
            key={element.name}
            element={element}
            style={{
              gridArea: `${element.row} / ${element.column} / auto / auto`,
            }}
          />
        ))}
      </PeriodicTable>
    </main>
  );
}
