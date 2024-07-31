'use client'
import React, { createContext, useState, ReactNode, useContext } from 'react';

interface ModelLoadedContextProps {
  modelLoaded: boolean;
  setModelLoaded: (loaded: boolean) => void;
}

const ModelLoadedContext = createContext<ModelLoadedContextProps | undefined>(undefined);

export const ModelLoadedProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modelLoaded, setModelLoaded] = useState(false);

  return (
    <ModelLoadedContext.Provider value={{ modelLoaded, setModelLoaded }}>
      {children}
    </ModelLoadedContext.Provider>
  );
};

export const useModelLoaded = (): ModelLoadedContextProps => {
  const context = useContext(ModelLoadedContext);
  if (!context) {
    throw new Error('useModelLoaded must be used within a ModelLoadedProvider');
  }
  return context;
};
