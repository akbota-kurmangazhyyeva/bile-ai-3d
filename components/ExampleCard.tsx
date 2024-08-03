import React from 'react';
import FBXViewer from './FBXViewer';


type ExampleCardProps = {
  fbx_url: string;
  mp3_url: string;
};

const ExampleCard: React.FC<ExampleCardProps> = ({ fbx_url, mp3_url }) => {
  return (
    <div className="example-card">
      <FBXViewer audioUrl={mp3_url} url={fbx_url} />
    </div>
  );
};

export default ExampleCard;
