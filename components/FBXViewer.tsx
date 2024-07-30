'use client'
import React from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FBXModel from './FBXModel';

type FBXViewerProps = {
  url: string; // The URL of the FBX model
};

const FBXViewer: React.FC<FBXViewerProps> = ({ url }) => {
  return (
    <div className="canvas-container" style={{ width: '100%', height: '85vh' }}>
      <Canvas
        shadows
        camera={{ position: [0, 6, 50], fov: 75 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 0, 1]} intensity={1} castShadow />
        <FBXModel url={url} />
        <OrbitControls
          target={[-14, 7, 4]}
          minDistance={1}
          maxDistance={20}
          enableRotate={true}
          enableZoom={true}
          enableDamping={true}
        />
      </Canvas>
    </div>
  );
};

export default FBXViewer;
