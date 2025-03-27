'use client';

import { detailsPropertyLabels } from '@/data/label';
import { useEffect, useMemo, useState } from 'react';
import { ChemicalElement } from '@/types/global';
import { ElementTileDetail } from './element-tile-detail';
import { DetailImageRows, DetailRows } from './detail-rows';
import { useElementStore } from '@/hooks/use-element-store';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import ModelWrapper from '../atom/model-wrapper';

function ElementDetail() {
  const { element } = useElementStore();

  const elementProperties = useMemo(() => {
    if (!element) {
      return [];
    }

    return Object.keys(detailsPropertyLabels).map((key) => {
      const [label, unit] =
        detailsPropertyLabels[key as keyof typeof detailsPropertyLabels] || [];
      let value = element[key as keyof ChemicalElement];

      if (typeof value === 'number') {
        value = value.toString();
      }

      return {
        key,
        label,
        value: `${value ?? '-'} ${unit}`,
        element: element.name.toLowerCase().replace(/ /g, '-'),
      };
    });
  }, [element]);

  const [previewTab, setPreviewTab] = useState('overview');

  useEffect(() => {
    setPreviewTab('overview');
  }, [JSON.stringify(element)]);

  if (!element) {
    return null;
  }
  return (
    <div className="w-full max-w-md">
      <div className="flex flex-col justify-center">
        <Tabs defaultValue="overview" value={previewTab} className="!w-full">
          <TabsList>
            <TabsTrigger
              onClick={() => setPreviewTab('overview')}
              value="overview"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="picture"
              onClick={() => setPreviewTab('picture')}
            >
              Picture
            </TabsTrigger>
            <TabsTrigger
              value="atom-model"
              onClick={() => setPreviewTab('atom-model')}
            >
              Atom Model
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview">
            <ElementTileDetail
              symbol={element.symbol}
              name={element.name}
              atomicNumber={element.number as number}
              atomicMass={element.atomic_mass}
              category={element.category}
              source={element.source}
            />
          </TabsContent>
          <TabsContent value="picture">
            <DetailImageRows image={element.image} />
          </TabsContent>

          <TabsContent value="atom-model">
            <ModelWrapper modelUrl={element.bohr_model_3d} />
          </TabsContent>
        </Tabs>
        <div className="mt-2">
          {elementProperties.length &&
            elementProperties.map((p) => {
              return (
                <DetailRows
                  key={`${p.element}-${p.key}`}
                  label={p.label as keyof ChemicalElement}
                  value={p.value}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default ElementDetail;
