import React from 'react';
import { NavLink } from 'react-router-dom';
import { MessageSquare, FileText, Settings, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const Sidebar: React.FC = () => {
  const { signOut } = useAuth();

  const menuItems = [
    { icon: Home, label: 'Dashboard', path: '/' },
    { icon: MessageSquare, label: 'Chat', path: '/chat' },
    { icon: FileText, label: 'Documents', path: '/documents' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-full flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">TechnicIA</h1>
        </div>

        <nav className="flex-1 py-4">
          {menuItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium ${
                  isActive
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-600 hover:text-blue-700 hover:bg-gray-50'
                }`
              }
            >
              <Icon className="w-5 h-5 mr-3" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={signOut}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
};