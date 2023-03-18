import BohrAtom from '@/components/bohr-atom';
import ScatterPlot from '@/components/scatter-plot';
import element_data from '@/data/elemens-data';
import { ChemicalElement } from '@/types/global';
import Image from 'next/image';

function getElementDetails(slug: string) {
  return element_data.find(
    (element) => element.name.toLowerCase() === slug
  ) as ChemicalElement;
}

function ElementPage({ params }: { params: { slug: string } }) {
  const element = getElementDetails(params.slug);

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="text-center text-5xl leading-normal font-bold">
        {`${element.number} - ${element.name}`}{' '}
        <span className="font-light text-gray-500">({element.category})</span>
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
        <div className="col-span-3">
          <p className="text-2xl font-bold">Description</p>
          <p className="text-lg mt-4">
            Discover by <b>{element.discoverer}</b> in {element.year}.
            <br />
            {element.summary}
            <br />
            more info on wikipedia:{' '}
            <a
              href={element.source}
              target="_blank"
              rel="noreferrer"
              className="text-blue-500"
            >
              {element.source}
            </a>
          </p>
        </div>
        <div className="col-span-1">
          <figure className="relative overflow-hidden w-52 h-52 self-baseline">
            <Image
              src={element.image.url}
              alt={element.image.attribution}
              className="object-cover object-center"
              fill
            />
            <figcaption className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-50 text-white text-center text-sm p-2">
              {element.image.title}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
        <div className="col-span-4">
          <p className="text-2xl font-bold">General Information</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <p className="font-bold">Symbol</p>
              <p>{element.symbol}</p>
            </div>
            <div>
              <p className="font-bold">Atomic Number</p>
              <p>{element.number}</p>
            </div>
            <div>
              <p className="font-bold">Atomic Mass</p>
              <p>{element.atomic_mass}</p>
            </div>
            <div>
              <p className="font-bold">Electron Configuration</p>
              <p>{element.electron_configuration}</p>
            </div>
            <div>
              <p className="font-bold">Electron Configuration (Short)</p>
              <p>{element.electron_configuration_semantic}</p>
            </div>
            <div>
              <p className="font-bold">Electron Affinity</p>
              <p>{element.electron_affinity}</p>
            </div>
            <div>
              <p className="font-bold">Electronegativity</p>
              <p>{element.electronegativity_pauling}</p>
            </div>
            <div>
              <p className="font-bold">Ionization Energy</p>
              <p>{element.ionization_energies}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-8 gap-2">
        <div className="col-span-2">
          <BohrAtom
            shells={element.shells}
            symbol={element.symbol}
            orbitalPeriod={4}
            className="h-full w-full overflow-visible"
          />
        </div>
        <div className="col-span-6">
          <ScatterPlot />
        </div>
      </div>
    </div>
  );
}

export default ElementPage;
