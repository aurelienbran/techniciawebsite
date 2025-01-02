import React from 'react';
import { MessageSquare, FileText, Settings, Database } from 'lucide-react';
import MenuItem from './navigation/MenuItem';
import UserProfile from './navigation/UserProfile';
import { MenuItem as MenuItemType, User } from '../types';

const Sidebar: React.FC = () => {
  const menuItems: MenuItemType[] = [
    { icon: MessageSquare, label: 'Chat', active: true },
    { icon: FileText, label: 'Documents' },
    { icon: Database, label: 'Vector DB' },
    { icon: Settings, label: 'Settings' },
  ];

  const user: User = {
    name: 'Admin User',
    email: 'admin@technicia.ai',
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-full flex flex-col">
        <div className="flex-1 py-6 flex flex-col gap-0.5">
          {menuItems.map((item) => (
            <MenuItem key={item.label} {...item} />
          ))}
        </div>
        <UserProfile user={user} />
      </div>
    </aside>
  );
};

export default Sidebar;