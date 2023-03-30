/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useEffect } from 'react';
import { useAnimations, useGLTF } from '@react-three/drei';
import { AnimationClip, Group, Mesh } from 'three';
import { GroupProps } from '@react-three/fiber';
import { GLTF } from 'three-stdlib';

type BohrModelProps = GroupProps & {
  modelUrl: string;
};

type GLTFResults = GLTF & {
  nodes: {
    [key: string]: Mesh;
  };
  animations: AnimationClip[];
};

export default function BohrModel({ modelUrl, ...props }: BohrModelProps) {
  const group = useRef<Group>(null!);
  const { nodes, animations } = useGLTF(modelUrl) as GLTFResults;

  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]]?.reset().fadeIn(0.5).play();

    // return () => actions[names[0]]?.fadeOut(0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      {Object.keys(nodes).map((key) => (
        <primitive key={key} object={nodes[key]} />
      ))}
    </group>
  );
}