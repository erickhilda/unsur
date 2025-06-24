import React from 'react';
import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  return {
    title: 'Acknowledgements | Unsur - Periodic Table of Elements',
    description:
      'Acknowledgements and credits for data sources, inspiration, and technologies used in the Unsur periodic table application.',
  };
}

export default function AcknowledgementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
