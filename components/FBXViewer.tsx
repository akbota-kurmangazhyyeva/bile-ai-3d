'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import FBXModel from './FBXModel';
import AudioPlayer from './AudioPlayer';
import * as THREE from 'three';

type FBXViewerProps = {
  url: string; 
  audioUrl: string; 
};

const FBXViewer: React.FC<FBXViewerProps> = ({ url, audioUrl }) => {
  const [play, setPlay] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const modelRef = useRef<THREE.Group>(null);
  console.log('url', url);
  
  const handleModelLoaded = useCallback(() => {
    setModelLoaded(true);
  }, []);

  const handlePlay = () => {
    setPlay(true);
  };

  const handleStop = () => {
    setPlay(false);
  };

  // Reset play state when URL changes
  useEffect(() => {
    setPlay(false);
    setModelLoaded(false);
  }, [url]);

  return (
    <div className="canvas-container" style={{ width: '100%', height: '85vh' }}>
      <div className="flex flex-col h-full w-full">
      <Canvas
        shadows
        camera={{ position: [0, 6, 50], fov: 75 }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 0, 1]} intensity={1} castShadow />
        <FBXModel url={url} play={play} ref={modelRef} onModelLoaded={handleModelLoaded} />
        <OrbitControls
          target={[-14, 7, 4]}
          minDistance={1}
          maxDistance={20}
          enableRotate={true}
          enableZoom={true}
          enableDamping={true}
        />
      </Canvas>
      
      <AudioPlayer url={audioUrl} play={play} onPlay={handlePlay} onStop={handleStop} />

      <div className="flex items-center space-x-4 mt-4"> {/* Added margin-top for spacing */}
        <button
          onClick={handlePlay}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Play
        </button>
        <button
          onClick={handleStop}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Stop
        </button>
      </div>
      </div>
    </div>
  );
};

export default FBXViewer;