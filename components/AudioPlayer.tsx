'use client';
import React, { useEffect, useRef } from 'react';

interface AudioPlayerProps {
  url: string;
  play: boolean;
  onPlay: () => void;
  onStop: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ url, play, onPlay, onStop }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    const handleEnded = () => {
      onStop();
    };

    const audio = audioRef.current;
    audio.loop = true;
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onStop]);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (play) {
      audioRef.current.play();
      onPlay();
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset to start
      onStop();
    }
  }, [play, onPlay, onStop]);

  return <audio ref={audioRef} src={url} style={{ display: 'none' }} />;
};

export default AudioPlayer;
