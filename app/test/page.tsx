import { useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [voteOption, setVoteOption] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/vote', { uniqueId, voteOption });
      setMessage(response.data.message);
    } catch (error) {
      setMessage((error as any).response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-lg">
        <h1 className="text-2xl mb-4">Voting System</h1>
        <label className="block mb-2">
          Unique ID:
          <input
            type="text"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </label>
        <label className="block mb-4">
          Vote Option:
          <select
            value={voteOption}
            onChange={(e) => setVoteOption(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="">Select an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
        </label>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700"
        >
          Submit Vote
        </button>
        {message && <p className="mt-4 text-red-600">{message}</p>}
      </form>
    </div>
  );
};

export default Home;
