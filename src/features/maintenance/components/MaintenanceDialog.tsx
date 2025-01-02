import React from 'react';
import { MaintenanceForm } from './MaintenanceForm';
import { MaintenanceFormData } from '../../../types/maintenance';
import { X } from 'lucide-react';

interface MaintenanceDialogProps {
  onClose: () => void;
  onSubmit: (data: MaintenanceFormData) => void;
  isLoading?: boolean;
}

export const MaintenanceDialog: React.FC<MaintenanceDialogProps> = ({
  onClose,
  onSubmit,
  isLoading
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">New Maintenance Request</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <MaintenanceForm onSubmit={onSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
};