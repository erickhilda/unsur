<script setup lang="ts">
// Port of app/page.tsx (home / periodic table page).
import ElementTile from '~/components/periodic-table/element-tile.vue'
import PeriodicTable from '~/components/periodic-table/periodic-table.vue'
import elementData from '~/data/elemens-data-v2'
import { lantinideAndAntinide } from '~/data/label'
import { useElementStore } from '~/stores/element-store'

useHead({
  title: 'Unsur - Table Periodic of Element',
  htmlAttrs: { lang: 'en' },
})

const { setElementOnSidebar } = useElementStore()
</script>

<template>
  <main class="m-4">
    <PeriodicTable>
      <ElementTile
        v-for="el in elementData"
        :key="el.name"
        :element="el"
        :style="{
          gridArea: `${el.row} / ${el.column} / auto / auto`,
        }"
        @click="setElementOnSidebar(el)"
      />
      <ElementTile
        v-for="el in lantinideAndAntinide"
        :key="el.name"
        :element="el"
        :style="{
          gridArea: `${el.row} / ${el.column} / auto / auto`,
          cursor: 'not-allowed',
        }"
      />
    </PeriodicTable>
  </main>
</template>
