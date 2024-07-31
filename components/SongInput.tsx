'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTimer } from '@/contexts/TimerContext';

const SongInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('THE WEEKND STARBOY');
  const [taskId, setTaskId] = useState('');
  const { timer, setTimer } = useTimer();

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };
  
  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setPlaceholder('');
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (inputValue === '') {
      setPlaceholder('THE WEEKND STARBOY');
    }
  };

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
  };

  const fetchTaskCount = async () => {
    try {
      const response = await axios.get('https://bile.ngrok.app/queue-status');
      let taskCount = 0;
      if (response.data.queue.length) {
        taskCount = response.data.queue.length;
      }
      console.log(taskCount); // Log the task count
      startTimer(taskCount * 3); // Start the timer based on the task count
    } catch (error) {
      console.error('Error fetching queue status:', error);
    }
  };

  const handleSubmit = async () => {
    const response = await fetch('https://bile.ngrok.app/search-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ song_name: inputValue })
    });
    const data = await response.json();
    setTaskId(data.task_id);
    fetchTaskCount(); 
  };

  return (
    <div className='flex flex-col w-3/4'>
      <div className="flex flex-col bg-white opacity-90 py-4">
        <label className='text-black text-opacity-50 mx-4 lg:text-xl md:text-lg sm:text-md text-sm'>ENTER THE SONG NAME</label>
        <input
          className="bg-black md:text-white text-white placeholder-white mx-4 lg:text-4xl md:text-2xl sm:text-xl text-lg p-2"
          type="text"
          placeholder={placeholder}
          onFocus={handleFocus}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      <button
        className='bg-custom-blue text-black lg:text-5xl md:text-3xl sm:text-xl text-lg p-4'
        onClick={handleSubmit}
      >
        GENERATE
      </button>
    </div>
  );
};

export default SongInput;
