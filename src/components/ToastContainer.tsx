import React from 'react';
import { Toast } from './ui/Toast';
import { useToast } from '../hooks/useToast';

export const ToastContainer: React.FC = () => {
  const { toasts, remove } = useToast();

  return (
    <>
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => remove(toast.id)}
        />
      ))}
    </>
  );
};