import React from 'react';
import { MaintenanceStatus } from '../../../../types/maintenance';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface StatusConfig {
  icon: React.ReactNode;
  className: string;
}

const STATUS_CONFIG: Record<MaintenanceStatus, StatusConfig> = {
  'pending': {
    icon: <AlertTriangle className="w-4 h-4" />,
    className: 'bg-yellow-100 text-yellow-800'
  },
  'in-progress': {
    icon: <Clock className="w-4 h-4" />,
    className: 'bg-blue-100 text-blue-800'
  },
  'completed': {
    icon: <CheckCircle className="w-4 h-4" />,
    className: 'bg-green-100 text-green-800'
  },
  'cancelled': {
    icon: <XCircle className="w-4 h-4" />,
    className: 'bg-red-100 text-red-800'
  }
};

interface MaintenanceStatusBadgeProps {
  status: MaintenanceStatus;
}

export const MaintenanceStatusBadge: React.FC<MaintenanceStatusBadgeProps> = ({ status }) => {
  const config = STATUS_CONFIG[status];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.icon}
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};