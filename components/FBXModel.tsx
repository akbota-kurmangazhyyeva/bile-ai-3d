'use client';
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useFBX } from '@react-three/drei'; // Import from drei
import { useFrame } from '@react-three/fiber'; // Correctly import useFrame from fiber
import * as THREE from 'three';

type FBXModelProps = {
  url: string;
  play: boolean;
  onModelLoaded: () => void;
};

const FBXModel = forwardRef<THREE.Group, FBXModelProps>(({ url, play, onModelLoaded }, ref) => {
  const fbx = useFBX(encodeURI(url));
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  useImperativeHandle(ref, () => fbx, [fbx]);

  useEffect(() => {
    if (fbx.animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(fbx);
      const action = mixer.current.clipAction(fbx.animations[0]);
      
      onModelLoaded(); // Notify that the model is loaded

      return () => {
        if (mixer.current) {
          mixer.current.stopAllAction();
          mixer.current.uncacheClip(fbx.animations[0]);
        }
      };
    }
  }, [fbx, onModelLoaded]);

  useEffect(() => {
    if (mixer.current) {
      const action = mixer.current.clipAction(fbx.animations[0]);
      if (play) {
        action.reset().play();
      } else {
        action.stop();
      }
    }
  }, [play, fbx]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive object={fbx} scale={[0.04, 0.04, 0.04]} position={[0, 0, 12]} />;
});

FBXModel.displayName = 'FBXModel';

export default FBXModel;
