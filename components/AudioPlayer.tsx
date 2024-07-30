'use client'
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

interface AudioPlayerProps {
  url: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const newSound = new Howl({
      src: [url],
      loop: true,
      onend: () => setIsPlaying(false),
    });
    setSound(newSound);
    return () => {
      newSound.unload();
    };
  }, [url]);

  const handlePlay = () => {
    if (sound) {
      sound.play();
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (sound) {
      sound.stop();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center space-x-4">
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
  );
};

export default AudioPlayer;
