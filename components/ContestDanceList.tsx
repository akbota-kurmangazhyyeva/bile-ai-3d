// components/ContestDanceList.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserIP } from '@/utils/ip';

interface ContestDance {
  unique_id: string;
  votes_count: number;
  fbx_url: string;
  mp3_url: string;
}

const ContestDanceList: React.FC = () => {
  const [dances, setDances] = useState<ContestDance[]>([]);

  useEffect(() => {
    const fetchDances = async () => {
      try {
        const response = await axios.get('https://bile.ngrok.app/all-contest-dances');
        setDances(response.data.contest_dances);
      } catch (error) {
        console.error('Error fetching dances', error);
      }
    };

    fetchDances();
  }, []);

  const handleVote = async (uniqueId: string) => {
    try {
      const ip_address = await getUserIP(); // Implement this function to get the IP address
      await axios.post(`https://bile.ngrok.app/contest_dance/${uniqueId}/vote`, { ip_address });
      alert('Vote added successfully!');
      // Update the state or refetch the data to reflect the vote count change
    } catch (error) {
      alert('You have already voted!');
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Contest Dances</h2>
      <ul className="space-y-4">
        {dances.map((dance) => (
          <li key={dance.unique_id} className="p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Unique ID:</p>
                <p className="text-lg font-medium">{dance.unique_id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Votes:</p>
                <p className="text-lg font-medium">{dance.votes_count}</p>
              </div>
              <button
                onClick={() => handleVote(dance.unique_id)}
                className="ml-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Vote
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContestDanceList;
