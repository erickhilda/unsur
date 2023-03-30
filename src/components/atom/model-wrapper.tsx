'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import BohrModel from './bohr-model';

function ModelWrapper({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas>
      <ambientLight intensity={0.7} color="#fff" />
      <Suspense fallback={null}>
        <BohrModel
          modelUrl={modelUrl}
          scale={5}
          rotation={[Math.PI * -0.5, 0, 0]}
        />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}

export default ModelWrapper;
