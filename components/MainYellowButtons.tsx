'use client'
import React from 'react';
import YellowButton from './YellowButton';
import { useRouter } from 'next/navigation';

const MainYellowButtons: React.FC = () => {
  const router = useRouter(); // Get the router instance

  const handleQueueNavigation = () => {
    router.push('/queue'); // Navigate to the /queue route
  };

  const handleDanceSearchNavigation = () => {
    router.push('/all-dances'); // Navigate to the /all-dances route
  };

  return (
    <div className='flex flex-row w-3/4 gap-4'>
      <div className="w-1/3">
        <YellowButton text="WATCH QUEUE" onClick={handleQueueNavigation} />
      </div>
      <div className="w-2/3">
        <YellowButton text="SEARCH FOR A DANCE" onClick={handleDanceSearchNavigation} />
      </div>
    </div>
  );
};

export default MainYellowButtons;
