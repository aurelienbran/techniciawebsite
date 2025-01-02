import { useCallback, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import * as authService from '../services/supabase/auth';
import { LoginCredentials, RegisterData } from '../types/auth';
import { useToast } from './useToast';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });
  
  const { show } = useToast();

  useEffect(() => {
    async function loadUser() {
      try {
        const session = await authService.getCurrentSession();
        setState({
          user: session?.user ?? null,
          isAuthenticated: !!session,
          isLoading: false,
        });
      } catch (error) {
        setState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    }

    loadUser();
  }, []);

  const signIn = useCallback(async (credentials: LoginCredentials) => {
    try {
      const { session } = await authService.signIn(credentials);
      setState({
        user: session?.user ?? null,
        isAuthenticated: !!session,
        isLoading: false,
      });
      show('Successfully signed in', 'success');
    } catch (error) {
      show(error instanceof Error ? error.message : 'Failed to sign in', 'error');
      throw error;
    }
  }, [show]);

  const signUp = useCallback(async (data: RegisterData) => {
    try {
      const { session } = await authService.signUp(data);
      setState({
        user: session?.user ?? null,
        isAuthenticated: !!session,
        isLoading: false,
      });
      show('Successfully created account', 'success');
    } catch (error) {
      show(error instanceof Error ? error.message : 'Failed to create account', 'error');
      throw error;
    }
  }, [show]);

  const signOut = useCallback(async () => {
    try {
      await authService.signOut();
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
      show('Successfully signed out', 'success');
    } catch (error) {
      show(error instanceof Error ? error.message : 'Failed to sign out', 'error');
      throw error;
    }
  }, [show]);

  return {
    ...state,
    signIn,
    signUp,
    signOut,
  };
}