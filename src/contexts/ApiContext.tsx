import React, { createContext, useContext } from 'react';
import { useApi } from '../hooks/useApi';

const ApiContext = createContext<ReturnType<typeof useApi> | undefined>(undefined);

export function ApiProvider({ children }: { children: React.ReactNode }) {
  const api = useApi();
  return (
    <ApiContext.Provider value={api}>
      {children}
    </ApiContext.Provider>
  );
}

export function useApiContext() {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be used within an ApiProvider');
  }
  return context;
}