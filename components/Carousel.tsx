'use client';
import React, { useState } from 'react';
import ExampleCardMain from './ExampleCardMain'; // Adjust the import based on your file structure

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const cards = [
    { song_name: 'TOCA ROCA', mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/aa710f47-31af-496e-b4e4-e628411e343c.mp3', fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/91af3e07-abe5-4783-a48f-a710719ba0f3.fbx' },
    { song_name: 'Blinding Lights', mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/413ffd0a-d407-4008-8b22-a2fe232ec1f5.mp3', fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/70b3bf12-d234-4f0c-8ef5-502d30502f16.fbx' },
    { song_name: 'Save Your Tears', mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/413ffd0a-d407-4008-8b22-a2fe232ec1f5.mp3', fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/64692bf7-1884-4f6e-b135-0f6c932258de.fbx' },
    { song_name: 'In Your Eyes', mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/413ffd0a-d407-4008-8b22-a2fe232ec1f5.mp3', fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/64692bf7-1884-4f6e-b135-0f6c932258de.fbx' },
    { song_name: 'I Feel It Coming', mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/413ffd0a-d407-4008-8b22-a2fe232ec1f5.mp3', fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/64692bf7-1884-4f6e-b135-0f6c932258de.fbx' },
  ];

  const nextCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length);
  };

  return (
    <div className="relative w-1/2 mx-auto">
      <ExampleCardMain
        song_name={cards[currentIndex].song_name}
        mp3_url={cards[currentIndex].mp3_url}
        fbx_url={cards[currentIndex].fbx_url}
      />
      <button
        onClick={prevCard}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer m-4"
        style={{
          width: 0,
          height: 0,
          borderTop: '15px solid transparent',
          borderBottom: '15px solid transparent',
          borderRight: '15px solid #34D399',
        }}
      />
      <button
        onClick={nextCard}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer m-4"
        style={{
          width: 0,
          height: 0,
          borderTop: '15px solid transparent',
          borderBottom: '15px solid transparent',
          borderLeft: '15px solid #34D399',
        }}
      />
    </div>
  );
};

export default Carousel;
