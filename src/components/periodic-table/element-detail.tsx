'use client';

import { useSidebar } from '@/components/ui/sidebar';
import { briefPropertyLabels } from '@/data/label';
import { useMemo } from 'react';
import element_data from '@/data/elemens-data-v2';
import { ChemicalElement } from '@/types/global';

function ElementDetail() {
  const { element } = useSidebar();

  const elementProperties = useMemo(() => {
    if (!element) {
      return [];
    }

    return Object.keys(briefPropertyLabels)
      .filter((key) => element[key as keyof ChemicalElement])
      .map((key) => {
        const [label, unit] =
          briefPropertyLabels[key as keyof typeof briefPropertyLabels] || [];
        let value = element[key as keyof ChemicalElement];

        if (typeof value === 'number') {
          value = value.toLocaleString();
        }

        return [label, `${value} ${unit}`];
      });
  }, [element]);

  return <pre>{JSON.stringify(element, null, 2)}</pre>;
}

export default ElementDetail;
