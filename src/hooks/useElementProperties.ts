import { ChemicalElement } from '@/types/global';
import { useMemo } from 'react';

interface UseElementPropertiesProps {
  properties: Partial<Record<keyof ChemicalElement, [string, string]>>;
  element: ChemicalElement | null;
}

function useElementProperties({
  properties,
  element,
}: UseElementPropertiesProps) {
  const elementProperties = useMemo(() => {
    if (!element || !properties) {
      return [];
    }

    return Object.keys(properties)
      .filter((key) => element[key as keyof ChemicalElement])
      .map((key) => {
        const [label, unit] = properties[key as keyof typeof properties] || [];
        let value = element[key as keyof ChemicalElement];

        if (typeof value === 'number') {
          value = value.toLocaleString();
        }

        return [label, `${value} ${unit}`];
      });
  }, [properties, element]);

  return elementProperties;
}

// Path: src/hooks/useElementProperties.ts
export default useElementProperties;
