import Image from 'next/image';

import BohrAtom from '@/components/atom/bohr-atom';
import ModelWrapper from '@/components/atom/model-wrapper';
import ScatterPlot from '@/components/scatter-plot';
import element_data from '@/data/elemens-data';
import { detailsPropertyLabels } from '@/data/label';
import { ChemicalElement } from '@/types/global';
import useElementProperties from '@/hooks/useElementProperties';

function getElementDetails(slug: string) {
  return element_data.find(
    (element) => element.name.toLowerCase() === slug
  ) as ChemicalElement;
}

function ElementPage({ params }: { params: { slug: string } }) {
  const element = getElementDetails(params.slug);

  const elementProperties = useElementProperties({
    properties: detailsPropertyLabels,
    element,
  });

  return (
    <div className="mx-auto max-w-xs lg:max-w-6xl">
      <h1 className="text-center lg:text-5xl text-3xl leading-normal font-bold">
        {`${element.number} - ${element.name}`}{' '}
        <span className="font-light text-gray-500">({element.category})</span>
      </h1>

      <section className="grid grid-cols-1 lg:grid-cols-4 gap-4 mt-12">
        <div className="lg:col-span-3 col-span-1">
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

        {/* cnter the content inside grid */}
        <div className="col-span-1">
          <figure className="relative rounded-md overflow-hidden w-52 h-52 self-baseline mx-auto">
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

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12 rounded-lg shadow-lg ring-1 ring-slate-100">
        {elementProperties.map(([label, value], idx) => (
          <div className="text-center grid place-content-center p-2" key={idx}>
            <p className="lg:text-2xl text-lg font-bold">{value}</p>
            <p className="lg:text-lg text-sm">{label}</p>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-8 grid-cols-1 lg:gap-2 mt-12">
        <div className="lg:col-span-3 col-span-1 min-h-[300px]">
          {/* <BohrAtom
            shells={element.shells}
            symbol={element.symbol}
            orbitalPeriod={4}
            className="h-full w-full overflow-visible"
          /> */}
          <ModelWrapper modelUrl={element.bohr_model_3d} />
        </div>
        <div className="col-span-5">{/* <ScatterPlot /> */}</div>
      </section>
    </div>
  );
}

export default ElementPage;
