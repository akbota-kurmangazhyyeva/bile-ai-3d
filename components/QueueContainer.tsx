'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExampleCard from './ExampleCard';
import { useRouter } from 'next/navigation';

// Define the type for your dance objects
interface Queue {
    queue_position: number,
    unique_id: string,
    song_name: string
}

const Queue: React.FC = () => {
  const [queue, setQueue] = useState<Queue[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get<{ queue: Queue[] }>('https://bile.ngrok.app/queue-status');
        console.log(response.data);
        if (response.data && response.data.queue) {
          setQueue(response.data.queue);
          setError(null); // Reset error if the request is successful
        } else {
          setQueue([]); // Set to an empty array if response structure is not as expected
        }
      } catch (error) {
        console.error('Error fetching the dances:', error);
        setQueue([]); // Set to an empty array in case of an error
        setError('Failed to fetch dances. Please try again later.');
      }
    })();
  }, []);


  const filteredDances = queue.filter(
    (queue) =>
      queue.song_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      queue.unique_id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredDances.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredDances.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className='bg-custom-bg min-h-screen'>
      <button 
        className='text-custom-pink bg-custom-red flex item-center justify-center text-2xl pl-8 pr-8 pb-4 pt-4'
        onClick={() => router.push('/')}
      >
        Back
      </button>
      <div className="flex justify-center items-center">
        <div className="flex flex-row gap-2 bg-custom-dark-green text-xl p-4 ml-24 mr-24 mt-8 w-full">
          <img src="/icons/search-icon.png" className='w-[25px] h-[25px]'/>
          <input
            type="text"
            placeholder="Search by id or name"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); 
            }}
            className="text-custom-green bg-custom-dark-green placeholder:text-custom-green"
          />
        </div>
      </div>
      <div className="flex justify-between  gap-2 ml-24 mr-24 text-custom-pink pt-8">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
      <div className="flex flex-col gap-4 pl-24 pr-24 pb-24 pt-8">
        {currentItems.length > 0 ? (
          currentItems.map((dance) => (
            <div key={dance.unique_id} className="bg-custom-blue text-custom-light-blue flex flex-col p-4">
                <div className="flex flex-row justify-between">
                  <div className="flex flex-col">
                    <h3 className='text-custom-yellow'>{dance.song_name}</h3>
                    <p>{dance.unique_id}</p>
                  </div>
                  <div className='flex items-center justify-center'><h3 className='text-custom-yellow text-xl'>{dance.queue_position}</h3></div>
                </div>
            </div>
          ))
        ) : (
          <p>No dances available.</p>
        )}
      </div>
    </div>
  );
};

export default Queue;
