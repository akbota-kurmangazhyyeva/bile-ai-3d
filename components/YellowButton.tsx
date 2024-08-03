'use client'
import React from 'react';

interface YellowButtonProps {
  text: string;
  onClick?: () => void; // Optional onClick prop for handling click events
}

const YellowButton: React.FC<YellowButtonProps> = ({ text, onClick }) => {
  return (
    <div
      className='bg-custom-yellow flex lg:text-[1.25rem] md:text-[1.0rem] sm:text-[0.75rem] text-[0.5rem] md:p-2 p-1 items-center justify-center text-black cursor-pointer' 
      onClick={onClick} 
    >
      {text}
    </div>
  );
};

export default YellowButton;
