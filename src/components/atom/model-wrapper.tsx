'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import BohrModel from './bohr-model';

function ModelWrapper({ modelUrl }: { modelUrl: string }) {
  return (
    <Canvas style={{ height: '13rem' }}>
      <ambientLight intensity={0.7} color="#fff" />
      <Suspense fallback={null}>
        <pointLight position={[5, 5, 5]} intensity={1} color={0xffffff} />

        <BohrModel
          modelUrl={modelUrl}
          scale={5}
          rotation={[Math.PI * -0.75, 0, 0]}
        />
      </Suspense>
      <OrbitControls
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        minDistance={5}
        maxDistance={8}
        enableDamping
        dampingFactor={0.1}
      />
    </Canvas>
  );
}

export default ModelWrapper;
