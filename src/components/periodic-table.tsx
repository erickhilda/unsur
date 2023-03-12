import React from 'react';

function PeriodicTable({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid grid-cols-18 gap-1 place-items-stretch">
      {children}
    </section>
  );
}

export default PeriodicTable;
