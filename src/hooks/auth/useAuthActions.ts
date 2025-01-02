import { useCallback } from 'react';
import { LoginCredentials, RegisterData } from '../../types/auth';
import * as authApi from '../../services/auth/api';
import { useToast } from '../useToast';

export function useAuthActions(
  setLoading: (loading: boolean) => void,
  setError: (error: string | null) => void,
  setUser: (user: any) => void,
  reset: () => void,
) {
  const { show } = useToast();

  const handleError = useCallback((error: Error) => {
    setError(error.message);
    show(error.message, 'error');
  }, [setError, show]);

  const login = useCallback(async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authApi.loginRequest(credentials);
      setUser(user);
      show('Successfully logged in', 'success');
    } catch (error) {
      handleError(error as Error);
    }
  }, [setLoading, setError, setUser, show, handleError]);

  const register = useCallback(async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authApi.registerRequest(data);
      setUser(user);
      show('Successfully registered', 'success');
    } catch (error) {
      handleError(error as Error);
    }
  }, [setLoading, setError, setUser, show, handleError]);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await authApi.logoutRequest();
      reset();
      show('Successfully logged out', 'success');
    } catch (error) {
      handleError(error as Error);
    }
  }, [setLoading, setError, reset, show, handleError]);

  return {
    login,
    register,
    logout,
  };
}