"use client"; // Указываем, что это клиентский компонент

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type FBXModelProps = {
  url: string;
};

const FBXModel: React.FC<FBXModelProps> = ({ url }) => {
  const fbxRef = useFBX(encodeURI(url));
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState(0);

  useEffect(() => {
    if (fbxRef.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbxRef);
      const action = mixer.current.clipAction(fbxRef.animations[0]);
      action.play();

      action.clampWhenFinished = true;
      action.loop = THREE.LoopRepeat; // Make the animation loop indefinitely

      return () => {
        if (mixer.current) {
          mixer.current.stopAllAction();
          mixer.current.uncacheClip(fbxRef.animations[0]);
        }
      };
    }
  }, [fbxRef]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={fbxRef} scale={[0.04, 0.04, 0.04]} position={[0, 0, 12]} />;
};

export default FBXModel;