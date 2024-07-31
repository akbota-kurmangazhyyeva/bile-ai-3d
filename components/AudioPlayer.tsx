'use client';
import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';

interface AudioPlayerProps {
  url: string;
  play: boolean;
  onPlay: () => void;
  onStop: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, play, onPlay, onStop }) => {
  const [sound, setSound] = useState<Howl | null>(null);

  useEffect(() => {
    const newSound = new Howl({
      src: [url],
      loop: true,
      onend: () => onStop(),
    });
    setSound(newSound);
    return () => {
      newSound.unload();
    };
  }, [url, onStop]);

  useEffect(() => {
    if (play && sound) {
      sound.play();
      onPlay();
    } else if (!play && sound) {
      sound.stop();
      sound.seek(0); // Reset to start
      onStop();
    }
  }, [play, sound, onPlay, onStop]);

  return null; // No UI needed for the player
};

export default AudioPlayer;
