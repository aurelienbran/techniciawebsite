import React from 'react';
import { MaintenanceStatus, MaintenancePriority } from '../../../types/maintenance';
import { Filter } from 'lucide-react';

interface MaintenanceFiltersProps {
  onFilterChange: (filters: MaintenanceFilters) => void;
  activeStatus?: MaintenanceStatus;
}

export interface MaintenanceFilters {
  status?: MaintenanceStatus;
  priority?: MaintenancePriority;
}

export const MaintenanceFilters: React.FC<MaintenanceFiltersProps> = ({
  onFilterChange,
  activeStatus
}) => {
  const statuses: MaintenanceStatus[] = ['pending', 'in-progress', 'completed', 'cancelled'];

  return (
    <div className="flex items-center gap-2 pb-4 border-b">
      <div className="flex items-center gap-2">
        {statuses.map(status => (
          <button
            key={status}
            onClick={() => onFilterChange({ status })}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeStatus === status
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>
      
      <button className="ml-auto p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
        <Filter className="w-4 h-4" />
      </button>
    </div>
  );
};