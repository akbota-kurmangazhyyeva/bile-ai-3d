// TextContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTimer } from './TimerContext'; // Import useTimer from TimerContext

interface TextContextProps {
  text: string;
}

const TextContext = createContext<TextContextProps | undefined>(undefined);

export const TextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { timer } = useTimer(); // Use the timer from TimerContext
  const [text, setText] = useState<string>('Turn any music into dance'); // Initial text

  useEffect(() => {
    if (timer > 0) {
      setText('YOUR REQUEST IS QUEUED');
    } else {
      setText('YOUR ORDER IS READY');
      const timeout = setTimeout(() => {
        setText('Turn any music into dance'); // Reset text after 15 seconds
      }, 15000); // 15 seconds timeout

      // Cleanup function to clear the timeout if the component unmounts
      return () => clearTimeout(timeout);
    }
  }, [timer]);

  return (
    <TextContext.Provider value={{ text }}>
      {children}
    </TextContext.Provider>
  );
};

export const useText = (): TextContextProps => {
  const context = useContext(TextContext);
  if (context === undefined) {
    throw new Error('useText must be used within a TextProvider');
  }
  return context;
};
