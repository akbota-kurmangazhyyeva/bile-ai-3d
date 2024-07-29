"use client"; // Indicates that this is a client-side component

import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useFBX, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type FBXModelProps = {
  url: string; // The URL of the FBX model
};

const FBXModel: React.FC<FBXModelProps> = ({ url }) => {
  const fbxRef = useFBX(url); // Directly use the HTTPS URL
  const mixer = useRef<THREE.AnimationMixer | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const color = new THREE.Color("#F552C5");

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

  return <primitive object={fbxRef} scale={[0.045, 0.045, 0.045]} position={[10, -2, 0]} />;
};

type FBXViewerProps = {
  url: string; // The URL of the FBX model
};

const FBXViewer: React.FC<FBXViewerProps> = ({ url }) => {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 6, 10], fov: 75 }} // Camera settings: initial position and field of view (fov)
      style={{ height: '100%', width: '100%' }}
      className='bg-fit bg-custom-ani' // Styles for the 3D scene container
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[0, 0, 1]} intensity={1} castShadow />
      <FBXModel url={url} />
      <OrbitControls
        target={[0, 5, 0]}
        minDistance={1}
        maxDistance={20}
        enableRotate={true}
        enableZoom={true}
        enableDamping={true}
      />
    </Canvas>
  );
};

export default FBXViewer;
