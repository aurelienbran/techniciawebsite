import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useMaintenanceRequests } from '../hooks/useMaintenanceRequests';
import { MaintenanceStatus } from '../components/maintenance/MaintenanceStatus';
import { DocumentList } from '../components/documents/DocumentList';
import { useDocuments } from '../hooks/useDocuments';

export function DashboardPage() {
  const { user } = useAuth();
  const { requests } = useMaintenanceRequests();
  const { documents } = useDocuments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-sm text-gray-500">Here's an overview of your maintenance tasks and recent documents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Maintenance Requests</h2>
          <div className="space-y-4">
            {requests.slice(0, 3).map(request => (
              <MaintenanceStatus key={request.id} request={request} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Documents</h2>
          <DocumentList
            documents={documents.slice(0, 3)}
            onDelete={() => {}}
            onView={() => {}}
          />
        </div>
      </div>
    </div>
  );
}