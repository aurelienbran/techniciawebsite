import { useState } from 'react';
import { AuthState } from '../../types/auth';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

export function useAuthState() {
  const [state, setState] = useState<AuthState>(initialState);

  const setLoading = (isLoading: boolean) => {
    setState(prev => ({ ...prev, isLoading }));
  };

  const setError = (error: string | null) => {
    setState(prev => ({ ...prev, error, isLoading: false }));
  };

  const setUser = (user: AuthState['user']) => {
    setState({
      user,
      isAuthenticated: !!user,
      isLoading: false,
      error: null,
    });
  };

  const reset = () => {
    setState(initialState);
  };

  return {
    state,
    setLoading,
    setError,
    setUser,
    reset,
  };
}