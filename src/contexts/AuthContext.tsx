import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import * as authService from '../services/supabase/auth';
import { useToast } from '../hooks/useToast';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: typeof authService.signIn;
  signUp: typeof authService.signUp;
  signOut: typeof authService.signOut;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { show } = useToast();

  useEffect(() => {
    async function loadSession() {
      try {
        const session = await authService.getCurrentSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Error loading session:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadSession();
  }, []);

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signIn: async (credentials) => {
      try {
        const { session } = await authService.signIn(credentials);
        setUser(session?.user ?? null);
        show('Successfully signed in', 'success');
      } catch (error) {
        show(error instanceof Error ? error.message : 'Failed to sign in', 'error');
        throw error;
      }
    },
    signUp: async (data) => {
      try {
        const { session } = await authService.signUp(data);
        setUser(session?.user ?? null);
        show('Successfully signed up', 'success');
      } catch (error) {
        show(error instanceof Error ? error.message : 'Failed to sign up', 'error');
        throw error;
      }
    },
    signOut: async () => {
      try {
        await authService.signOut();
        setUser(null);
        show('Successfully signed out', 'success');
      } catch (error) {
        show(error instanceof Error ? error.message : 'Failed to sign out', 'error');
        throw error;
      }
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}