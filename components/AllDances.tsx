'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import ExampleCard from './ExampleCard';

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

const AllDances: React.FC = () => {
  const [dances, setDances] = useState<Dance[]>([]);
  const [visibleFbx, setVisibleFbx] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('AllDances');

  useEffect(() => {
    const fetchDances = async () => {
      try {
        const response = await axios.get<{ dances: Dance[]; total_pages: number }>(
          `https://bile.ngrok.app/all-dances?page=${currentPage}&page_size=${itemsPerPage}&search=${searchTerm}`
        );
        if (response.data) {
          setDances(response.data.dances);
          setTotalPages(response.data.total_pages);
          setError(null);
        } else {
          setDances([]);
          setTotalPages(1); // Default to 1 if no dances are found
        }
      } catch (error) {
        console.error('Error fetching the dances:', error);
        setError('Failed to fetch dances. Please try again later.');
      }
    };

    fetchDances();
  }, [currentPage, searchTerm]);

  const toggleFbxVisibility = (id: string) => {
    setVisibleFbx(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 when search term changes
  };

  const handleClick = () => {
    const newPathArray = pathname.split('/')[0];
    router.push(`/${newPathArray}`);
  };

  return (
    <div className='bg-custom-bg min-h-screen'>
      <button 
        className='text-custom-pink bg-custom-red flex item-center justify-center text-2xl pl-8 pr-8 pb-4 pt-4'
        onClick={handleClick}
      >
        {t('back')}
      </button>
      <div className="flex justify-center items-center">
        {/* <div className="flex flex-row gap-2 bg-custom-dark-green text-xl p-4 ml-8 mr-8 mb-4 sm:ml-6 sm:mr-6 sm:mb-6 md:ml-12 md:mr-12 md:mb-12 lg:ml-24 lg:mr-24 lg:mb-4 mt-8 w-full">
          <img src="/icons/search-icon.png" className='w-[25px] h-[25px]' />
          <input
            type="text"
            placeholder={`${t('SearchBar')}`}
            value={searchTerm}
            onChange={handleSearchChange}
            className="text-custom-green bg-custom-dark-green placeholder:text-custom-green"
          />
        </div> */}
      </div>
      <div className="flex justify-between gap-2 pl-8 pr-8 sm:pl-6 sm:pr-6 md:pl-12 md:pr-12 lg:pl-24 lg:pr-24 text-custom-pink pt-4">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          {t('previous')}
        </button>
        <span>
          {t('page')} {currentPage} {t('of')} {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          {t('next')}
        </button>
      </div>
      <div className="flex flex-col gap-4 pl-8 pr-8 pb-8 sm:pl-6 sm:pr-6 sm:pb-6 md:pl-12 md:pr-12 md:pb-12 lg:pl-24 lg:pr-24 lg:pb-24 pt-4">
        {dances.length > 0 ? (
          dances.map(dance => (
            <div key={dance._id} className="bg-custom-blue text-custom-light-blue flex flex-col p-4">
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <h3>{dance.song_name}</h3>
                  <p>{dance.task_id}</p>
                </div>
                <button onClick={() => toggleFbxVisibility(dance._id)}>
                  {visibleFbx[dance._id] ? `${t('hideDance')}` : `${t('showDance')}`}
                </button>
              </div>
              <div className="flex items-center justify-center">
                <div className={`lg:fbx-container sm:fbx-container-md ${visibleFbx[dance._id] ? 'visible' : 'hidden'}`}>
                  <ExampleCard fbx_url={dance.fbx_url} mp3_url={dance.mp3_url} />
                  <p className="text-white lg:text-xl md:text-lg text-md mt-4">{t('warning')} <span className='text-custom-yellow'> {t('play')}</span></p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-white'>{t('noDance')}</p>
        )}
      </div>
    </div>
  );
};

export default AllDances;
