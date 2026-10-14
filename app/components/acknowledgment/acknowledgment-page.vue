<script setup lang="ts">
import {
  ExternalLink,
  Database,
  Lightbulb,
  Code,
  Image as ImageIcon,
  Paintbrush,
} from 'lucide-vue-next';

// Technology data — mencerminkan stack Nuxt (post-migrasi)
const technologies = [
  { name: 'Nuxt', description: 'Vue framework with static site generation' },
  { name: 'Vue 3', description: 'Reactive UI framework' },
  { name: 'Tailwind CSS', description: 'Styling' },
  { name: 'shadcn-vue / Reka UI', description: 'UI components & primitives' },
  { name: 'D3.js', description: 'Data visualization' },
  { name: 'Three.js', description: '3D graphics' },
  { name: 'TresJS', description: 'Vue 3D renderer for Three.js' },
  { name: 'Pinia', description: 'Vue state management' },
  { name: 'TypeScript', description: 'Type safety' },
];
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-8">
    <div class="text-center space-y-4">
      <h1 class="text-3xl font-bold">Acknowledgements</h1>
      <p class="text-muted-foreground">
        This project would not be possible without the contributions and
        resources from the following sources.
      </p>
    </div>

    <!-- Data Sources -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <Database class="h-5 w-5 text-primary" />
        <h2 class="text-xl font-semibold">Data Sources</h2>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <!-- Periodic Table of Elements Data -->
        <div class="p-4 border rounded-lg space-y-2">
          <div class="flex items-center gap-2">
            <ExternalLink class="h-4 w-4 text-primary" />
            <span class="font-medium">Periodic Table of Elements Data</span>
          </div>
          <p class="text-sm text-muted-foreground">
            The data use here is a combination between 2 data source from
            the periodic table data curated by
            <NuxtLink
              to="https://github.com/Bowserinator/Periodic-Table-JSON/blob/master/PeriodicTableJSON.json"
              class="text-sm text-primary hover:underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Bowserinator
              <ExternalLink class="h-3 w-3" />
            </NuxtLink>
            and
            <NuxtLink
              to="https://gist.github.com/robertwb/22aa4dbfb6bcecd94f2176caa912b952"
              class="text-sm text-primary hover:underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              robertwb
              <ExternalLink class="h-3 w-3" />
            </NuxtLink>
          </p>
        </div>

        <!-- Images of Elements -->
        <div class="p-4 border rounded-lg space-y-2">
          <div class="flex items-center gap-2">
            <ImageIcon class="h-4 w-4 text-primary" />
            <span class="font-medium">Images of Elements</span>
          </div>
          <div class="space-y-2">
            <p class="text-sm text-muted-foreground">
              High-quality photographs of chemical elements under various
              conditions and states.
            </p>
            <NuxtLink
              to="https://images-of-elements.com/"
              class="text-sm text-primary hover:underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              View Source <ExternalLink class="h-3 w-3" />
            </NuxtLink>
          </div>
        </div>

        <!-- MatterViz -->
        <div class="p-4 border rounded-lg space-y-2">
          <div class="flex items-center gap-2">
            <Lightbulb class="h-4 w-4 text-primary" />
            <span class="font-medium">MatterViz</span>
          </div>
          <p class="text-sm text-muted-foreground">
            This project was inspired by
            <NuxtLink
              to="https://github.com/janosh/matterviz"
              class="text-sm text-primary hover:underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              MatterViz <ExternalLink class="h-3 w-3" />
            </NuxtLink>
            work on 3D Bohr model assets and educational resources for
            interactive element visualization.
          </p>
        </div>

        <!-- Design Inspiration -->
        <div class="p-4 border rounded-lg space-y-2">
          <div class="flex items-center gap-2">
            <Paintbrush class="h-4 w-4 text-primary" />
            <span class="font-medium">Design Inspiration</span>
          </div>
          <p class="text-sm text-muted-foreground">
            This project also take inspiration from the google experiments
            from
            <NuxtLink
              to="https://artsexperiments.withgoogle.com/periodic-table/"
              class="text-sm text-primary hover:underline inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              Experiment with Google Periodic Table
              <ExternalLink class="h-3 w-3" />
            </NuxtLink>
            for its clean and modern design and the way it present the data.
          </p>
        </div>
      </div>
    </section>

    <!-- Technologies & Libraries -->
    <section class="space-y-4">
      <div class="flex items-center gap-2">
        <Code class="h-5 w-5 text-primary" />
        <h2 class="text-xl font-semibold">Technologies & Libraries</h2>
      </div>
      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(tech, index) in technologies"
          :key="index"
          class="flex items-center gap-2"
        >
          <span class="font-medium">{{ tech.name }}</span>
          <span class="text-sm text-muted-foreground">- {{ tech.description }}</span>
        </div>
      </div>
    </section>

    <!-- Licenses -->
    <section class="space-y-4">
      <h2 class="text-xl font-semibold">Licenses & Attribution</h2>
      <div class="p-4 border rounded-lg space-y-2">
        <p class="text-sm text-muted-foreground">
          Element images are used under Creative Commons licenses. Each image
          includes proper attribution to the original photographers and
          sources.
        </p>
        <p class="text-sm text-muted-foreground">
          This project is open source and available under the MIT License.
        </p>
      </div>
    </section>

    <!-- Back to Home -->
    <div class="text-center pt-4">
      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 text-primary hover:underline"
      >
        ← Back to Periodic Table
      </NuxtLink>
    </div>
  </div>
</template>
