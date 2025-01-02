import { useState, useCallback } from 'react';
import { ToastType } from '../components/ui/Toast';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = crypto.randomUUID();
    setToasts(prev => [...prev, { id, message, type }]);
    return id;
  }, []);

  const remove = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  return {
    toasts,
    show,
    remove,
  };
}