import React from 'react';
import Carousel from '../../components/Carousel';

const App: React.FC = () => {
  const items = [
    {
      song_name: 'Starboy',
      mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/413ffd0a-d407-4008-8b22-a2fe232ec1f5.mp3',
      fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/64692bf7-1884-4f6e-b135-0f6c932258de.fbx',
    },
    {
      song_name: 'Blinding Lights',
      mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/413ffd0a-d407-4008-8b22-a2fe232ec1f5.mp3',
      fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/64692bf7-1884-4f6e-b135-0f6c932258de.fbx',
    },
    {
        song_name: 'Blinding Lights',
        mp3_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/renders/413ffd0a-d407-4008-8b22-a2fe232ec1f5.mp3',
        fbx_url: 'https://nf-upload.s3.eu-north-1.amazonaws.com/fbx/64692bf7-1884-4f6e-b135-0f6c932258de.fbx',
      },
    // Add more items as needed
  ];

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <Carousel />
    </div>
  );
};

export default App;
