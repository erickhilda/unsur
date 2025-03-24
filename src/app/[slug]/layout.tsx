import React from 'react';
import { Metadata } from 'next';

import { ChemicalElement } from '@/types/global';
import element_data from '@/data/elemens-data';
import NavBar from '@/components/layout/nav-bar';
import Footer from '@/components/layout/footer';

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const element = element_data.find(
    (element) => element.name.toLowerCase() === params.slug
  ) as ChemicalElement;

  return {
    title: `${element.number} - ${element.name}`,
    description: element.summary,
  };
}

function getNextElement(element: ChemicalElement) {
  const index = element_data.indexOf(element);

  if (index === element_data.length - 1) {
    return null;
  }
  return element_data[index + 1];
}

function getPreviousElement(element: ChemicalElement) {
  const index = element_data.indexOf(element);

  if (index === 0) {
    return null;
  }

  return element_data[index - 1];
}

export default function ElementLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  const element = element_data.find(
    (element) => element.name.toLowerCase() === params.slug
  ) as ChemicalElement;

  const nextElement = getNextElement(element);
  const previousElement = getPreviousElement(element);

  return (
    <>
      {children}
      <Footer nextElement={nextElement} previousElement={previousElement} />
    </>
  );
}
