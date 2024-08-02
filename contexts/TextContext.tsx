// TextContext.tsx
'use client'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTimer } from './TimerContext'; // Import useTimer from TimerContext
import {useTranslations} from 'next-intl';

interface TextContextProps {
  text: string;
}

const TextContext = createContext<TextContextProps | undefined>(undefined);

export const TextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { timer } = useTimer(); // Use the timer from TimerContext
  const [text, setText] = useState<string>('Turn any music into dance'); // Initial text
  const t = useTranslations('HomePage');

  useEffect(() => {
    if (timer > 0) {
      setText(`${t('header2')}`);
    } else {
      setText(`${t('header3')}`);
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
