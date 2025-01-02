import React from 'react';
import { WrenchIcon, AlertTriangle, ClipboardList, HelpCircle } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (action: string) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    {
      label: 'Maintenance',
      icon: WrenchIcon,
      action: 'Show maintenance procedures',
    },
    {
      label: 'Issues',
      icon: AlertTriangle,
      action: 'Report an issue',
    },
    {
      label: 'Checklist',
      icon: ClipboardList,
      action: 'Show maintenance checklist',
    },
    {
      label: 'Help',
      icon: HelpCircle,
      action: 'Show help topics',
    },
  ];

  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {actions.map(({ label, icon: Icon, action }) => (
        <button
          key={action}
          onClick={() => onActionClick(action)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
        >
          <Icon className="w-3.5 h-3.5" />
          {label}
        </button>
      ))}
    </div>
  );
};