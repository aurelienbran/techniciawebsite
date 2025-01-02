import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type,
  onClose,
  duration = 5000,
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <AlertCircle className="h-5 w-5" />,
    info: <Info className="h-5 w-5" />,
  };

  const styles = {
    success: 'bg-green-50 text-green-800 border-green-500',
    error: 'bg-red-50 text-red-800 border-red-500',
    info: 'bg-blue-50 text-blue-800 border-blue-500',
  };

  return (
    <div className={`rounded-lg border-l-4 p-4 shadow-md ${styles[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 flex-shrink-0 rounded hover:opacity-75"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};