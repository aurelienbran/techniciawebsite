import React from 'react';
import { MaintenanceRequest } from '../../types/maintenance';
import { MaintenanceStatus } from './MaintenanceStatus';
import { Plus, Filter } from 'lucide-react';

interface MaintenancePanelProps {
  requests: MaintenanceRequest[];
  onNewRequest: () => void;
}

export const MaintenancePanel: React.FC<MaintenancePanelProps> = ({
  requests,
  onNewRequest,
}) => {
  return (
    <div className="h-full flex flex-col bg-gray-50 border-l border-gray-200">
      <div className="p-4 border-b bg-white">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-medium text-gray-900">Maintenance Requests</h2>
          <button
            onClick={onNewRequest}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Active
          </button>
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            Completed
          </button>
          <button className="ml-auto p-1.5 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {requests.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No maintenance requests yet
          </div>
        ) : (
          requests.map(request => (
            <MaintenanceStatus key={request.id} request={request} />
          ))
        )}
      </div>
    </div>
  );
};