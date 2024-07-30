'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const SongInput = () => {
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState('THE WEEKND STARBOY');
  const [taskId, setTaskId] = useState('');
  const [timer, setTimer] = useState(0);

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };
  
  const handleFocus: React.FocusEventHandler<HTMLInputElement> | undefined = () => {
    setPlaceholder('');
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> | undefined = (event) => {
    if (inputValue === '') {
      setPlaceholder('THE WEEKND STARBOY');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(taskId);
  };

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
  };

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const fetchTaskCount = async () => {
    const response = await axios.get('https://0796-104-63-22-122.ngrok-free.app/queue-status');
    console.log(response.data.queue.length)
    const data = await response.data;
    const taskCount = data.length;
    setTimer(response.data.queue.length * 3*60 - 180); // Start the timer based on the task count
  };

  const handleSubmit = async () => {
    const response = await fetch('https://0796-104-63-22-122.ngrok-free.app/search-song', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ song_name: inputValue })
    });
    const data = await response.json();
    setTaskId(data.task_id);
    fetchTaskCount(); // Fetch task count and start the timer
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
      {taskId && (
        <div className='mt-4'>
          <p className='text-white'>Task ID: {taskId}</p>
          <button onClick={handleCopy} className='bg-gray-200 text-black p-2 mt-2'>Copy Task ID</button>
        </div>
      )}
      {timer > 0 && (
        <div className='mt-4'>
          <p className='text-white'>Estimated Time Remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)} minutes</p>
        </div>
      )}
    </div>
  );
}

export default SongInput;
