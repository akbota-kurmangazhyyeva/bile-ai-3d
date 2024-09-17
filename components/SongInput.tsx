'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTimer } from '@/contexts/TimerContext';
import { useTranslations } from 'next-intl';

const SongInput = () => {
  const t = useTranslations('HomePage');
  const [inputValue, setInputValue] = useState('');
  const [placeholder, setPlaceholder] = useState(`${t('placeholder')}`);
  const [taskId, setTaskId] = useState('');
  const [loading, setLoading] = useState(false);
  const { timer, setTimer } = useTimer();
  const base_url = process.env.NEXT_PUBLIC_API_URL;

  const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };

  const handleFocus: React.FocusEventHandler<HTMLInputElement> = () => {
    setPlaceholder('');
  };

  const handleBlur: React.FocusEventHandler<HTMLInputElement> = () => {
    if (inputValue === '') {
      setPlaceholder(`${t('placeholder')}`);
    }
  };

  const startTimer = (minutes: number) => {
    setTimer(minutes * 60);
  };

  const fetchTaskCount = async () => {
    try {
      const response = await axios.get(`${base_url}/queue-status`);
      let taskCount = 0;
      console.log(response.data)
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
    setLoading(true); // Set loading to true when the request starts
    try {
      const response = await fetch(`${base_url}/search-song`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ song_name: inputValue })
      });
      const data = await response.json();
      setTaskId(data.task_id);
      localStorage.setItem('request_number', data.task_id);
      console.log(data.task_id);
      fetchTaskCount();
    } catch (error) {
      console.error('Error submitting song search:', error);
    } finally {
      setLoading(false); // Set loading to false when the request is complete
    }
  };

  return (
    <div className='flex flex-col w-3/4'>
      <div className="flex flex-col bg-white opacity-90 py-4">
        <label className='text-black text-opacity-50 mx-4 lg:text-xl md:text-lg sm:text-md text-sm'>{t('input')}</label>
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
        className='bg-custom-blue-button text-black lg:text-5xl md:text-3xl sm:text-xl text-lg p-4'
        onClick={handleSubmit}
        disabled={loading} 
      >
        {loading ? t('loading') : t('generate')}
      </button>
    </div>
  );
};

export default SongInput;
