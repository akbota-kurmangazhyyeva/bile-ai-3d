// components/AddDanceForm.tsx
'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AddDanceForm: React.FC = () => {
  const [uniqueId, setUniqueId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [userSurname, setUserSurname] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('https://bile-contest-h5a6gcfre7ckedf2.eastus-01.azurewebsites.net/contest_dance', {
        unique_id: uniqueId,
        user_name: userName,
        user_surname: userSurname
      });
      alert('Dance added successfully!');
    } catch (error) {
      alert('Error adding dance');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Add Your Dance</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="uniqueId" className="block text-sm font-medium text-gray-700">
            Unique ID:
          </label>
          <input
            type="text"
            id="uniqueId"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            User Name:
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="userSurname" className="block text-sm font-medium text-gray-700">
            User Surname:
          </label>
          <input
            type="text"
            id="userSurname"
            value={userSurname}
            onChange={(e) => setUserSurname(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Dance
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddDanceForm;
