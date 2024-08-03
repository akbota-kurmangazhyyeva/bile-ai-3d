'use client'
import React from 'react';
import YellowButton from './YellowButton';
import { useRouter, usePathname } from 'next/navigation';
import {useTranslations} from 'next-intl';

const MainYellowButtons: React.FC = () => {
  const router = useRouter(); 
  const pathname = usePathname();
  const t = useTranslations('HomePage');
  const handleQueueNavigation = () => {
    router.push(`${pathname}/queue`); 
  };

  const handleDanceSearchNavigation = () => {
    router.push(`${pathname}/all-dances`); 
  };

  return (
    <div className='flex flex-row w-3/4 gap-4'>
      <div className="w-1/3">
        <YellowButton text={`${t('queue')}`} onClick={handleQueueNavigation} />
      </div>
      <div className="w-2/3">
        <YellowButton text={`${t('dance')}`} onClick={handleDanceSearchNavigation} />
      </div>
    </div>
  );
};

export default MainYellowButtons;
