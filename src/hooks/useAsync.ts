import { useState, useCallback } from 'react';
import { AppError, handleError } from '../utils/errorUtils';

interface AsyncState<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
}

export function useAsync<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(async (promise: Promise<T>) => {
    setState({ data: null, error: null, isLoading: true });

    try {
      const data = await promise;
      setState({ data, error: null, isLoading: false });
      return data;
    } catch (error) {
      const errorMessage = handleError(error);
      setState({ data: null, error: errorMessage, isLoading: false });
      throw error;
    }
  }, []);

  return {
    ...state,
    execute,
  };
}