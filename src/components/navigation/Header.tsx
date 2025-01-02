import React from 'react';
import { useLocation } from 'react-router-dom';
import { ReturnButton } from '../ui/ReturnButton';
import { useAuth } from '../../hooks/useAuth';

export const Header: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const showReturn = location.pathname !== '/';
  const welcomeMessage = user?.name ? `Welcome, ${user.name}` : 'Welcome';

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {showReturn && <ReturnButton to="/" />}
          <h2 className="text-lg font-medium text-gray-900">
            {welcomeMessage}
          </h2>
        </div>
      </div>
    </header>
  );
};