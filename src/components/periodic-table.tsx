import React from 'react';

function PeriodicTable({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-18 lg:gap-1 gap-[0.125rem]">
      {children}
    </section>
  );
}

export default PeriodicTable;
