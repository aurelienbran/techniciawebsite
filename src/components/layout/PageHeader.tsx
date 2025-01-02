import React from 'react';
import { ReturnButton } from '../ui/ReturnButton';

interface PageHeaderProps {
  title: string;
  description?: string;
  showReturn?: boolean;
  returnTo?: string;
  returnLabel?: string;
  children?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  showReturn = false,
  returnTo = '/',
  returnLabel,
  children,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4">
        {showReturn && (
          <ReturnButton to={returnTo} label={returnLabel} />
        )}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {description && (
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          )}
        </div>
      </div>
      {children && <div className="mt-4">{children}</div>}
    </div>
  );
};