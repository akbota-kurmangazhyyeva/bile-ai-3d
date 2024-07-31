'use client';
import React, { createContext, useState, useContext, useEffect } from 'react';

interface TimerContextProps {
  timer: number;
  setTimer: React.Dispatch<React.SetStateAction<number>>;
}

const TimerContext = createContext<TimerContextProps | undefined>(undefined);

export const TimerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    // Initialize the timer to zero at the start
    setTimer(0);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          return newTimer >= 0 ? newTimer : 0; // Prevent going below zero
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  return (
    <TimerContext.Provider value={{ timer, setTimer }}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = (): TimerContextProps => {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
};
