import React from 'react';
import { Wrench, Settings } from 'lucide-react';

export const ChatHeader: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Wrench className="h-8 w-8 text-blue-600" />
          <h1 className="ml-3 text-xl font-semibold text-gray-900">TechnicIA</h1>
        </div>
        <button className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-colors">
          <Settings className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
};