import BohrAtom from '@/components/bohr-atom';
import element_data from '@/data/elemens-data';
import { ChemicalElement } from '@/types/global';

function getElementDetails(slug: string) {
  return element_data.find(
    (element) => element.name.toLowerCase() === slug
  ) as ChemicalElement;
}

function ElementPage({ params }: { params: { slug: string } }) {
  const element = getElementDetails(params.slug);

  return (
    <div>
      <h1 className="text-center text-5xl font-bold my-4">
        {`${element.number} - ${element.name}`}{' '}
        <span className="font-light text-gray-500">({element.category})</span>
      </h1>
      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-2">
          <BohrAtom
            shells={element.shells}
            symbol={element.symbol}
            orbitalPeriod={4}
            className="h-full w-full overflow-visible"
          />
        </div>
        <div className="col-span-6"></div>
      </div>
    </div>
  );
}

export default ElementPage;
