import BohrAtom from '@/components/bohr-atom';
import ScatterPlot from '@/components/scatter-plot';
import element_data from '@/data/elemens-data';
import { propertyLabels } from '@/data/label';
import { ChemicalElement } from '@/types/global';
import Image from 'next/image';

import { useMemo } from 'react';

function getElementDetails(slug: string) {
  return element_data.find(
    (element) => element.name.toLowerCase() === slug
  ) as ChemicalElement;
}

function ElementPage({ params }: { params: { slug: string } }) {
  const element = getElementDetails(params.slug);

  const elementProperties = useMemo(() => {
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
          <figure className="relative rounded-md overflow-hidden w-52 h-52 self-baseline">
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

      <section className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12 rounded-lg bg-slate-700">
        {elementProperties.map(([label, value], idx) => (
          <div className="text-center grid place-content-center p-2" key={idx}>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-lg">{label}</p>
          </div>
        ))}
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
