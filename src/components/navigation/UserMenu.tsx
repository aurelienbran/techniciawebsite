import React, { useState } from 'react';
import { User } from '../../types/auth';
import { useAuth } from '../../hooks/auth/useAuth';
import { LogOut, Settings, User as UserIcon } from 'lucide-react';

interface UserMenuProps {
  user: User;
}

export const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useAuth();

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100"
      >
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="h-8 w-8 rounded-full"
          />
        ) : (
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-blue-600 font-medium">
              {user.name.charAt(0)}
            </span>
          </div>
        )}
        <span className="text-sm font-medium text-gray-700">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <UserIcon className="mr-3 h-4 w-4" />
              Profile
            </button>
            <button
              className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
            >
              <Settings className="mr-3 h-4 w-4" />
              Settings
            </button>
            <button
              onClick={logout}
              className="flex w-full items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
              role="menuitem"
            >
              <LogOut className="mr-3 h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};