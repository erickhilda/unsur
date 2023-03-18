import React from 'react';
import { Metadata } from 'next';

import NavBar from '@/components/layout/nav-bar';

export function generateMetadata(): Metadata {
  return {
    title: 'Table of Elements | Acknowledgement',
  };
}

export default function ElementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
