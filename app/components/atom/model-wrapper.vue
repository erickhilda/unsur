<script setup lang="ts">
// Port of model-wrapper.tsx (React Three Fiber → TresJS).
// Canvas + lights + OrbitControls + Suspense, parity with the R3F version.
// TresCanvas etc. resolve globally via the @tresjs/core Nuxt module injection.
import { OrbitControls } from '@tresjs/cientos'
import { MathUtils } from 'three'

import BohrModel from './bohr-model.vue'

defineProps<{
  modelUrl: string
}>()
</script>

<template>
  <div style="height: 13rem;">
    <TresCanvas clear-color="transparent">
      <TresPerspectiveCamera :position="[0, 0, 5]" :fov="75" :look-at="[0, 0, 0]" />
      <TresAmbientLight :intensity="0.7" color="#fff" />
      <TresPointLight :position="[5, 5, 5]" :intensity="1" color="#ffffff" />
      <Suspense>
        <BohrModel
          :model-url="modelUrl"
          :scale="5"
          :rotation="[Math.PI * -0.75, 0, 0]"
        />
        <template #fallback>
          <slot name="fallback" />
        </template>
      </Suspense>
      <OrbitControls
        :min-polar-angle="0"
        :max-polar-angle="Math.PI"
        :min-distance="4"
        :max-distance="8"
        enable-damping
        :damping-factor="0.1"
      />
    </TresCanvas>
  </div>
</template>
