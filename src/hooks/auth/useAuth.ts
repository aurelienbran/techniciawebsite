import { useEffect } from 'react';
import { useAuthState } from './useAuthState';
import { useAuthActions } from './useAuthActions';
import { getCurrentUserRequest } from '../../services/auth/api';

export function useAuth() {
  const {
    state,
    setLoading,
    setError,
    setUser,
    reset,
  } = useAuthState();

  const actions = useAuthActions(
    setLoading,
    setError,
    setUser,
    reset,
  );

  useEffect(() => {
    async function checkAuth() {
      try {
        const user = await getCurrentUserRequest();
        setUser(user);
      } catch (error) {
        reset();
      }
    }
    checkAuth();
  }, []);

  return {
    ...state,
    ...actions,
  };
}