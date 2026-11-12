<script setup lang="ts">
// Port of element-detail.tsx (sidebar detail panel: tabs overview/picture/atom-model).
import { ref, computed, watch } from 'vue'
import type { ChemicalElement } from '~/types/global'
import { detailsPropertyLabels } from '~/data/label'
import { useElementStore } from '~/stores/element-store'
import ElementTileDetail from './element-tile-detail.vue'
import DetailRows from './detail-rows.vue'
import DetailImageRows from './detail-image-rows.vue'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '~/components/ui/tabs'
import ModelWrapper from '~/components/atom/model-wrapper.vue'

const { element } = storeToRefs(useElementStore())

const previewTab = ref('overview')

// Reset to overview whenever element changes (React: useEffect on JSON.stringify(element)).
watch(element, () => {
  previewTab.value = 'overview'
})

const elementProperties = computed(() => {
  const el = element.value as ChemicalElement | null
  if (!el) return []

  return Object.keys(detailsPropertyLabels).map((key) => {
    const [label, unit] =
      detailsPropertyLabels[key as keyof typeof detailsPropertyLabels] || []
    let value = el[key as keyof ChemicalElement]
    if (typeof value === 'number') value = value.toString()
    return {
      key,
      label,
      value: `${value ?? '-'} ${unit}`,
      element: el.name.toLowerCase().replace(/ /g, '-'),
    }
  })
})
</script>

<template>
  <div v-if="element" class="w-full max-w-md">
    <div class="flex flex-col justify-center">
      <Tabs v-model="previewTab" default-value="overview" class="!w-full">
        <TabsList>
          <TabsTrigger value="overview" @click="previewTab = 'overview'">
            Overview
          </TabsTrigger>
          <TabsTrigger value="picture" @click="previewTab = 'picture'">
            Picture
          </TabsTrigger>
          <TabsTrigger
            value="atom-model"
            @click="previewTab = 'atom-model'"
          >
            Atom Model
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <ElementTileDetail
            :symbol="element.symbol"
            :name="element.name"
            :atomic-number="element.number as number"
            :atomic-mass="element.atomic_mass"
            :category="element.category"
            :source="element.source"
          />
        </TabsContent>
        <TabsContent value="picture">
          <DetailImageRows :image="element.image" />
        </TabsContent>
        <TabsContent value="atom-model">
          <ClientOnly>
            <ModelWrapper :model-url="element.bohr_model_3d" />
          </ClientOnly>
        </TabsContent>
      </Tabs>
      <div class="mt-2">
        <template v-if="elementProperties.length">
          <DetailRows
            v-for="p in elementProperties"
            :key="`${p.element}-${p.key}`"
            :label="p.label as keyof ChemicalElement"
            :value="p.value"
          />
        </template>
      </div>
    </div>
  </div>
</template>
