import React from 'react';
import { MenuItem as MenuItemType } from '../../types';

interface MenuItemProps extends MenuItemType {
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 mx-3 rounded-lg transition-colors ${
        active
          ? 'bg-gray-100 text-gray-900'
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default MenuItem;