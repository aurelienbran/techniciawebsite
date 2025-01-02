import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onDismiss: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400" />
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700">{message}</p>
        </div>
        <button
          onClick={onDismiss}
          className="ml-auto text-red-400 hover:text-red-500"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};