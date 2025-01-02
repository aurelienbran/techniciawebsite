import React from 'react';
import { RefreshCw } from 'lucide-react';

interface RetryButtonProps {
  onClick: () => void;
  isRetrying?: boolean;
}

export const RetryButton: React.FC<RetryButtonProps> = ({ onClick, isRetrying }) => {
  return (
    <button
      onClick={onClick}
      disabled={isRetrying}
      className="flex items-center gap-2 px-3 py-1 text-sm text-red-600 hover:text-red-700 disabled:opacity-50"
    >
      <RefreshCw className={`w-4 h-4 ${isRetrying ? 'animate-spin' : ''}`} />
      Retry Message
    </button>
  );
};