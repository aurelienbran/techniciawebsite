import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingMessage: React.FC = () => {
  return (
    <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
      <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
      <span className="text-sm text-gray-600">
        Searching maintenance records...
      </span>
    </div>
  );
};