import React from 'react';
import ExampleCard from './ExampleCard';
import ExampleInfo from './ExampleInfo';

type ExampleCardMainProps = {
  fbx_url: string;
  mp3_url: string;
  song_name: string;
};

const ExampleCardMain: React.FC<ExampleCardMainProps> = ({ fbx_url, mp3_url, song_name }) => {
  return (
    <div>
      <ExampleCard fbx_url={fbx_url} mp3_url={mp3_url} />
      <ExampleInfo text={song_name} />
    </div>
  );
};

export default ExampleCardMain;
