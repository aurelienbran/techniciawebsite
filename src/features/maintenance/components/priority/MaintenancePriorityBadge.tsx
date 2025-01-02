import React from 'react';
import { MaintenancePriority } from '../../../../types/maintenance';
import { AlertOctagon, AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface PriorityConfig {
  icon: React.ReactNode;
  className: string;
}

const PRIORITY_CONFIG: Record<MaintenancePriority, PriorityConfig> = {
  'critical': {
    icon: <AlertOctagon className="w-4 h-4" />,
    className: 'bg-red-100 text-red-800'
  },
  'high': {
    icon: <AlertTriangle className="w-4 h-4" />,
    className: 'bg-orange-100 text-orange-800'
  },
  'medium': {
    icon: <AlertCircle className="w-4 h-4" />,
    className: 'bg-yellow-100 text-yellow-800'
  },
  'low': {
    icon: <Info className="w-4 h-4" />,
    className: 'bg-green-100 text-green-800'
  }
};

interface MaintenancePriorityBadgeProps {
  priority: MaintenancePriority;
}

export const MaintenancePriorityBadge: React.FC<MaintenancePriorityBadgeProps> = ({ priority }) => {
  const config = PRIORITY_CONFIG[priority];
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.className}`}>
      {config.icon}
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};