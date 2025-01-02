import React from 'react';
import { ChatContainer } from '../components/chat/ChatContainer';
import { MaintenancePanel } from '../components/maintenance/MaintenancePanel';
import { useMaintenanceRequests } from '../hooks/useMaintenanceRequests';

export function MaintenancePage() {
  const { requests, createRequest } = useMaintenanceRequests();

  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] -m-6">
      <div className="flex-1 flex">
        <div className="w-2/3 border-r">
          <ChatContainer />
        </div>
        <div className="w-1/3">
          <MaintenancePanel
            requests={requests}
            onNewRequest={() => {}}
          />
        </div>
      </div>
    </div>
  );
}