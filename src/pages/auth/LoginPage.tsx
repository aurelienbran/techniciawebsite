import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoginForm } from '../../components/auth/LoginForm';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { useAuth } from '../../hooks/useAuth';
import { Wrench } from 'lucide-react';

export function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const { isAuthenticated, signIn, signUp, isLoading } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Wrench className="w-12 h-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isLogin ? 'Sign in to your account' : 'Create your account'}
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          {isLogin ? 'Access your maintenance dashboard' : 'Join TechnicIA to manage maintenance tasks'}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {isLogin ? (
            <LoginForm onSubmit={signIn} isLoading={isLoading} />
          ) : (
            <RegisterForm onSubmit={signUp} isLoading={isLoading} />
          )}

          <div className="mt-6">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full text-center text-sm text-blue-600 hover:text-blue-500"
            >
              {isLogin
                ? "Don't have an account? Register"
                : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}