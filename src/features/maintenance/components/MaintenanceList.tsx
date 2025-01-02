import React from 'react';
import { MaintenanceRequest } from '../../../types/maintenance';
import { MaintenanceCard } from './MaintenanceCard';

interface MaintenanceListProps {
  requests: MaintenanceRequest[];
  isLoading?: boolean;
}

export const MaintenanceList: React.FC<MaintenanceListProps> = ({ 
  requests,
  isLoading 
}) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="h-32 bg-gray-200 rounded-lg"></div>
          </div>
        ))}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No maintenance requests found
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {requests.map(request => (
        <MaintenanceCard key={request.id} request={request} />
      ))}
    </div>
  );
};