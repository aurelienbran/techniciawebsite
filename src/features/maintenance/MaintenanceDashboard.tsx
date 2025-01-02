import React, { useEffect, useState } from 'react';
import { MaintenanceList } from './components/MaintenanceList';
import { MaintenanceDialog } from './components/MaintenanceDialog';
import { MaintenanceFilters } from './components/MaintenanceFilters';
import { useMaintenanceRequests } from './hooks/useMaintenanceRequests';
import { useMaintenanceFilters } from './hooks/useMaintenanceFilters';
import { Plus } from 'lucide-react';

export const MaintenanceDashboard: React.FC = () => {
  const { requests, isLoading, fetchRequests, createRequest } = useMaintenanceRequests();
  const { filteredRequests, filters, handleFilterChange } = useMaintenanceFilters(requests);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
          <p className="mt-1 text-sm text-gray-500">
            View and manage maintenance tasks
          </p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Request
        </button>
      </div>

      <MaintenanceFilters
        onFilterChange={handleFilterChange}
        activeStatus={filters.status}
      />

      <MaintenanceList requests={filteredRequests} isLoading={isLoading} />

      {isDialogOpen && (
        <MaintenanceDialog
          onClose={() => setIsDialogOpen(false)}
          onSubmit={async (data) => {
            await createRequest(data);
            setIsDialogOpen(false);
          }}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};