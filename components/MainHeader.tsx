'use client';
import { useText } from '@/contexts/TextContext';
import { useTimer } from '@/contexts/TimerContext';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for Toastify

const MainHeader = () => {
  const { text } = useText();
  const { timer } = useTimer();

  const handleCopy = () => {
    const request_number = localStorage.getItem('request_number')
    if (request_number) {
      navigator.clipboard.writeText(request_number) // Use the Clipboard API to copy the text
        .then(() => {
          toast.success(`Request number #${request_number} copied to clipboard!`); // Use toast to show a success message
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
          toast.error('Failed to copy request number'); // Show an error message if copying fails
        });
    }
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={true} closeOnClick={true} />
      <div className={`bg-custom-red md:h-[100px] h-[64px] flex flex-col ${timer > 0 ? 'justify-end' : 'justify-center'} items-center`}>
        <div className="flex items-center justify-center">
          <h1 className='lg:text-4xl md:text-2xl sm:text-xl text-md text-custom-pink'>{text}</h1>
        </div>
        {timer > 0 && ( // Conditionally render the second box based on the timer
          <div className="flex justify-center items-end">
            <div 
              className='bg-custom-pink bg-opacity-80 w-[250px] h-[30px] rounded-t-[10px] text-xs flex items-center justify-center cursor-pointer' 
              onClick={handleCopy} // Add click handler to the div
            >
              #{localStorage.getItem('request_number')}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default MainHeader;
