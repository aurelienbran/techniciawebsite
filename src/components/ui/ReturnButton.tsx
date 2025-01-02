import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface ReturnButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

export const ReturnButton: React.FC<ReturnButtonProps> = ({
  to,
  label = 'Back',
  className = '',
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors ${className}`}
      type="button"
    >
      <ArrowLeft className="h-4 w-4" />
      {label}
    </button>
  );
};