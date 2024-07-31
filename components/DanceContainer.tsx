import React, { useContext } from 'react';
import ExampleCard from './ExampleCard';
import { useModelLoaded } from '../contexts/ModelLoadedContext'; // Adjust the import path as needed

interface Dance {
    _id: string;
    song_name: string;
    mp4_url: string;
    pkl_url: string;
    fbx_url: string;
    mp3_url: string;
    unique_id: string;
    task_id: string;
}

type DanceContainerProps = {
    dance: Dance;
    toggleFbxVisibility: (id: string) => void; // Change the type to accept only id
    visibleFbx: { [key: string]: boolean }; // Added this line
};

const DanceContainer: React.FC<DanceContainerProps> = ({ dance, toggleFbxVisibility, visibleFbx }) => {
  const { modelLoaded } = useModelLoaded(); // Access loading state from context

  return (
    <div key={dance._id} className="dance-card">
      <h3>{dance.song_name}</h3>
      <p>Task ID: {dance.task_id}</p>
      <button onClick={() => toggleFbxVisibility(dance._id)}>
        {visibleFbx[dance._id] ? 'Hide dance' : 'Show dance'}
      </button>
      <div className={`fbx-container ${visibleFbx[dance._id] ? 'visible' : 'hidden'}`}>
        {modelLoaded ? (
          <p className="text-white">Loading...</p> // Show loading text when model is loading
        ) : (
          <ExampleCard fbx_url={dance.fbx_url} mp3_url={dance.mp3_url} />
        )}
      </div>
    </div>
  );
};

export default DanceContainer;
