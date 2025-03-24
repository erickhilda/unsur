import React from 'react';

function PeriodicTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="periodic-table-grid lg:grid lg:grid-cols-18 lg:gap-1 gap-[0.125rem]">
      {children}
    </div>
  );
}

export default PeriodicTable;
