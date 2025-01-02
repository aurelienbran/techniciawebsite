import { useState, useCallback } from 'react';
import { apiRequest } from '../services/api/client';
import { useToast } from './useToast';
import { AppError } from '../utils/errorUtils';

interface UseApiState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export function useApi<T>() {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });
  const { show } = useToast();

  const request = useCallback(async (
    endpoint: string,
    options: RequestInit = {}
  ) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const data = await apiRequest<T>(endpoint, options);
      setState({ data, error: null, isLoading: false });
      return data;
    } catch (error) {
      const message = error instanceof AppError
        ? error.message
        : 'An unexpected error occurred';
      
      setState({ data: null, error: message, isLoading: false });
      show(message, 'error');
      throw error;
    }
  }, [show]);

  return {
    ...state,
    request,
  };
}