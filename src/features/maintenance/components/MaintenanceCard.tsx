import React from 'react';
import { MaintenanceRequest } from '../../../types/maintenance';
import { formatDate } from '../../../utils/dateUtils';
import { Clock, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

interface MaintenanceCardProps {
  request: MaintenanceRequest;
}

export const MaintenanceCard: React.FC<MaintenanceCardProps> = ({ request }) => {
  const getStatusIcon = () => {
    switch (request.status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getPriorityStyles = () => {
    switch (request.priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityStyles()}`}>
          {request.priority}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-sm text-gray-500">
          {getStatusIcon()}
          <span className="ml-2 capitalize">{request.status}</span>
        </div>

        <p className="text-sm text-gray-600">{request.description}</p>

        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Equipment: {request.equipment}</span>
          <span>Updated: {formatDate(request.updatedAt)}</span>
        </div>
      </div>
    </div>
  );
};